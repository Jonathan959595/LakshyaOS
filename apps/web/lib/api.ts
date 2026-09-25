const baseUrl = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:4000/api';
export async function api<T>(path: string, init?: RequestInit, token?: string): Promise<T> {
  const response = await fetch(`${baseUrl}${path}`, { ...init, headers: { 'Content-Type': 'application/json', ...(token ? { Authorization: `Bearer ${token}` } : {}), ...init?.headers } });
  if (!response.ok) throw new Error((await response.json().catch(() => ({ message: response.statusText }))).message);
  return response.status === 204 ? undefined as T : response.json() as Promise<T>;
}
