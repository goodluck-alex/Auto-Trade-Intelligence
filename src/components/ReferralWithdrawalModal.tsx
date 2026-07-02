import React, { useState } from 'react';
import { X, Send, ShieldCheck, AlertCircle, ChevronDown, Check } from 'lucide-react';

interface WithdrawalModalProps {
  isOpen: boolean;
  onClose: () => void;
  balance: number;
}

const networks = [
  { name: 'TRC20', fee: 1.0, time: '~2 mins' },
  { name: 'ERC20', fee: 15.0, time: '~5 mins' },
  { name: 'BEP20', fee: 0.5, time: '~1 min' },
  { name: 'Solana', fee: 0.1, time: '< 1 min' },
];

const ReferralWithdrawalModal = ({ isOpen, onClose, balance }: WithdrawalModalProps) => {
  const [amount, setAmount] = useState('');
  const [address, setAddress] = useState('');
  const [network, setNetwork] = useState(networks[0]);
  const [step, setStep] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);

  if (!isOpen) return null;

  const numAmount = parseFloat(amount) || 0;
  const totalFee = network.fee;
  const receiveAmount = Math.max(0, numAmount - totalFee);

  const handleWithdraw = () => {
    if (numAmount < 10) return alert("Minimum withdrawal is 10 USDT");
    if (numAmount > balance) return alert("Insufficient balance");
    if (!address) return alert("Enter destination address");
    
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setStep(2);
    }, 2500);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-md" onClick={onClose} />
      
      <div className="relative w-full max-w-md dark:bg-[#161723] bg-white rounded-3xl overflow-hidden shadow-2xl border dark:border-white/10 border-gray-200">
        <button onClick={onClose} className="absolute top-6 right-6 p-2 text-gray-400 hover:text-white transition-colors">
          <X size={20} />
        </button>

        <div className="p-8">
          {step === 1 && (
            <div className="space-y-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-purple-600/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Send className="text-purple-500" size={32} />
                </div>
                <h2 className="text-2xl font-black dark:text-white text-gray-900">Withdraw Earnings</h2>
                <p className="text-gray-500 text-sm mt-1">Available: <span className="font-bold text-purple-600">${balance.toLocaleString()}</span></p>
              </div>

              <div className="space-y-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Withdrawal Amount (USDT)</label>
                  <div className="relative">
                    <input 
                      type="number" 
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      placeholder="Min. 10.00" 
                      className="w-full bg-gray-50 dark:bg-black/20 border dark:border-white/10 border-gray-200 rounded-2xl px-5 py-4 text-sm focus:outline-none focus:border-purple-500 transition-all font-bold dark:text-white text-gray-900" 
                    />
                    <button onClick={() => setAmount(balance.toString())} className="absolute right-4 top-1/2 -translate-y-1/2 text-[10px] font-black text-purple-600 uppercase">Max</button>
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Destination Address</label>
                  <input 
                    type="text" 
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="Enter wallet address" 
                    className="w-full bg-gray-50 dark:bg-black/20 border dark:border-white/10 border-gray-200 rounded-2xl px-5 py-4 text-xs focus:outline-none focus:border-purple-500 transition-all dark:text-white text-gray-900 font-mono" 
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Select Network</label>
                  <div className="grid grid-cols-2 gap-2">
                    {networks.map(n => (
                      <button 
                        key={n.name}
                        onClick={() => setNetwork(n)}
                        className={`p-3 rounded-xl border text-[10px] font-bold transition-all ${network.name === n.name ? 'bg-purple-600 border-purple-500 text-white shadow-lg shadow-purple-500/20' : 'bg-gray-50 dark:bg-white/5 border-gray-100 dark:border-white/5 text-gray-500 hover:border-purple-500/50'}`}
                      >
                        {n.name}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 dark:bg-black/30 rounded-2xl p-5 space-y-2 border border-gray-100 dark:border-white/5">
                <div className="flex items-center justify-between text-[10px] font-bold text-gray-500 uppercase tracking-widest">
                  <span>Network Fee</span>
                  <span>{network.fee} USDT</span>
                </div>
                <div className="flex items-center justify-between text-[10px] font-black dark:text-white text-gray-900 uppercase tracking-widest pt-2 border-t dark:border-white/5 border-gray-100">
                  <span>You Receive</span>
                  <span className="text-sm text-emerald-500">{receiveAmount.toFixed(2)} USDT</span>
                </div>
              </div>

              <button 
                onClick={handleWithdraw}
                disabled={isProcessing}
                className="w-full py-4 bg-purple-600 hover:bg-purple-700 disabled:bg-gray-400 text-white font-bold rounded-2xl transition-all shadow-lg shadow-purple-500/20 flex items-center justify-center gap-2"
              >
                {isProcessing ? "Processing..." : "Confirm Withdrawal"} <ShieldCheck size={18} />
              </button>
            </div>
          )}

          {step === 2 && (
            <div className="text-center py-8 space-y-6">
              <div className="w-20 h-20 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto text-emerald-500 animate-bounce">
                <Check size={40} strokeWidth={3} />
              </div>
              <div className="space-y-2">
                <h2 className="text-2xl font-black dark:text-white text-gray-900">Withdrawal Initiated</h2>
                <p className="text-gray-500 text-sm">Transfer of {receiveAmount.toFixed(2)} USDT is being processed. TxID: <span className="font-mono text-purple-500">0x84f…92</span></p>
              </div>
              <div className="bg-blue-500/10 border border-blue-500/20 p-4 rounded-2xl flex items-start gap-3 text-left">
                <AlertCircle size={16} className="text-blue-500 shrink-0" />
                <p className="text-[10px] text-blue-500 font-medium">Funds will arrive in your wallet after network confirmations. Est. time: {network.time}</p>
              </div>
              <button 
                onClick={onClose}
                className="w-full py-4 bg-gray-900 dark:bg-white dark:text-black text-white font-bold rounded-2xl transition-all"
              >
                Close Hub
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ReferralWithdrawalModal;
