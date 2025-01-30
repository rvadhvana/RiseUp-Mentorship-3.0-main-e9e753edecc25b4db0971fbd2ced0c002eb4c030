import { Link } from 'react-router-dom';
import { 
  Linkedin, 
  Youtube, 
  Instagram, 
  Link as LinkIcon, 
  Twitter,
  Send,
  Quote 
} from 'lucide-react';
import { supabase } from '../../utils/supabase';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

interface Testimonial {
  id: string;
  name: string;
  role: string;
  message: string;
  imageUrl: string;
}

// Mock testimonials - In a real app, these would come from your backend
const TESTIMONIALS: Testimonial[] = [
  {
    id: '1',
    name: 'Sarah Johnson',
    role: 'Software Engineer',
    message: 'RiseUP Mentorship helped me transition from a junior to senior role. The mentorship I received was invaluable.',
    imageUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200',
  },
  {
    id: '2',
    name: 'Michael Chen',
    role: 'Product Manager',
    message: 'The mentors here are truly exceptional. They provided practical insights that helped shape my career.',
    imageUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=200',
  },
];

export function Footer() {
  const { user } = useAuth();
  const navigate = useNavigate();
  
  const handleSubmitStory = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!user) {
      navigate('/login');
      return;
    }

    const formData = new FormData(e.currentTarget);
    const story = formData.get('story') as string;
    
    try {
      const { error } = await supabase
        .from('success_stories')
        .insert([{ user_id: user.id, story }]);
        
      if (error) throw error;
      
      alert('Story shared successfully!');
      e.currentTarget.reset();
    } catch (err) {
      console.error('Error submitting story:', err);
      alert('Failed to submit story. Please try again.');
    }
  };

  return (
    <footer className="bg-gray-900 text-white py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Content */}
        <div className="flex flex-col md:flex-row gap-8 items-start">
          {/* Left Side - Success Story */}
          <div className="flex-1">
            <form onSubmit={handleSubmitStory} className="flex gap-4">
              <textarea
                name="story"
                rows={2}
                className="flex-1 px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                placeholder="Share your success story..."
                required
              />
              <button
                type="submit"
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
              >
                <Send className="h-4 w-4" />
              </button>
            </form>
          </div>

          {/* Right Side - Social Links & Quick Links */}
          <div className="flex flex-col md:flex-row gap-8 items-start">
            {/* Social Links */}
            <div className="flex gap-3">
              <a
                href="https://www.linkedin.com/company/riseupetobicoke"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-gray-800 rounded-full hover:bg-blue-600 transition-colors"
              >
                <Linkedin className="h-5 w-5" />
              </a>
              <a
                href="https://www.youtube.com/@RiseUpEtobicoke"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-gray-800 rounded-full hover:bg-red-600 transition-colors"
              >
                <Youtube className="h-5 w-5" />
              </a>
              <a
                href="https://www.instagram.com/riseup.mentorship"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-gray-800 rounded-full hover:bg-pink-600 transition-colors"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="https://twitter.com/riseupmentors"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-gray-800 rounded-full hover:bg-blue-400 transition-colors"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a
                href="http://linktr.ee/riseupetobicoke"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-gray-800 rounded-full hover:bg-green-600 transition-colors"
              >
                <LinkIcon className="h-5 w-5" />
              </a>
            </div>

            {/* Quick Links */}
            <div className="flex gap-6 text-sm">
              <Link 
                to="/mentee/login"
                className="text-gray-400 hover:text-white transition-colors duration-200"
              >
                Find Mentors
              </Link>
              <Link
                to="/mentor/register"
                className="text-gray-400 hover:text-white transition-colors duration-200"
              >
                Become a Mentor
              </Link>
              <Link to="/events" className="text-gray-400 hover:text-white">
                Events
              </Link>
              <Link to="/about" className="text-gray-400 hover:text-white">
                About
              </Link>
            </div>
          </div>
        </div>

        {/* Copyright - Minimal */}
        <div className="text-center text-gray-400 text-sm mt-6 pt-6 border-t border-gray-800">
          © {new Date().getFullYear()} RiseUp Mentorship
        </div>
      </div>
    </footer>
  );
} 