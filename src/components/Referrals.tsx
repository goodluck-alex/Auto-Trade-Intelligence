import React, { useState } from 'react';
import { Users, Copy, Award, DollarSign, Target, Share2 } from 'lucide-react';
import ReferralWithdrawalModal from './ReferralWithdrawalModal';

function StatItem({ icon, label, value, change }: any) {
  return (
    <div className="card-base shadow-sm">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 rounded-xl dark:bg-white/5 bg-gray-50 flex items-center justify-center text-gray-400">
          {icon}
        </div>
        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{label}</span>
      </div>
      <p className="text-2xl font-black dark:text-white text-gray-900 mb-1">{value}</p>
      <p className="text-[10px] font-bold text-emerald-600">{change}</p>
    </div>
  );
}

function RankingItem({ rank, name, earnings }: { rank: number, name: string, earnings: string }) {
  return (
    <div className="flex items-center justify-between group">
      <div className="flex items-center gap-3">
        <span className={`text-xs font-black w-5 ${rank === 1 ? 'text-yellow-500' : rank === 2 ? 'text-gray-400' : 'text-orange-400'}`}>#{rank}</span>
        <span className="text-xs font-bold dark:text-gray-300 text-gray-600 group-hover:text-emerald-600 transition-colors">{name}</span>
      </div>
      <span className="text-xs font-black dark:text-white text-gray-900">{earnings}</span>
    </div>
  );
}

import { useAuth } from '../context/AuthContext';

const ReferralsPage = () => {
  const { isGuest, openAuthModal } = useAuth();
  const [isWithdrawOpen, setIsWithdrawOpen] = useState(false);
  const balance = 2450.00;

  return (
    <div className="space-y-6">
      <ReferralWithdrawalModal 
        isOpen={isWithdrawOpen} 
        onClose={() => setIsWithdrawOpen(false)} 
        balance={balance} 
      />

      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-black dark:text-white text-gray-900">Referral Network</h2>
          <p className="text-sm text-gray-500">Earn passive income by growing the LIDEX ecosystem.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="px-4 py-2 dark:bg-white/5 bg-white rounded-xl border dark:border-white/5 border-gray-100 shadow-sm">
            <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest block">Available Payout</span>
            <span className="text-lg font-black dark:text-white text-gray-900">${balance.toLocaleString()}</span>
          </div>
          <button 
            onClick={() => isGuest ? openAuthModal('/referrals') : setIsWithdrawOpen(true)}
            className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 rounded-xl text-sm font-bold text-white hover:shadow-lg hover:shadow-emerald-500/20 transition-all"
          >
            Withdraw Earnings
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatItem icon={<Users size={20} />} label="Total Referrals" value="1,248" change="+12 this week" />
        <StatItem icon={<DollarSign size={20} />} label="Total Earnings" value="$12,850.00" change="+$450 today" />
        <StatItem icon={<Target size={20} />} label="Active Subscriptions" value="842" change="67.4% conversion" />
        <StatItem icon={<Award size={20} />} label="Current Rank" value="Elite Partner" change="Next rank: 252 points" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="card-base">
            <h3 className="text-sm font-bold dark:text-white text-gray-900 uppercase tracking-wider mb-6">Your Referral Links</h3>
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="flex-1 dark:bg-black/30 bg-gray-50 border dark:border-white/10 border-gray-200 rounded-xl p-3 flex items-center justify-between">
                  <span className="text-sm text-gray-400 font-mono">lidex.io/join/REF-849201</span>
                  <button className="p-2 hover:bg-white/5 rounded-lg text-emerald-600 transition-colors">
                    <Copy size={18} />
                  </button>
                </div>
                <button className="p-3 bg-emerald-600 text-white rounded-xl hover:bg-emerald-700 transition-all">
                  <Share2 size={18} />
                </button>
              </div>
            </div>
          </div>
          <div className="card-base">
            <h3 className="text-sm font-bold dark:text-white text-gray-900 uppercase tracking-wider mb-6">Network Ranking</h3>
            <div className="space-y-6">
              <RankingItem rank={1} name="Sarah Trading" earnings="$142,500" />
              <RankingItem rank={2} name="Crypto Whales" earnings="$98,200" />
              <RankingItem rank={3} name="Bot Master" earnings="$84,100" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReferralsPage;
