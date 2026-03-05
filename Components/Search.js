import React, { useRef } from "react"
import { View, TextInput, StyleSheet, TouchableOpacity, Animated } from "react-native"
import { Ionicons } from "@expo/vector-icons"

export default function Search({ value, onChangeText }) {
    const scaleAnim = useRef(new Animated.Value(1)).current

    const handleFocus = () => {
        Animated.spring(scaleAnim, {
            toValue: 1.02,
            useNativeDriver: true
        }).start();
    }

    const handleBlur = () => {
        Animated.spring(scaleAnim, {
            toValue: 1,
            useNativeDriver: true
        }).start();
    }

    return (
        <Animated.View style={[styles.container, { transform: [{ scale: scaleAnim }] }]}>

            <Ionicons name="search" size={20} color="#888" style={styles.icon} />
            <TextInput
                placeholder="Buscar por título o marca..."
                value={value}
                onChangeText={onChangeText}
                style={styles.input}
                onFocus={handleFocus}
                onBlur={handleBlur}
            />

            {value.length > 0 && (
                <TouchableOpacity onPress={() => onChangeText("")}>
                    <Ionicons name="close-circle" size={20} color="#888" />
                </TouchableOpacity>
            )}
            
        </Animated.View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#F2F3F4",
        paddingHorizontal: 12,
        borderRadius: 12,
        marginBottom: 15,
        height: 45
    },

    icon: {
        marginRight: 8
    },

    input: {
        backgroundColor: "#F2F3F4",
        padding: 12,
        borderRadius: 10,
        fontSize: 16
    }
})