import { Betslip } from '@acme/ui';

const sampleBets = [
  {
    id: '1',
    selection: 'Manchester United to win',
    odds: 2.5,
    eventName: 'Manchester United vs Liverpool',
    marketName: 'Match Result',
  },
  {
    id: '2',
    selection: 'Over 2.5 Goals',
    odds: 1.8,
    eventName: 'Manchester United vs Liverpool',
    marketName: 'Total Goals',
  },
];
export const HomeMessage = () => <Betslip bets={sampleBets} />;
