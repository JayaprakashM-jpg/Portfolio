import { PortfolioData } from '../types';

export const initialPortfolioData: PortfolioData = {
  profile: {
    name: 'Jayaprakash M',
    title: 'Computer Science Engineering Student',
    tagline: 'Aspiring Software Engineer & Data Analyst',
    location: 'Kanniyakumari, Tamil Nadu, India',
    email: 'mprakash102006@gmail.com',
    phone: '+91 9342465277',
    avatarUrl: '/images/profile_jayaprakash_portrait_1793369527676.jpg',
    github: 'https://github.com/JayaprakashM-jpg',
    linkedin: 'https://linkedin.com/in/jayaprakash-m',
    socialLinks: {
      github: 'https://github.com/JayaprakashM-jpg',
      linkedin: 'https://linkedin.com/in/jayaprakash-m',
      instagram: 'https://instagram.com/jayaprakash_m',
      twitter: 'https://x.com/jayaprakash_m',
      leetcode: 'https://leetcode.com/u/jayaprakash_m',
      kaggle: 'https://kaggle.com/jayaprakashm',
    },
    resumeUrl: '/public/assets/aistudio/Jayaprakash_M_Resume_f37f051d.pdf',
    summary:
      'Final-year B.E. Computer Science and Engineering student with hands-on experience building end-to-end applications spanning machine learning, web development, and data analytics. Completed a remote Data Analyst internship at IBM Adroit Technologies and independently developed ShieldAI, a full-stack AI-based malware detection system. Strong foundation in Python, Java, SQL, and JavaScript, with active participation in state-level hackathons like Naan Mudhalvan. Seeking an entry-level Software Engineer / Data Analyst role to apply and grow these skills.',
    education: {
      degree: 'B.E. Computer Science and Engineering',
      institution: 'University College of Engineering, Nagercoil (Anna University)',
      curriculum: 'Regulation 2021 curriculum',
      expectedGraduation: 'Expected 2027',
    },
  },
  projects: [
    {
      id: 'shieldai',
      title: 'ShieldAI',
      subtitle: 'AI-Based Malware Detection & Threat Rating System',
      category: 'Cybersecurity',
      date: '2025 – 2026',
      featured: true,
      image: '/images/project_shieldai_malware_1793356467348.jpg',
      description:
        'A full-stack cybersecurity application featuring an automated machine learning pipeline comparing Random Forest, XGBoost, and Neural Network models to auto-select the peak F1-score classifier.',
      longDescription:
        'Independently researched and engineered ShieldAI to deliver high-confidence malware file triage. The system extracts binary characteristics and PE header features, benchmarks classification across multiple algorithmic architectures (Random Forest, XGBoost, Multi-Layer Perceptron), and dynamically assigns files into a calibrated 4-level threat matrix. Includes batch scanning for up to 20 files simultaneously, OTP-verified authentication via Gmail SMTP, automated forensic PDF audit reporting with fpdf2, and an analytics dashboard built on Chart.js. Detailed in an extensive 48-page academic research report following Anna University guidelines.',
      highlights: [
        'Multi-Model Tournament: Benchmarks Random Forest, XGBoost, and Neural Networks, auto-selecting peak performer by F1 score.',
        'Cybersecurity Command UI: Interactive dashboard featuring Chart.js visual telemetry and 4-tier threat categorization.',
        'Batch File Ingestion: High-throughput scanning processing up to 20 suspected binaries concurrently.',
        'Forensic Reporting: Automated PDF analysis generation with fpdf2 and OTP-verified authentication via Gmail SMTP.',
        'Academic Documentation: Authored complete 48-page research monograph compliant with Anna University standards.',
      ],
      techStack: [
        'Python',
        'Flask',
        'scikit-learn',
        'XGBoost',
        'Neural Networks',
        'Chart.js',
        'HTML5/CSS3',
        'SQLite',
        'fpdf2',
      ],
      githubUrl: 'https://github.com/JayaprakashM-jpg/ShieldAI-Malware-Detection',
      liveDemoUrl: '#demo-shieldai',
      hostingUrl: 'https://shieldai-malware-detect.vercel.app',
      metrics: [
        { label: 'Model Evaluation', value: '3 AI Architectures' },
        { label: 'Batch Scan Limit', value: '20 Files Concurrently' },
        { label: 'Threat Tiers', value: '4 Calibrated Levels' },
        { label: 'Research Report', value: '48 Pages (Anna Univ)' },
      ],
    },
    {
      id: 'habit-tracker',
      title: 'Habit Tracker',
      subtitle: 'Minimalist Daily Consistency & Streak Visualizer',
      category: 'Web Development',
      date: '2024 – 2025',
      featured: true,
      image: 'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?auto=format&fit=crop&w=1200&q=80',
      description:
        'Interactive client-side web application dedicated to habit formation, continuous streaks, heatmaps, and clean day-to-day progress logging.',
      longDescription:
        'Engineered as part of a front-end suite focusing on clean DOM manipulation, local persistence, responsive typography, and micro-interactions without heavy external frameworks.',
      highlights: [
        'Dynamic streak calculation engine with zero server latency.',
        'GitHub-style visual frequency matrix mapping monthly habits.',
        'Offline-first architecture leveraging browser localStorage.',
      ],
      techStack: ['JavaScript (ES6+)', 'HTML5', 'CSS3', 'Local Storage API'],
      githubUrl: 'https://github.com/JayaprakashM-jpg/Front-End-Mini-Projects',
      liveDemoUrl: '#demo-habit-tracker',
      hostingUrl: 'https://habit-tracker-jayaprakash.vercel.app',
      metrics: [
        { label: 'Storage', value: 'Local Persistence' },
        { label: 'Bundle Size', value: '< 25 KB Vanilla' },
      ],
    },
    {
      id: 'stock-ticker',
      title: 'Real-Time Stock Ticker',
      subtitle: 'Market Watchlist & Volatility Telemetry Tool',
      category: 'Data Analytics',
      date: '2024 – 2025',
      featured: true,
      image: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=1200&q=80',
      description:
        'Lightweight financial data dashboard displaying real-time stock quotes, delta variations, and price chart trends with zero lag.',
      longDescription:
        'Connects to market data REST endpoints with throttling and fallback caching. Features dynamic color-coded gain/loss indicators and responsive tabular layouts.',
      highlights: [
        'RESTful ticker data polling with resilient error boundaries.',
        'Clean tabular figures and price fluctuation percentage tracking.',
        'Custom interactive SVG sparklines displaying intra-day movement.',
      ],
      techStack: ['JavaScript', 'REST APIs', 'CSS Grid', 'SVG Charts'],
      githubUrl: 'https://github.com/JayaprakashM-jpg/Front-End-Mini-Projects',
      metrics: [
        { label: 'Refresh Rate', value: 'Live Poll' },
        { label: 'Metrics', value: 'Quotes & Sparklines' },
      ],
    },
    {
      id: 'ehub-platform',
      title: 'EHub Community Hub',
      subtitle: 'Collaborative Student Resources Portal',
      category: 'Web Development',
      date: '2024',
      featured: false,
      image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1200&q=80',
      description:
        'A unified knowledge and resource sharing portal for engineering students to exchange study materials, problem sheets, and syllabus roadmaps.',
      longDescription:
        'Designed with modular CSS and semantic HTML5 to ensure accessible indexing, fast navigation across semester syllabi, and quick resource filtering.',
      highlights: [
        'Subject-wise categorisation and Anna University regulation indexing.',
        'Searchable directory with real-time keyword filtering.',
      ],
      techStack: ['HTML5', 'CSS3', 'JavaScript'],
      githubUrl: 'https://github.com/JayaprakashM-jpg/Front-End-Mini-Projects',
      metrics: [
        { label: 'Accessibility', value: 'Semantic HTML' },
        { label: 'Coverage', value: 'All Semesters' },
      ],
    },
    {
      id: 'simple-bill',
      title: 'Simple Bill',
      subtitle: 'Instant POS Invoice Generator for Retail Shops',
      category: 'Web Development',
      date: '2024',
      featured: false,
      image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=1200&q=80',
      description:
        'A quick point-of-sale invoice calculator with itemized GST breakdown, discount options, print-ready PDF preview, and transaction ledger.',
      longDescription:
        'Eliminates billing friction for small retail setups. Calculates subtotal, tax categories, auto-generates invoice numbers, and formats print stylesheets cleanly.',
      highlights: [
        'Instant tax and discount calculation with tabular accuracy.',
        'Clean @media print CSS styling for crisp physical receipts.',
      ],
      techStack: ['JavaScript', 'HTML5', 'CSS3 Print Media'],
      githubUrl: 'https://github.com/JayaprakashM-jpg/Front-End-Mini-Projects',
      metrics: [
        { label: 'Print Ready', value: 'Native @media print' },
        { label: 'Speed', value: 'Instant Calc' },
      ],
    },
  ],
  certificates: [
    {
      id: 'cert-hackathon',
      title: 'Certificate of Participation — Naan Mudhalvan Hackathon',
      issuer: 'IBM & Tamil Nadu Skill Development Corporation (TNSDC)',
      issueDate: 'November 2024',
      credentialId: 'NM-IBM-HACK-2024-FE',
      photoUrl: '/images/cert_hackathon_recognition_1793356466496.jpg',
      category: 'Hackathon',
      description:
        'Participated in the state-level Naan Mudhalvan Hackathon conducted in collaboration with IBM. Contributed under the Front-End Technologies track developing responsive user interfaces and rapid web prototypes.',
      skills: ['Front-End Technologies', 'Problem Solving', 'UI/UX Design', 'Collaborative Coding', 'Rapid Prototyping'],
      verificationUrl: 'https://naanmudhalvan.tn.gov.in/',
    },
    {
      id: 'cert-ibm-da',
      title: 'Data Analytics Certification',
      issuer: 'IBM SkillsBuild',
      issueDate: 'October 2024',
      credentialId: 'IBM-DA-84729103',
      photoUrl: '/images/cert_ibm_data_analytics_1793356465692.jpg',
      category: 'Professional',
      description:
        'Comprehensive professional credential covering data analysis methodologies, exploratory data analysis (EDA), data wrangling with Python and Pandas, statistical hypothesis testing, and business insight reporting.',
      skills: ['Python for Data Science', 'Pandas & NumPy', 'Exploratory Data Analysis', 'Data Cleaning', 'Data Visualization'],
      verificationUrl: 'https://skillsbuild.org/',
    },
    {
      id: 'cert-infosys-devops',
      title: 'DevOps Fundamentals Certification',
      issuer: 'Infosys Springboard',
      issueDate: 'October 2023',
      credentialId: 'IS-DF-2023-A123B4',
      photoUrl: '/images/cert_infosys_devops_1793356465866.jpg',
      category: 'Cloud & DevOps',
      description:
        'Foundational industry certification on DevOps culture, continuous integration and continuous deployment (CI/CD) pipelines, containerization concepts, infrastructure as code, and agile delivery.',
      skills: ['CI/CD Pipelines', 'Git & Version Control', 'Agile Methodologies', 'Software Deployment Lifecycle', 'Monitoring'],
      verificationUrl: 'https://infyspringboard.onwingspan.com/',
    },
  ],
  experiences: [
    {
      id: 'exp-ibm-adroit',
      role: 'Data Analyst Intern',
      company: 'IBM Adroit Technologies',
      type: 'Remote Internship',
      duration: '2025',
      location: 'Remote, India',
      points: [
        'Executed end-to-end data cleaning, anomaly detection, and exploratory data analysis across complex business datasets to uncover operational bottlenecks.',
        'Constructed intuitive analytical reports and visualizations to clearly articulate trend insights and quantitative findings to senior mentors.',
        'Collaborated remotely adhering to industry-standard analytics tools, agile sprints, and data governance workflows in a production environment.',
      ],
      technologies: ['Python', 'Pandas', 'Data Visualization', 'SQL', 'Exploratory Data Analysis'],
    },
    {
      id: 'exp-education',
      role: 'B.E. in Computer Science and Engineering',
      company: 'University College of Engineering, Nagercoil (Anna University)',
      type: 'Undergraduate Degree',
      duration: '2023 – Expected 2027',
      location: 'Nagercoil, Tamil Nadu, India',
      points: [
        'Enrolled under the rigorous Anna University Regulation 2021 curriculum with special emphasis on algorithms, systems engineering, and data science.',
        'Core coursework includes Data Structures & Algorithms, Database Management Systems (DBMS), Object-Oriented Programming (OOP), and Web Technologies.',
        'Participated in state-level hackathons including Naan Mudhalvan and spearheaded full-stack machine learning capstone project ShieldAI.',
      ],
      technologies: ['C/C++', 'Java', 'Python', 'DBMS / SQL', 'Operating Systems', 'Computer Networks'],
    },
  ],
  skillCategories: [
    {
      id: 'lang',
      categoryName: 'Languages',
      skills: [
        { name: 'Python', proficiency: 'Proficient', iconName: 'Code' },
        { name: 'Java', proficiency: 'Proficient', iconName: 'Coffee' },
        { name: 'SQL', proficiency: 'Proficient', iconName: 'Database' },
        { name: 'JavaScript (ES6+)', proficiency: 'Advanced', iconName: 'FileCode' },
      ],
    },
    {
      id: 'web',
      categoryName: 'Web & Frameworks',
      skills: [
        { name: 'Flask', proficiency: 'Proficient', iconName: 'Server' },
        { name: 'HTML5', proficiency: 'Advanced', iconName: 'Layout' },
        { name: 'CSS3 / Modern Styling', proficiency: 'Advanced', iconName: 'Palette' },
        { name: 'Chart.js', proficiency: 'Proficient', iconName: 'BarChart3' },
        { name: 'REST APIs', proficiency: 'Proficient', iconName: 'Globe' },
      ],
    },
    {
      id: 'ml',
      categoryName: 'Data & Machine Learning',
      skills: [
        { name: 'Pandas & NumPy', proficiency: 'Proficient', iconName: 'TrendingUp' },
        { name: 'scikit-learn', proficiency: 'Proficient', iconName: 'Cpu' },
        { name: 'Random Forest', proficiency: 'Proficient', iconName: 'GitBranch' },
        { name: 'XGBoost', proficiency: 'Proficient', iconName: 'Zap' },
        { name: 'Neural Networks (MLP)', proficiency: 'Intermediate', iconName: 'Network' },
      ],
    },
    {
      id: 'tools',
      categoryName: 'Tools & Platforms',
      skills: [
        { name: 'Git & Version Control', proficiency: 'Advanced', iconName: 'GitCommit' },
        { name: 'GitHub', proficiency: 'Advanced', iconName: 'Github' },
        { name: 'SQLite', proficiency: 'Proficient', iconName: 'HardDrive' },
        { name: 'DevOps Fundamentals', proficiency: 'Intermediate', iconName: 'Terminal' },
      ],
    },
    {
      id: 'core',
      categoryName: 'Core CS Concepts',
      skills: [
        { name: 'Data Structures & Algorithms', proficiency: 'Proficient', iconName: 'Boxes' },
        { name: 'Database Management (DBMS)', proficiency: 'Proficient', iconName: 'Database' },
        { name: 'Object-Oriented Programming (OOP)', proficiency: 'Proficient', iconName: 'Layers' },
        { name: 'Exploratory Data Analysis (EDA)', proficiency: 'Advanced', iconName: 'Search' },
      ],
    },
  ],
  messages: [
    {
      id: 'msg-sample-1',
      name: 'Dr. R. Sundaram',
      email: 'sundaram.research@annauniv.edu',
      subject: 'Inquiry regarding ShieldAI Malware Detection Report',
      message:
        'Hello Jayaprakash, I reviewed your presentation on the multi-model comparison for ShieldAI. Impressive benchmark results with the F1 auto-selection. Would love to discuss publishing an extended conference abstract.',
      date: '2026-10-24 14:22',
      read: true,
    },
    {
      id: 'msg-sample-2',
      name: 'Adroit Talent Team',
      email: 'recruiting@ibm-adroit.com',
      subject: 'Graduation Placement Follow-up',
      message:
        'Hi Jayaprakash, Great job throughout your Data Analyst internship tenure. Please keep us updated with your final semester dates for our early-career intake.',
      date: '2026-10-28 09:45',
      read: false,
    },
  ],
  adminPassword: 'admin', // Simple, easy-to-use password by default
  emailApiKey: 'web3forms-portfolio-key', // Configurable API key for direct email delivery
};

