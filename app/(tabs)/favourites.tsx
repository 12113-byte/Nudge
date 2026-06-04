import { AppText } from '@/components/AppText';
import TopNavBar from '@/components/TopNavBar';
import { StyleSheet, View } from 'react-native';

export default function ExploreScreen() {
  return (
    <View style={styles.container}>
        <TopNavBar />
        <View style={styles.content}>
      <AppText style={styles.text}>Favourites Page Content Goes Here!</AppText>
        </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'stretch',
  },
    content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});