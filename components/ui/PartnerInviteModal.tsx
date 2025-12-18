/**
 * PartnerInviteModal Component
 * Modal for inviting a partner
 */
import React, { useState } from 'react';
import {
  View,
  Text,
  Modal,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Alert,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { Colors, Spacing, Typography, BorderRadius } from '@/constants/theme';
import { GlassCard, GradientButton } from '@/components/ui';

interface PartnerInviteModalProps {
  visible: boolean;
  onClose: () => void;
  onSubmit: (name: string, email: string) => void;
}

export function PartnerInviteModal({ visible, onClose, onSubmit }: PartnerInviteModalProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = () => {
    if (!name.trim() || !email.trim()) {
      Alert.alert('Atenção', 'Por favor, preencha todos os campos');
      return;
    }

    if (!email.includes('@')) {
      Alert.alert('Atenção', 'Por favor, insira um e-mail válido');
      return;
    }

    onSubmit(name, email);
    setName('');
    setEmail('');
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.container}>
          <GlassCard style={styles.card}>
            <View style={styles.header}>
              <Text style={styles.title}>Convidar Parceiro 💑</Text>
              <TouchableOpacity onPress={onClose}>
                <MaterialIcons name="close" size={24} color={Colors.textWhite} />
              </TouchableOpacity>
            </View>

            <Text style={styles.description}>
              Convide seu parceiro para gerenciar as finanças juntos!
            </Text>

            <View style={styles.form}>
              <Text style={styles.label}>Nome do Parceiro</Text>
              <TextInput
                style={styles.input}
                placeholder="Digite o nome"
                placeholderTextColor={Colors.textSecondary}
                value={name}
                onChangeText={setName}
                autoCapitalize="words"
              />

              <Text style={styles.label}>E-mail do Parceiro</Text>
              <TextInput
                style={styles.input}
                placeholder="Digite o e-mail"
                placeholderTextColor={Colors.textSecondary}
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
              />

              <GradientButton
                title="Enviar Convite"
                onPress={handleSubmit}
                style={styles.button}
              />
            </View>
          </GlassCard>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: Spacing.md,
  },
  container: {
    width: '100%',
    maxWidth: 400,
  },
  card: {
    padding: Spacing.lg,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.md,
  },
  title: {
    fontSize: Typography.h3,
    fontWeight: Typography.bold,
    color: Colors.textWhite,
  },
  description: {
    fontSize: Typography.body,
    color: Colors.textSecondary,
    marginBottom: Spacing.lg,
  },
  form: {
    gap: Spacing.sm,
  },
  label: {
    fontSize: Typography.body,
    color: Colors.textWhite,
    marginBottom: Spacing.xs,
    marginTop: Spacing.sm,
  },
  input: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: BorderRadius.md,
    borderWidth: 1,
    borderColor: Colors.glassBorder,
    padding: Spacing.md,
    fontSize: Typography.body,
    color: Colors.textWhite,
  },
  button: {
    marginTop: Spacing.md,
  },
});
