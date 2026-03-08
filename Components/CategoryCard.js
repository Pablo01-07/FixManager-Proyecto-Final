import React from "react"
import { TouchableOpacity, Text, StyleSheet, View } from "react-native"
import { MaterialCommunityIcons } from "@expo/vector-icons"
import { useTheme } from "@react-navigation/native"

export default function CategoryCard({ category, onPress }) {
    const { colors } = useTheme()

    return (
        <TouchableOpacity
            style={[
                styles.card,
                {
                    backgroundColor: colors.card,
                    borderColor: colors.border
                }
            ]}
            activeOpacity={0.85}
            onPress={onPress}
        >
            <View style={styles.row}>
                <MaterialCommunityIcons
                    name={category.icon}
                    size={26}
                    color={colors.primary}
                    style={styles.icon}
                />

                <Text style={[styles.text, { color: colors.text }]}>
                    {category.title}
                </Text>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    card: {
        padding: 20,
        backgroundColor: "#EAF2F8",
        marginBottom: 15,
        borderRadius: 12,

        borderWidth: 1,

        shadowColor: "#000",
        shadowOpacity: 0.06,
        shadowRadius: 6,
        shadowOffset: { width: 0, height: 2 },

        elevation: 2
    },

    row: {
        flexDirection: "row",
        alignItems: "center"
    },

    icon: {
        marginRight: 12
    },

    text: {
        fontSize: 18,
        fontWeight: "600"
    }
})