import React from 'react';
import { ChevronRight, Plus, TrendingUp, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { mockApi } from '../services/mockApi';

const topBots = [
  { name: 'AI Trend Master', exchange: 'Binance Futures', performance: '+24.35%' },
  { name: 'Grid Scalper Pro', exchange: 'Bybit Futures', performance: '+18.75%' },
  { name: 'Quantum Breakout', exchange: 'OKX Futures', performance: '+15.20%' },
  { name: 'Infinity Scalper', exchange: 'Bitget Futures', performance: '+12.45%' },
  { name: 'Mean Reversion AI', exchange: 'KuCoin Futures', performance: '+9.85%' },
];

const recentTrades = [
  { pair: 'BTC/USDT', side: 'Long', type: 'Market Order', amount: '+125.50 USDT', time: '2m ago' },
  { pair: 'ETH/USDT', side: 'Long', type: 'Take Profit', amount: '+250.75 USDT', time: '5m ago' },
  { pair: 'SOL/USDT', side: 'Short', type: 'Stop Loss', amount: '-45.30 USDT', time: '8m ago' },
  { pair: 'BNB/USDT', side: 'Long', type: 'Market Order', amount: '+75.85 USDT', time: '12m ago' },
  { pair: 'XRP/USDT', side: 'Long', type: 'Take Profit', amount: '+28.05 USDT', time: '15m ago' },
];

const RightPanel = ({ inline }: { inline?: boolean }) => {
  const [exchanges, setExchanges] = React.useState<any[]>([]);

  React.useEffect(() => {
    mockApi.getExchanges().then(setExchanges);
  }, []);

  const handleAddExchange = async () => {
    const name = prompt("Enter Exchange Name (e.g. KuCoin):");
    if (!name) return;
    await mockApi.connectExchange({ name });
    const freshEx = await mockApi.getExchanges();
    setExchanges(freshEx);
  };

  return (
    <aside className={inline ? "relative w-full bg-[#0d0e1a] border-t border-white/5 overflow-hidden rounded-3xl p-6 space-y-8" : "fixed right-0 top-0 w-[340px] h-full bg-[#0d0e1a] border-l border-white/5 overflow-y-auto p-6 space-y-8 scrollbar-hide"}>
      {/* Exchange Accounts */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Exchange Accounts</h3>
          <button className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider">View All</button>
        </div>
        <div className="space-y-2">
          {exchanges.map((ex, idx) => (
            <div key={idx} className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-transparent hover:border-white/5 hover:bg-white/[0.08] transition-all cursor-pointer group">
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-lg bg-white/5 flex items-center justify-center">
                  <div className={`w-1.5 h-1.5 rounded-full ${idx === 0 ? 'bg-yellow-500' : 'bg-blue-500'}`} />
                </div>
                <span className="text-xs font-bold text-white group-hover:text-emerald-400 transition-colors">{ex.name}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold text-emerald-400">{ex.status}</span>
                <ChevronRight size={14} className="text-gray-600" />
              </div>
            </div>
          ))}
          <button 
            onClick={handleAddExchange}
            className="w-full py-3 border border-dashed border-white/10 rounded-xl text-[10px] font-bold text-gray-500 hover:text-white hover:border-white/20 transition-all flex items-center justify-center gap-2"
          >
            <Plus size={14} /> Add New Exchange
          </button>
        </div>
      </section>

      {/* Top Bots */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Top Bots</h3>
          <button className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider">View All</button>
        </div>
        <div className="space-y-4">
          {topBots.map((bot, idx) => (
            <div key={idx} className="flex items-center justify-between group">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-emerald-600/10 flex items-center justify-center text-emerald-400">
                  <TrendingUp size={16} />
                </div>
                <div>
                  <p className="text-xs font-bold text-white">{bot.name}</p>
                  <p className="text-[10px] text-gray-500">{bot.exchange}</p>
                </div>
              </div>
              <div className="flex flex-col items-end">
                <span className="text-xs font-bold text-emerald-400">{bot.performance}</span>
                <div className="w-12 h-1 bg-white/5 rounded-full mt-1 overflow-hidden">
                  <div className="h-full bg-emerald-400" style={{width: '70%'}} />
                </div>
              </div>
            </div>
          ))}
          <button className="w-full py-2 bg-[#1f202c] rounded-xl text-[10px] font-bold text-white hover:bg-[#2a2c3a] transition-all">
            Manage Bots
          </button>
        </div>
      </section>

      {/* Recent Trades */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Recent Trades</h3>
          <button className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider">View All</button>
        </div>
        <div className="space-y-4">
          {recentTrades.map((trade, idx) => (
            <div key={idx} className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${trade.amount.startsWith('+') ? 'bg-emerald-400/10 text-emerald-400' : 'bg-rose-400/10 text-rose-400'}`}>
                  {trade.amount.startsWith('+') ? <ArrowUpRight size={16} /> : <ArrowDownRight size={16} />}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-white">{trade.pair}</span>
                    <span className={`text-[10px] font-black uppercase ${trade.side === 'Long' ? 'text-emerald-400' : 'text-rose-400'}`}>{trade.side}</span>
                  </div>
                  <p className="text-[10px] text-gray-500">{trade.type}</p>
                </div>
              </div>
              <div className="text-right">
                <p className={`text-xs font-bold ${trade.amount.startsWith('+') ? 'text-emerald-400' : 'text-rose-400'}`}>{trade.amount}</p>
                <p className="text-[10px] text-gray-600">{trade.time}</p>
              </div>
            </div>
          ))}
          <button className="w-full py-2 border border-white/5 rounded-xl text-[10px] font-bold text-gray-500 hover:text-white hover:bg-white/5 transition-all">
            View All Trades
          </button>
        </div>
      </section>
    </aside>
  );
};

export default RightPanel;
