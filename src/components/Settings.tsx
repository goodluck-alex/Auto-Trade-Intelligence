import React, { useState, useEffect } from 'react';
import { Shield, Key, User, Bell, Save, Trash2, Activity, AlertCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { ExchangeService } from '../api/ExchangeService';

const ProfileInput = ({ label, value, onChange, placeholder }: any) => (
  <div className="space-y-1">
    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{label}</label>
    <input 
      type="text" 
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className="w-full bg-gray-50 dark:bg-black/20 border dark:border-white/10 border-gray-200 rounded-2xl px-5 py-4 text-xs font-bold focus:outline-none focus:border-emerald-500 transition-all dark:text-white text-gray-900" 
    />
  </div>
);

const SettingsNav = ({ icon, label, active = false }: any) => (
  <button className={`w-full flex items-center gap-3 px-5 py-4 rounded-2xl transition-all group ${active ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-500/20' : 'text-gray-500 hover:bg-gray-100 dark:hover:bg-white/5'}`}>
    <span className={active ? 'text-white' : 'group-hover:text-emerald-500'}>{icon}</span>
    <span className="text-xs font-black uppercase tracking-wider">{label}</span>
  </button>
);

const SettingsPage = () => {
  const { user } = useAuth();
  const [apiKeys, setApiKeys] = useState<any[]>([]);
  const [profile, setProfile] = useState({ 
    name: user?.name || '', 
    email: user?.email || '',
    phone: '',
    country: 'United Kingdom',
    timezone: 'UTC +00:00',
    language: 'English'
  });
  const [testingId, setTestingId] = useState<string | null>(null);

  useEffect(() => {
    setApiKeys(ExchangeService.getKeys());
  }, []);

  const handleTestConnection = async (id: string) => {
    setTestingId(id);
    await ExchangeService.testConnection(id);
    setTestingId(null);
    alert("Connection Successful!");
  };

  const handleAddKey = async () => {
    const exchange = prompt("Exchange Name:");
    const key = prompt("API Key:");
    if (!exchange || !key) return;
    const newKey = await ExchangeService.addKey({ exchange, key });
    setApiKeys([...apiKeys, newKey]);
  };

  const handleSaveProfile = () => {
    alert("Profile preferences updated!");
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto pb-20">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-black dark:text-white text-gray-900 uppercase tracking-tight">Account Configuration</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="space-y-1">
          <SettingsNav icon={<User size={18} />} label="Profile Information" active />
          <SettingsNav icon={<Key size={18} />} label="API Key Management" />
          <SettingsNav icon={<Bell size={18} />} label="Notifications" />
          <SettingsNav icon={<Shield size={18} />} label="Security & Privacy" />
        </div>

        <div className="md:col-span-2 space-y-6">
          <div className="card-base">
            <h3 className="text-sm font-black dark:text-white text-gray-900 uppercase tracking-wider mb-8">Personal Details</h3>
            <div className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <ProfileInput label="Full Name" value={profile.name} onChange={(v: string) => setProfile({...profile, name: v})} />
                <ProfileInput label="Email Address" value={profile.email} onChange={(v: string) => setProfile({...profile, email: v})} />
                <ProfileInput label="Phone Number" value={profile.phone} placeholder="+44 7…" onChange={(v: string) => setProfile({...profile, phone: v})} />
                <div className="space-y-1">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Country</label>
                  <select 
                    value={profile.country} 
                    onChange={(e) => setProfile({...profile, country: e.target.value})}
                    className="w-full bg-gray-50 dark:bg-black/20 border dark:border-white/10 border-gray-200 rounded-2xl px-5 py-4 text-xs focus:outline-none focus:border-emerald-500 transition-all dark:text-white text-gray-900 font-bold"
                  >
                    <option>United Kingdom</option>
                    <option>United States</option>
                    <option>Germany</option>
                    <option>Japan</option>
                  </select>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <button onClick={handleSaveProfile} className="flex items-center gap-2 px-8 py-4 bg-emerald-600 hover:bg-emerald-700 rounded-2xl text-xs font-black uppercase text-white transition-all shadow-lg shadow-emerald-500/20">
                  <Save size={18} /> Update Profile
                </button>
                <button className="flex items-center gap-2 px-8 py-4 bg-gray-100 dark:bg-white/5 dark:text-white text-gray-900 rounded-2xl text-xs font-black uppercase border border-transparent hover:border-gray-200 dark:hover:border-white/10 transition-all">
                  Export Data
                </button>
              </div>
            </div>
          </div>

          <div className="card-base">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-sm font-black dark:text-white text-gray-900 uppercase tracking-wider">Exchange API Management</h3>
              <button 
                onClick={handleAddKey}
                className="text-xs font-black text-emerald-600 uppercase tracking-widest hover:text-emerald-700 transition-colors"
              >
                + Add New Key
              </button>
            </div>
            <div className="space-y-4">
              {apiKeys.map((key) => (
                <div key={key.id} className="flex items-center justify-between p-5 bg-gray-50 dark:bg-black/20 border dark:border-white/5 border-gray-100 rounded-2xl">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-white shadow-sm flex items-center justify-center dark:bg-black/40">
                      <Activity size={18} className="text-blue-500" />
                    </div>
                    <div>
                      <p className="text-xs font-bold dark:text-white text-gray-900">{key.exchange}</p>
                      <p className="text-[10px] text-gray-400 font-mono">{key.key}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <button 
                      onClick={() => handleTestConnection(key.id)}
                      className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase transition-all ${testingId === key.id ? 'bg-emerald-100 text-emerald-600 animate-pulse' : 'bg-white dark:bg-white/5 text-gray-500 hover:text-emerald-600 shadow-sm'}`}
                    >
                      {testingId === key.id ? 'Testing...' : 'Test Sync'}
                    </button>
                    <button 
                      onClick={() => setApiKeys(apiKeys.filter(k => k.id !== key.id))}
                      className="p-2 text-gray-400 hover:text-rose-500 transition-colors bg-white dark:bg-black/20 rounded-xl shadow-sm border border-gray-100 dark:border-transparent"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              ))}
              {apiKeys.length === 0 && (
                <div className="text-center py-12 border-2 border-dashed border-gray-100 dark:border-white/5 rounded-3xl">
                  <AlertCircle className="mx-auto mb-3 text-gray-300" size={40} />
                  <p className="text-xs text-gray-400 font-black uppercase tracking-widest">No API Credentials Found</p>
                </div>
              )}
            </div>
          </div>

          <div className="p-8 border-2 border-rose-500/20 rounded-3xl bg-rose-500/5 space-y-4">
             <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-rose-500/10 flex items-center justify-center text-rose-500">
                   <Trash2 size={24} />
                </div>
                <div>
                   <h4 className="text-lg font-black text-rose-600 uppercase italic">Danger Zone</h4>
                   <p className="text-xs text-gray-500 font-medium">This action will immediately stop all active bots and wipe your profile.</p>
                </div>
             </div>
             <button className="w-full py-4 bg-rose-600 hover:bg-rose-700 text-white text-xs font-black uppercase rounded-2xl transition-all shadow-lg shadow-rose-500/20">Permanently Delete Account</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
