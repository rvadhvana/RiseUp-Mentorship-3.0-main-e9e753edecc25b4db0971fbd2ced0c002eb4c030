import { 
  Users, 
  Target, 
  Rocket, 
  Award,
  Calculator,
  Globe 
} from 'lucide-react';

export const SUCCESS_STORIES = [
  {
    quote: "RiseUp Mentorship transformed my career path. My mentor's guidance helped me land my dream job!",
    author: "Sarah Chen",
    role: "Software Engineer",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330"
  },
  {
    quote: "The structured mentorship program gave me the confidence to launch my tech startup.",
    author: "Michael Rodriguez",
    role: "Tech Entrepreneur",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e"
  }
];

export const BENEFITS = [
  {
    title: "Expert Mentors",
    description: "Connect with industry professionals who have proven track records of success.",
    icon: <Users className="h-6 w-6 text-white" />
  },
  {
    title: "Personalized Growth",
    description: "Get tailored guidance to achieve your specific career goals.",
    icon: <Target className="h-6 w-6 text-white" />
  },
  {
    title: "Career Acceleration",
    description: "Fast-track your professional development with structured mentorship.",
    icon: <Rocket className="h-6 w-6 text-white" />
  },
  {
    title: "Recognition",
    description: "Earn certificates and badges as you progress through the program.",
    icon: <Award className="h-6 w-6 text-white" />
  },
  {
    title: "Taxation Assistance",
    description: "Get expert guidance on tax planning and compliance for professionals.",
    icon: <Calculator className="h-6 w-6 text-white" />
  },
  {
    title: "Immigration Support",
    description: "Access resources and guidance for work visas and immigration processes.",
    icon: <Globe className="h-6 w-6 text-white" />
  }
];

// export const MOCK_DISCUSSIONS: Discussion[] = [ ... ]; 