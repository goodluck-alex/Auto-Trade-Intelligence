import React, { useState } from 'react';
import { X, Check, CreditCard, ShieldCheck, Zap, Star, Bitcoin, Copy } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { usePrices } from '../context/PriceContext';

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const PaymentModal = ({ isOpen, onClose }: PaymentModalProps) => {
  const { upgradePlan } = useAuth();
  const { prices } = usePrices();
  const [step, setStep] = useState(1);
  const [method, setMethod] = useState<'card' | 'crypto' | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const btcPrice = parseFloat(prices['BTCUSDT'] || '65000');
  const cryptoAmount = (199 / btcPrice).toFixed(6);

  if (!isOpen) return null;

  const handlePayment = () => {
    setIsProcessing(true);
    setTimeout(() => {
      upgradePlan('VIP Plan');
      setIsProcessing(false);
      setStep(3);
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      
      <div className="relative w-full max-w-md panel-base overflow-hidden">
        <button onClick={onClose} className="absolute top-5 right-5 p-2 text-gray-400 hover:text-gray-600 dark:hover:text-white transition-colors">
          <X size={20} />
        </button>

        <div className="p-6">
          {step === 1 && (
            <div className="space-y-5">
              <div className="text-center">
                <div className="w-16 h-16 bg-emerald-600/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Star className="text-emerald-500 fill-emerald-500" size={32} />
                </div>
                <h2 className="text-2xl font-black dark:text-white text-gray-900">Upgrade to VIP</h2>
                <p className="text-gray-500 text-sm mt-1">Unlock the full power of LIDEX AI Trading.</p>
              </div>

              <div className="space-y-3">
                <Benefit item="Advanced AI Decision Engine (95% Health)" />
                <Benefit item="Multi-Exchange Concurrent Trading" />
                <Benefit item="Priority Low-Latency Execution" />
                <Benefit item="Higher Leverage Limits (Up to 50x)" />
                <Benefit item="Exclusive VIP Referral Commissions" />
              </div>

              <div className="bg-emerald-600/10 border border-emerald-500/20 rounded-2xl p-4 text-center">
                <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1">VIP Monthly</p>
                <div className="flex items-end justify-center gap-2">
                  <span className="text-3xl font-black dark:text-white text-gray-900">$199</span>
                  <span className="text-sm text-gray-500 font-semibold">/ month</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <button 
                  onClick={() => { setMethod('card'); setStep(2); }}
                  className="p-4 rounded-2xl border border-emerald-500/20 hover:border-emerald-500 bg-emerald-500/5 transition-all text-center group"
                >
                  <CreditCard className="mx-auto mb-2 text-emerald-500 group-hover:scale-110 transition-transform" size={22} />
                  <span className="text-[11px] font-semibold dark:text-white text-gray-900">Credit Card</span>
                </button>
                <button 
                  onClick={() => { setMethod('crypto'); setStep(2); }}
                  className="p-4 rounded-2xl border border-orange-500/20 hover:border-orange-500 bg-orange-500/5 transition-all text-center group"
                >
                  <Bitcoin className="mx-auto mb-2 text-orange-500 group-hover:scale-110 transition-transform" size={22} />
                  <span className="text-[11px] font-semibold dark:text-white text-gray-900">Crypto Pay</span>
                </button>
              </div>
            </div>
          )}

          {step === 2 && method === 'card' && (
            <div className="space-y-6">
              <h3 className="text-xl font-bold dark:text-white text-gray-900 flex items-center gap-2">
                <CreditCard className="text-emerald-500" /> Payment Details
              </h3>
              
              <div className="space-y-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Card Number</label>
                  <input type="text" placeholder="**** **** **** 4242" className="w-full px-4 py-3 rounded-xl border dark:border-white/10 border-gray-200 dark:bg-black/20 focus:outline-none focus:border-emerald-500 transition-all" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Expiry Date</label>
                    <input type="text" placeholder="MM/YY" className="w-full px-4 py-3 rounded-xl border dark:border-white/10 border-gray-200 dark:bg-black/20 focus:outline-none focus:border-emerald-500 transition-all" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">CVC</label>
                    <input type="password" placeholder="***" className="w-full px-4 py-3 rounded-xl border dark:border-white/10 border-gray-200 dark:bg-black/20 focus:outline-none focus:border-emerald-500 transition-all" />
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t dark:border-white/5 border-gray-100">
                <div className="flex items-center justify-between mb-6">
                  <span className="text-gray-500 font-medium">Total to pay</span>
                  <span className="text-xl font-black dark:text-white text-gray-900">$199.00</span>
                </div>
                <button 
                  onClick={handlePayment}
                  disabled={isProcessing}
                  className="w-full py-4 bg-emerald-600 hover:bg-emerald-700 disabled:bg-gray-400 text-white font-bold rounded-2xl transition-all flex items-center justify-center gap-2"
                >
                  {isProcessing ? "Processing..." : "Complete Payment"} <ShieldCheck size={18} />
                </button>
              </div>
            </div>
          )}

          {step === 2 && method === 'crypto' && (
            <div className="space-y-6">
              <h3 className="text-xl font-bold dark:text-white text-gray-900 flex items-center gap-2">
                <Bitcoin className="text-orange-500" /> Crypto Payment
              </h3>
              
              <div className="bg-orange-500/10 border border-orange-500/20 rounded-2xl p-6 space-y-4">
                <div className="text-center">
                  <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1">Send Exactly</p>
                  <p className="text-2xl font-black dark:text-white text-gray-900">{cryptoAmount} BTC</p>
                  <p className="text-[10px] text-gray-400 mt-1">≈ $199.00 USD</p>
                </div>

                <div className="space-y-2">
                  <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">BTC Wallet Address (SegWit)</p>
                  <div className="flex items-center gap-2 bg-black/20 p-3 rounded-xl border border-white/5">
                    <span className="text-xs font-mono text-gray-400 flex-1 truncate">bc1qxy2kg3ryyqxclv786p55hf…</span>
                    <button className="text-emerald-500 hover:text-emerald-400 transition-colors">
                      <Copy size={16} />
                    </button>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t dark:border-white/5 border-gray-100">
                <div className="flex items-start gap-3 mb-6 bg-blue-500/10 p-3 rounded-xl border border-blue-500/20">
                  <Zap className="text-blue-500 mt-0.5" size={16} />
                  <p className="text-[10px] text-blue-500 leading-relaxed font-medium">
                    Payment will be automatically detected after 1 network confirmation. Please do not close this window.
                  </p>
                </div>
                <button 
                  onClick={handlePayment}
                  disabled={isProcessing}
                  className="w-full py-4 bg-orange-600 hover:bg-orange-700 disabled:bg-gray-400 text-white font-bold rounded-2xl transition-all flex items-center justify-center gap-2"
                >
                  {isProcessing ? "Verifying Transaction..." : "I have sent the payment"}
                </button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="text-center py-8 space-y-6">
              <div className="w-20 h-20 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto text-emerald-500 animate-bounce">
                <Check size={40} strokeWidth={3} />
              </div>
              <div>
                <h2 className="text-2xl font-black dark:text-white text-gray-900">Payment Successful!</h2>
                <p className="text-gray-500 mt-2">Welcome to the VIP circle. Your advanced AI strategies are now unlocked.</p>
              </div>
              <button 
                onClick={onClose}
                className="w-full py-4 bg-gray-900 dark:bg-white dark:text-black text-white font-bold rounded-2xl transition-all"
              >
                Back to Dashboard
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const Benefit = ({ item }: { item: string }) => (
  <div className="flex items-center gap-3">
    <div className="w-5 h-5 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-500 flex-shrink-0">
      <Check size={12} strokeWidth={3} />
    </div>
    <span className="text-sm text-gray-500 font-medium">{item}</span>
  </div>
);

export default PaymentModal;
