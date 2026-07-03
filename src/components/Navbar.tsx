import React from 'react';
import { Search, Moon, Sun, ChevronDown, LogOut } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
import NotificationCenter from './NotificationCenter';

const Navbar = ({ onMenuToggle }: { onMenuToggle: () => void }) => {
  const { theme, toggleTheme } = useTheme();
  const { user, logout } = useAuth();

  return (
    <header className="h-20 flex items-center justify-between px-4 md:px-6 border-b dark:border-white/5 border-gray-200 dark:bg-[#0a0b14]/80 bg-white/80 backdrop-blur-md sticky top-0 z-40 transition-colors duration-300">
      <div className="flex items-center gap-4">
        <button onClick={onMenuToggle} className="sm:hidden p-2 rounded-2xl bg-gray-100 dark:bg-white/5 text-gray-600 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-white/10 transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-500/20">
          <span className="text-xl">☰</span>
        </button>
      </div>

      <div className="flex items-center gap-3">
        <div className="relative group hidden md:block">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-emerald-500 transition-colors" size={18} />
          <input 
            type="text" 
            placeholder="Search anything... Ctrl K" 
            className="navbar-search w-72"
          />
        </div>
        <NotificationCenter />
        <IconButton onClick={logout} icon={<LogOut size={20} />} />
      </div>

      <div className="flex items-center gap-3 cursor-pointer group">
        <div className="relative">
          <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-emerald-500 to-blue-500 p-[2px]">
            <div className="w-full h-full rounded-full bg-white overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=100&h=100" 
                alt="User" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          <div className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 rounded-full border-2 dark:border-[#0a0b14] border-white" />
        </div>
        <div className="hidden lg:block">
          <p className="text-sm font-bold dark:text-white text-gray-900 flex items-center gap-1 group-hover:text-emerald-600 transition-colors">
            {user?.name || 'Guest'} <ChevronDown size={14} />
          </p>
          <p className="text-[10px] text-emerald-600 font-bold uppercase tracking-wider">{user?.plan || 'Free'}</p>
        </div>
      </div>
    </header>
  );
};

function IconButton({ icon, onClick }: { icon: React.ReactNode, onClick?: () => void }) {
  return (
    <button onClick={onClick} className="w-10 h-10 flex items-center justify-center rounded-xl text-gray-400 hover:text-emerald-600 hover:bg-emerald-50 dark:hover:bg-white/5 transition-all focus:outline-none focus:ring-2 focus:ring-emerald-500/20">
      {icon}
    </button>
  );
}

export default Navbar;
