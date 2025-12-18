/**
 * NotificationBell Component
 * Bell icon with badge counter and dropdown list
 */
import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
  ScrollView,
  Alert,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import { Colors, Spacing, Typography, BorderRadius } from '@/constants/theme';
import { GlassCard } from './GlassCard';
import { PulsingDot } from './PulsingDot';

interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error' | 'partner' | 'goal' | 'transaction';
  is_read: boolean;
  created_at: string;
}

interface NotificationBellProps {
  notifications: Notification[];
  hasPartner?: boolean;
  onMarkAsRead: (id: string) => void;
  onMarkAllAsRead: () => void;
  onClearAll: () => void;
}

export function NotificationBell({
  notifications,
  hasPartner = false,
  onMarkAsRead,
  onMarkAllAsRead,
  onClearAll,
}: NotificationBellProps) {
  const [visible, setVisible] = useState(false);
  const insets = useSafeAreaInsets();

  const unreadCount = notifications.filter(n => !n.is_read).length;

  const getIcon = (type: Notification['type']) => {
    switch (type) {
      case 'success':
        return 'check-circle';
      case 'warning':
        return 'warning';
      case 'error':
        return 'error';
      case 'partner':
        return 'favorite';
      case 'goal':
        return 'flag';
      case 'transaction':
        return 'receipt';
      default:
        return 'info';
    }
  };

  const getIconColor = (type: Notification['type']) => {
    switch (type) {
      case 'success':
        return Colors.success;
      case 'warning':
        return Colors.warning;
      case 'error':
        return Colors.error;
      case 'partner':
        return Colors.expense;
      case 'goal':
        return Colors.gradientStart;
      case 'transaction':
        return Colors.info;
      default:
        return Colors.textSecondary;
    }
  };

  const handleNotificationPress = (notification: Notification) => {
    if (!notification.is_read) {
      onMarkAsRead(notification.id);
    }
    Alert.alert(notification.title, notification.message);
  };

  return (
    <>
      <TouchableOpacity
        style={styles.trigger}
        onPress={() => setVisible(true)}
        activeOpacity={0.7}
      >
        <MaterialIcons name="notifications-none" size={28} color={Colors.textWhite} />
        {unreadCount > 0 && (
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{unreadCount > 9 ? '9+' : unreadCount}</Text>
          </View>
        )}
        {hasPartner && <PulsingDot />}
      </TouchableOpacity>

      <Modal
        visible={visible}
        transparent
        animationType="slide"
        onRequestClose={() => setVisible(false)}
      >
        <View style={[styles.overlay, { paddingTop: insets.top }]}>
          <View style={styles.container}>
            <GlassCard style={styles.card}>
              {/* Header */}
              <View style={styles.header}>
                <Text style={styles.title}>Notificações</Text>
                <TouchableOpacity onPress={() => setVisible(false)}>
                  <MaterialIcons name="close" size={24} color={Colors.textWhite} />
                </TouchableOpacity>
              </View>

              {/* Actions */}
              {notifications.length > 0 && (
                <View style={styles.actions}>
                  <TouchableOpacity
                    onPress={() => {
                      onMarkAllAsRead();
                    }}
                  >
                    <Text style={styles.actionText}>Marcar todas como lidas</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => {
                      Alert.alert(
                        'Limpar Notificações',
                        'Tem certeza que deseja apagar todas as notificações?',
                        [
                          { text: 'Cancelar', style: 'cancel' },
                          {
                            text: 'Limpar',
                            style: 'destructive',
                            onPress: () => {
                              onClearAll();
                              setVisible(false);
                            },
                          },
                        ]
                      );
                    }}
                  >
                    <Text style={[styles.actionText, { color: Colors.error }]}>
                      Limpar todas
                    </Text>
                  </TouchableOpacity>
                </View>
              )}

              {/* Notifications List */}
              <ScrollView
                style={styles.list}
                contentContainerStyle={styles.listContent}
                showsVerticalScrollIndicator={false}
              >
                {notifications.length === 0 ? (
                  <View style={styles.empty}>
                    <MaterialIcons
                      name="notifications-off"
                      size={48}
                      color={Colors.textSecondary}
                    />
                    <Text style={styles.emptyText}>Nenhuma notificação</Text>
                  </View>
                ) : (
                  notifications.map(notification => (
                    <TouchableOpacity
                      key={notification.id}
                      style={[
                        styles.notificationItem,
                        !notification.is_read && styles.unreadItem,
                      ]}
                      onPress={() => handleNotificationPress(notification)}
                    >
                      {!notification.is_read && <View style={styles.unreadDot} />}
                      <MaterialIcons
                        name={getIcon(notification.type)}
                        size={24}
                        color={getIconColor(notification.type)}
                        style={styles.notificationIcon}
                      />
                      <View style={styles.notificationContent}>
                        <Text
                          style={[
                            styles.notificationTitle,
                            !notification.is_read && styles.unreadText,
                          ]}
                        >
                          {notification.title}
                        </Text>
                        <Text style={styles.notificationMessage} numberOfLines={2}>
                          {notification.message}
                        </Text>
                        <Text style={styles.notificationTime}>
                          {new Date(notification.created_at).toLocaleDateString('pt-BR', {
                            day: '2-digit',
                            month: 'short',
                            hour: '2-digit',
                            minute: '2-digit',
                          })}
                        </Text>
                      </View>
                    </TouchableOpacity>
                  ))
                )}
              </ScrollView>
            </GlassCard>
          </View>
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  trigger: {
    position: 'relative',
    padding: Spacing.xs,
  },
  badge: {
    position: 'absolute',
    top: 0,
    right: 0,
    backgroundColor: Colors.error,
    borderRadius: BorderRadius.full,
    minWidth: 18,
    height: 18,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 4,
  },
  badgeText: {
    fontSize: Typography.tiny,
    fontWeight: Typography.bold,
    color: Colors.textWhite,
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    justifyContent: 'flex-end',
  },
  container: {
    maxHeight: '80%',
  },
  card: {
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.md,
  },
  title: {
    fontSize: Typography.h4,
    fontWeight: Typography.bold,
    color: Colors.textWhite,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: Spacing.md,
  },
  actionText: {
    fontSize: Typography.bodySmall,
    color: Colors.gradientStart,
    fontWeight: Typography.semiBold,
  },
  list: {
    maxHeight: 400,
  },
  listContent: {
    gap: Spacing.sm,
  },
  empty: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: Spacing.xxl,
  },
  emptyText: {
    fontSize: Typography.body,
    color: Colors.textSecondary,
    marginTop: Spacing.sm,
  },
  notificationItem: {
    flexDirection: 'row',
    padding: Spacing.sm,
    borderRadius: BorderRadius.md,
    backgroundColor: 'transparent',
    position: 'relative',
  },
  unreadItem: {
    backgroundColor: 'rgba(102, 126, 234, 0.1)',
  },
  unreadDot: {
    position: 'absolute',
    left: 0,
    top: '50%',
    marginTop: -4,
    width: 8,
    height: 8,
    borderRadius: BorderRadius.full,
    backgroundColor: Colors.gradientStart,
  },
  notificationIcon: {
    marginLeft: Spacing.sm,
    marginRight: Spacing.sm,
  },
  notificationContent: {
    flex: 1,
  },
  notificationTitle: {
    fontSize: Typography.body,
    fontWeight: Typography.semiBold,
    color: Colors.textWhite,
    marginBottom: 2,
  },
  unreadText: {
    color: Colors.textWhite,
  },
  notificationMessage: {
    fontSize: Typography.bodySmall,
    color: Colors.textSecondary,
    marginBottom: 4,
  },
  notificationTime: {
    fontSize: Typography.caption,
    color: Colors.textSecondary,
  },
});
