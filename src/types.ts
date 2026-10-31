export interface SocialLinks {
  github: string;
  linkedin: string;
  instagram: string;
  twitter?: string;
  leetcode?: string;
  kaggle?: string;
}

export interface Profile {
  name: string;
  title: string;
  tagline: string;
  location: string;
  email: string;
  phone: string;
  avatarUrl: string;
  github: string;
  linkedin: string;
  socialLinks: SocialLinks;
  resumeUrl: string;
  summary: string;
  education: {
    degree: string;
    institution: string;
    curriculum: string;
    expectedGraduation: string;
  };
}

export interface Project {
  id: string;
  title: string;
  subtitle: string;
  category: 'Machine Learning' | 'Web Development' | 'Data Analytics' | 'Cybersecurity';
  date: string;
  description: string;
  longDescription: string;
  highlights: string[];
  techStack: string[];
  githubUrl: string;
  liveDemoUrl?: string;
  hostingUrl?: string; // Live website hosting URL (e.g. Vercel, Netlify, Render, custom domain)
  image: string;
  featured: boolean;
  metrics?: {
    label: string;
    value: string;
  }[];
}

export interface Certificate {
  id: string;
  title: string;
  issuer: string;
  issueDate: string;
  credentialId?: string;
  verificationUrl?: string;
  photoUrl: string;
  category: 'Hackathon' | 'Professional' | 'Cloud & DevOps' | 'Academic';
  description: string;
  skills: string[];
}

export interface Experience {
  id: string;
  role: string;
  company: string;
  type: string; // e.g. "Remote Internship", "Full-Time"
  duration: string;
  location: string;
  points: string[];
  technologies: string[];
}

export interface SkillCategory {
  id: string;
  categoryName: string;
  skills: {
    name: string;
    proficiency: 'Proficient' | 'Advanced' | 'Intermediate';
    iconName?: string;
  }[];
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  date: string;
  read: boolean;
}

export interface PortfolioData {
  profile: Profile;
  projects: Project[];
  certificates: Certificate[];
  experiences: Experience[];
  skillCategories: SkillCategory[];
  messages: ContactMessage[];
  adminPassword: string; // Stored securely in client portfolio state
  emailApiKey?: string; // API key for direct email delivery to Gmail
}

