// PKCE helpers
export function randomString(length = 64) {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-._~';
  let result = '';
  const array = new Uint8Array(length);
  crypto.getRandomValues(array);
  for (let i = 0; i < length; i++) result += chars[array[i] % chars.length];
  return result;
}

export async function sha256(baseString: string) {
  const encoder = new TextEncoder();
  const data = encoder.encode(baseString);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  return new Uint8Array(hashBuffer);
}

export function base64UrlEncode(buffer: Uint8Array) {
  let binary = '';
  const len = buffer.byteLength;
  for (let i = 0; i < len; i++) binary += String.fromCharCode(buffer[i]);
  return btoa(binary).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

export async function generateCodeChallenge(verifier: string) {
  const hashed = await sha256(verifier);
  return base64UrlEncode(hashed);
}

export function generateCodeVerifier() {
  return randomString(96);
}
