/**
 * StatPill Component
 * Compact stat display with icon
 */
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { GlassCard } from './GlassCard';
import { Colors, Spacing, Typography } from '@/constants/theme';

interface StatPillProps {
  icon: keyof typeof MaterialIcons.glyphMap;
  label: string;
  value: string;
  color?: string;
}

export function StatPill({ icon, label, value, color = Colors.gradientStart }: StatPillProps) {
  return (
    <GlassCard style={styles.container}>
      <MaterialIcons name={icon} size={24} color={color} />
      <View style={styles.textContainer}>
        <Text style={styles.label}>{label}</Text>
        <Text style={[styles.value, { color }]}>{value}</Text>
      </View>
    </GlassCard>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: Spacing.sm,
    paddingHorizontal: Spacing.md,
    minWidth: 140,
  },
  textContainer: {
    marginLeft: Spacing.sm,
  },
  label: {
    fontSize: Typography.caption,
    color: Colors.textSecondary,
    fontWeight: Typography.regular,
  },
  value: {
    fontSize: Typography.body,
    fontWeight: Typography.bold,
    marginTop: 2,
  },
});
