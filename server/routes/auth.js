import express from 'express';
import bcrypt from 'bcryptjs';
import { pool } from '../db.js';
import { signToken, verifyToken } from '../lib/auth.js';
import { createUser, findUserByEmail, findUserById, toPublicUser } from '../lib/users.js';

const router = express.Router();

function requireDatabase(_req, res, next) {
  if (!pool) {
    return res.status(503).json({ error: 'Database not configured. Set DATABASE_URL in server/.env' });
  }
  next();
}

router.use(requireDatabase);

router.post('/register', async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email) return res.status(400).json({ error: 'Missing name or email' });
  if (!password) return res.status(400).json({ error: 'Password is required' });

  try {
    const existing = await findUserByEmail(email);
    if (existing) return res.status(409).json({ error: 'Email already registered' });

    const passwordHash = bcrypt.hashSync(password, 10);
    const user = await createUser({ email, name, passwordHash });
    const token = signToken(user.id);

    return res.json({ user: toPublicUser(user), token });
  } catch (err) {
    console.error('Register error:', err);
    return res.status(500).json({ error: 'Registration failed' });
  }
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  if (!email) return res.status(400).json({ error: 'Missing email' });
  if (!password) return res.status(400).json({ error: 'Password is required' });

  try {
    const user = await findUserByEmail(email);
    if (!user || !user.password_hash) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    if (!bcrypt.compareSync(password, user.password_hash)) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = signToken(user.id);
    return res.json({ user: toPublicUser(user), token });
  } catch (err) {
    console.error('Login error:', err);
    return res.status(500).json({ error: 'Login failed' });
  }
});

router.get('/me', async (req, res) => {
  const authHeader = req.headers.authorization || '';
  const token = authHeader.replace('Bearer ', '');
  if (!token) return res.status(401).json({ error: 'Missing token' });

  try {
    const payload = verifyToken(token);
    const user = await findUserById(payload.sub);
    if (!user) return res.status(404).json({ error: 'User not found' });
    return res.json({ user: toPublicUser(user) });
  } catch (err) {
    return res.status(401).json({ error: 'Invalid token' });
  }
});

export default router;
