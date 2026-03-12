import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Home } from './pages/Home';
import { PolicyIntelligence } from './pages/PolicyIntelligence';
import { PolicyDetail } from './pages/PolicyDetail';
import { DatasetExplorer } from './pages/DatasetExplorer';
import { DatasetDetail } from './pages/DatasetDetail';
import { ImpactExplorer } from './pages/ImpactExplorer';
import { AgencyExplorer } from './pages/AgencyExplorer';
import { DeveloperHub } from './pages/DeveloperHub';
import { About } from './pages/About';

export default function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/policies" element={<PolicyIntelligence />} />
            <Route path="/policies/:id" element={<PolicyDetail />} />
            <Route path="/datasets" element={<DatasetExplorer />} />
            <Route path="/datasets/:id" element={<DatasetDetail />} />
            <Route path="/impact" element={<ImpactExplorer />} />
            <Route path="/agencies" element={<AgencyExplorer />} />
            <Route path="/developers" element={<DeveloperHub />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </main>
        <footer className="bg-white border-t border-slate-200 py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
              <div className="col-span-1 md:col-span-2">
                <div className="flex items-center space-x-2 mb-6">
                  <div className="w-6 h-6 bg-primary rounded flex items-center justify-center">
                    <span className="text-white text-[10px] font-bold">NG</span>
                  </div>
                  <span className="font-bold text-primary tracking-tight">
                    Nigeria Data Observatory
                  </span>
                </div>
                <p className="text-sm text-text-secondary max-w-sm leading-relaxed">
                  The official public data observatory for tracking national policy changes and datasets. Promoting transparency through data accessibility.
                </p>
              </div>
              <div>
                <h4 className="text-xs font-bold text-primary uppercase tracking-widest mb-6">Platform</h4>
                <ul className="space-y-4 text-sm text-text-secondary">
                  <li><a href="/policies" className="hover:text-accent">Policies</a></li>
                  <li><a href="/datasets" className="hover:text-accent">Datasets</a></li>
                  <li><a href="/agencies" className="hover:text-accent">Agencies</a></li>
                  <li><a href="/impact" className="hover:text-accent">Impact Explorer</a></li>
                </ul>
              </div>
              <div>
                <h4 className="text-xs font-bold text-primary uppercase tracking-widest mb-6">Resources</h4>
                <ul className="space-y-4 text-sm text-text-secondary">
                  <li><a href="/developers" className="hover:text-accent">API Docs</a></li>
                  <li><a href="/about" className="hover:text-accent">About Us</a></li>
                  <li><a href="#" className="hover:text-accent">Privacy Policy</a></li>
                  <li><a href="#" className="hover:text-accent">Terms of Service</a></li>
                </ul>
              </div>
            </div>
            <div className="mt-12 pt-8 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center gap-4">
              <div className="text-xs text-slate-400">
                © 2024 Nigeria Public Data Observatory. All rights reserved.
              </div>
              <div className="flex space-x-6 text-xs text-slate-400">
                <span>Institutional Data Partner: NBS</span>
                <span>Regulatory Partner: NCC</span>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </Router>
  );
}
