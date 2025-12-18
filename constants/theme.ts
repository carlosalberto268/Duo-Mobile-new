/**
 * Budget Duo Design System
 * Color palette, typography, spacing tokens
 */

export const Colors = {
  // Gradient colors
  gradientStart: '#667eea',
  gradientMiddle: '#764ba2',
  gradientEnd: '#f093fb',
  
  // Glass effect (Dark cards)
  glassBackground: '#1a1a1a',
  glassBorder: 'rgba(255, 255, 255, 0.05)',
  glassShadow: 'rgba(0, 0, 0, 0.3)',
  
  // Status colors
  income: '#10b981',
  expense: '#ef4444',
  neutral: '#6b7280',
  
  // Text colors
  textPrimary: '#ffffff',
  textSecondary: '#6b7280',
  textLight: '#6b7280',
  textWhite: '#ffffff',
  textDark: '#1f2937',
  
  // Tab bar
  tabBarBackground: '#1a1a1a',
  tabBarBorder: 'rgba(255, 255, 255, 0.05)',
  tabBarActive: '#667eea',
  tabBarInactive: '#6b7280',
  
  // Background
  background: '#000000',
  backgroundDark: '#000000',
  
  // Additional
  success: '#10b981',
  warning: '#f59e0b',
  error: '#ef4444',
  info: '#3b82f6',
};

export const Typography = {
  // Font family
  fontFamily: 'Inter',
  
  // Font sizes
  h1: 32,
  h2: 28,
  h3: 24,
  h4: 20,
  body: 16,
  bodySmall: 14,
  caption: 12,
  tiny: 10,
  
  // Font weights
  regular: '400' as const,
  semiBold: '600' as const,
  bold: '700' as const,
};

export const Spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};

export const BorderRadius = {
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  full: 9999,
};

export const Shadows = {
  small: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  medium: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 4,
  },
  large: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 16,
    elevation: 8,
  },
};
