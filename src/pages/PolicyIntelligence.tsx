import React from 'react';
import { Search, Filter, X, LayoutGrid, Clock } from 'lucide-react';
import { POLICIES, AGENCIES, PERSONAS } from '../data';
import { PolicyCard } from '../components/PolicyCard';
import { PolicyTimeline } from '../components/PolicyTimeline';
import { motion, AnimatePresence } from 'motion/react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const CATEGORIES = ['Education', 'Trade', 'Economy', 'Infrastructure', 'Health'];

export function PolicyIntelligence() {
  const [activeTab, setActiveTab] = React.useState<'grid' | 'timeline'>('grid');
  const [search, setSearch] = React.useState('');
  const [selectedAgency, setSelectedAgency] = React.useState('');
  const [selectedCategory, setSelectedCategory] = React.useState('');
  const [selectedPersona, setSelectedPersona] = React.useState('');

  const filteredPolicies = POLICIES.filter(p => {
    const matchesSearch = p.title.toLowerCase().includes(search.toLowerCase()) || 
                         p.summary.toLowerCase().includes(search.toLowerCase());
    const matchesAgency = !selectedAgency || p.agency === selectedAgency;
    const matchesCategory = !selectedCategory || p.category === selectedCategory;
    const matchesPersona = !selectedPersona || p.affectedGroups.includes(selectedPersona);
    
    return matchesSearch && matchesAgency && matchesCategory && matchesPersona;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div>
          <h1 className="text-3xl font-bold text-primary mb-4">Policy Intelligence</h1>
          <p className="text-text-secondary max-w-2xl">
            Track and analyze regulatory changes across all government sectors. Use filters to find policies that impact you or your business.
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex p-1 bg-slate-100 rounded-xl w-fit">
          <button
            onClick={() => setActiveTab('grid')}
            className={cn(
              "flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold transition-all",
              activeTab === 'grid' 
                ? "bg-white text-primary shadow-sm" 
                : "text-slate-500 hover:text-primary"
            )}
          >
            <LayoutGrid className="w-4 h-4" />
            Grid View
          </button>
          <button
            onClick={() => setActiveTab('timeline')}
            className={cn(
              "flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold transition-all",
              activeTab === 'timeline' 
                ? "bg-white text-primary shadow-sm" 
                : "text-slate-500 hover:text-primary"
            )}
          >
            <Clock className="w-4 h-4" />
            Timeline View
          </button>
        </div>
      </div>

      {activeTab === 'grid' ? (
        <>
          {/* Filters */}
          <div className="bg-white p-6 rounded-xl border border-slate-200 card-shadow mb-8 space-y-6">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
              <input 
                type="text" 
                placeholder="Search policies by keyword..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full bg-slate-50 rounded-lg py-3 pl-12 pr-4 text-primary focus:outline-none focus:ring-2 focus:ring-accent border border-slate-200"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <label className="text-xs font-bold text-text-secondary uppercase tracking-wider">Agency</label>
                <select 
                  value={selectedAgency}
                  onChange={(e) => setSelectedAgency(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-sm focus:ring-accent"
                >
                  <option value="">All Agencies</option>
                  {AGENCIES.map(a => <option key={a.id} value={a.name}>{a.name}</option>)}
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-text-secondary uppercase tracking-wider">Category</label>
                <select 
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-sm focus:ring-accent"
                >
                  <option value="">All Categories</option>
                  {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-text-secondary uppercase tracking-wider">Affected Group</label>
                <select 
                  value={selectedPersona}
                  onChange={(e) => setSelectedPersona(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-sm focus:ring-accent"
                >
                  <option value="">All Groups</option>
                  {PERSONAS.map(p => <option key={p} value={p}>{p}</option>)}
                </select>
              </div>
            </div>

            {(selectedAgency || selectedCategory || selectedPersona || search) && (
              <div className="flex flex-wrap gap-2 pt-2">
                <button 
                  onClick={() => {
                    setSearch('');
                    setSelectedAgency('');
                    setSelectedCategory('');
                    setSelectedPersona('');
                  }}
                  className="text-xs font-medium text-accent hover:underline flex items-center"
                >
                  Clear all filters <X className="ml-1 w-3 h-3" />
                </button>
              </div>
            )}
          </div>

          {/* Results */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence mode="popLayout">
              {filteredPolicies.map((policy) => (
                <motion.div
                  key={policy.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.2 }}
                >
                  <PolicyCard policy={policy} />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {filteredPolicies.length === 0 && (
            <div className="text-center py-20 bg-white rounded-xl border border-dashed border-slate-300">
              <div className="text-slate-400 mb-2">No policies found matching your criteria.</div>
              <button 
                onClick={() => {
                  setSearch('');
                  setSelectedAgency('');
                  setSelectedCategory('');
                  setSelectedPersona('');
                }}
                className="text-accent font-bold hover:underline"
              >
                Reset filters
              </button>
            </div>
          )}
        </>
      ) : (
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
          className="space-y-8"
        >
          {/* Reuse the same filters for Timeline View */}
          <div className="bg-white p-6 rounded-xl border border-slate-200 card-shadow space-y-6">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
              <input 
                type="text" 
                placeholder="Search policies by keyword..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full bg-slate-50 rounded-lg py-3 pl-12 pr-4 text-primary focus:outline-none focus:ring-2 focus:ring-accent border border-slate-200"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <label className="text-xs font-bold text-text-secondary uppercase tracking-wider">Agency</label>
                <select 
                  value={selectedAgency}
                  onChange={(e) => setSelectedAgency(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-sm focus:ring-accent"
                >
                  <option value="">All Agencies</option>
                  {AGENCIES.map(a => <option key={a.id} value={a.name}>{a.name}</option>)}
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-text-secondary uppercase tracking-wider">Category</label>
                <select 
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-sm focus:ring-accent"
                >
                  <option value="">All Categories</option>
                  {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-text-secondary uppercase tracking-wider">Affected Group</label>
                <select 
                  value={selectedPersona}
                  onChange={(e) => setSelectedPersona(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-sm focus:ring-accent"
                >
                  <option value="">All Groups</option>
                  {PERSONAS.map(p => <option key={p} value={p}>{p}</option>)}
                </select>
              </div>
            </div>

            {(selectedAgency || selectedCategory || selectedPersona || search) && (
              <div className="flex flex-wrap gap-2 pt-2">
                <button 
                  onClick={() => {
                    setSearch('');
                    setSelectedAgency('');
                    setSelectedCategory('');
                    setSelectedPersona('');
                  }}
                  className="text-xs font-medium text-accent hover:underline flex items-center"
                >
                  Clear all filters <X className="ml-1 w-3 h-3" />
                </button>
              </div>
            )}
          </div>

          <PolicyTimeline policies={filteredPolicies} />
        </motion.div>
      )}
    </div>
  );
}
