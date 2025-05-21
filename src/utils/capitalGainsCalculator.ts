export interface Holding {
  coin: string;
  coinName: string;
  logo: string;
  currentPrice: number;
  totalHolding: number;
  averageBuyPrice: number;
  stcg: {
    balance: number;
    gain: number;
  };
  ltcg: {
    balance: number;
    gain: number;
  };
}

export interface GainSummary {
  profits: number;
  losses: number;
  net: number;
}

export interface CapitalGainsSummary {
  shortTerm: GainSummary;
  longTerm: GainSummary;
  total: number;
}

export const calculateCapitalGains = (holdings: Holding[]): CapitalGainsSummary => {
  const summary: CapitalGainsSummary = {
    shortTerm: { profits: 0, losses: 0, net: 0 },
    longTerm: { profits: 0, losses: 0, net: 0 },
    total: 0
  };

  holdings.forEach(holding => {
    // Short-term gains
    if (holding.stcg.gain > 0) {
      summary.shortTerm.profits += holding.stcg.gain;
    } else {
      summary.shortTerm.losses += Math.abs(holding.stcg.gain);
    }

    // Long-term gains
    if (holding.ltcg.gain > 0) {
      summary.longTerm.profits += holding.ltcg.gain;
    } else {
      summary.longTerm.losses += Math.abs(holding.ltcg.gain);
    }
  });

  summary.shortTerm.net = summary.shortTerm.profits - summary.shortTerm.losses;
  summary.longTerm.net = summary.longTerm.profits - summary.longTerm.losses;
  summary.total = summary.shortTerm.net + summary.longTerm.net;

  return summary;
};

export const formatCurrency = (value: number): string => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 2,
    minimumFractionDigits: 2
  }).format(value);
};

export const formatNumber = (value: number): string => {
  return new Intl.NumberFormat('en-IN', {
    maximumFractionDigits: 8,
    minimumFractionDigits: 2
  }).format(value);
};