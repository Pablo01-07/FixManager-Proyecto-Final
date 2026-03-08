import React from "react"
import { View, Text, Image, StyleSheet, ScrollView } from "react-native"
import { useSelector } from "react-redux"
import { useTheme } from "@react-navigation/native"
import ReportCard from "../Components/ReportCard"

export default function AssetDetailScreen({ route }) {

    const { colors } = useTheme()

    const { asset } = route.params;
    const reports = useSelector(state => state.reports);

    const assetReports = reports.filter(
        report => report.assetId === asset.id
    );

    return (
        <ScrollView
            contentContainerStyle={[
                styles.container,
                { backgroundColor: colors.background }
            ]}
        >
            <Image source={{ uri: asset.thumbnail }} style={styles.image} />

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

            {assetReports.length > 0 && (
                <>
                    <Text style={[styles.reportTitle, { color: colors.text }]}>
                        Reportes:
                    </Text>

                    {assetReports.map(report => (
                        <ReportCard key={report.id} report={report} />
                    ))}
                </>
            )}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 20
    },

    image: {
        width: "100%",
        height: 200,
        borderRadius: 12
    },

    title: {
        fontSize: 22,
        fontWeight: "bold",
        marginVertical: 10
    },
    
    reportTitle: {
        fontSize: 18,
        fontWeight: "bold",
        marginTop: 25,
        marginBottom: 10
    }
})