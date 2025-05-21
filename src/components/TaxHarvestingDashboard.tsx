import React from 'react';
import PreHarvestingSummary from './PreHarvestingSummary';
import AfterHarvestingSummary from './AfterHarvestingSummary';
import HoldingsTable from './HoldingsTable';

const TaxHarvestingDashboard: React.FC = () => {
  return (
    <div className="w-full px-4 py-8 space-y-10">
      {/* Summary Section */}
      <div className="flex flex-col lg:flex-row gap-6">
        <div className="w-full lg:w-1/2">
          <PreHarvestingSummary />
        </div>
        <div className="w-full lg:w-1/2">
          <AfterHarvestingSummary />
        </div>
      </div>

      {/* Holdings Table Section */}
      <div className="w-full">
        <HoldingsTable />
      </div>
    </div>
  );
};

export default TaxHarvestingDashboard;
