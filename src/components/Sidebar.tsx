import React from 'react';
import { 
  LayoutDashboard, 
  Bot, 
  History, 
  BarChart3, 
  Shield,
  Settings, 
  Globe, 
  TrendingUp,
  Users,
  Award,
  ShieldAlert,
  LogOut,
  HelpCircle,
  Rocket,
  HandMetal
} from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { useAuth } from '../context/AuthContext';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

import { useNavigate } from 'react-router-dom';

interface SidebarProps {
  isOpen: boolean;
  isMobileOpen: boolean;
  setIsOpen: (open: boolean) => void;
  setIsMobileOpen: (open: boolean) => void;
  activeTab: string;
  onUpgrade?: () => void;
}

interface NavSectionProps {
  title: string;
  children: React.ReactNode;
}

function NavSection({ title, children }: NavSectionProps) {
  return (
    <section>
      <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest px-2 mb-4">{title}</p>
      <div className="space-y-1">{children}</div>
    </section>
  );
}

const Sidebar = ({ isOpen, isMobileOpen, setIsOpen, setIsMobileOpen, activeTab, onUpgrade }: SidebarProps) => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleMobileNavigation = (path: string) => {
    navigate(path);
    setIsMobileOpen(false);
  };

  return (
    <>
      <aside className={cn(
        "fixed inset-y-0 left-0 z-50 flex flex-col bg-[#0d0e1a] border-r dark:border-white/5 border-gray-200 transition-all duration-300 shadow-xl",
        "hidden md:flex",
        isOpen ? "w-64" : "w-20"
      )}>
      {/* Logo Area */}
      <div className="p-4 flex items-center gap-3">
        <div className="w-12 h-12 rounded-xl overflow-hidden flex-shrink-0 shadow-lg shadow-emerald-500/20 bg-black">
          <img 
            src="https://storage.googleapis.com/bit-pwa-public-assets/lidex-logo.png" 
            alt="Lidex Logo" 
            className="w-full h-full object-contain"
          />
        </div>
        {isOpen && (
          <div className="flex flex-col">
            <span className="text-[10px] text-emerald-500 font-bold tracking-widest uppercase">Auto Trade</span>
            <span className="text-[8px] text-gray-400 font-medium uppercase tracking-[0.2em]">Intelligence</span>
          </div>
        )}
      </div>

      {/* Navigation */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-8 scrollbar-hide">
        <section>
          {isOpen && <p className="text-[10px] font-bold text-gray-600 uppercase tracking-widest px-2 mb-4">Main</p>}
          <div className="space-y-1">
            <NavItem icon={<LayoutDashboard size={20} />} label="Dashboard" active={activeTab === 'dashboard'} onClick={() => navigate('/dashboard')} isOpen={isOpen} />
            <NavItem icon={<Bot size={20} />} label="Bots" active={activeTab === 'bots'} onClick={() => navigate('/bots')} isOpen={isOpen} />
            <NavItem icon={<History size={20} />} label="Trade History" active={activeTab === 'history'} onClick={() => navigate('/history')} isOpen={isOpen} />
            <NavItem icon={<BarChart3 size={20} />} label="Analytics" active={activeTab === 'analytics'} onClick={() => navigate('/analytics')} isOpen={isOpen} />
          </div>
        </section>

        <section>
          {isOpen && <p className="text-[10px] font-bold text-gray-600 uppercase tracking-widest px-2 mb-4">Market Intelligence</p>}
          <div className="space-y-1">
            <NavItem icon={<TrendingUp size={20} />} label="AI Signals" active={activeTab === 'signals'} onClick={() => navigate('/analytics')} isOpen={isOpen} />
            <NavItem icon={<Globe size={20} />} label="News & Events" active={activeTab === 'news'} onClick={() => navigate('/company')} isOpen={isOpen} />
            <NavItem icon={<Award size={20} />} label="Market Regime" active={activeTab === 'regime'} onClick={() => navigate('/dashboard')} isOpen={isOpen} />
          </div>
        </section>

        <section>
          {isOpen && <p className="text-[10px] font-bold text-gray-600 uppercase tracking-widest px-2 mb-4">Account & Trust</p>}
          <div className="space-y-1">
            <NavItem icon={<Settings size={20} />} label="Profile Settings" active={activeTab === 'settings'} onClick={() => navigate('/settings')} isOpen={isOpen} />
            <NavItem icon={<Shield size={20} />} label="Security & Trust" active={activeTab === 'security'} onClick={() => navigate('/security')} isOpen={isOpen} />
            <NavItem icon={<Users size={20} />} label="Referral Program" active={activeTab === 'referrals'} onClick={() => navigate('/referrals')} isOpen={isOpen} />
          </div>
        </section>

        <section>
          {isOpen && <p className="text-[10px] font-bold text-gray-600 uppercase tracking-widest px-2 mb-4">Resources</p>}
          <div className="space-y-1">
            <NavItem icon={<HelpCircle size={20} />} label="Support Center" active={activeTab === 'support'} onClick={() => navigate('/support')} isOpen={isOpen} />
            <NavItem icon={<Rocket size={20} />} label="About Lidex" active={activeTab === 'company'} onClick={() => navigate('/company')} isOpen={isOpen} />
            <NavItem icon={<HandMetal size={20} />} label="Legal Docs" active={activeTab === 'legal'} onClick={() => navigate('/legal')} isOpen={isOpen} />
          </div>
        </section>

        {user?.role === 'admin' && (
          <section>
            {isOpen && <p className="text-[10px] font-bold text-rose-500 uppercase tracking-widest px-2 mb-4">Administration</p>}
            <div className="space-y-1">
              <NavItem icon={<ShieldAlert size={20} className="text-rose-500" />} label="System Admin" active={activeTab === 'admin'} onClick={() => navigate('/admin')} isOpen={isOpen} />
            </div>
          </section>
        )}

        <section className="pt-4 mt-4 border-t dark:border-white/5 border-gray-100">
          <NavItem icon={<LogOut size={20} />} label="Sign Out" onClick={logout} isOpen={isOpen} />
        </section>
      </div>

      {/* Upgrade Banner */}
      {isOpen && (
        <div className="p-4">
          <div className="bg-gradient-to-br from-purple-600/20 to-blue-600/20 border border-purple-500/30 rounded-2xl p-4 relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-2">
              <Award className="text-purple-400 opacity-20 group-hover:opacity-40 transition-opacity" size={40} />
            </div>
            <p className="text-sm font-bold text-white mb-1">Upgrade to VIP</p>
            <p className="text-[10px] text-gray-400 mb-3">Unlock Advanced AI Strategies & Higher Limits</p>
            <button 
              onClick={onUpgrade}
              className="w-full py-2 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg text-xs font-bold text-white hover:shadow-lg hover:shadow-purple-500/20 transition-all"
            >
              Upgrade Now
            </button>
          </div>
        </div>
      )}
    </aside>

      <div className={cn(
        "fixed inset-0 z-40 bg-black/40 transition-opacity duration-300 md:hidden",
        isMobileOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
      )} onClick={() => setIsMobileOpen(false)} />

      <aside className={cn(
        "fixed inset-y-0 left-0 z-50 w-72 bg-[#0d0e1a] border-r border-white/10 transition-transform duration-300 md:hidden",
        isMobileOpen ? 'translate-x-0' : '-translate-x-full'
      )}>
        <div className="p-4 flex items-center gap-3 border-b border-white/10">
          <div className="w-12 h-12 rounded-xl overflow-hidden flex-shrink-0 shadow-lg shadow-emerald-500/20 bg-black">
            <img 
              src="https://storage.googleapis.com/bit-pwa-public-assets/lidex-logo.png" 
              alt="Lidex Logo" 
              className="w-full h-full object-contain"
            />
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-bold text-white tracking-wider uppercase">LIDEX</span>
            <span className="text-[11px] text-gray-400 uppercase tracking-[0.2em]">Auto Trade Intelligence</span>
          </div>
        </div>
        <div className="flex-1 overflow-y-auto px-4 py-4 space-y-6 scrollbar-hide">
          <NavSection title="Main">
            <NavItem icon={<LayoutDashboard size={20} />} label="Dashboard" active={activeTab === 'dashboard'} onClick={() => handleMobileNavigation('/dashboard')} isOpen />
            <NavItem icon={<Bot size={20} />} label="Bots" active={activeTab === 'bots'} onClick={() => handleMobileNavigation('/bots')} isOpen />
            <NavItem icon={<History size={20} />} label="Trade History" active={activeTab === 'history'} onClick={() => handleMobileNavigation('/history')} isOpen />
            <NavItem icon={<BarChart3 size={20} />} label="Analytics" active={activeTab === 'analytics'} onClick={() => handleMobileNavigation('/analytics')} isOpen />
          </NavSection>

          <NavSection title="Market Intelligence">
            <NavItem icon={<TrendingUp size={20} />} label="AI Signals" active={activeTab === 'signals'} onClick={() => handleMobileNavigation('/analytics')} isOpen />
            <NavItem icon={<Globe size={20} />} label="News & Events" active={activeTab === 'news'} onClick={() => handleMobileNavigation('/company')} isOpen />
            <NavItem icon={<Award size={20} />} label="Market Regime" active={activeTab === 'regime'} onClick={() => handleMobileNavigation('/dashboard')} isOpen />
          </NavSection>

          <NavSection title="Account & Trust">
            <NavItem icon={<Settings size={20} />} label="Profile Settings" active={activeTab === 'settings'} onClick={() => handleMobileNavigation('/settings')} isOpen />
            <NavItem icon={<Shield size={20} />} label="Security & Trust" active={activeTab === 'security'} onClick={() => handleMobileNavigation('/security')} isOpen />
            <NavItem icon={<Users size={20} />} label="Referral Program" active={activeTab === 'referrals'} onClick={() => handleMobileNavigation('/referrals')} isOpen />
          </NavSection>

          <NavSection title="Resources">
            <NavItem icon={<HelpCircle size={20} />} label="Support Center" active={activeTab === 'support'} onClick={() => handleMobileNavigation('/support')} isOpen />
            <NavItem icon={<Rocket size={20} />} label="About Lidex" active={activeTab === 'company'} onClick={() => handleMobileNavigation('/company')} isOpen />
            <NavItem icon={<HandMetal size={20} />} label="Legal Docs" active={activeTab === 'legal'} onClick={() => handleMobileNavigation('/legal')} isOpen />
          </NavSection>

          {user?.role === 'admin' && (
            <NavSection title="Administration">
              <NavItem icon={<ShieldAlert size={20} className="text-rose-500" />} label="System Admin" active={activeTab === 'admin'} onClick={() => handleMobileNavigation('/admin')} isOpen />
            </NavSection>
          )}

          <div className="pt-4 mt-4 border-t border-white/10">
            <NavItem icon={<LogOut size={20} />} label="Sign Out" onClick={logout} isOpen />
          </div>
        </div>
        <div className="p-4 border-t border-white/10">
          <div className="bg-gradient-to-br from-purple-600/20 to-blue-600/20 rounded-2xl p-4 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-2 opacity-20">
              <Award className="text-purple-400" size={40} />
            </div>
            <p className="text-xs font-bold text-white mb-1">Upgrade to VIP</p>
            <p className="text-[11px] text-gray-400 mb-3">Unlock Advanced AI Strategies & Higher Limits</p>
            <button 
              onClick={onUpgrade}
              className="w-full py-3 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl text-xs font-bold text-white hover:shadow-lg hover:shadow-purple-500/20 transition-all"
            >
              Upgrade Now
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};

function handleClick(path: string) {
  navigate(path);
  setIsMobileOpen(false);
}
function NavItem({ icon, label, active = false, isOpen, onClick }: { icon: React.ReactNode, label: string, active?: boolean, isOpen: boolean, onClick?: () => void }) {
  return (
    <button 
      onClick={onClick}
      className={cn(
        "w-full flex items-center gap-3 px-3 py-3 rounded-2xl transition-all text-left",
        active 
          ? "bg-purple-600/10 text-white border border-purple-600/20 shadow-lg shadow-purple-500/10" 
          : "text-gray-400 hover:text-white hover:bg-white/5"
      )}
    >
      <span className={cn("transition-colors", active ? "text-purple-400" : "text-gray-400")}>{icon}</span>
      <span className="flex-1 text-sm font-bold">{label}</span>
      {active && <span className="w-2 h-2 rounded-full bg-purple-500" />}
    </button>
  );
}

export default Sidebar;
