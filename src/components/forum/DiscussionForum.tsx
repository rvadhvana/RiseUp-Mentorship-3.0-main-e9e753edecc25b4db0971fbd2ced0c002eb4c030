import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Discussion, DiscussionCategory } from '../../types/forum';
import { Shield, MessageCircle, Filter, Eye, ThumbsUp } from 'lucide-react';
import { Link } from 'react-router-dom';
import { MOCK_DISCUSSIONS } from '../../constants/mockData';

const CATEGORIES: { id: DiscussionCategory; label: string; description: string }[] = [
  {
    id: 'taxation',
    label: 'Taxation',
    description: 'Discuss tax-related queries and compliance matters'
  },
  {
    id: 'immigration',
    label: 'Immigration',
    description: 'Visa processes and immigration-related discussions'
  },
  {
    id: 'career',
    label: 'Career Growth',
    description: 'Career development and progression'
  },
  {
    id: 'technical',
    label: 'Technical Skills',
    description: 'Technical discussions and problem-solving'
  },
  {
    id: 'mentorship',
    label: 'Mentorship',
    description: 'General mentorship-related discussions'
  },
  {
    id: 'general',
    label: 'General',
    description: 'Other general discussions'
  }
];

export function DiscussionForum() {
  const { isAuthenticated, user } = useAuth();
  const [selectedCategory, setSelectedCategory] = useState<DiscussionCategory | 'all'>('all');
  const [searchTerm, setSearchTerm] = useState('');

  // This will be replaced with actual API call
  const [discussions, setDiscussions] = useState<Discussion[]>(MOCK_DISCUSSIONS);

  const filteredDiscussions = discussions.filter(discussion => 
    (selectedCategory === 'all' || discussion.category === selectedCategory) &&
    (discussion.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
     discussion.content.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  if (!isAuthenticated) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <MessageCircle className="mx-auto h-12 w-12 text-gray-400" />
          <h2 className="mt-2 text-lg font-medium text-gray-900">
            Join the Discussion
          </h2>
          <p className="mt-1 text-sm text-gray-500">
            Sign in to view full discussions and participate in the community.
          </p>
          <div className="mt-6">
            <Link
              to="/login"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
            >
              Sign in to Participate
            </Link>
          </div>
        </div>

        {/* Preview of Recent Discussions */}
        <div className="mt-12">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Recent Discussions</h3>
          <div className="space-y-4">
            {discussions.slice(0, 3).map(discussion => (
              <div
                key={discussion.id}
                className="bg-white p-4 rounded-lg shadow-sm filter blur-sm"
              >
                <h4 className="text-lg font-medium text-gray-900">{discussion.title}</h4>
                <p className="text-gray-500 mt-1">Sign in to view full content</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex justify-between items-start mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Discussion Forum</h1>
          <p className="mt-2 text-gray-600">
            Join conversations, ask questions, and share your knowledge
          </p>
        </div>
        <Link
          to="/discussions/new"
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
        >
          Start Discussion
        </Link>
      </div>

      {/* Filters and Search */}
      <div className="mb-8">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="Search discussions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
            />
            <Filter className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
          </div>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value as DiscussionCategory | 'all')}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="all">All Categories</option>
            {CATEGORIES.map(category => (
              <option key={category.id} value={category.id}>
                {category.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Category Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {CATEGORIES.map(category => (
          <button
            key={category.id}
            onClick={() => setSelectedCategory(category.id)}
            className={`p-4 rounded-lg border ${
              selectedCategory === category.id
                ? 'border-blue-500 bg-blue-50'
                : 'border-gray-200 bg-white'
            } hover:border-blue-500 transition-colors`}
          >
            <h3 className="text-lg font-medium text-gray-900">{category.label}</h3>
            <p className="text-sm text-gray-500 mt-1">{category.description}</p>
          </button>
        ))}
      </div>

      {/* Discussions List */}
      <div className="space-y-6">
        {filteredDiscussions.map(discussion => (
          <Link
            key={discussion.id}
            to={`/discussions/${discussion.id}`}
            className="block bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-lg font-medium text-gray-900">{discussion.title}</h3>
                <p className="mt-1 text-gray-500 line-clamp-2">{discussion.content}</p>
              </div>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                {discussion.category}
              </span>
            </div>
            <div className="mt-4 flex items-center text-sm text-gray-500">
              <div className="flex items-center">
                {discussion.authorRole === 'mentor' && (
                  <Shield className="w-4 h-4 text-blue-500 mr-1" />
                )}
                <span>{discussion.authorName}</span>
              </div>
              <span className="mx-2">·</span>
              <div className="flex items-center space-x-4">
                <span className="flex items-center">
                  <MessageCircle className="w-4 h-4 mr-1" />
                  {discussion.replies.length}
                </span>
                <span className="flex items-center">
                  <Eye className="w-4 h-4 mr-1" />
                  {discussion.views}
                </span>
                <span className="flex items-center">
                  <ThumbsUp className="w-4 h-4 mr-1" />
                  {discussion.likes}
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
} 