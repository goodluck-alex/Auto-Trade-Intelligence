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
        <button onClick={onMenuToggle} className="sm:hidden p-2 rounded-2xl bg-gray-100 dark:bg-white/5 text-gray-600 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-white/10 transition-colors">
          <span className="text-xl">☰</span>
        </button>
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-gray-500 dark:text-gray-400">Welcome back</p>
          <h1 className="text-xl sm:text-2xl font-black dark:text-white text-gray-900">LIDEX Auto Trade Intelligence</h1>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <div className="relative group hidden md:block">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-purple-500 transition-colors" size={18} />
          <input 
            type="text" 
            placeholder="Search anything... Ctrl K" 
            className="dark:bg-[#161723] bg-gray-100 border dark:border-white/5 border-gray-200 rounded-2xl pl-10 pr-4 py-2 text-sm w-72 focus:outline-none focus:border-purple-500/50 transition-all dark:text-white text-gray-900"
          />
        </div>

        <div className="flex items-center gap-2 pr-4 border-r dark:border-white/10 border-gray-200">
          <IconButton onClick={toggleTheme} icon={theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />} />
          <NotificationCenter />
          <IconButton onClick={logout} icon={<LogOut size={20} />} />
        </div>

        <div className="flex items-center gap-3 cursor-pointer group">
          <div className="relative">
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-purple-500 to-blue-500 p-[2px]">
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
            <p className="text-sm font-bold dark:text-white text-gray-900 flex items-center gap-1 group-hover:text-purple-600 transition-colors">
              {user?.name || 'Guest'} <ChevronDown size={14} />
            </p>
            <p className="text-[10px] text-purple-600 font-bold uppercase tracking-wider">{user?.plan || 'Free'}</p>
          </div>
        </div>
      </div>
    </header>
  );
};

function IconButton({ icon, onClick }: { icon: React.ReactNode, onClick?: () => void }) {
  return (
    <button onClick={onClick} className="w-10 h-10 flex items-center justify-center rounded-xl text-gray-400 hover:text-purple-600 hover:bg-purple-50 dark:hover:bg-white/5 transition-all">
      {icon}
    </button>
  );
}

export default Navbar;
