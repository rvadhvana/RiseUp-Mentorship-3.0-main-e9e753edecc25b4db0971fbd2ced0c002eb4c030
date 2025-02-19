import { useEffect } from 'react';
import { CheckCircle, XCircle, X } from 'lucide-react';

interface ToastProps {
  type: 'success' | 'error';
  message: string;
  onClose: () => void;
}

export function Toast({ type, message, onClose }: ToastProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 5000);

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className={`fixed top-4 right-4 z-50 flex items-center p-4 rounded-lg shadow-lg ${
      type === 'success' ? 'bg-green-50' : 'bg-red-50'
    }`}>
      {type === 'success' ? (
        <CheckCircle className="h-5 w-5 text-green-400" />
      ) : (
        <XCircle className="h-5 w-5 text-red-400" />
      )}
      <span className={`ml-2 text-sm ${
        type === 'success' ? 'text-green-800' : 'text-red-800'
      }`}>
        {message}
      </span>
      <button
        onClick={onClose}
        className="ml-4 text-gray-400 hover:text-gray-500"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  );
} 