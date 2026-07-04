OAuth setup

- Add the following to your `.env` (Vite expects `VITE_` prefix):

  VITE_GOOGLE_CLIENT_ID=your-google-client-id.apps.googleusercontent.com
  VITE_GITHUB_CLIENT_ID=your-github-client-id
  VITE_OAUTH_TOKEN_ENDPOINT=https://your-backend.example.com/oauth/exchange  # optional but required for GitHub

Notes:
- Google: the PKCE flow and token exchange can run from the browser with the Google token endpoint.
- GitHub: GitHub's token endpoint is not CORS-friendly for direct browser requests. Provide a backend endpoint that accepts `{ provider, code, code_verifier, redirect_uri }` and performs the token exchange server-side with the client secret, then returns `{ access_token, user }` or at least `{ user }`.

Minimal backend example (Node/Express):

```js
// POST /oauth/exchange
// body: { provider, code, code_verifier, redirect_uri }
const express = require('express');
const fetch = require('node-fetch');
const app = express();
app.use(express.json());

app.post('/oauth/exchange', async (req, res) => {
  const { provider, code, code_verifier, redirect_uri } = req.body;
  if (provider === 'github') {
    const client_id = process.env.GITHUB_CLIENT_ID;
    const client_secret = process.env.GITHUB_CLIENT_SECRET;
    const tokenRes = await fetch('https://github.com/login/oauth/access_token', {
      method: 'POST',
      headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
      body: JSON.stringify({ client_id, client_secret, code, redirect_uri, code_verifier })
    });
    const tokenJson = await tokenRes.json();
    const accessToken = tokenJson.access_token;
    const userRes = await fetch('https://api.github.com/user', { headers: { Authorization: `Bearer ${accessToken}` } });
    const user = await userRes.json();
    res.json({ access_token: accessToken, user });
  } else {
    res.status(400).json({ error: 'unsupported provider' });
  }
});

app.listen(3000);
```

Security:
- Do not store client secrets in the browser. Use a backend for exchanges that require secrets.
- Validate `state` server-side if you persist it.

Testing:
- Start the dev server and set `VITE_GOOGLE_CLIENT_ID` or `VITE_GITHUB_CLIENT_ID` and (for GitHub) `VITE_OAUTH_TOKEN_ENDPOINT`.
- Open the auth modal and click the provider button; follow the provider consent flow. The popup will close and the app will sign you in.
