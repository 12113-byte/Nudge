import { router, useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import {
    Image,
    Keyboard, StyleSheet, Text,
    TouchableOpacity, TouchableWithoutFeedback, View
} from 'react-native';
import { Button, TextInput, useTheme } from 'react-native-paper';

export default function LoginScreen() {
    const { userType: initalUserType } = useLocalSearchParams(); // detects userType and redirects to correct screen
    const [userType, setUserType] = useState((initalUserType as string) || "customer");
    const theme = useTheme();

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
                {/* Top Navigation */}
                <View style={styles.topNav}>
                    <TouchableOpacity onPress={() => setUserType("customer")}>
                        <Text style={[
                            styles.topNavText,
                            { color: theme.colors.tertiary },
                            userType === "customer" && styles.topNavActive
                            ]}>Customer</Text>
                    </TouchableOpacity>
                    <Text style={styles.topNavSeparator}> | </Text>
                    <TouchableOpacity onPress={() => setUserType("business")}>
                        <Text style={[
                            styles.topNavText,
                            { color: theme.colors.tertiary },
                            userType === "business" && styles.topNavActive
                            ]}>Business</Text>
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

                {/* Sign Up Link */}
                <View style={[styles.toggleContainer, { borderColor: theme.colors.primary, backgroundColor: theme.colors.onPrimary }]}>
                    <View style={[styles.toggleButton, { backgroundColor: theme.colors.primary }]}>
                        <Text style={styles.toggleText}>Log In</Text>
                    </View>
                    <TouchableOpacity
                    style={styles.toggleButton}
                    onPress={() => userType === "business"
                        ? router.push("/sign-up-business")
                        : router.push("/sign-up-customer")
                    }
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
                        style={styles.loginButton}
                        contentStyle={{ height: 56 }}
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
        </TouchableWithoutFeedback>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    topNav: {
        flexDirection: "row",
        justifyContent: "flex-end",
        paddingTop: 60,
        paddingHorizontal: 24,
    },
    topNavText: {
        fontSize: 20,
    },
    topNavActive: {
        color: "#ffffff",
        fontWeight: "bold",
    },
    topNavSeparator: {
        color: "#ffffff",
        fontSize: 20,
    },
    logoContainer: {
        alignItems: "center",
        marginTop: 50,
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
        borderWidth: 1,
        borderRadius: 50,
        marginHorizontal: 24,
        marginTop: 40,
    },
    toggleButton: {
        flex: 1,
        paddingVertical: 16,
        alignItems: "center",
        borderRadius: 50,
    },
    toggleText: {
        fontWeight: "bold",
        color: "#ffffff",
    },
    inputContainer: {
        marginHorizontal: 24,
        marginTop: 24,
        gap: 12,
    },
    input: {
        height: 56,
    },
    forgotPasswordLink: {
        alignItems: "flex-end",
        marginTop: 8,
        marginHorizontal: 24,
    },
    forgotPasswordLinkText: {
        fontSize: 16,
    },
    loginButtonContainer: {
        marginHorizontal: 24,
        marginTop: 24,
    },
    loginButton: {
        borderRadius: 12
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
