/**
 * Accounts Screen
 * Manage bank accounts and credit cards
 */
import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Switch,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { GradientBackground } from '@/components/layout';
import { GlassCard, Input, Dropdown } from '@/components/ui';
import { GradientButton } from '@/components/ui/GradientButton';
import { Colors, Spacing, Typography, BorderRadius } from '@/constants/theme';
import { MaterialIcons } from '@expo/vector-icons';
import { BANKS, CARD_BRANDS, ACCOUNT_TYPES, SUBSCRIPTION_SERVICES } from '@/constants/data';

export default function AccountsScreen() {
  const insets = useSafeAreaInsets();
  const [showAccountModal, setShowAccountModal] = useState(false);
  const [showCardModal, setShowCardModal] = useState(false);
  const [showSubscriptionModal, setShowSubscriptionModal] = useState(false);

  // Account form state
  const [accountBank, setAccountBank] = useState('');
  const [accountNickname, setAccountNickname] = useState('');
  const [accountAgency, setAccountAgency] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [accountType, setAccountType] = useState('');
  const [accountBalance, setAccountBalance] = useState('');
  const [hasFee, setHasFee] = useState(false);
  const [feeDescription, setFeeDescription] = useState('');
  const [feeValue, setFeeValue] = useState('');
  const [feeDay, setFeeDay] = useState('');

  // Card form state
  const [cardNickname, setCardNickname] = useState('');
  const [cardName, setCardName] = useState('');
  const [cardIssuer, setCardIssuer] = useState('');
  const [cardBrand, setCardBrand] = useState('');
  const [cardLastDigits, setCardLastDigits] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardLimit, setCardLimit] = useState('');
  const [cardClosingDay, setCardClosingDay] = useState('');
  const [cardDueDay, setCardDueDay] = useState('');

  // Subscription form state
  const [subscriptionService, setSubscriptionService] = useState('');
  const [subscriptionValue, setSubscriptionValue] = useState('');
  const [subscriptionDueDay, setSubscriptionDueDay] = useState('');

  const handleSaveAccount = () => {
    // Implement save logic
    console.log('Saving account...');
    setShowAccountModal(false);
  };

  const handleSaveCard = () => {
    // Implement save logic
    console.log('Saving card...');
    setShowCardModal(false);
  };

  const handleSaveSubscription = () => {
    // Implement save logic
    console.log('Saving subscription...');
    setShowSubscriptionModal(false);
    // Reset form
    setSubscriptionService('');
    setSubscriptionValue('');
    setSubscriptionDueDay('');
  };

  return (
    <GradientBackground>
      <ScrollView 
        style={[styles.container, { paddingTop: insets.top + Spacing.md }]}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <Text style={styles.title}>Contas e Cartões</Text>

        {/* Total Balance */}
        <GlassCard style={styles.totalCard}>
          <Text style={styles.totalLabel}>Saldo Total</Text>
          <Text style={styles.totalValue}>R$ 12.450,00</Text>
          <View style={styles.totalDetail}>
            <View style={styles.totalItem}>
              <Text style={styles.totalItemLabel}>Contas</Text>
              <Text style={styles.totalItemValue}>R$ 8.200</Text>
            </View>
            <View style={styles.totalItem}>
              <Text style={styles.totalItemLabel}>Disponível</Text>
              <Text style={[styles.totalItemValue, { color: Colors.success }]}>
                R$ 4.250
              </Text>
            </View>
          </View>
        </GlassCard>

        {/* Bank Accounts Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Contas Bancárias</Text>
            <TouchableOpacity onPress={() => setShowAccountModal(true)}>
              <MaterialIcons name="add-circle-outline" size={24} color={Colors.textWhite} />
            </TouchableOpacity>
          </View>

          <GlassCard style={styles.accountCard}>
            <View style={styles.accountHeader}>
              <View style={[styles.bankIcon, { backgroundColor: Colors.info + '20' }]}>
                <MaterialIcons name="account-balance" size={28} color={Colors.info} />
              </View>
              <View style={styles.accountInfo}>
                <Text style={styles.accountName}>Nubank</Text>
                <Text style={styles.accountType}>Conta Corrente</Text>
              </View>
            </View>
            <Text style={styles.accountBalance}>R$ 5.200,00</Text>
          </GlassCard>

          <GlassCard style={styles.accountCard}>
            <View style={styles.accountHeader}>
              <View style={[styles.bankIcon, { backgroundColor: Colors.warning + '20' }]}>
                <MaterialIcons name="account-balance" size={28} color={Colors.warning} />
              </View>
              <View style={styles.accountInfo}>
                <Text style={styles.accountName}>Inter</Text>
                <Text style={styles.accountType}>Conta Poupança</Text>
              </View>
            </View>
            <Text style={styles.accountBalance}>R$ 3.000,00</Text>
          </GlassCard>
        </View>

        {/* Credit Cards Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Cartões de Crédito</Text>
            <TouchableOpacity onPress={() => setShowCardModal(true)}>
              <MaterialIcons name="add-circle-outline" size={24} color={Colors.textWhite} />
            </TouchableOpacity>
          </View>

          <GlassCard style={styles.cardCard}>
            <View style={styles.cardHeader}>
              <View style={[styles.cardIcon, { backgroundColor: Colors.gradientStart + '20' }]}>
                <MaterialIcons name="credit-card" size={28} color={Colors.gradientStart} />
              </View>
              <View style={styles.cardInfo}>
                <Text style={styles.cardName}>Nubank Ultravioleta</Text>
                <Text style={styles.cardLimit}>Limite: R$ 8.000</Text>
              </View>
            </View>
            <View style={styles.cardDetail}>
              <View style={styles.cardDetailItem}>
                <Text style={styles.cardDetailLabel}>Fatura Atual</Text>
                <Text style={[styles.cardDetailValue, { color: Colors.expense }]}>
                  R$ 2.450
                </Text>
              </View>
              <View style={styles.cardDetailItem}>
                <Text style={styles.cardDetailLabel}>Vencimento</Text>
                <Text style={styles.cardDetailValue}>28/11</Text>
              </View>
            </View>
            <View style={styles.progressBar}>
              <View style={[styles.progressFill, { width: '31%' }]} />
            </View>
            <Text style={styles.progressText}>31% utilizado</Text>
          </GlassCard>

          <GlassCard style={styles.cardCard}>
            <View style={styles.cardHeader}>
              <View style={[styles.cardIcon, { backgroundColor: Colors.success + '20' }]}>
                <MaterialIcons name="credit-card" size={28} color={Colors.success} />
              </View>
              <View style={styles.cardInfo}>
                <Text style={styles.cardName}>XP Visa Infinite</Text>
                <Text style={styles.cardLimit}>Limite: R$ 12.000</Text>
              </View>
            </View>
            <View style={styles.cardDetail}>
              <View style={styles.cardDetailItem}>
                <Text style={styles.cardDetailLabel}>Fatura Atual</Text>
                <Text style={[styles.cardDetailValue, { color: Colors.expense }]}>
                  R$ 1.800
                </Text>
              </View>
              <View style={styles.cardDetailItem}>
                <Text style={styles.cardDetailLabel}>Vencimento</Text>
                <Text style={styles.cardDetailValue}>15/12</Text>
              </View>
            </View>
            <View style={styles.progressBar}>
              <View style={[styles.progressFill, { width: '15%' }]} />
            </View>
            <Text style={styles.progressText}>15% utilizado</Text>
          </GlassCard>
        </View>
      </ScrollView>

      {/* Add Account Modal */}
      <Modal
        visible={showAccountModal}
        animationType="slide"
        presentationStyle="pageSheet"
      >
        <GradientBackground>
          <View style={[styles.modalContainer, { paddingTop: insets.top }]}>
            <View style={styles.modalHeader}>
              <TouchableOpacity onPress={() => setShowAccountModal(false)}>
                <MaterialIcons name="close" size={28} color={Colors.textWhite} />
              </TouchableOpacity>
              <Text style={styles.modalTitle}>Nova Conta</Text>
              <View style={{ width: 28 }} />
            </View>

            <ScrollView
              style={styles.modalForm}
              contentContainerStyle={styles.modalFormContent}
              showsVerticalScrollIndicator={false}
            >
              <GlassCard>
                <Dropdown
                  label="Banco"
                  value={accountBank}
                  options={BANKS}
                  onSelect={setAccountBank}
                  placeholder="Selecione o banco"
                />

                <Input
                  label="Apelido da Conta"
                  value={accountNickname}
                  onChangeText={setAccountNickname}
                  placeholder="Ex: Conta Principal"
                />

                <Input
                  label="Agência"
                  value={accountAgency}
                  onChangeText={setAccountAgency}
                  keyboardType="number-pad"
                  placeholder="0000"
                />

                <Input
                  label="Conta"
                  value={accountNumber}
                  onChangeText={setAccountNumber}
                  keyboardType="number-pad"
                  placeholder="00000-0"
                />

                <Dropdown
                  label="Tipo de Conta"
                  value={accountType}
                  options={ACCOUNT_TYPES}
                  onSelect={setAccountType}
                  placeholder="Selecione o tipo"
                />

                <Input
                  label="Saldo Inicial"
                  value={accountBalance}
                  onChangeText={setAccountBalance}
                  keyboardType="decimal-pad"
                  placeholder="R$ 0,00"
                />

                <View style={styles.feeContainer}>
                  <View style={styles.feeHeader}>
                    <Text style={styles.feeLabel}>
                      Esta conta possui tarifa/pacote de serviços?
                    </Text>
                    <Switch
                      value={hasFee}
                      onValueChange={setHasFee}
                      trackColor={{ false: '#ccc', true: Colors.gradientStart }}
                      thumbColor="#fff"
                    />
                  </View>

                  {hasFee && (
                    <View style={styles.feeFields}>
                      <Input
                        label="Descrição da Tarifa"
                        value={feeDescription}
                        onChangeText={setFeeDescription}
                        placeholder="Ex: Pacote de serviços"
                      />
                      <Input
                        label="Valor da Tarifa"
                        value={feeValue}
                        onChangeText={setFeeValue}
                        keyboardType="decimal-pad"
                        placeholder="R$ 0,00"
                      />
                      <Input
                        label="Dia do Débito"
                        value={feeDay}
                        onChangeText={setFeeDay}
                        keyboardType="number-pad"
                        placeholder="1-31"
                      />
                    </View>
                  )}
                </View>
              </GlassCard>

              <GradientButton
                title="Salvar Conta"
                onPress={handleSaveAccount}
                style={styles.saveButton}
              />
            </ScrollView>
          </View>
        </GradientBackground>
      </Modal>

      {/* Add Card Modal */}
      <Modal
        visible={showCardModal}
        animationType="slide"
        presentationStyle="pageSheet"
      >
        <GradientBackground>
          <View style={[styles.modalContainer, { paddingTop: insets.top }]}>
            <View style={styles.modalHeader}>
              <TouchableOpacity onPress={() => setShowCardModal(false)}>
                <MaterialIcons name="close" size={28} color={Colors.textWhite} />
              </TouchableOpacity>
              <Text style={styles.modalTitle}>Novo Cartão</Text>
              <View style={{ width: 28 }} />
            </View>

            <ScrollView
              style={styles.modalForm}
              contentContainerStyle={styles.modalFormContent}
              showsVerticalScrollIndicator={false}
            >
              <GlassCard>
                <Input
                  label="Apelido do Cartão"
                  value={cardNickname}
                  onChangeText={setCardNickname}
                  placeholder="Ex: Cartão Principal"
                />

                <Input
                  label="Nome no Cartão"
                  value={cardName}
                  onChangeText={setCardName}
                  placeholder="NOME SOBRENOME"
                />

                <Dropdown
                  label="Emissor do Cartão"
                  value={cardIssuer}
                  options={BANKS}
                  onSelect={setCardIssuer}
                  placeholder="Selecione o banco emissor"
                />

                <Dropdown
                  label="Bandeira do Cartão"
                  value={cardBrand}
                  options={CARD_BRANDS}
                  onSelect={setCardBrand}
                  placeholder="Selecione a bandeira"
                />

                <Input
                  label="4 Últimos Dígitos"
                  value={cardLastDigits}
                  onChangeText={setCardLastDigits}
                  keyboardType="number-pad"
                  placeholder="0000"
                  maxLength={4}
                />

                <Input
                  label="Data de Validade"
                  value={cardExpiry}
                  onChangeText={setCardExpiry}
                  placeholder="MM/AA"
                  maxLength={5}
                />

                <Input
                  label="Limite de Crédito"
                  value={cardLimit}
                  onChangeText={setCardLimit}
                  keyboardType="decimal-pad"
                  placeholder="R$ 0,00"
                />

                <Input
                  label="Dia de Fechamento"
                  value={cardClosingDay}
                  onChangeText={setCardClosingDay}
                  keyboardType="number-pad"
                  placeholder="1-31"
                />

                <Input
                  label="Dia de Vencimento"
                  value={cardDueDay}
                  onChangeText={setCardDueDay}
                  keyboardType="number-pad"
                  placeholder="1-31"
                />

                <TouchableOpacity
                  style={styles.subscriptionButton}
                  onPress={() => setShowSubscriptionModal(true)}
                >
                  <MaterialIcons name="subscriptions" size={24} color={Colors.gradientStart} />
                  <Text style={styles.subscriptionButtonText}>
                    Assinaturas (Opcional)
                  </Text>
                  <MaterialIcons name="chevron-right" size={24} color={Colors.textSecondary} />
                </TouchableOpacity>
              </GlassCard>

              <GradientButton
                title="Salvar Cartão"
                onPress={handleSaveCard}
                style={styles.saveButton}
              />
            </ScrollView>
          </View>
        </GradientBackground>
      </Modal>

      {/* Add Subscription Modal */}
      <Modal
        visible={showSubscriptionModal}
        animationType="slide"
        presentationStyle="pageSheet"
      >
        <GradientBackground>
          <View style={[styles.modalContainer, { paddingTop: insets.top }]}>
            <View style={styles.modalHeader}>
              <TouchableOpacity onPress={() => setShowSubscriptionModal(false)}>
                <MaterialIcons name="close" size={28} color={Colors.textWhite} />
              </TouchableOpacity>
              <Text style={styles.modalTitle}>Nova Assinatura</Text>
              <View style={{ width: 28 }} />
            </View>

            <ScrollView
              style={styles.modalForm}
              contentContainerStyle={styles.modalFormContent}
              showsVerticalScrollIndicator={false}
            >
              <GlassCard>
                <Dropdown
                  label="Descrição"
                  value={subscriptionService}
                  options={SUBSCRIPTION_SERVICES}
                  onSelect={setSubscriptionService}
                  placeholder="Selecione o serviço"
                />

                <Input
                  label="Valor"
                  value={subscriptionValue}
                  onChangeText={setSubscriptionValue}
                  keyboardType="decimal-pad"
                  placeholder="R$ 0,00"
                />

                <Input
                  label="Vencimento"
                  value={subscriptionDueDay}
                  onChangeText={setSubscriptionDueDay}
                  keyboardType="number-pad"
                  placeholder="Dia do mês (1-31)"
                />
              </GlassCard>

              <GradientButton
                title="Salvar Assinatura"
                onPress={handleSaveSubscription}
                style={styles.saveButton}
              />
            </ScrollView>
          </View>
        </GradientBackground>
      </Modal>
    </GradientBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: Spacing.md,
  },
  contentContainer: {
    paddingBottom: Spacing.xxl,
  },
  title: {
    fontSize: Typography.h2,
    fontWeight: Typography.bold,
    color: Colors.textWhite,
    marginBottom: Spacing.md,
  },
  totalCard: {
    marginBottom: Spacing.lg,
    alignItems: 'center',
    paddingVertical: Spacing.lg,
  },
  totalLabel: {
    fontSize: Typography.bodySmall,
    color: Colors.textSecondary,
    marginBottom: Spacing.xs,
  },
  totalValue: {
    fontSize: 36,
    fontWeight: Typography.bold,
    color: Colors.textPrimary,
    marginBottom: Spacing.md,
  },
  totalDetail: {
    flexDirection: 'row',
    gap: Spacing.xl,
  },
  totalItem: {
    alignItems: 'center',
  },
  totalItemLabel: {
    fontSize: Typography.caption,
    color: Colors.textSecondary,
  },
  totalItemValue: {
    fontSize: Typography.body,
    fontWeight: Typography.semiBold,
    color: Colors.textPrimary,
    marginTop: 4,
  },
  section: {
    marginBottom: Spacing.lg,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.md,
  },
  sectionTitle: {
    fontSize: Typography.h4,
    fontWeight: Typography.semiBold,
    color: Colors.textWhite,
  },
  accountCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.sm,
    padding: Spacing.md,
  },
  accountHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  bankIcon: {
    width: 56,
    height: 56,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  accountInfo: {
    marginLeft: Spacing.md,
  },
  accountName: {
    fontSize: Typography.body,
    fontWeight: Typography.semiBold,
    color: Colors.textPrimary,
  },
  accountType: {
    fontSize: Typography.caption,
    color: Colors.textSecondary,
    marginTop: 2,
  },
  accountBalance: {
    fontSize: Typography.h4,
    fontWeight: Typography.bold,
    color: Colors.textPrimary,
  },
  cardCard: {
    marginBottom: Spacing.sm,
    padding: Spacing.md,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.md,
  },
  cardIcon: {
    width: 56,
    height: 56,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardInfo: {
    marginLeft: Spacing.md,
    flex: 1,
  },
  cardName: {
    fontSize: Typography.body,
    fontWeight: Typography.semiBold,
    color: Colors.textPrimary,
  },
  cardLimit: {
    fontSize: Typography.caption,
    color: Colors.textSecondary,
    marginTop: 2,
  },
  cardDetail: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: Spacing.md,
  },
  cardDetailItem: {
    flex: 1,
  },
  cardDetailLabel: {
    fontSize: Typography.caption,
    color: Colors.textSecondary,
  },
  cardDetailValue: {
    fontSize: Typography.body,
    fontWeight: Typography.semiBold,
    color: Colors.textPrimary,
    marginTop: 4,
  },
  progressBar: {
    height: 6,
    backgroundColor: 'rgba(0,0,0,0.1)',
    borderRadius: 3,
    marginBottom: Spacing.xs,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: Colors.gradientStart,
    borderRadius: 3,
  },
  progressText: {
    fontSize: Typography.caption,
    color: Colors.textSecondary,
    textAlign: 'right',
  },
  modalContainer: {
    flex: 1,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.md,
  },
  modalTitle: {
    fontSize: Typography.h3,
    fontWeight: Typography.bold,
    color: Colors.textWhite,
  },
  modalForm: {
    flex: 1,
    paddingHorizontal: Spacing.md,
  },
  modalFormContent: {
    paddingBottom: Spacing.xxl,
  },
  feeContainer: {
    marginTop: Spacing.md,
  },
  feeHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.md,
  },
  feeLabel: {
    flex: 1,
    fontSize: Typography.bodySmall,
    fontWeight: Typography.semiBold,
    color: Colors.textPrimary,
    marginRight: Spacing.sm,
  },
  feeFields: {
    marginTop: Spacing.sm,
  },
  subscriptionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: BorderRadius.sm,
    padding: Spacing.md,
    marginTop: Spacing.md,
  },
  subscriptionButtonText: {
    flex: 1,
    fontSize: Typography.body,
    fontWeight: Typography.semiBold,
    color: Colors.textPrimary,
    marginLeft: Spacing.md,
  },
  saveButton: {
    marginTop: Spacing.lg,
  },
});
