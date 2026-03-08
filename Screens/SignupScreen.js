import React, { useState } from "react"
import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native"
import { useTheme } from "@react-navigation/native"
import InputForm from "../Components/InputForm"
import { useSignUpMutation } from "../services/authService"

export default function SignupScreen({ navigation }) {
    const { colors } = useTheme()

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [signUp] = useSignUpMutation();

    const handleSignup = async () => {
        if (!email || !password || !confirmPassword) {
            Alert.alert("Error", "Completa todos los campos");
            return;
        }

        if (password !== confirmPassword) {
            Alert.alert("Error", "Las contraseñas no coinciden");
            return;
        }

        try {
            await signUp({
                email,
                password,
                returnSecureToken: true
            }).unwrap();

            Alert.alert("Cuenta creada correctamente");
            navigation.navigate("Login");

        } catch (error) {
            console.log(error);
            Alert.alert("Error creando cuenta");
        }
    };

    return (
        <View style={[styles.container, { backgroundColor: colors.background }]}>

            <Text style={[styles.title, { color: colors.text }]}>
                Crear Cuenta
            </Text>

            <InputForm
                label="Email"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
            />

            <InputForm
                label="Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
            />

            <InputForm
                label="Confirmar Password"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                secureTextEntry
            />

            <TouchableOpacity
                style={[styles.button, { backgroundColor: colors.primary }]}
                onPress={handleSignup}
            >
                <Text style={styles.buttonText}>
                    Crear cuenta
                </Text>
            </TouchableOpacity>

            <TouchableOpacity
                onPress={() => navigation.navigate("Login")}
            >
                <Text style={[styles.link, { color: colors.primary }]}>
                    Ya tengo cuenta
                </Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        padding: 20,
        backgroundColor: "#fff"
    },

    title: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 30,
        textAlign: "center"
    },

    button: {
        backgroundColor: "#007AFF",
        padding: 15,
        borderRadius: 8,
        marginTop: 20,
        alignItems: "center"
    },

    buttonText: {
        color: "#fff",
        fontWeight: "bold"
    },

    link: {
        marginTop: 20,
        textAlign: "center",
        color: "#007AFF"
    }
})