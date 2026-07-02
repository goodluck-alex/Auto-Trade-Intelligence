import React, { useState } from 'react';
import { 
  Users, 
  ShieldAlert, 
  Settings, 
  UserCheck, 
  Ban, 
  Activity, 
  TrendingUp, 
  TrendingDown,
  Globe,
  Database
} from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip } from 'recharts';

const exposureData = [
  { name: 'Total Long', value: 4500000, color: '#10b981' },
  { name: 'Total Short', value: 3200000, color: '#f43f5e' },
];

const revenueData = [
  { month: 'Jan', revenue: 45000 },
  { month: 'Feb', revenue: 52000 },
  { month: 'Mar', revenue: 48000 },
  { month: 'Apr', revenue: 61000 },
  { month: 'May', revenue: 75000 },
];

function AdminNavItem({ icon, label, active, onClick }: any) {
  return (
    <button onClick={onClick} className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${active ? 'bg-purple-600 text-white shadow-lg shadow-purple-500/20' : 'text-gray-500 hover:bg-gray-100 dark:hover:bg-white/5'}`}>
      {icon} {label}
    </button>
  );
}

function AdminStat({ icon, label, value, change }: any) {
  return (
    <div className="dark:bg-[#161723] bg-white border dark:border-white/5 border-gray-200 rounded-2xl p-5 shadow-sm">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-8 h-8 rounded-lg bg-purple-500/10 flex items-center justify-center text-purple-600">{icon}</div>
        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{label}</span>
      </div>
      <div className="flex items-baseline gap-2">
        <span className="text-2xl font-black dark:text-white text-gray-900">{value}</span>
        <span className="text-[10px] font-bold text-emerald-500">{change}</span>
      </div>
    </div>
  );
}

function RiskControl({ label, value }: { label: string, value: string }) {
  return (
    <div className="flex items-center justify-between py-2 border-b dark:border-white/5 border-gray-50 last:border-0">
      <span className="text-xs text-gray-500 font-medium">{label}</span>
      <div className="flex items-center gap-4">
        <span className="text-xs font-bold dark:text-white text-gray-900">{value}</span>
        <button className="p-1 hover:bg-gray-100 dark:hover:bg-white/5 rounded text-gray-400"><Settings size={14} /></button>
      </div>
    </div>
  );
}

const AdminPage = () => {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-black text-gray-900 dark:text-white">System Administration</h2>
          <p className="text-sm text-gray-500">Global control and monitoring for LIDEX Auto Trade platform.</p>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 bg-rose-500/10 border border-rose-500/20 rounded-xl">
          <ShieldAlert size={18} className="text-rose-500" />
          <span className="text-xs font-bold text-rose-500">Panic Mode: Disabled</span>
        </div>
      </div>

      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide">
        <AdminNavItem icon={<Activity size={16} />} label="Overview" active={activeTab === 'overview'} onClick={() => setActiveTab('overview')} />
        <AdminNavItem icon={<Users size={16} />} label="User Management" active={activeTab === 'users'} onClick={() => setActiveTab('users')} />
        <AdminNavItem icon={<Globe size={16} />} label="Exposure Dashboard" active={activeTab === 'exposure'} onClick={() => setActiveTab('exposure')} />
        <AdminNavItem icon={<Settings size={16} />} label="System Settings" active={activeTab === 'settings'} onClick={() => setActiveTab('settings')} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {activeTab === 'overview' && (
          <>
            <div className="lg:col-span-2 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <AdminStat icon={<Users size={16} />} label="Total Users" value="12,482" change="+12.5%" />
                <AdminStat icon={<Database size={16} />} label="Total AUM" value="$142.5M" change="+8.2%" />
                <AdminStat icon={<TrendingUp size={16} />} label="Revenue (MTD)" value="$75,240" change="+15.3%" />
                <AdminStat icon={<Activity size={16} />} label="Active Bots" value="4,820" change="+4.1%" />
              </div>
              <div className="dark:bg-[#161723] bg-white border dark:border-white/5 border-gray-200 rounded-2xl p-6 shadow-sm">
                <h3 className="text-sm font-bold dark:text-white text-gray-900 uppercase tracking-wider mb-8">Revenue Growth</h3>
                <div className="h-[250px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={revenueData}>
                      <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{fill: '#9ca3af', fontSize: 12}} />
                      <YAxis hide />
                      <Tooltip contentStyle={{backgroundColor: '#0d0e1a', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px'}} />
                      <Bar dataKey="revenue" fill="#7c3aed" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
            <div className="dark:bg-[#161723] bg-white border dark:border-white/5 border-gray-200 rounded-2xl p-6 shadow-sm flex flex-col items-center">
              <h3 className="text-sm font-bold dark:text-white text-gray-900 uppercase tracking-wider self-start mb-8">Global Exposure</h3>
              <div className="w-full h-[200px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={exposureData} innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="value">
                      {exposureData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="w-full space-y-3 mt-6">
                <div className="flex items-center justify-between font-bold text-xs"><span className="text-emerald-500">Long</span><span>$4.5M</span></div>
                <div className="flex items-center justify-between font-bold text-xs"><span className="text-rose-500">Short</span><span>$3.2M</span></div>
              </div>
            </div>
          </>
        )}
        {activeTab === 'users' && (
          <div className="lg:col-span-3">
             <div className="dark:bg-[#161723] bg-white border dark:border-white/5 border-gray-200 rounded-2xl overflow-hidden shadow-sm">
              <table className="w-full text-left">
                <thead className="dark:bg-white/5 bg-gray-50">
                  <tr>
                    <th className="px-6 py-4 text-[10px] font-bold text-gray-400 uppercase">User</th>
                    <th className="px-6 py-4 text-[10px] font-bold text-gray-400 uppercase">Plan</th>
                    <th className="px-6 py-4 text-[10px] font-bold text-gray-400 uppercase">Balance</th>
                    <th className="px-6 py-4 text-[10px] font-bold text-gray-400 uppercase">Status</th>
                    <th className="px-6 py-4 text-[10px] font-bold text-gray-400 uppercase">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y dark:divide-white/5 divide-gray-100">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <tr key={i} className="hover:bg-gray-50 dark:hover:bg-white/[0.02]">
                      <td className="px-6 py-4 text-xs font-bold dark:text-white text-gray-900">User_{i}482</td>
                      <td className="px-6 py-4 text-xs">VIP Plan</td>
                      <td className="px-6 py-4 text-xs">$24,500</td>
                      <td className="px-6 py-4"><span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-600 text-[10px] font-bold uppercase">Verified</span></td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <button className="p-1.5 text-emerald-500"><UserCheck size={16} /></button>
                          <button className="p-1.5 text-rose-500"><Ban size={16} /></button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
             </div>
          </div>
        )}
        {activeTab === 'settings' && (
          <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="dark:bg-[#161723] bg-white border dark:border-white/5 border-gray-200 rounded-2xl p-6 shadow-sm">
              <h3 className="text-sm font-bold dark:text-white text-gray-900 uppercase tracking-wider mb-6">Global Risk Rules</h3>
              <RiskControl label="Global Max Leverage" value="20x" />
              <RiskControl label="Default Risk Per Trade" value="1.0%" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPage;
