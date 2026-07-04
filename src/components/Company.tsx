import React from 'react';
import { Target, Eye, Rocket, Briefcase, Newspaper, Globe, Users } from 'lucide-react';

const CompanyPage = () => {
  return (
    <div className="space-y-12 max-w-5xl mx-auto py-8">
      {/* About Section */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-500/10 rounded-full border border-emerald-500/20">
            <Rocket size={14} className="text-emerald-600" />
            <span className="text-[10px] font-black text-emerald-600 uppercase tracking-widest">Our Story</span>
          </div>
          <h2 className="text-4xl font-black dark:text-white text-gray-900 leading-tight">Bridging the gap between Human intuition and AI precision.</h2>
          <p className="text-gray-500 leading-relaxed text-sm">Founded in 2023, LIDEX was born from the belief that automated trading should not be a 'black box'. We aim to provide professional-grade AI tools to retail traders across the globe.</p>
        </div>
        <div className="card-base grid grid-cols-2 gap-6">
           <VisionItem icon={<Target className="text-emerald-600" />} label="Mission" desc="To democratize high-frequency futures trading." />
           <VisionItem icon={<Eye className="text-emerald-600" />} label="Vision" desc="Building the world's most stable AI fleet." />
           <VisionItem icon={<Users className="text-blue-600" />} label="Community" desc="Over 12,000 active traders globally." />
           <VisionItem icon={<Globe className="text-orange-600" />} label="Presence" desc="Operating in 85+ countries worldwide." />
        </div>
      </section>

      {/* Blog/News */}
      <section className="space-y-8">
         <div className="flex items-center justify-between">
            <h3 className="text-xl font-black dark:text-white text-gray-900 uppercase tracking-wider flex items-center gap-2">
               <Newspaper size={20} className="text-emerald-500" /> Blog & Insights
            </h3>
            <button className="text-[10px] font-black text-emerald-600 uppercase tracking-widest hover:text-emerald-700 transition-colors">View All Posts</button>
         </div>
         <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <BlogPost title="AI Learning: Neural Networks vs. Standard Bots" date="May 18, 2024" category="Technology" />
            <BlogPost title="Market Outlook: Why 2024 is the Year of Volatility" date="May 15, 2024" category="Analysis" />
            <BlogPost title="New Bybit Futures Integration is Live" date="May 10, 2024" category="Product" />
         </div>
      </section>

      {/* Careers Section */}
      <section className="dark:bg-emerald-900/10 bg-emerald-50 border border-emerald-500/20 rounded-3xl p-8 flex flex-col md:flex-row items-center justify-between gap-8">
         <div className="space-y-2">
            <h3 className="text-xl font-black dark:text-white text-gray-900 flex items-center gap-2">
               <Briefcase size={24} className="text-emerald-600" /> We're Hiring
            </h3>
            <p className="text-sm text-gray-500">Join our engineering and research team in London or remotely.</p>
         </div>
         <button className="px-8 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-black uppercase text-xs rounded-xl shadow-lg shadow-emerald-500/20 transition-all">Explore Open Roles</button>
      </section>
    </div>
  );
};

const VisionItem = ({ icon, label, desc }: any) => (
  <div className="space-y-2">
    <div className="w-10 h-10 rounded-xl bg-gray-50 dark:bg-black/20 flex items-center justify-center mb-3">
      {icon}
    </div>
    <p className="text-xs font-black dark:text-white text-gray-900">{label}</p>
    <p className="text-[10px] text-gray-500 leading-relaxed">{desc}</p>
  </div>
);

const BlogPost = ({ title, date, category }: any) => (
  <div className="card-base hover:border-emerald-500/50 transition-all group">
     <span className="text-[8px] font-black text-emerald-600 uppercase tracking-widest block mb-2">{category}</span>
     <h4 className="text-sm font-bold dark:text-gray-200 text-gray-800 group-hover:text-emerald-500 transition-colors mb-4">{title}</h4>
     <p className="text-[10px] text-gray-500 font-medium">{date}</p>
  </div>
);

export default CompanyPage;
