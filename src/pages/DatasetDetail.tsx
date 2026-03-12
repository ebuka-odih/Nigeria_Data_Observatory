import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { DATASETS } from '../data';
import { 
  LineChart, Line, ResponsiveContainer, YAxis, XAxis, Tooltip, CartesianGrid, AreaChart, Area 
} from 'recharts';
import { ArrowLeft, Download, Calendar, Share2, Info, Database } from 'lucide-react';

export function DatasetDetail() {
  const { id } = useParams();
  const dataset = DATASETS.find(d => d.id === id);
  const [chartType, setChartType] = React.useState<'line' | 'area'>('line');

  if (!dataset) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <h1 className="text-2xl font-bold text-primary">Dataset not found</h1>
        <Link to="/datasets" className="text-accent hover:underline mt-4 inline-block">Back to datasets</Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <Link to="/datasets" className="flex items-center text-text-secondary hover:text-primary mb-8 transition-colors">
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to Dataset Explorer
      </Link>

      <div className="bg-white rounded-2xl border border-slate-200 card-shadow overflow-hidden mb-8">
        <div className="p-8 border-b border-slate-100 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div>
            <div className="flex items-center space-x-2 mb-2">
              <span className="bg-accent/10 text-accent text-[10px] font-mono font-bold px-2 py-1 rounded uppercase">
                {dataset.category}
              </span>
              <span className="text-slate-300">•</span>
              <span className="text-xs text-text-secondary font-medium">{dataset.source}</span>
            </div>
            <h1 className="text-3xl font-bold text-primary">{dataset.title}</h1>
          </div>
          
          <div className="flex flex-wrap gap-3">
            <button className="flex items-center px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm font-medium text-primary hover:bg-slate-100 transition-colors">
              <Download className="w-4 h-4 mr-2" />
              Export CSV
            </button>
            <button className="flex items-center px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm font-medium text-primary hover:bg-slate-100 transition-colors">
              <Download className="w-4 h-4 mr-2" />
              Export JSON
            </button>
            <button className="p-2 bg-slate-50 border border-slate-200 rounded-lg text-primary hover:bg-slate-100 transition-colors">
              <Share2 className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="p-8">
          <div className="flex justify-between items-center mb-8">
            <div className="flex items-center space-x-4">
              <button 
                onClick={() => setChartType('line')}
                className={`px-3 py-1.5 rounded-md text-xs font-bold transition-all ${chartType === 'line' ? 'bg-primary text-white' : 'bg-slate-100 text-slate-500'}`}
              >
                Line Chart
              </button>
              <button 
                onClick={() => setChartType('area')}
                className={`px-3 py-1.5 rounded-md text-xs font-bold transition-all ${chartType === 'area' ? 'bg-primary text-white' : 'bg-slate-100 text-slate-500'}`}
              >
                Area Chart
              </button>
            </div>
            <div className="flex items-center text-xs text-text-secondary">
              <Calendar className="w-4 h-4 mr-1.5" />
              Updated: {dataset.frequency}
            </div>
          </div>

          <div className="h-[400px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              {chartType === 'line' ? (
                <LineChart data={dataset.data} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis 
                    dataKey="year" 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fill: '#64748b', fontSize: 12 }} 
                    dy={10}
                  />
                  <YAxis 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fill: '#64748b', fontSize: 12 }} 
                  />
                  <Tooltip 
                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="value" 
                    stroke="#0B3C5D" 
                    strokeWidth={3} 
                    dot={{ r: 6, fill: '#0B3C5D', strokeWidth: 2, stroke: '#fff' }}
                    activeDot={{ r: 8, strokeWidth: 0 }}
                  />
                </LineChart>
              ) : (
                <AreaChart data={dataset.data} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#2E8B57" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#2E8B57" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis 
                    dataKey="year" 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fill: '#64748b', fontSize: 12 }} 
                    dy={10}
                  />
                  <YAxis 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fill: '#64748b', fontSize: 12 }} 
                  />
                  <Tooltip 
                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="value" 
                    stroke="#2E8B57" 
                    fillOpacity={1} 
                    fill="url(#colorValue)" 
                    strokeWidth={3}
                  />
                </AreaChart>
              )}
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <section className="bg-white p-8 rounded-2xl border border-slate-200 card-shadow">
            <h2 className="text-xl font-bold text-primary mb-4 flex items-center">
              <Info className="w-5 h-5 mr-2 text-accent" />
              About this Dataset
            </h2>
            <p className="text-text-secondary leading-relaxed">
              {dataset.description}
            </p>
          </section>

          <section className="bg-white p-8 rounded-2xl border border-slate-200 card-shadow">
            <h2 className="text-xl font-bold text-primary mb-6">Data Table</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-slate-100">
                    <th className="pb-4 font-mono text-[10px] text-slate-400 uppercase">Year / Period</th>
                    <th className="pb-4 font-mono text-[10px] text-slate-400 uppercase">Value</th>
                    <th className="pb-4 font-mono text-[10px] text-slate-400 uppercase">Unit</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {dataset.data.map((row, i) => (
                    <tr key={i}>
                      <td className="py-4 text-sm font-bold text-primary">{row.year}</td>
                      <td className="py-4 text-sm font-mono text-text-main">{row.value}</td>
                      <td className="py-4 text-sm text-text-secondary">%</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </div>

        <div className="space-y-8">
          <div className="bg-primary text-white p-8 rounded-2xl shadow-xl">
            <h3 className="text-lg font-bold mb-4 flex items-center">
              <Database className="w-5 h-5 mr-2 text-highlight" />
              Technical Info
            </h3>
            <div className="space-y-4">
              <div>
                <label className="text-[10px] font-mono text-slate-400 uppercase block mb-1">Data Source</label>
                <div className="text-sm font-medium">{dataset.source}</div>
              </div>
              <div>
                <label className="text-[10px] font-mono text-slate-400 uppercase block mb-1">Update Frequency</label>
                <div className="text-sm font-medium">{dataset.frequency}</div>
              </div>
              <div>
                <label className="text-[10px] font-mono text-slate-400 uppercase block mb-1">Methodology</label>
                <div className="text-xs text-slate-300 leading-relaxed">
                  Data collected through national surveys and administrative records. Standard statistical methods applied for seasonal adjustment.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
