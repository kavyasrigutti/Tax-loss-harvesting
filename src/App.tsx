import React from 'react';
import PreHarvestingSummary from './components/PreHarvestingSummary';
import HoldingsTable from './components/HoldingsTable';
import AfterHarvestingSummary from './components/AfterHarvestingSummary';
import { HoldingsProvider } from './context/HoldingsContext';
import InfoPopover from './components/InfoPopover';
import Disclosure from './components/Disclosure';

function App() {
  return (
    <HoldingsProvider>
      <div className="min-h-screen bg-[#0A0B0D] text-white p-4 md:p-8">
        <header className="mb-6">
          <div className="flex items-center gap-4 mb-4">
            <h1 className="text-2xl font-bold">Tax Optimisation</h1>
            <InfoPopover />
          </div>
          <Disclosure 
            title="Important Notes And Disclaimers"
            content="This tool helps you understand your potential tax liability and opportunities for tax loss harvesting. The calculations are based on current market prices and your transaction history. Please consult with a tax professional before making any investment decisions."
          />
        </header>
        
        {/* Harvesting Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <PreHarvestingSummary/>
            <AfterHarvestingSummary />
          </div>

          {/* Holdings Table */}
          <HoldingsTable />
      </div>
    </HoldingsProvider>
  );
}

export default App;
