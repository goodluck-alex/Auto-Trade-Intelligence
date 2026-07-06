export interface BackendUser {
  id: string;
  name: string;
  email: string;
  plan: string;
  role: 'user' | 'admin';
  isVerified: boolean;
  provider?: string;
}

function getEnv(key: string): string | undefined {
  // Prefer Vite env vars, but allow a runtime override if needed.
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return (import.meta as any).env?.[key] || (window as any).__env__?.[key];
}

const API_BASE_URL = getEnv('VITE_API_BASE_URL') || '';
const AUTH_TOKEN_KEY = 'lidex_auth_token';

function getUrl(path: string) {
  const base = API_BASE_URL.replace(/\/$/, '');
  if (!base) return path;
  const trimmed = path.replace(/^\//, '');
  return `${base}/${trimmed}`;
}

async function handleResponse(res: Response) {
  const text = await res.text();
  const payload = text ? JSON.parse(text) : {};
  if (!res.ok) {
    throw new Error(payload?.error || res.statusText || 'API request failed');
  }
  return payload;
}

export function saveAuthToken(token: string) {
  localStorage.setItem(AUTH_TOKEN_KEY, token);
}

export function getAuthToken() {
  return localStorage.getItem(AUTH_TOKEN_KEY);
}

export function removeAuthToken() {
  localStorage.removeItem(AUTH_TOKEN_KEY);
}

export async function login(email: string, password?: string) {
  const res = await fetch(getUrl('/api/auth/login'), {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  });
  return handleResponse(res) as Promise<{ user: BackendUser; token: string }>;
}

export async function register(name: string, email: string, password?: string) {
  const res = await fetch(getUrl('/api/auth/register'), {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, email, password })
  });
  return handleResponse(res) as Promise<{ user: BackendUser; token: string }>;
}

export async function fetchMe() {
  const token = getAuthToken();
  if (!token) throw new Error('Missing auth token');

  const res = await fetch(getUrl('/api/auth/me'), {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  return handleResponse(res) as Promise<{ user: BackendUser }>;
}
