import React, { useState, useEffect } from 'react';
import { 
  Code, 
  Terminal, 
  Database, 
  FileJson, 
  Copy, 
  ChevronRight, 
  Search, 
  ExternalLink, 
  Check, 
  Play, 
  Clock, 
  Shield, 
  Zap, 
  Book, 
  Layers, 
  Activity,
  Menu,
  X,
  Globe,
  ArrowRight,
  Info,
  AlertCircle
} from 'lucide-react';
import { cn } from '../lib/utils';

// --- Types ---

interface Parameter {
  name: string;
  type: string;
  required: boolean;
  description: string;
}

interface Endpoint {
  id: string;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
  path: string;
  title: string;
  description: string;
  parameters?: Parameter[];
  responseSample: any;
  requestSamples: {
    curl: string;
    javascript: string;
    python: string;
  };
}

interface Section {
  id: string;
  title: string;
  endpoints: Endpoint[];
}

// --- Data ---

const SCHEMAS = [
  {
    id: 'policy-object',
    title: 'Policy Object',
    properties: [
      { name: 'id', type: 'string', description: 'Unique identifier for the policy' },
      { name: 'title', type: 'string', description: 'Full title of the policy document' },
      { name: 'agency_slug', type: 'string', description: 'Slug of the enacting agency' },
      { name: 'status', type: 'enum', description: 'One of: active, pending, archived' },
      { name: 'impact_level', type: 'enum', description: 'One of: beneficial, compliance, restrictive' }
    ]
  },
  {
    id: 'dataset-object',
    title: 'Dataset Object',
    properties: [
      { name: 'id', type: 'string', description: 'Unique identifier for the dataset' },
      { name: 'name', type: 'string', description: 'Display name of the dataset' },
      { name: 'frequency', type: 'string', description: 'Update frequency (e.g., Monthly, Quarterly)' },
      { name: 'last_updated', type: 'timestamp', description: 'ISO 8601 timestamp of last update' }
    ]
  }
];

const API_SECTIONS: Section[] = [
  {
    id: 'policies',
    title: 'Policies API',
    endpoints: [
      {
        id: 'get-policies',
        method: 'GET',
        path: '/v1/policies',
        title: 'List Policies',
        description: 'Retrieve a paginated list of all policy changes tracked by the observatory.',
        parameters: [
          { name: 'page', type: 'integer', required: false, description: 'Page number for pagination' },
          { name: 'limit', type: 'integer', required: false, description: 'Number of items per page (max 100)' },
          { name: 'sector', type: 'string', required: false, description: 'Filter by sector slug' }
        ],
        responseSample: {
          status: "success",
          data: [
            { id: "pol_123", title: "National Cybersecurity Policy 2024", sector: "Technology", date: "2024-03-15" }
          ],
          pagination: { total: 450, page: 1, limit: 10 }
        },
        requestSamples: {
          curl: `curl -X GET "https://api.data.gov.ng/v1/policies?limit=10" \\
  -H "Authorization: Bearer YOUR_API_KEY"`,
          javascript: `const response = await fetch('https://api.data.gov.ng/v1/policies?limit=10', {
  headers: { 'Authorization': 'Bearer YOUR_API_KEY' }
});
const data = await response.json();`,
          python: `import requests
response = requests.get(
    "https://api.data.gov.ng/v1/policies",
    params={"limit": 10},
    headers={"Authorization": "Bearer YOUR_API_KEY"}
)
print(response.json())`
        }
      },
      {
        id: 'get-policy-detail',
        method: 'GET',
        path: '/v1/policies/{policy_id}',
        title: 'Get Policy Detail',
        description: 'Retrieve full details of a specific policy by its ID.',
        responseSample: {
          status: "success",
          data: { id: "pol_123", title: "National Cybersecurity Policy 2024", content: "...", agency: "NCC" }
        },
        requestSamples: {
          curl: `curl -X GET "https://api.data.gov.ng/v1/policies/pol_123"`,
          javascript: `fetch('https://api.data.gov.ng/v1/policies/pol_123').then(r => r.json());`,
          python: `import requests\nrequests.get("https://api.data.gov.ng/v1/policies/pol_123").json()`
        }
      }
    ]
  },
  {
    id: 'datasets',
    title: 'Datasets API',
    endpoints: [
      {
        id: 'get-datasets',
        method: 'GET',
        path: '/v1/datasets',
        title: 'List Datasets',
        description: 'Access the catalog of public datasets available on the platform.',
        responseSample: {
          status: "success",
          data: [{ id: "ds_789", name: "Consumer Price Index", frequency: "Monthly" }]
        },
        requestSamples: {
          curl: `curl -X GET "https://api.data.gov.ng/v1/datasets"`,
          javascript: `fetch('https://api.data.gov.ng/v1/datasets').then(r => r.json());`,
          python: `import requests\nrequests.get("https://api.data.gov.ng/v1/datasets").json()`
        }
      },
      {
        id: 'get-dataset-series',
        method: 'GET',
        path: '/v1/datasets/{dataset_id}/series',
        title: 'Get Dataset Series',
        description: 'Retrieve time-series data points for a specific dataset.',
        responseSample: {
          dataset_id: "ds_789",
          series: [
            { date: "2024-01-01", value: 15.4 },
            { date: "2024-02-01", value: 16.2 }
          ]
        },
        requestSamples: {
          curl: `curl -X GET "https://api.data.gov.ng/v1/datasets/ds_789/series"`,
          javascript: `fetch('https://api.data.gov.ng/v1/datasets/ds_789/series').then(r => r.json());`,
          python: `import requests\nrequests.get("https://api.data.gov.ng/v1/datasets/ds_789/series").json()`
        }
      }
    ]
  },
  {
    id: 'indicators',
    title: 'Indicators API',
    endpoints: [
      {
        id: 'get-indicators',
        method: 'GET',
        path: '/v1/indicators',
        title: 'List Indicators',
        description: 'Get a list of all tracked national economic and social indicators.',
        responseSample: {
          data: [{ slug: "inflation-rate", name: "Inflation Rate", unit: "percentage" }]
        },
        requestSamples: {
          curl: `curl -X GET "https://api.data.gov.ng/v1/indicators"`,
          javascript: `fetch('https://api.data.gov.ng/v1/indicators').then(r => r.json());`,
          python: `import requests\nrequests.get("https://api.data.gov.ng/v1/indicators").json()`
        }
      }
    ]
  },
  {
    id: 'impact',
    title: 'Impact API',
    endpoints: [
      {
        id: 'get-impact-summary',
        method: 'GET',
        path: '/v1/impact/summary/{group_slug}',
        title: 'Impact Summary',
        description: 'Get a summarized impact analysis for a specific demographic or professional group.',
        responseSample: {
          group: "business-owner",
          summary: { total_active: 12, restrictive: 2, beneficial: 5 }
        },
        requestSamples: {
          curl: `curl -X GET "https://api.data.gov.ng/v1/impact/summary/business-owner"`,
          javascript: `fetch('https://api.data.gov.ng/v1/impact/summary/business-owner').then(r => r.json());`,
          python: `import requests\nrequests.get("https://api.data.gov.ng/v1/impact/summary/business-owner").json()`
        }
      }
    ]
  },
  {
    id: 'search',
    title: 'Search API',
    endpoints: [
      {
        id: 'search-all',
        method: 'GET',
        path: '/v1/search',
        title: 'Global Search',
        description: 'Search across policies, datasets, and agencies using a single query.',
        parameters: [
          { name: 'q', type: 'string', required: true, description: 'The search query string' }
        ],
        responseSample: {
          results: {
            policies: [],
            datasets: [{ id: "ds_1", name: "Inflation Rates" }],
            agencies: []
          }
        },
        requestSamples: {
          curl: `curl -X GET "https://api.data.gov.ng/v1/search?q=inflation"`,
          javascript: `fetch('https://api.data.gov.ng/v1/search?q=inflation').then(r => r.json());`,
          python: `import requests\nrequests.get("https://api.data.gov.ng/v1/search", params={"q": "inflation"}).json()`
        }
      }
    ]
  }
];

// --- Components ---

const SchemaCard = ({ schema }: { schema: any }) => (
  <div className="bg-white rounded-2xl border border-slate-200 card-shadow overflow-hidden mb-8">
    <div className="px-6 py-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
      <h4 className="text-sm font-bold text-primary">{schema.title}</h4>
      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Object Schema</span>
    </div>
    <div className="p-0">
      <table className="w-full text-left text-sm">
        <thead>
          <tr className="border-b border-slate-100">
            <th className="px-6 py-3 text-xs font-bold text-slate-400 uppercase tracking-wider">Property</th>
            <th className="px-6 py-3 text-xs font-bold text-slate-400 uppercase tracking-wider">Type</th>
            <th className="px-6 py-3 text-xs font-bold text-slate-400 uppercase tracking-wider">Description</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-50">
          {schema.properties.map((prop: any) => (
            <tr key={prop.name} className="hover:bg-slate-50/50 transition-colors">
              <td className="px-6 py-4 font-mono text-xs text-accent font-bold">{prop.name}</td>
              <td className="px-6 py-4 text-xs text-slate-500 italic">{prop.type}</td>
              <td className="px-6 py-4 text-slate-600 leading-relaxed">{prop.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

const StatusBadge = () => (
  <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-100">
    <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
    <span className="text-[10px] font-bold text-emerald-700 uppercase tracking-wider">API Status: Healthy</span>
  </div>
);

const VersionBadge = () => (
  <div className="px-2 py-0.5 rounded bg-slate-100 border border-slate-200 text-[10px] font-bold text-slate-600 uppercase">
    v1.0.0
  </div>
);

const ParameterTable = ({ parameters }: { parameters: Parameter[] }) => (
  <div className="my-6 overflow-hidden border border-slate-200 rounded-xl">
    <table className="w-full text-left text-sm border-collapse">
      <thead>
        <tr className="bg-slate-50 border-b border-slate-200">
          <th className="px-4 py-3 font-bold text-primary">Parameter</th>
          <th className="px-4 py-3 font-bold text-primary">Type</th>
          <th className="px-4 py-3 font-bold text-primary">Required</th>
          <th className="px-4 py-3 font-bold text-primary">Description</th>
        </tr>
      </thead>
      <tbody className="divide-y divide-slate-100">
        {parameters.map((param) => (
          <tr key={param.name} className="hover:bg-slate-50/50 transition-colors">
            <td className="px-4 py-3 font-mono text-xs text-accent font-bold">{param.name}</td>
            <td className="px-4 py-3 text-slate-500 text-xs italic">{param.type}</td>
            <td className="px-4 py-3">
              {param.required ? (
                <span className="text-[10px] font-bold text-red-500 uppercase">Required</span>
              ) : (
                <span className="text-[10px] font-bold text-slate-400 uppercase">Optional</span>
              )}
            </td>
            <td className="px-4 py-3 text-slate-600 leading-relaxed">{param.description}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

const CodeBlock = ({ code, language }: { code: string, language: string }) => {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative group">
      <button 
        onClick={copyToClipboard}
        className="absolute top-3 right-3 p-2 rounded-lg bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-all opacity-0 group-hover:opacity-100"
      >
        {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
      </button>
      <pre className="bg-slate-900 p-6 rounded-xl overflow-x-auto text-sm font-mono text-slate-300 leading-relaxed scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-transparent">
        <code>{code}</code>
      </pre>
    </div>
  );
};

const JsonResponseCard = ({ data }: { data: any }) => (
  <div className="bg-slate-900 rounded-xl border border-slate-800 overflow-hidden">
    <div className="px-4 py-2 bg-slate-800/50 border-b border-slate-800 flex items-center justify-between">
      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Response Body</span>
      <div className="flex gap-1.5">
        <div className="w-2 h-2 rounded-full bg-slate-700" />
        <div className="w-2 h-2 rounded-full bg-slate-700" />
        <div className="w-2 h-2 rounded-full bg-slate-700" />
      </div>
    </div>
    <div className="p-6">
      <pre className="text-xs font-mono text-emerald-400 leading-relaxed">
        <code>{JSON.stringify(data, null, 2)}</code>
      </pre>
    </div>
  </div>
);

const EndpointBlock = ({ endpoint, activeLang }: { endpoint: Endpoint, activeLang: 'curl' | 'javascript' | 'python', key?: string }) => (
  <div id={endpoint.id} className="py-16 first:pt-0 border-b border-slate-100 last:border-0">
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
      <div className="space-y-6">
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <span className={cn(
              "px-2 py-1 rounded text-[10px] font-black uppercase tracking-tighter",
              endpoint.method === 'GET' ? "bg-blue-100 text-blue-700" : "bg-emerald-100 text-emerald-700"
            )}>
              {endpoint.method}
            </span>
            <code className="text-sm font-mono text-slate-500">{endpoint.path}</code>
          </div>
          <h3 className="text-2xl font-bold text-primary">{endpoint.title}</h3>
          <p className="text-slate-600 leading-relaxed">{endpoint.description}</p>
        </div>

        {endpoint.parameters && (
          <div>
            <h4 className="text-xs font-bold text-primary uppercase tracking-widest mb-4">Query Parameters</h4>
            <ParameterTable parameters={endpoint.parameters} />
          </div>
        )}

        <div className="pt-4">
          <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-white text-sm font-bold hover:bg-primary/90 transition-all">
            <Play className="w-4 h-4 fill-current" />
            Try Request
          </button>
        </div>
      </div>

      <div className="space-y-6">
        <div>
          <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Sample Request</h4>
          <CodeBlock code={endpoint.requestSamples[activeLang]} language={activeLang} />
        </div>
        <div>
          <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Example Response</h4>
          <JsonResponseCard data={endpoint.responseSample} />
        </div>
      </div>
    </div>
  </div>
);

const QuickStartCard = ({ icon: Icon, title, description, link }: any) => (
  <div className="p-6 bg-white rounded-2xl border border-slate-200 card-shadow hover:border-accent transition-all group cursor-pointer">
    <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center mb-4 group-hover:bg-accent/5 transition-colors">
      <Icon className="w-5 h-5 text-accent" />
    </div>
    <h3 className="text-base font-bold text-primary mb-2">{title}</h3>
    <p className="text-sm text-slate-500 leading-relaxed mb-4">{description}</p>
    <div className="flex items-center text-xs font-bold text-accent">
      Read Guide <ArrowRight className="w-3 h-3 ml-1 group-hover:ml-2 transition-all" />
    </div>
  </div>
);

const ResourceCard = ({ title, description, endpoint }: any) => (
  <div className="p-6 bg-white rounded-2xl border border-slate-200 card-shadow hover:border-slate-300 transition-all group">
    <h3 className="text-base font-bold text-primary mb-2">{title}</h3>
    <p className="text-sm text-slate-500 leading-relaxed mb-4">{description}</p>
    <div className="p-3 bg-slate-50 rounded-lg border border-slate-100 font-mono text-[10px] text-slate-400 group-hover:text-accent transition-colors">
      GET {endpoint}
    </div>
  </div>
);

// --- Main Page ---

export function DeveloperHub() {
  const [activeLang, setActiveLang] = useState<'curl' | 'javascript' | 'python'>('curl');
  const [activeSection, setActiveSection] = useState('overview');

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['overview', 'quick-start', ...API_SECTIONS.map(s => s.id)];
      const current = sections.find(id => {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          return rect.top >= 0 && rect.top <= 200;
        }
        return false;
      });
      if (current) setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* 3-Column Layout Container */}
      <div className="max-w-[1600px] mx-auto flex">
        
        {/* Left Sidebar - Navigation */}
        <aside className="hidden xl:block w-64 sticky top-16 h-[calc(100vh-64px)] border-r border-slate-100 overflow-y-auto p-8 scrollbar-hide">
          <div className="space-y-8">
            <div>
              <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4">Introduction</h4>
              <nav className="space-y-1">
                {['Overview', 'Quick Start', 'Authentication', 'Base URL', 'Rate Limits'].map(item => (
                  <button 
                    key={item}
                    onClick={() => scrollTo(item.toLowerCase().replace(' ', '-'))}
                    className={cn(
                      "w-full text-left px-3 py-1.5 rounded-lg text-sm transition-all",
                      activeSection === item.toLowerCase().replace(' ', '-') 
                        ? "bg-slate-50 text-primary font-bold" 
                        : "text-slate-500 hover:text-primary hover:bg-slate-50/50"
                    )}
                  >
                    {item}
                  </button>
                ))}
              </nav>
            </div>

            <div>
              <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4">APIs</h4>
              <nav className="space-y-1">
                {API_SECTIONS.map(section => (
                  <div key={section.id} className="space-y-1">
                    <button 
                      onClick={() => scrollTo(section.id)}
                      className={cn(
                        "w-full text-left px-3 py-1.5 rounded-lg text-sm transition-all",
                        activeSection === section.id 
                          ? "bg-slate-50 text-primary font-bold" 
                          : "text-slate-500 hover:text-primary hover:bg-slate-50/50"
                      )}
                    >
                      {section.title}
                    </button>
                    {activeSection === section.id && (
                      <div className="ml-4 pl-3 border-l border-slate-100 space-y-1">
                        {section.endpoints.map(ep => (
                          <button 
                            key={ep.id}
                            onClick={() => scrollTo(ep.id)}
                            className="w-full text-left py-1 text-xs text-slate-400 hover:text-primary transition-colors"
                          >
                            {ep.title}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </nav>
            </div>

            <div>
              <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4">Schemas</h4>
              <nav className="space-y-1">
                {SCHEMAS.map(schema => (
                  <button 
                    key={schema.id}
                    onClick={() => scrollTo(schema.id)}
                    className={cn(
                      "w-full text-left px-3 py-1.5 rounded-lg text-sm transition-all",
                      activeSection === schema.id 
                        ? "bg-slate-50 text-primary font-bold" 
                        : "text-slate-500 hover:text-primary hover:bg-slate-50/50"
                    )}
                  >
                    {schema.title}
                  </button>
                ))}
              </nav>
            </div>

            <div>
              <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4">Resources</h4>
              <nav className="space-y-1">
                {['Errors', 'SDKs', 'Changelog'].map(item => (
                  <button 
                    key={item}
                    className="w-full text-left px-3 py-1.5 rounded-lg text-sm text-slate-500 hover:text-primary hover:bg-slate-50/50 transition-all"
                  >
                    {item}
                  </button>
                ))}
              </nav>
            </div>
          </div>
        </aside>

        {/* Center Content */}
        <main className="flex-grow min-w-0 px-6 lg:px-12 py-12">
          {/* Hero Section */}
          <section id="overview" className="mb-20">
            <div className="flex items-center gap-4 mb-6">
              <VersionBadge />
              <StatusBadge />
            </div>
            <h1 className="text-5xl font-bold text-primary mb-6 tracking-tight">Developer API</h1>
            <p className="text-xl text-slate-600 max-w-2xl leading-relaxed mb-8">
              Access Nigerian policy intelligence and public datasets programmatically. Build tools that promote transparency and data-driven governance.
            </p>
            <div className="flex flex-wrap gap-4">
              <button className="px-6 py-3 bg-primary text-white font-bold rounded-xl hover:bg-primary/90 transition-all shadow-lg shadow-primary/10">
                Get API Key
              </button>
              <button className="px-6 py-3 bg-white border border-slate-200 text-primary font-bold rounded-xl hover:border-slate-300 transition-all">
                View API Reference
              </button>
            </div>
          </section>

          {/* Quick Start */}
          <section id="quick-start" className="mb-20 scroll-mt-20">
            <h2 className="text-3xl font-bold text-primary mb-8">Quick Start</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              <QuickStartCard 
                icon={Shield}
                title="Authenticate"
                description="Learn how to use your API key to authenticate requests."
              />
              <QuickStartCard 
                icon={Zap}
                title="First Request"
                description="Make your first API call in less than 60 seconds."
              />
              <QuickStartCard 
                icon={Layers}
                title="Core Resources"
                description="Explore the fundamental data models of our platform."
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <ResourceCard title="Policies API" description="Track national policy changes." endpoint="/v1/policies/latest" />
              <ResourceCard title="Datasets API" description="Access public time-series data." endpoint="/v1/datasets" />
              <ResourceCard title="Indicators API" description="Real-time economic indicators." endpoint="/v1/indicators" />
              <ResourceCard title="Agencies API" description="Directory of government bodies." endpoint="/v1/agencies" />
              <ResourceCard title="Impact API" description="Policy impact analysis data." endpoint="/v1/impact/summary" />
              <ResourceCard title="Search API" description="Global cross-resource search." endpoint="/v1/search" />
            </div>
          </section>

          {/* API Sections */}
          {API_SECTIONS.map(section => (
            <section key={section.id} id={section.id} className="scroll-mt-20">
              <div className="flex items-center gap-4 mb-8">
                <h2 className="text-3xl font-bold text-primary">{section.title}</h2>
                <div className="h-px flex-grow bg-slate-100" />
              </div>
              <div className="space-y-0">
                {section.endpoints.map(ep => (
                  <EndpointBlock key={ep.id} endpoint={ep} activeLang={activeLang as 'curl' | 'javascript' | 'python'} />
                ))}
              </div>
            </section>
          ))}

          {/* Schemas Section */}
          <section id="schemas" className="mt-20 scroll-mt-20">
            <div className="flex items-center gap-4 mb-8">
              <h2 className="text-3xl font-bold text-primary">Data Schemas</h2>
              <div className="h-px flex-grow bg-slate-100" />
            </div>
            <p className="text-slate-600 mb-12 max-w-2xl leading-relaxed">
              Understand the structure of the objects returned by our API. Use these definitions to build robust integrations and type-safe clients.
            </p>
            <div className="space-y-12">
              {SCHEMAS.map(schema => (
                <div key={schema.id} id={schema.id} className="scroll-mt-20">
                  <SchemaCard schema={schema} />
                </div>
              ))}
            </div>
          </section>
        </main>

        {/* Right Sidebar - Utilities */}
        <aside className="hidden lg:block w-80 sticky top-16 h-[calc(100vh-64px)] p-8 border-l border-slate-100 overflow-y-auto scrollbar-hide">
          <div className="space-y-10">
            {/* Language Selector */}
            <div>
              <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4">Request Language</h4>
              <div className="p-1 bg-slate-50 rounded-xl border border-slate-200 flex gap-1">
                {(['curl', 'javascript', 'python'] as const).map(lang => (
                  <button 
                    key={lang}
                    onClick={() => setActiveLang(lang)}
                    className={cn(
                      "flex-grow py-2 rounded-lg text-[10px] font-bold uppercase transition-all",
                      activeLang === lang 
                        ? "bg-white text-primary shadow-sm border border-slate-200" 
                        : "text-slate-400 hover:text-slate-600"
                    )}
                  >
                    {lang}
                  </button>
                ))}
              </div>
            </div>

            {/* On This Page */}
            <div>
              <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4">On This Page</h4>
              <nav className="space-y-3">
                <button onClick={() => scrollTo('overview')} className="block text-xs text-slate-500 hover:text-accent transition-colors">Overview</button>
                <button onClick={() => scrollTo('quick-start')} className="block text-xs text-slate-500 hover:text-accent transition-colors">Quick Start</button>
                {API_SECTIONS.map(s => (
                  <div key={s.id} className="space-y-2">
                    <button onClick={() => scrollTo(s.id)} className="block text-xs font-bold text-primary hover:text-accent transition-colors">{s.title}</button>
                    <div className="pl-3 space-y-2">
                      {s.endpoints.map(ep => (
                        <button key={ep.id} onClick={() => scrollTo(ep.id)} className="block text-[10px] text-slate-400 hover:text-accent transition-colors">{ep.title}</button>
                      ))}
                    </div>
                  </div>
                ))}
                <div className="pt-2 border-t border-slate-100">
                  <button onClick={() => scrollTo('schemas')} className="block text-xs font-bold text-primary hover:text-accent transition-colors mb-2">Data Schemas</button>
                  <div className="pl-3 space-y-2">
                    {SCHEMAS.map(schema => (
                      <button key={schema.id} onClick={() => scrollTo(schema.id)} className="block text-[10px] text-slate-400 hover:text-accent transition-colors">{schema.title}</button>
                    ))}
                  </div>
                </div>
              </nav>
            </div>

            {/* Playground Preview */}
            <div className="p-6 bg-slate-900 rounded-2xl border border-slate-800 shadow-2xl">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-2 h-2 rounded-full bg-emerald-500" />
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Live Playground</span>
              </div>
              <p className="text-xs text-slate-500 leading-relaxed mb-6">
                Test API calls directly from your browser. No setup required.
              </p>
              <button className="w-full py-3 bg-white/10 text-white text-xs font-bold rounded-xl hover:bg-white/20 transition-all flex items-center justify-center gap-2">
                <Play className="w-3 h-3 fill-current" />
                Open Playground
              </button>
            </div>

            {/* Support */}
            <div className="p-6 bg-blue-50 rounded-2xl border border-blue-100">
              <h4 className="text-xs font-bold text-blue-900 mb-2">Need Help?</h4>
              <p className="text-[11px] text-blue-700 leading-relaxed mb-4">
                Our developer support team is available for integration assistance.
              </p>
              <button className="text-[10px] font-bold text-blue-900 hover:underline flex items-center gap-1">
                Contact Support <ExternalLink className="w-3 h-3" />
              </button>
            </div>
          </div>
        </aside>

      </div>
    </div>
  );
}
