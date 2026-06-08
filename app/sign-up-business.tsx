import { router } from 'expo-router';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Button, TextInput, useTheme } from 'react-native-paper';

export default function SignUpScreen() {
    const theme = useTheme();

    return (
        <ScrollView
            style={[styles.container, { backgroundColor: theme.colors.background }]}
            contentContainerStyle={styles.scrollContent}>
            {/* Top Navigation */}
            <View style={styles.topNav}>
                <TouchableOpacity onPress={() => router.push("/sign-up-customer")} >
                    <Text style={styles.topNavText}>Customer</Text>
                </TouchableOpacity>
                <Text style={styles.topNavSeparator}> | </Text>
                <TouchableOpacity onPress={() => {}}>
                    <Text style={[styles.topNavText, styles.topNavActive]}>Business</Text>
                </TouchableOpacity>
            </View>

            {/* Logo */}
            <View style={styles.logoContainer}>
                <Image
                source={require("@/assets/images/logo_nudge.png")}
                style={styles.logo}
                />
                <Text style={styles.logoText}>Nudge</Text>
            </View>

            {/* Log In Link */}
            <View style={[styles.toggleContainer, { borderColor: theme.colors.primary, backgroundColor: theme.colors.onPrimary }]}>
                <TouchableOpacity
                    style={styles.toggleButton}
                    onPress={() => router.push({ pathname: "/login", params: { userType: "business" } })} // detects login for business
                >
                    <Text style={styles.toggleText}>Log In</Text>
            </TouchableOpacity>
            <View style={[styles.toggleButton, styles.toggleActive, { backgroundColor: theme.colors.primary }]}>
                    <Text style={styles.toggleText}>Sign Up</Text>
                </View>
            </View>

            {/* Input Fields */}
            <View style={styles.inputContainer}>
                <TextInput
                label="First Name"
                mode="outlined"
                style={styles.input}
                outlineColor={theme.colors.primary}
                activeOutlineColor={theme.colors.primary}
                />
                <TextInput
                label="Last Name"
                mode="outlined"
                style={styles.input}
                outlineColor={theme.colors.primary}
                activeOutlineColor={theme.colors.primary}
                />
                <TextInput
                label="Company Name"
                mode="outlined"
                style={styles.input}
                outlineColor={theme.colors.primary}
                activeOutlineColor={theme.colors.primary}
                />
                <TextInput
                label="Business Email"
                mode="outlined"
                style={styles.input}
                outlineColor={theme.colors.primary}
                activeOutlineColor={theme.colors.primary}
                />
                <TextInput
                label="Business Phone"
                mode="outlined"
                style={styles.input}
                outlineColor={theme.colors.primary}
                activeOutlineColor={theme.colors.primary}
                />
                <TextInput
                label="ABN"
                mode="outlined"
                style={styles.input}
                outlineColor={theme.colors.primary}
                activeOutlineColor={theme.colors.primary}
                />
                <TextInput
                label="Password"
                mode="outlined"
                secureTextEntry
                style={styles.input}
                outlineColor={theme.colors.primary}
                activeOutlineColor={theme.colors.primary}
                />
                <TextInput
                label="Confirm Password"
                mode="outlined"
                secureTextEntry
                style={styles.input}
                outlineColor={theme.colors.primary}
                activeOutlineColor={theme.colors.primary}
                />
            </View>

            {/* Sign Up Button */}
            <View style={styles.signUpButtonContainer}>
                <Button
                    mode="contained"
                    buttonColor={theme.colors.primary}
                    labelStyle={styles.signUpButtonText}
                    onPress={() => {}} // TODO: add login logic
                    >
                        Create Account
                </Button>
            </View>

            {/* Bottom Navigation */}
            <View style={styles.bottomNav}>
                <Text style={styles.bottomNavText}>Privacy Policy | Terms of Service</Text>
            </View>


        </ScrollView>
    );
}

const styles = StyleSheet.create({
    scrollContent: {
        paddingBottom: 100,
    },
    container: {
        flex: 1,
        backgroundColor: "#142140",
    },
    topNav: {
        flexDirection: "row",
        justifyContent: "flex-end",
        paddingTop: 60,
        paddingHorizontal: 24,
    },
    topNavText: {
        color: "#8E8E93",
        fontSize: 14,
    },
    topNavActive: {
        color: "#ffffff",
        fontWeight: "bold",
    },
    topNavSeparator: {
        color: "#ffffff",
        fontSize: 14,
    },
    logoContainer: {
        alignItems: "center",
        marginTop: 60,
    },
    logo: {
        width: 100,
        height: 100,
        borderRadius: 24,
    },
    logoText: {
        color: "#ffffff",
        fontSize: 32,
        fontWeight: "bold",
        marginTop: 12
    },
    toggleContainer: {
        flexDirection: "row",
        backgroundColor: "#2a3652",
        borderColor: "#FF6B6B",
        borderWidth: 1,
        borderRadius: 50,
        marginHorizontal: 24,
        marginTop: 40,
    },
    toggleButton: {
        flex: 1,
        paddingVertical: 12,
        alignItems: "center",
        borderRadius: 50,
    },
    toggleActive: {
        backgroundColor: "#FF6B6B",
    },
    toggleText: {
        color: "#ffffff",
        fontWeight: "bold",
    },
    inputContainer: {
        marginHorizontal: 24,
        marginTop: 24,
        gap: 12,
    },
    input: {
        backgroundColor: "#142140",
    },
    signUpButtonContainer: {
        marginHorizontal: 24,
        marginTop: 24,
    },
    signUpButtonText: {
        color: "#ffffff",
        fontWeight: "bold",
        fontSize: 16,
    },
    bottomNav: {
        alignItems: "center",
        marginTop: 24,
        paddingBottom: 24,
    },
    bottomNavText: {
        color: "#ffffff",
        fontSize: 14,
    },
});
