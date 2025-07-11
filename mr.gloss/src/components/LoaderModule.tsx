import React from 'react';

interface LoaderProps {
  progress?: number;
  message?: string;
  showProgress?: boolean;
  className?: string;
}

const Loader: React.FC<LoaderProps> = ({
  progress = 0,
  message = "Loading...",
  showProgress = false,
  className = ""
}) => {
  return (
    <div className={`flex items-center justify-center h-full w-full bg-gray-100 ${className}`}>
      <div className="text-center">
        {/* Spinner */}
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
        
        {/* Loading Message */}
        <p className="mt-4 text-gray-600 font-medium">{message}</p>
        
        {/* Progress Bar */}
        {showProgress && (
          <div className="mt-4 w-48 mx-auto">
            <div className="bg-gray-200 rounded-full h-2">
              <div 
                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${Math.min(progress, 100)}%` }}
              ></div>
            </div>
            <p className="text-sm text-gray-500 mt-1">{Math.round(progress)}%</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Loader;