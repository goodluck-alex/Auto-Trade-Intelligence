import React, { useState, useEffect } from 'react';
import { Brain, Zap, Target, ShieldCheck, Activity, Info, Radar, ArrowUpRight, TrendingUp } from 'lucide-react';
import { mockApi } from '../services/mockApi';

const IntelligenceHub = () => {
  const [intel, setIntel] = useState<any>(null);

  useEffect(() => {
    const fetch = () => mockApi.getMarketIntelligence().then(setIntel);
    fetch();
    const interval = setInterval(fetch, 5000);
    return () => clearInterval(interval);
  }, []);

  if (!intel) return null;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Regime Detection */}
        <div className="card-base relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-3 opacity-10 group-hover:opacity-20 transition-opacity">
            <Radar size={48} className="text-emerald-500" />
          </div>
          <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3">Market Regime</p>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-600">
              <Activity size={20} />
            </div>
            <div>
              <h4 className="text-lg font-black dark:text-white text-gray-900">{intel.regime}</h4>
              <p className="text-[10px] text-emerald-500 font-bold">Confidence: {intel.confidence}%</p>
            </div>
          </div>
        </div>

        {/* Sentiment Analysis */}
        <div className="card-base group">
          <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3">AI Sentiment</p>
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-xl ${intel.sentiment === 'Bullish' ? 'bg-emerald-500/10 text-emerald-600' : 'bg-rose-500/10 text-rose-600'} flex items-center justify-center`}>
              <TrendingUp size={20} />
            </div>
            <div>
              <h4 className="text-lg font-black dark:text-white text-gray-900">{intel.sentiment}</h4>
              <p className="text-[10px] text-gray-500 font-medium italic">Scanning 42 indicators...</p>
            </div>
          </div>
        </div>

        {/* Support/Resistance */}
        <div className="card-base">
          <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3">Support & Resistance</p>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold text-gray-400 uppercase">Resistance</span>
              <span className="text-xs font-black text-rose-500">{intel.resistance.toLocaleString()}</span>
            </div>
            <div className="h-1.5 bg-gray-100 dark:bg-black/30 rounded-full overflow-hidden">
               <div className="h-full bg-gradient-to-r from-emerald-500 to-rose-500 w-[65%]" />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold text-gray-400 uppercase">Support</span>
              <span className="text-xs font-black text-emerald-500">{intel.support.toLocaleString()}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Intelligence Workflow Steps */}
      <div className="card-base">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <Brain className="text-emerald-600" size={24} />
            <h3 className="text-sm font-black dark:text-white text-gray-900 uppercase tracking-wider">AI Intelligence Workflow</h3>
          </div>
          <div className="flex items-center gap-2 px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 rounded-full">
             <span className="flex h-1.5 w-1.5 rounded-full bg-emerald-600 animate-pulse" />
             <span className="text-[8px] font-black text-emerald-600 uppercase tracking-widest">Real-time Analysis Active</span>
          </div>
        </div>
        
        <div className="flex flex-wrap items-center justify-between gap-4">
           <WorkflowStep icon={<Radar size={16}/>} label="Market Scan" active />
           <ArrowRight />
           <WorkflowStep icon={<Zap size={16}/>} label="Regime Detected" active />
           <ArrowRight />
           <WorkflowStep icon={<Target size={16}/>} label="Opportunity Scoring" active />
           <ArrowRight />
           <WorkflowStep icon={<ShieldCheck size={16}/>} label="Risk Validation" active />
           <ArrowRight />
           <WorkflowStep icon={<Activity size={16}/>} label="Live Monitoring" />
        </div>
      </div>
    </div>
  );
};

const WorkflowStep = ({ icon, label, active = false }: any) => (
  <div className={`flex flex-col items-center gap-2 p-4 rounded-xl border transition-all ${active ? 'bg-emerald-600 border-emerald-500 shadow-lg shadow-emerald-500/20' : 'bg-transparent border-dashed border-gray-200 dark:border-white/10 opacity-40'}`}>
    <div className={`${active ? 'text-white' : 'text-gray-400'}`}>{icon}</div>
    <span className={`text-[10px] font-black uppercase tracking-wider text-center ${active ? 'text-white' : 'text-gray-500'}`}>{label}</span>
  </div>
);

const ArrowRight = () => (
  <div className="hidden lg:block text-gray-300 dark:text-white/5">
    <ArrowUpRight size={20} className="rotate-45" />
  </div>
);

export default IntelligenceHub;
