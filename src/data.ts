export interface Policy {
  id: string;
  title: string;
  agency: string;
  agencyLogo?: string;
  category: string;
  affectedGroups: string[];
  impactLevel: 'High' | 'Medium' | 'Low';
  type: 'beneficial' | 'compliance' | 'restrictive';
  date: string;
  summary: string;
  whatChanged: string[];
  whoIsAffected: string[];
  whatToDo: string[];
  timeline: { date: string; event: string }[];
  sources: { title: string; url: string }[];
}

export interface Dataset {
  id: string;
  title: string;
  category: string;
  source: string;
  frequency: string;
  description: string;
  data: { year: number; value: number }[];
}

export interface Agency {
  id: string;
  name: string;
  logo: string;
  description: string;
  sector: string;
  policyCount: number;
  datasetCount: number;
  recentUpdates: number;
  founded: string;
  headquarters: string;
  website: string;
  jurisdiction: string;
  overview: string;
  regulatoryScope: string[];
  impactDistribution: { group: string; value: number }[];
  relatedAgencies: string[];
  sources: { title: string; type: string; url: string }[];
}

export const POLICIES: Policy[] = [
  {
    id: 'p1',
    title: 'New Student Loan Act Implementation',
    agency: 'Federal Ministry of Education',
    category: 'Education',
    affectedGroups: ['Students', 'Civil Servants'],
    impactLevel: 'High',
    type: 'beneficial',
    date: '2024-03-15',
    summary: 'The Federal Government has commenced the implementation of the Student Loan Act, providing interest-free loans to indigent students in tertiary institutions.',
    whatChanged: [
      'Establishment of the Nigerian Education Loan Fund (NELFUND).',
      'Removal of income-based barriers for loan eligibility.',
      'Introduction of a structured repayment plan starting two years after NYSC.'
    ],
    whoIsAffected: [
      'Students in public tertiary institutions.',
      'Parents and guardians of eligible students.',
      'Employers of labor (for repayment deductions).'
    ],
    whatToDo: [
      'Register on the NELFUND portal.',
      'Provide NIN and BVN for verification.',
      'Submit admission letter and institution details.'
    ],
    timeline: [
      { date: '2023-06-12', event: 'Student Loan Act signed into law.' },
      { date: '2024-03-15', event: 'NELFUND portal launch.' },
      { date: '2024-05-01', event: 'First batch of disbursements.' }
    ],
    sources: [
      { title: 'Official Gazette - Student Loan Act', url: '#' },
      { title: 'NELFUND Implementation Guidelines', url: '#' }
    ]
  },
  {
    id: 'p2',
    title: 'Revised Import Duties on Renewable Energy Equipment',
    agency: 'Nigeria Customs Service',
    category: 'Trade',
    affectedGroups: ['Importers', 'Business Owners'],
    impactLevel: 'Medium',
    type: 'beneficial',
    date: '2024-02-10',
    summary: 'Reduction in import tariffs for solar panels and deep-cycle batteries to encourage green energy adoption.',
    whatChanged: [
      'Tariff reduced from 20% to 5% for certified solar components.',
      'Simplified clearance process for renewable energy tech.'
    ],
    whoIsAffected: [
      'Solar energy installers.',
      'General importers of electrical goods.',
      'Small businesses looking to reduce energy costs.'
    ],
    whatToDo: [
      'Ensure equipment meets SON standards.',
      'Apply for the reduced tariff code during declaration.'
    ],
    timeline: [
      { date: '2024-01-05', event: 'Policy announcement by Ministry of Finance.' },
      { date: '2024-02-10', event: 'Customs implementation begins.' }
    ],
    sources: [
      { title: 'Customs Circular 2024/012', url: '#' }
    ]
  },
  {
    id: 'p3',
    title: 'National Cybersecurity Levy',
    agency: 'Central Bank of Nigeria',
    category: 'Economy',
    affectedGroups: ['Business Owners', 'Developers'],
    impactLevel: 'Medium',
    type: 'compliance',
    date: '2024-05-06',
    summary: 'Introduction of a 0.5% levy on electronic transactions to fund the National Cybersecurity Fund.',
    whatChanged: [
      '0.5% deduction on specified electronic transfers.',
      'Funds directed to the Office of the National Security Adviser.'
    ],
    whoIsAffected: [
      'Banking customers.',
      'Fintech companies.',
      'Corporate entities.'
    ],
    whatToDo: [
      'Review transaction costs for business operations.',
      'Update accounting software to reflect new levy.'
    ],
    timeline: [
      { date: '2024-05-06', event: 'CBN circular issued.' },
      { date: '2024-05-20', event: 'Scheduled commencement.' }
    ],
    sources: [
      { title: 'CBN Circular PSM/DIR/PUB/001/022', url: '#' }
    ]
  },
  {
    id: 'p4',
    title: 'New Minimum Wage Act 2024',
    agency: 'Federal Ministry of Labour',
    category: 'Labour',
    affectedGroups: ['Civil Servants', 'Business Owners'],
    impactLevel: 'High',
    type: 'beneficial',
    date: '2024-07-29',
    summary: 'The President signed the new Minimum Wage Bill into law, increasing the national minimum wage to ₦70,000.',
    whatChanged: [
      'Minimum wage increased from ₦30,000 to ₦70,000.',
      'Review period shortened to 3 years.'
    ],
    whoIsAffected: ['All Nigerian workers', 'Private sector employers'],
    whatToDo: ['Employers to adjust payroll systems.'],
    timeline: [{ date: '2024-07-29', event: 'Bill signed into law.' }],
    sources: [{ title: 'Official Gazette', url: '#' }]
  },
  {
    id: 'p5',
    title: 'Ban on Single-Use Plastics',
    agency: 'Lagos State Ministry of Environment',
    category: 'Environment',
    affectedGroups: ['Business Owners', 'Importers'],
    impactLevel: 'Medium',
    type: 'restrictive',
    date: '2024-01-21',
    summary: 'Ban on the usage and distribution of Styrofoam and other single-use plastics in Lagos State.',
    whatChanged: ['Immediate ban on Styrofoam distribution.'],
    whoIsAffected: ['Food vendors', 'Plastic manufacturers'],
    whatToDo: ['Switch to biodegradable alternatives.'],
    timeline: [{ date: '2024-01-21', event: 'Policy announcement.' }],
    sources: [{ title: 'Lagos State Government Press Release', url: '#' }]
  },
  {
    id: 'p6',
    title: 'Mandatory NIN-SIM Linkage Enforcement',
    agency: 'Nigerian Communications Commission',
    category: 'Infrastructure',
    affectedGroups: ['Telecom Subscribers', 'Developers'],
    impactLevel: 'High',
    type: 'compliance',
    date: '2024-02-28',
    summary: 'Final deadline for linking National Identification Numbers (NIN) with SIM cards.',
    whatChanged: ['Disconnection of unlinked SIM cards.'],
    whoIsAffected: ['Mobile phone users'],
    whatToDo: ['Visit telecom provider to link NIN.'],
    timeline: [{ date: '2024-02-28', event: 'Enforcement deadline.' }],
    sources: [{ title: 'NCC Regulatory Update', url: '#' }]
  }
];

export const DATASETS: Dataset[] = [
  {
    id: 'd1',
    title: 'Inflation Rate (CPI)',
    category: 'Economy',
    source: 'National Bureau of Statistics',
    frequency: 'Monthly',
    description: 'The Consumer Price Index (CPI) measures the average change over time in the prices paid by urban consumers for a market basket of consumer goods and services.',
    data: [
      { year: 2019, value: 11.4 },
      { year: 2020, value: 13.2 },
      { year: 2021, value: 16.9 },
      { year: 2022, value: 18.8 },
      { year: 2023, value: 24.5 },
      { year: 2024, value: 31.7 }
    ]
  },
  {
    id: 'unemployment',
    title: 'Unemployment Rate',
    category: 'Economy',
    source: 'National Bureau of Statistics',
    frequency: 'Quarterly',
    description: 'The percentage of the total labor force that is jobless and actively seeking employment.',
    data: [
      { year: 2020, value: 27.1 },
      { year: 2021, value: 33.3 },
      { year: 2022, value: 5.3 },
      { year: 2023, value: 5.0 }
    ]
  },
  {
    id: 'population',
    title: 'Population Growth Rate',
    category: 'Demographics',
    source: 'World Bank',
    frequency: 'Annual',
    description: 'Annual percentage growth rate of the population based on constant local currency.',
    data: [
      { year: 2019, value: 2.6 },
      { year: 2020, value: 2.5 },
      { year: 2021, value: 2.5 },
      { year: 2022, value: 2.4 },
      { year: 2023, value: 2.4 }
    ]
  },
  {
    id: 'd2',
    title: 'Internet Penetration Rate',
    category: 'Infrastructure',
    source: 'Nigerian Communications Commission',
    frequency: 'Quarterly',
    description: 'Percentage of the population with access to the internet through mobile or fixed broadband.',
    data: [
      { year: 2019, value: 32.1 },
      { year: 2020, value: 35.4 },
      { year: 2021, value: 39.8 },
      { year: 2022, value: 43.2 },
      { year: 2023, value: 47.5 },
      { year: 2024, value: 51.2 }
    ]
  },
  {
    id: 'electricity',
    title: 'Electricity Access Rate',
    category: 'Infrastructure',
    source: 'World Bank',
    frequency: 'Annual',
    description: 'Percentage of the population with access to electricity.',
    data: [
      { year: 2019, value: 55.4 },
      { year: 2020, value: 56.2 },
      { year: 2021, value: 57.8 },
      { year: 2022, value: 58.9 },
      { year: 2023, value: 59.5 }
    ]
  },
  {
    id: 'food-index',
    title: 'Food Price Index',
    category: 'Economy',
    source: 'National Bureau of Statistics',
    frequency: 'Monthly',
    description: 'Measure of the monthly change in international prices of a basket of food commodities.',
    data: [
      { year: 2020, value: 15.4 },
      { year: 2021, value: 20.2 },
      { year: 2022, value: 23.7 },
      { year: 2023, value: 30.6 },
      { year: 2024, value: 37.9 }
    ]
  },
  {
    id: 'd3',
    title: 'GDP Growth Rate',
    category: 'Economy',
    source: 'National Bureau of Statistics',
    frequency: 'Quarterly',
    description: 'The annual percentage growth rate of GDP at market prices based on constant local currency.',
    data: [
      { year: 2019, value: 2.27 },
      { year: 2020, value: -1.92 },
      { year: 2021, value: 3.40 },
      { year: 2022, value: 3.10 },
      { year: 2023, value: 2.74 },
      { year: 2024, value: 2.98 }
    ]
  },
  {
    id: 'fx-reserves',
    title: 'Foreign Exchange Reserves',
    category: 'Economy',
    source: 'Central Bank of Nigeria',
    frequency: 'Monthly',
    description: 'Assets held on reserve by a central bank in foreign currencies.',
    data: [
      { year: 2020, value: 35.3 },
      { year: 2021, value: 40.5 },
      { year: 2022, value: 37.1 },
      { year: 2023, value: 33.2 },
      { year: 2024, value: 34.4 }
    ]
  }
];

export const AGENCIES: Agency[] = [
  {
    id: 'a1',
    name: 'National Bureau of Statistics',
    logo: 'https://picsum.photos/seed/nbs/100/100',
    description: 'The main National Agency responsible for the development and management of official statistics.',
    sector: 'Economy',
    policyCount: 12,
    datasetCount: 8,
    recentUpdates: 2,
    founded: '1947',
    headquarters: 'Abuja, Nigeria',
    website: 'https://nigerianstat.gov.ng',
    jurisdiction: 'National',
    overview: 'The National Bureau of Statistics (NBS) is the main coordinator of the National Statistical System (NSS) in Nigeria. It is responsible for the collection, compilation, analysis, interpretation, and dissemination of statistical information relating to the socio-economic activities and conditions of the people of Nigeria.',
    regulatoryScope: ['Statistics Management', 'Data Coordination', 'Economic Research'],
    impactDistribution: [
      { group: 'Businesses', value: 85 },
      { group: 'Students', value: 90 },
      { group: 'Importers', value: 45 },
      { group: 'Telecom Users', value: 30 },
      { group: 'Drivers', value: 20 }
    ],
    relatedAgencies: ['a2'],
    sources: [
      { title: 'Official NBS Website', type: 'Website', url: '#' },
      { title: 'NBS Data Portal', type: 'Portal', url: '#' },
      { title: 'Annual Statistical Report 2023', type: 'Gazette', url: '#' }
    ]
  },
  {
    id: 'a2',
    name: 'Central Bank of Nigeria',
    logo: 'https://picsum.photos/seed/cbn/100/100',
    description: 'The apex monetary authority of Nigeria regulating banking and currency.',
    sector: 'Finance',
    policyCount: 45,
    datasetCount: 23,
    recentUpdates: 3,
    founded: '1958',
    headquarters: 'Abuja, Nigeria',
    website: 'https://cbn.gov.ng',
    jurisdiction: 'National',
    overview: 'The Central Bank of Nigeria (CBN) is the central bank and apex monetary authority of Nigeria. It was established by the CBN Act of 1958 and commenced operations on July 1, 1959. The major regulatory objectives of the bank as stated in the CBN Act are to: maintain the external reserves of the country, promote monetary stability and a sound financial system, and act as a banker of last resort and financial adviser to the federal government.',
    regulatoryScope: ['Monetary Policy', 'Banking Supervision', 'Foreign Exchange Management', 'Financial Stability'],
    impactDistribution: [
      { group: 'Businesses', value: 95 },
      { group: 'Students', value: 40 },
      { group: 'Importers', value: 98 },
      { group: 'Telecom Users', value: 60 },
      { group: 'Drivers', value: 50 }
    ],
    relatedAgencies: ['a1'],
    sources: [
      { title: 'CBN Official Website', type: 'Website', url: '#' },
      { title: 'CBN Monetary Policy Communiqués', type: 'Press Release', url: '#' },
      { title: 'Banking Supervision Reports', type: 'Report', url: '#' }
    ]
  },
  {
    id: 'a3',
    name: 'Nigerian Communications Commission',
    logo: 'https://picsum.photos/seed/ncc/100/100',
    description: 'The independent regulatory authority for the telecommunications industry in Nigeria.',
    sector: 'Telecom',
    policyCount: 8,
    datasetCount: 5,
    recentUpdates: 1,
    founded: '1992',
    headquarters: 'Abuja, Nigeria',
    website: 'https://ncc.gov.ng',
    jurisdiction: 'National',
    overview: 'The Nigerian Communications Commission (NCC) is the independent regulatory authority for the telecommunications industry in Nigeria. The Commission was established under Decree number 75 by the Federal Military Government of Nigeria on 24 November 1992. The NCC is responsible for creating an enabling environment for competition among operators in the industry as well as ensuring the provision of qualitative and efficient telecommunications services throughout the country.',
    regulatoryScope: ['Telecom Regulation', 'Spectrum Management', 'Consumer Protection'],
    impactDistribution: [
      { group: 'Businesses', value: 70 },
      { group: 'Students', value: 65 },
      { group: 'Importers', value: 40 },
      { group: 'Telecom Users', value: 100 },
      { group: 'Drivers', value: 30 }
    ],
    relatedAgencies: ['a1'],
    sources: [
      { title: 'NCC Official Website', type: 'Website', url: '#' },
      { title: 'Telecom Industry Reports', type: 'Report', url: '#' },
      { title: 'NCC Social Media', type: 'Social Media', url: '#' }
    ]
  }
];

export interface SnapshotItem {
  id: string;
  label: string;
  value: string;
  trend: 'up' | 'down' | 'neutral';
  source: string;
  lastUpdated: string;
  history: { date: string; value: number }[];
}

export const SNAPSHOT: SnapshotItem[] = [
  { 
    id: 'd1',
    label: 'Inflation Rate', 
    value: '31.7%', 
    trend: 'up', 
    source: 'NBS',
    lastUpdated: 'Feb 2024',
    history: [
      { date: '2023-09', value: 26.7 },
      { date: '2023-10', value: 27.3 },
      { date: '2023-11', value: 28.2 },
      { date: '2023-12', value: 28.9 },
      { date: '2024-01', value: 29.9 },
      { date: '2024-02', value: 31.7 },
    ]
  },
  { 
    id: 'unemployment',
    label: 'Unemployment Rate', 
    value: '5.0%', 
    trend: 'down', 
    source: 'NBS',
    lastUpdated: 'Q3 2023',
    history: [
      { date: '2022-Q4', value: 5.3 },
      { date: '2023-Q1', value: 5.1 },
      { date: '2023-Q2', value: 5.2 },
      { date: '2023-Q3', value: 5.0 },
    ]
  },
  { 
    id: 'population',
    label: 'Population Growth', 
    value: '2.4%', 
    trend: 'up', 
    source: 'World Bank',
    lastUpdated: '2023',
    history: [
      { date: '2019', value: 2.6 },
      { date: '2020', value: 2.5 },
      { date: '2021', value: 2.5 },
      { date: '2022', value: 2.4 },
      { date: '2023', value: 2.4 },
    ]
  },
  { 
    id: 'd2',
    label: 'Internet Penetration', 
    value: '51.2%', 
    trend: 'up', 
    source: 'NCC',
    lastUpdated: 'Jan 2024',
    history: [
      { date: '2023-08', value: 48.2 },
      { date: '2023-09', value: 48.9 },
      { date: '2023-10', value: 49.5 },
      { date: '2023-11', value: 50.1 },
      { date: '2023-12', value: 50.8 },
      { date: '2024-01', value: 51.2 },
    ]
  },
  { 
    id: 'electricity',
    label: 'Electricity Access', 
    value: '59.5%', 
    trend: 'up', 
    source: 'World Bank',
    lastUpdated: '2023',
    history: [
      { date: '2019', value: 55.4 },
      { date: '2020', value: 56.2 },
      { date: '2021', value: 57.8 },
      { date: '2022', value: 58.9 },
      { date: '2023', value: 59.5 },
    ]
  },
  { 
    id: 'food-index',
    label: 'Food Price Index', 
    value: '37.9%', 
    trend: 'up', 
    source: 'NBS',
    lastUpdated: 'Feb 2024',
    history: [
      { date: '2023-09', value: 30.6 },
      { date: '2023-10', value: 31.5 },
      { date: '2023-11', value: 32.8 },
      { date: '2023-12', value: 33.9 },
      { date: '2024-01', value: 35.4 },
      { date: '2024-02', value: 37.9 },
    ]
  },
  { 
    id: 'd3',
    label: 'GDP Growth', 
    value: '2.98%', 
    trend: 'up', 
    source: 'NBS',
    lastUpdated: 'Q4 2023',
    history: [
      { date: '2022-Q4', value: 3.52 },
      { date: '2023-Q1', value: 2.31 },
      { date: '2023-Q2', value: 2.51 },
      { date: '2023-Q3', value: 2.54 },
      { date: '2023-Q4', value: 2.98 },
    ]
  },
  { 
    id: 'fx-reserves',
    label: 'FX Reserves', 
    value: '$34.4B', 
    trend: 'down', 
    source: 'CBN',
    lastUpdated: 'Mar 2024',
    history: [
      { date: '2023-10', value: 33.2 },
      { date: '2023-11', value: 33.0 },
      { date: '2023-12', value: 32.9 },
      { date: '2024-01', value: 33.4 },
      { date: '2024-02', value: 34.1 },
      { date: '2024-03', value: 34.4 },
    ]
  },
];

export const PERSONAS = [
  'Student',
  'Business Owner',
  'Importer',
  'Driver',
  'Startup Founder',
  'Developer',
  'Civil Servant'
];
