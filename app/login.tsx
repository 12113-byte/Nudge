import { router } from 'expo-router';
import { useState } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Button, TextInput, useTheme } from 'react-native-paper';

export default function LoginScreen() {
    const [userType, setUserType] = useState("customer");
    const theme = useTheme();

    return (
        <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
            {/* Top Navigation */}
            <View style={styles.topNav}>
                <TouchableOpacity onPress={() => setUserType("customer")}>
                    <Text style={[styles.topNavText, userType === "customer" && styles.topNavActive]}>Customer</Text>
                </TouchableOpacity>
                <Text style={styles.topNavSeparator}> | </Text>
                <TouchableOpacity onPress={() => setUserType("business")}>
                    <Text style={[styles.topNavText, userType === "business" && styles.topNavActive]}>Business</Text>
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

            {/* Log In "Toggler" */}
            <View style={[styles.toggleContainer, { borderColor: theme.colors.primary, backgroundColor: theme.colors.onPrimary }]}>
                <View style={[styles.toggleButton, styles.toggleActive, { backgroundColor: theme.colors.primary }]}>
                    <Text style={styles.toggleText}>Log In</Text>
                </View>
                <TouchableOpacity
                style={styles.toggleButton}
                onPress={() => router.push("/sign-up")}
                >
                    <Text style={styles.toggleText}>Sign Up</Text>
                </TouchableOpacity>
            </View>

            {/* Input Fields */}
            <View style={styles.inputContainer}>
                <TextInput
                label="Email"
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
            </View>

            {/* Forgot Password link */}
            <TouchableOpacity style={styles.forgotPasswordLink}>
                {/* onPress={() => router.push("/forgot-password")} TODO; add when link to it exists*/}
                <Text style={[styles.forgotPasswordLinkText, { color: theme.colors.primary }]}>Forgot Password?</Text>
            </TouchableOpacity>

            {/* Log In Button */}
            <View style={styles.loginButtonContainer}>
                <Button
                    mode="contained"
                    buttonColor={theme.colors.primary}
                    labelStyle={styles.loginButtonText}
                    onPress={() => {}} // TODO: add login logic
                    >
                        Log In
                </Button>
            </View>

            {/* Bottom Navigation */}
            <View style={styles.bottomNav}>
                <Text style={styles.bottomNavText}>Privacy Policy | Terms of Service</Text>
            </View>


        </View>
    );
}

const styles = StyleSheet.create({
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
    forgotPasswordLink: {
        alignItems: "flex-end",
        marginTop: 8,
        marginHorizontal: 24,
    },
    forgotPasswordLinkText: {
        color: "#FF6B6B",
        fontSize: 14,
    },
    loginButtonContainer: {
        marginHorizontal: 24,
        marginTop: 24,
    },
    loginButton: {
        backgroundColor: "#FF6B6B",
        borderRadius: 12,
        paddingVertical: 6,
    },
    loginButtonText: {
        color: "#ffffff",
        fontWeight: "bold",
        fontSize: 16,
    },
    bottomNav: {
        position: "absolute",
        bottom: 24,
        left: 0,
        right: 0,
        alignItems: "center",
    },
    bottomNavText: {
        color: "#ffffff",
        fontSize: 14,
    },
});
