import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Target,
  Users,
  BookOpen,
  Star,
  ArrowRight,
  Calculator,
  Globe,
  Calendar,
  ArrowUpRight,
  Crown,
  Shield,
} from 'lucide-react';
import type { Event, Mentor } from '../types';
import { useAuth } from '../context/AuthContext';
import { supabase } from '../utils/supabase';

// Mock event
const MOCK_EVENT: Event = {
  id: '1',
  title:'RiseUP Tech Conference 2025',
  description:
    'Join us for an inspiring day of learning and networking with industry leaders.',
  date: '2025-02-20',
  lumaUrl: 'https://lu.ma/riseup-tech-2024',
  registrationDeadline: '2025-02-10',
  isActive: true,
};

const BENEFITS = [
  {
    title: 'Expert Mentorship',
    description: 'Connect with industry leaders who provide personalized guidance.',
    icon: <Users className="h-6 w-6 text-white" />,
  },
  {
    title: 'Skill Development',
    description: 'Access resources and guidance to enhance your technical skills.',
    icon: <BookOpen className="h-6 w-6 text-white" />,
  },
  {
    title: 'Career Growth',
    description: 'Get insights and strategies to accelerate your career progression.',
    icon: <Target className="h-6 w-6 text-white" />,
  },
  {
    title: 'Community Support',
    description: 'Join a supportive community of like-minded professionals.',
    icon: <Star className="h-6 w-6 text-white" />,
  },
  {
    title: 'Taxation Assistance',
    description: 'Expert guidance on tax planning and compliance for professionals.',
    icon: <Calculator className="h-6 w-6 text-white" />,
  },
  {
    title: 'Immigration Support',
    description: 'Resources and guidance for work visas and immigration processes.',
    icon: <Globe className="h-6 w-6 text-white" />,
  },
];

export function HomePage() {
  const [searchTerm] = useState('');
  const [mentors, setMentors] = useState<Mentor[]>([]);
  const [, setEvents] = useState<Event[]>([]);
  const [, setIsLoading] = useState(true);
  const [, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuth();
  const [isPremiumMember, setIsPremiumMember] = useState(false);
  const [, setIsPremiumLoading] = useState(true);
  const [, setPremiumError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        setError(null);

        // Fetch mentors
        const { data: mentorsData, error: mentorsError } = await supabase
          .from('mentor_profiles')
          .select(`
            *,
            mentor_slots (*)
          `)
          .eq('mentor_status', 'active');

        if (mentorsError) throw mentorsError;
        if (mentorsData) setMentors(mentorsData);

        // Fetch events
        const { data: eventsData, error: eventsError } = await supabase
          .from('events')
          .select('*')
          .eq('is_active', true)
          .order('date', { ascending: true });

        if (eventsError) throw eventsError;
        if (eventsData) setEvents(eventsData);

      } catch (err) {
        console.error('Error fetching data:', err);
        setError('Failed to load content. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const checkPremiumStatus = async () => {
    try {
      if (!user) return;
      
      const { data, error } = await supabase
        .from('premium_members')
        .select('*')
        .eq('user_id', user.id)
        .eq('is_active', true)
        .single();

      if (error) {
        if (error.code === 'PGRST116') { // No rows returned
          setIsPremiumMember(false);
          return;
        }
        throw error;
      }

      setIsPremiumMember(!!data);
    } catch (error) {
      console.error('Error checking premium status:', error);
      setPremiumError('Failed to verify premium status');
      setIsPremiumMember(false);
    } finally {
      setIsPremiumLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      checkPremiumStatus();
    } else {
      setIsPremiumMember(false);
      setIsPremiumLoading(false);
    }
  }, [user]);

  const handlePremiumAccess = () => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    navigate('/premium-content');
  };

  const filteredMentors = mentors.filter(mentor => 
    mentor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    mentor.expertise.some(skill => 
      skill.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );
  // if (isLoading) return <LoadingSpinner />;
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Event Banner */}
      {MOCK_EVENT.isActive && (
        <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center justify-between animate-fade-in">
              <div className="flex items-center space-x-4">
                <Calendar className="h-6 w-6 text-blue-200" />
                <div>
                  <h3 className="text-lg font-semibold">{MOCK_EVENT.title}</h3>
                  <div className="flex items-center text-sm text-blue-200 mt-1">
                    <span>📅 {new Date(MOCK_EVENT.date).toLocaleDateString()}</span>
                    <span className="mx-2">•</span>
                    <span>🎯 Registration closes {new Date(MOCK_EVENT.registrationDeadline).toLocaleDateString()}</span>
                  </div>
                </div>
              </div>
              <Link
                to={MOCK_EVENT.lumaUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center px-4 py-2 bg-white text-blue-600 rounded-full font-medium hover:bg-blue-50 transition-colors group"
              >
                Register Now
                <ArrowUpRight className="ml-2 h-4 w-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <div className="bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
          <div className="text-center">
            <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
              <span className="block">Welcome to</span>
              <span className="block text-blue-600">RiseUp Mentorship</span>
            </h1>
            <p className="mt-4 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:max-w-2xl">
              Connect with industry leaders, accelerate your growth, and unlock
              your potential through personalized mentorship.
            </p>
            <div className="mt-8 flex justify-center gap-4">
              <Link
                to="/mentors"
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
              >
                Find Your Mentor
              </Link>
              <Link
                to="/login"
                className="inline-flex items-center px-6 py-3 border-2 border-blue-600 text-base font-medium rounded-md text-blue-600 hover:bg-blue-50"
              >
                Join as Mentor
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Benefits Section */}
      <div className="bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900">
              Why Choose RiseUp Mentorship?
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              Discover the advantages of our mentorship program
            </p>
          </div>

          <div className="mt-10">
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {BENEFITS.map((benefit, index) => (
                <div
                  key={index}
                  className="relative bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="w-12 h-12 rounded-md bg-blue-600 flex items-center justify-center mb-4">
                    {benefit.icon}
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    {benefit.title}
                  </h3>
                  <p className="mt-2 text-gray-600">
                    {benefit.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Featured Mentors Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Meet Our Expert Mentors
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Learn from industry leaders who are passionate about sharing their knowledge and experience
            </p>
          </div>

          {/* Preview Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {filteredMentors.slice(0, 3).map((mentor) => (
              <div key={mentor.id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                <div className="aspect-w-16 aspect-h-9">
                  <img
                    src={mentor.imageUrl}
                    alt={mentor.name}
                    className="object-cover w-full h-48"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {mentor.name}
                  </h3>
                  <p className="text-gray-600 text-sm mb-3">
                    {mentor.title} at {mentor.company}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {mentor.expertise.slice(0, 2).map((skill) => (
                      <span
                        key={skill}
                        className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                      >
                        {skill}
                      </span>
                    ))}
                    {mentor.expertise.length > 2 && (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                        +{mentor.expertise.length - 2} more
                      </span>
                    )}
                  </div>
                  <p className="text-gray-600 text-sm line-clamp-2 mb-4">
                    {mentor.bio}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Call to Action */}
          <div className="text-center">
            {isAuthenticated ? (
              <Link
                to="/mentors"
                className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all group"
              >
                View All Mentors
                <ArrowUpRight className="ml-2 h-5 w-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </Link>
            ) : (
              <div className="space-y-4">
                <div className="bg-blue-50 rounded-lg p-4 max-w-md mx-auto">
                  <div className="flex items-center space-x-3 text-blue-700">
                    <Shield className="h-5 w-5" />
                    <p className="text-sm">
                      Sign in to view our complete mentor directory and connect with experts
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => navigate('/login')}
                  className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all"
                >
                  Sign In to View All
                  <Users className="ml-2 h-5 w-5" />
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Career Opportunities & Community Section */}
      <div className="py-12 bg-gradient-to-b from-white to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">
              Join Our Growing Community
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              Whether you're an organization looking to make an impact or a professional wanting to give back,
              there's a place for you in the RiseUp community
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {/* Organization Card */}
            <div className="bg-white rounded-2xl shadow-lg p-8 border border-blue-100 hover:shadow-xl transition-all">
              <div className="flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-6">
                <Users className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Partner Organizations
              </h3>
              <p className="text-gray-600 mb-6">
                Join RiseUp as a partner organization to access our talent pool, contribute to the tech community,
                and build your employer brand.
              </p>
              <ul className="space-y-3 mb-8 text-gray-600">
                <li className="flex items-center">
                  <span className="mr-2">✓</span> Access to verified mentor profiles
                </li>
                <li className="flex items-center">
                  <span className="mr-2">✓</span> Host exclusive events and workshops
                </li>
                <li className="flex items-center">
                  <span className="mr-2">✓</span> Dedicated organization dashboard
                </li>
              </ul>
              <Link
                to="/organization/register"
                className="inline-flex items-center justify-center w-full px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-all duration-200"
              >
                Register Organization
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </div>

            {/* Individual Mentor Card */}
            <div className="bg-white rounded-2xl shadow-lg p-8 border border-blue-100 hover:shadow-xl transition-all">
              <div className="flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-6">
                <Star className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Become a Mentor
              </h3>
              <p className="text-gray-600 mb-6">
                Share your expertise, guide the next generation of tech professionals, and grow your
                professional network.
              </p>
              <ul className="space-y-3 mb-8 text-gray-600">
                <li className="flex items-center">
                  <span className="mr-2">✓</span> Flexible mentoring schedule
                </li>
                <li className="flex items-center">
                  <span className="mr-2">✓</span> Access to exclusive resources
                </li>
                <li className="flex items-center">
                  <span className="mr-2">✓</span> Recognition and rewards program
                </li>
              </ul>
              <Link
                to="/mentor/apply"
                className="inline-flex items-center justify-center w-full px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-green-600 hover:bg-green-700 transition-all duration-200"
              >
                Apply as Mentor
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </div>
          </div>

          {/* Exclusive Content Integration */}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-8 text-white">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold mb-4">
                Exclusive Resources & Content
              </h3>
              <p className="text-lg opacity-90">
                Get access to premium resources, workshops, and networking opportunities
                when you join our community
              </p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {['Workshops & Webinars', 'Industry Insights', 'Career Resources'].map((item) => (
                <div key={item} className="bg-white/10 rounded-lg p-6 backdrop-blur-sm">
                  <h4 className="font-semibold mb-2">{item}</h4>
                  <p className="text-sm opacity-90">
                    Access curated content and resources to accelerate your professional growth
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-8 text-center">
            <button
              onClick={handlePremiumAccess}
              className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-lg hover:from-purple-700 hover:to-indigo-700 transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              <Crown className="h-5 w-5 mr-2" />
              {isPremiumMember ? 'Access Premium Content' : 'Check Premium Eligibility'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}


