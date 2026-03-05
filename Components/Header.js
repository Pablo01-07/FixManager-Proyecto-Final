import React from "react"
import { View, Text, StyleSheet, TouchableOpacity } from "react-native"
import { useNavigation } from "@react-navigation/native"
import { Ionicons } from "@expo/vector-icons"

export default function Header({ title, showBack = false, rightIcon, onRightPress }) {

    const navigation = useNavigation();

    return (
        <View style={styles.container}>

            {showBack ? (
                <TouchableOpacity
                    style={styles.iconContainer}
                    onPress={() => navigation.goBack()}
                >
                    <Ionicons name="arrow-back" size={24} color="#000" />
                </TouchableOpacity>
            ) : (
                <View style={styles.iconPlaceholder} />
            )}

            <Text style={styles.title}>{title}</Text>

            {rightIcon ? (
                <TouchableOpacity
                    style={styles.iconContainer}
                    onPress={onRightPress}
                >
                    <Ionicons name={rightIcon} size={24} color="#000" />
                </TouchableOpacity>
            ) : (
                <View style={styles.iconPlaceholder} />
            )}

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        height: 60,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 16,
        backgroundColor: "#fff",
        elevation: 4
    },

    title: {
        fontSize: 18,
        fontWeight: "bold"
    },

    iconContainer: {
        width: 40,
        alignItems: "center"
    },

    iconPlaceholder: {
        width: 40
    }
})