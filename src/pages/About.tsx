import { Info, Shield, Target, Award } from 'lucide-react';

export function About() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="max-w-3xl mx-auto text-center mb-20">
        <h1 className="text-4xl font-bold text-primary mb-6">About the Observatory</h1>
        <p className="text-xl text-text-secondary leading-relaxed">
          The Nigeria Public Data Observatory is a non-partisan initiative dedicated to improving transparency and public understanding of government policies and national statistics.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-20">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 bg-accent/10 rounded-2xl flex items-center justify-center mx-auto">
            <Shield className="w-8 h-8 text-accent" />
          </div>
          <h3 className="text-xl font-bold text-primary">Trust & Accuracy</h3>
          <p className="text-sm text-text-secondary leading-relaxed">
            Every policy and dataset on this platform is sourced directly from official government gazettes, circulars, and verified agency reports.
          </p>
        </div>
        <div className="text-center space-y-4">
          <div className="w-16 h-16 bg-accent/10 rounded-2xl flex items-center justify-center mx-auto">
            <Target className="w-8 h-8 text-accent" />
          </div>
          <h3 className="text-xl font-bold text-primary">Public Impact</h3>
          <p className="text-sm text-text-secondary leading-relaxed">
            We translate complex regulatory language into actionable insights for citizens, business owners, and researchers.
          </p>
        </div>
        <div className="text-center space-y-4">
          <div className="w-16 h-16 bg-accent/10 rounded-2xl flex items-center justify-center mx-auto">
            <Award className="w-8 h-8 text-accent" />
          </div>
          <h3 className="text-xl font-bold text-primary">Data Integrity</h3>
          <p className="text-sm text-text-secondary leading-relaxed">
            Our data infrastructure ensures that historical records are preserved and accessible for long-term trend analysis.
          </p>
        </div>
      </div>

      <div className="bg-white p-12 rounded-3xl border border-slate-200 card-shadow">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold text-primary mb-6">Our Mission</h2>
            <div className="space-y-4 text-text-secondary leading-relaxed">
              <p>
                In an era of rapid regulatory change, the gap between policy announcement and public understanding can lead to confusion and missed opportunities.
              </p>
              <p>
                The Observatory bridges this gap by providing a centralized, searchable, and machine-readable repository of Nigeria's institutional knowledge.
              </p>
              <p>
                Whether you are a student applying for a loan, a business owner navigating new tariffs, or a developer building the next fintech solution, we provide the data you need to move forward with confidence.
              </p>
            </div>
          </div>
          <div className="bg-slate-50 p-8 rounded-2xl border border-slate-100">
            <h3 className="text-lg font-bold text-primary mb-6">Institutional Partners</h3>
            <div className="grid grid-cols-2 gap-6 opacity-50 grayscale">
              <div className="h-12 bg-slate-300 rounded"></div>
              <div className="h-12 bg-slate-300 rounded"></div>
              <div className="h-12 bg-slate-300 rounded"></div>
              <div className="h-12 bg-slate-300 rounded"></div>
            </div>
            <p className="text-xs text-slate-400 mt-8 text-center">
              Working in collaboration with over 15 government agencies and research institutions.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
