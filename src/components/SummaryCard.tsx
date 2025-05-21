import React from 'react';
import { GainSummary } from '../utils/capitalGainsCalculator';
import { formatCurrency } from '../utils/capitalGainsCalculator';

interface SummaryCardProps {
  title: string;
  shortTerm: GainSummary;
  longTerm: GainSummary;
  total: number;
  savings?: number;
  variant?: 'dark' | 'blue';
}

const SummaryCard: React.FC<SummaryCardProps> = ({ 
  title, 
  shortTerm, 
  longTerm, 
  total,
  savings,
  variant = 'dark'
}) => {
  const cardClasses = variant === 'dark' 
    ? "bg-[#1C1D22]" 
    : "bg-blue-600";
  
  return (
<div className={`rounded-lg ${cardClasses} p-6 w-full mb-4`}>
      <h2 className="text-xl font-bold mb-6">{title}</h2>
      
      <div className="grid grid-cols-2 gap-4">
        <div>
          <h3 className="text-sm text-gray-400 mb-4">Short-term</h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-300">Profits</span>
              <span className="text-white">{formatCurrency(shortTerm.profits)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-300">Losses</span>
              <span className="text-white">{formatCurrency(shortTerm.losses)}</span>
            </div>
            <div className="flex justify-between font-medium">
              <span className="text-white">Net Capital Gains</span>
              <span className={shortTerm.net >= 0 ? "text-green-400" : "text-red-400"}>
                {formatCurrency(shortTerm.net)}
              </span>
            </div>
          </div>
        </div>
        
        <div>
          <h3 className="text-sm text-gray-400 mb-4">Long-term</h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-300">Profits</span>
              <span className="text-white">{formatCurrency(longTerm.profits)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-300">Losses</span>
              <span className="text-white">{formatCurrency(longTerm.losses)}</span>
            </div>
            <div className="flex justify-between font-medium">
              <span className="text-white">Net Capital Gains</span>
              <span className={longTerm.net >= 0 ? "text-green-400" : "text-red-400"}>
                {formatCurrency(longTerm.net)}
              </span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="mt-6 pt-4 border-t border-gray-700">
        <div className="flex justify-between items-center">
          <span className="font-medium text-lg">
            {variant === 'dark' ? 'Realised Capital Gains:' : 'Effective Capital Gains:'}
          </span>
          <span className={`font-bold text-lg ${total >= 0 ? "text-green-400" : "text-red-400"}`}>
            {formatCurrency(total)}
          </span>
        </div>
        {savings && savings > 0 && (
          <div className="mt-4 text-center">
            <p className="text-green-400 font-medium">
               You're going to save {formatCurrency(savings)}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SummaryCard;