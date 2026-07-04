import express from 'express';

const router = express.Router();

const users = new Map();

function createUser(profile, provider) {
  const email = profile.email || `${provider}_user@${provider}.local`;
  const existing = Array.from(users.values()).find((user) => user.email === email);
  if (existing) return existing;
  const user = {
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    name: profile.name || profile.login || `${provider} user`,
    email,
    role: email === 'admin@lidex.io' ? 'admin' : 'user',
    plan: 'Starter',
    mfaEnabled: false,
    verified: true,
    provider,
  };
  users.set(user.id, user);
  return user;
}

router.post('/exchange', async (req, res) => {
  const { provider, code, code_verifier, redirect_uri } = req.body;
  if (!provider || !code || !redirect_uri) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    let tokenResponse;
    let profile;

    if (provider === 'github') {
      const githubClientId = process.env.GITHUB_CLIENT_ID;
      const githubClientSecret = process.env.GITHUB_CLIENT_SECRET;
      const tokenRes = await fetch('https://github.com/login/oauth/access_token', {
        method: 'POST',
        headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
        body: JSON.stringify({ client_id: githubClientId, client_secret: githubClientSecret, code, redirect_uri, code_verifier })
      });
      tokenResponse = await tokenRes.json();
      if (!tokenResponse.access_token) {
        return res.status(400).json({ error: 'GitHub token exchange failed', details: tokenResponse });
      }
      const userRes = await fetch('https://api.github.com/user', { headers: { Authorization: `Bearer ${tokenResponse.access_token}` } });
      profile = await userRes.json();
      const emailRes = await fetch('https://api.github.com/user/emails', { headers: { Authorization: `Bearer ${tokenResponse.access_token}` } });
      if (emailRes.ok) {
        const emails = await emailRes.json();
        const primary = emails.find((e) => e.primary) || emails[0];
        if (primary?.email) profile.email = primary.email;
      }
    } else if (provider === 'google') {
      const googleClientId = process.env.GOOGLE_CLIENT_ID;
      const googleClientSecret = process.env.GOOGLE_CLIENT_SECRET;
      const tokenRes = await fetch('https://oauth2.googleapis.com/token', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({
          client_id: googleClientId,
          client_secret: googleClientSecret,
          code,
          code_verifier,
          redirect_uri,
          grant_type: 'authorization_code'
        })
      });
      tokenResponse = await tokenRes.json();
      if (!tokenResponse.access_token) {
        return res.status(400).json({ error: 'Google token exchange failed', details: tokenResponse });
      }
      const userRes = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
        headers: { Authorization: `Bearer ${tokenResponse.access_token}` }
      });
      profile = await userRes.json();
    } else {
      return res.status(400).json({ error: 'Unsupported provider' });
    }

    const user = createUser(profile, provider);
    const token = Buffer.from(JSON.stringify({ sub: user.id, provider })).toString('base64');

    return res.json({ access_token: token, user });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Server error', details: err?.message || err });
  }
});

export default router;
