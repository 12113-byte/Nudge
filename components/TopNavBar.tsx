import { useNavigation, usePathname, useRouter } from 'expo-router';
import { Image, StyleSheet, View } from 'react-native';
import { Appbar, useTheme } from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function TopNavBar() {
    const router = useRouter();
    const navigation = useNavigation();
    const theme = useTheme();
    const insets = useSafeAreaInsets();
    const pathname = usePathname();

    const subPage = ['/profile', '/bookings', '/reviews', '/contactUs', '/settings', '/favourites']

    const isSubPage = subPage.includes(pathname);

    return (
        <View style={[styles.container, { paddingTop: insets.top, backgroundColor: theme.colors.background }]}>
            {/* ROW 1: Logo and Profile Button */}
            <View style={styles.mainRow}>
                <Image source={require('@/assets/images/logo_nudge.png')} style={styles.logo} />
                
                {!isSubPage && (
                    <Appbar.Action 
                        icon="account-outline" 
                        size={24} 
                        color="#ffffff"
                        containerColor={theme.colors.onPrimary}
                        style={styles.profileCircle}
                        onPress={() => router.push('/profile')} 
                    />
                )}
            </View>

            {/* ROW 2: Back Button (Only visible on sub-pages) */}
            {isSubPage && (
                <View style={styles.subRow}>
                    <Appbar.BackAction 
                        onPress={() => navigation.canGoBack() ? navigation.goBack() : router.replace('/(tabs)')} 
                        color={theme.colors.primary}
                        style={styles.backButton}
                        containerColor={theme.colors.onPrimary}
                    />
                </View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 16,
        paddingBottom: 8,
    },
    mainRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: 60,
    },
    subRow: {
        alignItems: 'flex-start', // Keeps the back button left-aligned
    },
    logo: {
        width: 45,
        height: 45,
    },
    profileCircle: {
        borderRadius: 25,
        width: 45,
        height: 45,
        margin: 0,
    },
    backButton: {
        margin: 0,
        height: 45,
        width: 45,
        borderRadius: 25,
    },
});