import { router } from 'expo-router';
import { useRef, useState } from 'react';
import {
    Image,
    Keyboard,
    KeyboardAvoidingView, Platform,
    TextInput as RNTextInput,
    ScrollView, StyleSheet, Text, TouchableOpacity,
    TouchableWithoutFeedback,
    View
} from 'react-native';
import {
    Button, Dialog, Portal,
    TextInput,
    useTheme
} from 'react-native-paper';

export default function SignUpCustomerScreen() {
    const theme = useTheme();

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState ("");

    const [popUpVisible, setPopUpVisible] = useState(false);

    const lastNameRef = useRef<RNTextInput>(null);
    const emailRef = useRef<RNTextInput>(null);
    const passwordRef = useRef<RNTextInput>(null);
    const confirmPasswordRef = useRef<RNTextInput>(null);

    // TODO: clean-up, function should go into helper file
    const handleSignUp = async () => {

        if (password !== confirmPassword) {
            alert("Password doesn't match!");
            return;
        }

        try {
            const response = await fetch("localhost:5001/auth/register", { // TODO: replace with env varibale/config?
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    first_name: firstName,
                    last_name: lastName,
                    email: email,
                    password: password,
                }),
            });

            const data = await response.json();

            if (response.ok) {
                setPopUpVisible(true);
            } else { // TODO: stuling of error pop up
                alert(data.message || "Something went wrong");
            }
        } catch (error) {
            alert("Could not connect to server");
        }
    };

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'} // makes the phone keyboard not cover fields
            style={{ flex: 1 }}
            >
            <ScrollView
                style={[styles.container, { backgroundColor: theme.colors.background }]}
                contentContainerStyle={styles.scrollContent}
                keyboardShouldPersistTaps="handled"
                >
                {/* Top Navigation */}
                <View style={styles.topNav}>
                    <TouchableOpacity onPress={() => {}}>
                        <Text style={[styles.topNavText, styles.topNavActive]}>Customer</Text>
                    </TouchableOpacity>
                    <Text style={styles.topNavSeparator}> | </Text>
                    <TouchableOpacity onPress={() => router.push("/sign-up-business")}>
                        <Text style={[styles.topNavText, { color: theme.colors.tertiary}]}>Business</Text>
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
                        onPress={() => router.push({ pathname: "/login", params: { userType: "customer" } })} // detects login for customer
                    >
                        <Text style={styles.toggleText}>Log In</Text>
                </TouchableOpacity>
                    <View style={[styles.toggleButton, { backgroundColor: theme.colors.primary }]}>
                        <Text style={styles.toggleText}>Sign Up</Text>
                    </View>
                </View>

                {/* Input Fields */}
                <View style={styles.inputContainer}>
                    <TextInput
                        label="First Name"
                        returnKeyType="next"
                        onSubmitEditing={() => lastNameRef.current?.focus()}
                        mode="outlined"
                        style={styles.input}
                        outlineColor={theme.colors.primary}
                        activeOutlineColor={theme.colors.primary}
                        value={firstName}
                        onChangeText={setFirstName}
                    />
                    <TextInput
                        ref={lastNameRef as any}
                        label="Last Name"
                        returnKeyType="next"
                        onSubmitEditing={() => emailRef.current?.focus()}
                        mode="outlined"
                        style={styles.input}
                        outlineColor={theme.colors.primary}
                        activeOutlineColor={theme.colors.primary}
                        value={lastName}
                        onChangeText={setLastName}
                    />
                    <TextInput
                        ref={emailRef as any}
                        label="Email"
                        keyboardType="email-address"
                        returnKeyType="next"
                        onSubmitEditing={() => passwordRef.current?.focus()}
                        mode="outlined"
                        style={styles.input}
                        outlineColor={theme.colors.primary}
                        activeOutlineColor={theme.colors.primary}
                        value={email}
                        onChangeText={setEmail}
                    />
                    <TextInput
                        ref={passwordRef as any}
                        label="Password"
                        returnKeyType="next"
                        onSubmitEditing={() => confirmPasswordRef.current?.focus()}
                        mode="outlined"
                        secureTextEntry
                        style={styles.input}
                        outlineColor={theme.colors.primary}
                        activeOutlineColor={theme.colors.primary}
                        value={password}
                        onChangeText={setPassword}
                    />
                    <TextInput
                        ref={confirmPasswordRef as any}
                        label="Confirm Password"
                        returnKeyType="done"
                        onSubmitEditing={handleSignUp}
                        mode="outlined"
                        secureTextEntry
                        style={styles.input}
                        outlineColor={theme.colors.primary}
                        activeOutlineColor={theme.colors.primary}
                        value={confirmPassword}
                        onChangeText={setConfirmPassword}
                    />
                </View>

                {/* Sign Up Button */}
                <View style={styles.signUpButtonContainer}>
                    <Button
                        mode="contained"
                        buttonColor={theme.colors.primary}
                        labelStyle={styles.signUpButtonText}
                        style={styles.signUpButton}
                        contentStyle={{ height: 56 }}
                        onPress={handleSignUp}
                        >
                            Create Account
                    </Button>
                </View>

                {/* Bottom Navigation */}
                <View style={styles.bottomNav}>
                    <Text style={styles.bottomNavText}>Privacy Policy | Terms of Service</Text>
                </View>


            </ScrollView>
                <Portal>
                    <Dialog
                        visible={popUpVisible}
                        style={{ backgroundColor: theme.colors.onPrimary, borderRadius: 16 }}
                        onDismiss={() => {
                            setPopUpVisible(false);
                            router.push("/login")
                    }}>
                        <Dialog.Title style={{ color: theme.colors.primary, textAlign: "center" }}>
                            Welcome to Nudge! 🎉
                        </Dialog.Title>
                        <Dialog.Content>
                            <Text style={{ color: "#ffffff", textAlign: "center" }}>
                                Please log in. Your account is ready!
                                </Text>
                        </Dialog.Content>
                        <Dialog.Actions style={{ justifyContent: "center"}}>
                            <Button
                                textColor={theme.colors.primary}
                                onPress={() => {
                                    setPopUpVisible(false);
                                    router.push("/login");
                                }}>
                                Let's go!
                            </Button>
                        </Dialog.Actions>
                    </Dialog>
                </Portal>
            </KeyboardAvoidingView>
        </TouchableWithoutFeedback>
    );
}

const styles = StyleSheet.create({
    scrollContent: {
        paddingBottom: 100,
    },
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
        color: "#ffffff",
        fontWeight: "bold",
    },
    inputContainer: {
        marginHorizontal: 24,
        marginTop: 24,
        gap: 12,
    },
    input: {
        height: 56,
    },
    signUpButtonContainer: {
        marginHorizontal: 24,
        marginTop: 24,
    },
    signUpButton: {
        borderRadius: 12,
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
