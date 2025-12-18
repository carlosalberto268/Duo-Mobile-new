/**
 * Couple Avatar Component
 * Displays overlapping avatars for couple (Apple-like)
 */
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors, Typography } from '@/constants/theme';

interface CoupleAvatarProps {
  user: {
    name: string;
    avatar_url?: string;
  };
  partner?: {
    name: string;
    avatar_url?: string;
  };
  size?: 'small' | 'medium' | 'large';
}

export function CoupleAvatar({ user, partner, size = 'medium' }: CoupleAvatarProps) {
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .slice(0, 2)
      .join('')
      .toUpperCase();
  };

  const sizes = {
    small: 32,
    medium: 40,
    large: 56,
  };

  const fontSize = {
    small: 12,
    medium: 14,
    large: 18,
  };

  const avatarSize = sizes[size];
  const textSize = fontSize[size];

  if (!partner) {
    return (
      <View style={[styles.singleAvatar, { width: avatarSize, height: avatarSize }]}>
        <Text style={[styles.avatarText, { fontSize: textSize }]}>
          {getInitials(user.name)}
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View
        style={[
          styles.avatar,
          styles.avatarBack,
          { width: avatarSize, height: avatarSize },
        ]}
      >
        <Text style={[styles.avatarText, { fontSize: textSize }]}>
          {getInitials(user.name)}
        </Text>
      </View>
      <View
        style={[
          styles.avatar,
          styles.avatarFront,
          { width: avatarSize, height: avatarSize, marginLeft: -avatarSize * 0.3 },
        ]}
      >
        <Text style={[styles.avatarText, { fontSize: textSize }]}>
          {getInitials(partner.name)}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  singleAvatar: {
    borderRadius: 9999,
    backgroundColor: Colors.gradientStart,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatar: {
    borderRadius: 9999,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 3,
    borderColor: Colors.background,
  },
  avatarBack: {
    backgroundColor: Colors.gradientStart,
    zIndex: 1,
  },
  avatarFront: {
    backgroundColor: Colors.gradientEnd,
    zIndex: 2,
  },
  avatarText: {
    fontWeight: Typography.bold,
    color: Colors.textWhite,
  },
});
