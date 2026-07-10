import { generateCodeVerifier, generateCodeChallenge } from '../utils/pkce';

type Provider = 'github' | 'google';

const REDIRECT_PATH = '/oauth-callback.html';

function getEnv(key: string): string | undefined {
  // Vite exposes env vars as import.meta.env.VITE_*
  // Use runtime fallback to window.__env__ if desired
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return (import.meta as any).env?.[key] || (window as any).__env__?.[key];
}

function resolveRedirectUri() {
  const override = getEnv('VITE_OAUTH_REDIRECT_URI');
  if (override) {
    return override;
  }

  return window.location.origin + REDIRECT_PATH;
}

export async function startAuthPopup(provider: Provider) {
  const clientIdKey = provider === 'github' ? 'VITE_GITHUB_CLIENT_ID' : 'VITE_GOOGLE_CLIENT_ID';
  const clientId = getEnv(clientIdKey);
  if (!clientId) throw new Error(`Missing ${clientIdKey} in env`);

  const verifier = generateCodeVerifier();
  const challenge = await generateCodeChallenge(verifier);
  const state = Math.random().toString(36).substr(2, 9);

  const redirectUri = resolveRedirectUri();

  let authUrl = '';
  if (provider === 'google') {
    const scope = encodeURIComponent('openid email profile');
    authUrl = `https://accounts.google.com/o/oauth2/v2/auth?response_type=code&client_id=${clientId}&redirect_uri=${encodeURIComponent(redirectUri)}&scope=${scope}&state=${state}&code_challenge=${challenge}&code_challenge_method=S256&access_type=offline&prompt=consent`;
  } else {
    // GitHub
    const scope = encodeURIComponent('read:user user:email');
    authUrl = `https://github.com/login/oauth/authorize?response_type=code&client_id=${clientId}&redirect_uri=${encodeURIComponent(redirectUri)}&scope=${scope}&state=${state}&code_challenge=${challenge}&code_challenge_method=s256`;
  }

  const popup = window.open(authUrl, `oauth_${provider}`, 'width=600,height=700');
  if (!popup) throw new Error('Popup blocked');

  return new Promise<{ code: string; state: string; verifier: string }>((resolve, reject) => {
    const handler = (e: MessageEvent) => {
      if (e.origin !== window.location.origin) return;
      const data = e.data || {};
      if (data?.type === 'oauth_callback' && data?.params) {
        const params = data.params as Record<string, string>;
        window.removeEventListener('message', handler);
        clearTimeout(to);
        if (params.error) return reject(new Error(params.error));
        resolve({ code: params.code, state: params.state, verifier });
      }
    };

    window.addEventListener('message', handler);

    // Timeout
    const to = setTimeout(() => {
      window.removeEventListener('message', handler);
      reject(new Error('OAuth popup timeout'));
    }, 5 * 60 * 1000);
    // clear timeout on resolve/reject in handler
  });
}

function resolveBackendEndpoint(endpoint: string) {
  if (endpoint.startsWith('http://') || endpoint.startsWith('https://')) {
    return endpoint;
  }
  const apiBase = getEnv('VITE_API_BASE_URL');
  if (!apiBase) {
    return endpoint;
  }
  const base = apiBase.replace(/\/$/, '');
  const path = endpoint.replace(/^\//, '');
  return `${base}/${path}`;
}

export async function exchangeCodeForToken(provider: Provider, code: string, verifier: string) {
  const backendTokenEndpoint = getEnv('VITE_OAUTH_TOKEN_ENDPOINT');
  if (!backendTokenEndpoint) {
    throw new Error('Missing VITE_OAUTH_TOKEN_ENDPOINT environment variable');
  }

  const endpoint = resolveBackendEndpoint(backendTokenEndpoint);

  const redirectUri = resolveRedirectUri();

  const res = await fetch(endpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ provider, code, code_verifier: verifier, redirect_uri: redirectUri })
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Token exchange failed (backend): ${res.status} ${text}`);
  }

  return res.json();
}
