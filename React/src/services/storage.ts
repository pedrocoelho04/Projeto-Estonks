/**
 * Storage utilitário baseado em localStorage para simular uma "API".
 * Todas as funções são async para facilitar a futura troca por chamadas HTTP reais.
 */

export async function getItem<T>(key: string, fallback: T): Promise<T> {
  const raw = localStorage.getItem(key);
  if (!raw) return fallback;
  try {
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

export async function setItem<T>(key: string, value: T): Promise<void> {
  localStorage.setItem(key, JSON.stringify(value));
}

export async function nextId(key: string): Promise<number> {
  const counterKey = `${key}.__id__`;
  const current = Number(localStorage.getItem(counterKey) || "0");
  const next = current + 1;
  localStorage.setItem(counterKey, String(next));
  return next;
}