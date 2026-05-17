import { delay } from './api';

/**
 * Dummy auth service. Replace with real login (Laravel Sanctum, Firebase Auth,
 * Supabase, etc.) by changing the implementations. The shape returned should
 * stay the same so AuthContext does not need adjustments.
 */

export async function loginWithEmail({ email, password }) {
  await delay(700);
  if (!email || !password) {
    throw new Error('Email dan password wajib diisi.');
  }
  if (password.length < 6) {
    throw new Error('Password minimal 6 karakter.');
  }
  return {
    token: 'mock-token-' + Math.random().toString(36).slice(2),
    user: {
      id: 'u-1',
      name: email.split('@')[0],
      email,
      avatar: null,
    },
  };
}

export async function registerWithEmail({ name, email, password }) {
  await delay(900);
  if (!name || !email || !password) {
    throw new Error('Semua kolom wajib diisi.');
  }
  return {
    token: 'mock-token-' + Math.random().toString(36).slice(2),
    user: { id: 'u-' + Date.now(), name, email, avatar: null },
  };
}

export async function logout() {
  await delay(80);
  return true;
}
