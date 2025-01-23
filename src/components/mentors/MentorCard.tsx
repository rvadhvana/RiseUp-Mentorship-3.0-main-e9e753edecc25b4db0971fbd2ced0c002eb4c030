import { type Mentor } from '../../types';
import { useMentorBooking } from '../../hooks/useMentorBooking';

interface MentorCardProps {
  mentor: Mentor;
  isAuthenticated: boolean;
  onBooking: () => void;
  onConnect: () => void;
}

export function MentorCard({ mentor, isAuthenticated, onBooking, onConnect }: MentorCardProps) {
  const { bookSlot, loading, error } = useMentorBooking();

  const handleBooking = async (slotId: string) => {
    try {
      await bookSlot(mentor.id, slotId);
      // Show success message or update UI
    } catch (err) {
      // Handle error
      console.error('Booking failed:', err);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex items-start space-x-4">
        <img
          src={mentor.imageUrl}
          alt={mentor.name}
          className="w-20 h-20 rounded-full object-cover"
        />
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900">{mentor.name}</h3>
          <p className="text-sm text-gray-600">{mentor.title}</p>
          <p className="text-sm text-gray-600">{mentor.company}</p>
          <p className="text-sm text-gray-500 mt-1">{mentor.location}</p>
          <div className="mt-2 flex flex-wrap gap-2">
            {mentor.expertise.map((skill) => (
              <span
                key={skill}
                className="px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-full"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>
      <p className="mt-4 text-sm text-gray-600">{mentor.bio}</p>
      <div className="mt-4 flex space-x-4">
        <button
          onClick={() => handleBooking(mentor.id)}
          disabled={!isAuthenticated}
          className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
        >
          Book Session
        </button>
        <button
          onClick={onConnect}
          disabled={!isAuthenticated}
          className="flex-1 px-4 py-2 border border-blue-600 text-blue-600 rounded-md hover:bg-blue-50 disabled:opacity-50"
        >
          Connect
        </button>
      </div>
    </div>
  );
}