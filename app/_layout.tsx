import TopNavBar from '@/components/TopNavBar';
import { DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import {
  MD3LightTheme as PaperDefaultTheme,
  PaperProvider
} from 'react-native-paper';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/use-color-scheme';

const theme = {
  ...PaperDefaultTheme,
  colors: {
    ...PaperDefaultTheme.colors,
    background: '#142140',
    primary: '#FF6B6B',
    tertiary: '#8E8E93',
    onPrimary: '#2a3652'
  }
}

const customDarkNavigationTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#FF6B6B', // Custom primary color (Red)
    secondary: '#37425c', // Custom secondary color (Dark Blue)
    background: '#142140', // Background color for screens
  }
}

const customLightNavigationTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#FF6B6B', // Custom primary color (Red)
    secondary: '#37425c', // Custom secondary color (Dark Blue)
    background: '#142140', // Background color for screens
  }
}

export const unstable_settings = {
  anchor: '(tabs)',
};

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <PaperProvider theme={theme}>
    <ThemeProvider value={colorScheme === 'dark' ? customDarkNavigationTheme : customLightNavigationTheme}>
      <Stack screenOptions={{
        header: () => <TopNavBar /> }}> 
        <Stack.Screen name="(tabs)" options={{ headerShown: true }} />
        <Stack.Screen name="modal" options={{ presentation: 'modal', title: 'Modal' }} />
        <Stack.Screen name="profile" options={{ headerShown: true}} />
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
    </PaperProvider>
  );
}
