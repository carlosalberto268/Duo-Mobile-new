/**
 * DarkBackground Component
 * Solid black background for dark mode
 */
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Colors } from '@/constants/theme';

interface GradientBackgroundProps {
  children: React.ReactNode;
}

export function GradientBackground({ children }: GradientBackgroundProps) {
  return (
    <View style={styles.container}>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
});
