import React from 'react';
import { DATASETS } from '../data';
import { DatasetCard } from '../components/DatasetCard';
import { Search, Grid, List, Database } from 'lucide-react';

const CATEGORIES = [
  { name: 'Economy', icon: '💰' },
  { name: 'Population', icon: '👥' },
  { name: 'Health', icon: '🏥' },
  { name: 'Education', icon: '🎓' },
  { name: 'Infrastructure', icon: '🏗️' },
  { name: 'Agriculture', icon: '🌾' },
  { name: 'Trade', icon: '🚢' },
];

export function DatasetExplorer() {
  const [search, setSearch] = React.useState('');
  const [selectedCategory, setSelectedCategory] = React.useState('');

  const filteredDatasets = DATASETS.filter(d => {
    const matchesSearch = d.title.toLowerCase().includes(search.toLowerCase()) || 
                         d.description.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = !selectedCategory || d.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-12">
        <h1 className="text-3xl font-bold text-primary mb-4">Dataset Explorer</h1>
        <p className="text-text-secondary max-w-2xl">
          Access official national datasets for research, analysis, and policy evaluation. All data is sourced from verified government agencies.
        </p>
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-4 mb-12">
        {CATEGORIES.map((cat) => (
          <button
            key={cat.name}
            onClick={() => setSelectedCategory(selectedCategory === cat.name ? '' : cat.name)}
            className={`p-4 rounded-xl border transition-all text-center space-y-2 ${
              selectedCategory === cat.name 
                ? 'bg-accent border-accent text-white shadow-lg' 
                : 'bg-white border-slate-200 text-primary hover:border-accent'
            }`}
          >
            <div className="text-2xl">{cat.icon}</div>
            <div className="text-xs font-bold uppercase tracking-wider">{cat.name}</div>
          </button>
        ))}
      </div>

      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
          <input 
            type="text" 
            placeholder="Search datasets by name or keyword..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-white border border-slate-200 rounded-xl py-3 pl-12 pr-4 text-primary focus:outline-none focus:ring-2 focus:ring-accent card-shadow"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredDatasets.map((dataset) => (
          <DatasetCard key={dataset.id} dataset={dataset} />
        ))}
      </div>

      {filteredDatasets.length === 0 && (
        <div className="text-center py-20 bg-white rounded-xl border border-dashed border-slate-300">
          <Database className="w-12 h-12 text-slate-200 mx-auto mb-4" />
          <div className="text-slate-400">No datasets found matching your search.</div>
        </div>
      )}
    </div>
  );
}
