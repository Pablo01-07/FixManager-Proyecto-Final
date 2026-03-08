import React, { useState } from "react"
import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native"
import { useDispatch } from "react-redux"
import { useTheme } from "@react-navigation/native"
import { setUser } from "../store/slices/authsSlice"
import InputForm from "../Components/InputForm"
import { useLoginMutation } from "../services/authService"

export default function LoginScreen({ navigation }) {

    const { colors } = useTheme()

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const dispatch = useDispatch();
    const [login, { isLoading }] = useLoginMutation();

    const handleLogin = async () => {
        if (!email.trim() || !password.trim()) {
            Alert.alert("Error", "Completa todos los campos");
            return;
        }

        try {
            const result = await login({
                email: email.trim(),
                password: password.trim(),
                returnSecureToken: true
            }).unwrap();

            console.log("LOGIN OK", result);

            dispatch(
                setUser({
                    email: result.email,
                    localId: result.localId,
                    idToken: result.idToken
                })
            );

        } catch (error) {
            console.log("LOGIN ERROR", error);

            const message =
                error?.data?.error?.message || "Error al iniciar sesión";
            Alert.alert("Error", message);
        }
    };

    return (
        <View style={[styles.container, { backgroundColor: colors.background }]}>

            <Text style={[styles.title, { color: colors.text }]}>
                Iniciar sesión
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

            <TouchableOpacity
                style={[styles.button, { backgroundColor: colors.primary }]}
                onPress={handleLogin}
                disabled={isLoading}
            >
                <Text style={styles.buttonText}>
                    {isLoading ? "Ingresando..." : "Ingresar"}
                </Text>
            </TouchableOpacity>

            <TouchableOpacity
                onPress={() => navigation.navigate("Signup")}
            >
                <Text style={[styles.link, { color: colors.primary }]}>
                    Crear cuenta
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