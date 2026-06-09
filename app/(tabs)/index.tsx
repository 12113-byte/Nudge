import { StyleSheet, View } from 'react-native';
import { Text, useTheme } from 'react-native-paper';

export default function HomeScreen() {
  const theme = useTheme();

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

// for testing, to access login screen needs Redirect import
//   export default function Page() {
//   return <Redirect href="/login" />;
// }

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