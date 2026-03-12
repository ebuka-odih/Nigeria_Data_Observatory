import { ArrowUpRight, ArrowDownRight, Minus, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ResponsiveContainer, LineChart, Line } from 'recharts';
import { SnapshotItem } from '../data';

export function IndicatorTile({ id, label, value, trend, source, lastUpdated, history }: SnapshotItem) {
  const isPositive = trend === 'up';
  const isNegative = trend === 'down';
  
  const chartColor = isPositive ? '#10b981' : isNegative ? '#ef4444' : '#94a3b8';

  return (
    <Link 
      to={`/datasets/${id}`}
      className="bg-white p-5 rounded-xl border border-slate-200 card-shadow hover:border-accent transition-all group block"
    >
      <div className="flex justify-between items-start mb-4">
        <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">
          {label}
        </span>
        <div className="flex items-center gap-1">
          {trend === 'up' && <ArrowUpRight className="w-4 h-4 text-emerald-500" />}
          {trend === 'down' && <ArrowDownRight className="w-4 h-4 text-red-500" />}
          {trend === 'neutral' && <Minus className="w-4 h-4 text-slate-400" />}
        </div>
      </div>

      <div className="flex items-end justify-between gap-4">
        <div>
          <div className="text-3xl font-bold text-primary tracking-tight mb-1">
            {value}
          </div>
          <div className="flex items-center gap-1.5 text-[10px] font-medium text-slate-400 uppercase tracking-wider">
            <Clock className="w-3 h-3" />
            Updated {lastUpdated}
          </div>
        </div>

        <div className="h-12 w-24">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={history}>
              <Line 
                type="monotone" 
                dataKey="value" 
                stroke={chartColor} 
                strokeWidth={2} 
                dot={false} 
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="mt-4 pt-4 border-t border-slate-100 flex justify-between items-center">
        <span className="text-[9px] font-mono text-slate-400 uppercase">
          Source: {source}
        </span>
        <span className="text-[9px] font-bold text-accent opacity-0 group-hover:opacity-100 transition-opacity uppercase tracking-tighter">
          View Details →
        </span>
      </div>
    </Link>
  );
}
