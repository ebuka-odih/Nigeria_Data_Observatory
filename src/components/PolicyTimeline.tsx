import React, { useState, useMemo } from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { POLICIES, PERSONAS, type Policy } from '../data';
import { Calendar, Filter, ChevronRight, Building2, Tag, Users } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function PolicyTimeline({ policies: externalPolicies }: { policies?: Policy[] }) {
  const [filterAgency, setFilterAgency] = useState<string>('All');
  const [filterCategory, setFilterCategory] = useState<string>('All');
  const [filterPersona, setFilterPersona] = useState<string>('All');

  const agencies = useMemo(() => ['All', ...Array.from(new Set(POLICIES.map(p => p.agency)))], []);
  const categories = useMemo(() => ['All', ...Array.from(new Set(POLICIES.map(p => p.category)))], []);
  const personas = useMemo(() => ['All', ...PERSONAS], []);

  const filteredPolicies = useMemo(() => {
    if (externalPolicies) return [...externalPolicies].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    
    return POLICIES.filter(p => {
      const agencyMatch = filterAgency === 'All' || p.agency === filterAgency;
      const categoryMatch = filterCategory === 'All' || p.category === filterCategory;
      const personaMatch = filterPersona === 'All' || p.affectedGroups.includes(filterPersona);
      return agencyMatch && categoryMatch && personaMatch;
    }).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }, [filterAgency, filterCategory, filterPersona, externalPolicies]);
  
  // ... rest of the component

  const getTypeStyles = (type: string) => {
    switch (type) {
      case 'beneficial':
        return {
          bg: 'bg-emerald-500',
          text: 'text-emerald-600',
          border: 'border-emerald-200',
          lightBg: 'bg-emerald-50',
          label: 'Beneficial'
        };
      case 'compliance':
        return {
          bg: 'bg-orange-500',
          text: 'text-orange-600',
          border: 'border-orange-200',
          lightBg: 'bg-orange-50',
          label: 'Compliance'
        };
      case 'restrictive':
        return {
          bg: 'bg-red-500',
          text: 'text-red-600',
          border: 'border-red-200',
          lightBg: 'bg-red-50',
          label: 'Restrictive'
        };
      default:
        return {
          bg: 'bg-slate-500',
          text: 'text-slate-600',
          border: 'border-slate-200',
          lightBg: 'bg-slate-50',
          label: 'General'
        };
    }
  };

  return (
    <div className="space-y-8">
      {/* Filters */}
      {!externalPolicies && (
        <div className="bg-white p-6 rounded-2xl border border-slate-200 card-shadow">
          <div className="flex items-center gap-2 mb-6 text-primary font-bold">
            <Filter className="w-5 h-5" />
            <span>Filter Timeline</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <label className="text-xs font-mono text-slate-400 uppercase flex items-center gap-2">
                <Building2 className="w-3 h-3" /> Agency
              </label>
              <select 
                value={filterAgency}
                onChange={(e) => setFilterAgency(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-accent outline-none"
              >
                {agencies.map(a => <option key={a} value={a}>{a}</option>)}
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-xs font-mono text-slate-400 uppercase flex items-center gap-2">
                <Tag className="w-3 h-3" /> Category
              </label>
              <select 
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-accent outline-none"
              >
                {categories.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-xs font-mono text-slate-400 uppercase flex items-center gap-2">
                <Users className="w-3 h-3" /> Affected Group
              </label>
              <select 
                value={filterPersona}
                onChange={(e) => setFilterPersona(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-accent outline-none"
              >
                {personas.map(p => <option key={p} value={p}>{p}</option>)}
              </select>
            </div>
          </div>
        </div>
      )}

      {/* Timeline */}
      <div className="relative">
        {/* Vertical Line */}
        <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-slate-200 -translate-x-1/2 hidden md:block" />
        <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-slate-200 md:hidden" />

        <div className="space-y-12">
          {filteredPolicies.length > 0 ? (
            filteredPolicies.map((policy, index) => {
              const styles = getTypeStyles(policy.type);
              const isEven = index % 2 === 0;

              return (
                <motion.div 
                  key={policy.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  className={cn(
                    "relative flex flex-col md:flex-row items-start md:items-center gap-8",
                    isEven ? "md:flex-row-reverse" : ""
                  )}
                >
                  {/* Dot */}
                  <div className="absolute left-4 md:left-1/2 w-4 h-4 rounded-full border-4 border-white shadow-sm z-10 -translate-x-1/2 mt-1.5 md:mt-0 bg-white">
                    <div className={cn("w-full h-full rounded-full", styles.bg)} />
                  </div>

                  {/* Date Label (Desktop) */}
                  <div className={cn(
                    "hidden md:block w-1/2 text-sm font-mono text-slate-400",
                    isEven ? "text-left pl-8" : "text-right pr-8"
                  )}>
                    {new Date(policy.date).toLocaleDateString('en-NG', { year: 'numeric', month: 'long', day: 'numeric' })}
                  </div>

                  {/* Card */}
                  <div className="w-full md:w-1/2 pl-12 md:pl-0">
                    <Link 
                      to={`/policy/${policy.id}`}
                      className="block bg-white p-6 rounded-2xl border border-slate-200 card-shadow hover:border-accent transition-all group"
                    >
                      <div className="flex items-center justify-between mb-3">
                        <span className={cn("text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded", styles.lightBg, styles.text)}>
                          {styles.label}
                        </span>
                        <div className="flex items-center text-[10px] font-mono text-slate-400 md:hidden">
                          <Calendar className="w-3 h-3 mr-1" />
                          {new Date(policy.date).toLocaleDateString('en-NG', { year: 'numeric', month: 'short', day: 'numeric' })}
                        </div>
                      </div>
                      
                      <h3 className="text-lg font-bold text-primary mb-2 group-hover:text-accent transition-colors">
                        {policy.title}
                      </h3>
                      
                      <div className="flex flex-wrap gap-y-2 gap-x-4 text-xs text-text-secondary mb-4">
                        <div className="flex items-center">
                          <Building2 className="w-3 h-3 mr-1.5 text-slate-400" />
                          {policy.agency}
                        </div>
                        <div className="flex items-center">
                          <Tag className="w-3 h-3 mr-1.5 text-slate-400" />
                          {policy.category}
                        </div>
                      </div>

                      <div className="flex items-center justify-between pt-4 border-t border-slate-50">
                        <div className="flex items-center gap-1">
                          <span className="text-[10px] font-mono text-slate-400 uppercase">Impact:</span>
                          <span className={cn(
                            "text-[10px] font-bold uppercase",
                            policy.impactLevel === 'High' ? 'text-red-500' : 
                            policy.impactLevel === 'Medium' ? 'text-orange-500' : 'text-emerald-500'
                          )}>
                            {policy.impactLevel}
                          </span>
                        </div>
                        <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-accent group-hover:translate-x-1 transition-all" />
                      </div>
                    </Link>
                  </div>
                </motion.div>
              );
            })
          ) : (
            <div className="text-center py-20 bg-slate-50 rounded-2xl border border-dashed border-slate-200">
              <p className="text-text-secondary">No policies found matching your filters.</p>
              <button 
                onClick={() => { setFilterAgency('All'); setFilterCategory('All'); setFilterPersona('All'); }}
                className="mt-4 text-accent font-bold hover:underline"
              >
                Clear all filters
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
