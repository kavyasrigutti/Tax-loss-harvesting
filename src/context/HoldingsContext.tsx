import React, { createContext, useContext, useState, useEffect } from 'react';
import { fetchHoldings, fetchCapitalGains } from '../data/mockData';
import { 
  calculateCapitalGains, 
  CapitalGainsSummary, 
  Holding 
} from '../utils/capitalGainsCalculator';

interface HoldingsContextType {
  holdings: Holding[];
  selectedHoldingIds: string[];
  toggleHoldingSelection: (id: string) => void;
  preHarvestingSummary: CapitalGainsSummary;
  afterHarvestingSummary: CapitalGainsSummary;
  savings: number;
  isLoading: boolean;
}

const HoldingsContext = createContext<HoldingsContextType | undefined>(undefined);

export const HoldingsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [holdings, setHoldings] = useState<Holding[]>([]);
  const [selectedHoldingIds, setSelectedHoldingIds] = useState<string[]>([]);
  const [preHarvestingSummary, setPreHarvestingSummary] = useState<CapitalGainsSummary>({
    shortTerm: { profits: 0, losses: 0, net: 0 },
    longTerm: { profits: 0, losses: 0, net: 0 },
    total: 0
  });
  const [afterHarvestingSummary, setAfterHarvestingSummary] = useState<CapitalGainsSummary>({
    shortTerm: { profits: 0, losses: 0, net: 0 },
    longTerm: { profits: 0, losses: 0, net: 0 },
    total: 0
  });
  const [savings, setSavings] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [holdingsData, gainsData] = await Promise.all([
          fetchHoldings(),
          fetchCapitalGains()
        ]);

        setHoldings(holdingsData);
        const { capitalGains } = gainsData;
        
        setPreHarvestingSummary({
          shortTerm: {
            profits: capitalGains.stcg.profits,
            losses: capitalGains.stcg.losses,
            net: capitalGains.stcg.profits - capitalGains.stcg.losses
          },
          longTerm: {
            profits: capitalGains.ltcg.profits,
            losses: capitalGains.ltcg.losses,
            net: capitalGains.ltcg.profits - capitalGains.ltcg.losses
          },
          total: (capitalGains.stcg.profits - capitalGains.stcg.losses) +
                (capitalGains.ltcg.profits - capitalGains.ltcg.losses)
        });
      } catch (error) {
        console.error('Error loading data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  useEffect(() => {
    const selectedHoldings = holdings.filter(holding => 
      selectedHoldingIds.includes(holding.coin)
    );
    const newSummary = calculateCapitalGains(selectedHoldings);
    setAfterHarvestingSummary(newSummary);
    
    const newSavings = preHarvestingSummary.total - newSummary.total;
    setSavings(newSavings > 0 ? newSavings : 0);
  }, [selectedHoldingIds, holdings, preHarvestingSummary.total]);

  const toggleHoldingSelection = (id: string) => {
    setSelectedHoldingIds(prev => 
      prev.includes(id) 
        ? prev.filter(holdingId => holdingId !== id) 
        : [...prev, id]
    );
  };

  return (
    <HoldingsContext.Provider value={{
      holdings,
      selectedHoldingIds,
      toggleHoldingSelection,
      preHarvestingSummary,
      afterHarvestingSummary,
      savings,
      isLoading
    }}>
      {children}
    </HoldingsContext.Provider>
  );
};

export const useHoldings = () => {
  const context = useContext(HoldingsContext);
  if (context === undefined) {
    throw new Error('useHoldings must be used within a HoldingsProvider');
  }
  return context;
};