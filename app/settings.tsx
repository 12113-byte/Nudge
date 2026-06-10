import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { router } from 'expo-router';
import { StyleSheet, View } from 'react-native';
import { Button, Text, TextInput, useTheme } from 'react-native-paper';

export default function SettingsScreen() {
    const theme = useTheme();

    return (
        // Use theme.colors.background directly in the style
        <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
            <View style={styles.content}>
                {/* Profile Circle */}
                <View style={styles.profileContainer}>
                    <View style={[styles.profileCircle, { backgroundColor: theme.colors.primary }]}>
                        <MaterialCommunityIcons name="account-outline" size={50} color={theme.colors.background} />
                    </View>
                </View>

                {[
                    { icon: 'account-outline', val: 'Alex Morgan', label: 'Name' }, // To get pulled from DB Later
                    { icon: 'email', val: 'alex.morgan@email.com', label: 'Email Address' },
                ].map((item, index) => (
                    <View key={index} style={styles.inputContainer}>
                        <Text style={{ textAlign: 'left' }}>{item.label}</Text>
                        <TextInput
                            mode="outlined"
                            theme={{ roundness: 12 }}
                            label={item.label}
                            style={[styles.input, { backgroundColor: theme.colors.onPrimary }]}
                            left={<TextInput.Icon icon={item.icon} color={theme.colors.primary} />}
                        />
                    </View>
                ))}

                <Button mode="contained" buttonColor={theme.colors.primary}
                    onPress={() => console.log("Saved")}
                    style={{ width: '85%', borderRadius: 12, marginTop: 100 }}
                    contentStyle={{ height: 60 }}
                    labelStyle={[styles.logoutText, { color: theme.colors.background }]}>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                        <MaterialCommunityIcons name="download" size={20} color={theme.colors.background} />
                        <Text style={[styles.logoutText, { color: theme.colors.background, marginLeft: 8 }]}>
                            Save
                        </Text>
                    </View>
                </Button>

                <Button mode="outlined" buttonColor={theme.colors.background}
                    onPress={() => router.back()}
                    style={{ width: '85%', borderRadius: 12, margin: 10, 
                        borderColor: theme.colors.onPrimary, borderWidth: 3 }}
                    contentStyle={{ height: 60 }}
                    labelStyle={[styles.logoutText, { color: theme.colors.tertiary }]}>
                        Cancel
                </Button>
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
        justifyContent: 'center',
        alignItems: 'center',
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
    profileContainer: {
        position: 'relative',
        marginBottom: 16,
        width: 100,
        height: 100
    },
    inputContainer: {
        marginHorizontal: 24,
        marginTop: 24,
        gap: 12,
        width: '85%',
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
})