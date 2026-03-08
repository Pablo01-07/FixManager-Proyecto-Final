import React from "react"
import { View, Text, StyleSheet, TouchableOpacity } from "react-native"
import { useNavigation, useTheme } from "@react-navigation/native"
import { Ionicons } from "@expo/vector-icons"

export default function Header({ title, showBack = false, rightIcon, onRightPress }) {

    const navigation = useNavigation()
    const { colors } = useTheme()

    return (
        <View
            style={[
                styles.container,
                {
                    backgroundColor: colors.card,
                    borderBottomColor: colors.border
                }
            ]}
        >

            {showBack ? (
                <TouchableOpacity
                    style={styles.iconContainer}
                    onPress={() => navigation.goBack()}
                >
                    <Ionicons
                        name="arrow-back"
                        size={24}
                        color={colors.text}
                    />
                </TouchableOpacity>
            ) : (
                <View style={styles.iconPlaceholder} />
            )}

            <Text style={[styles.title, { color: colors.text }]}>
                {title}
            </Text>

            {rightIcon ? (
                <TouchableOpacity
                    style={styles.iconContainer}
                    onPress={onRightPress}
                >
                    <Ionicons
                        name={rightIcon}
                        size={24}
                        color={colors.text}
                    />
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

        borderBottomWidth: 1,

        shadowColor: "#000",
        shadowOpacity: 0.05,
        shadowRadius: 6,
        shadowOffset: { width: 0, height: 2 },

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