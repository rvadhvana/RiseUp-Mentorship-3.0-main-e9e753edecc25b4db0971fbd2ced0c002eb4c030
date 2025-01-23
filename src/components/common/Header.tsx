import { Link } from 'react-router-dom';
import { Rocket } from 'lucide-react';
import { useEffect, useState } from 'react';
import { UserMenu } from './UserMenu';

const MOTIVATIONAL_QUOTES = [
  {
    text: "The best way to predict the future is to create it.",
    author: "Peter Drucker"
  },
  {
    text: "Success is not final, failure is not fatal: it is the courage to continue that counts.",
    author: "Winston Churchill"
  },
  {
    text: "The only way to do great work is to love what you do.",
    author: "Steve Jobs"
  },
  {
    text: "Believe you can and you're halfway there.",
    author: "Theodore Roosevelt"
  }
];

export function Header() {
  const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentQuoteIndex((prev) => 
        prev === MOTIVATIONAL_QUOTES.length - 1 ? 0 : prev + 1
      );
    }, 6000); // Change quote every 6 seconds

    return () => clearInterval(timer);
  }, []);

  return (
    <header className="bg-white">
      {/* Quote Banner */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center h-6 flex items-center justify-center overflow-hidden">
            <div className="animate-fade-in-out">
              <p className="text-sm font-medium">
                "{MOTIVATIONAL_QUOTES[currentQuoteIndex].text}"
                <span className="text-blue-200 ml-2">
                  — {MOTIVATIONAL_QUOTES[currentQuoteIndex].author}
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <Link 
            to="/" 
            className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 transition-colors duration-200"
          >
            <Rocket className="h-8 w-8" />
            <span className="font-bold text-xl">RiseUp Mentorship</span>
          </Link>

          {/* Add UserMenu */}
          <UserMenu />
        </div>
      </div>
    </header>
  );
} 