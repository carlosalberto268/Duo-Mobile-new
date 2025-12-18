/**
 * Financial Status Component
 * Single number + human text (Apple-like simplicity)
 */
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors, Spacing, Typography, BorderRadius } from '@/constants/theme';
import { MaterialIcons } from '@expo/vector-icons';

interface FinancialStatusProps {
  availableAmount: number;
  status: 'good' | 'attention' | 'critical';
  daysLeft: number;
}

const STATUS_CONFIG = {
  good: {
    icon: 'check-circle' as const,
    color: Colors.success,
    text: 'Vocês estão dentro do planejado.',
    subtext: 'Continue assim! 🎯',
  },
  attention: {
    icon: 'warning' as const,
    color: Colors.warning,
    text: 'Este mês exige mais atenção.',
    subtext: 'Controlando os gastos vocês chegam lá ⚡',
  },
  critical: {
    icon: 'error' as const,
    color: Colors.error,
    text: 'Estamos gastando mais rápido que o ideal.',
    subtext: 'Que tal revisar juntos? 💡',
  },
};

export function FinancialStatus({ availableAmount, status, daysLeft }: FinancialStatusProps) {
  const config = STATUS_CONFIG[status];

  return (
    <View style={styles.container}>
      {/* Status Indicator */}
      <View style={styles.statusRow}>
        <MaterialIcons name={config.icon} size={20} color={config.color} />
        <Text style={styles.statusText}>{config.text}</Text>
      </View>

      {/* Main Number */}
      <Text style={styles.mainAmount}>
        R$ {availableAmount.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
      </Text>

      {/* Subtitle */}
      <Text style={styles.subtitle}>
        disponíveis até o fim do mês
      </Text>

      {/* Context */}
      <Text style={styles.context}>
        {config.subtext}
      </Text>

      {/* Days Indicator */}
      <View style={styles.daysIndicator}>
        <View style={[styles.daysDot, { backgroundColor: config.color }]} />
        <Text style={styles.daysText}>
          {daysLeft} {daysLeft === 1 ? 'dia restante' : 'dias restantes'}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.glassBackground,
    borderRadius: BorderRadius.lg,
    padding: Spacing.xl,
    borderWidth: 1,
    borderColor: Colors.glassBorder,
    alignItems: 'center',
  },
  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
    marginBottom: Spacing.lg,
  },
  statusText: {
    fontSize: Typography.body,
    color: Colors.textWhite,
    fontWeight: Typography.semiBold,
  },
  mainAmount: {
    fontSize: 56,
    fontWeight: Typography.bold,
    color: Colors.textWhite,
    letterSpacing: -2,
    marginBottom: Spacing.xs,
  },
  subtitle: {
    fontSize: Typography.body,
    color: Colors.textSecondary,
    marginBottom: Spacing.md,
  },
  context: {
    fontSize: Typography.bodySmall,
    color: Colors.textWhite,
    opacity: 0.8,
    textAlign: 'center',
    marginBottom: Spacing.lg,
  },
  daysIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    backgroundColor: 'rgba(255, 255, 255, 0.03)',
    borderRadius: BorderRadius.full,
  },
  daysDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  daysText: {
    fontSize: Typography.caption,
    color: Colors.textSecondary,
    fontWeight: Typography.semiBold,
  },
});
