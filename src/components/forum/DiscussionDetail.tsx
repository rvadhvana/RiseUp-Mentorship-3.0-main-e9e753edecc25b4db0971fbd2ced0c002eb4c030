import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { MOCK_DISCUSSIONS } from '../../constants/mockData';
import { MessageCircle, ThumbsUp, ArrowLeft, Shield } from 'lucide-react';

export function DiscussionDetail() {
  const { id } = useParams();
  const { isAuthenticated, user } = useAuth();
  const [replyContent, setReplyContent] = useState('');
  
  const discussion = MOCK_DISCUSSIONS.find(d => d.id === id);

  if (!discussion) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-8">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-gray-900">Discussion not found</h2>
          <Link to="/discussions" className="text-blue-600 hover:text-blue-500 mt-4 inline-block">
            Back to Discussions
          </Link>
        </div>
      </div>
    );
  }

  const handleSubmitReply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!replyContent.trim()) return;
    
    // In a real app, this would make an API call
    console.log('Submitting reply:', replyContent);
    setReplyContent('');
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <Link 
        to="/discussions"
        className="inline-flex items-center text-sm text-gray-500 hover:text-gray-700 mb-6"
      >
        <ArrowLeft className="w-4 h-4 mr-1" />
        Back to Discussions
      </Link>

      <div className="bg-white rounded-lg shadow-sm p-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">{discussion.title}</h1>
        
        <div className="flex items-center text-sm text-gray-500 mb-4">
          <div className="flex items-center">
            {discussion.authorRole === 'mentor' && (
              <Shield className="w-4 h-4 text-blue-500 mr-1" />
            )}
            <span>{discussion.authorName}</span>
          </div>
          <span className="mx-2">·</span>
          <span>{new Date(discussion.createdAt).toLocaleDateString()}</span>
        </div>

        <p className="text-gray-700 mb-6">{discussion.content}</p>

        <div className="border-t pt-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Replies</h2>
          
          {isAuthenticated ? (
            <form onSubmit={handleSubmitReply} className="mb-6">
              <textarea
                value={replyContent}
                onChange={(e) => setReplyContent(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                rows={3}
                placeholder="Write your reply..."
                required
              />
              <button
                type="submit"
                className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Post Reply
              </button>
            </form>
          ) : (
            <div className="text-center py-4 bg-gray-50 rounded-lg mb-6">
              <p className="text-gray-600">
                Please{' '}
                <Link to="/login" className="text-blue-600 hover:text-blue-500">
                  sign in
                </Link>{' '}
                to reply to this discussion.
              </p>
            </div>
          )}

          <div className="space-y-4">
            {discussion.replies.map((reply) => (
              <div key={reply.id} className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-center text-sm text-gray-500 mb-2">
                  <div className="flex items-center">
                    {reply.authorRole === 'mentor' && (
                      <Shield className="w-4 h-4 text-blue-500 mr-1" />
                    )}
                    <span>{reply.authorName}</span>
                  </div>
                  <span className="mx-2">·</span>
                  <span>{new Date(reply.createdAt).toLocaleDateString()}</span>
                </div>
                <p className="text-gray-700">{reply.content}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
} 