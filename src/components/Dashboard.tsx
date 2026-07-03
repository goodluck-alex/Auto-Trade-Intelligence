import React from 'react';
import { ShieldCheck } from 'lucide-react';
import IntelligenceHub from './IntelligenceHub';
import LiveActivityStream from './LiveActivityStream';
import { 
  StatCard, 
  PerformanceChart, 
  MarketIntelligence, 
  PortfolioRisk, 
  AssetAllocation, 
  RiskSummary, 
  BotStatus 
} from './DashboardWidgets';
import PositionsTable from './PositionsTable';

const Dashboard = () => {
  return (
    <div className="space-y-6">
      {/* AI Intelligence Hub */}
      <IntelligenceHub />

      {/* Risk Alert Banner */}
      <div className="banner-base">
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-8 h-8 rounded-lg bg-emerald-500/20 flex items-center justify-center text-emerald-400">
            <ShieldCheck size={18} />
          </div>
          <div>
            <p className="text-xs font-bold text-white">Risk Engine Active</p>
            <p className="text-[10px] text-gray-500">Portfolio protected by Capital Preservation Engine. Max drawdown limit: 5% Daily.</p>
          </div>
        </div>
        <div className="flex items-center gap-4 flex-wrap justify-end">
          <div className="text-right min-w-[110px]">
            <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Global Exposure</p>
            <p className="text-xs font-bold text-white">12.4% / 40%</p>
          </div>
          <div className="w-24 h-1.5 bg-black/30 rounded-full overflow-hidden">
            <div className="h-full bg-emerald-500" style={{width: '31%'}} />
          </div>
        </div>
      </div>

      {/* Top Row: Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        <StatCard 
          label="Total Balance" 
          value="$125,430.50" 
          change="+2.35% Today" 
          icon="balance"
        />
        <StatCard 
          label="Total Equity" 
          value="$132,890.75" 
          change="+3.42% Today" 
          icon="equity"
        />
        <StatCard 
          label="Daily PnL" 
          value="$4,250.75" 
          change="+3.42%" 
          icon="daily"
        />
        <StatCard 
          label="Monthly PnL" 
          value="$18,725.45" 
          change="+12.45%" 
          icon="monthly"
        />
        <StatCard 
          label="Open Positions" 
          value="12" 
          subLabel="Active" 
          icon="positions"
        />
        <StatCard 
          label="Active Bots" 
          value="7" 
          subLabel="Running" 
          icon="bots"
        />
      </div>

      {/* Middle Row: Charts & Market Intel */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-2">
          <PerformanceChart />
        </div>
        <div className="lg:col-span-1">
          <LiveActivityStream />
        </div>
        <div>
          <MarketIntelligence />
        </div>
      </div>

      {/* Risk Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <PortfolioRisk />
        <AssetAllocation />
        <RiskSummary />
        <BotStatus />
      </div>

      {/* Positions Table */}
      <PositionsTable />
    </div>
  );
};

export default Dashboard;
