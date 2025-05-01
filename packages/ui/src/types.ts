export interface Bet {
  id: string;
  selection: string;
  odds: number;
  stake?: number;
  eventName: string;
  marketName: string;
  description?: string;
}

export interface BetslipProps {
  bets: Bet[];
  onRemoveBet?: (betId: string) => void;
  onUpdateStake?: (betId: string, stake: number) => void;
  onPlaceBets?: () => void;
}
