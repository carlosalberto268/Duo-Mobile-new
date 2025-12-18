/**
 * Swipeable Transaction Component
 * Swipe gestures for quick actions (Apple-like)
 */
import React, { useRef } from 'react';
import { View, Text, StyleSheet, Animated, PanResponder, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { Colors, Spacing, Typography, BorderRadius } from '@/constants/theme';

interface SwipeableTransactionProps {
  description: string;
  amount: number;
  category: string;
  date: string;
  paidBy?: 'user' | 'partner' | 'shared';
  onSplit: () => void;
  onEdit: () => void;
  onPress: () => void;
}

export function SwipeableTransaction({
  description,
  amount,
  category,
  date,
  paidBy = 'user',
  onSplit,
  onEdit,
  onPress,
}: SwipeableTransactionProps) {
  const pan = useRef(new Animated.ValueXY()).current;
  const opacity = useRef(new Animated.Value(1)).current;

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (_, gestureState) => {
        return Math.abs(gestureState.dx) > 10;
      },
      onPanResponderMove: (_, gestureState) => {
        // Limit swipe to left only
        if (gestureState.dx < 0) {
          pan.setValue({ x: gestureState.dx, y: 0 });
        }
      },
      onPanResponderRelease: (_, gestureState) => {
        const swipeDistance = Math.abs(gestureState.dx);

        if (swipeDistance > 50 && swipeDistance < 120) {
          // Short swipe → split
          Animated.spring(pan, {
            toValue: { x: -80, y: 0 },
            useNativeDriver: false,
          }).start();
          setTimeout(onSplit, 200);
        } else if (swipeDistance >= 120) {
          // Long swipe → edit
          Animated.spring(pan, {
            toValue: { x: -160, y: 0 },
            useNativeDriver: false,
          }).start();
          setTimeout(onEdit, 200);
        } else {
          // Reset
          Animated.spring(pan, {
            toValue: { x: 0, y: 0 },
            useNativeDriver: false,
          }).start();
        }
      },
    })
  ).current;

  const paidByConfig = {
    user: { text: 'Você', color: Colors.gradientStart },
    partner: { text: 'Parceiro', color: Colors.gradientEnd },
    shared: { text: 'Compartilhado', color: Colors.success },
  };

  return (
    <View style={styles.container}>
      {/* Action Buttons Behind */}
      <View style={styles.actionsContainer}>
        <View style={[styles.actionButton, { backgroundColor: Colors.info }]}>
          <MaterialIcons name="call-split" size={20} color={Colors.textWhite} />
          <Text style={styles.actionText}>Dividir</Text>
        </View>
        <View style={[styles.actionButton, { backgroundColor: Colors.warning }]}>
          <MaterialIcons name="edit" size={20} color={Colors.textWhite} />
          <Text style={styles.actionText}>Editar</Text>
        </View>
      </View>

      {/* Main Card */}
      <Animated.View
        style={[
          styles.card,
          {
            transform: [{ translateX: pan.x }],
            opacity,
          },
        ]}
        {...panResponder.panHandlers}
      >
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={onPress}
          style={styles.cardContent}
        >
          <View style={styles.iconContainer}>
            <MaterialIcons name="receipt" size={24} color={Colors.gradientStart} />
          </View>

          <View style={styles.info}>
            <Text style={styles.description}>{description}</Text>
            <View style={styles.metadata}>
              <Text style={styles.category}>{category}</Text>
              <Text style={styles.separator}>•</Text>
              <Text style={styles.date}>{date}</Text>
            </View>
            <Text style={[styles.paidBy, { color: paidByConfig[paidBy].color }]}>
              Pago por {paidByConfig[paidBy].text}
            </Text>
          </View>

          <Text style={styles.amount}>
            R$ {amount.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
          </Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: Spacing.sm,
    position: 'relative',
  },
  actionsContainer: {
    position: 'absolute',
    right: 0,
    top: 0,
    bottom: 0,
    flexDirection: 'row',
    gap: Spacing.xs,
  },
  actionButton: {
    width: 80,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: BorderRadius.md,
    gap: 4,
  },
  actionText: {
    fontSize: Typography.caption,
    color: Colors.textWhite,
    fontWeight: Typography.semiBold,
  },
  card: {
    backgroundColor: Colors.glassBackground,
    borderRadius: BorderRadius.md,
    borderWidth: 1,
    borderColor: Colors.glassBorder,
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: Spacing.md,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: BorderRadius.sm,
    backgroundColor: 'rgba(102, 126, 234, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  info: {
    flex: 1,
    marginLeft: Spacing.md,
  },
  description: {
    fontSize: Typography.body,
    fontWeight: Typography.semiBold,
    color: Colors.textWhite,
    marginBottom: 4,
  },
  metadata: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
    marginBottom: 4,
  },
  category: {
    fontSize: Typography.caption,
    color: Colors.textSecondary,
  },
  separator: {
    fontSize: Typography.caption,
    color: Colors.textSecondary,
  },
  date: {
    fontSize: Typography.caption,
    color: Colors.textSecondary,
  },
  paidBy: {
    fontSize: Typography.caption,
    fontWeight: Typography.semiBold,
  },
  amount: {
    fontSize: Typography.h4,
    fontWeight: Typography.bold,
    color: Colors.textWhite,
  },
});
