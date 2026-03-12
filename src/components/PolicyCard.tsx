import { Link } from 'react-router-dom';
import { Calendar, Tag, Users, AlertCircle } from 'lucide-react';
import { Policy } from '../data';
import { cn } from '../lib/utils';

interface PolicyCardProps {
  policy: Policy;
  key?: string | number;
}

export function PolicyCard({ policy }: PolicyCardProps) {
  const impactColors = {
    High: 'bg-red-50 text-red-700 border-red-100',
    Medium: 'bg-highlight/10 text-amber-700 border-highlight/20',
    Low: 'bg-blue-50 text-blue-700 border-blue-100',
  };

  return (
    <Link 
      to={`/policies/${policy.id}`}
      className="group bg-white p-6 rounded-xl border border-slate-200 card-shadow hover:border-primary/30 transition-all block"
    >
      <div className="flex justify-between items-start mb-4">
        <span className="text-[10px] font-mono font-bold bg-slate-100 text-slate-600 px-2 py-1 rounded uppercase">
          {policy.agency}
        </span>
        <span className={cn(
          "text-[10px] font-bold px-2 py-1 rounded border uppercase",
          impactColors[policy.impactLevel]
        )}>
          {policy.impactLevel} Impact
        </span>
      </div>
      
      <h3 className="text-lg font-bold text-primary mb-2 group-hover:text-accent transition-colors">
        {policy.title}
      </h3>
      
      <p className="text-sm text-text-secondary line-clamp-2 mb-4">
        {policy.summary}
      </p>

      <div className="grid grid-cols-2 gap-3 pt-4 border-t border-slate-100">
        <div className="flex items-center text-[11px] text-text-secondary">
          <Tag className="w-3 h-3 mr-1.5" />
          {policy.category}
        </div>
        <div className="flex items-center text-[11px] text-text-secondary">
          <Calendar className="w-3 h-3 mr-1.5" />
          {policy.date}
        </div>
        <div className="flex items-center text-[11px] text-text-secondary col-span-2">
          <Users className="w-3 h-3 mr-1.5" />
          <span className="truncate">{policy.affectedGroups.join(', ')}</span>
        </div>
      </div>
    </Link>
  );
}
