import { Search, ArrowRight, ChevronRight } from 'lucide-react';
import { SNAPSHOT, POLICIES, PERSONAS, DATASETS } from '../data';
import { IndicatorTile } from '../components/IndicatorTile';
import { PolicyCard } from '../components/PolicyCard';
import { DatasetCard } from '../components/DatasetCard';
import { PolicyImpactRadar } from '../components/PolicyImpactRadar';
import { PolicyTimeline } from '../components/PolicyTimeline';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';

export function Home() {
  return (
    <div className="space-y-12 pb-20">
      {/* Hero Section (Banner) */}
      <section className="relative bg-primary py-20 overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:20px_20px]"></div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-6xl font-bold text-white mb-6 tracking-tight"
            >
              Nigeria Public Data Observatory
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-xl text-slate-300 mb-2 leading-relaxed"
            >
              Track policy changes, national statistics, and institutional datasets in one unified platform for transparency and research.
            </motion.p>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Nigeria Right Now - National Indicators Command Center */}
        <section>
          <div className="flex justify-between items-end mb-8">
            <div>
              <h2 className="text-3xl font-bold text-primary tracking-tight">Nigeria Right Now</h2>
              <p className="text-text-secondary">National data command center tracking key indicators</p>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {SNAPSHOT.map((item, i) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
              >
                <IndicatorTile {...item} />
              </motion.div>
            ))}
          </div>
        </section>

        <section>
          <div className="flex justify-between items-end mb-8">
            <div>
              <h2 className="text-2xl font-bold text-primary">Latest Policy Changes</h2>
              <p className="text-text-secondary">Recent updates from government agencies</p>
            </div>
            <Link to="/policies" className="text-accent font-medium flex items-center hover:underline">
              View all policies <ArrowRight className="ml-1 w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {POLICIES.slice(0, 3).map((policy, i) => (
              <motion.div
                key={policy.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                <PolicyCard policy={policy} />
              </motion.div>
            ))}
          </div>
        </section>
      </div>

      {/* Who Is Affected Right Now - Radar (Moved Down) */}
      <section className="bg-slate-50 -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8 py-16 border-y border-slate-200">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-primary mb-4">Who Is Affected Right Now</h2>
            <p className="text-text-secondary max-w-2xl mx-auto">
              Real-time policy impact radar showing which sectors of society are currently experiencing the most regulatory changes.
            </p>
          </div>
          <PolicyImpactRadar />
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Policy History Timeline */}
        <section>
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-primary mb-4 tracking-tight">Policy History</h2>
            <p className="text-text-secondary">Explore the chronological evolution of national policies and regulatory changes.</p>
          </div>
          <PolicyTimeline />
        </section>

        {/* Affected Groups */}
        <section>
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-primary">Who is Affected?</h2>
            <p className="text-text-secondary">Filter policies by your specific profile</p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-4">
            {PERSONAS.map((persona) => (
              <Link 
                key={persona}
                to={`/impact?persona=${persona}`}
                className="bg-white p-4 rounded-xl border border-slate-200 card-shadow text-center hover:border-accent hover:bg-accent/5 transition-all group"
              >
                <div className="text-sm font-bold text-primary group-hover:text-accent">{persona}</div>
                <ChevronRight className="w-4 h-4 mx-auto mt-2 text-slate-300 group-hover:text-accent" />
              </Link>
            ))}
          </div>
        </section>

        {/* Featured Datasets */}
        <section>
          <div className="flex justify-between items-end mb-8">
            <div>
              <h2 className="text-2xl font-bold text-primary">Featured Datasets</h2>
              <p className="text-text-secondary">Explore national trends through data</p>
            </div>
            <Link to="/datasets" className="text-accent font-medium flex items-center hover:underline">
              Browse datasets <ArrowRight className="ml-1 w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {DATASETS.map((dataset, i) => (
              <motion.div
                key={dataset.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                <DatasetCard dataset={dataset} />
              </motion.div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
