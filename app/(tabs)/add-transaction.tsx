/**
 * Add Transaction Screen
 * Form to add new transaction
 */
import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import { GradientBackground } from '@/components/layout';
import { GlassCard, Input, Dropdown } from '@/components/ui';
import { GradientButton } from '@/components/ui/GradientButton';
import { Colors, Spacing, Typography, BorderRadius } from '@/constants/theme';
import {
  TRANSACTION_TYPES,
  CATEGORIES,
  EXPENSE_TYPES,
  PAYMENT_METHODS,
} from '@/constants/data';

export default function AddTransactionScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const [transactionType, setTransactionType] = useState<'expense' | 'income'>('expense');
  const [value, setValue] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [expenseType, setExpenseType] = useState('');
  const [paidBy, setPaidBy] = useState('');
  const [isFixed, setIsFixed] = useState(false);
  const [repeatCount, setRepeatCount] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');
  const [account, setAccount] = useState('');
  const [paymentDate, setPaymentDate] = useState('');
  const [dueDate, setDueDate] = useState('');

  const selectedPaymentMethod = PAYMENT_METHODS.find((m) => m.label === paymentMethod);
  const needsAccount = selectedPaymentMethod?.needsAccount ?? false;

  // Mock data - replace with real data from context/database
  const accounts = ['Nubank - Conta', 'Inter - Poupança', 'Nubank Ultravioleta', 'XP Visa Infinite'];
  const paidByOptions = ['João Silva', 'Maria Santos', 'Compartilhado']; // Mock couple names

  const handleSave = () => {
    // Implement save logic
    console.log('Saving transaction...');
    router.back();
  };

  return (
    <GradientBackground>
      <View style={[styles.container, { paddingTop: insets.top }]}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()}>
            <MaterialIcons name="close" size={28} color={Colors.textWhite} />
          </TouchableOpacity>
          <Text style={styles.title}>Nova Transação</Text>
          <View style={{ width: 28 }} />
        </View>

        {/* Type Selector */}
        <View style={styles.typeSelector}>
          {TRANSACTION_TYPES.map((type) => (
            <TouchableOpacity
              key={type.id}
              style={[
                styles.typeButton,
                transactionType === type.id && {
                  backgroundColor: type.color,
                },
              ]}
              onPress={() => setTransactionType(type.id as 'expense' | 'income')}
            >
              <Text
                style={[
                  styles.typeButtonText,
                  transactionType === type.id && styles.typeButtonTextActive,
                ]}
              >
                {type.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Form */}
        <ScrollView
          style={styles.form}
          contentContainerStyle={styles.formContent}
          showsVerticalScrollIndicator={false}
        >
          <GlassCard>
            <Input
              label="Valor"
              value={value}
              onChangeText={setValue}
              keyboardType="decimal-pad"
              placeholder="R$ 0,00"
            />

            <Input
              label="Descrição"
              value={description}
              onChangeText={setDescription}
              placeholder="Ex: Almoço no restaurante"
            />

            <Dropdown
              label="Categoria"
              value={category}
              options={transactionType === 'expense' ? CATEGORIES.expense : CATEGORIES.income}
              onSelect={setCategory}
              placeholder="Selecione uma categoria"
            />

            {transactionType === 'expense' ? (
              <>
                <Dropdown
                  label="Tipo de Gasto"
                  value={expenseType}
                  options={EXPENSE_TYPES.map((t) => t.label)}
                  onSelect={(val) => {
                    setExpenseType(val);
                    setIsFixed(val === 'Fixo');
                  }}
                  placeholder="Selecione o tipo"
                />

                <Dropdown
                  label="Pago por"
                  value={paidBy}
                  options={paidByOptions}
                  onSelect={setPaidBy}
                  placeholder="Quem pagou?"
                />

                {isFixed && (
                  <Input
                    label="Repetir por quantos meses?"
                    value={repeatCount}
                    onChangeText={setRepeatCount}
                    keyboardType="number-pad"
                    placeholder="Ex: 12"
                  />
                )}

                <Dropdown
                  label="Método de Pagamento"
                  value={paymentMethod}
                  options={PAYMENT_METHODS.map((m) => m.label)}
                  onSelect={setPaymentMethod}
                  placeholder="Selecione o método"
                />

                {needsAccount && (
                  <Dropdown
                    label="Conta/Cartão"
                    value={account}
                    options={accounts}
                    onSelect={setAccount}
                    placeholder="Selecione conta ou cartão"
                  />
                )}

                <Input
                  label="Data de Pagamento"
                  value={paymentDate}
                  onChangeText={setPaymentDate}
                  placeholder="DD/MM/AAAA"
                />

                <Input
                  label="Data de Vencimento"
                  value={dueDate}
                  onChangeText={setDueDate}
                  placeholder="DD/MM/AAAA"
                />
              </>
            ) : (
              <>
                <Dropdown
                  label="Conta Destino"
                  value={account}
                  options={accounts}
                  onSelect={setAccount}
                  placeholder="Selecione a conta destino"
                />

                <Input
                  label="Data de Recebimento"
                  value={paymentDate}
                  onChangeText={setPaymentDate}
                  placeholder="DD/MM/AAAA"
                />
              </>
            )}
          </GlassCard>

          <GradientButton
            title="Salvar Transação"
            onPress={handleSave}
            style={styles.saveButton}
          />
        </ScrollView>
      </View>
    </GradientBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.md,
  },
  title: {
    fontSize: Typography.h3,
    fontWeight: Typography.bold,
    color: Colors.textWhite,
  },
  typeSelector: {
    flexDirection: 'row',
    gap: Spacing.sm,
    paddingHorizontal: Spacing.md,
    marginBottom: Spacing.md,
  },
  typeButton: {
    flex: 1,
    paddingVertical: Spacing.sm,
    borderRadius: BorderRadius.sm,
    backgroundColor: 'rgba(255,255,255,0.2)',
    alignItems: 'center',
  },
  typeButtonText: {
    fontSize: Typography.body,
    fontWeight: Typography.semiBold,
    color: Colors.textWhite,
  },
  typeButtonTextActive: {
    color: Colors.textWhite,
  },
  form: {
    flex: 1,
    paddingHorizontal: Spacing.md,
  },
  formContent: {
    paddingBottom: Spacing.xxl,
  },
  saveButton: {
    marginTop: Spacing.lg,
  },
});
