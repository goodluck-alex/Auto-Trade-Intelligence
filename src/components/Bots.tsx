import React from 'react';
import { Bot, Play, Pause, Settings, BarChart3, ShieldCheck, Zap, Info, Lock } from 'lucide-react';
import { mockApi } from '../services/mockApi';
import { useAuth } from '../context/AuthContext';

const BotsPage = () => {
  const { user, isGuest, openAuthModal } = useAuth();
  const [bots, setBots] = React.useState<any[]>([]);
  const [loading, setLoading] = React.useState(true);
  const isVIP = user?.plan === 'VIP Plan';

  React.useEffect(() => {
    const load = () => mockApi.getBots().then(data => {
      const hasVIPBot = data.some((b: any) => b.isVIPOnly);
      if (!hasVIPBot) {
        data.push({
          id: 99,
          name: 'Elite Neural Net',
          exchange: 'Binance Futures',
          status: 'Paused',
          strategy: 'Neural Network',
          pnl: '+42.15%',
          winRate: '88%',
          drawdown: '2.1%',
          health: 99,
          color: 'from-amber-500 to-yellow-600',
          isVIPOnly: true
        });
      }
      setBots([...data]);
      setLoading(false);
    });

    load();
    const interval = setInterval(load, 3000); 
    return () => clearInterval(interval);
  }, []);

  const handleToggle = async (id: number) => {
    if (isGuest) {
      openAuthModal('/bots');
      return;
    }
    const updated = await mockApi.toggleBotStatus(id);
    setBots(updated);
  };

  const handleCreate = async () => {
    const name = prompt("Enter Bot Name:");
    if (!name) return;
    await mockApi.createBot({
      name,
      exchange: 'Binance Futures',
      strategy: 'Trend Following',
      color: 'from-purple-500 to-indigo-500'
    });
    const freshBots = await mockApi.getBots();
    setBots(freshBots);
  };

  if (loading) return <div className="p-20 text-center text-gray-500 font-bold animate-pulse">Initializing Execution Engine...</div>;

  return (
    <div className="space-y-6 transition-all duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-black dark:text-white text-gray-900">AI Execution Hub</h2>
          <p className="text-sm text-gray-500">Real-time automated strategy deployment and performance tracking.</p>
        </div>
        <button 
          onClick={handleCreate}
          className="flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl text-sm font-bold text-white hover:shadow-lg hover:shadow-purple-500/20 transition-all"
        >
          <Zap size={18} /> Deploy New Strategy
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {bots.map((bot) => (
          <div key={bot.id} className={`dark:bg-[#161723] bg-white border ${bot.status === 'Running' ? 'border-emerald-500/50 shadow-lg shadow-emerald-500/5' : 'dark:border-white/5 border-gray-200'} rounded-2xl p-6 transition-all group relative overflow-hidden`}>
            {bot.status === 'Running' && (
               <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 blur-3xl rounded-full -mr-16 -mt-16" />
            )}

            <div className="flex items-start justify-between mb-6 relative z-10">
              <div className="flex items-center gap-4">
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${bot.color} flex items-center justify-center shadow-lg relative`}>
                  <Bot className="text-white" size={28} />
                  {bot.status === 'Running' && (
                    <span className="absolute -top-1 -right-1 flex h-4 w-4">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-4 w-4 bg-emerald-500 border-2 border-white dark:border-[#161723]"></span>
                    </span>
                  )}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-lg font-black dark:text-white text-gray-900 group-hover:text-purple-600 transition-colors">{bot.name}</h3>
                    {bot.status === 'Running' && (
                      <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-500 text-[8px] font-black uppercase tracking-widest border border-emerald-500/20">Live</span>
                    )}
                  </div>
                  <p className="text-xs text-gray-500 font-medium">{bot.exchange} • <span className="text-purple-600 font-bold">{bot.strategy}</span></p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {bot.isVIPOnly && !isVIP ? (
                  <div className="flex items-center gap-2 px-4 py-2 bg-amber-500/10 border border-amber-500/30 rounded-xl text-amber-600 text-[10px] font-black uppercase">
                    <Lock size={14} /> VIP Access Only
                  </div>
                ) : (
                  <>
                    <button 
                      onClick={() => handleToggle(bot.id)}
                      className={`p-2.5 rounded-xl transition-all shadow-sm ${bot.status === 'Running' ? 'bg-orange-500 text-white hover:bg-orange-600' : 'bg-emerald-500 text-white hover:bg-emerald-600'}`}
                    >
                      {bot.status === 'Running' ? <Pause size={20} /> : <Play size={20} />}
                    </button>
                    <button className="p-2.5 bg-gray-100 dark:bg-white/5 text-gray-500 dark:text-gray-400 rounded-xl hover:bg-purple-100 dark:hover:bg-purple-600/20 hover:text-purple-600 transition-all">
                      <Settings size={20} />
                    </button>
                  </>
                )}
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4 mb-6 relative z-10">
              <BotMetric label="PnL" value={bot.pnl} color={parseFloat(bot.pnl) >= 0 ? 'text-emerald-500' : 'text-rose-500'} />
              <BotMetric label="Win Rate" value={bot.winRate} color="dark:text-white text-gray-900" />
              <BotMetric label="Health" value={`${Math.floor(bot.health)}%`} color="text-purple-600" />
            </div>

            <div className="pt-6 border-t dark:border-white/5 border-gray-100 flex items-center justify-between relative z-10">
               <div className="flex flex-col gap-1">
                 <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Strategy Pulse</p>
                 <div className="flex gap-1">
                    {[1,2,3,4,5,6,7,8].map(i => (
                      <div key={i} className={`w-1 h-3 rounded-full transition-all duration-1000 ${bot.status === 'Running' ? (Math.random() > 0.5 ? 'bg-emerald-500' : 'bg-emerald-500/20') : 'bg-gray-200 dark:bg-white/5'}`} />
                    ))}
                 </div>
               </div>
              <div className="flex items-center gap-4">
                <button className="text-[10px] font-black text-gray-400 uppercase tracking-widest hover:text-purple-600 transition-colors flex items-center gap-1.5">
                  <BarChart3 size={14} /> Analytics
                </button>
                <button className="text-[10px] font-black text-gray-400 uppercase tracking-widest hover:text-purple-600 transition-colors flex items-center gap-1.5">
                  <ShieldCheck size={14} /> Risk
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const BotMetric = ({ label, value, color }: { label: string, value: string, color: string }) => (
  <div className="dark:bg-black/20 bg-gray-50 rounded-xl p-4 border dark:border-white/5 border-gray-100 group-hover:border-purple-500/20 transition-all">
    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">{label}</p>
    <p className={`text-sm font-black ${color} tabular-nums`}>{value}</p>
  </div>
);

export default BotsPage;
