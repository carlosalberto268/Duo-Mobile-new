/**
 * Dashboard Screen (Apple-refined)
 * One number. One message. Calm clarity.
 */
import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { GradientBackground } from '@/components/layout';
import { 
  GlassCard, 
  NotificationBell, 
  PartnerInviteModal,
  CoupleAvatar,
  FinancialStatus 
} from '@/components/ui';
import { Colors, Spacing, Typography, BorderRadius } from '@/constants/theme';
import { MaterialIcons } from '@expo/vector-icons';

export default function DashboardScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();

  // Mock user data
  const [user] = useState({
    name: 'João Silva',
    email: 'joao@example.com',
    avatar_url: undefined,
  });

  const [partner] = useState({
    name: 'Maria Santos',
    email: 'maria@example.com',
    avatar_url: undefined,
  }); // Set to undefined when no partner

  const [inviteModalVisible, setInviteModalVisible] = useState(false);

  const [notifications, setNotifications] = useState([
    {
      id: '1',
      title: 'Meta Alcançada! 🎉',
      message: 'Parabéns! Vocês atingiram 50% da meta "Viagem Europa"',
      type: 'goal' as const,
      is_read: false,
      created_at: new Date().toISOString(),
    },
    {
      id: '2',
      title: 'Vencimento Próximo',
      message: 'A conta de energia vence em 2 dias',
      type: 'warning' as const,
      is_read: false,
      created_at: new Date(Date.now() - 86400000).toISOString(),
    },
  ]);

  // Financial calculation (mocked)
  const totalIncome = 8500;
  const totalExpenses = 6200;
  const monthlyGoals = 1500;
  const upcomingBills = 495;
  const availableAmount = totalIncome - totalExpenses - upcomingBills;
  const savingsRate = ((totalIncome - totalExpenses) / totalIncome) * 100;

  // Determine status based on savings rate
  const getStatus = (): 'good' | 'attention' | 'critical' => {
    if (savingsRate >= 20) return 'good';
    if (savingsRate >= 10) return 'attention';
    return 'critical';
  };

  const getDaysLeft = () => {
    const now = new Date();
    const lastDay = new Date(now.getFullYear(), now.getMonth() + 1, 0);
    return Math.ceil((lastDay.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
  };

  const handleMarkAsRead = (id: string) => {
    setNotifications(prev =>
      prev.map(n => (n.id === id ? { ...n, is_read: true } : n))
    );
  };

  const handleMarkAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, is_read: true })));
  };

  const handleClearAll = () => {
    setNotifications([]);
  };

  const handleInvitePartner = (name: string, email: string) => {
    console.log('Inviting partner:', name, email);
    Alert.alert(
      'Convite Enviado! 🎉',
      `Um convite foi enviado para ${email}. Quando aceito, vocês poderão gerenciar as finanças juntos!`
    );
    setInviteModalVisible(false);
  };

  return (
    <GradientBackground>
      <ScrollView 
        style={styles.container}
        contentContainerStyle={[
          styles.contentContainer,
          { paddingTop: insets.top + Spacing.md }
        ]}
        showsVerticalScrollIndicator={false}
      >
        {/* Header with Couple Avatar */}
        <View style={styles.header}>
          <View style={styles.greeting}>
            <CoupleAvatar user={user} partner={partner} size="medium" />
            <View style={styles.greetingText}>
              <Text style={styles.greetingTitle}>
                {partner ? 'Olá, Casal! 💑' : `Olá, ${user.name.split(' ')[0]}! 👋`}
              </Text>
              <Text style={styles.subtitle}>Novembro 2025</Text>
            </View>
          </View>
          <NotificationBell
            notifications={notifications}
            hasPartner={!!partner}
            onMarkAsRead={handleMarkAsRead}
            onMarkAllAsRead={handleMarkAllAsRead}
            onClearAll={handleClearAll}
          />
        </View>

        {/* Partner Invite Banner */}
        {!partner && (
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => setInviteModalVisible(true)}
          >
            <GlassCard style={styles.inviteBanner}>
              <MaterialIcons name="favorite" size={32} color={Colors.expense} />
              <View style={styles.inviteContent}>
                <Text style={styles.inviteTitle}>Convidar Parceiro</Text>
                <Text style={styles.inviteText}>
                  Gerenciem as finanças juntos
                </Text>
              </View>
              <MaterialIcons name="arrow-forward" size={24} color={Colors.gradientStart} />
            </GlassCard>
          </TouchableOpacity>
        )}

        {/* Financial Status - Single Number Focus */}
        <FinancialStatus
          availableAmount={availableAmount}
          status={getStatus()}
          daysLeft={getDaysLeft()}
        />

        {/* Context Info */}
        <View style={styles.contextCard}>
          <Text style={styles.contextLabel}>Já considerando:</Text>
          <View style={styles.contextRow}>
            <MaterialIcons name="receipt-long" size={16} color={Colors.textSecondary} />
            <Text style={styles.contextText}>Contas próximas: R$ {upcomingBills}</Text>
          </View>
          <View style={styles.contextRow}>
            <MaterialIcons name="flag" size={16} color={Colors.textSecondary} />
            <Text style={styles.contextText}>Metas ativas: R$ {monthlyGoals}</Text>
          </View>
        </View>

        {/* Quick Actions */}
        <View style={styles.actionsGrid}>
          <TouchableOpacity 
            style={styles.actionCard}
            onPress={() => router.push('/add-transaction')}
          >
            <View style={[styles.actionIcon, { backgroundColor: 'rgba(239, 68, 68, 0.1)' }]}>
              <MaterialIcons name="add" size={28} color={Colors.expense} />
            </View>
            <Text style={styles.actionText}>Adicionar{'\n'}Gasto</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.actionCard}
            onPress={() => router.push('/goals')}
          >
            <View style={[styles.actionIcon, { backgroundColor: 'rgba(102, 126, 234, 0.1)' }]}>
              <MaterialIcons name="flag" size={28} color={Colors.gradientStart} />
            </View>
            <Text style={styles.actionText}>Nossas{'\n'}Metas</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.actionCard}
            onPress={() => router.push('/transactions')}
          >
            <View style={[styles.actionIcon, { backgroundColor: 'rgba(16, 185, 129, 0.1)' }]}>
              <MaterialIcons name="receipt-long" size={28} color={Colors.success} />
            </View>
            <Text style={styles.actionText}>Ver{'\n'}Histórico</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.actionCard}
            onPress={() => router.push('/accounts')}
          >
            <View style={[styles.actionIcon, { backgroundColor: 'rgba(245, 158, 11, 0.1)' }]}>
              <MaterialIcons name="account-balance-wallet" size={28} color={Colors.warning} />
            </View>
            <Text style={styles.actionText}>Nossas{'\n'}Contas</Text>
          </TouchableOpacity>
        </View>

        {/* Upcoming Bills - comes FIRST before Goals */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Próximos Vencimentos</Text>
            <TouchableOpacity onPress={() => router.push('/transactions')}>
              <Text style={styles.sectionLink}>Ver todos</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.billsList}>
            <View style={styles.billItem}>
              <View style={styles.billLeft}>
                <MaterialIcons name="flash-on" size={20} color={Colors.warning} />
                <Text style={styles.billName}>Energia</Text>
              </View>
              <View style={styles.billRight}>
                <Text style={styles.billValue}>R$ 280</Text>
                <Text style={styles.billDate}>27/11</Text>
              </View>
            </View>

            <View style={styles.billItem}>
              <View style={styles.billLeft}>
                <MaterialIcons name="water-drop" size={20} color={Colors.info} />
                <Text style={styles.billName}>Água</Text>
              </View>
              <View style={styles.billRight}>
                <Text style={styles.billValue}>R$ 95</Text>
                <Text style={styles.billDate}>30/11</Text>
              </View>
            </View>

            <View style={styles.billItem}>
              <View style={styles.billLeft}>
                <MaterialIcons name="wifi" size={20} color={Colors.gradientStart} />
                <Text style={styles.billName}>Internet</Text>
              </View>
              <View style={styles.billRight}>
                <Text style={styles.billValue}>R$ 120</Text>
                <Text style={styles.billDate}>05/12</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Goals Progress - comes AFTER bills */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Metas em Progresso</Text>
            <TouchableOpacity onPress={() => router.push('/goals')}>
              <Text style={styles.sectionLink}>Ver todas</Text>
            </TouchableOpacity>
          </View>

          <GlassCard style={styles.goalCard}>
            <View style={styles.goalHeader}>
              <MaterialIcons name="flight-takeoff" size={24} color={Colors.gradientStart} />
              <View style={styles.goalInfo}>
                <Text style={styles.goalName}>Viagem Europa</Text>
                <Text style={styles.goalSubtext}>Meta compartilhada 💑</Text>
              </View>
              <Text style={styles.goalPercentage}>57%</Text>
            </View>
            <View style={styles.progressBar}>
              <View style={[styles.progressFill, { width: '57%' }]} />
            </View>
          </GlassCard>

          <GlassCard style={styles.goalCard}>
            <View style={styles.goalHeader}>
              <MaterialIcons name="home" size={24} color={Colors.success} />
              <View style={styles.goalInfo}>
                <Text style={styles.goalName}>Entrada Apartamento</Text>
                <Text style={styles.goalSubtext}>Meta compartilhada 💑</Text>
              </View>
              <Text style={styles.goalPercentage}>64%</Text>
            </View>
            <View style={styles.progressBar}>
              <View style={[styles.progressFill, { width: '64%' }]} />
            </View>
          </GlassCard>
        </View>
      </ScrollView>

      <PartnerInviteModal
        visible={inviteModalVisible}
        onClose={() => setInviteModalVisible(false)}
        onSubmit={handleInvitePartner}
      />
    </GradientBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    paddingHorizontal: Spacing.md,
    paddingBottom: Spacing.xxl,
    gap: Spacing.lg,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  greeting: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
  },
  greetingText: {
    flex: 1,
  },
  greetingTitle: {
    fontSize: Typography.h4,
    fontWeight: Typography.bold,
    color: Colors.textWhite,
  },
  subtitle: {
    fontSize: Typography.bodySmall,
    color: Colors.textSecondary,
    marginTop: 2,
  },
  inviteBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: Spacing.md,
  },
  inviteContent: {
    flex: 1,
    marginLeft: Spacing.md,
    marginRight: Spacing.sm,
  },
  inviteTitle: {
    fontSize: Typography.body,
    fontWeight: Typography.bold,
    color: Colors.textWhite,
  },
  inviteText: {
    fontSize: Typography.bodySmall,
    color: Colors.textSecondary,
    marginTop: 2,
  },
  contextCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.02)',
    borderRadius: BorderRadius.md,
    padding: Spacing.md,
    gap: Spacing.sm,
  },
  contextLabel: {
    fontSize: Typography.caption,
    color: Colors.textSecondary,
    fontWeight: Typography.semiBold,
    marginBottom: 4,
  },
  contextRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
  },
  contextText: {
    fontSize: Typography.bodySmall,
    color: Colors.textSecondary,
  },
  actionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.sm,
  },
  actionCard: {
    flex: 1,
    minWidth: '48%',
    backgroundColor: Colors.glassBackground,
    borderRadius: BorderRadius.md,
    borderWidth: 1,
    borderColor: Colors.glassBorder,
    padding: Spacing.md,
    alignItems: 'center',
    gap: Spacing.sm,
  },
  actionIcon: {
    width: 56,
    height: 56,
    borderRadius: BorderRadius.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionText: {
    fontSize: Typography.bodySmall,
    color: Colors.textWhite,
    fontWeight: Typography.semiBold,
    textAlign: 'center',
    lineHeight: 18,
  },
  section: {
    gap: Spacing.sm,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  sectionTitle: {
    fontSize: Typography.h4,
    fontWeight: Typography.semiBold,
    color: Colors.textWhite,
  },
  sectionLink: {
    fontSize: Typography.bodySmall,
    color: Colors.gradientStart,
    fontWeight: Typography.semiBold,
  },
  goalCard: {
    gap: Spacing.sm,
  },
  goalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
  },
  goalInfo: {
    flex: 1,
  },
  goalName: {
    fontSize: Typography.body,
    fontWeight: Typography.semiBold,
    color: Colors.textWhite,
  },
  goalSubtext: {
    fontSize: Typography.caption,
    color: Colors.textSecondary,
    marginTop: 2,
  },
  goalPercentage: {
    fontSize: Typography.h4,
    fontWeight: Typography.bold,
    color: Colors.gradientStart,
  },
  progressBar: {
    height: 6,
    backgroundColor: 'rgba(0,0,0,0.2)',
    borderRadius: BorderRadius.full,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: Colors.gradientStart,
    borderRadius: BorderRadius.full,
  },
  billsList: {
    backgroundColor: Colors.glassBackground,
    borderRadius: BorderRadius.md,
    borderWidth: 1,
    borderColor: Colors.glassBorder,
    overflow: 'hidden',
  },
  billItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: Spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: Colors.glassBorder,
  },
  billLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
  },
  billName: {
    fontSize: Typography.body,
    color: Colors.textWhite,
    fontWeight: Typography.semiBold,
  },
  billRight: {
    alignItems: 'flex-end',
    gap: 2,
  },
  billValue: {
    fontSize: Typography.body,
    fontWeight: Typography.bold,
    color: Colors.textWhite,
  },
  billDate: {
    fontSize: Typography.caption,
    color: Colors.textSecondary,
  },
});
