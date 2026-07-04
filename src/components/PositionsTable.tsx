import React from 'react';
import { useNavigate } from 'react-router-dom';
import { MoreHorizontal } from 'lucide-react';
import { usePrices } from '../context/PriceContext';

const initialPositions = [
  { market: 'BTC/USDT', symbol: 'BTCUSDT', side: 'Long', size: 0.125, sizeStr: '0.125 BTC', entry: 63245.10, bot: 'AI Trend Master', exchange: 'Binance' },
  { market: 'ETH/USDT', symbol: 'ETHUSDT', side: 'Long', size: 2.50, sizeStr: '2.50 ETH', entry: 3245.80, bot: 'Quantum Breakout', exchange: 'OKX' },
  { market: 'SOL/USDT', symbol: 'SOLUSDT', side: 'Short', size: 15.00, sizeStr: '15.00 SOL', entry: 158.25, bot: 'Grid Scalper Pro', exchange: 'Bybit' },
  { market: 'BNB/USDT', symbol: 'BNBUSDT', side: 'Long', size: 5.00, sizeStr: '5.00 BNB', entry: 570.25, bot: 'Infinity Scalper', exchange: 'Bitget' },
  { market: 'XRP/USDT', symbol: 'XRPUSDT', side: 'Long', size: 1500, sizeStr: '1,500 XRP', entry: 0.5800, bot: 'Mean Reversion AI', exchange: 'KuCoin' },
];

const PositionsTable = () => {
  const navigate = useNavigate();
  const { prices } = usePrices();

  const calculatePnL = (pos: any) => {
    const markPrice = parseFloat(prices[pos.symbol] || pos.entry.toString());
    const isLong = pos.side === 'Long';
    const pnlPct = isLong 
      ? ((markPrice - pos.entry) / pos.entry) * 100 
      : ((pos.entry - markPrice) / pos.entry) * 100;
    const pnlUsdt = pnlPct * (pos.entry * pos.size) / 100;

    return {
      mark: markPrice.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 4 }),
      pnlUsdt: (pnlUsdt >= 0 ? '+' : '') + pnlUsdt.toFixed(2),
      pnlPct: (pnlPct >= 0 ? '+' : '') + pnlPct.toFixed(2) + '%',
      isPositive: pnlPct >= 0
    };
  };

  return (
    <div className="card-base overflow-hidden">
      <div className="p-4 sm:p-6 border-b dark:border-white/5 border-gray-100 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h3 className="text-base sm:text-lg font-bold dark:text-white text-gray-900 uppercase tracking-wider">Open Positions</h3>
          <p className="text-[11px] text-gray-500 mt-1">Live positions updated in real time.</p>
        </div>
        <button className="text-xs sm:text-sm font-bold text-gray-500 hover:text-emerald-600 transition-colors">View All Positions</button>
      </div>

      <div className="block xl:hidden p-4 space-y-4">
        {initialPositions.map((pos, idx) => {
          const liveData = calculatePnL(pos);
          return (
            <div key={idx} className="bg-[#0f1221] border border-white/5 rounded-3xl p-4 shadow-sm">
              <div className="flex items-center justify-between gap-3 mb-3">
                <div>
                  <p className="text-sm font-bold text-white">{pos.market}</p>
                  <p className="text-[11px] text-gray-400">{pos.bot} · {pos.exchange}</p>
                </div>
                <span className={`text-[11px] font-black uppercase px-2 py-1 rounded-full ${pos.side === 'Long' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-rose-500/10 text-rose-400'}`}>
                  {pos.side}
                </span>
              </div>
              <div className="grid grid-cols-2 gap-3 text-[11px] text-gray-400">
                <div className="space-y-1">
                  <p className="text-white font-bold">Size</p>
                  <p>{pos.sizeStr}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-white font-bold">Mark</p>
                  <p>{calculatePnL(pos).mark}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-white font-bold">PnL</p>
                  <p className={liveData.isPositive ? 'text-emerald-400' : 'text-rose-400'}>{liveData.pnlUsdt}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-white font-bold">Return</p>
                  <p className={liveData.isPositive ? 'text-emerald-400' : 'text-rose-400'}>{liveData.pnlPct}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="overflow-x-auto hidden xl:block">
        <table className="w-full text-left">
          <thead className="bg-gray-50 dark:bg-white/5">
            <tr>
              <Th>Market</Th>
              <Th>Side</Th>
              <Th>Size</Th>
              <Th>Entry Price</Th>
              <Th>Mark Price</Th>
              <Th>PnL (USDT)</Th>
              <Th>PnL %</Th>
              <Th>Bot</Th>
              <Th>Exchange</Th>
              <Th>Actions</Th>
            </tr>
          </thead>
          <tbody className="divide-y dark:divide-white/5 divide-gray-100">
            {initialPositions.map((pos, idx) => {
              const liveData = calculatePnL(pos);
              return (
                <tr key={idx} className="hover:bg-gray-50 dark:hover:bg-white/[0.02] transition-colors group">
                  <td className="px-6 py-4">
                    <span className="text-sm font-bold dark:text-white text-gray-800">{pos.market}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`text-[10px] font-black uppercase px-2 py-0.5 rounded ${pos.side === 'Long' ? 'text-emerald-500 bg-emerald-500/10' : 'text-rose-500 bg-rose-500/10'}`}>
                      {pos.side}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-xs font-medium dark:text-gray-300 text-gray-600">{pos.sizeStr}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-xs font-medium text-gray-400">{pos.entry.toLocaleString()}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-xs font-medium dark:text-gray-300 text-gray-600 font-mono">{liveData.mark}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`text-xs font-bold ${liveData.isPositive ? 'text-emerald-500' : 'text-rose-500'}`}>
                      {liveData.pnlUsdt}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`text-xs font-bold ${liveData.isPositive ? 'text-emerald-500' : 'text-rose-500'}`}>
                      {liveData.pnlPct}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <div className="w-5 h-5 rounded-full bg-emerald-600/20 flex items-center justify-center">
                        <div className="w-1 h-1 bg-emerald-500 rounded-full" />
                      </div>
                      <span className="text-xs font-medium text-gray-500">{pos.bot}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-xs font-medium text-gray-500">{pos.exchange}</span>
                  </td>
                  <td className="px-6 py-4">
                    <button className="p-1 hover:bg-gray-100 dark:hover:bg-white/10 rounded transition-colors text-gray-400 hover:text-emerald-600">
                      <MoreHorizontal size={16} />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div className="p-4 border-t dark:border-white/5 border-gray-100 flex justify-center">
        <button onClick={() => navigate('/history')} className="text-[10px] font-bold text-gray-400 uppercase tracking-widest hover:text-emerald-600 transition-colors">
          View All Positions
        </button>
      </div>
    </div>
  );
};

const Th = ({ children }: { children: React.ReactNode }) => (
  <th className="px-6 py-3 text-[10px] font-bold text-gray-400 uppercase tracking-widest bg-gray-50 dark:bg-white/5">{children}</th>
);

export default PositionsTable;
