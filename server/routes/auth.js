import express from 'express';
import bcrypt from 'bcryptjs';

const router = express.Router();
const users = new Map();

function createUser({ email, name, password, provider }) {
  const existing = Array.from(users.values()).find((user) => user.email === email);
  if (existing) return existing;
  const user = {
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    name,
    email,
    passwordHash: password ? bcrypt.hashSync(password, 10) : undefined,
    role: email === 'admin@lidex.io' ? 'admin' : 'user',
    plan: 'Starter',
    mfaEnabled: false,
    verified: !!provider,
    provider,
  };
  users.set(user.id, user);
  return user;
}

router.post('/register', (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email) return res.status(400).json({ error: 'Missing name or email' });
  const existing = Array.from(users.values()).find((user) => user.email === email);
  if (existing) return res.status(409).json({ error: 'Email already registered' });
  const user = createUser({ email, name, password });
  return res.json({ user: { ...user, passwordHash: undefined }, token: Buffer.from(JSON.stringify({ sub: user.id })).toString('base64') });
});

router.post('/login', (req, res) => {
  const { email, password } = req.body;
  if (!email) return res.status(400).json({ error: 'Missing email' });
  const user = Array.from(users.values()).find((u) => u.email === email);
  if (!user) return res.status(401).json({ error: 'Invalid credentials' });
  if (user.passwordHash && password && bcrypt.compareSync(password, user.passwordHash)) {
    return res.json({ user: { ...user, passwordHash: undefined }, token: Buffer.from(JSON.stringify({ sub: user.id })).toString('base64') });
  }
  if (!user.passwordHash && !password) {
    return res.json({ user: { ...user, passwordHash: undefined }, token: Buffer.from(JSON.stringify({ sub: user.id })).toString('base64') });
  }
  return res.status(401).json({ error: 'Invalid credentials' });
});

router.get('/me', (req, res) => {
  const authHeader = req.headers.authorization || '';
  const token = authHeader.replace('Bearer ', '');
  if (!token) return res.status(401).json({ error: 'Missing token' });
  try {
    const payload = JSON.parse(Buffer.from(token, 'base64').toString('utf8'));
    const user = users.get(payload.sub);
    if (!user) return res.status(404).json({ error: 'User not found' });
    return res.json({ user: { ...user, passwordHash: undefined } });
  } catch (err) {
    return res.status(401).json({ error: 'Invalid token' });
  }
});

export default router;
