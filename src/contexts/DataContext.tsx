import React, { createContext, useContext, useState, useEffect } from 'react';

export interface Skill {
  id: string;
  name: string;
  level: number;
  category: 'frontend' | 'backend' | 'tools';
}

export interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  technologies: string[];
  category: 'fullstack' | 'frontend' | 'backend';
  github: string;
  live: string;
  featured: boolean;
}

export interface ContactInfo {
  email: string;
  phone: string;
  location: string;
  github: string;
  linkedin: string;
  twitter: string;
}

export interface AboutInfo {
  name: string;
  title: string;
  bio: string;
  experience: string;
  projectsCompleted: string;
  availability: string;
}

interface DataContextType {
  skills: Skill[];
  projects: Project[];
  contactInfo: ContactInfo;
  aboutInfo: AboutInfo;
  addSkill: (skill: Omit<Skill, 'id'>) => void;
  updateSkill: (id: string, skill: Partial<Skill>) => void;
  deleteSkill: (id: string) => void;
  addProject: (project: Omit<Project, 'id'>) => void;
  updateProject: (id: string, project: Partial<Project>) => void;
  deleteProject: (id: string) => void;
  updateContactInfo: (info: ContactInfo) => void;
  updateAboutInfo: (info: AboutInfo) => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const useData = () => {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};

const defaultSkills: Skill[] = [
  { id: '1', name: 'React.js', level: 95, category: 'frontend' },
  { id: '2', name: 'TypeScript', level: 90, category: 'frontend' },
  { id: '3', name: 'Next.js', level: 88, category: 'frontend' },
  { id: '4', name: 'Node.js', level: 92, category: 'backend' },
  { id: '5', name: 'Express.js', level: 90, category: 'backend' },
  { id: '6', name: 'MongoDB', level: 88, category: 'backend' },
  { id: '7', name: 'Git/GitHub', level: 93, category: 'tools' },
  { id: '8', name: 'Docker', level: 82, category: 'tools' },
];

const defaultProjects: Project[] = [
  {
    id: '1',
    title: 'E-Commerce Platform',
    description: 'Full-stack e-commerce solution with payment integration, admin dashboard, and real-time inventory management.',
    image: 'https://images.pexels.com/photos/230544/pexels-photo-230544.jpeg?auto=compress&cs=tinysrgb&w=800',
    technologies: ['React', 'Node.js', 'MongoDB', 'Stripe', 'Redux'],
    category: 'fullstack',
    github: '#',
    live: '#',
    featured: true
  },
  {
    id: '2',
    title: 'Social Media Dashboard',
    description: 'Analytics dashboard for social media managers with real-time data visualization and automated reporting.',
    image: 'https://images.pexels.com/photos/265087/pexels-photo-265087.jpeg?auto=compress&cs=tinysrgb&w=800',
    technologies: ['Next.js', 'TypeScript', 'PostgreSQL', 'Chart.js'],
    category: 'frontend',
    github: '#',
    live: '#',
    featured: true
  }
];

const defaultContactInfo: ContactInfo = {
  email: 'your.email@example.com',
  phone: '+1 (555) 123-4567',
  location: 'San Francisco, CA',
  github: '#',
  linkedin: '#',
  twitter: '#'
};

const defaultAboutInfo: AboutInfo = {
  name: 'Your Name',
  title: 'MERN Stack Developer',
  bio: 'Passionate about creating scalable web applications with modern technologies. Specialized in MongoDB, Express.js, React, and Node.js with 5+ years of experience.',
  experience: '5+ Years Experience',
  projectsCompleted: '50+ Projects Completed',
  availability: 'Available for new projects'
};

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [contactInfo, setContactInfo] = useState<ContactInfo>(defaultContactInfo);
  const [aboutInfo, setAboutInfo] = useState<AboutInfo>(defaultAboutInfo);

  useEffect(() => {
    // Load data from localStorage or use defaults
    const savedSkills = localStorage.getItem('portfolio_skills');
    const savedProjects = localStorage.getItem('portfolio_projects');
    const savedContactInfo = localStorage.getItem('portfolio_contact');
    const savedAboutInfo = localStorage.getItem('portfolio_about');

    setSkills(savedSkills ? JSON.parse(savedSkills) : defaultSkills);
    setProjects(savedProjects ? JSON.parse(savedProjects) : defaultProjects);
    setContactInfo(savedContactInfo ? JSON.parse(savedContactInfo) : defaultContactInfo);
    setAboutInfo(savedAboutInfo ? JSON.parse(savedAboutInfo) : defaultAboutInfo);
  }, []);

  const saveToStorage = (key: string, data: any) => {
    localStorage.setItem(key, JSON.stringify(data));
  };

  const addSkill = (skill: Omit<Skill, 'id'>) => {
    const newSkill = { ...skill, id: Date.now().toString() };
    const updatedSkills = [...skills, newSkill];
    setSkills(updatedSkills);
    saveToStorage('portfolio_skills', updatedSkills);
  };

  const updateSkill = (id: string, skillUpdate: Partial<Skill>) => {
    const updatedSkills = skills.map(skill => 
      skill.id === id ? { ...skill, ...skillUpdate } : skill
    );
    setSkills(updatedSkills);
    saveToStorage('portfolio_skills', updatedSkills);
  };

  const deleteSkill = (id: string) => {
    const updatedSkills = skills.filter(skill => skill.id !== id);
    setSkills(updatedSkills);
    saveToStorage('portfolio_skills', updatedSkills);
  };

  const addProject = (project: Omit<Project, 'id'>) => {
    const newProject = { ...project, id: Date.now().toString() };
    const updatedProjects = [...projects, newProject];
    setProjects(updatedProjects);
    saveToStorage('portfolio_projects', updatedProjects);
  };

  const updateProject = (id: string, projectUpdate: Partial<Project>) => {
    const updatedProjects = projects.map(project => 
      project.id === id ? { ...project, ...projectUpdate } : project
    );
    setProjects(updatedProjects);
    saveToStorage('portfolio_projects', updatedProjects);
  };

  const deleteProject = (id: string) => {
    const updatedProjects = projects.filter(project => project.id !== id);
    setProjects(updatedProjects);
    saveToStorage('portfolio_projects', updatedProjects);
  };

  const updateContactInfo = (info: ContactInfo) => {
    setContactInfo(info);
    saveToStorage('portfolio_contact', info);
  };

  const updateAboutInfo = (info: AboutInfo) => {
    setAboutInfo(info);
    saveToStorage('portfolio_about', info);
  };

  const value = {
    skills,
    projects,
    contactInfo,
    aboutInfo,
    addSkill,
    updateSkill,
    deleteSkill,
    addProject,
    updateProject,
    deleteProject,
    updateContactInfo,
    updateAboutInfo
  };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};