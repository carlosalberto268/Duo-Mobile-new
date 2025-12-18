/**
 * Goals Screen
 * Manage savings goals and wishes
 */
import React, { useState } from 'react';
import {
  Alert,
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Modal,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { GradientBackground } from '@/components/layout';
import { GlassCard, Input, Dropdown, GradientButton } from '@/components/ui';
import { Colors, Spacing, Typography, BorderRadius } from '@/constants/theme';
import { MaterialIcons } from '@expo/vector-icons';
import { GOAL_TYPES, WISH_CATEGORIES, WISH_OPTIONS } from '@/constants/data';

// Auto icon selection for goals based on keywords
const AUTO_ICON_MAP: { [key: string]: string } = {
  // Travel/Vacation
  'viag': 'flight-takeoff',
  'férias': 'beach-access',
  'passeio': 'attractions',
  'turismo': 'flight-takeoff',
  'viajar': 'flight-takeoff',
  
  // Housing
  'casa': 'home',
  'apartamento': 'home',
  'imóvel': 'home',
  'moradia': 'home',
  'residência': 'home',
  
  // Vehicles
  'carro': 'directions-car',
  'moto': 'two-wheeler',
  'veículo': 'directions-car',
  'automóvel': 'directions-car',
  
  // Education
  'estudo': 'school',
  'educação': 'school',
  'curso': 'school',
  'faculdade': 'school',
  'universidade': 'school',
  'mestrado': 'school',
  'doutorado': 'school',
  
  // Family
  'casamento': 'favorite',
  'filho': 'child-care',
  'bebê': 'child-care',
  'família': 'people',
  
  // Business
  'negócio': 'business-center',
  'empresa': 'business-center',
  'empreend': 'business-center',
  
  // Savings
  'poupança': 'savings',
  'reserva': 'savings',
  'emergência': 'savings',
  
  // Electronics
  'celular': 'phone-iphone',
  'telefone': 'phone-iphone',
  'computador': 'computer',
  'notebook': 'computer',
  'laptop': 'computer',
  'tablet': 'tablet',
  
  // Accessories
  'relógio': 'watch',
  'joia': 'diamond',
  'jóia': 'diamond',
  
  // Entertainment
  'game': 'sports-esports',
  'console': 'sports-esports',
  'video': 'sports-esports',
  
  // Health/Fitness
  'saúde': 'fitness-center',
  'academia': 'fitness-center',
  'fitness': 'fitness-center',
  
  // Pets
  'pet': 'pets',
  'cachorro': 'pets',
  'gato': 'pets',
  'animal': 'pets',
};

function getAutoIcon(name: string): string {
  const normalized = name.toLowerCase().trim();
  
  // Check each keyword
  for (const [keyword, icon] of Object.entries(AUTO_ICON_MAP)) {
    if (normalized.includes(keyword)) {
      return icon;
    }
  }
  
  // Default icon
  return 'flag';
}

export default function GoalsScreen() {
  const insets = useSafeAreaInsets();
  const [activeTab, setActiveTab] = useState<'metas' | 'desejos'>('metas');
  const [isModalVisible, setIsModalVisible] = useState(false);

  // Mock data - set to empty to show create buttons
  const [goals] = useState([]);
  const [wishes] = useState([]);

  // Goal form state
  const [goalType, setGoalType] = useState('');
  const [goalName, setGoalName] = useState('');
  const [goalInitialValue, setGoalInitialValue] = useState('');
  const [goalTargetValue, setGoalTargetValue] = useState('');
  const [goalDeadline, setGoalDeadline] = useState('');

  // Wish form state
  const [wishName, setWishName] = useState('');
  const [wishDescription, setWishDescription] = useState('');
  const [wishValue, setWishValue] = useState('');
  const [wishCategory, setWishCategory] = useState('');

  const handleSaveGoal = () => {
    if (!goalName || !goalTargetValue || !goalType) {
      Alert.alert('Atenção', 'Preencha pelo menos o tipo, nome e valor da meta');
      return;
    }
    const autoIcon = getAutoIcon(goalName);
    console.log('✅ Saving goal with auto icon:', autoIcon, 'for name:', goalName);
    Alert.alert('Sucesso!', `Meta "${goalName}" criada com sucesso!`);
    setIsModalVisible(false);
    // Reset form
    setGoalType('');
    setGoalName('');
    setGoalInitialValue('');
    setGoalTargetValue('');
    setGoalDeadline('');
  };

  const handleSaveWish = () => {
    if (!wishName || !wishValue || !wishCategory) {
      Alert.alert('Atenção', 'Preencha pelo menos o desejo, valor e categoria');
      return;
    }
    console.log('✅ Saving wish:', { wishName, wishValue, wishCategory });
    Alert.alert('Sucesso!', `Desejo "${wishName}" adicionado à lista!`);
    setIsModalVisible(false);
    // Reset form
    setWishName('');
    setWishDescription('');
    setWishValue('');
    setWishCategory('');
  };

  return (
    <GradientBackground>
      <View style={[styles.container, { paddingTop: insets.top + Spacing.md }]}>
        {/* Header */}
        <Text style={styles.title}>Metas e Desejos</Text>

        {/* Tab Selector */}
        <View style={styles.tabContainer}>
          <TouchableOpacity
            style={[styles.tab, activeTab === 'metas' && styles.tabActive]}
            onPress={() => setActiveTab('metas')}
            activeOpacity={0.7}
          >
            <MaterialIcons
              name="flag"
              size={20}
              color={activeTab === 'metas' ? Colors.textWhite : 'rgba(255,255,255,0.7)'}
              style={styles.tabIcon}
            />
            <Text style={[styles.tabText, activeTab === 'metas' && styles.tabTextActive]}>
              Metas
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tab, activeTab === 'desejos' && styles.tabActive]}
            onPress={() => setActiveTab('desejos')}
            activeOpacity={0.7}
          >
            <MaterialIcons
              name="card-giftcard"
              size={20}
              color={activeTab === 'desejos' ? Colors.textWhite : 'rgba(255,255,255,0.7)'}
              style={styles.tabIcon}
            />
            <Text style={[styles.tabText, activeTab === 'desejos' && styles.tabTextActive]}>
              Lista de Desejos
            </Text>
          </TouchableOpacity>
        </View>

        {/* Content */}
        <ScrollView
          style={styles.content}
          contentContainerStyle={styles.contentContainer}
          showsVerticalScrollIndicator={false}
        >
          {activeTab === 'metas' ? (
            goals.length === 0 ? (
              <View style={styles.emptyState}>
                <MaterialIcons name="flag" size={64} color={Colors.textSecondary} />
                <Text style={styles.emptyTitle}>Nenhuma Meta Criada</Text>
                <Text style={styles.emptyDescription}>
                  Metas são desejos de longo prazo, como uma viagem, compra de imóvel ou aposentadoria.
                </Text>
                <GradientButton
                  title="Criar Meta de Longo Prazo"
                  onPress={() => setIsModalVisible(true)}
                  style={styles.createButton}
                />
              </View>
            ) : (
              <View style={styles.grid}>
                {goals.map((goal: any) => (
                  <GlassCard key={goal.id} style={styles.goalCard}>
                    {goal.type === 'shared' && (
                      <View style={styles.heartBackground}>
                        <MaterialIcons name="favorite" size={80} color="rgba(239, 68, 68, 0.1)" />
                      </View>
                    )}
                    <MaterialIcons name={goal.icon} size={32} color={Colors.gradientStart} />
                    <Text style={styles.goalName}>{goal.name}</Text>
                  </GlassCard>
                ))}
              </View>
            )
          ) : (
            wishes.length === 0 ? (
              <View style={styles.emptyState}>
                <MaterialIcons name="card-giftcard" size={64} color={Colors.textSecondary} />
                <Text style={styles.emptyTitle}>Nenhum Desejo Cadastrado</Text>
                <Text style={styles.emptyDescription}>
                  Desejos são realizações de curto prazo, como um jantar especial, presentes ou pequenas conquistas.
                </Text>
                <GradientButton
                  title="Cadastrar Desejo de Curto Prazo"
                  onPress={() => setIsModalVisible(true)}
                  style={styles.createButton}
                />
              </View>
            ) : (
              <View style={styles.grid}>
                {/* wishes will be rendered here */}
              </View>
            )
          )}
        </ScrollView>

        {/* FAB - only show if have items */}
        {((activeTab === 'metas' && goals.length > 0) || (activeTab === 'desejos' && wishes.length > 0)) && (
          <TouchableOpacity
            style={styles.fab}
            onPress={() => setIsModalVisible(true)}
          >
            <MaterialIcons name="add" size={28} color={Colors.textWhite} />
          </TouchableOpacity>
        )}
      </View>

      {/* Add Goal/Wish Modal */}
      <Modal
        visible={isModalVisible}
        animationType="slide"
        presentationStyle="pageSheet"
      >
        <GradientBackground>
          <View style={[styles.modalContainer, { paddingTop: insets.top }]}>
            <View style={styles.modalHeader}>
              <TouchableOpacity onPress={() => setIsModalVisible(false)}>
                <MaterialIcons name="close" size={28} color={Colors.textWhite} />
              </TouchableOpacity>
              <Text style={styles.modalTitle}>
                {activeTab === 'metas' ? 'Nova Meta' : 'Novo Desejo'}
              </Text>
              <View style={{ width: 28 }} />
            </View>

            <ScrollView
              style={styles.modalForm}
              contentContainerStyle={styles.modalFormContent}
              showsVerticalScrollIndicator={false}
            >
              <GlassCard>
                {activeTab === 'metas' ? (
                  <>
                    {/* Auto icon preview */}
                    {goalName.trim().length > 0 && (
                      <View style={styles.autoIconPreview}>
                        <Text style={styles.autoIconLabel}>Ícone Automático:</Text>
                        <View style={styles.autoIconDisplay}>
                          <MaterialIcons 
                            name={getAutoIcon(goalName)} 
                            size={32} 
                            color={Colors.gradientStart} 
                          />
                        </View>
                      </View>
                    )}

                    <Dropdown
                      label="Tipo de Meta"
                      value={goalType}
                      options={GOAL_TYPES.map((t) => t.label)}
                      onSelect={setGoalType}
                      placeholder="Selecione o tipo"
                    />
                    <Input
                      label="Nome da Meta"
                      value={goalName}
                      onChangeText={setGoalName}
                      placeholder="Ex: Viagem para Europa"
                    />
                    <Input
                      label="Valor Inicial"
                      value={goalInitialValue}
                      onChangeText={setGoalInitialValue}
                      keyboardType="decimal-pad"
                      placeholder="R$ 0,00"
                    />
                    <Input
                      label="Valor da Meta"
                      value={goalTargetValue}
                      onChangeText={setGoalTargetValue}
                      keyboardType="decimal-pad"
                      placeholder="R$ 0,00"
                    />
                    <Input
                      label="Prazo"
                      value={goalDeadline}
                      onChangeText={setGoalDeadline}
                      placeholder="DD/MM/AAAA"
                    />
                  </>
                ) : (
                  <>
                    <Dropdown
                      label="Desejo"
                      value={wishName}
                      options={WISH_OPTIONS}
                      onSelect={setWishName}
                      placeholder="Selecione o desejo"
                      showIcons={true}
                    />
                    <Input
                      label="Descrição"
                      value={wishDescription}
                      onChangeText={setWishDescription}
                      placeholder="Descreva seu desejo"
                      multiline
                      numberOfLines={3}
                    />
                    <Input
                      label="Valor"
                      value={wishValue}
                      onChangeText={setWishValue}
                      keyboardType="decimal-pad"
                      placeholder="R$ 0,00"
                    />
                    <Dropdown
                      label="De onde sairá o dinheiro?"
                      value={wishCategory}
                      options={WISH_CATEGORIES}
                      onSelect={setWishCategory}
                      placeholder="Selecione a categoria"
                    />
                  </>
                )}
              </GlassCard>

              <GradientButton
                title={activeTab === 'metas' ? 'Salvar Meta' : 'Salvar Desejo'}
                onPress={activeTab === 'metas' ? handleSaveGoal : handleSaveWish}
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
  title: {
    fontSize: Typography.h2,
    fontWeight: Typography.bold,
    color: Colors.textWhite,
    marginBottom: Spacing.md,
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: 'rgba(0,0,0,0.2)',
    borderRadius: BorderRadius.md,
    padding: 4,
    marginBottom: Spacing.md,
  },
  tab: {
    flex: 1,
    flexDirection: 'row',
    paddingVertical: Spacing.sm + 4,
    paddingHorizontal: Spacing.sm,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: BorderRadius.sm,
    gap: Spacing.xs,
  },
  tabActive: {
    backgroundColor: Colors.gradientStart,
    shadowColor: Colors.gradientStart,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
  },
  tabIcon: {
    marginRight: 4,
  },
  tabText: {
    fontSize: Typography.bodySmall,
    fontWeight: Typography.semiBold,
    color: 'rgba(255,255,255,0.7)',
  },
  tabTextActive: {
    color: Colors.textWhite,
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    paddingBottom: Spacing.xxl,
  },
  emptyState: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: Spacing.xxl,
    paddingHorizontal: Spacing.lg,
  },
  emptyTitle: {
    fontSize: Typography.h3,
    fontWeight: Typography.bold,
    color: Colors.textWhite,
    marginTop: Spacing.md,
    textAlign: 'center',
  },
  emptyDescription: {
    fontSize: Typography.body,
    color: Colors.textSecondary,
    marginTop: Spacing.sm,
    marginBottom: Spacing.lg,
    textAlign: 'center',
    lineHeight: 22,
  },
  createButton: {
    marginTop: Spacing.md,
    minWidth: 250,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.sm,
  },
  goalCard: {
    width: '48%',
    aspectRatio: 1,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  heartBackground: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    alignItems: 'center',
    justifyContent: 'center',
    opacity: 0.3,
  },
  goalName: {
    fontSize: Typography.body,
    color: Colors.textWhite,
    marginTop: Spacing.sm,
    textAlign: 'center',
  },
  fab: {
    position: 'absolute',
    right: Spacing.md,
    bottom: Spacing.xl,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: Colors.gradientStart,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
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
  saveButton: {
    marginTop: Spacing.lg,
  },
  autoIconPreview: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: Spacing.md,
    padding: Spacing.md,
    backgroundColor: 'rgba(102, 126, 234, 0.05)',
    borderRadius: BorderRadius.md,
    borderWidth: 1,
    borderColor: 'rgba(102, 126, 234, 0.2)',
  },
  autoIconLabel: {
    fontSize: Typography.body,
    color: Colors.textSecondary,
  },
  autoIconDisplay: {
    width: 48,
    height: 48,
    borderRadius: BorderRadius.sm,
    backgroundColor: 'rgba(102, 126, 234, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
