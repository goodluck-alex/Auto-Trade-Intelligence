# LIDEX Auto Trade - AI Trading Intelligence

![LIDEX Logo](https://storage.googleapis.com/bit-pwa-public-assets/lidex-logo.png)

LIDEX Auto Trade is a premium React + TypeScript dashboard prototype built with Vite and Tailwind CSS. This repository includes a polished frontend interface for market analytics, charting, portfolio monitoring, and a simulated authentication experience.

---

## Table of Contents
1. [Project Overview](#project-overview)
2. [Technology Stack](#technology-stack)
3. [Project Structure](#project-structure)
4. [Features](#features)
5. [Installation](#installation)
6. [Configuration](#configuration)
7. [Local Development](#local-development)
8. [Production Deployment](#production-deployment)
9. [Authentication & Backend Requirements](#authentication--backend-requirements)
10. [Firebase / Google / GitHub Login](#firebase--google--github-login)
11. [Suggested Database Schema](#suggested-database-schema)
12. [Future Improvements](#future-improvements)
13. [License](#license)

---

## Project Overview
LIDEX Auto Trade is a frontend trading intelligence dashboard built for prototyping and production deployment. It shows trade analytics, charting, account management, and a mock authentication experience.

> Note: The current app uses local browser storage for auth and demo data. A production deployment should connect to a backend API and real authentication provider.

---

## Technology Stack
- React 19
- Vite
- TypeScript
- Tailwind CSS
- React Router DOM
- React Hook Form
- Zod validation
- Recharts
- Lightweight Charts
- Lucide React icons

---

## Project Structure
```text
src/
  api/          # Service layer and mock auth
  components/   # UI components and application pages
  context/      # React context providers (Auth, Theme, Price)
  services/     # Mock API layer and persistence utilities
  utils/        # Shared helpers
public/         # Static assets including lidex-logo.png
```

---

## Features
- Responsive dashboard and sidebar UI
- Dashboard metrics, positions, and trade history
- Candlestick charting and analytics
- Authentication modal with login/register/verify screens
- Placeholder social login buttons for Google and GitHub
- Theme toggle and profile session UI
- LocalStorage-based mock persistence for rapid prototyping

---

## Installation
Clone the repository and install dependencies:

```bash
git clone https://github.com/goodluck-alex/Auto-Trade-Intelligence.git
cd "create-a-functional-app (11)"
npm install
```

---

## Configuration
Copy the environment example file:

```bash
cp .env.example .env
```

Supported frontend environment variables:

```env
VITE_BINANCE_API=https://api.binance.com
VITE_ENABLE_MOCK=true
VITE_APP_ENV=development
VITE_APP_TITLE="Lidex Auto Trade"
VITE_PRIMARY_COLOR=emerald
VITE_STORAGE_PREFIX=lidex_v1_
```

Recommended production variables to add for backend and auth integration:

```env
VITE_API_BASE_URL=https://api.yourdomain.com/v1
VITE_WS_URL=wss://stream.yourdomain.com
FIREBASE_API_KEY=your_firebase_api_key
FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
FIREBASE_PROJECT_ID=your_project_id
FIREBASE_STORAGE_BUCKET=your_project.appspot.com
FIREBASE_MESSAGING_SENDER_ID=1234567890
FIREBASE_APP_ID=1:1234567890:web:abcdef123456
```

---

## Local Development
Start the development server:

```bash
npm run dev
```

Build production assets:

```bash
npm run build
```

Preview the production build locally:

```bash
npm run preview
```

---

## Production Deployment
This app is a static Vite frontend and can be deployed to Vercel or Render. Neon is recommended for backend database storage, not for direct frontend hosting.

### Vercel
1. Connect your GitHub repository to Vercel.
2. Choose the **Vite** framework preset.
3. Set the build command:
   ```bash
   npm run build
   ```
4. Set the output directory to:
   ```text
dist
   ```
5. Add environment variables in Vercel settings.
6. Deploy.

### Render
1. Create a new **Static Site** on Render.
2. Link the repository.
3. Use the build command:
   ```bash
   npm install && npm run build
   ```
4. Set the publish directory:
   ```text
dist
   ```
5. Add environment variables in Render settings.
6. Deploy.

### Neon
Neon is a managed PostgreSQL database service. Use Neon to host backend storage for user data, trades, referrals, and session state. This frontend should connect to a backend API that uses Neon for persistence.

Recommended Neon usage:
- Store users and login metadata
- Store trades and position history
- Store referral, plan, and subscription data
- Store backend session records

---

## Authentication & Backend Requirements
### Current app status
This repository currently uses a mock auth service in `src/api/AuthService.ts` and stores users in `localStorage`.

Current auth behavior:
- `register()` adds a new user record to browser storage
- `login()` reads users from browser storage and simulates session persistence
- `logout()` removes session state from browser storage
- Social login buttons in `src/components/AuthModal.tsx` are UI placeholders only
- No real password hashing, OAuth, or backend validation is implemented

### Production requirements
For production, implement a backend authentication and database layer. Recommended architecture:
- Frontend: React + Vite
- Backend: Node.js / Express / Fastify / Next.js API routes
- Database: Neon PostgreSQL
- Auth: Firebase Auth, NextAuth.js, or custom JWT-based auth
- Realtime and sockets: WebSocket, server-sent events, or Firebase

---

## Firebase / Google / GitHub Login
### Option 1: Firebase Auth
1. Create a Firebase project.
2. Enable Email/Password authentication.
3. Enable Google sign-in.
4. Enable GitHub sign-in and configure OAuth redirect URLs.
5. Install the Firebase SDK:
   ```bash
   npm install firebase
   ```
6. Add Firebase config values to `.env`.
7. Replace the mock auth implementation in `src/api/AuthService.ts` with Firebase auth calls.

Example Firebase setup:

```ts
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, GithubAuthProvider } from 'firebase/auth';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
const githubProvider = new GithubAuthProvider();
```

### Option 2: Custom OAuth Backend
For a custom backend, implement:
- Email/password registration and login
- Secure password hashing with bcrypt
- JWT access and refresh tokens
- Google OAuth sign-in
- GitHub OAuth sign-in

Then wire the social login buttons in `src/components/AuthModal.tsx` to your backend OAuth endpoints.

---

## Suggested Database Schema
### Users
```sql
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  password_hash TEXT,
  role TEXT NOT NULL DEFAULT 'user',
  plan TEXT NOT NULL DEFAULT 'Starter',
  mfa_enabled BOOLEAN NOT NULL DEFAULT false,
  verified BOOLEAN NOT NULL DEFAULT false,
  provider TEXT,
  provider_id TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### Sessions
```sql
CREATE TABLE sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  token TEXT NOT NULL,
  expires_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### Trades
```sql
CREATE TABLE trades (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id),
  symbol TEXT NOT NULL,
  side TEXT NOT NULL,
  size NUMERIC,
  entry_price NUMERIC,
  exit_price NUMERIC,
  pnl NUMERIC,
  status TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### Referrals
```sql
CREATE TABLE referrals (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id),
  code TEXT UNIQUE NOT NULL,
  referred_by UUID REFERENCES users(id),
  commission_balance NUMERIC DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

---

## Future Improvements
- Replace mock auth with real backend authentication.
- Add Firebase or NextAuth social login.
- Deploy a backend API connected to Neon Postgres.
- Add secure tokens, validation, and rate limiting.
- Add WebSocket-based live market streaming.

---

## License
MIT License.
