/**
 * Profile Screen - COMPLETE VERSION
 * User settings, privacy, security, help, and themes
 */
import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Modal,
  TextInput,
  Switch,
  Alert,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import { GradientBackground } from '@/components/layout';
import { GlassCard, GradientButton } from '@/components/ui';
import { Colors, Spacing, Typography, BorderRadius } from '@/constants/theme';
import { useTheme } from '@/contexts/ThemeContext';

export default function ProfileScreen() {
  const insets = useSafeAreaInsets();
  const { theme, setTheme } = useTheme();

  // Modals
  const [editProfileModal, setEditProfileModal] = useState(false);
  const [privacyModal, setPrivacyModal] = useState(false);
  const [securityModal, setSecurityModal] = useState(false);
  const [dangerZoneModal, setDangerZoneModal] = useState(false);
  const [helpModal, setHelpModal] = useState(false);
  const [themesModal, setThemesModal] = useState(false);

  // Mock user data
  const [userData, setUserData] = useState({
    fullName: 'João Silva',
    email: 'joao@example.com',
    phone: '+55 11 99623 8220',
    birthdate: '30/12/1983',
    address: 'São Paulo, SP',
    bio: 'Conte um pouco sobre você...',
  });

  const [partner] = useState({
    name: 'Maria Santos',
    email: 'maria@example.com',
    avatar_url: undefined,
  });

  // Privacy settings
  const [sharedAccounts, setSharedAccounts] = useState([
    { id: '1', name: 'Nubank - Conta', type: 'Conta Corrente', shared: true },
    { id: '2', name: 'Inter - Poupança', type: 'Conta Poupança', shared: false },
  ]);

  const [sharedCards, setSharedCards] = useState([
    { id: '1', name: 'Nubank Ultravioleta', type: 'Final ****1234', shared: true },
    { id: '2', name: 'XP Visa Infinite', type: 'Final ****5678', shared: false },
  ]);

  // Theme options
  const themes = [
    { id: 'dark', name: 'Escuro', desc: 'Tema padrão com fundo preto', color: '#000000', gradient: '#667eea' },
    { id: 'light', name: 'Claro', desc: 'Tema claro e suave', color: '#f3f4f6', gradient: '#667eea' },
    { id: 'ocean', name: 'Oceano', desc: 'Tons de azul profundo', color: '#0c4a6e', gradient: '#0ea5e9' },
    { id: 'forest', name: 'Floresta', desc: 'Tons de verde natural', color: '#14532d', gradient: '#22c55e' },
  ];

  const handleSelectTheme = (themeId: string) => {
    setTheme(themeId);
    Alert.alert('Tema Alterado!', `O tema "${themes.find(t => t.id === themeId)?.name}" foi aplicado com sucesso`);
    setThemesModal(false);
  };

  const handleSaveProfile = () => {
    Alert.alert('Sucesso!', 'Perfil atualizado com sucesso');
    setEditProfileModal(false);
  };

  const handleToggleAccountSharing = (accountId: string) => {
    setSharedAccounts(prev =>
      prev.map(acc => (acc.id === accountId ? { ...acc, shared: !acc.shared } : acc))
    );
  };

  const handleToggleCardSharing = (cardId: string) => {
    setSharedCards(prev =>
      prev.map(card => (card.id === cardId ? { ...card, shared: !card.shared } : card))
    );
  };

  const handleEnable2FA = () => {
    Alert.alert('2FA', 'Funcionalidade de autenticação de 2 fatores será implementada em breve');
  };

  const handleLogoutOtherSessions = () => {
    Alert.alert(
      'Encerrar Sessões',
      'Deseja encerrar a sessão em todos os outros dispositivos?',
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Sair', style: 'destructive', onPress: () => Alert.alert('Sucesso', 'Sessões encerradas') },
      ]
    );
  };

  const handleExportData = () => {
    Alert.alert('Exportar Dados', 'Seus dados serão exportados em formato JSON. Isso pode levar alguns minutos.');
  };

  const handleDeleteAccount = () => {
    Alert.alert(
      '⚠️ Excluir Conta',
      'ATENÇÃO: Esta ação é PERMANENTE e NÃO PODE ser desfeita. Todos os seus dados serão apagados.\n\nDeseja realmente excluir sua conta?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Excluir',
          style: 'destructive',
          onPress: () => {
            Alert.alert('Conta Excluída', 'Sua conta foi excluída permanentemente');
          },
        },
      ]
    );
  };

  return (
    <GradientBackground>
      <ScrollView
        style={[styles.container, { paddingTop: insets.top + Spacing.md }]}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.title}>Perfil</Text>

        {/* User Info Card */}
        <GlassCard style={styles.userCard}>
          <View style={styles.avatarContainer}>
            <View style={styles.avatar}>
              <MaterialIcons name="person" size={48} color={Colors.textWhite} />
            </View>
          </View>
          <Text style={styles.userName}>{userData.fullName}</Text>
          <Text style={styles.userEmail}>{userData.email}</Text>
          <TouchableOpacity
            style={styles.editButton}
            onPress={() => setEditProfileModal(true)}
          >
            <MaterialIcons name="edit" size={16} color={Colors.gradientStart} />
            <Text style={styles.editButtonText}>Editar Perfil</Text>
          </TouchableOpacity>
        </GlassCard>

        {/* Partner Connected */}
        {partner && (
          <GlassCard style={styles.partnerCard}>
            <MaterialIcons name="favorite" size={24} color={Colors.expense} />
            <View style={styles.partnerInfo}>
              <Text style={styles.partnerLabel}>Parceiro(a) Conectado(a)</Text>
              <Text style={styles.partnerName}>{partner.name}</Text>
              <Text style={styles.partnerEmail}>{partner.email}</Text>
            </View>
          </GlassCard>
        )}

        {/* Settings */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Configurações</Text>

          <TouchableOpacity onPress={() => setThemesModal(true)}>
            <GlassCard style={styles.settingItem}>
              <MaterialIcons name="palette" size={24} color={Colors.gradientStart} />
              <Text style={styles.settingText}>Temas</Text>
              <MaterialIcons name="chevron-right" size={24} color={Colors.textSecondary} />
            </GlassCard>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => setPrivacyModal(true)}>
            <GlassCard style={styles.settingItem}>
              <MaterialIcons name="lock-outline" size={24} color={Colors.gradientStart} />
              <Text style={styles.settingText}>Privacidade</Text>
              <MaterialIcons name="chevron-right" size={24} color={Colors.textSecondary} />
            </GlassCard>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => setSecurityModal(true)}>
            <GlassCard style={styles.settingItem}>
              <MaterialIcons name="security" size={24} color={Colors.success} />
              <Text style={styles.settingText}>Segurança da Conta</Text>
              <MaterialIcons name="chevron-right" size={24} color={Colors.textSecondary} />
            </GlassCard>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => setHelpModal(true)}>
            <GlassCard style={styles.settingItem}>
              <MaterialIcons name="help-outline" size={24} color={Colors.info} />
              <Text style={styles.settingText}>Ajuda</Text>
              <MaterialIcons name="chevron-right" size={24} color={Colors.textSecondary} />
            </GlassCard>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => setDangerZoneModal(true)}>
            <GlassCard style={[styles.settingItem, styles.dangerItem]}>
              <MaterialIcons name="warning" size={24} color={Colors.error} />
              <Text style={[styles.settingText, { color: Colors.error }]}>Zona de Perigo</Text>
              <MaterialIcons name="chevron-right" size={24} color={Colors.error} />
            </GlassCard>
          </TouchableOpacity>
        </View>

        {/* Logout */}
        <GradientButton
          title="Sair da Conta"
          onPress={() => Alert.alert('Logout', 'Você foi desconectado')}
          style={styles.logoutButton}
        />
      </ScrollView>

      {/* Edit Profile Modal */}
      <Modal visible={editProfileModal} animationType="slide" presentationStyle="pageSheet">
        <GradientBackground>
          <View style={[styles.modalContainer, { paddingTop: insets.top }]}>
            <View style={styles.modalHeader}>
              <TouchableOpacity onPress={() => setEditProfileModal(false)}>
                <MaterialIcons name="close" size={28} color={Colors.textWhite} />
              </TouchableOpacity>
              <Text style={styles.modalTitle}>Editar Perfil</Text>
              <View style={{ width: 28 }} />
            </View>

            <ScrollView
              style={styles.modalContent}
              contentContainerStyle={styles.modalContentContainer}
              showsVerticalScrollIndicator={false}
            >
              <GlassCard>
                <Text style={styles.formSectionTitle}>Informações Pessoais</Text>

                <Text style={styles.inputLabel}>Nome Completo</Text>
                <TextInput
                  style={styles.input}
                  value={userData.fullName}
                  onChangeText={(text) => setUserData({ ...userData, fullName: text })}
                  placeholder="Seu nome completo"
                  placeholderTextColor={Colors.textSecondary}
                />

                <Text style={styles.inputLabel}>E-mail</Text>
                <TextInput
                  style={styles.input}
                  value={userData.email}
                  onChangeText={(text) => setUserData({ ...userData, email: text })}
                  placeholder="seu@email.com"
                  placeholderTextColor={Colors.textSecondary}
                  keyboardType="email-address"
                  autoCapitalize="none"
                />

                <Text style={styles.inputLabel}>Telefone</Text>
                <TextInput
                  style={styles.input}
                  value={userData.phone}
                  onChangeText={(text) => setUserData({ ...userData, phone: text })}
                  placeholder="+55 11 99999 9999"
                  placeholderTextColor={Colors.textSecondary}
                  keyboardType="phone-pad"
                />

                <Text style={styles.inputLabel}>Data de Nascimento</Text>
                <TextInput
                  style={styles.input}
                  value={userData.birthdate}
                  onChangeText={(text) => setUserData({ ...userData, birthdate: text })}
                  placeholder="DD/MM/AAAA"
                  placeholderTextColor={Colors.textSecondary}
                />

                <Text style={styles.inputLabel}>Endereço</Text>
                <TextInput
                  style={styles.input}
                  value={userData.address}
                  onChangeText={(text) => setUserData({ ...userData, address: text })}
                  placeholder="Cidade, Estado"
                  placeholderTextColor={Colors.textSecondary}
                />

                <Text style={styles.inputLabel}>Biografia</Text>
                <TextInput
                  style={[styles.input, styles.textArea]}
                  value={userData.bio}
                  onChangeText={(text) => setUserData({ ...userData, bio: text })}
                  placeholder="Conte um pouco sobre você..."
                  placeholderTextColor={Colors.textSecondary}
                  multiline
                  numberOfLines={4}
                  textAlignVertical="top"
                />

                <GradientButton
                  title="Salvar Alterações"
                  onPress={handleSaveProfile}
                  style={styles.saveButton}
                />
              </GlassCard>
            </ScrollView>
          </View>
        </GradientBackground>
      </Modal>

      {/* Privacy Modal */}
      <Modal visible={privacyModal} animationType="slide" presentationStyle="pageSheet">
        <GradientBackground>
          <View style={[styles.modalContainer, { paddingTop: insets.top }]}>
            <View style={styles.modalHeader}>
              <TouchableOpacity onPress={() => setPrivacyModal(false)}>
                <MaterialIcons name="close" size={28} color={Colors.textWhite} />
              </TouchableOpacity>
              <Text style={styles.modalTitle}>Privacidade</Text>
              <View style={{ width: 28 }} />
            </View>

            <ScrollView
              style={styles.modalContent}
              contentContainerStyle={styles.modalContentContainer}
              showsVerticalScrollIndicator={false}
            >
              <GlassCard>
                <Text style={styles.formSectionTitle}>Controle de Compartilhamento</Text>
                <Text style={styles.formDescription}>
                  Decida quais informações você compartilha com seu/sua parceiro(a). As alterações são salvas automaticamente.
                </Text>

                <Text style={styles.privacySectionTitle}>Cartões de Crédito</Text>
                {sharedCards.map((card) => (
                  <View key={card.id} style={styles.privacyItem}>
                    <View style={styles.privacyIcon}>
                      <MaterialIcons name="credit-card" size={24} color={Colors.gradientStart} />
                    </View>
                    <View style={styles.privacyInfo}>
                      <Text style={styles.privacyItemName}>{card.name}</Text>
                      <Text style={styles.privacyItemType}>{card.type}</Text>
                    </View>
                    <Switch
                      value={card.shared}
                      onValueChange={() => handleToggleCardSharing(card.id)}
                      trackColor={{ false: '#ccc', true: Colors.gradientStart }}
                      thumbColor="#fff"
                    />
                  </View>
                ))}

                <Text style={styles.privacySectionTitle}>Contas Bancárias</Text>
                {sharedAccounts.map((account) => (
                  <View key={account.id} style={styles.privacyItem}>
                    <View style={styles.privacyIcon}>
                      <MaterialIcons name="account-balance" size={24} color={Colors.info} />
                    </View>
                    <View style={styles.privacyInfo}>
                      <Text style={styles.privacyItemName}>{account.name}</Text>
                      <Text style={styles.privacyItemType}>{account.type}</Text>
                    </View>
                    <Switch
                      value={account.shared}
                      onValueChange={() => handleToggleAccountSharing(account.id)}
                      trackColor={{ false: '#ccc', true: Colors.gradientStart }}
                      thumbColor="#fff"
                    />
                  </View>
                ))}
              </GlassCard>
            </ScrollView>
          </View>
        </GradientBackground>
      </Modal>

      {/* Security Modal */}
      <Modal visible={securityModal} animationType="slide" presentationStyle="pageSheet">
        <GradientBackground>
          <View style={[styles.modalContainer, { paddingTop: insets.top }]}>
            <View style={styles.modalHeader}>
              <TouchableOpacity onPress={() => setSecurityModal(false)}>
                <MaterialIcons name="close" size={28} color={Colors.textWhite} />
              </TouchableOpacity>
              <Text style={styles.modalTitle}>Segurança da Conta</Text>
              <View style={{ width: 28 }} />
            </View>

            <ScrollView
              style={styles.modalContent}
              contentContainerStyle={styles.modalContentContainer}
              showsVerticalScrollIndicator={false}
            >
              <GlassCard>
                <Text style={styles.formSectionTitle}>Fortaleça a proteção da sua conta Budget Duo.</Text>

                <View style={styles.securityItem}>
                  <View style={styles.securityIcon}>
                    <MaterialIcons name="shield" size={32} color={Colors.gradientStart} />
                  </View>
                  <View style={styles.securityInfo}>
                    <Text style={styles.securityTitle}>Autenticação de 2 Fatores (2FA)</Text>
                    <Text style={styles.securityDesc}>
                      Aumente drasticamente a segurança da sua conta.
                    </Text>
                  </View>
                  <TouchableOpacity
                    style={styles.securityButton}
                    onPress={handleEnable2FA}
                  >
                    <Text style={styles.securityButtonText}>Ativar</Text>
                  </TouchableOpacity>
                </View>

                <View style={styles.securityItem}>
                  <View style={styles.securityIcon}>
                    <MaterialIcons name="exit-to-app" size={32} color={Colors.warning} />
                  </View>
                  <View style={styles.securityInfo}>
                    <Text style={styles.securityTitle}>Sessões Ativas</Text>
                    <Text style={styles.securityDesc}>
                      Encerre a sessão em todos os outros dispositivos.
                    </Text>
                  </View>
                  <TouchableOpacity
                    style={[styles.securityButton, styles.securityButtonDanger]}
                    onPress={handleLogoutOtherSessions}
                  >
                    <Text style={[styles.securityButtonText, { color: Colors.textWhite }]}>Sair</Text>
                  </TouchableOpacity>
                </View>
              </GlassCard>
            </ScrollView>
          </View>
        </GradientBackground>
      </Modal>

      {/* Danger Zone Modal */}
      <Modal visible={dangerZoneModal} animationType="slide" presentationStyle="pageSheet">
        <GradientBackground>
          <View style={[styles.modalContainer, { paddingTop: insets.top }]}>
            <View style={styles.modalHeader}>
              <TouchableOpacity onPress={() => setDangerZoneModal(false)}>
                <MaterialIcons name="close" size={28} color={Colors.textWhite} />
              </TouchableOpacity>
              <Text style={styles.modalTitle}>Zona de Perigo</Text>
              <View style={{ width: 28 }} />
            </View>

            <ScrollView
              style={styles.modalContent}
              contentContainerStyle={styles.modalContentContainer}
              showsVerticalScrollIndicator={false}
            >
              <GlassCard style={styles.dangerCard}>
                <View style={styles.dangerHeader}>
                  <MaterialIcons name="warning" size={32} color={Colors.error} />
                  <Text style={styles.dangerTitle}>Zona de Perigo</Text>
                </View>
                <Text style={styles.dangerDesc}>
                  Ações nesta seção são permanentes e não podem ser desfeitas.
                </Text>

                <View style={styles.dangerItem}>
                  <View style={styles.dangerIcon}>
                    <MaterialIcons name="download" size={32} color={Colors.textWhite} />
                  </View>
                  <View style={styles.dangerInfo}>
                    <Text style={styles.dangerItemTitle}>Backup de Dados</Text>
                    <Text style={styles.dangerItemDesc}>
                      Faça o backup dos seus dados antes de grandes mudanças.
                    </Text>
                  </View>
                  <TouchableOpacity
                    style={styles.dangerButton}
                    onPress={handleExportData}
                  >
                    <Text style={styles.dangerButtonText}>Exportar</Text>
                  </TouchableOpacity>
                </View>

                <View style={styles.dangerItem}>
                  <View style={styles.dangerIcon}>
                    <MaterialIcons name="delete-forever" size={32} color={Colors.error} />
                  </View>
                  <View style={styles.dangerInfo}>
                    <Text style={styles.dangerItemTitle}>Excluir Conta</Text>
                    <Text style={styles.dangerItemDesc}>
                      Excluir permanentemente sua conta e todos os dados.
                    </Text>
                  </View>
                  <TouchableOpacity
                    style={[styles.dangerButton, styles.dangerButtonDelete]}
                    onPress={handleDeleteAccount}
                  >
                    <Text style={[styles.dangerButtonText, { color: Colors.textWhite }]}>Excluir</Text>
                  </TouchableOpacity>
                </View>
              </GlassCard>
            </ScrollView>
          </View>
        </GradientBackground>
      </Modal>

      {/* Help Modal */}
      <Modal visible={helpModal} animationType="slide" presentationStyle="pageSheet">
        <GradientBackground>
          <View style={[styles.modalContainer, { paddingTop: insets.top }]}>
            <View style={styles.modalHeader}>
              <TouchableOpacity onPress={() => setHelpModal(false)}>
                <MaterialIcons name="close" size={28} color={Colors.textWhite} />
              </TouchableOpacity>
              <Text style={styles.modalTitle}>Ajuda</Text>
              <View style={{ width: 28 }} />
            </View>

            <ScrollView
              style={styles.modalContent}
              contentContainerStyle={styles.modalContentContainer}
              showsVerticalScrollIndicator={false}
            >
              <GlassCard>
                <Text style={styles.helpSectionTitle}>📊 Gerenciar Transações</Text>
                <Text style={styles.helpText}>
                  • Adicionar: Toque no botão "+" flutuante ou "Adicionar Gasto" na tela inicial{'\n'}
                  • Categorizar: Selecione uma categoria ao criar a transação{'\n'}
                  • Editar: Deslize a transação para a esquerda até ver "Editar"{'\n'}
                  • Dividir: Deslize levemente para a esquerda para dividir com o parceiro{'\n'}
                  • Escanear QR Code: Use o botão de câmera para importar PIX ou NFC-e
                </Text>

                <Text style={styles.helpSectionTitle}>💳 Contas e Cartões</Text>
                <Text style={styles.helpText}>
                  • Adicionar Conta: Toque no ícone "+" na seção de contas bancárias{'\n'}
                  • Adicionar Cartão: Toque no ícone "+" na seção de cartões de crédito{'\n'}
                  • Assinaturas: Ao criar um cartão, adicione serviços recorrentes (Netflix, Spotify){'\n'}
                  • Tarifa Mensal: Ative o switch "Possui tarifa" ao cadastrar conta bancária
                </Text>

                <Text style={styles.helpSectionTitle}>🎯 Metas e Desejos</Text>
                <Text style={styles.helpText}>
                  • Criar Meta: Defina nome, valor alvo e prazo. O ícone é escolhido automaticamente{'\n'}
                  • Meta Compartilhada: Selecione "Compartilhada" para aparecer o coração{'\n'}
                  • Contribuir: Toque na meta e clique em "Adicionar Contribuição"{'\n'}
                  • Desejos: Escolha categoria e valor para desejos de curto prazo
                </Text>

                <Text style={styles.helpSectionTitle}>🚀 Jornada Duo</Text>
                <Text style={styles.helpText}>
                  • Status Financeiro: Baseado na sua taxa de poupança mensal{'\n'}
                  • Ganhar XP: Complete missões e atinja metas{'\n'}
                  • Conquistas: Desbloqueie medalhas cumprindo desafios{'\n'}
                  • Nossos Acordos: Defina regras financeiras com o parceiro
                </Text>

                <Text style={styles.helpSectionTitle}>👥 Parceiro</Text>
                <Text style={styles.helpText}>
                  • Convidar: Toque no banner ou no ícone de usuário e escolha "Convidar Parceiro"{'\n'}
                  • Privacidade: Configure quais contas/cartões o parceiro pode ver{'\n'}
                  • Desconectar: Acesse Perfil → Zona de Perigo
                </Text>

                <Text style={styles.helpSectionTitle}>🔔 Notificações</Text>
                <Text style={styles.helpText}>
                  • Vencimentos: Receba alertas de contas próximas ao vencimento{'\n'}
                  • Metas: Acompanhe progresso e conquistas{'\n'}
                  • Gerenciar: Toque no sino para marcar como lida ou limpar todas
                </Text>

                <Text style={styles.helpSectionTitle}>🎨 Personalização</Text>
                <Text style={styles.helpText}>
                  • Temas: Acesse Perfil → Temas para trocar entre Escuro, Claro, Oceano e Floresta{'\n'}
                  • Categorias: Personalize categorias de despesas (em breve)
                </Text>

                <Text style={styles.helpSectionTitle}>💬 Suporte</Text>
                <Text style={styles.helpText}>
                  • Email: suporte@budgetduo.com{'\n'}
                  • Discord: discord.gg/budgetduo{'\n'}
                  • Horário: Segunda a Sexta, 9h às 18h
                </Text>
              </GlassCard>
            </ScrollView>
          </View>
        </GradientBackground>
      </Modal>

      {/* Themes Modal */}
      <Modal visible={themesModal} animationType="slide" presentationStyle="pageSheet">
        <GradientBackground>
          <View style={[styles.modalContainer, { paddingTop: insets.top }]}>
            <View style={styles.modalHeader}>
              <TouchableOpacity onPress={() => setThemesModal(false)}>
                <MaterialIcons name="close" size={28} color={Colors.textWhite} />
              </TouchableOpacity>
              <Text style={styles.modalTitle}>Temas</Text>
              <View style={{ width: 28 }} />
            </View>

            <ScrollView
              style={styles.modalContent}
              contentContainerStyle={styles.modalContentContainer}
              showsVerticalScrollIndicator={false}
            >
              <GlassCard>
                <Text style={styles.themesTitle}>Escolha seu tema preferido</Text>
                <Text style={styles.themesDescription}>
                  O app mudará automaticamente para o tema selecionado
                </Text>

                {themes.map((themeOption) => (
                  <TouchableOpacity
                    key={themeOption.id}
                    style={styles.themeCard}
                    onPress={() => handleSelectTheme(themeOption.id)}
                  >
                    <View style={[styles.themePreview, { backgroundColor: themeOption.color }]}>
                      <View style={styles.themePreviewInner}>
                        <View style={[styles.themePreviewGradient, { backgroundColor: themeOption.gradient }]} />
                      </View>
                    </View>
                    <View style={styles.themeInfo}>
                      <Text style={styles.themeName}>{themeOption.name}</Text>
                      <Text style={styles.themeSubtext}>{themeOption.desc}</Text>
                    </View>
                    <MaterialIcons
                      name={theme.id === themeOption.id ? "check-circle" : "radio-button-unchecked"}
                      size={24}
                      color={theme.id === themeOption.id ? Colors.gradientStart : Colors.textSecondary}
                    />
                  </TouchableOpacity>
                ))}
              </GlassCard>
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
  userCard: {
    alignItems: 'center',
    paddingVertical: Spacing.lg,
    marginBottom: Spacing.md,
  },
  avatarContainer: {
    marginBottom: Spacing.md,
  },
  avatar: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: Colors.gradientStart,
    alignItems: 'center',
    justifyContent: 'center',
  },
  userName: {
    fontSize: Typography.h3,
    fontWeight: Typography.bold,
    color: Colors.textWhite,
    marginBottom: Spacing.xs,
  },
  userEmail: {
    fontSize: Typography.body,
    color: Colors.textSecondary,
    marginBottom: Spacing.md,
  },
  editButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
    paddingVertical: Spacing.sm,
    paddingHorizontal: Spacing.md,
    borderRadius: BorderRadius.full,
    backgroundColor: 'rgba(102, 126, 234, 0.1)',
    borderWidth: 1,
    borderColor: Colors.gradientStart,
  },
  editButtonText: {
    fontSize: Typography.bodySmall,
    fontWeight: Typography.semiBold,
    color: Colors.gradientStart,
  },
  partnerCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: Spacing.md,
    marginBottom: Spacing.md,
  },
  partnerInfo: {
    marginLeft: Spacing.md,
    flex: 1,
  },
  partnerLabel: {
    fontSize: Typography.caption,
    color: Colors.textSecondary,
  },
  partnerName: {
    fontSize: Typography.body,
    fontWeight: Typography.bold,
    color: Colors.textWhite,
    marginTop: 2,
  },
  partnerEmail: {
    fontSize: Typography.bodySmall,
    color: Colors.textSecondary,
    marginTop: 2,
  },
  section: {
    marginBottom: Spacing.lg,
  },
  sectionTitle: {
    fontSize: Typography.body,
    fontWeight: Typography.bold,
    color: Colors.textWhite,
    marginBottom: Spacing.md,
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
  dangerItem: {
    borderColor: Colors.error,
    borderWidth: 1,
  },
  logoutButton: {
    marginTop: Spacing.md,
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
  modalContent: {
    flex: 1,
    paddingHorizontal: Spacing.md,
  },
  modalContentContainer: {
    paddingBottom: Spacing.xxl,
    gap: Spacing.md,
  },
  formSectionTitle: {
    fontSize: Typography.h4,
    fontWeight: Typography.bold,
    color: Colors.textPrimary,
    marginBottom: Spacing.sm,
  },
  formDescription: {
    fontSize: Typography.bodySmall,
    color: Colors.textSecondary,
    marginBottom: Spacing.lg,
  },
  inputLabel: {
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
    marginBottom: Spacing.sm,
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  saveButton: {
    marginTop: Spacing.md,
  },
  privacySectionTitle: {
    fontSize: Typography.body,
    fontWeight: Typography.bold,
    color: Colors.textWhite,
    marginTop: Spacing.lg,
    marginBottom: Spacing.md,
  },
  privacyItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: Spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: Colors.glassBorder,
  },
  privacyIcon: {
    width: 48,
    height: 48,
    borderRadius: BorderRadius.sm,
    backgroundColor: 'rgba(102, 126, 234, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: Spacing.md,
  },
  privacyInfo: {
    flex: 1,
  },
  privacyItemName: {
    fontSize: Typography.body,
    fontWeight: Typography.semiBold,
    color: Colors.textWhite,
  },
  privacyItemType: {
    fontSize: Typography.caption,
    color: Colors.textSecondary,
    marginTop: 2,
  },
  securityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: Spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: Colors.glassBorder,
  },
  securityIcon: {
    width: 56,
    height: 56,
    borderRadius: BorderRadius.sm,
    backgroundColor: 'rgba(102, 126, 234, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: Spacing.md,
  },
  securityInfo: {
    flex: 1,
  },
  securityTitle: {
    fontSize: Typography.body,
    fontWeight: Typography.bold,
    color: Colors.textWhite,
  },
  securityDesc: {
    fontSize: Typography.bodySmall,
    color: Colors.textSecondary,
    marginTop: 2,
  },
  securityButton: {
    paddingVertical: Spacing.sm,
    paddingHorizontal: Spacing.md,
    borderRadius: BorderRadius.full,
    backgroundColor: Colors.gradientStart,
  },
  securityButtonDanger: {
    backgroundColor: Colors.error,
  },
  securityButtonText: {
    fontSize: Typography.bodySmall,
    fontWeight: Typography.bold,
    color: Colors.textWhite,
  },
  dangerCard: {
    borderColor: Colors.error,
    borderWidth: 1,
  },
  dangerHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    marginBottom: Spacing.md,
  },
  dangerTitle: {
    fontSize: Typography.h4,
    fontWeight: Typography.bold,
    color: Colors.error,
  },
  dangerDesc: {
    fontSize: Typography.bodySmall,
    color: Colors.textSecondary,
    marginBottom: Spacing.lg,
  },
  dangerIcon: {
    width: 56,
    height: 56,
    borderRadius: BorderRadius.sm,
    backgroundColor: 'rgba(239, 68, 68, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: Spacing.md,
  },
  dangerButton: {
    paddingVertical: Spacing.sm,
    paddingHorizontal: Spacing.md,
    borderRadius: BorderRadius.full,
    borderWidth: 1,
    borderColor: Colors.textWhite,
  },
  dangerButtonDelete: {
    backgroundColor: Colors.error,
    borderColor: Colors.error,
  },
  dangerButtonText: {
    fontSize: Typography.bodySmall,
    fontWeight: Typography.bold,
    color: Colors.textWhite,
  },
  helpSectionTitle: {
    fontSize: Typography.body,
    fontWeight: Typography.bold,
    color: Colors.textWhite,
    marginTop: Spacing.lg,
    marginBottom: Spacing.sm,
  },
  helpText: {
    fontSize: Typography.bodySmall,
    color: Colors.textSecondary,
    lineHeight: 20,
  },
  themesTitle: {
    fontSize: Typography.h4,
    fontWeight: Typography.bold,
    color: Colors.textPrimary,
    marginBottom: Spacing.sm,
  },
  themesDescription: {
    fontSize: Typography.body,
    color: Colors.textSecondary,
    marginBottom: Spacing.lg,
  },
  themeCard: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: Spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: Colors.glassBorder,
  },
  themePreview: {
    width: 56,
    height: 56,
    borderRadius: BorderRadius.sm,
    padding: 4,
    marginRight: Spacing.md,
  },
  themePreviewInner: {
    flex: 1,
    borderRadius: BorderRadius.sm - 2,
    overflow: 'hidden',
  },
  themePreviewGradient: {
    flex: 1,
  },
  themeInfo: {
    flex: 1,
  },
  themeName: {
    fontSize: Typography.body,
    fontWeight: Typography.bold,
    color: Colors.textPrimary,
  },
  themeSubtext: {
    fontSize: Typography.bodySmall,
    color: Colors.textSecondary,
    marginTop: 2,
  },
});
