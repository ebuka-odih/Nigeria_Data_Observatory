import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Search, 
  Filter, 
  ChevronRight, 
  Building2, 
  FileText, 
  Database, 
  RefreshCw, 
  Globe, 
  MapPin, 
  Calendar, 
  ShieldCheck,
  ArrowLeft,
  ExternalLink,
  Info,
  BarChart3,
  Link2,
  Share2,
  Download
} from 'lucide-react';
import { AGENCIES, POLICIES, DATASETS, type Agency, type Policy, type Dataset } from '../data';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// --- Components ---

const AgencyCard = ({ agency, onClick }: { agency: Agency; onClick: () => void; key?: string }) => (
  <motion.div
    layout
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    whileHover={{ y: -4 }}
    onClick={onClick}
    className="bg-white rounded-2xl border border-slate-200 p-6 card-shadow cursor-pointer group transition-all hover:border-primary/30"
  >
    <div className="flex items-start gap-4 mb-4">
      <div className="w-14 h-14 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center overflow-hidden shrink-0 group-hover:border-primary/20 transition-colors">
        <img src={agency.logo} alt={agency.name} className="w-10 h-10 object-contain" referrerPolicy="no-referrer" />
      </div>
      <div className="space-y-1">
        <h3 className="font-bold text-primary group-hover:text-accent transition-colors line-clamp-1">{agency.name}</h3>
        <span className="inline-block px-2 py-0.5 rounded bg-slate-100 text-slate-500 text-[10px] font-bold uppercase tracking-wider">
          {agency.sector}
        </span>
      </div>
    </div>
    
    <p className="text-sm text-text-secondary line-clamp-2 mb-6 h-10">
      {agency.description}
    </p>
    
    <div className="grid grid-cols-3 gap-2 mb-6">
      <div className="text-center p-2 rounded-lg bg-slate-50 border border-slate-100">
        <p className="text-lg font-bold text-primary">{agency.policyCount}</p>
        <p className="text-[9px] font-bold text-slate-400 uppercase">Policies</p>
      </div>
      <div className="text-center p-2 rounded-lg bg-slate-50 border border-slate-100">
        <p className="text-lg font-bold text-primary">{agency.datasetCount}</p>
        <p className="text-[9px] font-bold text-slate-400 uppercase">Datasets</p>
      </div>
      <div className="text-center p-2 rounded-lg bg-slate-50 border border-slate-100">
        <p className="text-lg font-bold text-primary">{agency.recentUpdates}</p>
        <p className="text-[9px] font-bold text-slate-400 uppercase">Updates</p>
      </div>
    </div>
    
    <div className="flex items-center justify-between pt-4 border-t border-slate-50">
      <span className="text-xs font-bold text-primary group-hover:translate-x-1 transition-transform flex items-center gap-1">
        View Agency <ChevronRight className="w-3 h-3" />
      </span>
    </div>
  </motion.div>
);

const ImpactBarChart = ({ data }: { data: { group: string; value: number }[] }) => (
  <div className="space-y-4">
    {data.map((item) => (
      <div key={item.group} className="space-y-1.5">
        <div className="flex justify-between text-xs font-bold">
          <span className="text-primary">{item.group}</span>
          <span className="text-slate-400">{item.value}% Impact</span>
        </div>
        <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: `${item.value}%` }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="h-full bg-primary rounded-full"
          />
        </div>
      </div>
    ))}
  </div>
);

// --- Main Page ---

export function AgencyExplorer() {
  const [selectedAgencyId, setSelectedAgencyId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('All');
  const [activeTab, setActiveTab] = useState('Overview');

  const selectedAgency = useMemo(() => 
    AGENCIES.find(a => a.id === selectedAgencyId),
    [selectedAgencyId]
  );

  const filteredAgencies = useMemo(() => {
    return AGENCIES.filter(agency => {
      const matchesSearch = agency.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          agency.sector.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesFilter = activeFilter === 'All' || agency.sector === activeFilter;
      return matchesSearch && matchesFilter;
    });
  }, [searchQuery, activeFilter]);

  const filters = ['All', 'Economy', 'Telecom', 'Finance', 'Health', 'Education', 'Trade', 'Infrastructure'];

  if (selectedAgency) {
    const agencyPolicies = POLICIES.filter(p => p.agency === selectedAgency.name);
    const agencyDatasets = DATASETS.filter(d => d.source === selectedAgency.name);
    const relatedAgencies = AGENCIES.filter(a => selectedAgency.relatedAgencies.includes(a.id));

    return (
      <div className="min-h-screen bg-slate-50 pb-20">
        {/* Profile Header */}
        <div className="bg-white border-b border-slate-200 pt-12 pb-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <button 
              onClick={() => setSelectedAgencyId(null)}
              className="flex items-center gap-2 text-sm font-bold text-slate-400 hover:text-primary transition-colors mb-8 group"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Back to Explorer
            </button>
            
            <div className="flex flex-col lg:flex-row gap-8 items-start justify-between">
              <div className="flex items-start gap-6">
                <div className="w-24 h-24 rounded-3xl bg-slate-50 border border-slate-100 flex items-center justify-center overflow-hidden shrink-0 shadow-xl shadow-slate-200/50">
                  <img src={selectedAgency.logo} alt={selectedAgency.name} className="w-16 h-16 object-contain" referrerPolicy="no-referrer" />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <h1 className="text-3xl font-black text-primary tracking-tight">{selectedAgency.name}</h1>
                    <span className="px-3 py-1 rounded-full bg-primary/5 border border-primary/10 text-xs font-bold text-primary uppercase">
                      {selectedAgency.sector}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-4 text-sm text-slate-500">
                    <div className="flex items-center gap-1.5">
                      <Calendar className="w-4 h-4" /> Founded {selectedAgency.founded}
                    </div>
                    <div className="flex items-center gap-1.5">
                      <MapPin className="w-4 h-4" /> {selectedAgency.headquarters}
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Globe className="w-4 h-4" /> {selectedAgency.website.replace('https://', '')}
                    </div>
                    <div className="flex items-center gap-1.5">
                      <ShieldCheck className="w-4 h-4" /> {selectedAgency.jurisdiction} Jurisdiction
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-3 gap-4 w-full lg:w-auto">
                <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100 text-center min-w-[120px]">
                  <p className="text-2xl font-black text-primary">{selectedAgency.policyCount}</p>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Policies Tracked</p>
                </div>
                <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100 text-center min-w-[120px]">
                  <p className="text-2xl font-black text-primary">{selectedAgency.datasetCount}</p>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Datasets Available</p>
                </div>
                <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100 text-center min-w-[120px]">
                  <p className="text-2xl font-black text-primary">{selectedAgency.recentUpdates}</p>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Last Update</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs Navigation */}
        <div className="bg-white border-b border-slate-200 sticky top-0 z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-8">
              {['Overview', 'Policies', 'Datasets', 'Impact', 'Sources'].map(tab => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={cn(
                    "py-4 text-sm font-bold transition-all relative",
                    activeTab === tab ? "text-primary" : "text-slate-400 hover:text-slate-600"
                  )}
                >
                  {tab}
                  {activeTab === tab && (
                    <motion.div 
                      layoutId="activeTab"
                      className="absolute bottom-0 left-0 right-0 h-1 bg-primary rounded-t-full"
                    />
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <AnimatePresence mode="wait">
            {activeTab === 'Overview' && (
              <motion.div
                key="overview"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="grid grid-cols-1 lg:grid-cols-12 gap-12"
              >
                <div className="lg:col-span-8 space-y-12">
                  <section>
                    <h2 className="text-xl font-bold text-primary mb-4 flex items-center gap-2">
                      <Info className="w-5 h-5 text-accent" /> Agency Overview
                    </h2>
                    <p className="text-text-secondary leading-relaxed text-lg">
                      {selectedAgency.overview}
                    </p>
                    <div className="flex flex-wrap gap-2 mt-6">
                      {selectedAgency.regulatoryScope.map(tag => (
                        <span key={tag} className="px-3 py-1 rounded-lg bg-slate-100 text-slate-600 text-xs font-bold border border-slate-200">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </section>

                  <section>
                    <div className="flex items-center justify-between mb-6">
                      <h2 className="text-xl font-bold text-primary flex items-center gap-2">
                        <FileText className="w-5 h-5 text-accent" /> Latest Policies
                      </h2>
                      <button className="text-sm font-bold text-accent hover:underline">View All Policies</button>
                    </div>
                    <div className="space-y-4">
                      {agencyPolicies.slice(0, 3).map(policy => (
                        <div key={policy.id} className="bg-white p-6 rounded-2xl border border-slate-200 card-shadow flex items-center justify-between group">
                          <div className="space-y-1">
                            <h4 className="font-bold text-primary group-hover:text-accent transition-colors">{policy.title}</h4>
                            <div className="flex items-center gap-3 text-xs text-slate-400">
                              <span className={cn(
                                "font-bold uppercase",
                                policy.impactLevel === 'High' ? 'text-red-500' : 
                                policy.impactLevel === 'Medium' ? 'text-orange-500' : 'text-emerald-500'
                              )}>
                                {policy.impactLevel} Impact
                              </span>
                              <span>•</span>
                              <span>{new Date(policy.date).toLocaleDateString()}</span>
                            </div>
                          </div>
                          <ChevronRight className="w-5 h-5 text-slate-300 group-hover:text-primary transition-colors" />
                        </div>
                      ))}
                    </div>
                  </section>
                </div>

                <div className="lg:col-span-4 space-y-8">
                  <div className="bg-white rounded-2xl border border-slate-200 p-6 card-shadow">
                    <h3 className="font-bold text-primary mb-6 flex items-center gap-2">
                      <BarChart3 className="w-5 h-5 text-accent" /> Impact Distribution
                    </h3>
                    <ImpactBarChart data={selectedAgency.impactDistribution} />
                  </div>

                  <div className="bg-white rounded-2xl border border-slate-200 p-6 card-shadow">
                    <h3 className="font-bold text-primary mb-6 flex items-center gap-2">
                      <Building2 className="w-5 h-5 text-accent" /> Related Agencies
                    </h3>
                    <div className="space-y-4">
                      {relatedAgencies.map(related => (
                        <button 
                          key={related.id}
                          onClick={() => setSelectedAgencyId(related.id)}
                          className="w-full flex items-center gap-3 p-3 rounded-xl border border-slate-100 hover:border-primary/20 hover:bg-slate-50 transition-all text-left group"
                        >
                          <img src={related.logo} alt={related.name} className="w-8 h-8 object-contain grayscale group-hover:grayscale-0 transition-all" referrerPolicy="no-referrer" />
                          <span className="text-sm font-bold text-slate-600 group-hover:text-primary transition-colors">{related.name}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'Policies' && (
              <motion.div
                key="policies"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-6"
              >
                <div className="flex items-center justify-between mb-8">
                  <h2 className="text-2xl font-black text-primary">All Policies ({agencyPolicies.length})</h2>
                  <div className="flex gap-2">
                    <button className="p-2 rounded-lg border border-slate-200 hover:bg-white transition-all"><Download className="w-4 h-4" /></button>
                    <button className="p-2 rounded-lg border border-slate-200 hover:bg-white transition-all"><Share2 className="w-4 h-4" /></button>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {agencyPolicies.map(policy => (
                    <div key={policy.id} className="bg-white p-6 rounded-2xl border border-slate-200 card-shadow space-y-4">
                      <div className="flex items-center justify-between">
                        <span className={cn(
                          "px-2 py-0.5 rounded text-[10px] font-bold uppercase",
                          policy.type === 'restrictive' ? 'bg-red-50 text-red-600' :
                          policy.type === 'beneficial' ? 'bg-emerald-50 text-emerald-600' : 'bg-orange-50 text-orange-600'
                        )}>
                          {policy.type}
                        </span>
                        <span className="text-xs font-mono text-slate-400">{new Date(policy.date).toLocaleDateString()}</span>
                      </div>
                      <h4 className="text-lg font-bold text-primary">{policy.title}</h4>
                      <p className="text-sm text-text-secondary line-clamp-2">{policy.summary}</p>
                      <div className="flex items-center justify-between pt-4 border-t border-slate-50">
                        <div className="flex -space-x-2">
                          {policy.affectedGroups.slice(0, 3).map(g => (
                            <div key={g} className="w-6 h-6 rounded-full bg-slate-100 border-2 border-white flex items-center justify-center text-[8px] font-bold text-slate-500" title={g}>
                              {g[0]}
                            </div>
                          ))}
                          {policy.affectedGroups.length > 3 && (
                            <div className="w-6 h-6 rounded-full bg-slate-200 border-2 border-white flex items-center justify-center text-[8px] font-bold text-slate-600">
                              +{policy.affectedGroups.length - 3}
                            </div>
                          )}
                        </div>
                        <button className="text-xs font-bold text-primary hover:underline flex items-center gap-1">
                          Full Details <ChevronRight className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {activeTab === 'Datasets' && (
              <motion.div
                key="datasets"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-6"
              >
                <h2 className="text-2xl font-black text-primary mb-8">Available Datasets ({agencyDatasets.length})</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {agencyDatasets.map(dataset => (
                    <div key={dataset.id} className="bg-white p-6 rounded-2xl border border-slate-200 card-shadow flex flex-col justify-between">
                      <div className="space-y-4">
                        <div className="w-10 h-10 rounded-lg bg-primary/5 flex items-center justify-center text-primary">
                          <Database className="w-5 h-5" />
                        </div>
                        <h4 className="font-bold text-primary">{dataset.title}</h4>
                        <p className="text-xs text-text-secondary line-clamp-3">{dataset.description}</p>
                        <div className="flex items-center gap-4 text-[10px] font-bold text-slate-400 uppercase">
                          <span className="flex items-center gap-1"><RefreshCw className="w-3 h-3" /> {dataset.frequency}</span>
                          <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> Updated 2024</span>
                        </div>
                      </div>
                      <button className="w-full mt-6 py-2 rounded-lg border border-primary text-primary text-xs font-bold hover:bg-primary hover:text-white transition-all">
                        Explore Dataset
                      </button>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {activeTab === 'Impact' && (
              <motion.div
                key="impact"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="max-w-3xl mx-auto"
              >
                <div className="bg-white rounded-3xl border border-slate-200 p-10 card-shadow">
                  <h2 className="text-2xl font-black text-primary mb-2">Demographic Impact Analysis</h2>
                  <p className="text-text-secondary mb-10">Visualizing the regulatory footprint of {selectedAgency.name} across different sectors.</p>
                  <ImpactBarChart data={selectedAgency.impactDistribution} />
                  
                  <div className="mt-12 p-6 bg-slate-50 rounded-2xl border border-slate-100">
                    <h4 className="text-sm font-bold text-primary mb-2">Intelligence Insight</h4>
                    <p className="text-xs text-text-secondary leading-relaxed">
                      Based on our policy tracking, {selectedAgency.name} has the highest regulatory impact on 
                      <span className="font-bold text-primary"> {selectedAgency.impactDistribution.sort((a,b) => b.value - a.value)[0].group}</span>. 
                      This is primarily driven by recent mandates in {selectedAgency.regulatoryScope[0]}.
                    </p>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'Sources' && (
              <motion.div
                key="sources"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="max-w-2xl mx-auto"
              >
                <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden card-shadow">
                  <div className="p-8 border-b border-slate-100 bg-slate-50/50">
                    <h2 className="text-xl font-bold text-primary">Intelligence Sources</h2>
                    <p className="text-xs text-slate-400 mt-1">Verified sources used for this agency profile</p>
                  </div>
                  <div className="divide-y divide-slate-100">
                    {selectedAgency.sources.map((source, i) => (
                      <a 
                        key={i} 
                        href={source.url}
                        className="flex items-center justify-between p-6 hover:bg-slate-50 transition-colors group"
                      >
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 group-hover:bg-primary/10 group-hover:text-primary transition-colors">
                            <Link2 className="w-5 h-5" />
                          </div>
                          <div>
                            <p className="font-bold text-primary">{source.title}</p>
                            <p className="text-xs text-slate-400 uppercase font-bold tracking-wider">{source.type}</p>
                          </div>
                        </div>
                        <ExternalLink className="w-4 h-4 text-slate-300 group-hover:text-primary transition-colors" />
                      </a>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      {/* Page Header */}
      <div className="bg-white border-b border-slate-200 pt-12 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="text-4xl font-black text-primary tracking-tight mb-2">
              Agency Explorer
            </h1>
            <p className="text-lg text-text-secondary">
              Browse government agencies responsible for national data, regulation, and policy implementation.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row gap-6 items-center justify-between mb-12">
          {/* Search */}
          <div className="relative w-full md:max-w-md">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input 
              type="text"
              placeholder="Search agencies..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-2xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all bg-white"
            />
          </div>

          {/* Filters */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar w-full md:w-auto">
            <Filter className="w-4 h-4 text-slate-400 mr-2 shrink-0" />
            {filters.map(filter => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={cn(
                  "px-4 py-2 rounded-full text-xs font-bold transition-all shrink-0 border",
                  activeFilter === filter 
                    ? "bg-primary text-white border-primary shadow-lg shadow-primary/20" 
                    : "bg-white text-slate-600 border-slate-200 hover:border-slate-300"
                )}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>

        {/* Agency Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredAgencies.map((agency) => (
              <AgencyCard 
                key={agency.id} 
                agency={agency} 
                onClick={() => setSelectedAgencyId(agency.id)} 
              />
            ))}
          </AnimatePresence>
        </div>

        {filteredAgencies.length === 0 && (
          <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-slate-200">
            <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4">
              <Building2 className="w-8 h-8 text-slate-300" />
            </div>
            <h3 className="text-lg font-bold text-primary">No agencies found</h3>
            <p className="text-text-secondary text-sm">Try adjusting your search or filters.</p>
          </div>
        )}
      </div>
    </div>
  );
}
