import { pool } from '../db.js';

function toPublicUser(row) {
  if (!row) return null;
  return {
    id: row.id,
    name: row.name,
    email: row.email,
    role: row.role,
    plan: row.plan,
    mfaEnabled: row.mfa_enabled,
    verified: row.verified,
    isVerified: row.verified,
    provider: row.provider,
  };
}

export async function findUserByEmail(email) {
  const { rows } = await pool.query('SELECT * FROM users WHERE email = $1 LIMIT 1', [email]);
  return rows[0] || null;
}

export async function findUserById(id) {
  const { rows } = await pool.query('SELECT * FROM users WHERE id = $1 LIMIT 1', [id]);
  return rows[0] || null;
}

export async function createUser({ email, name, passwordHash, provider, providerId }) {
  const role = email === 'admin@lidex.io' ? 'admin' : 'user';
  const { rows } = await pool.query(
    `INSERT INTO users (email, name, password_hash, role, plan, mfa_enabled, verified, provider, provider_id)
     VALUES ($1, $2, $3, $4, 'Starter', false, $5, $6, $7)
     RETURNING *`,
    [email, name, passwordHash || null, role, !!provider, provider || null, providerId || null]
  );
  return rows[0];
}

export async function findOrCreateOAuthUser(profile, provider) {
  const email = profile.email || `${provider}_user@${provider}.local`;
  const providerId = String(profile.id || profile.sub || '');

  let user = await findUserByEmail(email);
  if (user) return user;

  if (providerId) {
    const { rows } = await pool.query(
      'SELECT * FROM users WHERE provider = $1 AND provider_id = $2 LIMIT 1',
      [provider, providerId]
    );
    user = rows[0];
    if (user) return user;
  }

  return createUser({
    email,
    name: profile.name || profile.login || `${provider} user`,
    provider,
    providerId: providerId || null,
  });
}

export { toPublicUser };
