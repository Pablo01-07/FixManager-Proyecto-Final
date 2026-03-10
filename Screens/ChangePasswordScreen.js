import React, { useState, useEffect } from "react"
import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native"
import { useSelector } from "react-redux"
import { useTheme } from "@react-navigation/native"
import InputForm from "../Components/InputForm"
import { BASE_AUTH_URL, API_KEY } from "../firebase/authconfig"

export default function ChangePasswordScreen() {
    const { colors } = useTheme()

    const token = useSelector(state => state.auth.token)
    const user = useSelector(state => state.auth.user)

    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")

    useEffect(() => {
        console.log("CHANGE PASSWORD SCREEN MOUNTED")
        console.log("USER OBJECT:", user)
        console.log("TOKEN FROM REDUX:", token)
    }, [])

    const handleChangePassword = async () => {
        console.log("BOTÓN CAMBIAR PASSWORD PRESIONADO")

        if (!password || !confirmPassword) {
            console.log("ERROR: Campos vacíos")
            Alert.alert("Error", "Completa todos los campos")
            return
        }

        if (password !== confirmPassword) {
            console.log("ERROR: Las contraseñas no coinciden")
            Alert.alert("Error", "Las contraseñas no coinciden")
            return
        }

        try {
            console.log("ENVIANDO REQUEST A FIREBASE...")
            console.log("TOKEN USADO:", token)
            console.log("NEW PASSWORD:", password)

            const response = await fetch(
                `${BASE_AUTH_URL}accounts:update?key=${API_KEY}`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        idToken: token,
                        password: password,
                        returnSecureToken: true
                    })
                }
            )

            console.log("RESPONSE STATUS:", response.status)
            const data = await response.json()
            console.log("FIREBASE RESPONSE:", data)

            if (data.error) {
                console.log("FIREBASE ERROR:", data.error.message)
                Alert.alert("Error", data.error.message)
                return
            }

            console.log("PASSWORD CAMBIADO CORRECTAMENTE")

            Alert.alert(
                "Éxito",
                "Tu contraseña fue actualizada"
            )
            setPassword("")
            setConfirmPassword("")
        } catch (error) {
            console.log("CHANGE PASSWORD ERROR:", error)
            Alert.alert(
                "Error",
                "No se pudo cambiar la contraseña"
            )
        }
    }

    return (
        <View style={[styles.container, { backgroundColor: colors.background }]}>
            <Text style={[styles.title, { color: colors.text }]}>
                Change Password
            </Text>

            <InputForm
                label="New Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
            />

            <InputForm
                label="Confirm Password"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                secureTextEntry
            />

            <TouchableOpacity
                style={[styles.button, { backgroundColor: colors.primary }]}
                onPress={handleChangePassword}
            >
                <Text style={styles.buttonText}>
                    Cambiar contraseña
                </Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20
    },

    title: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 30
    },

    button: {
        marginTop: 20,
        padding: 15,
        borderRadius: 8,
        alignItems: "center"
    },

    buttonText: {
        color: "#fff",
        fontWeight: "bold"
    }
})