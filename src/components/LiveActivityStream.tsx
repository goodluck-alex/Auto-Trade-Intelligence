import React, { useState, useEffect } from 'react';
import { Terminal, ShieldCheck, Zap, Target, Search, BarChart } from 'lucide-react';

const initialLogs = [
  { id: 1, type: 'scan', msg: 'Scanning BTC/USDT order book liquidity...', time: '14:20:01' },
  { id: 2, type: 'risk', msg: 'Risk validation passed. Exposure limit 12.4/40%.', time: '14:20:02' },
  { id: 3, type: 'intel', msg: 'New Breakout regime detected on ETH/USDT.', time: '14:20:05' },
];

const LiveActivityStream = () => {
  const [logs, setLogs] = useState(initialLogs);

  useEffect(() => {
    const interval = setInterval(() => {
      const types = ['scan', 'risk', 'intel', 'execute', 'learn'];
      const msgs = [
        'AI detected high-volume accumulation on SOL.',
        'Trailing stop-loss adjusted to +2.5% on BTC position.',
        'Correlation filter blocked new XRP long entry.',
        'Learning engine optimizing Mean Reversion parameters.',
        'Exchange health check: Binance latency 24ms.'
      ];
      
      const newLog = {
        id: Date.now(),
        type: types[Math.floor(Math.random() * types.length)],
        msg: msgs[Math.floor(Math.random() * msgs.length)],
        time: new Date().toLocaleTimeString().split(' ')[0]
      };

      setLogs(prev => [newLog, ...prev].slice(0, 10));
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="dark:bg-[#0d0e1a] bg-gray-900 rounded-2xl border dark:border-white/5 border-gray-800 p-4 font-mono overflow-hidden h-[300px] flex flex-col shadow-2xl">
      <div className="flex items-center justify-between mb-4 border-b border-white/5 pb-2">
        <div className="flex items-center gap-2">
          <Terminal size={14} className="text-emerald-500" />
          <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Live Execution Stream</span>
        </div>
        <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
      </div>
      
      <div className="flex-1 overflow-y-auto space-y-3 scrollbar-hide">
        {logs.map(log => (
          <div key={log.id} className="flex items-start gap-3 text-[10px] animate-in fade-in slide-in-from-left-2">
            <span className="text-gray-600 shrink-0">[{log.time}]</span>
            <LogIcon type={log.type} />
            <span className="text-gray-300 leading-relaxed">{log.msg}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

const LogIcon = ({ type }: { type: string }) => {
  switch (type) {
    case 'risk': return <ShieldCheck size={12} className="text-rose-500 shrink-0" />;
    case 'scan': return <Search size={12} className="text-blue-500 shrink-0" />;
    case 'intel': return <BarChart size={12} className="text-emerald-500 shrink-0" />;
    case 'execute': return <Zap size={12} className="text-amber-500 shrink-0" />;
    case 'learn': return <Target size={12} className="text-emerald-500 shrink-0" />;
    default: return <Terminal size={12} className="text-gray-500 shrink-0" />;
  }
};

export default LiveActivityStream;
