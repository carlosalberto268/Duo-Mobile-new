/**
 * IconPicker Component
 * Grid selector for icons
 */
import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  ScrollView,
  StyleSheet,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { Colors, Spacing, Typography, BorderRadius } from '@/constants/theme';

interface IconOption {
  name: string;
  label: string;
}

interface IconPickerProps {
  label: string;
  value: string;
  options: IconOption[];
  onSelect: (value: string) => void;
  placeholder?: string;
}

export function IconPicker({
  label,
  value,
  options,
  onSelect,
  placeholder = 'Selecione um ícone',
}: IconPickerProps) {
  const [visible, setVisible] = useState(false);

  const selectedIcon = options.find((opt) => opt.name === value);

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <TouchableOpacity
        style={styles.selector}
        onPress={() => setVisible(true)}
      >
        {value ? (
          <View style={styles.selectedIcon}>
            <MaterialIcons name={value as any} size={32} color={Colors.gradientStart} />
            <Text style={styles.selectedLabel}>{selectedIcon?.label}</Text>
          </View>
        ) : (
          <Text style={styles.placeholder}>{placeholder}</Text>
        )}
        <MaterialIcons name="arrow-drop-down" size={24} color={Colors.textSecondary} />
      </TouchableOpacity>

      <Modal visible={visible} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>{label}</Text>
              <TouchableOpacity onPress={() => setVisible(false)}>
                <MaterialIcons name="close" size={24} color={Colors.textPrimary} />
              </TouchableOpacity>
            </View>
            <ScrollView style={styles.iconGrid} contentContainerStyle={styles.iconGridContent}>
              {options.map((option) => (
                <TouchableOpacity
                  key={option.name}
                  style={[
                    styles.iconOption,
                    value === option.name && styles.iconOptionSelected,
                  ]}
                  onPress={() => {
                    onSelect(option.name);
                    setVisible(false);
                  }}
                >
                  <MaterialIcons
                    name={option.name as any}
                    size={32}
                    color={value === option.name ? Colors.gradientStart : Colors.textPrimary}
                  />
                  <Text
                    style={[
                      styles.iconLabel,
                      value === option.name && styles.iconLabelSelected,
                    ]}
                  >
                    {option.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </View>
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
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: BorderRadius.sm,
    padding: Spacing.md,
    minHeight: 56,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
  },
  selectedIcon: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
  },
  selectedLabel: {
    fontSize: Typography.body,
    color: Colors.textPrimary,
    fontWeight: Typography.semiBold,
  },
  placeholder: {
    fontSize: Typography.body,
    color: Colors.textSecondary,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#121212',
    borderTopLeftRadius: BorderRadius.xl,
    borderTopRightRadius: BorderRadius.xl,
    maxHeight: '80%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: Spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  modalTitle: {
    fontSize: Typography.h4,
    fontWeight: Typography.bold,
    color: Colors.textDark,
  },
  iconGrid: {
    flex: 1,
  },
  iconGridContent: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: Spacing.sm,
  },
  iconOption: {
    width: '25%',
    aspectRatio: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: Spacing.xs,
    borderRadius: BorderRadius.sm,
  },
  iconOptionSelected: {
    backgroundColor: Colors.gradientStart + '20',
  },
  iconLabel: {
    fontSize: Typography.caption,
    color: Colors.textDark,
    textAlign: 'center',
    marginTop: 4,
  },
  iconLabelSelected: {
    color: Colors.gradientStart,
    fontWeight: Typography.semiBold,
  },
});
