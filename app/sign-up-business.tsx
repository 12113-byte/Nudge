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
    Button, TextInput, useTheme
} from 'react-native-paper';

export default function SignUpBusinessScreen() {
    const theme = useTheme();

    // shared input props across multiple fields
    const sharedInputProps = {
        mode: "outlined" as const,
        style: styles.input,
        outlineColor: theme.colors.primary,
        activeOutlineColor: theme.colors.primary,
    };

    // cross check with backend value names
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [companyName, setCompanyName] = useState("");
    const [businessEmail, setBusinessEmail] = useState("");
    const [businessPhone, setBusinessPhone] = useState("");
    const [abn, setAbn] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const lastNameRef = useRef<RNTextInput>(null);
    const companyNameRef = useRef<RNTextInput>(null);
    const businessEmailRef = useRef<RNTextInput>(null);
    const businessPhoneRef = useRef<RNTextInput>(null);
    const abnRef = useRef<RNTextInput>(null);
    const passwordRef = useRef<RNTextInput>(null);
    const confirmPasswordRef = useRef<RNTextInput>(null);
    
    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'} //makes the phone keyboard not cover fields
            style={{ flex: 1 }}
            >
            <ScrollView
                style={[styles.container, { backgroundColor: theme.colors.background }]}
                contentContainerStyle={styles.scrollContent}
                keyboardShouldPersistTaps="handled"
                >
                {/* Top Navigation */}
                <View style={styles.topNav}>
                    <TouchableOpacity onPress={() => router.push("/sign-up-customer")} >
                        <Text style={[styles.topNavText, { color: theme.colors.tertiary}]}>Customer</Text>
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
                <View style={[styles.toggleButton, { backgroundColor: theme.colors.primary }]}>
                        <Text style={styles.toggleText}>Sign Up</Text>
                    </View>
                </View>

                {/* Input Fields */}
                <View style={styles.inputContainer}>
                    <TextInput
                        {...sharedInputProps}
                        label="First Name"
                        returnKeyType="next"
                        onSubmitEditing={() => lastNameRef.current?.focus()}
                        value={firstName}
                        onChangeText={setFirstName}
                    />
                    <TextInput
                        {...sharedInputProps}
                        ref={lastNameRef as any}
                        label="Last Name"
                        returnKeyType="next"
                        onSubmitEditing={() => companyNameRef.current?.focus()}
                        value={lastName}
                        onChangeText={setLastName}
                    />
                    <TextInput
                        {...sharedInputProps}
                        ref={companyNameRef as any}
                        label="Company Name"
                        returnKeyType="next"
                        onSubmitEditing={() => businessEmailRef.current?.focus()}
                        value={companyName}
                        onChangeText={setCompanyName}
                    />
                    <TextInput
                        {...sharedInputProps}
                        ref={businessEmailRef as any}
                        label="Business Email"
                        returnKeyType="next"
                        onSubmitEditing={() => businessPhoneRef.current?.focus()}
                        value={businessEmail}
                        onChangeText={setBusinessEmail}
                    />
                    <TextInput
                        {...sharedInputProps}
                        ref={businessPhoneRef as any}
                        label="Business Phone"
                        returnKeyType="next"
                        onSubmitEditing={() => abnRef.current?.focus()}
                        value={businessPhone}
                        onChangeText={setBusinessPhone}
                    />
                    <TextInput
                        {...sharedInputProps}
                        ref={abnRef as any}
                        label="ABN"
                        returnKeyType="next"
                        onSubmitEditing={() => passwordRef.current?.focus()}
                        value={abn}
                        onChangeText={setAbn}
                    />
                    <TextInput
                        {...sharedInputProps}
                        ref={passwordRef as any}
                        label="Password"
                        returnKeyType="next"
                        onSubmitEditing={() => confirmPasswordRef.current?.focus()}
                        secureTextEntry
                        value={password}
                        onChangeText={setPassword}
                    />
                    <TextInput
                        {...sharedInputProps}
                        ref={confirmPasswordRef as any}
                        label="Confirm Password"
                        returnKeyType="done"
                        // onSubmitEditing={handleSignUp}
                        secureTextEntry
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
                        onPress={() => {}} // TODO: add handleSignUp function, when connected to backend
                        >
                            Create Account
                    </Button>
                </View>

                {/* Bottom Navigation */}
                <View style={styles.bottomNav}>
                    <Text style={styles.bottomNavText}>Privacy Policy | Terms of Service</Text>
                </View>

            </ScrollView>
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
