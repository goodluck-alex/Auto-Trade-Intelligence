# Server (Backend)

This folder contains the minimal Express backend for Lidex designed to be deployed independently (e.g., Render, Heroku, or similar PaaS).

## Local development

```bash
cd server
npm install
npm run dev
```

Server listens on `PORT` environment variable (defaults to 4000).

## Deploying on Render

1. In Render dashboard, create a new **Web Service**.
2. Point the repository to this repository and set the **Root Directory** to `server`.
3. Build command: leave empty or `npm install`.
4. Start command: `npm start`.
5. Add required environment variables in the Render service settings (`GITHUB_CLIENT_ID`, `GITHUB_CLIENT_SECRET`, `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`, `JWT_SECRET`, `DATABASE_URL`, etc.).

## Notes

- Do not commit `.env` to the repo; use the service's environment configuration.
- The `server/.env.example` file contains example keys to copy locally.
