import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Info } from 'lucide-react';

interface DisclosureProps {
  title: string;
  content: string;
}

const Disclosure: React.FC<DisclosureProps> = ({ title, content }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="bg-[#1C1D22] rounded-lg overflow-hidden">
      <button
        className="w-full px-4 py-3 flex items-center justify-between text-left"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex items-center gap-2">
          <Info className="w-5 h-5 text-blue-500" />
          <span className="font-medium">{title}</span>
        </div>
        {isOpen ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
      </button>

      {isOpen && (
        <div className="px-4 py-3 text-sm text-gray-300 border-t border-gray-700">
          {content}
        </div>
      )}
    </div>
  );
};

export default Disclosure;