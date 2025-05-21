import React from 'react';
import SummaryCard from './SummaryCard';
import { useHoldings } from '../context/HoldingsContext';

const AfterHarvestingSummary: React.FC = () => {
  const { afterHarvestingSummary, savings } = useHoldings();
  
  return (
    <SummaryCard
      title="After Harvesting"
      shortTerm={afterHarvestingSummary.shortTerm}
      longTerm={afterHarvestingSummary.longTerm}
      total={afterHarvestingSummary.total}
      savings={savings}
      variant="blue"
    />
  );
};

export default AfterHarvestingSummary;