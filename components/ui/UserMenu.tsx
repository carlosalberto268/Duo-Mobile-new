/**
 * UserMenu Component
 * Displays user avatar with partner overlay and dropdown menu
 */
import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
  Image,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { Colors, Spacing, Typography, BorderRadius } from '@/constants/theme';
import { GlassCard } from './GlassCard';

interface UserMenuProps {
  user: {
    name: string;
    email: string;
    avatar_url?: string;
  };
  partner?: {
    name: string;
    avatar_url?: string;
  };
  onLogout: () => void;
  onProfile: () => void;
}

export function UserMenu({ user, partner, onLogout, onProfile }: UserMenuProps) {
  const [visible, setVisible] = useState(false);

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <>
      <TouchableOpacity
        style={styles.trigger}
        onPress={() => setVisible(true)}
        activeOpacity={0.7}
      >
        <View style={styles.avatarContainer}>
          {/* Main user avatar */}
          <View style={styles.mainAvatar}>
            {user.avatar_url ? (
              <Image source={{ uri: user.avatar_url }} style={styles.avatarImage} />
            ) : (
              <View style={styles.avatarPlaceholder}>
                <Text style={styles.initials}>{getInitials(user.name)}</Text>
              </View>
            )}
          </View>

          {/* Partner avatar overlay */}
          {partner && (
            <View style={styles.partnerAvatar}>
              {partner.avatar_url ? (
                <Image source={{ uri: partner.avatar_url }} style={styles.partnerImage} />
              ) : (
                <View style={styles.partnerPlaceholder}>
                  <Text style={styles.partnerInitials}>{getInitials(partner.name)}</Text>
                </View>
              )}
            </View>
          )}
        </View>

        <View style={styles.userInfo}>
          <Text style={styles.userName} numberOfLines={1}>
            {user.name}
          </Text>
          <Text style={styles.userEmail} numberOfLines={1}>
            {user.email}
          </Text>
        </View>

        <MaterialIcons name="keyboard-arrow-down" size={20} color={Colors.textWhite} />
      </TouchableOpacity>

      <Modal
        visible={visible}
        transparent
        animationType="fade"
        onRequestClose={() => setVisible(false)}
      >
        <TouchableOpacity
          style={styles.overlay}
          activeOpacity={1}
          onPress={() => setVisible(false)}
        >
          <View style={styles.dropdown}>
            <GlassCard style={styles.menuCard}>
              <TouchableOpacity
                style={styles.menuItem}
                onPress={() => {
                  setVisible(false);
                  onProfile();
                }}
              >
                <MaterialIcons name="person" size={20} color={Colors.textWhite} />
                <Text style={styles.menuText}>Meu Perfil</Text>
              </TouchableOpacity>

              {partner && (
                <TouchableOpacity style={styles.menuItem}>
                  <MaterialIcons name="favorite" size={20} color={Colors.expense} />
                  <Text style={styles.menuText}>Parceiro: {partner.name}</Text>
                </TouchableOpacity>
              )}

              <View style={styles.divider} />

              <TouchableOpacity
                style={styles.menuItem}
                onPress={() => {
                  setVisible(false);
                  onLogout();
                }}
              >
                <MaterialIcons name="logout" size={20} color={Colors.error} />
                <Text style={[styles.menuText, { color: Colors.error }]}>Sair</Text>
              </TouchableOpacity>
            </GlassCard>
          </View>
        </TouchableOpacity>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  trigger: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
  },
  avatarContainer: {
    position: 'relative',
    width: 40,
    height: 40,
  },
  mainAvatar: {
    width: 40,
    height: 40,
    borderRadius: BorderRadius.full,
    overflow: 'hidden',
  },
  avatarImage: {
    width: '100%',
    height: '100%',
  },
  avatarPlaceholder: {
    width: '100%',
    height: '100%',
    backgroundColor: Colors.gradientStart,
    alignItems: 'center',
    justifyContent: 'center',
  },
  initials: {
    fontSize: Typography.body,
    fontWeight: Typography.bold,
    color: Colors.textWhite,
  },
  partnerAvatar: {
    position: 'absolute',
    bottom: -4,
    right: -4,
    width: 24,
    height: 24,
    borderRadius: BorderRadius.full,
    borderWidth: 2,
    borderColor: Colors.background,
    overflow: 'hidden',
  },
  partnerImage: {
    width: '100%',
    height: '100%',
  },
  partnerPlaceholder: {
    width: '100%',
    height: '100%',
    backgroundColor: Colors.expense,
    alignItems: 'center',
    justifyContent: 'center',
  },
  partnerInitials: {
    fontSize: Typography.tiny,
    fontWeight: Typography.bold,
    color: Colors.textWhite,
  },
  userInfo: {
    flex: 1,
    marginRight: Spacing.xs,
  },
  userName: {
    fontSize: Typography.bodySmall,
    fontWeight: Typography.semiBold,
    color: Colors.textWhite,
  },
  userEmail: {
    fontSize: Typography.caption,
    color: Colors.textSecondary,
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-start',
    paddingTop: 60,
    paddingHorizontal: Spacing.md,
  },
  dropdown: {
    alignItems: 'flex-start',
  },
  menuCard: {
    minWidth: 200,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    paddingVertical: Spacing.sm,
  },
  menuText: {
    fontSize: Typography.body,
    color: Colors.textWhite,
  },
  divider: {
    height: 1,
    backgroundColor: Colors.glassBorder,
    marginVertical: Spacing.xs,
  },
});
