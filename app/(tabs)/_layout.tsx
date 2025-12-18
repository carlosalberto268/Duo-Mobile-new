// ==== IMPORTS (todos no topo)
import { Tabs } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';
import { Platform } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Colors } from '@/constants/theme';
import Animated, { useAnimatedStyle, withTiming } from 'react-native-reanimated';

// ==== Função principal
export default function TabsLayout() {
  const insets = useSafeAreaInsets();

  // ==== Componente animado do ícone
  const TabBarIcon = ({ focused, name, size }) => {
    const animatedStyle = useAnimatedStyle(() => ({
      transform: [{ scale: withTiming(focused ? 1.25 : 1, { duration: 150 }) }],
    }));

    return (
      <Animated.View
        style={[
          {
            alignItems: 'center',
            justifyContent: 'center',
            width: 60,
            height: 40,
            borderRadius: 12,
            backgroundColor: focused ? Colors.tabBarActive : 'transparent',
          },
          animatedStyle,
        ]}
      >
        <MaterialIcons
          name={name}
          size={size}
          color={focused ? Colors.textWhite : Colors.tabBarInactive}
        />
      </Animated.View>
    );
  };

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: Colors.textWhite,
        tabBarInactiveTintColor: Colors.tabBarInactive,
        tabBarStyle: {
          backgroundColor: Colors.tabBarBackground,
          borderTopColor: Colors.tabBarBorder,
          borderTopWidth: 1,
          height: Platform.select({
            ios: insets.bottom + 60,
            android: insets.bottom + 60,
            default: 70,
          }),
          paddingTop: 8,
          paddingBottom: Platform.select({
            ios: insets.bottom + 8,
            android: insets.bottom + 8,
            default: 8,
          }),
          paddingHorizontal: 16,
        },

        // ==== Animação do label (texto some ao focar)
        tabBarLabel: ({ focused, children }) => {
          const animatedLabel = useAnimatedStyle(() => ({
            opacity: withTiming(focused ? 0 : 1, { duration: 150 }),
          }));

          return (
            <Animated.Text
              style={[
                animatedLabel,
                {
                  fontSize: 12,
                  fontWeight: '600',
                  marginTop: 2,
                  color: focused ? Colors.textWhite : Colors.tabBarInactive,
                },
              ]}
            >
              {children}
            </Animated.Text>
          );
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Início',
          tabBarIcon: ({ focused, size }) => (
            <TabBarIcon focused={focused} name="dashboard" size={size} />
          ),
        }}
      />

      <Tabs.Screen
        name="transactions"
        options={{
          title: 'Transações',
          tabBarIcon: ({ focused, size }) => (
            <TabBarIcon focused={focused} name="receipt-long" size={size} />
          ),
        }}
      />

      <Tabs.Screen
        name="accounts"
        options={{
          title: 'Contas',
          tabBarIcon: ({ focused, size }) => (
            <TabBarIcon focused={focused} name="account-balance" size={size} />
          ),
        }}
      />

      <Tabs.Screen
        name="journey"
        options={{
          title: 'Jornada',
          tabBarIcon: ({ focused, size }) => (
            <TabBarIcon focused={focused} name="emoji-events" size={size} />
          ),
        }}
      />

      <Tabs.Screen
        name="profile"
        options={{
          title: 'Perfil',
          tabBarIcon: ({ focused, size }) => (
            <TabBarIcon focused={focused} name="person" size={size} />
          ),
        }}
      />

      {/* Telas ocultas da tab bar */}
      <Tabs.Screen
        name="goals"
        options={{
          href: null,
        }}
      />

      <Tabs.Screen
        name="add-transaction"
        options={{
          href: null,
        }}
      />

      <Tabs.Screen
        name="scan-qrcode"
        options={{
          href: null,
        }}
      />
    </Tabs>
  );
}
