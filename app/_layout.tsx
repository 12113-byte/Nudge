import TopNavBar from '@/components/TopNavBar';
import { AuthProvider } from '@/src/context/AuthContext';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import {
  MD3DarkTheme as PaperDefaultTheme,
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
    onPrimary: '#2a3652',
  }
}

export const unstable_settings = { // unstable_ prefix means API is not finalised yet, needs change later
  anchor: '(tabs)', // default starting point
};

export default function RootLayout() {
  return (
    <AuthProvider>
      <PaperProvider theme={theme}>
        <Stack screenOptions={{
          header: () => <TopNavBar />
        }}>
          <Stack.Screen name="(tabs)" options={{ headerShown: true }} />
          <Stack.Screen name="login" options={{
            headerShown: false, animation: 'none', gestureEnabled: false
          }} />
          <Stack.Screen name="forgot-password" options={{ headerShown: false }} />
          <Stack.Screen name="sign-up-customer" options={{
            headerShown: false, animation: 'none', gestureEnabled: false // not able to go back
          }} />
          <Stack.Screen name="sign-up-business" options={{
            headerShown: false, animation: 'none', gestureEnabled: false // not able to go back
          }} />
          <Stack.Screen name="modal" options={{ presentation: 'modal', title: 'Modal' }} />
          <Stack.Screen name="profile" options={{ headerShown: true }} />
          <Stack.Screen name="contact-us" options={{ headerShown: true }} />
          <Stack.Screen name="bookings" options={{ headerShown: true }} />
          <Stack.Screen name="reviews" options={{ headerShown: true }} />
          <Stack.Screen name="settings" options={{ headerShown: true }} />
        </Stack>
        <StatusBar style="light" />
      </PaperProvider>
    </AuthProvider>
  );
}
