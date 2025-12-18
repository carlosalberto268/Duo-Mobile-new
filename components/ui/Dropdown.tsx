
// components/ui/Dropdown.tsx
import React, { useState, useMemo, useRef, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  ScrollView,
  StyleSheet,
  TextInput,
  Dimensions,
  Keyboard,
  Platform,
  Pressable,
  LayoutChangeEvent,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSpring,
  interpolate,
  Extrapolate,
} from 'react-native-reanimated';
import { Colors, Spacing, Typography, BorderRadius } from '@/constants/theme';

interface DropdownOption {
  label: string;
  icon?: string;
}

interface DropdownProps {
  label: string;
  value: string;
  options: string[] | DropdownOption[];
  onSelect: (value: string) => void;
  placeholder?: string;
  error?: string;
  showIcons?: boolean;
}

export function Dropdown({
  label,
  value,
  options,
  onSelect,
  placeholder = 'Selecione',
  error,
  showIcons = false,
}: DropdownProps) {
  const selectorRef = useRef<View | null>(null);
  const [visible, setVisible] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [dropdownLayout, setDropdownLayout] = useState({ x: 0, y: 0, width: 0, height: 0 });
  const [measured, setMeasured] = useState(false);

  const screen = Dimensions.get('window');
  const screenHeight = screen.height;
  const screenWidth = screen.width;

  // Normalize options to DropdownOption format
  const normalizedOptions: DropdownOption[] = useMemo(() => {
    return options.map(opt => 
      typeof opt === 'string' ? { label: opt } : opt
    );
  }, [options]);

  const isSmallList = normalizedOptions.length <= 4;

  const keyboardHeightRef = useRef(0);
  const [keyboardOpen, setKeyboardOpen] = useState(false);

  // Reanimated shared values
  const animProgress = useSharedValue(0); // 0 closed, 1 open
  const arrowRotation = useSharedValue(0); // 0..180
  const pressScale = useSharedValue(1);
  const translateShift = useSharedValue(0); // to push dropdown up when keyboard opens

  const filteredOptions = useMemo(() => {
    if (!searchText) return normalizedOptions;
    return normalizedOptions.filter((opt) => 
      opt.label.toLowerCase().includes(searchText.toLowerCase())
    );
  }, [normalizedOptions, searchText]);

  const getSelectedOption = () => {
    return normalizedOptions.find(opt => opt.label === value);
  };

  const computeAndAnimateShift = useCallback((keyboardHeight: number) => {
    const baseTop = dropdownLayout.y + dropdownLayout.height + 6;
    const maxDropdownHeight = screenHeight - baseTop - 40;
    const dropdownHeight = Math.min(Math.max(maxDropdownHeight, 120), 360);
    const availableSpace = screenHeight - keyboardHeight - 8;
    const dropdownBottom = baseTop + dropdownHeight;
    const overflow = dropdownBottom - availableSpace;
    const shift = overflow > 0 ? overflow + 8 : 0;
    translateShift.value = withTiming(shift, { duration: 220 });
  }, [dropdownLayout.y, dropdownLayout.height, screenHeight, translateShift]);

  // Keyboard listeners to compute shift so dropdown label remains visible
  useEffect(() => {
    const showEvent = Platform.OS === 'ios' ? 'keyboardWillShow' : 'keyboardDidShow';
    const hideEvent = Platform.OS === 'ios' ? 'keyboardWillHide' : 'keyboardDidHide';

    const onShow = (e: any) => {
      const kbHeight = e.endCoordinates?.height ?? e.end?.height ?? 0;
      keyboardHeightRef.current = kbHeight;
      setKeyboardOpen(true);
      if (measured) computeAndAnimateShift(kbHeight);
    };

    const onHide = () => {
      keyboardHeightRef.current = 0;
      setKeyboardOpen(false);
      translateShift.value = withTiming(0, { duration: 200 });
    };

    const sShow = Keyboard.addListener(showEvent, onShow);
    const sHide = Keyboard.addListener(hideEvent, onHide);

    return () => {
      sShow.remove();
      sHide.remove();
    };
  }, [measured, translateShift, computeAndAnimateShift]);

  // open/close animations
  useEffect(() => {
    if (visible) {
      animProgress.value = withTiming(1, { duration: 220 });
      arrowRotation.value = withTiming(180, { duration: 220 });
      if (keyboardOpen && measured) computeAndAnimateShift(keyboardHeightRef.current);
    } else {
      animProgress.value = withTiming(0, { duration: 180 });
      arrowRotation.value = withTiming(0, { duration: 180 });
      translateShift.value = withTiming(0, { duration: 200 });
    }
  }, [visible, keyboardOpen, measured, animProgress, arrowRotation, translateShift, computeAndAnimateShift]);

  const handleOpen = () => {
    if (selectorRef.current) {
      selectorRef.current.measureInWindow((x, y, width, height) => {
        setDropdownLayout({ x, y, width, height });
        setMeasured(true);
        setVisible(true);
        if (keyboardOpen) computeAndAnimateShift(keyboardHeightRef.current);
      });
    } else {
      setVisible(true);
    }
  };

  const closeDropdown = () => {
    setVisible(false);
    setSearchText('');
  };

  const handleSelect = (option: string) => {
    onSelect(option);
    closeDropdown();
  };

  // Animated styles (Reanimated)
  const backdropStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(animProgress.value, [0, 1], [0, 0.7], Extrapolate.CLAMP),
    };
  });

  const dropdownStyle = useAnimatedStyle(() => {
    const translateY = interpolate(animProgress.value, [0, 1], [-10, 0], Extrapolate.CLAMP);
    const opacity = interpolate(animProgress.value, [0, 1], [0, 1], Extrapolate.CLAMP);
    const shift = -translateShift.value;
    return {
      transform: [{ translateY: withTiming(translateY + shift, { duration: 220 }) }],
      opacity: withTiming(opacity, { duration: 220 }),
    };
  });

  const arrowStyle = useAnimatedStyle(() => {
    const rot = interpolate(arrowRotation.value, [0, 180], [0, 180]);
    return {
      transform: [{ rotate: `${rot}deg` }],
    };
  });

  const pressStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: withSpring(pressScale.value, { damping: 12, stiffness: 150 }) }],
    };
  });

  const centeredModalAnim = useAnimatedStyle(() => {
    const s = interpolate(animProgress.value, [0, 1], [0.98, 1]);
    const op = interpolate(animProgress.value, [0, 1], [0, 1]);
    return {
      transform: [{ scale: withTiming(s, { duration: 200 }) }],
      opacity: withTiming(op, { duration: 200 }),
    };
  });

  const onSelectorLayout = (e: LayoutChangeEvent) => {
    if (selectorRef.current && visible) {
      selectorRef.current.measureInWindow((x, y, width, height) => {
        setDropdownLayout({ x, y, width, height });
        setMeasured(true);
        if (keyboardOpen) computeAndAnimateShift(keyboardHeightRef.current);
      });
    }
  };

  // --- Render small-list modal (centered) ---
  if (isSmallList) {
    return (
      <View style={styles.container}>
        <Text style={styles.label}>{label}</Text>

        <Pressable
          ref={selectorRef}
          onLayout={onSelectorLayout}
          onPressIn={() => (pressScale.value = 0.98)}
          onPressOut={() => (pressScale.value = 1)}
          onPress={handleOpen}
          style={({ pressed }) => [
            styles.selector,
            error && styles.selectorError,
            pressed && { opacity: 0.95 },
          ]}
        >
          <Animated.View style={[{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '100%' }, pressStyle]}>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8, flex: 1 }}>
              {showIcons && getSelectedOption()?.icon && (
                <MaterialIcons name={getSelectedOption()!.icon} size={20} color={Colors.gradientStart} />
              )}
              <Text style={[styles.value, !value && styles.placeholder]}>{value || placeholder}</Text>
            </View>
            <Animated.View style={arrowStyle}>
              <MaterialIcons name="arrow-drop-down" size={22} color={Colors.textSecondary} />
            </Animated.View>
          </Animated.View>
        </Pressable>

        {error && <Text style={styles.errorText}>{error}</Text>}

        <Modal visible={visible} transparent statusBarTranslucent>
          <Animated.View style={[styles.centeredBackdrop, backdropStyle]} />

          <View style={styles.centeredWrapper}>
            <Animated.View style={[styles.centeredContent, centeredModalAnim]}>
              <View style={styles.centeredHeader}>
                <Text style={styles.centeredTitle}>{label}</Text>
                <TouchableOpacity onPress={closeDropdown}>
                  <MaterialIcons name="close" size={22} color={Colors.textWhite} />
                </TouchableOpacity>
              </View>

              <View style={styles.smallList}>
                {normalizedOptions.map((opt) => (
                  <TouchableOpacity key={opt.label} style={styles.radioButton} onPress={() => handleSelect(opt.label)}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8, flex: 1 }}>
                      {showIcons && opt.icon && (
                        <MaterialIcons name={opt.icon} size={20} color={Colors.gradientStart} />
                      )}
                      <Text style={styles.smallOptionText}>{opt.label}</Text>
                    </View>
                    {value === opt.label && <MaterialIcons name="check" size={20} color={Colors.gradientStart} />}
                  </TouchableOpacity>
                ))}
              </View>
            </Animated.View>
          </View>
        </Modal>
      </View>
    );
  }

  // --- Large list dropdown (positioned below selector) ---
  const baseTop = dropdownLayout.y + dropdownLayout.height + 6;
  const maxDropdownHeight = Math.max(screenHeight - baseTop - 40, 120);
  const dropdownHeight = Math.min(maxDropdownHeight, 360);

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>

      <Pressable
        ref={selectorRef}
        onLayout={onSelectorLayout}
        onPressIn={() => (pressScale.value = 0.98)}
        onPressOut={() => (pressScale.value = 1)}
        onPress={handleOpen}
        style={({ pressed }) => [
          styles.selector,
          error && styles.selectorError,
          pressed && { opacity: 0.95 },
        ]}
      >
        <Animated.View style={[{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '100%' }, pressStyle]}>
          <Text style={[styles.value, !value && styles.placeholder]}>{value || placeholder}</Text>
          <Animated.View style={arrowStyle}>
            <MaterialIcons name="arrow-drop-down" size={22} color={Colors.textSecondary} />
          </Animated.View>
        </Animated.View>
      </Pressable>

      {error && <Text style={styles.errorText}>{error}</Text>}

      <Modal visible={visible} transparent statusBarTranslucent>
        {/* Backdrop */}
        <Animated.View style={[styles.backdropFill, backdropStyle]} />

        {/* Touchable area to close */}
        <Pressable style={styles.backdropFill} onPress={closeDropdown} />

        {/* Dropdown container positioned absolutely */}
        <Animated.View
          pointerEvents="box-none"
          style={[
            {
              position: 'absolute',
              left: Math.max(dropdownLayout.x || 16, 12),
              width: dropdownLayout.width || (screenWidth - 32),
              top: (baseTop || 120),
              maxHeight: dropdownHeight,
            },
            dropdownStyle,
            styles.dropdownContainer,
          ]}
        >
          {/* Search pill */}
          <View style={styles.searchRow}>
            <MaterialIcons name="search" size={18} color={Colors.textSecondary} />
            <TextInput
              style={styles.searchInput}
              value={searchText}
              onChangeText={setSearchText}
              placeholder="Buscar..."
              placeholderTextColor={Colors.textSecondary}
              autoFocus
            />
            {searchText.length > 0 && (
              <TouchableOpacity onPress={() => setSearchText('')}>
                <MaterialIcons name="close" size={18} color={Colors.textSecondary} />
              </TouchableOpacity>
            )}
          </View>

          {/* Divider */}
          <View style={styles.divider} />

          {/* Options */}
          <ScrollView
            style={{ maxHeight: dropdownHeight - 64 }}
            nestedScrollEnabled
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator
          >
            {filteredOptions.length > 0 ? (
              filteredOptions.map((opt) => (
                <TouchableOpacity key={opt.label} style={styles.optionItem} onPress={() => handleSelect(opt.label)}>
                  <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8, flex: 1 }}>
                    {showIcons && opt.icon && (
                      <MaterialIcons name={opt.icon} size={20} color={Colors.gradientStart} />
                    )}
                    <Text style={styles.optionText}>{opt.label}</Text>
                  </View>
                  {value === opt.label && <MaterialIcons name="check" size={20} color={Colors.gradientStart} />}
                </TouchableOpacity>
              ))
            ) : (
              <View style={styles.emptyState}>
                <MaterialIcons name="search-off" size={42} color={Colors.textSecondary} />
                <Text style={styles.emptyText}>Nenhum resultado</Text>
              </View>
            )}
          </ScrollView>
        </Animated.View>
      </Modal>
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
  selector: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'rgba(255,255,255,0.03)',
    borderRadius: BorderRadius.sm,
    padding: Spacing.md,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.06)',
  },
  selectorError: {
    borderColor: Colors.expense,
  },
  value: {
    fontSize: Typography.body,
    color: Colors.textPrimary,
  },
  placeholder: {
    color: Colors.textSecondary,
  },
  errorText: {
    fontSize: Typography.caption,
    color: Colors.expense,
    marginTop: Spacing.xs,
  },

  // centered small-list modal
  centeredBackdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#000',
  },
  centeredWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: Spacing.lg,
  },
  centeredContent: {
    width: '100%',
    maxWidth: 420,
    backgroundColor: Colors.glassBackground,
    borderRadius: BorderRadius.md,
    overflow: 'hidden',
    elevation: 12,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 8 },
    shadowRadius: 24,
    borderWidth: 1,
    borderColor: Colors.glassBorder,
  },
  centeredHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: Spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: Colors.glassBorder,
  },
  centeredTitle: {
    color: Colors.textWhite,
    fontSize: Typography.h4,
    fontWeight: Typography.bold,
  },
  smallList: {
    paddingVertical: Spacing.sm,
  },
  radioButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.md,
    backgroundColor: Colors.glassBackground,
  },
  smallOptionText: {
    fontSize: Typography.body,
    color: Colors.textWhite,
  },

  // large dropdown
  backdropFill: {
    ...StyleSheet.absoluteFillObject,
  },
  dropdownContainer: {
    backgroundColor: Colors.glassBackground,
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 8,
    borderWidth: 1,
    borderColor: Colors.glassBorder,
  },
  searchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 12,
    gap: Spacing.sm,
    backgroundColor: 'rgba(255, 255, 255, 0.02)',
  },
  searchInput: {
    flex: 1,
    fontSize: Typography.body,
    color: Colors.textWhite,
    paddingVertical: 6,
  },
  divider: {
    height: 1,
    backgroundColor: Colors.glassBorder,
  },
  optionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: Colors.glassBorder,
    backgroundColor: Colors.glassBackground,
  },
  optionText: {
    fontSize: Typography.body,
    color: Colors.textWhite,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: Spacing.xl,
  },
  emptyText: {
    marginTop: Spacing.md,
    color: Colors.textSecondary,
    fontSize: Typography.body,
  },
});
