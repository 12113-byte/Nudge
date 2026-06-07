import { Ionicons } from '@expo/vector-icons';
import { DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Tabs } from 'expo-router';
import { StyleSheet, View } from 'react-native';

const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#FF6B6B', // Custom primary color (Red)
    background: '#142140', // Background color for screens
  }
}

export default function RootLayout() {
  return (
    <ThemeProvider value={MyTheme}>
      <TabLayout />
    </ThemeProvider>
  );
}

export function TabLayout() {
  return (
    <Tabs
    initialRouteName='index'          // app starts with Home Screen
      screenOptions={{
        headerShown: false,           // Hides the header for all tabs
        tabBarActiveTintColor: '#FF6B6B', // Changes active icon color (Blue)
        tabBarInactiveTintColor: '#8E8E93', // Changes inactive icon color (Gray)
        tabBarShowLabel: false,         // Hides the tab labels for a cleaner look

        tabBarStyle: {
          backgroundColor: '#2a3652',
          borderTopWidth: 0,              // Removes border on iOS
          elevation: 0,                   // Removes shadow on Android
          height: 85,
          paddingTop: 10,
        }
      }}>

      {/* Maps/Explore Tab */} 
      <Tabs.Screen
        name="explore"
        options={{
          title: 'Explore',
          tabBarIcon: ({ color, focused }) => (
          <View style={{ alignItems: 'center', justifyContent: 'center'}}>
            <Ionicons size={28} name={focused ? 'compass' : 'compass-outline'} color={color} />
            {focused && <View style={[styles.activeDot, { backgroundColor: color }]} /> } 
          </View>
          ),
        }}
        />

      {/* HOME TAB */}
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, focused }) => (
            <View style={{ alignItems: 'center', justifyContent: 'center'}}>
              <Ionicons size={28} name={focused ? 'home' : 'home-outline'} color={color} />
              {focused && <View style={[styles.activeDot, { backgroundColor: color }]} /> } 
            </View>
          ),
        }}
      />

      {/* FAVOURITES TAB */}
      <Tabs.Screen
        name="favourites"
        options={{
          title: 'Favourites',
          tabBarIcon: ({ color, focused }) => (
            <View style={{ alignItems: 'center', justifyContent: 'center'}}>
              <Ionicons size={28} name={focused ? 'heart' : 'heart-outline'} color={color} />
              {focused && <View style={[styles.activeDot, { backgroundColor: color }]} /> } 
            </View>
          ),
        }}
        />

      {/* Put your future tabs right here using the exact same format! */}

    </Tabs>
  );
}

const styles = StyleSheet.create({
  activeDot: {
    width: 6,
    height: 6,
    borderRadius: 3,        
    position: 'absolute',     // <-- Floating independently
    bottom: -10,              // <-- Keeps it safely below the icon without pushing it
  },
});