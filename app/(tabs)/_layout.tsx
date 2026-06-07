import { Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { useTheme } from 'react-native-paper';

export default function TabLayout() {
  const theme = useTheme();

  const renderTabIcon = (name: string) => ({ color, focused }: { color: string; focused: boolean }) => (
    <View style={styles.iconContainer}>
      <Ionicons size={28}
      name={(focused ? name : `${name}-outline`) as any}
      color={color} 
      />
      {focused && <View style={[styles.activeDot, { backgroundColor: color }]} /> }
    </View>
  );

return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: theme.colors.tertiary,
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: theme.colors.onPrimary,
          borderTopWidth: 0,
          elevation: 0,
        },
      }}
    >
      <Tabs.Screen name="explore" options={{ tabBarIcon: renderTabIcon('compass') }} />
      <Tabs.Screen name="index" options={{ tabBarIcon: renderTabIcon('home') }} />
      <Tabs.Screen name="favourites" options={{ tabBarIcon: renderTabIcon('heart') }} />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  iconContainer: { alignItems: 'center', justifyContent: 'center' },
  activeDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    position: 'absolute',
    bottom: -10,
  },
});