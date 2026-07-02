/**
 * Mock API Service Layer
 * This simulates the backend calls to a Node.js/PostgreSQL server.
 * Data is persisted in localStorage for "live" functionality in the browser.
 */

const STORAGE_KEYS = {
  BOTS: 'lidex_bots',
  TRADES: 'lidex_trades',
  EXCHANGES: 'lidex_exchanges',
  USER: 'lidex_user'
};

// Initial Data
const defaultBots = [
  { id: 1, name: 'AI Trend Master', exchange: 'Binance Futures', status: 'Running', strategy: 'Trend Following', pnl: '+24.35%', winRate: '68%', drawdown: '5.2%', health: 98, color: 'from-purple-500 to-blue-500' },
  { id: 2, name: 'Grid Scalper Pro', exchange: 'Bybit Futures', status: 'Running', strategy: 'Mean Reversion', pnl: '+18.75%', winRate: '72%', drawdown: '4.8%', health: 92, color: 'from-emerald-500 to-teal-500' },
];

const defaultExchanges = [
  { name: 'Binance Futures', status: 'Connected', color: 'text-emerald-400' },
  { name: 'Bybit Futures', status: 'Connected', color: 'text-emerald-400' },
];

// --- Market Intelligence Types ---
export type MarketRegime = 'Trending' | 'Ranging' | 'Breakout' | 'Volatile' | 'Panic' | 'Recovery';

export const mockApi = {
  // --- Global Intelligence Engine ---
  getMarketIntelligence: async () => {
    const regimes: MarketRegime[] = ['Trending', 'Ranging', 'Breakout', 'Volatile', 'Panic', 'Recovery'];
    return {
      regime: regimes[Math.floor(Math.random() * regimes.length)],
      confidence: Math.floor(Math.random() * 30) + 65,
      sentiment: Math.random() > 0.5 ? 'Bullish' : 'Bearish',
      support: 62450.50,
      resistance: 65200.00,
      volatility: 'Medium',
      newsRisk: 'Low',
      lastUpdate: new Date().toLocaleTimeString()
    };
  },

  // --- Trade Quality Scoring ---
  scoreTrade: (params: any) => {
    const trend = Math.floor(Math.random() * 25);
    const volume = Math.floor(Math.random() * 20);
    const oi = Math.floor(Math.random() * 20);
    const risk = Math.floor(Math.random() * 35);
    const total = trend + volume + oi + risk;
    return {
      total,
      breakdown: { trend, volume, oi, risk },
      decision: total >= 85 ? 'EXECUTE' : 'REJECT'
    };
  },

  // --- Bots ---
  getBots: async () => {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.BOTS);
      let bots = data ? JSON.parse(data) : [...defaultBots];
      
      if (!Array.isArray(bots)) bots = [...defaultBots];

      bots = bots.map((bot: any) => {
        if (bot && bot.status === 'Running') {
          const change = (Math.random() * 0.1 - 0.04);
          const currentPnl = parseFloat(bot.pnl || '0');
          const newPnlValue = currentPnl + change;
          const newPnl = isNaN(newPnlValue) ? currentPnl.toFixed(2) : newPnlValue.toFixed(2);
          
          const learningBonus = Math.random() > 0.9 ? 0.05 : 0;
          
          return { 
            ...bot, 
            pnl: (parseFloat(newPnl) + learningBonus >= 0 ? '+' : '') + (parseFloat(newPnl) + learningBonus).toFixed(2) + '%',
            health: Math.min(100, Math.max(80, (bot.health || 90) + (Math.random() * 2 - 1))),
            uptime: (bot.uptime || 0) + 3,
            latency: Math.floor(Math.random() * 50) + 10
          };
        }
        return bot;
      });

      localStorage.setItem(STORAGE_KEYS.BOTS, JSON.stringify(bots));
      return bots;
    } catch (e) {
      console.error('Error in getBots:', e);
      return defaultBots;
    }
  },

  toggleBotStatus: async (id: number) => {
    const bots = await mockApi.getBots();
    const updated = bots.map((b: any) => {
      if (b.id === id) {
        const newStatus = b.status === 'Running' ? 'Paused' : 'Running';
        // Log the action to recent trades
        if (newStatus === 'Running') {
          console.log(`[Engine] Bot ${b.name} started execution.`);
        }
        return { ...b, status: newStatus };
      }
      return b;
    });
    localStorage.setItem(STORAGE_KEYS.BOTS, JSON.stringify(updated));
    return updated;
  },

  createBot: async (botData: any) => {
    const bots = await mockApi.getBots();
    const newBot = { 
      ...botData, 
      id: Date.now(), 
      pnl: '0.00%', 
      winRate: '0%', 
      drawdown: '0%', 
      health: 100,
      status: 'Paused'
    };
    const updated = [...bots, newBot];
    localStorage.setItem(STORAGE_KEYS.BOTS, JSON.stringify(updated));
    return newBot;
  },

  // --- Exchanges ---
  getExchanges: async () => {
    const data = localStorage.getItem(STORAGE_KEYS.EXCHANGES);
    if (!data) {
      localStorage.setItem(STORAGE_KEYS.EXCHANGES, JSON.stringify(defaultExchanges));
      return defaultExchanges;
    }
    return JSON.parse(data);
  },

  connectExchange: async (exchangeData: any) => {
    const exchanges = await mockApi.getExchanges();
    const updated = [...exchanges, { ...exchangeData, status: 'Connected', color: 'text-emerald-400' }];
    localStorage.setItem(STORAGE_KEYS.EXCHANGES, JSON.stringify(updated));
    return updated;
  },

  // --- Real-time Stats Simulation ---
  getStats: async () => {
    return {
      balance: 125430.50 + (Math.random() * 10 - 5),
      equity: 132890.75 + (Math.random() * 20 - 10),
      dailyPnl: 4250.75 + (Math.random() * 5),
    };
  }
};
