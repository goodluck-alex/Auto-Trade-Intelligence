import React from 'react';
import { 
  TrendingUp, 
  Wallet, 
  Activity, 
  Target, 
  Layers, 
  Cpu, 
  Info,
  Maximize2,
  ChevronDown,
  ArrowUpRight,
  ShieldCheck
} from 'lucide-react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';

const RiskMetric = ({ label, value }: { label: string, value: string }) => (
  <div className="flex items-center justify-between w-full">
    <span className="text-[10px] font-medium text-gray-500 uppercase tracking-widest">{label}</span>
    <span className="text-[10px] font-bold text-white">{value}</span>
  </div>
);

// --- Stat Card ---
export const StatCard = ({ label, value, change, subLabel, icon }: any) => {
  const icons: any = {
    balance: <Wallet className="text-blue-500" size={20} />,
    equity: <Target className="text-emerald-500" size={20} />,
    daily: <Activity className="text-orange-500" size={20} />,
    monthly: <TrendingUp className="text-emerald-500" size={20} />,
    positions: <Layers className="text-blue-600" size={20} />,
    bots: <Cpu className="text-emerald-600" size={20} />,
  };

  return (
    <div className="card-base group hover:border-emerald-500/30">
      <div className="flex items-center gap-3 mb-3">
        <div className="w-10 h-10 rounded-xl dark:bg-white/5 bg-gray-50 flex items-center justify-center group-hover:scale-110 transition-transform">
          {icons[icon]}
        </div>
        <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">{label}</span>
      </div>
      <div className="space-y-1">
        <p className="text-xl font-black dark:text-white text-gray-900 tracking-tight">{value}</p>
        <div className="flex items-center gap-2">
          {change ? (
            <span className="text-[10px] font-bold text-emerald-500 bg-emerald-500/10 px-1.5 py-0.5 rounded flex items-center gap-0.5">
              <ArrowUpRight size={10} /> {change}
            </span>
          ) : (
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">{subLabel}</span>
          )}
        </div>
      </div>
    </div>
  );
};

import MarketChart from './MarketChart';

// --- Performance Chart ---
export const PerformanceChart = () => {
  const [timeframe, setTimeframe] = React.useState('1H');

  return (
    <div className="card-base min-h-[420px] flex flex-col">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <h3 className="text-sm font-black dark:text-white text-gray-900 uppercase tracking-wider">Live Market Analysis</h3>
          <div className="flex items-center gap-2 px-2 py-0.5 bg-emerald-500/10 border border-emerald-500/20 rounded text-[8px] font-black text-emerald-500 uppercase tracking-widest">
            <span className="flex h-1 w-1 rounded-full bg-emerald-500 animate-pulse" /> Live Feed
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex bg-gray-100 dark:bg-black/30 p-1 rounded-xl">
            {['1H', '4H', '1D', '1W', '1M'].map((t) => (
              <button 
                key={t} 
                onClick={() => setTimeframe(t)}
                className={`px-3 py-1 text-[10px] font-black rounded-lg transition-all ${t === timeframe ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-500/20' : 'text-gray-400 hover:text-gray-900 dark:hover:text-white'}`}
              >
                {t}
              </button>
            ))}
          </div>
          <button className="flex items-center gap-2 px-3 py-1.5 dark:bg-[#1f202c] bg-gray-50 border dark:border-white/5 border-gray-100 rounded-lg text-xs font-bold text-gray-500">
            BTC/USDT <ChevronDown size={14} />
          </button>
          <Maximize2 size={16} className="text-gray-400 hover:text-emerald-500 cursor-pointer transition-colors" />
        </div>
      </div>

      <div className="flex-1 -mx-2">
        <MarketChart symbol="BTC/USDT" timeframe={timeframe} />
      </div>
    </div>
  );
};

// --- Market Intelligence ---
export const MarketIntelligence = () => {
  const items = [
    { label: 'Market Regime', value: 'Trending', color: 'text-emerald-400', icon: <TrendingUp size={16} /> },
    { label: 'Open Interest', value: 'High 78/100', color: 'text-emerald-400', icon: <Activity size={16} /> },
    { label: 'Funding Rate', value: 'Positive', color: 'text-emerald-400', icon: <Target size={16} /> },
    { label: 'Market Sentiment', value: 'Bullish 72/100', color: 'text-emerald-400', icon: <ShieldCheck size={16} /> },
    { label: 'Liquidity', value: 'Good 68/100', color: 'text-emerald-400', icon: <Layers size={16} /> },
    { label: 'News Risk', value: 'Low Risk 20/100', color: 'text-emerald-400', icon: <Info size={16} /> },
  ];

  return (
    <div className="card-base min-h-[400px]">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-sm font-bold text-white uppercase tracking-wider">Market Intelligence</h3>
        <button className="text-[10px] font-bold text-emerald-400 hover:text-emerald-300 transition-colors uppercase">View All</button>
      </div>
      <div className="space-y-4">
        {items.map((item, idx) => (
          <div key={idx} className="flex items-center justify-between group cursor-default">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-gray-500 group-hover:bg-emerald-500/10 group-hover:text-emerald-400 transition-all">
                {item.icon}
              </div>
              <span className="text-xs text-gray-400">{item.label}</span>
            </div>
            <span className={`text-xs font-bold ${item.color}`}>{item.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

// --- Portfolio Risk ---
export const PortfolioRisk = () => {
  return (
    <div className="card-base flex flex-col items-center text-center">
      <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-6 self-start">Portfolio Risk</h3>
      <div className="relative w-32 h-32 mb-6">
        <svg className="w-full h-full transform -rotate-90">
          <circle cx="64" cy="64" r="58" stroke="currentColor" strokeWidth="8" fill="transparent" className="text-white/5" />
          <circle cx="64" cy="64" r="58" stroke="currentColor" strokeWidth="8" fill="transparent" strokeDasharray="364.4" strokeDashoffset="260" className="text-orange-500" />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-3xl font-bold text-white">28</span>
          <span className="text-[10px] text-gray-500 font-bold">/100</span>
        </div>
      </div>
      <p className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest mb-4">Low Risk</p>
      <div className="w-full space-y-2">
        <RiskMetric label="Max Drawdown" value="5.25%" />
        <RiskMetric label="Daily VaR" value="2.35%" />
        <RiskMetric label="Exposure" value="45.80%" />
      </div>
    </div>
  );
};

// --- Asset Allocation ---
const COLORS = ['#3b82f6', '#f59e0b', '#a855f7', '#4b5563'];
const assetData = [
  { name: 'USDT', value: 45.6 },
  { name: 'BTC', value: 25.3 },
  { name: 'ETH', value: 15.2 },
  { name: 'Others', value: 13.9 },
];

export const AssetAllocation = () => {
  return (
    <div className="card-base flex flex-col items-center">
      <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-6 self-start">Asset Allocation</h3>
      <div className="w-32 h-32 mb-6">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={assetData}
              innerRadius={45}
              outerRadius={60}
              paddingAngle={5}
              dataKey="value"
            >
              {assetData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>
      <div className="w-full space-y-2">
        {assetData.map((item, idx) => (
          <div key={item.name} className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full" style={{backgroundColor: COLORS[idx]}} />
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{item.name}</span>
            </div>
            <span className="text-[10px] font-bold text-white">{item.value}%</span>
          </div>
        ))}
      </div>
    </div>
  );
};

// --- Risk Summary ---
export const RiskSummary = () => {
  return (
    <div className="card-base">
      <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-6">Risk Summary</h3>
      <div className="space-y-4">
        <RiskMetric label="Max Daily Loss" value="5.00%" />
        <RiskMetric label="Max Leverage" value="10x" />
        <RiskMetric label="Max Positions" value="15" />
        <RiskMetric label="Current Leverage" value="4.2x" />
      </div>
    </div>
  );
};

// --- Bot Status ---
const botData = [
  { name: 'Running', value: 7, color: '#10b981' },
  { name: 'Paused', value: 1, color: '#f59e0b' },
  { name: 'Stopped', value: 1, color: '#ef4444' },
];

export const BotStatus = () => {
  return (
    <div className="card-base flex flex-col items-center">
      <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-6 self-start">Bot Status</h3>
      <div className="w-32 h-32 mb-6">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={botData}
              innerRadius={45}
              outerRadius={60}
              paddingAngle={5}
              dataKey="value"
            >
              {botData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>
      <div className="w-full space-y-2">
        {botData.map((item) => (
          <div key={item.name} className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full" style={{backgroundColor: item.color}} />
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{item.name}</span>
            </div>
            <span className="text-[10px] font-bold text-white">{item.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
