import React, { useState, useEffect } from "react"
import { View, Text, Image, StyleSheet, ScrollView } from "react-native"
import { useSelector } from "react-redux"
import { useTheme } from "@react-navigation/native"
import { FIREBASE_DB_URL } from "../firebase/database"

export default function AssetDetailScreen({ route }) {
    const { colors } = useTheme()
    const { asset } = route.params

    const reports = useSelector(state => state.reports)
    const userId = useSelector(state => state.auth.user?.localId)

    const [reportImage, setReportImage] = useState(null)

    const assetReports = reports.filter(
        report => report.assetId === asset.id
    )

    const latestReport = assetReports.length > 0
        ? assetReports[assetReports.length - 1]
        : null

    useEffect(() => {
        const loadImage = async () => {
            if (!latestReport) return

            try {
                const response = await fetch(
                    `${FIREBASE_DB_URL}reportPictures/${userId}/${latestReport.firebaseKey}.json`
                )

                const data = await response.json()

                if (data?.image) {
                    setReportImage(`data:image/jpeg;base64,${data.image}`)
                }
            } catch (error) {
                console.log("ERROR LOADING IMAGE:", error)
            }
        }
        loadImage()
    }, [reports, userId])

    return (
        <ScrollView
            contentContainerStyle={[
                styles.container,
                { backgroundColor: colors.background }
            ]}
        >
            <Image
                source={{
                    uri: reportImage ? reportImage : asset.thumbnail
                }}
                style={styles.image}
            />

            <Text style={[styles.title, { color: colors.text }]}>
                {asset.title}
            </Text>

            <Text style={{ color: colors.text }}>
                Marca: {asset.brand}
            </Text>

            <Text style={{ color: colors.text }}>
                Estado: {asset.availabilityStatus}
            </Text>

            <Text style={{ color: colors.text }}>
                Ubicación: {asset.shippingInformation}
            </Text>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 20
    },

    image: {
        width: "100%",
        height: 220,
        borderRadius: 12,
        marginBottom: 15
    },

    title: {
        fontSize: 22,
        fontWeight: "bold",
        marginBottom: 10
    }
})