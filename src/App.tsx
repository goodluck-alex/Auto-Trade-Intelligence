import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation, useNavigate } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import Dashboard from './components/Dashboard';
import RightPanel from './components/RightPanel';
import BotsPage from './components/Bots';
import ReferralsPage from './components/Referrals';
import AnalyticsPage from './components/Analytics';
import TradeHistory from './components/TradeHistory';
import SettingsPage from './components/Settings';
import AdminPage from './components/Admin';
import LegalPage from './components/Legal';
import SupportPage from './components/Support';
import SecurityPage from './components/Security';
import CompanyPage from './components/Company';
import PaymentModal from './components/PaymentModal';
import AuthModal from './components/AuthModal';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import { AuthProvider, useAuth } from './context/AuthContext';
import { PriceProvider, usePrices } from './context/PriceContext';
import { Info } from 'lucide-react';

function AppContent() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(() => localStorage.getItem('lidex_sidebar') !== 'false');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUpgradeModalOpen, setIsUpgradeModalOpen] = useState(false);
  const { theme } = useTheme();
  const { prices } = usePrices();
  const { isGuest, openAuthModal, user } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.setItem('lidex_sidebar', String(isSidebarOpen));
  }, [isSidebarOpen]);

  const activeTab = location.pathname.split('/')[1] || 'dashboard';

  const handleNavigate = (path: string) => {
    navigate(path);
    setIsMobileMenuOpen(false);
  };

  const GuestNotice = () => (
    isGuest ? (
      <div className="bg-amber-500/10 border border-amber-500/20 rounded-xl p-3 flex items-center justify-between mb-6 animate-in slide-in-from-top-2">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-amber-500/20 flex items-center justify-center text-amber-500">
            <Info size={18} />
          </div>
          <div>
            <p className="text-xs font-bold text-gray-900 dark:text-white">Guest Mode Active</p>
            <p className="text-[10px] text-gray-500">You are viewing a demo. Sign in or create an account to access live trading features.</p>
          </div>
        </div>
        <button 
          onClick={() => openAuthModal()} 
          className="px-4 py-1.5 bg-amber-500 hover:bg-amber-600 text-white text-[10px] font-black uppercase rounded-lg transition-all"
        >
          Sign In
        </button>
      </div>
    ) : null
  );

  return (
    <div className={`min-h-screen ${theme === 'light' ? 'bg-gray-50 text-gray-900' : 'bg-[#0a0b14] text-gray-300'} font-sans selection:bg-emerald-500/30 transition-colors duration-300`}>
      <Sidebar 
        isOpen={isSidebarOpen} 
        isMobileOpen={isMobileMenuOpen}
        setIsOpen={setIsSidebarOpen} 
        setIsMobileOpen={setIsMobileMenuOpen}
        activeTab={activeTab} 
        onUpgrade={() => setIsUpgradeModalOpen(true)}
      />

      <div className={`transition-all duration-300 ${isSidebarOpen ? 'md:pl-64' : 'md:pl-20'} xl:pr-[340px]`}>
        <Navbar onMenuToggle={() => setIsMobileMenuOpen((prev) => !prev)} />
        
        <PaymentModal 
          isOpen={isUpgradeModalOpen} 
          onClose={() => setIsUpgradeModalOpen(false)} 
        />

        <AuthModal />
        
        <main className="p-4 md:p-6 pb-28 md:pb-6 space-y-6 max-w-[1600px] mx-auto">
          <div className="flex items-center gap-6 overflow-x-auto pb-2 scrollbar-hide">
            <TickerItem symbol="BTC/USDT" price={prices['BTCUSDT'] || '64892.1'} change="+2.35%" color="bg-orange-500" />
            <TickerItem symbol="ETH/USDT" price={prices['ETHUSDT'] || '3512.45'} change="+1.65%" color="bg-blue-400" />
            <TickerItem symbol="SOL/USDT" price={prices['SOLUSDT'] || '154.83'} change="+4.21%" color="bg-emerald-400" />
            <TickerItem symbol="BNB/USDT" price={prices['BNBUSDT'] || '585.42'} change="+1.25%" color="bg-yellow-500" />
            <TickerItem symbol="XRP/USDT" price={prices['XRPUSDT'] || '0.5987'} change="+3.22%" color="bg-blue-500" />
          </div>

          <GuestNotice />

          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/bots" element={<BotsPage />} />
            <Route path="/history" element={!isGuest ? <TradeHistory /> : <Navigate to="/dashboard" />} />
            <Route path="/analytics" element={<AnalyticsPage />} />
            <Route path="/referrals" element={<ReferralsPage />} />
            <Route path="/settings" element={!isGuest ? <SettingsPage /> : <Navigate to="/dashboard" />} />
            <Route path="/security" element={!isGuest ? <SecurityPage /> : <Navigate to="/dashboard" />} />
            <Route path="/admin" element={user?.role === 'admin' ? <AdminPage /> : <Navigate to="/dashboard" />} />
            <Route path="/legal" element={<LegalPage />} />
            <Route path="/support" element={<SupportPage />} />
            <Route path="/company" element={<CompanyPage />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </main>

        <div className="block xl:hidden px-4 md:px-6">
          <RightPanel inline />
        </div>
      </div>

      <div className="hidden xl:block">
        <RightPanel />
      </div>

      <MobileBottomNav activeTab={activeTab} onNavigate={handleNavigate} />
    </div>
  );
}

function MobileBottomNav({ activeTab, onNavigate }: { activeTab: string; onNavigate: (path: string) => void }) {
  const items = [
    { label: 'Dashboard', icon: '🏠', path: '/dashboard' },
    { label: 'Bots', icon: '🤖', path: '/bots' },
    { label: 'Trades', icon: '📈', path: '/history' },
    { label: 'Analytics', icon: '📊', path: '/analytics' },
    { label: 'Profile', icon: '⚙️', path: '/settings' },
  ];

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 sm:hidden bg-[#0d0e1a]/95 border-t border-white/10 backdrop-blur-xl px-3 py-2 shadow-2xl">
      <div className="flex items-center justify-between gap-2">
        {items.map((item) => (
          <button
            key={item.path}
            onClick={() => onNavigate(item.path)}
            className={`flex-1 flex flex-col items-center justify-center rounded-2xl py-2 transition-all ${activeTab === item.path.slice(1) ? 'bg-emerald-600/15 text-white' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}
          >
            <span className="text-lg leading-none">{item.icon}</span>
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] mt-1">{item.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

function TickerItem({ symbol, price, change, color }: { symbol: string, price: string, change: string, color: string }) {
  const formattedPrice = isNaN(parseFloat(price)) ? '---' : parseFloat(price).toLocaleString();
  return (
    <div className="ticker-pill min-w-fit">
      <div className={`w-2 h-2 rounded-full ${color}`} />
      <span className="text-sm font-bold dark:text-white text-gray-800">{symbol}</span>
      <span className="text-sm dark:text-gray-400 text-gray-500">{formattedPrice}</span>
      <span className={`text-xs font-bold ${change.startsWith('+') ? 'text-emerald-500' : 'text-rose-500'}`}>
        {change}
      </span>
    </div>
  );
}

function App() {
  return (
    <Router>
      <AuthProvider>
        <ThemeProvider>
          <PriceProvider>
            <AppContent />
          </PriceProvider>
        </ThemeProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
