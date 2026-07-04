import React, { useState } from 'react';
import { Shield, Scale, FileText, AlertCircle, Cookie, HandMetal, ChevronRight, UserCheck, RefreshCcw } from 'lucide-react';

const LegalPage = () => {
  const [activeTab, setActiveTab] = useState('terms');

  const policies = [
    { id: 'terms', label: 'Terms & Conditions', icon: <Scale size={18} /> },
    { id: 'privacy', label: 'Privacy Policy', icon: <Shield size={18} /> },
    { id: 'cookies', label: 'Cookies Policy', icon: <Cookie size={18} /> },
    { id: 'disclaimer', label: 'Disclaimer', icon: <FileText size={18} /> },
    { id: 'risk', label: 'Risk Disclosure', icon: <AlertCircle size={18} /> },
    { id: 'usage', label: 'Acceptable Use', icon: <HandMetal size={18} /> },
    { id: 'aml', label: 'AML/KYC Policy', icon: <UserCheck size={18} /> },
    { id: 'refund', label: 'Refund Policy', icon: <RefreshCcw size={18} /> },
    { id: 'ip', label: 'IP Policy', icon: <FileText size={18} /> },
  ];

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-black dark:text-white text-gray-900">Legal & Compliance</h2>
          <p className="text-sm text-gray-500">Last updated: May 20, 2024. Please read these documents carefully.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Sidebar Nav */}
        <div className="space-y-1">
          {policies.map((p) => (
            <button
              key={p.id}
              onClick={() => setActiveTab(p.id)}
              className={`w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all ${
                activeTab === p.id 
                ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-500/20' 
                : 'text-gray-500 hover:bg-gray-100 dark:hover:bg-white/5'
              }`}
            >
              <div className="flex items-center gap-3">
                {p.icon}
                <span className="text-xs font-bold uppercase tracking-wider">{p.label}</span>
              </div>
              <ChevronRight size={14} className={activeTab === p.id ? 'opacity-100' : 'opacity-0'} />
            </button>
          ))}
        </div>

        {/* Content Area */}
        <div className="md:col-span-3">
          <div className="card-base">
            {activeTab === 'terms' && <ContentSection title="Terms & Conditions" content={TERMS_CONTENT} />}
            {activeTab === 'privacy' && <ContentSection title="Privacy Policy" content={PRIVACY_CONTENT} />}
            {activeTab === 'cookies' && <ContentSection title="Cookies Policy" content={COOKIES_CONTENT} />}
            {activeTab === 'disclaimer' && <ContentSection title="Disclaimer" content={DISCLAIMER_CONTENT} />}
            {activeTab === 'risk' && <ContentSection title="Risk Disclosure" content={RISK_CONTENT} />}
            {activeTab === 'usage' && <ContentSection title="Acceptable Use Policy" content={USAGE_CONTENT} />}
            {activeTab === 'aml' && <ContentSection title="AML & KYC Policy" content={AML_CONTENT} />}
            {activeTab === 'refund' && <ContentSection title="Refund & Cancellation Policy" content={REFUND_CONTENT} />}
            {activeTab === 'ip' && <ContentSection title="Intellectual Property Policy" content={IP_CONTENT} />}
          </div>
        </div>
      </div>
    </div>
  );
};

const ContentSection = ({ title, content }: { title: string; content: string[] }) => (
  <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-500">
    <h3 className="text-xl font-black dark:text-white text-gray-900">{title}</h3>
    <div className="space-y-4">
      {content.map((p, i) => (
        <p key={i} className="text-sm text-gray-500 leading-relaxed">
          {p}
        </p>
      ))}
    </div>
  </div>
);

const TERMS_CONTENT = [
  "By accessing and using the LIDEX Auto Trade platform, you agree to be bound by these Terms and Conditions. Our platform provides automated software solutions for cryptocurrency futures trading.",
  "Users must be at least 18 years of age and reside in a jurisdiction where cryptocurrency trading is legal. LIDEX does not provide services to residents of prohibited regions.",
  "You are responsible for maintaining the security of your account and API keys. LIDEX will never ask for your direct withdrawal password or private keys.",
  "Platform fees and subscription costs are non-refundable once the automated bot has been deployed for more than 24 hours."
];

const PRIVACY_CONTENT = [
  "LIDEX respects your privacy. We collect minimal data required to provide our services, including email addresses for authentication and encrypted API keys for exchange connectivity.",
  "Your API keys are encrypted using AES-256-GCM before being stored in our secure vault. We do not have direct access to your exchange funds.",
  "We do not sell user data to third parties. Performance data is aggregated and anonymized for AI learning purposes only.",
  "You have the right to request the permanent deletion of your account and all associated data at any time."
];

const COOKIES_CONTENT = [
  "We use essential cookies to maintain your session and security preferences. These are necessary for the platform to function correctly.",
  "Analytical cookies may be used to understand platform performance and improve user experience. These do not store personal identifying information.",
  "You can manage your cookie preferences through your browser settings, though disabling essential cookies may impact platform functionality."
];

const DISCLAIMER_CONTENT = [
  "LIDEX Auto Trade is a software-as-a-service provider. We are not financial advisors, brokers, or tax professionals.",
  "Past performance of any bot or strategy is not indicative of future results. Market conditions can change rapidly and unexpectedly.",
  "All information provided on the platform is for educational and informational purposes only. Use of the software is at your own risk.",
  "LIDEX is not liable for losses caused by exchange downtime, API failures, or network latency."
];

const RISK_CONTENT = [
  "HIGH RISK WARNING: Trading cryptocurrency futures involves significant risk of loss and is not suitable for all investors. You could lose all of your deposited capital.",
  "Leverage can work against you as well as for you. The high degree of leverage available in futures trading can lead to large losses as well as large gains.",
  "The automated nature of our bots means trades may occur without manual oversight. Ensure your risk parameters are configured according to your tolerance.",
  "Sudden market volatility, 'flash crashes', and liquidity gaps can result in significant slippage and unexpected liquidations."
];

const USAGE_CONTENT = [
  "Users must use the platform in a manner consistent with all applicable laws and regulations.",
  "Prohibited activities include: reverse engineering the AI engine, attempting to disrupt system stability, or using the platform for money laundering.",
  "Sharing of VIP strategies or account credentials with third parties is strictly prohibited and may result in immediate account termination.",
  "LIDEX reserves the right to suspend accounts suspected of fraudulent activity or abuse of our referral system."
];

const AML_CONTENT = [
  "LIDEX implements strict Anti-Money Laundering (AML) and Know Your Customer (KYC) procedures. We cooperate with global regulatory bodies to prevent financial crimes.",
  "Users may be required to provide government-issued identification, proof of address, and selfie verification before unlocking advanced trading limits or withdrawals.",
  "All transactions are monitored for suspicious patterns. LIDEX reserves the right to report suspicious activity to relevant authorities without prior notice to the user.",
  "Deposits from sanctioned individuals or regions are strictly prohibited."
];

const REFUND_CONTENT = [
  "LIDEX operates on a software-as-a-service (SaaS) subscription model. Payments are generally non-refundable once the service has been activated.",
  "Users may cancel their recurring subscription at any time through the Account Settings. Cancellation will take effect at the end of the current billing cycle.",
  "Exceptions may be made in cases of documented technical failure of the LIDEX system that prevented the user from accessing the service for more than 48 consecutive hours.",
  "Cryptocurrency payments are subject to network fees and exchange rate fluctuations which LIDEX does not control."
];

const IP_CONTENT = [
  "All software, AI models, trading strategies, logos, and branding materials found on the LIDEX platform are the exclusive intellectual property of LIDEX AUTO TRADE.",
  "Users are granted a limited, non-exclusive license to use the platform for personal trading purposes only.",
  "Any attempt to copy, redistribute, or reverse-engineer the proprietary neural network models is a violation of international copyright laws.",
  "The 'Lidex' name and logo are registered trademarks."
];

export default LegalPage;
