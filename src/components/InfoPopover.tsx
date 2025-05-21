import React, { useState } from 'react';
import { HelpCircle } from 'lucide-react';

const InfoPopover = () => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div className="relative inline-block">
      <button
        className="text-blue-500 hover:text-blue-600 flex items-center gap-1"
        onMouseEnter={() => setIsVisible(true)}
        onMouseLeave={() => setIsVisible(false)}
      >
        <HelpCircle className="w-4 h-4" />
        <span className="text-sm">How it works?</span>
      </button>

      {isVisible && (
        <div className="absolute z-10 w-72 bg-gray-800 rounded-lg shadow-lg p-4 mt-2">
          <ul className="space-y-2 text-sm">
            <li>• See your capital gains for FY 2024-25 in the left card</li>
            <li>• Check boxes for assets you plan on selling to reduce your tax liability</li>
            <li>• Instantly see your updated tax liability in the right card</li>
            <li>• Pro tip: Experiment with different combinations of your holdings to optimize your tax liability</li>
          </ul>
        </div>
      )}
    </div>
  );
}

export default InfoPopover;