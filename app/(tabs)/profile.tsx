/**
 * Profile Screen
 * User settings and preferences
 */
import React from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { GradientBackground } from '@/components/layout';
import { GlassCard } from '@/components/ui';
import { Colors, Spacing, Typography, BorderRadius } from '@/constants/theme';
import { MaterialIcons } from '@expo/vector-icons';

export default function ProfileScreen() {
  const insets = useSafeAreaInsets();

  return (
    <GradientBackground>
      <ScrollView 
        style={[styles.container, { paddingTop: insets.top + Spacing.md }]}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <Text style={styles.title}>Perfil</Text>

        {/* Profile Card */}
        <GlassCard style={styles.profileCard}>
          <View style={styles.avatarContainer}>
            <View style={styles.avatar}>
              <MaterialIcons name="person" size={48} color={Colors.gradientStart} />
            </View>
            <TouchableOpacity style={styles.editAvatar}>
              <MaterialIcons name="camera-alt" size={16} color={Colors.textWhite} />
            </TouchableOpacity>
          </View>
          <Text style={styles.userName}>Maria Silva</Text>
          <Text style={styles.userEmail}>maria.silva@email.com</Text>
        </GlassCard>

        {/* Partner Connection */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Conexão de Parceiro</Text>
          <GlassCard style={styles.partnerCard}>
            <MaterialIcons name="favorite-border" size={32} color={Colors.expense} />
            <View style={styles.partnerInfo}>
              <Text style={styles.partnerTitle}>Nenhum parceiro conectado</Text>
              <Text style={styles.partnerText}>
                Convide seu parceiro para gerenciar finanças juntos
              </Text>
            </View>
            <TouchableOpacity style={styles.inviteButton}>
              <MaterialIcons name="person-add" size={20} color={Colors.textWhite} />
            </TouchableOpacity>
          </GlassCard>
        </View>

        {/* Settings */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Configurações</Text>
          
          <TouchableOpacity>
            <GlassCard style={styles.settingItem}>
              <MaterialIcons name="lock-outline" size={24} color={Colors.gradientStart} />
              <Text style={styles.settingText}>Privacidade</Text>
              <MaterialIcons name="chevron-right" size={24} color={Colors.textSecondary} />
            </GlassCard>
          </TouchableOpacity>

          <TouchableOpacity>
            <GlassCard style={styles.settingItem}>
              <MaterialIcons name="notifications-none" size={24} color={Colors.gradientStart} />
              <Text style={styles.settingText}>Notificações</Text>
              <MaterialIcons name="chevron-right" size={24} color={Colors.textSecondary} />
            </GlassCard>
          </TouchableOpacity>

          <TouchableOpacity>
            <GlassCard style={styles.settingItem}>
              <MaterialIcons name="language" size={24} color={Colors.gradientStart} />
              <Text style={styles.settingText}>Idioma</Text>
              <View style={styles.settingValue}>
                <Text style={styles.settingValueText}>Português</Text>
                <MaterialIcons name="chevron-right" size={24} color={Colors.textSecondary} />
              </View>
            </GlassCard>
          </TouchableOpacity>

          <TouchableOpacity>
            <GlassCard style={styles.settingItem}>
              <MaterialIcons name="help-outline" size={24} color={Colors.gradientStart} />
              <Text style={styles.settingText}>Ajuda e Suporte</Text>
              <MaterialIcons name="chevron-right" size={24} color={Colors.textSecondary} />
            </GlassCard>
          </TouchableOpacity>

          <TouchableOpacity>
            <GlassCard style={styles.settingItem}>
              <MaterialIcons name="info-outline" size={24} color={Colors.gradientStart} />
              <Text style={styles.settingText}>Sobre o Budget Duo</Text>
              <MaterialIcons name="chevron-right" size={24} color={Colors.textSecondary} />
            </GlassCard>
          </TouchableOpacity>
        </View>

        {/* Logout */}
        <TouchableOpacity style={styles.logoutButton}>
          <MaterialIcons name="logout" size={20} color={Colors.expense} />
          <Text style={styles.logoutText}>Sair da Conta</Text>
        </TouchableOpacity>

        <Text style={styles.version}>Versão 1.0.0</Text>
      </ScrollView>
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
  profileCard: {
    alignItems: 'center',
    paddingVertical: Spacing.lg,
    marginBottom: Spacing.lg,
  },
  avatarContainer: {
    position: 'relative',
    marginBottom: Spacing.md,
  },
  avatar: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: Colors.gradientStart + '20',
    alignItems: 'center',
    justifyContent: 'center',
  },
  editAvatar: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: Colors.gradientStart,
    alignItems: 'center',
    justifyContent: 'center',
  },
  userName: {
    fontSize: Typography.h3,
    fontWeight: Typography.bold,
    color: Colors.textPrimary,
  },
  userEmail: {
    fontSize: Typography.body,
    color: Colors.textSecondary,
    marginTop: 4,
  },
  section: {
    marginBottom: Spacing.lg,
  },
  sectionTitle: {
    fontSize: Typography.body,
    fontWeight: Typography.semiBold,
    color: Colors.textWhite,
    marginBottom: Spacing.md,
  },
  partnerCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: Spacing.md,
  },
  partnerInfo: {
    flex: 1,
    marginLeft: Spacing.md,
    marginRight: Spacing.sm,
  },
  partnerTitle: {
    fontSize: Typography.body,
    fontWeight: Typography.semiBold,
    color: Colors.textPrimary,
  },
  partnerText: {
    fontSize: Typography.bodySmall,
    color: Colors.textSecondary,
    marginTop: 4,
  },
  inviteButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.gradientStart,
    alignItems: 'center',
    justifyContent: 'center',
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: Spacing.md,
    marginBottom: Spacing.xs,
  },
  settingText: {
    flex: 1,
    fontSize: Typography.body,
    color: Colors.textPrimary,
    marginLeft: Spacing.md,
  },
  settingValue: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  settingValueText: {
    fontSize: Typography.body,
    color: Colors.textSecondary,
    marginRight: Spacing.xs,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: Spacing.md,
    marginTop: Spacing.md,
  },
  logoutText: {
    fontSize: Typography.body,
    fontWeight: Typography.semiBold,
    color: Colors.expense,
    marginLeft: Spacing.sm,
  },
  version: {
    fontSize: Typography.caption,
    color: Colors.textWhite,
    textAlign: 'center',
    marginTop: Spacing.lg,
    opacity: 0.6,
  },
});
