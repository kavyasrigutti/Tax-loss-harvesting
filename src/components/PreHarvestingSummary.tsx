import React from 'react';
import SummaryCard from './SummaryCard';
import { useHoldings } from '../context/HoldingsContext';

const PreHarvestingSummary: React.FC = () => {
  const { preHarvestingSummary } = useHoldings();
  
  return (
    <SummaryCard
      title="Before Harvesting"
      shortTerm={preHarvestingSummary.shortTerm}
      longTerm={preHarvestingSummary.longTerm}
      total={preHarvestingSummary.total}
      variant="dark"
    />
  );
};

export default PreHarvestingSummary;