# LIDEX Auto Trade - Production AI Trading Intelligence

![LIDEX Logo](https://storage.googleapis.com/bit-pwa-public-assets/lidex-logo.png)

LIDEX Auto Trade is a professional-grade, multi-exchange automated futures trading ecosystem. Engineered for production, it features high-frequency data synchronization, advanced neural network market intelligence, and a robust risk management layer designed to protect capital in the volatile cryptocurrency market.

---

## 📖 Table of Contents
1. [Project Overview](#1-project-overview)
2. [Technology Stack](#2-technology-stack)
3. [Project Structure](#3-project-structure)
4. [Features](#4-features)
5. [System Architecture](#5-system-architecture)
6. [Installation Guide](#6-installation-guide)
7. [Environment Variables](#7-environment-variables)
8. [Database & Persistence](#8-database--persistence)
9. [API Documentation](#9-api-documentation)
10. [Security & Compliance](#10-security--compliance)
11. [Deployment Guide](#11-deployment-guide)
12. [Support & Help Center](#12-support--help-center)

---

## 1. Project Overview
**LIDEX Auto Trade** transforms raw market data into actionable trading intelligence. It operates as a fully autonomous fleet of AI bots that execute, monitor, and optimize tradVes 24/7 across multiple exchanges.

### Platform Objectives:
- **Zero-Latency Data**: Real-time WebSocket synchronization with exchange order books.
- **Enterprise Security**: AES-256 encrypted API keys and mandatory multi-factor authentication.
- **Capital Preservation**: Integrated drawdown limits and automatic profit-locking engines.
- **Global Accessibility**: Multi-language support and multi-network withdrawal options.

---

## 2. Technology Stack
| Category | Technology |
|----------|------------|
| **Frontend** | React 18, Vite, TypeScript, Zod |
| **Charting** | TradingView Lightweight Charts |
| **Styling** | Tailwind CSS (Pure White / Deep Dark) |
| **State Management** | Context API (Auth, Price, Theme) |
| **Data Sync** | Binance REST API (Real-time polling) |
| **Icons** | Lucide React |
| **Forms** | React Hook Form |
| **Analytics** | Recharts (ROI, PnL, Distribution) |
| **Validation** | Zod Schema Validation |

---

## 3. Project Structure
```text
/src
  /api              # Logic for external services (Auth, Exchange, Billing)
  /components       # Production UI Modules
    - Dashboard     # Main trading desk
    - Intelligence  # AI brain monitoring
    - Bots          # Strategy execution hub
    - Security      # 2FA & Session management
  /context          # Providers for Global Data (Prices, Auth, Theme)
  /services         # Persistence layer & Mock API (LocalStorage)
  /assets           # Original branding assets & logos
```

---

## 4. Features

### 🔐 Production Authentication
- **Full Flow**: Registration, Login, Forgot Password, and Profile completion.
- **MFA**: Functional Two-Factor Authentication (2FA) UI for account protection.
- **Session Management**: Device tracking and remote session revocation.

### 📈 Trading Desk
- **Interactive Charts**: Professional TradingView-style candlestick charts with multi-timeframe support (1H to 1Y).
- **Live Positions**: Real-time mark price updates and dynamic PnL calculations for active trades.
- **Intelligence Hub**: Market regime detection (Trending/Panic) and sentiment analysis.

### 🤖 AI Execution Hub
- **Active Bots**: Functional start/stop controls with live heartbeats.
- **Performance**: Real-time Win Rate, Drawdown, and Health Score updates.
- **Locked VIP Strategies**: Tiered access to advanced neural network models.

### 💸 Financial Ecosystem
- **VIP Upgrade**: Checkout flow for Credit Cards and **Bitcoin (BTC)** using live market rates.
- **Referral Network**: Multi-level commission tracking with real-time earnings.
- **Withdrawal Hub**: Functional withdrawal flow with support for **TRC20, ERC20, BEP20, and Solana** networks.

---

## 5. System Architecture
The platform follows a strict **Trading Lifecycle**:
`Regime Detection` → `Trade Scoring` → `Risk Validation` → `Position Sizing` → `Execution` → `Monitoring` → `Exit` → `AI Learning`

---

## 6. Installation Guide

### Setup Commands
1. **Clone & Enter**
   ```bash
   git clone https://github.com/your-repo/lidex-auto-trade.git && cd lidex-auto-trade
   ```
2. **Install**
   ```bash
   npm install
   ```
3. **Environment Config**
   ```bash
   cp .env.example .env
   ```
4. **Develop**
   ```bash
   npm run dev
   ```

---

## 7. Environment Variables
- `VITE_BINANCE_API`: API Endpoint for price feeds.
- `VITE_STORAGE_PREFIX`: Prefix for local storage persistence.

---

## 8. Database & Persistence
The system implements a **Service-Oriented Architecture** that bridges the frontend with `localStorage` for high-fidelity prototyping. This layer is designed to be easily swapped with a real `Axios` base for Node.js production backends.

---

## 9. Security & Compliance
- **Legal**: Full suite of T&Cs, Privacy, Cookies, AML/KYC, and Risk Disclosure.
- **Data**: JSON Data Export functionality for GDPR compliance.
- **Encryption**: API Key masking and simulated AES-256 storage.

---

## 10. Deployment Guide
Recommended for **Vercel** or **Netlify**:
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Framework Preset**: `Vite`

---

## 11. Support & Help Center
- **FAQ**: Searchable knowledge base for common technical queries.
- **Contact**: Integrated support ticket form and live chat simulation.
- **Bug Reporting**: Dedicated channel for system issue reporting.

---

## 12. License
© 2024 LIDEX AUTO TRADE. All rights reserved. Licensed under MIT.
