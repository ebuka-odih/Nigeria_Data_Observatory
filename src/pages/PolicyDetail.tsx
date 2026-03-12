import { useParams, Link } from 'react-router-dom';
import { POLICIES } from '../data';
import { Calendar, Tag, Users, ArrowLeft, ExternalLink, CheckCircle2, History, Info } from 'lucide-react';
import { cn } from '../lib/utils';

export function PolicyDetail() {
  const { id } = useParams();
  const policy = POLICIES.find(p => p.id === id);

  if (!policy) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <h1 className="text-2xl font-bold text-primary">Policy not found</h1>
        <Link to="/policies" className="text-accent hover:underline mt-4 inline-block">Back to policies</Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <Link to="/policies" className="flex items-center text-text-secondary hover:text-primary mb-8 transition-colors">
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to Policy Intelligence
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Left Column: Content */}
        <div className="lg:col-span-2 space-y-12">
          <section>
            <div className="flex flex-wrap gap-2 mb-6">
              <span className="bg-primary/5 text-primary text-[10px] font-mono font-bold px-2 py-1 rounded uppercase border border-primary/10">
                {policy.agency}
              </span>
              <span className="bg-accent/5 text-accent text-[10px] font-mono font-bold px-2 py-1 rounded uppercase border border-accent/10">
                {policy.category}
              </span>
            </div>
            <h1 className="text-4xl font-bold text-primary mb-6 leading-tight">{policy.title}</h1>
            <p className="text-xl text-text-secondary leading-relaxed">
              {policy.summary}
            </p>
          </section>

          <section className="bg-white p-8 rounded-2xl border border-slate-200 card-shadow">
            <h2 className="text-2xl font-bold text-primary mb-6 flex items-center">
              <History className="w-6 h-6 mr-3 text-accent" />
              What Changed?
            </h2>
            <ul className="space-y-4">
              {policy.whatChanged.map((item, i) => (
                <li key={i} className="flex items-start">
                  <div className="w-6 h-6 rounded-full bg-accent/10 flex items-center justify-center mr-4 mt-0.5 shrink-0">
                    <span className="text-accent text-xs font-bold">{i + 1}</span>
                  </div>
                  <span className="text-text-main leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-primary mb-6 flex items-center">
              <Users className="w-6 h-6 mr-3 text-accent" />
              Who is Affected?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {policy.whoIsAffected.map((item, i) => (
                <div key={i} className="bg-slate-50 p-4 rounded-xl border border-slate-100 flex items-center">
                  <CheckCircle2 className="w-5 h-5 text-accent mr-3 shrink-0" />
                  <span className="text-sm font-medium text-primary">{item}</span>
                </div>
              ))}
            </div>
          </section>

          <section className="bg-primary text-white p-8 rounded-2xl shadow-xl">
            <h2 className="text-2xl font-bold mb-6 flex items-center">
              <Info className="w-6 h-6 mr-3 text-highlight" />
              What You Should Do
            </h2>
            <ul className="space-y-4">
              {policy.whatToDo.map((item, i) => (
                <li key={i} className="flex items-start">
                  <div className="w-2 h-2 rounded-full bg-highlight mt-2.5 mr-4 shrink-0"></div>
                  <span className="text-slate-100 leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </section>
        </div>

        {/* Right Column: Metadata Panel */}
        <div className="space-y-8">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 card-shadow sticky top-24">
            <h3 className="text-sm font-bold text-text-secondary uppercase tracking-wider mb-6 border-b border-slate-100 pb-2">
              Policy Metadata
            </h3>
            
            <div className="space-y-6">
              <div>
                <label className="text-[10px] font-mono text-slate-400 uppercase block mb-1">Impact Level</label>
                <div className={cn(
                  "inline-block px-3 py-1 rounded-full text-xs font-bold border",
                  policy.impactLevel === 'High' ? 'bg-red-50 text-red-700 border-red-100' :
                  policy.impactLevel === 'Medium' ? 'bg-amber-50 text-amber-700 border-amber-100' :
                  'bg-blue-50 text-blue-700 border-blue-100'
                )}>
                  {policy.impactLevel} Impact
                </div>
              </div>

              <div>
                <label className="text-[10px] font-mono text-slate-400 uppercase block mb-1">Effective Date</label>
                <div className="flex items-center text-primary font-medium">
                  <Calendar className="w-4 h-4 mr-2 text-slate-400" />
                  {policy.date}
                </div>
              </div>

              <div>
                <label className="text-[10px] font-mono text-slate-400 uppercase block mb-1">Timeline</label>
                <div className="relative pl-4 border-l-2 border-slate-100 space-y-6 mt-4">
                  {policy.timeline.map((item, i) => (
                    <div key={i} className="relative">
                      <div className="absolute -left-[21px] top-1 w-2.5 h-2.5 rounded-full bg-white border-2 border-accent"></div>
                      <div className="text-[10px] font-mono text-slate-400 mb-0.5">{item.date}</div>
                      <div className="text-xs font-bold text-primary">{item.event}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-[10px] font-mono text-slate-400 uppercase block mb-1">Official Sources</label>
                <div className="space-y-2 mt-2">
                  {policy.sources.map((source, i) => (
                    <a 
                      key={i} 
                      href={source.url} 
                      className="flex items-center justify-between p-3 rounded-lg bg-slate-50 border border-slate-100 text-xs font-medium text-primary hover:bg-slate-100 transition-colors"
                    >
                      {source.title}
                      <ExternalLink className="w-3 h-3 text-slate-400" />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
