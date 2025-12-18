/**
 * Input Component
 * Styled text input
 */
import React from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TextInputProps,
} from 'react-native';
import { Colors, Spacing, Typography, BorderRadius } from '@/constants/theme';

interface InputProps extends TextInputProps {
  label: string;
  error?: string;
}

export function Input({ label, error, ...props }: InputProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={[styles.input, error && styles.inputError]}
        placeholderTextColor={Colors.textSecondary}
        {...props}
      />
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: Spacing.md,
  },
  label: {
    fontSize: Typography.bodySmall,
    fontWeight: Typography.semiBold,
    color: Colors.textPrimary,
    marginBottom: Spacing.xs,
  },
  input: {
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: BorderRadius.sm,
    padding: Spacing.md,
    fontSize: Typography.body,
    color: Colors.textPrimary,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
  },
  inputError: {
    borderColor: Colors.expense,
  },
  errorText: {
    fontSize: Typography.caption,
    color: Colors.expense,
    marginTop: Spacing.xs,
  },
});
