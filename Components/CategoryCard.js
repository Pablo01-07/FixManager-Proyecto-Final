import React from "react"
import { TouchableOpacity, Text, StyleSheet, View } from "react-native"
import { MaterialCommunityIcons } from "@expo/vector-icons"

export default function CategoryCard({ category, onPress }) {
    return (
        <TouchableOpacity style={styles.card} onPress={onPress}>
            <View style={styles.row}>
                <MaterialCommunityIcons
                    name={category.icon}
                    size={26}
                    color="#2C3E50"
                    style={styles.icon}
                />
                <Text style={styles.text}>{category.title}</Text>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    card: {
        padding: 20,
        backgroundColor: "#EAF2F8",
        marginBottom: 15,
        borderRadius: 12
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