
import { House } from 'lucide-react';
import { useState } from 'react';

export function Header() {
  const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString());
  
  // Update time every minute
  useState(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString());
    }, 60000);
    return () => clearInterval(interval);
  });

  return (
    <header className="flex justify-between items-center py-4 px-6 bg-white border-b">
      <div className="flex items-center">
        <House className="h-8 w-8 text-purple mr-2" />
        <h1 className="text-2xl font-bold text-gray-dark">HomeHub</h1>
      </div>
      <div className="flex items-center gap-4">
        <div className="text-sm text-gray-neutral">
          {currentTime}
        </div>
        <button className="p-2 rounded-full bg-purple-light text-white">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
          </svg>
        </button>
      </div>
    </header>
  );
}
