import React from 'react';
import { Search, Download, Calendar, Filter, ChevronLeft, ChevronRight, ExternalLink } from 'lucide-react';

const history = [
  { id: 1, pair: 'BTC/USDT', type: 'Long', entry: '62,850.50', exit: '64,200.00', pnl: '+$1,349.50', pnlPct: '+2.14%', date: '2024-05-18 14:20', bot: 'AI Trend Master', exchange: 'Binance' },
  { id: 2, pair: 'ETH/USDT', type: 'Long', entry: '3,120.40', exit: '3,450.10', pnl: '+$329.70', pnlPct: '+10.56%', date: '2024-05-18 10:15', bot: 'Quantum Breakout', exchange: 'OKX' },
  { id: 3, pair: 'SOL/USDT', type: 'Short', entry: '165.20', exit: '158.40', pnl: '+$6.80', pnlPct: '+4.12%', date: '2024-05-17 22:45', bot: 'Grid Scalper Pro', exchange: 'Bybit' },
  { id: 4, pair: 'BNB/USDT', type: 'Long', entry: '585.00', exit: '570.20', pnl: '-$14.80', pnlPct: '-2.53%', date: '2024-05-17 18:30', bot: 'Infinity Scalper', exchange: 'Bitget' },
  { id: 5, pair: 'XRP/USDT', type: 'Long', entry: '0.5500', exit: '0.5980', pnl: '+$48.00', pnlPct: '+8.72%', date: '2024-05-17 12:00', bot: 'Mean Reversion AI', exchange: 'KuCoin' },
  { id: 6, pair: 'ADA/USDT', type: 'Short', entry: '0.4850', exit: '0.4720', pnl: '+$13.00', pnlPct: '+2.68%', date: '2024-05-16 20:15', bot: 'AI Trend Master', exchange: 'Binance' },
  { id: 7, pair: 'DOT/USDT', type: 'Long', entry: '7.20', exit: '7.05', pnl: '-$0.15', pnlPct: '-2.08%', date: '2024-05-16 15:40', bot: 'Quantum Breakout', exchange: 'OKX' },
];

const TradeHistory = () => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white">Trade History</h2>
          <p className="text-sm text-gray-400 mt-2">A clean record of all executed and closed trades.</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <button className="flex items-center gap-2 px-4 py-3 sm:py-2 bg-white/5 border border-white/5 rounded-2xl text-xs sm:text-sm font-bold text-gray-400 hover:text-white transition-all">
            <Download size={16} /> Export CSV
          </button>
          <button className="flex items-center gap-2 px-4 py-3 sm:py-2 bg-white/5 border border-white/5 rounded-2xl text-xs sm:text-sm font-bold text-gray-400 hover:text-white transition-all">
            <Calendar size={16} /> Last 30 Days
          </button>
        </div>
      </div>

      <div className="bg-[#161723] border border-white/5 rounded-3xl overflow-hidden">
        <div className="p-4 sm:p-6 bg-white/[0.02] border-b border-white/5 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            <div className="relative w-full sm:w-auto">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
              <input
                type="text"
                placeholder="Search market or bot..."
                className="w-full sm:w-64 bg-black/20 border border-white/5 rounded-2xl pl-10 pr-4 py-2 text-xs text-gray-200 focus:outline-none focus:border-purple-500/50 transition-all"
              />
            </div>
            <button className="flex items-center gap-2 px-4 py-3 sm:py-2 bg-black/20 border border-white/5 rounded-2xl text-xs sm:text-sm font-medium text-gray-400 hover:text-white transition-all">
              <Filter size={14} /> Advanced Filters
            </button>
          </div>
          <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Showing 7 of 1,240 results</p>
        </div>

        <div className="block xl:hidden space-y-4 p-4">
          {history.map((item) => (
            <div key={item.id} className="bg-[#0f1221] border border-white/5 rounded-3xl p-4 shadow-sm">
              <div className="flex items-center justify-between gap-3 mb-3">
                <div>
                  <p className="text-sm font-bold text-white">{item.pair}</p>
                  <p className="text-[11px] text-gray-400">{item.bot} · {item.exchange}</p>
                </div>
                <span className={`text-[11px] font-black uppercase px-2 py-1 rounded-full ${item.type === 'Long' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-rose-500/10 text-rose-400'}`}>
                  {item.type}
                </span>
              </div>
              <div className="grid grid-cols-2 gap-3 text-[11px] text-gray-400">
                <div>
                  <p className="text-[10px] uppercase tracking-[0.2em] text-gray-500">Entry</p>
                  <p className="text-sm text-white">{item.entry}</p>
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-[0.2em] text-gray-500">Exit</p>
                  <p className="text-sm text-white">{item.exit}</p>
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-[0.2em] text-gray-500">PnL</p>
                  <p className={`text-sm font-bold ${item.pnl.startsWith('+') ? 'text-emerald-400' : 'text-rose-400'}`}>{item.pnl}</p>
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-[0.2em] text-gray-500">Date</p>
                  <p className="text-sm text-white">{item.date}</p>
                </div>
              </div>
              <button className="mt-4 w-full py-3 text-sm font-bold uppercase tracking-[0.2em] text-purple-400 bg-white/5 rounded-2xl hover:bg-white/10 transition-colors">View Details</button>
            </div>
          ))}
        </div>

        <div className="overflow-x-auto hidden xl:block">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-white/[0.01]">
                <Th>Market</Th>
                <Th>Type</Th>
                <Th>Entry / Exit</Th>
                <Th>PnL</Th>
                <Th>Bot / Exchange</Th>
                <Th>Date</Th>
                <Th>Action</Th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {history.map((item) => (
                <tr key={item.id} className="hover:bg-white/[0.01] transition-colors">
                  <td className="px-6 py-4">
                    <span className="text-sm font-bold text-white">{item.pair}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`text-[10px] font-black uppercase px-2 py-0.5 rounded ${item.type === 'Long' ? 'text-emerald-400 bg-emerald-400/10' : 'text-rose-400 bg-rose-400/10'}`}>
                      {item.type}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-col">
                      <span className="text-xs font-medium text-gray-300">En: {item.entry}</span>
                      <span className="text-xs font-medium text-gray-500">Ex: {item.exit}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-col">
                      <span className={`text-xs font-bold ${item.pnl.startsWith('+') ? 'text-emerald-400' : 'text-rose-400'}`}>{item.pnl}</span>
                      <span className={`text-[10px] font-medium ${item.pnlPct.startsWith('+') ? 'text-emerald-400' : 'text-rose-400'}`}>{item.pnlPct}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-col">
                      <span className="text-xs font-medium text-gray-400">{item.bot}</span>
                      <span className="text-[10px] text-gray-600 uppercase tracking-widest">{item.exchange}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-xs text-gray-500 font-medium">{item.date}</span>
                  </td>
                  <td className="px-6 py-4">
                    <button className="p-2 text-gray-600 hover:text-purple-400 transition-colors">
                      <ExternalLink size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="p-4 border-t border-white/5 flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
          <button className="p-2 text-gray-600 hover:text-white transition-colors">
            <ChevronLeft size={20} />
          </button>
          <div className="flex items-center gap-2">
            {[1, 2, 3, '...', 12].map((n, i) => (
              <button
                key={i}
                className={`w-8 h-8 rounded-lg text-xs font-bold transition-all ${n === 1 ? 'bg-purple-600 text-white shadow-lg shadow-purple-500/20' : 'text-gray-500 hover:text-white'}`}>
                {n}
              </button>
            ))}
          </div>
          <button className="p-2 text-gray-600 hover:text-white transition-colors">
            <ChevronRight size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

const Th = ({ children }: { children: React.ReactNode }) => (
  <th className="px-6 py-3 text-[10px] font-bold text-gray-600 uppercase tracking-widest">{children}</th>
);

export default TradeHistory;
