import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  ScrollView,
  Platform,
} from 'react-native';

import { Bet } from './types';

interface BetslipProps {
  bets: Bet[];
  onRemoveBet?: (betId: string) => void;
  onUpdateStake?: (betId: string, stake: number) => void;
  onPlaceBets?: () => void;
}

const BetCard: React.FC<{
  bet: Bet;
  onRemove: (id: string) => void;
  onUpdateStake: (id: string, stake: number) => void;
}> = ({ bet, onRemove, onUpdateStake }) => (
  <View style={styles.betCard}>
    <View style={styles.betHeader}>
      <View>
        <Text style={styles.eventName}>{bet.eventName}</Text>
        <Text style={styles.marketName}>{bet.marketName}</Text>
        <Text style={styles.selection}>{bet.selection}</Text>
      </View>
      <TouchableOpacity onPress={() => onRemove(bet.id)} style={styles.removeButton}>
        <Text style={styles.removeButtonText}>✕</Text>
      </TouchableOpacity>
    </View>
    <View style={styles.betFooter}>
      <Text style={styles.odds}>{bet.odds}</Text>
      <TextInput
        style={styles.stakeInput}
        value={bet.stake?.toString() || ''}
        onChangeText={(value) => {
          // Only allow numbers and decimal point
          const numericValue = value.replace(/[^0-9.]/g, '');
          // Ensure only one decimal point
          const parts = numericValue.split('.');
          if (parts.length > 2) return;
          onUpdateStake(bet.id, Number(numericValue));
        }}
        placeholder="Stake"
        keyboardType="numeric"
        inputMode="decimal"
      />
    </View>
  </View>
);

export const Betslip: React.FC<BetslipProps> = ({ bets: initialBets }) => {
  const [bets, setBets] = React.useState(initialBets);

  const calculateTotalStake = React.useCallback(() => {
    return bets.reduce((total, bet) => total + (bet.stake || 0), 0);
  }, [bets]);

  const calculatePotentialWinnings = React.useCallback(() => {
    return bets.reduce((total, bet) => {
      const stake = bet.stake || 0;
      return total + stake * bet.odds;
    }, 0);
  }, [bets]);

  const removeBet = React.useCallback((betId: string) => {
    setBets((currentBets) => currentBets.filter((bet) => bet.id !== betId));
  }, []);

  const updateStake = React.useCallback((betId: string, stake: number) => {
    setBets((currentBets) =>
      currentBets.map((bet) => (bet.id === betId ? { ...bet, stake } : bet))
    );
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Betslip</Text>

      <ScrollView style={styles.scrollView}>
        {bets.length === 0 ? (
          <Text style={styles.emptyText}>Your betslip is empty</Text>
        ) : (
          <>
            {bets.map((bet) => (
              <BetCard key={bet.id} bet={bet} onRemove={removeBet} onUpdateStake={updateStake} />
            ))}

            <View style={styles.summary}>
              <View style={styles.summaryRow}>
                <Text>Total Stake:</Text>
                <Text>£{calculateTotalStake().toFixed(2)}</Text>
              </View>
              <View style={styles.summaryRow}>
                <Text>Potential Returns:</Text>
                <Text>£{calculatePotentialWinnings().toFixed(2)}</Text>
              </View>
              <TouchableOpacity style={styles.placeBetButton}>
                <Text style={styles.placeBetButtonText}>Place Bets</Text>
              </TouchableOpacity>
            </View>
          </>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 50,
    backgroundColor: '#f5f5f5',
    padding: 16,
    // ...Platform.select({
    //   web: {
    //     maxWidth: 500,
    //     margin: '0 auto',
    //     height: '100vh',
    //     overflow: 'hidden',
    //   },
    // }),
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  scrollView: {
    flex: 1,
    // ...Platform.select({
    //   web: {
    //     maxHeight: 'calc(100vh - 100px)',
    //   },
    // }),
  },
  betCard: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
    ...Platform.select({
      web: {
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        cursor: 'pointer',
        transition: 'transform 0.2s',
        ':hover': {
          transform: 'scale(1.01)',
        },
      },
      default: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
      },
    }),
  },
  betHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  eventName: {
    fontWeight: '600',
    fontSize: 16,
  },
  marketName: {
    color: '#666',
    fontSize: 14,
  },
  selection: {
    fontSize: 14,
    fontWeight: '500',
  },
  removeButton: {
    padding: 4,
  },
  removeButtonText: {
    color: '#ff4444',
    fontSize: 16,
  },
  betFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
  },
  odds: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  stakeInput: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 4,
    padding: 8,
    width: 100,
    ...Platform.select({
      web: {
        outline: 'none',
        ':focus': {
          borderColor: '#4CAF50',
        },
      },
    }),
  },
  emptyText: {
    textAlign: 'center',
    color: '#666',
    marginTop: 24,
  },
  summary: {
    marginTop: 16,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#ddd',
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  placeBetButton: {
    backgroundColor: '#4CAF50',
    padding: 16,
    borderRadius: 8,
    marginTop: 8,
    ...Platform.select({
      web: {
        cursor: 'pointer',
        transition: 'background-color 0.2s',
        ':hover': {
          backgroundColor: '#45a049',
        },
      },
    }),
  },
  placeBetButtonText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
  },
});
