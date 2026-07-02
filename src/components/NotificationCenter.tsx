import React, { useState, useEffect } from 'react';
import { Bell, Bot, Zap, Target, ShieldCheck, CreditCard, ChevronRight } from 'lucide-react';

export interface Notification {
  id: string;
  type: 'bot' | 'trade' | 'risk' | 'billing' | 'security';
  title: string;
  msg: string;
  time: string;
  read: boolean;
}

const NotifyIcon = ({ type }: { type: string }) => {
  switch (type) {
    case 'bot': return <Bot size={14} />;
    case 'trade': return <Zap size={14} />;
    case 'billing': return <CreditCard size={14} />;
    case 'risk': return <ShieldCheck size={14} />;
    case 'security': return <Target size={14} />;
    default: return <Bell size={14} />;
  }
};

const NotificationCenter = () => {
  const [notifications, setNotifications] = useState<Notification[]>([
    { id: '1', type: 'bot', title: 'Bot Started', msg: 'Elite Neural Net has initiated market scanning.', time: '2m ago', read: false },
    { id: '2', type: 'trade', title: 'Position Opened', msg: 'Long BTC/USDT at 64,250.50 executed.', time: '15m ago', read: false },
    { id: '3', type: 'risk', title: 'Stop Loss Adjusted', msg: 'Trailing SL moved to +2.5% on ETH position.', time: '1h ago', read: true },
    { id: '4', type: 'billing', title: 'VIP Active', msg: 'Your subscription has been successfully upgraded.', time: '2h ago', read: true },
  ]);

  const [isOpen, setIsOpen] = useState(false);
  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="relative">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-10 h-10 flex items-center justify-center rounded-xl text-gray-400 hover:text-purple-600 hover:bg-purple-50 dark:hover:bg-white/5 transition-all relative"
      >
        <Bell size={20} />
        {unreadCount > 0 && (
          <span className="absolute top-2 right-2 w-4 h-4 bg-purple-600 rounded-full border-2 dark:border-[#0a0b14] border-white text-[8px] font-black text-white flex items-center justify-center">
            {unreadCount}
          </span>
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-3 w-80 dark:bg-[#161723] bg-white border dark:border-white/10 border-gray-200 rounded-3xl shadow-2xl overflow-hidden z-[100] animate-in fade-in zoom-in-95 duration-200">
          <div className="p-5 border-b dark:border-white/5 border-gray-100 flex items-center justify-between">
            <h3 className="text-sm font-black dark:text-white text-gray-900 uppercase tracking-widest">Notifications</h3>
            <button onClick={() => setNotifications(notifications.map(n => ({...n, read: true})))} className="text-[8px] font-black text-purple-600 uppercase tracking-widest hover:underline">Mark all read</button>
          </div>
          
          <div className="max-h-[400px] overflow-y-auto scrollbar-hide">
            {notifications.map(n => (
              <div key={n.id} className={`p-4 border-b dark:border-white/5 border-gray-50 flex items-start gap-4 hover:bg-gray-50 dark:hover:bg-white/5 transition-colors cursor-pointer ${!n.read ? 'bg-purple-500/[0.02]' : ''}`}>
                <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${n.read ? 'bg-gray-100 dark:bg-white/5 text-gray-400' : 'bg-purple-600/10 text-purple-600'}`}>
                  <NotifyIcon type={n.type} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className={`text-xs font-bold ${!n.read ? 'dark:text-white text-gray-900' : 'text-gray-500'}`}>{n.title}</p>
                  <p className="text-[10px] text-gray-400 mt-1 leading-relaxed truncate">{n.msg}</p>
                  <p className="text-[8px] font-medium text-gray-500 mt-2 uppercase">{n.time}</p>
                </div>
                {!n.read && <div className="w-1.5 h-1.5 rounded-full bg-purple-600 mt-1" />}
              </div>
            ))}
          </div>

          <button className="w-full p-4 text-[10px] font-black text-gray-400 hover:text-purple-600 uppercase tracking-widest bg-gray-50 dark:bg-white/5 transition-colors">
            View All Notifications
          </button>
        </div>
      )}
    </div>
  );
};

export default NotificationCenter;
