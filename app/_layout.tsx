import TopNavBar from '@/components/TopNavBar';
import { DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import {
  MD3LightTheme as PaperDefaultTheme,
  PaperProvider
} from 'react-native-paper';
import 'react-native-reanimated';


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

export const unstable_settings = { // unstable_ prefix means API is not finalised yet, needs change later
  anchor: '(tabs)', // default starting point
};

export default function RootLayout() {
  return (
    <PaperProvider theme={theme}>
    <ThemeProvider value={colorScheme === 'dark' ? customDarkNavigationTheme : customLightNavigationTheme}>
      <Stack screenOptions={{
        header: () => <TopNavBar /> }}> 
        <Stack.Screen name="(tabs)" options={{ headerShown: true }} />
        <Stack.Screen name="login" options={{ headerShown: false }} />
        <Stack.Screen name="forgot-password" options={{ headerShown: false }} />
        <Stack.Screen name="sign-up" options={{ headerShown: false, animation: 'none' }} />
        <Stack.Screen name="modal" options={{ presentation: 'modal', title: 'Modal' }} />
        <Stack.Screen name="profile" options={{ headerShown: true}} />
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
    </PaperProvider>
  );
}
