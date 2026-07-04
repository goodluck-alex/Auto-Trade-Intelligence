import React, { useState } from 'react';
import { HelpCircle, MessageSquare, Bug, Lightbulb, Mail, Send, ChevronDown, ChevronUp } from 'lucide-react';

const SupportPage = () => {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const faqs = [
    { q: "How do I connect my exchange API keys?", a: "Go to Settings -> API Key Management. Click 'Add New Key', select your exchange, and enter your API Key and Secret. Ensure 'Futures Trading' is enabled on the exchange side." },
    { q: "What is the 'Bot Health Score'?", a: "It is a proprietary metric (0-100) that measures execution stability, network latency, and strategy performance. A score above 90 indicates optimal performance." },
    { q: "Can I withdraw my referral earnings directly?", a: "Yes, once your available balance reaches $50, you can request a withdrawal to your linked crypto wallet or exchange account." },
    { q: "What leverage does the bot use?", a: "By default, the bot uses 3x-5x leverage. VIP users can configure custom leverage up to 50x in the bot's individual settings." },
  ];

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      <div className="text-center space-y-4">
        <h2 className="text-3xl font-black dark:text-white text-gray-900">Support Center</h2>
        <p className="text-gray-500 max-w-xl mx-auto text-sm">Need help with your AI trading fleet? Our team and knowledge base are available 24/7.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <SupportCard icon={<HelpCircle />} label="Help Center" desc="Browse our deep knowledge base." />
        <SupportCard icon={<MessageSquare />} label="Live Chat" desc="Chat with a specialist now." active />
        <SupportCard icon={<Bug />} label="Report a Bug" desc="Found an issue? Let us know." />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 pt-4">
        {/* FAQ Section */}
        <div className="space-y-6">
          <h3 className="text-lg font-black dark:text-white text-gray-900 uppercase tracking-wider">Frequently Asked Questions</h3>
          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <div key={i} className="card-base overflow-hidden">
                <button 
                  onClick={() => setActiveFaq(activeFaq === i ? null : i)}
                  className="w-full flex items-center justify-between p-5 text-left group"
                >
                  <span className="text-sm font-bold dark:text-gray-200 text-gray-800 group-hover:text-emerald-500 transition-colors">{faq.q}</span>
                  {activeFaq === i ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                </button>
                {activeFaq === i && (
                  <div className="px-5 pb-5 animate-in fade-in slide-in-from-top-2">
                    <p className="text-xs text-gray-500 leading-relaxed">{faq.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Contact Form */}
        <div className="card-base">
          <h3 className="text-lg font-black dark:text-white text-gray-900 uppercase tracking-wider mb-6 flex items-center gap-2">
             <Mail size={20} className="text-emerald-500" /> Send us a Message
          </h3>
          <div className="space-y-4">
             <div className="grid grid-cols-2 gap-4">
               <input type="text" placeholder="Name" className="w-full bg-gray-50 dark:bg-black/20 border dark:border-white/10 border-gray-200 rounded-xl px-4 py-3 text-xs focus:outline-none focus:border-emerald-500" />
               <input type="email" placeholder="Email" className="w-full bg-gray-50 dark:bg-black/20 border dark:border-white/10 border-gray-200 rounded-xl px-4 py-3 text-xs focus:outline-none focus:border-emerald-500" />
             </div>
             <select className="w-full bg-gray-50 dark:bg-black/20 border dark:border-white/10 border-gray-200 rounded-xl px-4 py-3 text-xs focus:outline-none focus:border-emerald-500">
               <option>Select Category</option>
               <option>Technical Issue</option>
               <option>Billing Question</option>
               <option>Feature Request</option>
             </select>
             <textarea rows={4} placeholder="How can we help?" className="w-full bg-gray-50 dark:bg-black/20 border dark:border-white/10 border-gray-200 rounded-xl px-4 py-3 text-xs focus:outline-none focus:border-emerald-500 resize-none"></textarea>
             <button className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl transition-all flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20">
                Send Message <Send size={14} />
             </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const SupportCard = ({ icon, label, desc, active = false }: any) => (
  <button className={`card-base text-left transition-all group ${active ? 'bg-emerald-600 border-emerald-500 shadow-xl shadow-emerald-500/20 text-white' : 'hover:border-emerald-500/50'}`}>
    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-4 transition-transform group-hover:scale-110 ${active ? 'bg-white/20 text-white' : 'bg-emerald-500/10 text-emerald-600'}`}>
      {icon}
    </div>
    <p className={`text-sm font-black mb-1 ${active ? 'text-white' : 'dark:text-white text-gray-900'}`}>{label}</p>
    <p className={`text-xs ${active ? 'text-emerald-100' : 'text-gray-500'}`}>{desc}</p>
  </button>
);

export default SupportPage;
