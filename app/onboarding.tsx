/**
 * Onboarding Screen - FIXED VERSION
 * Simple, functional flow
 */
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Alert,
} from 'react-native';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { MaterialIcons } from '@expo/vector-icons';
import { GradientBackground } from '@/components/layout';
import { GlassCard, GradientButton } from '@/components/ui';
import { Colors, Spacing, Typography, BorderRadius } from '@/constants/theme';

export default function OnboardingScreen() {
  const router = useRouter();
  const [step, setStep] = useState(1);

  // Step 2 data
  const [partnerName, setPartnerName] = useState('');
  const [partnerEmail, setPartnerEmail] = useState('');

  // Step 3 data
  const [divisionType, setDivisionType] = useState<'50/50' | 'proportional' | 'later'>('50/50');

  // === NAVIGATION FUNCTIONS ===
  
  const finishOnboarding = async () => {
    try {
      await AsyncStorage.setItem('onboarding_completed', 'true');
      router.replace('/(tabs)');
    } catch (error) {
      Alert.alert('Erro', 'Falha ao finalizar. Tente novamente.');
    }
  };

  const handleUseSolo = () => {
    finishOnboarding();
  };

  const handleStart = () => {
    setStep(2);
  };

  const handleSkipPartner = () => {
    setStep(3);
  };

  const handleInvitePartner = () => {
    if (!partnerName.trim() || !partnerEmail.trim()) {
      Alert.alert('Atenção', 'Preencha nome e e-mail do parceiro');
      return;
    }
    
    Alert.alert(
      'Convite Enviado!',
      `Convite enviado para ${partnerEmail}`,
      [{ 
        text: 'OK', 
        onPress: () => setStep(3)
      }]
    );
  };

  const handleContinue = () => {
    if (divisionType === '50/50' || divisionType === 'later') {
      finishOnboarding();
    } else {
      setStep(4);
    }
  };

  const handleFinish = () => {
    finishOnboarding();
  };

  // === GLOBAL SKIP BUTTON ===
  const SkipButton = () => (
    <View style={styles.skipContainer}>
      <TouchableOpacity onPress={finishOnboarding}>
        <Text style={styles.skipText}>Pular</Text>
      </TouchableOpacity>
    </View>
  );

  // === RENDER SCREENS ===

  if (step === 1) {
    return (
      <GradientBackground>
        <SkipButton />

        <View style={styles.container}>
          <View style={styles.logoContainer}>
            <View style={styles.logo}>
              <MaterialIcons name="favorite" size={48} color={Colors.textWhite} />
            </View>
            <Text style={styles.appName}>Budget Duo</Text>
          </View>

          <View style={styles.content}>
            <Text style={styles.title}>Organizem a vida financeira juntos.</Text>
            <Text style={styles.subtitle}>Menos planilhas. Mais clareza.</Text>
          </View>

          <View style={styles.footer}>
            <GradientButton
              title="Começar"
              onPress={handleStart}
              style={styles.primaryButton}
            />
            <TouchableOpacity onPress={handleUseSolo}>
              <Text style={styles.secondaryButton}>Usar sozinho</Text>
            </TouchableOpacity>
          </View>
        </View>
      </GradientBackground>
    );
  }

  if (step === 2) {
    return (
      <GradientBackground>
        <SkipButton />

        <View style={styles.container}>
          <View style={styles.avatarContainer}>
            <View style={styles.avatarCircle}>
              <MaterialIcons name="person" size={48} color={Colors.textWhite} />
            </View>
          </View>

          <View style={styles.content}>
            <Text style={styles.title}>Convide quem divide a vida com você</Text>
            <Text style={styles.subtitle}>
              Vocês terão visões individuais e uma visão conjunta.
            </Text>

            <GlassCard style={styles.inviteForm}>
              <Text style={styles.inputLabel}>Nome do parceiro</Text>
              <TextInput
                style={styles.input}
                value={partnerName}
                onChangeText={setPartnerName}
                placeholder="Digite o nome"
                placeholderTextColor={Colors.textSecondary}
              />

              <Text style={styles.inputLabel}>E-mail do parceiro</Text>
              <TextInput
                style={styles.input}
                value={partnerEmail}
                onChangeText={setPartnerEmail}
                placeholder="Digite o e-mail"
                placeholderTextColor={Colors.textSecondary}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </GlassCard>
          </View>

          <View style={styles.footer}>
            <GradientButton
              title="Convidar parceiro"
              onPress={handleInvitePartner}
              style={styles.primaryButton}
            />
            <TouchableOpacity onPress={handleSkipPartner}>
              <Text style={styles.secondaryButton}>Pular por enquanto</Text>
            </TouchableOpacity>
          </View>
        </View>
      </GradientBackground>
    );
  }

  if (step === 3) {
    return (
      <GradientBackground>
        <SkipButton />

        <View style={styles.container}>
          <View style={styles.content}>
            <Text style={styles.title}>Como vocês dividem as despesas?</Text>

            <View style={styles.divisionOptions}>
              {[
                { key: '50/50', title: '50 / 50', subtitle: 'Dividir tudo igualmente' },
                { key: 'proportional', title: 'Proporcional à renda', subtitle: 'Cada um contribui conforme ganha' },
                { key: 'later', title: 'Definir depois', subtitle: 'Configurar mais tarde' },
              ].map(option => (
                <TouchableOpacity
                  key={option.key}
                  style={[
                    styles.divisionCard,
                    divisionType === option.key && styles.divisionCardActive,
                  ]}
                  onPress={() => setDivisionType(option.key as any)}
                >
                  <MaterialIcons
                    name={
                      divisionType === option.key
                        ? 'radio-button-checked'
                        : 'radio-button-unchecked'
                    }
                    size={24}
                    color={
                      divisionType === option.key
                        ? Colors.gradientStart
                        : Colors.textSecondary
                    }
                  />
                  <View style={styles.divisionInfo}>
                    <Text style={styles.divisionTitle}>{option.title}</Text>
                    <Text style={styles.divisionSubtitle}>{option.subtitle}</Text>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <View style={styles.footer}>
            <GradientButton
              title="Continuar"
              onPress={handleContinue}
              style={styles.primaryButton}
            />
          </View>
        </View>
      </GradientBackground>
    );
  }

  if (step === 4) {
    return (
      <GradientBackground>
        <SkipButton />

        <View style={styles.container}>
          <View style={styles.content}>
            <Text style={styles.title}>Alguma despesa fixa individual?</Text>
            <Text style={styles.subtitle}>
              Defina quem paga cada categoria específica
            </Text>

            <GlassCard style={styles.rulesCard}>
              <TouchableOpacity 
                style={styles.addRuleButton} 
                onPress={() => Alert.alert('Em breve', 'Funcionalidade em desenvolvimento')}
              >
                <MaterialIcons name="add-circle-outline" size={24} color={Colors.gradientStart} />
                <Text style={styles.addRuleText}>Adicionar regra</Text>
              </TouchableOpacity>

              <Text style={styles.helperText}>
                Exemplos: Mercado → João, Aluguel → Maria
              </Text>
            </GlassCard>
          </View>

          <View style={styles.footer}>
            <GradientButton
              title="Finalizar"
              onPress={handleFinish}
              style={styles.primaryButton}
            />
          </View>
        </View>
      </GradientBackground>
    );
  }

  return null;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.xxl,
    justifyContent: 'space-between',
  },
  skipContainer: {
    position: 'absolute',
    top: Spacing.xl,
    right: Spacing.lg,
    zIndex: 100,
  },
  skipText: {
    color: Colors.textSecondary,
    fontSize: Typography.bodySmall,
    fontWeight: Typography.semiBold,
  },
  logoContainer: {
    alignItems: 'center',
    marginTop: Spacing.xxl,
  },
  logo: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: Colors.gradientStart,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.md,
  },
  appName: {
    fontSize: Typography.h2,
    fontWeight: Typography.bold,
    color: Colors.textWhite,
  },
  avatarContainer: {
    alignItems: 'center',
    marginTop: Spacing.xxl,
  },
  avatarCircle: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: Colors.gradientStart,
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    gap: Spacing.lg,
  },
  title: {
    fontSize: Typography.h1,
    fontWeight: Typography.bold,
    color: Colors.textWhite,
    textAlign: 'center',
    lineHeight: 40,
  },
  subtitle: {
    fontSize: Typography.h4,
    color: Colors.textSecondary,
    textAlign: 'center',
    lineHeight: 28,
  },
  footer: {
    gap: Spacing.md,
  },
  primaryButton: {},
  secondaryButton: {
    fontSize: Typography.body,
    fontWeight: Typography.semiBold,
    color: Colors.gradientStart,
    textAlign: 'center',
    paddingVertical: Spacing.md,
  },
  inviteForm: {
    marginTop: Spacing.lg,
  },
  inputLabel: {
    fontSize: Typography.body,
    fontWeight: Typography.semiBold,
    color: Colors.textWhite,
    marginBottom: Spacing.xs,
    marginTop: Spacing.sm,
  },
  input: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: BorderRadius.sm,
    borderWidth: 1,
    borderColor: Colors.glassBorder,
    padding: Spacing.md,
    fontSize: Typography.body,
    color: Colors.textWhite,
  },
  divisionOptions: {
    gap: Spacing.sm,
  },
  divisionCard: {
    backgroundColor: Colors.glassBackground,
    borderRadius: BorderRadius.md,
    borderWidth: 1,
    borderColor: Colors.glassBorder,
    padding: Spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
  },
  divisionCardActive: {
    borderColor: Colors.gradientStart,
    borderWidth: 2,
  },
  divisionInfo: {
    flex: 1,
  },
  divisionTitle: {
    fontSize: Typography.body,
    fontWeight: Typography.semiBold,
    color: Colors.textWhite,
  },
  divisionSubtitle: {
    fontSize: Typography.bodySmall,
    color: Colors.textSecondary,
    marginTop: 2,
  },
  rulesCard: {
    marginTop: Spacing.lg,
  },
  addRuleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.sm,
    paddingVertical: Spacing.md,
    borderRadius: BorderRadius.sm,
    borderWidth: 2,
    borderColor: Colors.gradientStart,
    borderStyle: 'dashed',
  },
  addRuleText: {
    fontSize: Typography.body,
    fontWeight: Typography.semiBold,
    color: Colors.gradientStart,
  },
  helperText: {
    fontSize: Typography.bodySmall,
    color: Colors.textSecondary,
    marginTop: Spacing.md,
    textAlign: 'center',
  },
});
