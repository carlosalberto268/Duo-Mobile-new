/**
 * Root Layout
 * Main navigation structure with onboarding check
 */
import { Stack, useRouter, useSegments } from 'expo-router';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ThemeProvider } from '@/contexts/ThemeContext';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    'Inter-Regular': require('../assets/fonts/SpaceMono-Regular.ttf'),
  });
  const [onboardingCompleted, setOnboardingCompleted] = useState<boolean | null>(null);
  const router = useRouter();
  const segments = useSegments();

  useEffect(() => {
    checkOnboarding();
  }, []);

  useEffect(() => {
    if (fontsLoaded && onboardingCompleted !== null) {
      SplashScreen.hideAsync();
      
      // Navigate based on onboarding status
      if (!onboardingCompleted && segments[0] !== 'onboarding') {
        router.replace('/onboarding');
      }
    }
  }, [fontsLoaded, onboardingCompleted, segments]);

  const checkOnboarding = async () => {
    try {
      const completed = await AsyncStorage.getItem('onboarding_completed');
      setOnboardingCompleted(completed === 'true');
    } catch (error) {
      console.error('Error checking onboarding:', error);
      setOnboardingCompleted(false);
    }
  };

  if (!fontsLoaded || onboardingCompleted === null) {
    return null;
  }

  return (
    <ThemeProvider>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="onboarding" options={{ headerShown: false }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
    </ThemeProvider>
  );
}
