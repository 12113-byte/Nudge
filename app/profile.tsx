import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { router } from 'expo-router';
import { StyleSheet, View } from 'react-native';
import { Button, Card, Text, useTheme } from 'react-native-paper';

const ROUTES = {
  BOOKINGS: '/bookings',
  FAVOURITES: '/favourites',
  REVIEWS: '/reviews',
  CONTACT: '/contact-us',
  SETTINGS: '/settings'
};

export default function ProfileScreen() {
  const theme = useTheme();

  const handleCardPress = (routeName: string) => {
    router.push(routeName as any);
  }

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={styles.content}>
        <View style={styles.cardContent}>
          {/* Profile Circle */}
          <View style={styles.profileContainer}>
            <View style={[styles.profileCircle, { backgroundColor: theme.colors.primary }]}>
              <MaterialCommunityIcons name="account-outline" size={50} color={theme.colors.background} />
            </View>

            <View style={[styles.settingsIcon, { backgroundColor: theme.colors.onPrimary, borderColor: theme.colors.primary }]}>
              <MaterialCommunityIcons
                name="cog"
                size={20}
                color={theme.colors.primary}
                onPress={() => router.push('/settings')}/>
            </View>
          </View>
          <Text style={styles.text} variant="titleLarge">Alex Morgan</Text>
          <Text style={[styles.text, { marginBottom: 24 }]} variant="bodyMedium">alex.morgan@email.com</Text>

          {/* Top 3 Cards Row */}
          <View style={styles.cardGroup}>
            {[
              { icon: 'star', val: '24', label: 'Bookings', route: ROUTES.BOOKINGS },
              { icon: 'heart', val: '12', label: 'Favourites', route: ROUTES.FAVOURITES },
              { icon: 'chat', val: '8', label: 'Reviews', route: ROUTES.REVIEWS }
            ].map((item, index) => (
              <Card key={index} style={[styles.profileCard, { backgroundColor: theme.colors.onPrimary}]} onPress={() => handleCardPress(item.route)}>
                <Card.Content style={styles.cardInner}>
                  <View style={styles.rowContainer}>
                    <MaterialCommunityIcons name={item.icon as any} size={20} color={theme.colors.primary} />
                    <Text style={styles.text} variant="titleLarge">{item.val}</Text>
                  </View>
                  <Text style={[styles.text, { fontSize: 12 }]} variant="bodySmall">{item.label}</Text>
                </Card.Content>
              </Card>
            ))}
          </View>

          {/* Contact Us Card */}
          <Card style={[styles.fullWidthCard, { width: '100%', marginBottom: 120, backgroundColor: theme.colors.onPrimary }]}
            onPress={() => handleCardPress('/contact-us')}
          >
            <Card.Content style={[styles.rowContainer, { gap: 16 }]}>
              <MaterialCommunityIcons name="chat-question" size={25} color={theme.colors.primary} />
              <Text style={styles.text} variant="titleLarge">Contact Us</Text>
            </Card.Content>
          </Card>

          {/* Log Out Button */}
          <Button mode="contained" buttonColor={theme.colors.primary} 
          onPress={() => router.replace("/login")}
          style={{ width: '100%', borderRadius: 12 }} contentStyle={{ height: 60 }} labelStyle={[styles.logoutText, { color: theme.colors.background }]}>
            <MaterialCommunityIcons name="logout" size={20} color={theme.colors.background} /> Log Out
          </Button>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardContent: {
    width: '85%',
    alignItems: 'center',
  },
  cardGroup: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'center',
    marginBottom: 16,
    gap: 10
  },
  profileCircle: {
    borderRadius: 50,
    width: 100,
    height: 100,
    margin: 0,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  text: {
    color: '#ffffff',
  },
  profileCard: {
    borderRadius: 12,
    flex: 1,
    justifyContent: 'center'
  },
  cardInner: {
    alignItems: 'center',
    padding: 12
  },
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  logoutText: {
    fontWeight: "bold",
    fontSize: 16,
  },
  fullWidthCard: {
    borderRadius: 12,
    width: '100%',
    marginBottom: 120,
    padding: 8,
  },
  settingsIcon: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    borderRadius: 15,
    padding: 4,
    borderWidth: 2,
  },
  profileContainer: {
    position: 'relative',
    marginBottom: 16,
    width: 100,
    height: 100
  }
});