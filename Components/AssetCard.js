import React from "react"
import { TouchableOpacity, Text, Image, StyleSheet, View } from "react-native"

export default function AssetCard({ asset, onPress }) {
    return (
        <TouchableOpacity style={styles.card} onPress={onPress}>
            <Image source={{ uri: asset.thumbnail }} style={styles.image} />
            <View style={styles.info}>
                <Text style={styles.title}>{asset.title}</Text>
                <Text>{asset.brand}</Text>
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
        elevation: 3
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
        fontWeight: "bold"
    }
})