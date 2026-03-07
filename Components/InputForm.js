import React, { useState } from "react"
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from "react-native"
import { MaterialIcons } from "@expo/vector-icons"

export default function InputForm({ label, value, onChangeText, secureTextEntry, keyboardType }) {
    const [showPassword, setShowPassword] = useState(false);
    const isPassword = secureTextEntry;

    return (
        <View style={styles.container}>
            <Text style={styles.label}>{label}</Text>

            <View style={styles.inputContainer}>

                <TextInput
                    style={styles.input}
                    value={value}
                    onChangeText={onChangeText}
                    secureTextEntry={isPassword && !showPassword}
                    keyboardType={keyboardType}
                />

                {isPassword && (
                    <TouchableOpacity
                        onPress={() => setShowPassword(!showPassword)}
                    >
                        <MaterialIcons
                            name={showPassword ? "visibility-off" : "visibility"}
                            size={22}
                            color="#777"
                        />
                    </TouchableOpacity>
                )}

            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginBottom: 15
    },

    label: {
        marginBottom: 5,
        fontWeight: "600"
    },

    inputContainer: {
        flexDirection: "row",
        alignItems: "center",
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 8,
        paddingHorizontal: 10
    },

    input: {
        flex: 1,
        paddingVertical: 10
    }
})