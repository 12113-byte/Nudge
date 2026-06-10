import { MOCK_FAVOURITES } from '@/constants/data';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Button, Card, Text, useTheme } from 'react-native-paper';

export default function FavouritesScreen() {
  const theme = useTheme();
  const sourceData = MOCK_FAVOURITES;

  return (
    // Use theme.colors.background directly in the style
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <ScrollView contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
      style={{ width: '100%'}}>

        <View style={[styles.fullWidthCard, { width: '100%', marginBottom: 20 }]}>
          <View style={[styles.shadow, { opacity: 0.3 }]} />
          <Card style={[styles.fullWidthCard, { backgroundColor: theme.colors.primary }]}>
            <Card.Content>
              <View style={styles.savedFavourites}>
                <Text variant="bodySmall">
                  <MaterialCommunityIcons name="heart" size={18} />
                  Saved Favourites</Text>
              </View>
              <Text variant="titleLarge">Plans you love,</Text>
              <Text variant="titleLarge" style={{ marginBottom: 8 }}>ready when you are.</Text>
              <Text variant="titleMedium">4 saved spots</Text>
            </Card.Content>
          </Card>
        </View>

        {sourceData.map((item) => (
          <Card
            key={item.business_id}
            style={[styles.fullWidthCard, { backgroundColor: theme.colors.onPrimary, marginBottom: 15 }]}
          >
            <Card.Content>
              <Text variant="bodySmall">{item.status}</Text>
              <Text variant="titleMedium">{item.name}</Text>

              <View style={[styles.rowContainer, { marginBottom: 8 }]}>
                {[
                  { icon: "star", val: item.rating, itemColor: "yellow" },
                  { icon: "google-maps", val: item.distance, itemColor: theme.colors.tertiary },
                  { icon: "clock-outline", val: item.time, itemColor: theme.colors.tertiary },
                ].map((subItem, index) => (
                  <View key={index} style={styles.iconContainer}>
                    <MaterialCommunityIcons name={subItem.icon as any} size={20} color={subItem.itemColor} />
                    <Text variant="bodyMedium">{subItem.val}</Text>
                  </View>
                ))}
              </View>
              <View style={styles.rowContainer}>
                <Button mode="contained" buttonColor={theme.colors.primary}
                  onPress={() => console.log("Taking customer to booking screen")} // Change once Booking page is set up
                  compact={true}
                  style={{
                    alignSelf: 'flex-start', // Don't let it stretch
                    borderRadius: 30,       // Match your aesthetic
                  }}
                  contentStyle={{
                    height: 30,             // Force specific height
                    width: 50
                  }}
                  labelStyle={{
                    fontSize: 12,           // Force smaller text
                    marginVertical: 0,      // Kill the internal vertical spacing
                    marginHorizontal: 0     // Kill the internal horizontal spacing
                  }}
                >
                  Book It
                </Button>
                <Button mode="contained" buttonColor={theme.colors.onPrimary}
                  onPress={() => console.log("Taking customer to booking screen")} // Change once Booking page is set up
                  compact={true}
                  style={{
                    alignSelf: 'flex-start', // Don't let it stretch
                    borderRadius: 30,       // Match your aesthetic
                    borderColor: theme.colors.tertiary, borderWidth: 1
                  }}
                  contentStyle={{
                    height: 30,             // Force specific height
                    width: 50
                  }}
                  labelStyle={{
                    fontSize: 12,           // Force smaller text
                    marginVertical: 0,      // Kill the internal vertical spacing
                    marginHorizontal: 0     // Kill the internal horizontal spacing
                  }}
                ><MaterialCommunityIcons name="trash-can-outline" size={25} color={theme.colors.tertiary} /></Button>
              </View>
            </Card.Content>
          </Card>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center'
  },
  content: {
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  fullWidthCard: {
    borderRadius: 30,
    alignSelf: 'stretch',
    marginTop: 5
  },
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  shadow: {
    position: 'absolute',
    top: 4, // Offset to create the glow border
    left: 0,
    right: 0,
    bottom: -4,
    borderRadius: 35, // Slightly larger than the card
    backgroundColor: 'rgba(255, 149, 149, 0.92)', // White glow
  },
  savedFavourites: {
    backgroundColor: '#ffffff4d',
    borderRadius: 12,
    padding: 4,
    alignSelf: 'flex-start',
    marginBottom: 10
  },
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2
  },
});