import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  User, 
  Briefcase, 
  Shield, 
  FileText, 
  AlertCircle, 
  Clock, 
  Sparkles, 
  ChevronRight, 
  CheckCircle2, 
  ExternalLink, 
  ArrowRight,
  Settings,
  Save,
  Copy,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { POLICIES, PERSONAS, type Policy } from '../data';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// --- Types ---
interface PersonaProfile {
  name: string;
  description: string;
  sector: string;
  riskLevel: 'Low' | 'Medium' | 'High';
  icon: React.ReactNode;
}

const PERSONA_DETAILS: Record<string, PersonaProfile> = {
  'Student': {
    name: 'Student',
    description: 'Tertiary institution students and researchers',
    sector: 'Education',
    riskLevel: 'Low',
    icon: <User className="w-6 h-6" />
  },
  'Business Owner': {
    name: 'Business Owner',
    description: 'Small and Medium Enterprise Operators',
    sector: 'Business',
    riskLevel: 'Medium',
    icon: <Briefcase className="w-6 h-6" />
  },
  'Importer': {
    name: 'Importer',
    description: 'International trade and logistics professionals',
    sector: 'Trade',
    riskLevel: 'High',
    icon: <Briefcase className="w-6 h-6" />
  },
  'Driver': {
    name: 'Driver',
    description: 'Commercial and private transport operators',
    sector: 'Transport',
    riskLevel: 'Medium',
    icon: <User className="w-6 h-6" />
  },
  'Startup Founder': {
    name: 'Startup Founder',
    description: 'Tech entrepreneurs and innovation leaders',
    sector: 'Technology',
    riskLevel: 'High',
    icon: <Sparkles className="w-6 h-6" />
  },
  'Developer': {
    name: 'Developer',
    description: 'Software engineers and digital creators',
    sector: 'Technology',
    riskLevel: 'Low',
    icon: <Sparkles className="w-6 h-6" />
  },
  'Civil Servant': {
    name: 'Civil Servant',
    description: 'Public sector employees and administrators',
    sector: 'Public Service',
    riskLevel: 'Low',
    icon: <User className="w-6 h-6" />
  }
};

// --- Components ---

const ProfileHeaderCard = ({ 
  profile, 
  onChangeProfile,
  onSave,
  onCompare
}: { 
  profile: PersonaProfile, 
  onChangeProfile: () => void,
  onSave: () => void,
  onCompare: () => void
}) => (
  <div className="bg-white rounded-2xl border border-slate-200 card-shadow p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
    <div className="flex items-start gap-6">
      <div className="w-16 h-16 rounded-2xl bg-primary/5 flex items-center justify-center text-primary border border-primary/10">
        {profile.icon}
      </div>
      <div className="space-y-1">
        <p className="text-xs font-mono text-slate-400 uppercase tracking-wider">Viewing Impact For</p>
        <h2 className="text-2xl font-bold text-primary flex items-center gap-2">
          {profile.name}
        </h2>
        <p className="text-text-secondary text-sm">{profile.description}</p>
        
        <div className="flex flex-wrap gap-3 mt-4">
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-50 border border-slate-200 text-[10px] font-bold text-slate-600 uppercase">
            Sector: {profile.sector}
          </div>
          <div className={cn(
            "flex items-center gap-1.5 px-3 py-1 rounded-full border text-[10px] font-bold uppercase",
            profile.riskLevel === 'High' ? "bg-red-50 border-red-100 text-red-600" :
            profile.riskLevel === 'Medium' ? "bg-orange-50 border-orange-100 text-orange-600" :
            "bg-emerald-50 border-emerald-100 text-emerald-600"
          )}>
            Risk Level: {profile.riskLevel}
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/5 border border-primary/10 text-[10px] font-bold text-primary uppercase">
            Active Policies: {POLICIES.filter(p => p.affectedGroups.includes(profile.name)).length}
          </div>
        </div>
      </div>
    </div>
    
    <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
      <button 
        onClick={onChangeProfile}
        className="flex items-center justify-center gap-2 px-4 py-2 rounded-lg border border-slate-200 text-sm font-bold text-slate-600 hover:bg-slate-50 transition-colors"
      >
        <Settings className="w-4 h-4" /> Change Profile
      </button>
      <button 
        onClick={onSave}
        className="flex items-center justify-center gap-2 px-4 py-2 rounded-lg border border-slate-200 text-sm font-bold text-slate-600 hover:bg-slate-50 transition-colors"
      >
        <Save className="w-4 h-4" /> Save Profile
      </button>
      <button 
        onClick={onCompare}
        className="flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-primary text-white text-sm font-bold hover:bg-primary/90 transition-colors shadow-lg shadow-primary/20"
      >
        <Copy className="w-4 h-4" /> Compare Profiles
      </button>
    </div>
  </div>
);

const ImpactStatCard = ({ 
  label, 
  value, 
  icon: Icon, 
  color, 
  isActive, 
  onClick 
}: { 
  label: string; 
  value: number; 
  icon: any; 
  color: 'blue' | 'red' | 'orange' | 'emerald';
  isActive: boolean;
  onClick: () => void;
}) => {
  const colorMap = {
    blue: {
      active: 'border-blue-500 ring-blue-500/10 bg-blue-500 text-white',
      inactive: 'bg-blue-50 text-blue-500 group-hover:bg-blue-100'
    },
    red: {
      active: 'border-red-500 ring-red-500/10 bg-red-500 text-white',
      inactive: 'bg-red-50 text-red-500 group-hover:bg-red-100'
    },
    orange: {
      active: 'border-orange-500 ring-orange-500/10 bg-orange-500 text-white',
      inactive: 'bg-orange-50 text-orange-500 group-hover:bg-orange-100'
    },
    emerald: {
      active: 'border-emerald-500 ring-emerald-500/10 bg-emerald-500 text-white',
      inactive: 'bg-emerald-50 text-emerald-500 group-hover:bg-emerald-100'
    }
  };

  const styles = colorMap[color];

  return (
    <button 
      onClick={onClick}
      className={cn(
        "bg-white p-6 rounded-2xl border transition-all text-left flex items-center justify-between group",
        isActive ? styles.active.split(' ').slice(0, 2).join(' ') : "border-slate-200 hover:border-slate-300 card-shadow"
      )}
    >
      <div className="space-y-1">
        <p className="text-3xl font-bold text-primary">{value}</p>
        <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">{label}</p>
      </div>
      <div className={cn(
        "w-12 h-12 rounded-xl flex items-center justify-center transition-colors",
        isActive ? styles.active.split(' ').slice(2).join(' ') : styles.inactive
      )}>
        <Icon className="w-6 h-6" />
      </div>
    </button>
  );
};

const PolicyImpactCard = ({ policy }: { policy: Policy }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  
  const getImpactStyles = (type: string) => {
    switch (type) {
      case 'restrictive': 
        return { 
          colorClass: 'bg-red-50 text-red-600 border-red-100', 
          dotClass: 'bg-red-500',
          label: 'Urgent Compliance', 
          icon: <AlertCircle className="w-4 h-4" /> 
        };
      case 'compliance': 
        return { 
          colorClass: 'bg-orange-50 text-orange-600 border-orange-100', 
          dotClass: 'bg-orange-500',
          label: 'Compliance Required', 
          icon: <Clock className="w-4 h-4" /> 
        };
      case 'beneficial': 
        return { 
          colorClass: 'bg-emerald-50 text-emerald-600 border-emerald-100', 
          dotClass: 'bg-emerald-500',
          label: 'Opportunity/Benefit', 
          icon: <Sparkles className="w-4 h-4" /> 
        };
      default: 
        return { 
          colorClass: 'bg-blue-50 text-blue-600 border-blue-100', 
          dotClass: 'bg-blue-500',
          label: 'Informational Update', 
          icon: <FileText className="w-4 h-4" /> 
        };
    }
  };

  const styles = getImpactStyles(policy.type);

  return (
    <div className="bg-white rounded-2xl border border-slate-200 card-shadow overflow-hidden transition-all hover:border-slate-300">
      <div className="p-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
          <div className="flex items-center gap-3">
            <span className={cn(
              "flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold uppercase",
              styles.colorClass
            )}>
              {styles.icon}
              {styles.label}
            </span>
            <span className="px-3 py-1 rounded-full bg-slate-100 text-slate-600 text-[10px] font-bold uppercase border border-slate-200">
              {policy.agency}
            </span>
          </div>
          <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
            <Clock className="w-3.5 h-3.5" />
            Deadline: {new Date(policy.date).toLocaleDateString()}
          </div>
        </div>

        <h3 className="text-xl font-bold text-primary mb-3">{policy.title}</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="space-y-2">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Required Action</p>
            <p className="text-sm text-text-secondary leading-relaxed">
              {policy.whatToDo[0] || "Review policy details for specific actions."}
            </p>
          </div>
          <div className="space-y-2">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Affected Group</p>
            <div className="flex flex-wrap gap-2">
              {policy.affectedGroups.map(group => (
                <span key={group} className="px-2 py-0.5 rounded bg-slate-50 text-slate-500 text-[10px] font-medium border border-slate-200">
                  {group}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between pt-6 border-t border-slate-50">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5">
              <span className="text-[10px] font-mono text-slate-400 uppercase">Impact Level:</span>
              <span className={cn(
                "text-[10px] font-bold uppercase",
                policy.impactLevel === 'High' ? 'text-red-500' : 
                policy.impactLevel === 'Medium' ? 'text-orange-500' : 'text-emerald-500'
              )}>
                {policy.impactLevel}
              </span>
            </div>
          </div>
          <button 
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex items-center gap-2 text-sm font-bold text-primary hover:text-accent transition-colors"
          >
            {isExpanded ? 'Show Less' : 'Expand Details'}
            {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="border-t border-slate-100 bg-slate-50/50"
          >
            <div className="p-6 space-y-6">
              <div>
                <h4 className="text-sm font-bold text-primary mb-2">Summary</h4>
                <p className="text-sm text-text-secondary leading-relaxed">{policy.summary}</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h4 className="text-sm font-bold text-primary mb-3">Key Changes</h4>
                  <ul className="space-y-2">
                    {policy.whatChanged.map((change, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-text-secondary">
                        <div className="w-1.5 h-1.5 rounded-full bg-accent mt-1.5 shrink-0" />
                        {change}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="text-sm font-bold text-primary mb-3">Next Steps</h4>
                  <ul className="space-y-2">
                    {policy.whatToDo.map((step, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-text-secondary">
                        <CheckCircle2 className="w-4 h-4 text-emerald-500 mt-0.5 shrink-0" />
                        {step}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="pt-4">
                <button className="w-full md:w-auto flex items-center justify-center gap-2 px-6 py-3 bg-primary text-white rounded-xl font-bold hover:bg-primary/90 transition-all">
                  View Full Policy Document <ExternalLink className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const ActionChecklistPanel = ({ policies }: { policies: Policy[] }) => {
  const actions = policies.flatMap(p => p.whatToDo.map(action => ({
    action,
    source: p.title,
    deadline: p.date,
    id: `${p.id}-${action.slice(0, 10)}`
  })));

  return (
    <div className="bg-white rounded-2xl border border-slate-200 card-shadow overflow-hidden sticky top-24">
      <div className="p-6 border-b border-slate-100 bg-slate-50/50">
        <h3 className="text-lg font-bold text-primary flex items-center gap-2">
          <CheckCircle2 className="w-5 h-5 text-emerald-500" />
          Action Checklist
        </h3>
        <p className="text-xs text-text-secondary mt-1">Automatically compiled from your policies</p>
      </div>
      <div className="p-6 space-y-6 max-h-[calc(100vh-250px)] overflow-y-auto">
        {actions.length > 0 ? (
          actions.map((item, i) => (
            <div key={item.id} className="group">
              <div className="flex items-start gap-3 mb-3">
                <div className="w-5 h-5 rounded border-2 border-slate-200 mt-0.5 group-hover:border-accent transition-colors cursor-pointer" />
                <div className="space-y-1">
                  <p className="text-sm font-medium text-primary leading-snug">{item.action}</p>
                  <p className="text-[10px] text-slate-400 flex items-center gap-1">
                    Source: <span className="text-accent font-medium truncate max-w-[150px]">{item.source}</span>
                  </p>
                  <p className="text-[10px] text-slate-400 flex items-center gap-1">
                    <Clock className="w-3 h-3" /> Deadline: {new Date(item.deadline).toLocaleDateString()}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2 pl-8 opacity-0 group-hover:opacity-100 transition-opacity">
                <button className="text-[10px] font-bold text-emerald-600 hover:underline">Mark Complete</button>
                <span className="text-slate-300">•</span>
                <button className="text-[10px] font-bold text-primary hover:underline">View Policy</button>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-12">
            <CheckCircle2 className="w-12 h-12 text-slate-200 mx-auto mb-4" />
            <p className="text-sm text-slate-400 font-medium">No actions required at this time.</p>
          </div>
        )}
      </div>
      <div className="p-6 bg-slate-50 border-t border-slate-100">
        <button className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-lg text-xs font-bold text-primary hover:bg-slate-50 transition-colors">
          Export Checklist <ArrowRight className="w-3 h-3" />
        </button>
      </div>
    </div>
  );
};

const PersonaSwitchChips = ({ 
  activePersona, 
  onSelect 
}: { 
  activePersona: string; 
  onSelect: (p: string) => void;
}) => (
  <div className="flex items-center gap-2 overflow-x-auto pb-4 no-scrollbar">
    <span className="text-xs font-bold text-slate-400 uppercase tracking-wider mr-2 shrink-0">Switch Role:</span>
    {PERSONAS.map(p => (
      <button
        key={p}
        onClick={() => onSelect(p)}
        className={cn(
          "px-4 py-2 rounded-full text-xs font-bold transition-all shrink-0 border",
          activePersona === p 
            ? "bg-primary text-white border-primary shadow-lg shadow-primary/20" 
            : "bg-white text-slate-600 border-slate-200 hover:border-slate-300"
        )}
      >
        {p}
      </button>
    ))}
  </div>
);

const ProfilePickerModal = ({ 
  isOpen, 
  onClose, 
  onSelect, 
  activePersona 
}: { 
  isOpen: boolean; 
  onClose: () => void; 
  onSelect: (p: string) => void;
  activePersona: string;
}) => (
  <AnimatePresence>
    {isOpen && (
      <div className="fixed inset-0 z-[999] flex items-center justify-center p-4 sm:p-6">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-primary/60 backdrop-blur-md"
        />
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-3xl bg-white rounded-[2rem] shadow-2xl overflow-hidden border border-white/20"
        >
          <div className="p-8 sm:p-10 border-b border-slate-100 bg-slate-50/50">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-3xl font-black text-primary tracking-tight">Select Profile</h3>
              <button 
                onClick={onClose}
                className="w-10 h-10 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-400 hover:text-primary hover:border-primary transition-all"
              >
                <ChevronDown className="w-6 h-6 rotate-180" />
              </button>
            </div>
            <p className="text-text-secondary text-lg">Choose a role to see how national policies impact your specific demographic.</p>
          </div>
          
          <div className="p-8 sm:p-10 grid grid-cols-1 sm:grid-cols-2 gap-4 max-h-[50vh] overflow-y-auto custom-scrollbar">
            {Object.entries(PERSONA_DETAILS).map(([key, details]) => (
              <button
                key={key}
                onClick={() => {
                  onSelect(key);
                  onClose();
                }}
                className={cn(
                  "flex items-start gap-5 p-5 rounded-2xl border transition-all text-left group relative overflow-hidden",
                  activePersona === key 
                    ? "border-primary bg-primary/5 ring-2 ring-primary/20" 
                    : "border-slate-100 hover:border-primary/30 hover:bg-slate-50"
                )}
              >
                {activePersona === key && (
                  <div className="absolute top-0 right-0 p-2">
                    <CheckCircle2 className="w-4 h-4 text-primary" />
                  </div>
                )}
                <div className={cn(
                  "w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 transition-all duration-300",
                  activePersona === key 
                    ? "bg-primary text-white shadow-lg shadow-primary/30 scale-110" 
                    : "bg-slate-100 text-slate-400 group-hover:bg-primary/10 group-hover:text-primary"
                )}>
                  {details.icon}
                </div>
                <div className="space-y-1.5">
                  <p className={cn(
                    "text-lg font-bold transition-colors",
                    activePersona === key ? "text-primary" : "text-slate-800"
                  )}>
                    {details.name}
                  </p>
                  <p className="text-sm text-slate-500 leading-relaxed line-clamp-2">
                    {details.description}
                  </p>
                  <div className="flex items-center gap-2 mt-3">
                    <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-500 text-[9px] font-black uppercase tracking-wider">
                      {details.sector}
                    </span>
                    <span className={cn(
                      "px-2 py-0.5 rounded text-[9px] font-black uppercase tracking-wider",
                      details.riskLevel === 'High' ? "bg-red-50 text-red-600" :
                      details.riskLevel === 'Medium' ? "bg-orange-50 text-orange-600" :
                      "bg-emerald-50 text-emerald-600"
                    )}>
                      {details.riskLevel} Risk
                    </span>
                  </div>
                </div>
              </button>
            ))}
          </div>
          
          <div className="p-8 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
            <p className="text-xs text-slate-400 font-medium italic">
              * Data is updated weekly based on official gazettes.
            </p>
            <button 
              onClick={onClose}
              className="px-8 py-3 rounded-xl font-black text-primary hover:bg-white hover:shadow-md transition-all border border-transparent hover:border-slate-200"
            >
              Close
            </button>
          </div>
        </motion.div>
      </div>
    )}
  </AnimatePresence>
);

// --- Main Page ---

export function ImpactExplorer() {
  const [activePersona, setActivePersona] = useState('Student');
  const [activeFilter, setActiveFilter] = useState('all');
  const [isProfilePickerOpen, setIsProfilePickerOpen] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'info' } | null>(null);

  const showToast = (message: string, type: 'success' | 'info' = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const profile = PERSONA_DETAILS[activePersona];
  const personaPolicies = useMemo(() => 
    POLICIES.filter(p => p.affectedGroups.includes(activePersona)),
    [activePersona]
  );

  const filteredPolicies = useMemo(() => {
    switch (activeFilter) {
      case 'urgent': return personaPolicies.filter(p => p.type === 'restrictive');
      case 'compliance': return personaPolicies.filter(p => p.type === 'compliance');
      case 'new': return personaPolicies.filter(p => {
        const date = new Date(p.date);
        const now = new Date();
        const diff = (now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24);
        return diff < 30; // Mock "new" as within 30 days for demo
      });
      default: return personaPolicies;
    }
  }, [personaPolicies, activeFilter]);

  const stats = {
    total: personaPolicies.length,
    urgent: personaPolicies.filter(p => p.type === 'restrictive').length,
    deadlines: personaPolicies.filter(p => p.type === 'compliance').length,
    new: personaPolicies.filter(p => {
      const date = new Date(p.date);
      const now = new Date();
      const diff = (now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24);
      return diff < 30;
    }).length
  };

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      {/* Page Header */}
      <div className="bg-white border-b border-slate-200 pt-12 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="text-4xl font-black text-primary tracking-tight mb-2">
              Impact Explorer
            </h1>
            <p className="text-lg text-text-secondary">
              Understand how national policies affect your demographic or professional role.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8">
        <div className="space-y-8">
          <AnimatePresence>
            {toast && (
              <motion.div
                initial={{ opacity: 0, y: 50, x: '-50%' }}
                animate={{ opacity: 1, y: 0, x: '-50%' }}
                exit={{ opacity: 0, y: 50, x: '-50%' }}
                className={cn(
                  "fixed bottom-8 left-1/2 z-[100] px-6 py-3 rounded-2xl shadow-2xl flex items-center gap-3 border",
                  toast.type === 'success' ? "bg-emerald-600 border-emerald-500 text-white" : "bg-primary border-primary/20 text-white"
                )}
              >
                {toast.type === 'success' ? <CheckCircle2 className="w-5 h-5" /> : <Sparkles className="w-5 h-5" />}
                <span className="text-sm font-bold">{toast.message}</span>
              </motion.div>
            )}
          </AnimatePresence>
          <ProfilePickerModal 
            isOpen={isProfilePickerOpen}
            onClose={() => setIsProfilePickerOpen(false)}
            onSelect={setActivePersona}
            activePersona={activePersona}
          />
          {/* Profile Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <ProfileHeaderCard 
              profile={profile} 
              onChangeProfile={() => setIsProfilePickerOpen(true)}
              onSave={() => showToast('Profile saved to your account.')}
              onCompare={() => showToast('Comparison mode activated. Select another profile to compare.', 'info')}
            />
          </motion.div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <ImpactStatCard 
              label="Policies Affecting You" 
              value={stats.total} 
              icon={FileText} 
              color="blue"
              isActive={activeFilter === 'all'}
              onClick={() => setActiveFilter('all')}
            />
            <ImpactStatCard 
              label="Urgent Actions" 
              value={stats.urgent} 
              icon={AlertCircle} 
              color="red"
              isActive={activeFilter === 'urgent'}
              onClick={() => setActiveFilter('urgent')}
            />
            <ImpactStatCard 
              label="Upcoming Deadlines" 
              value={stats.deadlines} 
              icon={Clock} 
              color="orange"
              isActive={activeFilter === 'compliance'}
              onClick={() => setActiveFilter('compliance')}
            />
            <ImpactStatCard 
              label="New This Week" 
              value={stats.new} 
              icon={Sparkles} 
              color="emerald"
              isActive={activeFilter === 'new'}
              onClick={() => setActiveFilter('new')}
            />
          </div>

          {/* Main Content Area */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Column: Feed */}
            <div className="lg:col-span-8 space-y-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <PersonaSwitchChips 
                  activePersona={activePersona} 
                  onSelect={setActivePersona} 
                />
              </div>

              <div className="space-y-6">
                <AnimatePresence mode="popLayout">
                  {filteredPolicies.length > 0 ? (
                    filteredPolicies.map((policy, idx) => (
                      <motion.div
                        key={policy.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ delay: idx * 0.05 }}
                      >
                        <PolicyImpactCard policy={policy} />
                      </motion.div>
                    ))
                  ) : (
                    <motion.div 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="text-center py-20 bg-white rounded-2xl border border-dashed border-slate-200"
                    >
                      <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4">
                        <FileText className="w-8 h-8 text-slate-300" />
                      </div>
                      <h3 className="text-lg font-bold text-primary">No policies found</h3>
                      <p className="text-text-secondary text-sm">Try adjusting your filters or switching roles.</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* Right Column: Action Checklist */}
            <div className="lg:col-span-4">
              <ActionChecklistPanel policies={personaPolicies} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
