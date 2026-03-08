import React, { useRef } from "react"
import { TextInput, StyleSheet, TouchableOpacity, Animated } from "react-native"
import { Ionicons } from "@expo/vector-icons"
import { useTheme } from "@react-navigation/native"

export default function Search({ value, onChangeText }) {
    const { colors } = useTheme()

    const scaleAnim = useRef(new Animated.Value(1)).current

    const handleFocus = () => {
        Animated.spring(scaleAnim, {
            toValue: 1.03,
            useNativeDriver: true
        }).start()
    }

    const handleBlur = () => {
        Animated.spring(scaleAnim, {
            toValue: 1,
            useNativeDriver: true
        }).start()
    }

    return (
        <Animated.View
            style={[
                styles.container,
                {
                    backgroundColor: colors.card,
                    borderColor: colors.border,
                    transform: [{ scale: scaleAnim }]
                }
            ]}
        >

            <Ionicons
                name="search"
                size={20}
                color={colors.text + "80"}
                style={styles.icon}
            />

            <TextInput
                placeholder="Buscar por título o marca..."
                placeholderTextColor={colors.text + "60"}
                value={value}
                onChangeText={onChangeText}
                style={[styles.input, { color: colors.text }]}
                onFocus={handleFocus}
                onBlur={handleBlur}
            />

            {value.length > 0 && (
                <TouchableOpacity
                    onPress={() => onChangeText("")}
                    style={styles.clearButton}
                >
                    <Ionicons
                        name="close"
                        size={16}
                        color="#fff"
                    />
                </TouchableOpacity>
            )}

        </Animated.View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 14,
        height: 50,
        borderRadius: 14,
        marginBottom: 16,
        borderWidth: 1,
        shadowColor: "#000",
        shadowOpacity: 0.05,
        shadowRadius: 8,
        shadowOffset: { width: 0, height: 3 },
        elevation: 2
    },

    icon: {
        marginRight: 8
    },

    input: {
        flex: 1,
        fontSize: 16
    },

    clearButton: {
        backgroundColor: "#999",
        width: 20,
        height: 20,
        borderRadius: 10,
        alignItems: "center",
        justifyContent: "center",
        marginLeft: 6
    }
})