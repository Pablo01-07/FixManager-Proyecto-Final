import React from "react"
import { TouchableOpacity, Text, Image, StyleSheet, View } from "react-native"
import { useTheme } from "@react-navigation/native"

export default function AssetCard({ asset, onPress }) {
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
            activeOpacity={0.9}
            onPress={onPress}
        >
            <Image
                source={{ uri: asset.thumbnail }}
                style={styles.image}
            />

            <View style={styles.info}>

                <Text style={[styles.title, { color: colors.text }]}>
                    {asset.title}
                </Text>

                <Text style={[styles.brand, { color: colors.text + "99" }]}>
                    {asset.brand}
                </Text>

            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    card: {
        marginBottom: 20,
        backgroundColor: "#F8F9F9",
        borderRadius: 12,
        overflow: "hidden",
        elevation: 3,

        borderWidth: 1,

        shadowColor: "#000",
        shadowOpacity: 0.06,
        shadowRadius: 8,
        shadowOffset: { width: 0, height: 3 }
    },

    image: {
        width: "100%",
        height: 150
    },

    info: {
        padding: 15
    },

    title: {
        fontSize: 16,
        fontWeight: "bold",
        marginBottom: 4
    },

    brand: {
        fontSize: 14
    }
})