/**
 * Jornada Duo Screen
 * Gamification and couple's financial progress
 */
import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Modal,
  TextInput,
  Alert,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { GradientBackground } from '@/components/layout';
import { GlassCard, GradientButton } from '@/components/ui';
import { Colors, Spacing, Typography, BorderRadius } from '@/constants/theme';
import { MaterialIcons } from '@expo/vector-icons';
import { ACHIEVEMENTS, RARITY_COLORS } from '@/constants/data';

export default function JourneyScreen() {
  const insets = useSafeAreaInsets();
  const [agreementsModalVisible, setAgreementsModalVisible] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  // Mock data
  const userLevel = 5;
  const currentXP = 750;
  const nextLevelXP = 1000;
  const savingsRate = 27; // percentage
  const netWorth = 45200;

  // Mock unlocked achievements
  const unlockedAchievements = ['b1', 'b2', 'b11', 'b31'];

  const getFinancialStatus = (rate: number) => {
    if (rate < 10) return { title: 'Gastador Nato', icon: 'shopping-cart', color: Colors.error };
    if (rate < 20)
      return { title: 'Equilibrando os Pratos', icon: 'balance', color: Colors.warning };
    if (rate < 30)
      return { title: 'Poupador Consciente', icon: 'savings', color: Colors.info };
    return { title: 'Investidor Sagaz', icon: 'trending-up', color: Colors.success };
  };

  const status = getFinancialStatus(savingsRate);

  const missions = [
    {
      id: 1,
      title: 'Categorizar todas as despesas do mês',
      xp: 50,
      completed: true,
    },
    {
      id: 2,
      title: 'Criar uma meta de economia',
      xp: 100,
      completed: true,
    },
    {
      id: 3,
      title: 'Reduzir gastos com lazer em 10%',
      xp: 150,
      completed: false,
    },
    {
      id: 4,
      title: 'Conversar sobre finanças com o parceiro',
      xp: 75,
      completed: false,
    },
  ];

  const categories = [
    { id: 'all', label: 'Todas', icon: 'apps' },
    { id: 'registro', label: 'Registro', icon: 'edit' },
    { id: 'metas', label: 'Metas', icon: 'flag' },
    { id: 'colaboracao', label: 'Colaboração', icon: 'people' },
    { id: 'contas', label: 'Contas', icon: 'account-balance' },
    { id: 'habitos', label: 'Hábitos', icon: 'auto-awesome' },
  ];

  const filteredAchievements =
    selectedCategory === 'all'
      ? ACHIEVEMENTS
      : ACHIEVEMENTS.filter((a) => a.category === selectedCategory);

  const newAchievementsCount = unlockedAchievements.length;

  return (
    <GradientBackground>
      <ScrollView
        style={styles.container}
        contentContainerStyle={[
          styles.contentContainer,
          { paddingTop: insets.top + Spacing.md },
        ]}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <Text style={styles.title}>Jornada Duo 🚀</Text>
        <Text style={styles.subtitle}>
          Vocês estão construindo um futuro financeiro incrível juntos!
        </Text>

        {/* Status Card */}
        <GlassCard style={styles.statusCard}>
          <View style={styles.statusHeader}>
            <View style={[styles.statusIcon, { backgroundColor: status.color }]}>
              <MaterialIcons name={status.icon} size={32} color={Colors.textWhite} />
            </View>
            <View style={styles.statusInfo}>
              <Text style={styles.statusLabel}>Status Financeiro</Text>
              <Text style={styles.statusTitle}>{status.title}</Text>
            </View>
          </View>
        </GlassCard>

        {/* Level and XP */}
        <GlassCard style={styles.levelCard}>
          <View style={styles.levelHeader}>
            <Text style={styles.levelLabel}>Nível do Casal</Text>
            <Text style={styles.levelNumber}>{userLevel}</Text>
          </View>
          <View style={styles.xpBar}>
            <View style={[styles.xpFill, { width: `${(currentXP / nextLevelXP) * 100}%` }]} />
          </View>
          <Text style={styles.xpText}>
            {currentXP} / {nextLevelXP} XP
          </Text>
        </GlassCard>

        {/* Financial Summary */}
        <View style={styles.summaryRow}>
          <GlassCard style={styles.summaryCard}>
            <MaterialIcons name="account-balance-wallet" size={24} color={Colors.success} />
            <Text style={styles.summaryLabel}>Patrimônio Líquido</Text>
            <Text style={styles.summaryValue}>
              R$ {netWorth.toLocaleString('pt-BR')}
            </Text>
          </GlassCard>

          <GlassCard style={styles.summaryCard}>
            <MaterialIcons name="trending-up" size={24} color={Colors.gradientStart} />
            <Text style={styles.summaryLabel}>Taxa de Poupança</Text>
            <Text style={styles.summaryValue}>{savingsRate}%</Text>
          </GlassCard>
        </View>

        {/* Action Plan */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Plano de Ação 📋</Text>
          {missions.map(mission => (
            <GlassCard key={mission.id} style={styles.missionCard}>
              <View style={styles.missionHeader}>
                <MaterialIcons
                  name={mission.completed ? 'check-circle' : 'radio-button-unchecked'}
                  size={24}
                  color={mission.completed ? Colors.success : Colors.textSecondary}
                />
                <View style={styles.missionInfo}>
                  <Text
                    style={[
                      styles.missionTitle,
                      mission.completed && styles.missionCompleted,
                    ]}
                  >
                    {mission.title}
                  </Text>
                  <Text style={styles.missionXP}>+{mission.xp} XP</Text>
                </View>
              </View>
            </GlassCard>
          ))}
        </View>

        {/* Our Agreements */}
        <GradientButton
          title="Nossos Acordos 🤝"
          onPress={() => setAgreementsModalVisible(true)}
          style={styles.agreementsButton}
        />

        {/* Achievement Gallery */}
        <View style={styles.section}>
          <View style={styles.achievementHeader}>
            <Text style={styles.sectionTitle}>Conquistas 🏆</Text>
            {newAchievementsCount > 0 && (
              <View style={styles.newBadge}>
                <Text style={styles.newBadgeText}>{newAchievementsCount} novas</Text>
              </View>
            )}
          </View>

          {/* Category Filter */}
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.categoryFilter}
            contentContainerStyle={styles.categoryFilterContent}
          >
            {categories.map((cat) => (
              <TouchableOpacity
                key={cat.id}
                style={[
                  styles.categoryChip,
                  selectedCategory === cat.id && styles.categoryChipActive,
                ]}
                onPress={() => setSelectedCategory(cat.id)}
              >
                <MaterialIcons
                  name={cat.icon}
                  size={18}
                  color={selectedCategory === cat.id ? Colors.textWhite : Colors.textSecondary}
                />
                <Text
                  style={[
                    styles.categoryChipText,
                    selectedCategory === cat.id && styles.categoryChipTextActive,
                  ]}
                >
                  {cat.label}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

          <View style={styles.achievementGrid}>
            {filteredAchievements.map((achievement) => {
              const isUnlocked = unlockedAchievements.includes(achievement.id);
              return (
                <TouchableOpacity
                  key={achievement.id}
                  style={[
                    styles.achievementCard,
                    !isUnlocked && styles.achievementLocked,
                    isUnlocked && {
                      borderColor: RARITY_COLORS[achievement.rarity],
                      shadowColor: RARITY_COLORS[achievement.rarity],
                      shadowOpacity: 0.3,
                      shadowRadius: 8,
                      elevation: 4,
                    },
                  ]}
                  onPress={() => {
                    Alert.alert(
                      `${achievement.emoji} ${achievement.title}`,
                      `${achievement.description}\n\n+${achievement.xp} XP • ${
                        achievement.rarity === 'common'
                          ? 'Comum'
                          : achievement.rarity === 'uncommon'
                          ? 'Incomum'
                          : achievement.rarity === 'rare'
                          ? 'Rara'
                          : achievement.rarity === 'epic'
                          ? 'Épica'
                          : 'Lendária'
                      }`,
                      [{ text: 'OK' }]
                    );
                  }}
                >
                  <Text style={styles.achievementEmoji}>{achievement.emoji}</Text>
                  <Text
                    style={[
                      styles.achievementTitle,
                      !isUnlocked && styles.achievementTitleLocked,
                    ]}
                    numberOfLines={2}
                  >
                    {achievement.title}
                  </Text>
                  {isUnlocked && (
                    <View style={styles.achievementXP}>
                      <Text style={styles.achievementXPText}>+{achievement.xp}</Text>
                    </View>
                  )}
                </TouchableOpacity>
              );
            })}
          </View>
        </View>
      </ScrollView>

      {/* Agreements Modal */}
      <Modal
        visible={agreementsModalVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setAgreementsModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <GlassCard style={styles.modalCard}>
              <View style={styles.modalHeader}>
                <Text style={styles.modalTitle}>Nossos Acordos 🤝</Text>
                <TouchableOpacity onPress={() => setAgreementsModalVisible(false)}>
                  <MaterialIcons name="close" size={24} color={Colors.textWhite} />
                </TouchableOpacity>
              </View>

              <ScrollView style={styles.modalContent} showsVerticalScrollIndicator={false}>
                <Text style={styles.inputLabel}>Limite de Gastos Individual</Text>
                <TextInput
                  style={styles.input}
                  placeholder="R$ 0,00"
                  placeholderTextColor={Colors.textSecondary}
                  keyboardType="numeric"
                />

                <Text style={styles.inputLabel}>Divisão de Despesas</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Ex: 50/50, 60/40..."
                  placeholderTextColor={Colors.textSecondary}
                />

                <Text style={styles.inputLabel}>Meta de Poupança Mensal</Text>
                <TextInput
                  style={styles.input}
                  placeholder="R$ 0,00"
                  placeholderTextColor={Colors.textSecondary}
                  keyboardType="numeric"
                />

                <Text style={styles.inputLabel}>Regras Personalizadas</Text>
                <TextInput
                  style={[styles.input, styles.textArea]}
                  placeholder="Escreva suas regras aqui..."
                  placeholderTextColor={Colors.textSecondary}
                  multiline
                  numberOfLines={4}
                  textAlignVertical="top"
                />

                <GradientButton
                  title="Salvar Acordos"
                  onPress={() => {
                    Alert.alert('Sucesso!', 'Acordos salvos com sucesso!');
                    setAgreementsModalVisible(false);
                  }}
                  style={styles.saveButton}
                />
              </ScrollView>
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
  },
  contentContainer: {
    paddingHorizontal: Spacing.md,
    paddingBottom: Spacing.xxl,
  },
  title: {
    fontSize: Typography.h2,
    fontWeight: Typography.bold,
    color: Colors.textWhite,
    marginBottom: Spacing.xs,
  },
  subtitle: {
    fontSize: Typography.body,
    color: Colors.textWhite,
    opacity: 0.9,
    marginBottom: Spacing.lg,
  },
  statusCard: {
    marginBottom: Spacing.md,
  },
  statusHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusIcon: {
    width: 60,
    height: 60,
    borderRadius: BorderRadius.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  statusInfo: {
    marginLeft: Spacing.md,
    flex: 1,
  },
  statusLabel: {
    fontSize: Typography.bodySmall,
    color: Colors.textSecondary,
  },
  statusTitle: {
    fontSize: Typography.h4,
    fontWeight: Typography.bold,
    color: Colors.textWhite,
    marginTop: 4,
  },
  levelCard: {
    marginBottom: Spacing.md,
  },
  levelHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.sm,
  },
  levelLabel: {
    fontSize: Typography.body,
    color: Colors.textWhite,
    fontWeight: Typography.semiBold,
  },
  levelNumber: {
    fontSize: Typography.h3,
    fontWeight: Typography.bold,
    color: Colors.gradientStart,
  },
  xpBar: {
    height: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: BorderRadius.full,
    overflow: 'hidden',
    marginVertical: Spacing.sm,
  },
  xpFill: {
    height: '100%',
    backgroundColor: Colors.gradientStart,
    borderRadius: BorderRadius.full,
  },
  xpText: {
    fontSize: Typography.bodySmall,
    color: Colors.textSecondary,
    textAlign: 'right',
  },
  summaryRow: {
    flexDirection: 'row',
    gap: Spacing.sm,
    marginBottom: Spacing.md,
  },
  summaryCard: {
    flex: 1,
    alignItems: 'center',
  },
  summaryLabel: {
    fontSize: Typography.bodySmall,
    color: Colors.textSecondary,
    textAlign: 'center',
    marginTop: Spacing.xs,
  },
  summaryValue: {
    fontSize: Typography.h4,
    fontWeight: Typography.bold,
    color: Colors.textWhite,
    marginTop: 4,
  },
  section: {
    marginBottom: Spacing.lg,
  },
  sectionTitle: {
    fontSize: Typography.h4,
    fontWeight: Typography.bold,
    color: Colors.textWhite,
    marginBottom: Spacing.md,
  },
  missionCard: {
    marginBottom: Spacing.sm,
  },
  missionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  missionInfo: {
    marginLeft: Spacing.sm,
    flex: 1,
  },
  missionTitle: {
    fontSize: Typography.body,
    color: Colors.textWhite,
    fontWeight: Typography.semiBold,
  },
  missionCompleted: {
    textDecorationLine: 'line-through',
    color: Colors.textSecondary,
  },
  missionXP: {
    fontSize: Typography.bodySmall,
    color: Colors.gradientStart,
    marginTop: 2,
  },
  agreementsButton: {
    marginBottom: Spacing.lg,
  },
  achievementHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.md,
  },
  newBadge: {
    backgroundColor: Colors.error,
    paddingHorizontal: Spacing.sm,
    paddingVertical: 4,
    borderRadius: BorderRadius.full,
  },
  newBadgeText: {
    fontSize: Typography.caption,
    color: Colors.textWhite,
    fontWeight: Typography.bold,
  },
  categoryFilter: {
    marginBottom: Spacing.md,
  },
  categoryFilterContent: {
    gap: Spacing.xs,
  },
  categoryChip: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.sm,
    paddingVertical: Spacing.xs,
    borderRadius: BorderRadius.full,
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderWidth: 1,
    borderColor: Colors.glassBorder,
    gap: 4,
  },
  categoryChipActive: {
    backgroundColor: Colors.gradientStart,
    borderColor: Colors.gradientStart,
  },
  categoryChipText: {
    fontSize: Typography.bodySmall,
    color: Colors.textSecondary,
  },
  categoryChipTextActive: {
    color: Colors.textWhite,
    fontWeight: Typography.semiBold,
  },
  achievementGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.sm,
  },
  achievementCard: {
    width: '31%',
    aspectRatio: 1,
    backgroundColor: Colors.glassBackground,
    borderRadius: BorderRadius.md,
    borderWidth: 2,
    borderColor: Colors.glassBorder,
    alignItems: 'center',
    justifyContent: 'center',
    padding: Spacing.sm,
    position: 'relative',
  },
  achievementLocked: {
    opacity: 0.4,
  },
  achievementEmoji: {
    fontSize: 32,
    marginBottom: Spacing.xs,
  },
  achievementTitle: {
    fontSize: Typography.caption,
    color: Colors.textWhite,
    textAlign: 'center',
    fontWeight: Typography.semiBold,
  },
  achievementTitleLocked: {
    color: Colors.textSecondary,
  },
  achievementXP: {
    position: 'absolute',
    top: 4,
    right: 4,
    backgroundColor: RARITY_COLORS.legendary,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: BorderRadius.sm,
  },
  achievementXPText: {
    fontSize: Typography.tiny,
    color: Colors.textWhite,
    fontWeight: Typography.bold,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    justifyContent: 'flex-end',
  },
  modalContainer: {
    maxHeight: '80%',
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
    maxHeight: 400,
  },
  inputLabel: {
    fontSize: Typography.body,
    color: Colors.textWhite,
    marginBottom: Spacing.xs,
    marginTop: Spacing.sm,
  },
  input: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: BorderRadius.md,
    borderWidth: 1,
    borderColor: Colors.glassBorder,
    padding: Spacing.md,
    fontSize: Typography.body,
    color: Colors.textWhite,
    marginBottom: Spacing.sm,
  },
  textArea: {
    height: 100,
  },
  saveButton: {
    marginTop: Spacing.md,
  },
});
