import Entypo from '@expo/vector-icons/Entypo';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { StyleSheet, View } from 'react-native';
import { Button, Text, TextInput, useTheme } from 'react-native-paper';

export default function ContactUsScreen() {
  const theme = useTheme();

  return (
    // Use theme.colors.background directly in the style
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={styles.content}>
        <View style={styles.profileContainer}>
          <View style={[styles.profileCircle, { backgroundColor: theme.colors.primary }]}>
            <MaterialCommunityIcons name="chat-question" size={40} color={theme.colors.background} />
          </View>
        </View>
        <Text style={[styles.text, { marginBottom: 5 }]} variant="titleLarge">Contact Us</Text>
        <Text style={[styles.text, { textAlign: 'center', color: theme.colors.tertiary }]}
          variant="bodyLarge">Have questions or feedback? We'd love to hear from you!</Text>
        {[
          { icon: 'account-outline', val: 'Your full name', label: 'Name' },
          { icon: 'email', val: 'your.email@example.com', label: 'Email' },
          { icon: 'chat', val: 'What is this about?', label: 'Subject' },
          { icon: 'chat', val: "tell us what's on your mind...", label: 'Message' }
        ].map((item, index) => (
          <View key={index} style={styles.inputContainer}>
            <Text style={{ textAlign: 'left' }}>{item.label}</Text>
            <TextInput
              mode="outlined"
              theme={{ roundness: 12 }}
              label={item.val}
              style={[styles.input, { backgroundColor: theme.colors.onPrimary }]}
              left={<TextInput.Icon icon={item.icon} color={theme.colors.primary} />}
            />
          </View>
        ))}
        <Button mode="contained" buttonColor={theme.colors.primary}
          onPress={() => console.log("Message sent!")} // Work out router later
          style={{ width: '100%', borderRadius: 12, marginTop: 20 }} contentStyle={{ height: 60 }} labelStyle={[styles.logoutText, { color: theme.colors.background }]}>
          <Entypo name="paper-plane" size={20} color={theme.colors.background} /> Send Message
        </Button>
      </View>
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
    alignItems: 'center',
    width: '85%'
  },
  profileContainer: {
    position: 'relative',
    marginBottom: 0,
    width: 100,
    height: 100,
    alignItems: 'center',
  },
  profileCircle: {
    borderRadius: 40,
    width: 80,
    height: 80,
    margin: 0,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  text: {
    color: '#ffffff',
  },
  inputContainer: {
    marginHorizontal: 24,
    width: '100%',
    marginBottom: 5,
    alignItems: 'flex-start',
  },
  input: {
    width: '100%',
    borderRadius: 12,
    height: 60
  },
  logoutText: {
    fontWeight: "bold",
    fontSize: 16,
  },

});