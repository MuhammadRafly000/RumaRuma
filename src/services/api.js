import { API_BASE_URL } from '@/config/constants';

/**
 * Thin fetch wrapper. Today it returns mock data via services that import
 * directly from `@data`. When you connect a real backend, change the service
 * implementations to call `apiRequest`.
 */
export async function apiRequest(path, { method = 'GET', body, headers, ...rest } = {}) {
  const url = path.startsWith('http') ? path : `${API_BASE_URL}${path}`;
  const res = await fetch(url, {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    },
    body: body ? JSON.stringify(body) : undefined,
    ...rest,
  });

  if (!res.ok) {
    const message = await safeMessage(res);
    throw new ApiError(message, res.status);
  }

  if (res.status === 204) return null;
  return res.json();
}

async function safeMessage(res) {
  try {
    const data = await res.json();
    return data?.message || res.statusText;
  } catch {
    return res.statusText;
  }
}

export class ApiError extends Error {
  constructor(message, status = 0) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
  }
}

export const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
