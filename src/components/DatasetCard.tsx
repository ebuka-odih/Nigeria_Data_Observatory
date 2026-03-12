import { LineChart, Line, ResponsiveContainer, YAxis, XAxis, Tooltip } from 'recharts';
import { Dataset } from '../data';
import { Link } from 'react-router-dom';

interface DatasetCardProps {
  dataset: Dataset;
  key?: string | number;
}

export function DatasetCard({ dataset }: DatasetCardProps) {
  return (
    <Link 
      to={`/datasets/${dataset.id}`}
      className="bg-white p-6 rounded-xl border border-slate-200 card-shadow hover:border-accent/30 transition-all block"
    >
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-lg font-bold text-primary">{dataset.title}</h3>
          <p className="text-xs text-text-secondary">{dataset.source}</p>
        </div>
        <span className="text-[10px] font-mono bg-accent/10 text-accent px-2 py-1 rounded uppercase">
          {dataset.category}
        </span>
      </div>

      <div className="h-24 w-full mb-4">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={dataset.data}>
            <Line 
              type="monotone" 
              dataKey="value" 
              stroke="#2E8B57" 
              strokeWidth={2} 
              dot={false} 
            />
            <Tooltip 
              contentStyle={{ fontSize: '10px', borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
              labelStyle={{ fontWeight: 'bold' }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="flex justify-between items-center text-[11px] text-text-secondary pt-2 border-t border-slate-100">
        <span>Freq: {dataset.frequency}</span>
        <span className="font-mono">Latest: {dataset.data[dataset.data.length - 1].value}</span>
      </div>
    </Link>
  );
}
