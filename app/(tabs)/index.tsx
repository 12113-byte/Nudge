import { useAuth } from '@/src/context/AuthContext';
import { Redirect } from 'expo-router';
import { StyleSheet, View } from 'react-native';
import { Text, useTheme } from 'react-native-paper';

export default function HomeScreen() {
  const theme = useTheme();
  const { userToken, isLoading } = useAuth(); // userToken detects if logged in or not, isLoading detects if still checking SecureStore for a saved token

  if (isLoading) return null; // on app start won't render until checked for saved token

  if (!userToken) return <Redirect href="/login" />; // if not logged in, redirect to it

  return (
    // Use theme.colors.background directly in the style
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={styles.content}>
        {/* Use theme.colors.primary and built-in variants */}
        <Text variant="headlineMedium" style={{ color: theme.colors.primary }}>
          Hello Team
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
