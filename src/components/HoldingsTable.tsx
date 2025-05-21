import React, { useState } from 'react';
import { useHoldings } from '../context/HoldingsContext';
import { formatCurrency, formatNumber } from '../utils/capitalGainsCalculator';
import CryptoIcon from './CryptoIcon';

const HoldingsTable: React.FC = () => {
  const { holdings, selectedHoldingIds, toggleHoldingSelection } = useHoldings();
  const [showAll, setShowAll] = useState(false);
  const [sortField, setSortField] = useState<'shortTerm' | null>(null);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');

  const sortedHoldings = [...holdings].sort((a, b) => {
    if (sortField === 'shortTerm') {
      return sortDirection === 'asc' ? a.stcg.gain - b.stcg.gain : b.stcg.gain - a.stcg.gain;
    }
    return 0;
  });

  const displayedHoldings = showAll ? sortedHoldings : sortedHoldings.slice(0, 4);

  const handleSort = () => {
    if (sortField === 'shortTerm') {
      setSortDirection(prev => prev === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField('shortTerm');
      setSortDirection('desc');
    }
  };

  return (
    <div className="bg-[#1C1D22] rounded-lg overflow-hidden w-full">
      <div className="p-4 border-b border-gray-700">
        <h2 className="text-xl font-bold text-white">Holdings</h2>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-700">
          <thead className="bg-[#1C1D22]">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                Select
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                Asset
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                Holdings
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                Current Price
              </th>
              <th 
                scope="col" 
                className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider cursor-pointer"
                onClick={handleSort}
              >
                Short-Term
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                Long-Term
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                Amount to Sell
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-700">
            {displayedHoldings.map((holding) => (
              <tr key={holding.coin} className="hover:bg-gray-800/50">
                <td className="px-6 py-4">
                  <input
                    type="checkbox"
                    checked={selectedHoldingIds.includes(holding.coin)}
                    onChange={() => toggleHoldingSelection(holding.coin)}
                    className="h-4 w-4 text-blue-600 rounded focus:ring-blue-500 bg-gray-700 border-gray-600"
                  />
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center">
                    <CryptoIcon logo={holding.logo} />
                    <div className="ml-3">
                      <div className="text-sm font-medium text-white">{holding.coinName}</div>
                      <div className="text-xs text-gray-400">{holding.coin}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm text-white">{formatNumber(holding.totalHolding)} {holding.coin}</div>
                  <div className="text-xs text-gray-400">{formatCurrency(holding.averageBuyPrice)}</div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm text-white">{formatCurrency(holding.currentPrice)}</div>
                </td>
                <td className="px-6 py-4">
                  <span className={`text-sm font-medium ${
                    holding.stcg.gain >= 0 ? 'text-green-400' : 'text-red-400'
                  }`}>
                    {formatCurrency(holding.stcg.gain)}
                  </span>
                  <div className="text-xs text-gray-400">{formatNumber(holding.stcg.balance)} {holding.coin}</div>
                </td>
                <td className="px-6 py-4">
                  <span className={`text-sm font-medium ${
                    holding.ltcg.gain >= 0 ? 'text-green-400' : 'text-red-400'
                  }`}>
                    {formatCurrency(holding.ltcg.gain)}
                  </span>
                  <div className="text-xs text-gray-400">{formatNumber(holding.ltcg.balance)} {holding.coin}</div>
                </td>
                <td className="px-6 py-4">
                  <span className="text-sm text-gray-400">
                    {selectedHoldingIds.includes(holding.coin) ? formatNumber(holding.totalHolding) : '-'}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {!showAll && holdings.length > 4 && (
        <div className="p-4 border-t border-gray-700">
          <button
            onClick={() => setShowAll(true)}
            className="text-blue-500 hover:text-blue-400 text-sm font-medium"
          >
            View all
          </button>
        </div>
      )}
    </div>
  );
};

export default HoldingsTable;
