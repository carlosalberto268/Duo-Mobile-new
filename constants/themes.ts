/**
 * Budget Duo Theme System
 * Multiple theme configurations
 */

export interface Theme {
  id: string;
  name: string;
  colors: {
    gradientStart: string;
    gradientMiddle: string;
    gradientEnd: string;
    glassBackground: string;
    glassBorder: string;
    glassShadow: string;
    income: string;
    expense: string;
    neutral: string;
    textPrimary: string;
    textSecondary: string;
    textLight: string;
    textWhite: string;
    textDark: string;
    tabBarBackground: string;
    tabBarBorder: string;
    tabBarActive: string;
    tabBarInactive: string;
    background: string;
    backgroundDark: string;
    success: string;
    warning: string;
    error: string;
    info: string;
  };
}

// Dark Theme (Default)
export const DarkTheme: Theme = {
  id: 'dark',
  name: 'Escuro',
  colors: {
    gradientStart: '#667eea',
    gradientMiddle: '#764ba2',
    gradientEnd: '#f093fb',
    glassBackground: '#1a1a1a',
    glassBorder: 'rgba(255, 255, 255, 0.05)',
    glassShadow: 'rgba(0, 0, 0, 0.3)',
    income: '#10b981',
    expense: '#ef4444',
    neutral: '#6b7280',
    textPrimary: '#ffffff',
    textSecondary: '#6b7280',
    textLight: '#6b7280',
    textWhite: '#ffffff',
    textDark: '#1f2937',
    tabBarBackground: '#1a1a1a',
    tabBarBorder: 'rgba(255, 255, 255, 0.05)',
    tabBarActive: '#667eea',
    tabBarInactive: '#6b7280',
    background: '#000000',
    backgroundDark: '#000000',
    success: '#10b981',
    warning: '#f59e0b',
    error: '#ef4444',
    info: '#3b82f6',
  },
};

// Light Theme
export const LightTheme: Theme = {
  id: 'light',
  name: 'Claro',
  colors: {
    gradientStart: '#667eea',
    gradientMiddle: '#764ba2',
    gradientEnd: '#f093fb',
    glassBackground: '#ffffff',
    glassBorder: 'rgba(0, 0, 0, 0.08)',
    glassShadow: 'rgba(0, 0, 0, 0.15)',
    income: '#059669',
    expense: '#dc2626',
    neutral: '#6b7280',
    textPrimary: '#1f2937',
    textSecondary: '#6b7280',
    textLight: '#9ca3af',
    textWhite: '#ffffff',
    textDark: '#1f2937',
    tabBarBackground: '#ffffff',
    tabBarBorder: 'rgba(0, 0, 0, 0.08)',
    tabBarActive: '#667eea',
    tabBarInactive: '#6b7280',
    background: '#f3f4f6',
    backgroundDark: '#e5e7eb',
    success: '#059669',
    warning: '#d97706',
    error: '#dc2626',
    info: '#2563eb',
  },
};

// Ocean Theme
export const OceanTheme: Theme = {
  id: 'ocean',
  name: 'Oceano',
  colors: {
    gradientStart: '#0ea5e9',
    gradientMiddle: '#0284c7',
    gradientEnd: '#0369a1',
    glassBackground: '#082f49',
    glassBorder: 'rgba(14, 165, 233, 0.2)',
    glassShadow: 'rgba(0, 0, 0, 0.4)',
    income: '#22d3ee',
    expense: '#f97316',
    neutral: '#64748b',
    textPrimary: '#f0f9ff',
    textSecondary: '#94a3b8',
    textLight: '#cbd5e1',
    textWhite: '#ffffff',
    textDark: '#0c4a6e',
    tabBarBackground: '#0c4a6e',
    tabBarBorder: 'rgba(14, 165, 233, 0.2)',
    tabBarActive: '#0ea5e9',
    tabBarInactive: '#64748b',
    background: '#0c4a6e',
    backgroundDark: '#082f49',
    success: '#22d3ee',
    warning: '#fb923c',
    error: '#f97316',
    info: '#38bdf8',
  },
};

// Forest Theme
export const ForestTheme: Theme = {
  id: 'forest',
  name: 'Floresta',
  colors: {
    gradientStart: '#22c55e',
    gradientMiddle: '#16a34a',
    gradientEnd: '#15803d',
    glassBackground: '#052e16',
    glassBorder: 'rgba(34, 197, 94, 0.2)',
    glassShadow: 'rgba(0, 0, 0, 0.4)',
    income: '#4ade80',
    expense: '#fb923c',
    neutral: '#78716c',
    textPrimary: '#f0fdf4',
    textSecondary: '#a8a29e',
    textLight: '#d6d3d1',
    textWhite: '#ffffff',
    textDark: '#14532d',
    tabBarBackground: '#14532d',
    tabBarBorder: 'rgba(34, 197, 94, 0.2)',
    tabBarActive: '#22c55e',
    tabBarInactive: '#78716c',
    background: '#14532d',
    backgroundDark: '#052e16',
    success: '#4ade80',
    warning: '#fbbf24',
    error: '#f87171',
    info: '#60a5fa',
  },
};

export const THEMES = [DarkTheme, LightTheme, OceanTheme, ForestTheme];

export const getThemeById = (id: string): Theme => {
  return THEMES.find((theme) => theme.id === id) || DarkTheme;
};
