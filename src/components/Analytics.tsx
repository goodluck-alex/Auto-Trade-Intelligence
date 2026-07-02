import React from 'react';
import { 
  LineChart, 
  Line, 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar
} from 'recharts';
import { Info, TrendingUp, ArrowDownRight, ArrowUpRight, Target, Activity, ShieldCheck, Zap } from 'lucide-react';
import { usePrices } from '../context/PriceContext';

const roiData = [
  { name: 'Week 1', roi: 4.2 },
  { name: 'Week 2', roi: 8.5 },
  { name: 'Week 3', roi: 6.8 },
  { name: 'Week 4', roi: 12.4 },
  { name: 'Week 5', roi: 18.2 },
  { name: 'Week 6', roi: 15.6 },
  { name: 'Week 7', roi: 24.3 },
];


const AnalyticsPage = () => {
  const { prices } = usePrices();
  const btcPrice = parseFloat(prices['BTCUSDT'] || '65000');
  const ethPrice = parseFloat(prices['ETHUSDT'] || '3500');

  const distributionData = [
    { name: 'BTC', profit: Math.floor(btcPrice * 0.08) },
    { name: 'ETH', profit: Math.floor(ethPrice * 0.9) },
    { name: 'SOL', profit: 2100 },
    { name: 'BNB', profit: 1800 },
    { name: 'XRP', profit: 800 },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">Performance Analytics</h2>
          <p className="text-sm text-gray-500">In-depth analysis of your trading strategies and bot performance.</p>
        </div>
        <div className="flex bg-[#161723] p-1 rounded-xl border border-white/5">
          {['1M', '3M', '6M', '1Y', 'All'].map((p) => (
            <button key={p} className={`px-4 py-1.5 text-xs font-bold rounded-lg transition-all ${p === '1M' ? 'bg-purple-600 text-white shadow-lg shadow-purple-500/20' : 'text-gray-500 hover:text-white'}`}>
              {p}
            </button>
          ))}
        </div>
      </div>

      {/* Advanced Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard label="Win Rate" value="68.4%" icon={<Target size={18} />} sub="Total 1,240 trades" positive />
        <MetricCard label="Profit Factor" value="2.14" icon={<TrendingUp size={18} />} sub="Gross Profit / Loss" positive />
        <MetricCard label="Max Drawdown" value="5.25%" icon={<ShieldCheck size={18} />} sub="Peak to Trough" negative />
        <MetricCard label="Sharpe Ratio" value="1.85" icon={<Activity size={18} />} sub="Risk-adjusted return" positive />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main ROI Chart */}
        <div className="lg:col-span-2 bg-[#161723] border border-white/5 rounded-2xl p-6 h-[400px] flex flex-col">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider">ROI Growth Over Time</h3>
              <Info size={14} className="text-gray-600" />
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold text-emerald-400 bg-emerald-400/10 px-2 py-1 rounded">Avg Monthly ROI: +12.4%</span>
            </div>
          </div>
          <div className="flex-1 -mx-4">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={roiData}>
                <defs>
                  <linearGradient id="colorRoi" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#a855f7" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#a855f7" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff05" vertical={false} />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#4b5563', fontSize: 10}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#4b5563', fontSize: 10}} tickFormatter={(v) => `${v}%`} />
                <Tooltip 
                  contentStyle={{backgroundColor: '#0d0e1a', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px'}}
                  itemStyle={{fontSize: '12px', fontWeight: 'bold'}}
                />
                <Area type="monotone" dataKey="roi" stroke="#a855f7" strokeWidth={3} fillOpacity={1} fill="url(#colorRoi)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Profit Distribution */}
        <div className="bg-[#161723] border border-white/5 rounded-2xl p-6 h-[400px] flex flex-col">
          <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-8">Profit by Asset</h3>
          <div className="flex-1">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={distributionData} layout="vertical">
                <XAxis type="number" hide />
                <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} tick={{fill: '#9ca3af', fontSize: 12}} width={40} />
                <Tooltip 
                  cursor={{fill: 'rgba(255,255,255,0.05)'}}
                  contentStyle={{backgroundColor: '#0d0e1a', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px'}}
                />
                <Bar dataKey="profit" fill="#3b82f6" radius={[0, 4, 4, 0]} barSize={20} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 pt-4 border-t border-white/5">
            <div className="flex items-center justify-between text-[10px] font-bold text-gray-500 uppercase tracking-widest">
              <span>Best Performer</span>
              <span className="text-emerald-400">BTC/USDT (+45%)</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bot Specific Performance */}
      <div className="bg-[#161723] border border-white/5 rounded-2xl p-6">
        <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-6">Strategy Efficiency Ranking</h3>
        <div className="space-y-4">
          <StrategyRank bot="AI Trend Master" efficiency={94} trades={420} winRate="72%" />
          <StrategyRank bot="Quantum Breakout" efficiency={88} trades={128} winRate="64%" />
          <StrategyRank bot="Grid Scalper Pro" efficiency={82} trades={850} winRate="78%" />
          <StrategyRank bot="Infinity Scalper" efficiency={76} trades={210} winRate="61%" />
        </div>
      </div>
    </div>
  );
};

const MetricCard = ({ label, value, icon, sub, positive, negative }: any) => (
  <div className="bg-[#161723] border border-white/5 rounded-2xl p-5 hover:border-white/10 transition-all group">
    <div className="flex items-center justify-between mb-4">
      <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-gray-500 group-hover:text-purple-400 transition-colors">
        {icon}
      </div>
      {positive && <ArrowUpRight size={16} className="text-emerald-500" />}
      {negative && <ArrowDownRight size={16} className="text-rose-500" />}
    </div>
    <p className="text-2xl font-black text-white mb-1">{value}</p>
    <div className="flex flex-col">
      <span className="text-[10px] font-bold text-gray-600 uppercase tracking-widest">{label}</span>
      <span className="text-[10px] text-gray-400 mt-1">{sub}</span>
    </div>
  </div>
);

const StrategyRank = ({ bot, efficiency, trades, winRate }: any) => (
  <div className="flex items-center gap-6 group">
    <div className="w-1/4">
      <p className="text-xs font-bold text-white flex items-center gap-2">
        <Zap size={14} className="text-purple-500" /> {bot}
      </p>
      <p className="text-[10px] text-gray-500 mt-1">{trades} Trades</p>
    </div>
    <div className="flex-1 h-2 bg-black/30 rounded-full overflow-hidden">
      <div 
        className="h-full bg-gradient-to-r from-purple-600 to-blue-500 group-hover:from-purple-500 group-hover:to-emerald-500 transition-all duration-500" 
        style={{width: `${efficiency}%`}} 
      />
    </div>
    <div className="w-32 text-right">
      <p className="text-xs font-bold text-emerald-400">{winRate} Win Rate</p>
      <p className="text-[10px] text-gray-500 mt-1">Eff. {efficiency}%</p>
    </div>
  </div>
);

export default AnalyticsPage;
