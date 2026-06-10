import { StyleSheet, View } from 'react-native';
import { Text, useTheme } from 'react-native-paper';

export default function ContactUsScreen() {
  const theme = useTheme();

  return (
    // Use theme.colors.background directly in the style
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={styles.content}>
        {/* Use theme.colors.primary and built-in variants */}
        <Text variant="headlineMedium" style={{ color: theme.colors.primary }}>
          Contact Us
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