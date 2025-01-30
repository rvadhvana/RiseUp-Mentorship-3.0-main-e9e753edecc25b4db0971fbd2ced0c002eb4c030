import React from 'react';
import { Mail, X } from 'lucide-react';

interface EmailConfirmationModalProps {
  isOpen: boolean;
  email: string;
  onClose: () => void;
}

export function EmailConfirmationModal({ isOpen, email, onClose }: EmailConfirmationModalProps) {
  if (!isOpen) return null;

  const handleClose = () => {
    onClose();
    // Close the current window/tab
    window.close();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-8 max-w-md w-full mx-4 relative animate-fade-in">
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
        >
          <X className="h-5 w-5" />
        </button>
        
        <div className="text-center">
          <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-blue-100 mb-6">
            <Mail className="h-8 w-8 text-blue-600" />
          </div>
          
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            Check Your Email
          </h3>
          
          <p className="text-gray-600 mb-6">
            We've sent a confirmation link to:
            <br />
            <span className="font-medium text-gray-800">{email}</span>
          </p>
          
          <div className="bg-blue-50 rounded-lg p-4 mb-6">
            <p className="text-sm text-blue-700">
              Please check your email and click the confirmation link to complete your registration.
            </p>
          </div>
          
          <button
            onClick={handleClose}
            className="w-full bg-blue-600 text-white rounded-lg py-2 hover:bg-blue-700 transition-colors"
          >
            Got it
          </button>
        </div>
      </div>
    </div>
  );
} 