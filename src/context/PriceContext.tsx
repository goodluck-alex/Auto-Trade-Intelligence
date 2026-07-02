import React, { createContext, useContext, useEffect, useState } from 'react';

interface PriceContextType {
  prices: Record<string, string>;
  lastUpdated: Date;
}

const PriceContext = createContext<PriceContextType | undefined>(undefined);

export const PriceProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [prices, setPrices] = useState<Record<string, string>>({});
  const [lastUpdated, setLastUpdated] = useState(new Date());

  const fetchPrices = async () => {
    try {
      const symbols = ['BTCUSDT', 'ETHUSDT', 'SOLUSDT', 'BNBUSDT', 'XRPUSDT', 'ADAUSDT', 'DOTUSDT'];
      const res = await fetch(`https://api.binance.com/api/v3/ticker/price`);
      const data = await res.json();
      
      if (Array.isArray(data)) {
        const priceMap = data.filter((p: any) => symbols.includes(p.symbol))
          .reduce((acc: any, curr: any) => ({ ...acc, [curr.symbol]: curr.price }), {});
        
        setPrices(priceMap);
        setLastUpdated(new Date());
      } else {
        console.warn('Binance price data is not an array:', data);
      }
    } catch (e) {
      console.error('Price fetch error:', e);
    }
  };

  useEffect(() => {
    fetchPrices();
    const interval = setInterval(fetchPrices, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <PriceContext.Provider value={{ prices, lastUpdated }}>
      {children}
    </PriceContext.Provider>
  );
};

export const usePrices = () => {
  const context = useContext(PriceContext);
  if (!context) throw new Error('usePrices must be used within PriceProvider');
  return context;
};
