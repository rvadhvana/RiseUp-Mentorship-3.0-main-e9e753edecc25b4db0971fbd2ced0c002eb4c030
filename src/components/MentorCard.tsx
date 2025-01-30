import { useState } from 'react';

export function MentorCard({ mentor }: { mentor: Mentor }) {
  const [imageError, setImageError] = useState(false);

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="aspect-w-16 aspect-h-9 relative">
        {!imageError ? (
          <img
            src={mentor.imageUrl}
            alt={mentor.name}
            className="object-cover w-full h-48"
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="w-full h-48 bg-gray-200 flex items-center justify-center">
            <User className="h-12 w-12 text-gray-400" />
          </div>
        )}
      </div>
      {/* Rest of the mentor card content */}
    </div>
  );
} 