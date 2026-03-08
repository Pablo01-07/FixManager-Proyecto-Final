import React, { useState } from "react"
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from "react-native"
import { MaterialIcons } from "@expo/vector-icons"
import { useTheme } from "@react-navigation/native"

export default function InputForm({ label, value, onChangeText, secureTextEntry, keyboardType }) {
    const { colors } = useTheme()

    const [showPassword, setShowPassword] = useState(false)
    const isPassword = secureTextEntry

    return (
        <View style={styles.container}>
            <Text style={[styles.label, { color: colors.text }]}>
                {label}
            </Text>

            <View
                style={[
                    styles.inputContainer,
                    {
                        borderColor: colors.border,
                        backgroundColor: colors.card
                    }
                ]}
            >

                <TextInput
                    style={[styles.input, { color: colors.text }]}
                    value={value}
                    onChangeText={onChangeText}
                    secureTextEntry={isPassword && !showPassword}
                    keyboardType={keyboardType}
                    placeholder={label}
                    placeholderTextColor={colors.text + "60"}
                />

                {isPassword && (
                    <TouchableOpacity
                        onPress={() => setShowPassword(!showPassword)}
                    >
                        <MaterialIcons
                            name={showPassword ? "visibility-off" : "visibility"}
                            size={22}
                            color={colors.text + "80"}
                        />
                    </TouchableOpacity>
                )}

            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginBottom: 18
    },

    label: {
        marginBottom: 6,
        fontWeight: "600",
        fontSize: 14
    },

    inputContainer: {
        flexDirection: "row",
        alignItems: "center",
        borderWidth: 1,
        borderRadius: 10,
        paddingHorizontal: 12,
        height: 48
    },

    input: {
        flex: 1,
        fontSize: 16
    }
})