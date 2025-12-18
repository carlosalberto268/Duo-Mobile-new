/**
 * GradientButton Component
 * Button with gradient background
 */
import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ViewStyle } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors, BorderRadius, Spacing, Typography, Shadows } from '@/constants/theme';

interface GradientButtonProps {
  title: string;
  onPress: () => void;
  style?: ViewStyle;
  disabled?: boolean;
}

export function GradientButton({ title, onPress, style, disabled }: GradientButtonProps) {
  return (
    <TouchableOpacity 
      onPress={onPress} 
      disabled={disabled}
      style={[styles.container, style]}
      activeOpacity={0.8}
    >
      <LinearGradient
        colors={[Colors.gradientStart, Colors.gradientEnd]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.gradient}
      >
        <Text style={styles.text}>{title}</Text>
      </LinearGradient>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: BorderRadius.md,
    overflow: 'hidden',
    ...Shadows.medium,
  },
  gradient: {
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.lg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: Colors.textWhite,
    fontSize: Typography.body,
    fontWeight: Typography.semiBold,
  },
});
