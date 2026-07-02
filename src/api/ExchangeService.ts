export interface APIKey {
  id: string;
  exchange: string;
  key: string;
  secret: string;
  passphrase?: string;
  status: 'Connected' | 'Error' | 'Inactive';
  tradingEnabled: boolean;
  lastTested: string;
}

const KEYS_KEY = 'lidex_db_apikeys';

export const ExchangeService = {
  getKeys: (): APIKey[] => {
    const data = localStorage.getItem(KEYS_KEY);
    return data ? JSON.parse(data) : [];
  },

  addKey: async (data: any): Promise<APIKey> => {
    const keys = ExchangeService.getKeys();
    const newKey: APIKey = {
      id: Math.random().toString(36).substr(2, 9),
      exchange: data.exchange,
      key: data.key.substring(0, 4) + '...' + data.key.substring(data.key.length - 4), // Store mask
      secret: '********', // Never store raw in storage logic (masking for prototype)
      status: 'Connected',
      tradingEnabled: true,
      lastTested: new Date().toISOString()
    };
    
    localStorage.setItem(KEYS_KEY, JSON.stringify([...keys, newKey]));
    return newKey;
  },

  deleteKey: async (id: string) => {
    const keys = ExchangeService.getKeys().filter(k => k.id !== id);
    localStorage.setItem(KEYS_KEY, JSON.stringify(keys));
  },

  toggleTrading: async (id: string) => {
    const keys = ExchangeService.getKeys().map(k => {
      if (k.id === id) return { ...k, tradingEnabled: !k.tradingEnabled };
      return k;
    });
    localStorage.setItem(KEYS_KEY, JSON.stringify(keys));
    return keys;
  },

  testConnection: async (id: string) => {
    // Simulate API call to exchange
    return new Promise(resolve => setTimeout(() => resolve(true), 1500));
  }
};
