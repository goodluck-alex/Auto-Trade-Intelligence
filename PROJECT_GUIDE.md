# LIDEX Auto Trade - Full System Integration Guide

## 1. System Architecture
The system consists of three main parts:
- **Frontend**: React/Vite/Tailwind (Current project)
- **Backend API**: Node.js/Express (Microservices)
- **Execution Engine**: Python/Node.js using **CCXT** for exchange connectivity.

## 2. Database Schema (PostgreSQL)
To run this live, you need the following tables:

### Users & Auth
- `users`: id, email, password_hash, mfa_secret, kyc_status
- `user_profiles`: user_id, first_name, last_name, plan (Starter/Pro/VIP)

### Exchange Connectivity
- `exchange_accounts`: id, user_id, exchange_name (Binance/Bybit), api_key, api_secret (Encrypted AES-256)

### Trading Engine
- `bots`: id, user_id, name, strategy_type, status (Running/Paused), settings (JSON)
- `trades`: id, bot_id, symbol, side (Long/Short), entry_price, exit_price, pnl, status (Open/Closed)

## 3. API Requirements
### Exchange API (CCXT)
You must use the **CCXT (CryptoCurrency eXchange Trading Library)**.
- **REST**: For fetching balances and placing orders.
- **WebSockets**: For real-time price tickers and orderbook data.

### Security
- Use **Argon2** for password hashing.
- Encrypt API Keys in the database using **AES-256-GCM**.
- Implement **JWT** with a 15-minute expiry and Refresh Tokens.

## 4. Live Connection Steps
1. **API Key Generation**: User generates "Futures" API keys on Binance/Bybit.
2. **Encryption**: The backend encrypts keys before storing them in PostgreSQL.
3. **Bot Initialization**: The Execution Layer spawns a worker thread for each "Running" bot.
4. **Market Monitoring**: The Intelligence Layer streams prices. If "Trade Score" > 85, the Execution Layer sends an order via CCXT.

## 5. Deployment
- **Database**: Managed PostgreSQL (AWS RDS / Supabase).
- **Cache**: Redis for session management and price caching.
- **Backend**: Dockerized Node.js app on AWS EKS or DigitalOcean App Platform.
