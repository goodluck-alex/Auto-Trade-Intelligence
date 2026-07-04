import React from 'react';
import { Shield, Key, Laptop, Smartphone, AlertTriangle, CheckCircle2, History, ChevronRight } from 'lucide-react';

const SecurityPage = () => {
  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-black dark:text-white text-gray-900">Security & Trust</h2>
        <div className="flex items-center gap-2 px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 rounded-full">
           <span className="flex h-1.5 w-1.5 rounded-full bg-emerald-500" />
           <span className="text-[10px] font-black text-emerald-600 uppercase tracking-widest">Account Protected</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Security Summary */}
        <div className="lg:col-span-2 space-y-6">
          {/* 2FA Section */}
          <div className="card-base">
            <div className="flex items-start justify-between mb-8">
              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 flex items-center justify-center text-emerald-600 shrink-0">
                  <Shield size={24} />
                </div>
                <div>
                  <h3 className="text-lg font-black dark:text-white text-gray-900">Two-Factor Authentication (2FA)</h3>
                  <p className="text-sm text-gray-500 mt-1">Add an extra layer of security to your LIDEX account.</p>
                </div>
              </div>
              <span className="px-3 py-1 bg-emerald-500/10 text-emerald-600 text-[10px] font-black uppercase rounded-full border border-emerald-500/20">Active</span>
            </div>
            <div className="space-y-4">
               <button className="w-full flex items-center justify-between p-4 bg-gray-50 dark:bg-black/20 border dark:border-white/10 border-gray-100 rounded-2xl group hover:border-emerald-500 transition-all">
                  <div className="flex items-center gap-3">
                     <Smartphone className="text-gray-400 group-hover:text-emerald-500" size={20} />
                     <span className="text-sm font-bold dark:text-gray-200">Google Authenticator</span>
                  </div>
                  <span className="text-xs text-emerald-600 font-bold">Configure</span>
               </button>
            </div>
          </div>

          {/* Login History */}
          <div className="card-base">
            <h3 className="text-sm font-black dark:text-white text-gray-900 uppercase tracking-wider mb-6 flex items-center gap-2">
               <History size={18} className="text-gray-400" /> Device & Login History
            </h3>
            <div className="space-y-4">
               <DeviceItem icon={<Laptop />} device="MacBook Pro • London, UK" time="Active Now" current />
               <DeviceItem icon={<Smartphone />} device="iPhone 15 • London, UK" time="2 hours ago" />
               <DeviceItem icon={<Laptop />} device="Windows PC • New York, USA" time="May 18, 2024" />
            </div>
          </div>
        </div>

        {/* Security Resources */}
        <div className="space-y-6">
          <div className="card-base">
             <h3 className="text-xs font-black dark:text-white text-gray-900 uppercase tracking-widest mb-6">Security Checklist</h3>
             <div className="space-y-4">
                <CheckItem label="Email Verified" active />
                <CheckItem label="Strong Password" active />
                <CheckItem label="2FA Enabled" active />
                <CheckItem label="API Keys Restricted" active />
                <CheckItem label="Withdrawal Whitelist" />
             </div>
          </div>

          <div className="bg-rose-500/10 border border-rose-500/20 rounded-3xl p-6">
             <div className="flex items-center gap-3 mb-4">
                <AlertTriangle className="text-rose-500" size={20} />
                <h3 className="text-xs font-black text-rose-500 uppercase tracking-widest">Vulnerability Reporting</h3>
             </div>
             <p className="text-[10px] text-gray-500 leading-relaxed mb-4">Found a security bug? Report it responsibly and earn up to $5,000 in our bug bounty program.</p>
             <button className="w-full py-2.5 bg-rose-500 hover:bg-rose-600 text-white text-[10px] font-black uppercase rounded-xl transition-all">Report Issue</button>
          </div>
        </div>
      </div>
    </div>
  );
};

const DeviceItem = ({ icon, device, time, current = false }: any) => (
  <div className="flex items-center justify-between py-4 border-b dark:border-white/5 border-gray-50 last:border-0">
    <div className="flex items-center gap-4">
       <div className="w-10 h-10 rounded-xl bg-gray-50 dark:bg-black/40 flex items-center justify-center text-gray-400">
         {icon}
       </div>
       <div>
         <p className="text-sm font-bold dark:text-gray-200 text-gray-800">{device}</p>
         <p className="text-[10px] text-gray-500 font-medium">{time}</p>
       </div>
    </div>
    {current ? (
      <span className="text-[10px] font-black text-emerald-500 uppercase tracking-widest">This Device</span>
    ) : (
      <button className="text-[10px] font-black text-gray-400 hover:text-rose-500 uppercase tracking-widest transition-colors">Revoke</button>
    )}
  </div>
);

const CheckItem = ({ label, active = false }: { label: string, active?: boolean }) => (
  <div className="flex items-center justify-between">
    <span className={`text-xs font-bold ${active ? 'dark:text-gray-300 text-gray-700' : 'text-gray-400'}`}>{label}</span>
    {active ? <CheckCircle2 size={16} className="text-emerald-500" /> : <ChevronRight size={16} className="text-gray-300" />}
  </div>
);

export default SecurityPage;
