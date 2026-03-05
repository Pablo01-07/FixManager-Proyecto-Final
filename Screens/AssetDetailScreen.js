import React from "react"
import { View, Text, Image, StyleSheet, ScrollView } from "react-native"
import { useSelector } from "react-redux"
import ReportCard from "../Components/ReportCard"

export default function AssetDetailScreen({ route }) {
    const { asset } = route.params;
    const reports = useSelector(state => state.reports);

    const assetReports = reports.filter(
        report => report.assetId === asset.id
    );

    return (
        <ScrollView contentContainerStyle={styles.container}>

            <Image source={{ uri: asset.thumbnail }} style={styles.image} />
            <Text style={styles.title}>{asset.title}</Text>
            <Text>Marca: {asset.brand}</Text>
            <Text>Estado: {asset.availabilityStatus}</Text>
            <Text>Ubicación: {asset.shippingInformation}</Text>

            {assetReports.length > 0 && (
                <>
                    <Text style={styles.reportTitle}>Reportes:</Text>
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