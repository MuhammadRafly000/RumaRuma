import { CURRENCY, LOCALE } from '@/config/constants';

export function formatCurrency(value, options = {}) {
  const amount = Number.isFinite(value) ? value : 0;
  try {
    return new Intl.NumberFormat(LOCALE, {
      style: 'currency',
      currency: CURRENCY,
      maximumFractionDigits: 0,
      ...options,
    }).format(amount);
  } catch {
    return `Rp ${amount.toLocaleString('id-ID')}`;
  }
}

export function formatNumber(value) {
  const amount = Number.isFinite(value) ? value : 0;
  return new Intl.NumberFormat(LOCALE).format(amount);
}

export function formatCompact(value) {
  const amount = Number.isFinite(value) ? value : 0;
  return new Intl.NumberFormat(LOCALE, {
    notation: 'compact',
    maximumFractionDigits: 1,
  }).format(amount);
}
