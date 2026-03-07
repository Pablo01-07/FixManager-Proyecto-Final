import React, { useState } from "react"
import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native"
import { useDispatch } from "react-redux"
import { setUser } from "../store/slices/authsSlice"
import InputForm from "../Components/InputForm"
import { useLoginMutation } from "../services/authService"

export default function LoginScreen({ navigation }) {
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
        <View style={styles.container}>
            <Text style={styles.title}>Iniciar sesión</Text>

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
                style={styles.button}
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
                <Text style={styles.link}>
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