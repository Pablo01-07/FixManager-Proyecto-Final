import React, { useState, useEffect } from "react"
import { TouchableOpacity, Text, Image, StyleSheet, View } from "react-native"
import { useTheme } from "@react-navigation/native"
import { useSelector } from "react-redux"
import { FIREBASE_DB_URL } from "../firebase/database"

export default function AssetCard({ asset, onPress }) {
    const { colors } = useTheme()
    const reports = useSelector(state => state.reports)

    const [reportImage, setReportImage] = useState(null)

    const assetReports = reports.filter(
        report => report.assetId === asset.id
    )

    const latestReport = assetReports.length > 0
        ? assetReports[assetReports.length - 1]
        : null

    useEffect(() => {
        const loadImage = async () => {

            if (!latestReport) {
                setReportImage(null)
                return
            }

            try {
                const url = `${FIREBASE_DB_URL}reportPictures/${latestReport.id}.json`
                const response = await fetch(url)
                const data = await response.json()

                if (data?.image) {
                    const base64Image = `data:image/jpeg;base64,${data.image}`
                    setReportImage(base64Image)
                } else {
                    setReportImage(null)
                }
            } catch (error) {
                console.log("ERROR LOADING REPORT IMAGE:", error)
            }
        }
        loadImage()
    }, [reports])

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
                source={{
                    uri: reportImage ? reportImage : asset.thumbnail
                }}
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