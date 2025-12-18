/**
 * Transactions Screen (Apple-refined)
 * Swipe gestures. Clean list. Human language.
 */
import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Alert,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { GradientBackground } from '@/components/layout';
import { GlassCard, SwipeableTransaction } from '@/components/ui';
import { Colors, Spacing, Typography, BorderRadius } from '@/constants/theme';
import { MaterialIcons } from '@expo/vector-icons';

export default function TransactionsScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();

  // Mock transactions grouped by date
  const [transactions] = useState([
    {
      date: 'Hoje',
      items: [
        {
          id: '1',
          description: 'Almoço em restaurante',
          amount: 85.5,
          category: '🍽️ Alimentação',
          date: '15:30',
          paidBy: 'user' as const,
        },
        {
          id: '2',
          description: 'Uber para casa',
          amount: 23.9,
          category: '🚗 Transporte',
          date: '18:45',
          paidBy: 'shared' as const,
        },
      ],
    },
    {
      date: 'Ontem',
      items: [
        {
          id: '3',
          description: 'Supermercado',
          amount: 247.8,
          category: '🛒 Compras',
          date: '19:20',
          paidBy: 'partner' as const,
        },
        {
          id: '4',
          description: 'Academia SmartFit',
          amount: 89.9,
          category: '💪 Saúde',
          date: '07:00',
          paidBy: 'user' as const,
        },
      ],
    },
    {
      date: 'Esta Semana',
      items: [
        {
          id: '5',
          description: 'Conta de luz',
          amount: 280.0,
          category: '⚡ Contas',
          date: '13/11',
          paidBy: 'shared' as const,
        },
      ],
    },
  ]);

  const [selectedTransaction, setSelectedTransaction] = useState<any>(null);

  const handleSplit = (transaction: any) => {
    Alert.alert(
      'Dividir Gasto',
      `Dividir "${transaction.description}" entre vocês?`,
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Confirmar',
          onPress: () => Alert.alert('Sucesso!', 'Gasto dividido igualmente.'),
        },
      ]
    );
  };

  const handleEdit = (transaction: any) => {
    router.push('/add-transaction');
  };

  const handlePress = (transaction: any) => {
    setSelectedTransaction(transaction);
  };

  return (
    <GradientBackground>
      <View style={[styles.container, { paddingTop: insets.top + Spacing.md }]}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Nosso Histórico</Text>
          <TouchableOpacity onPress={() => router.push('/add-transaction')}>
            <View style={styles.addButton}>
              <MaterialIcons name="add" size={24} color={Colors.textWhite} />
            </View>
          </TouchableOpacity>
        </View>

        {/* Subtitle */}
        <Text style={styles.subtitle}>Todas as movimentações de vocês</Text>

        {/* Transactions List */}
        <ScrollView
          style={styles.list}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        >
          {transactions.map((group) => (
            <View key={group.date} style={styles.dateGroup}>
              <Text style={styles.dateLabel}>{group.date}</Text>
              {group.items.map((transaction) => (
                <SwipeableTransaction
                  key={transaction.id}
                  description={transaction.description}
                  amount={transaction.amount}
                  category={transaction.category}
                  date={transaction.date}
                  paidBy={transaction.paidBy}
                  onSplit={() => handleSplit(transaction)}
                  onEdit={() => handleEdit(transaction)}
                  onPress={() => handlePress(transaction)}
                />
              ))}
            </View>
          ))}
        </ScrollView>
      </View>

      {/* Transaction Details Modal */}
      <Modal
        visible={!!selectedTransaction}
        transparent
        animationType="slide"
        onRequestClose={() => setSelectedTransaction(null)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <GlassCard style={styles.modalCard}>
              <View style={styles.modalHeader}>
                <Text style={styles.modalTitle}>Detalhes</Text>
                <TouchableOpacity onPress={() => setSelectedTransaction(null)}>
                  <MaterialIcons name="close" size={24} color={Colors.textWhite} />
                </TouchableOpacity>
              </View>

              {selectedTransaction && (
                <View style={styles.modalContent}>
                  <Text style={styles.detailAmount}>
                    R$ {selectedTransaction.amount.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                  </Text>
                  <Text style={styles.detailDescription}>{selectedTransaction.description}</Text>

                  <View style={styles.detailRow}>
                    <Text style={styles.detailLabel}>Categoria</Text>
                    <Text style={styles.detailValue}>{selectedTransaction.category}</Text>
                  </View>

                  <View style={styles.detailRow}>
                    <Text style={styles.detailLabel}>Data</Text>
                    <Text style={styles.detailValue}>{selectedTransaction.date}</Text>
                  </View>

                  <View style={styles.detailRow}>
                    <Text style={styles.detailLabel}>Pago por</Text>
                    <Text style={styles.detailValue}>
                      {selectedTransaction.paidBy === 'user'
                        ? 'Você'
                        : selectedTransaction.paidBy === 'partner'
                        ? 'Parceiro'
                        : 'Compartilhado'}
                    </Text>
                  </View>

                  <TouchableOpacity
                    style={styles.editButton}
                    onPress={() => {
                      setSelectedTransaction(null);
                      router.push('/add-transaction');
                    }}
                  >
                    <MaterialIcons name="edit" size={20} color={Colors.textWhite} />
                    <Text style={styles.editButtonText}>Editar Transação</Text>
                  </TouchableOpacity>
                </View>
              )}
            </GlassCard>
          </View>
        </View>
      </Modal>
    </GradientBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: Spacing.md,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.xs,
  },
  title: {
    fontSize: Typography.h2,
    fontWeight: Typography.bold,
    color: Colors.textWhite,
  },
  addButton: {
    width: 40,
    height: 40,
    borderRadius: BorderRadius.sm,
    backgroundColor: Colors.gradientStart,
    alignItems: 'center',
    justifyContent: 'center',
  },
  subtitle: {
    fontSize: Typography.body,
    color: Colors.textSecondary,
    marginBottom: Spacing.lg,
  },
  list: {
    flex: 1,
  },
  listContent: {
    paddingBottom: Spacing.xxl,
    gap: Spacing.lg,
  },
  dateGroup: {
    gap: Spacing.sm,
  },
  dateLabel: {
    fontSize: Typography.body,
    fontWeight: Typography.semiBold,
    color: Colors.textWhite,
    marginBottom: Spacing.xs,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    justifyContent: 'flex-end',
  },
  modalContainer: {
    maxHeight: '70%',
  },
  modalCard: {
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    paddingBottom: Spacing.xl,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.lg,
  },
  modalTitle: {
    fontSize: Typography.h3,
    fontWeight: Typography.bold,
    color: Colors.textWhite,
  },
  modalContent: {
    gap: Spacing.md,
  },
  detailAmount: {
    fontSize: 48,
    fontWeight: Typography.bold,
    color: Colors.textWhite,
    textAlign: 'center',
    letterSpacing: -1,
  },
  detailDescription: {
    fontSize: Typography.h4,
    color: Colors.textWhite,
    textAlign: 'center',
    marginBottom: Spacing.md,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: Spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: Colors.glassBorder,
  },
  detailLabel: {
    fontSize: Typography.body,
    color: Colors.textSecondary,
  },
  detailValue: {
    fontSize: Typography.body,
    fontWeight: Typography.semiBold,
    color: Colors.textWhite,
  },
  editButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.xs,
    backgroundColor: Colors.gradientStart,
    paddingVertical: Spacing.md,
    borderRadius: BorderRadius.md,
    marginTop: Spacing.md,
  },
  editButtonText: {
    fontSize: Typography.body,
    fontWeight: Typography.semiBold,
    color: Colors.textWhite,
  },
});
