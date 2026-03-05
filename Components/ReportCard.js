import React from "react"
import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native"
import { useNavigation } from "@react-navigation/native"
import { useDispatch } from "react-redux"
import { deleteReport } from "../store/slices/reportsSlice"
import { deleteAsset } from "../store/slices/assetsSlice"
import { useDeleteReportMutation, useDeleteAssetMutation } from "../services/firebaseApi"
import { MaterialIcons } from "@expo/vector-icons"

export default function ReportCard({ report }) {
    const navigation = useNavigation();
    const dispatch = useDispatch();

    const [deleteReportFirebase] = useDeleteReportMutation();
    const [deleteAssetFirebase] = useDeleteAssetMutation();

    const getStatusColor = () => {
        switch (report.status) {
            case "Pendiente":
                return "#FF9500"
            case "En proceso":
                return "#007AFF"
            case "Resuelto":
                return "#34C759"
            default:
                return "#999"
        }
    }

    const handleDelete = () => {
        Alert.alert(
            "Eliminar reporte",
            "¿Seguro que deseas eliminar este reporte?",
            [
                { text: "Cancelar", style: "cancel" },
                {
                    text: "Eliminar",
                    style: "destructive",
                    onPress: async () => {
                        try {
                            await deleteReportFirebase(report.firebaseKey)

                            if (report.assetFirebaseKey) {
                                await deleteAssetFirebase(report.assetFirebaseKey)
                            }
                            dispatch(deleteReport(report.id))
                            dispatch(deleteAsset(report.assetId))

                        } catch (error) {
                            console.log(error)
                            Alert.alert("Error eliminando reporte")
                        }
                    }
                }
            ]
        )
    }

    return (
        <TouchableOpacity
            style={styles.card}
            onPress={() =>
                navigation.navigate("ReportDetail", { report })
            }
            activeOpacity={0.9}
        >

            <TouchableOpacity
                style={styles.deleteIcon}
                onPress={handleDelete}
            >
                <MaterialIcons name="delete" size={22} color="#FF3B30" />
            </TouchableOpacity>

            <View style={styles.info}>

                <Text style={styles.title}>
                    {report.title}
                </Text>

                <Text style={styles.brand}>
                    Marca: {report.brand}
                </Text>

                <Text style={styles.category}>
                    Categoría: {report.category}
                </Text>

                <View
                    style={[
                        styles.statusBadge,
                        { backgroundColor: getStatusColor() }
                    ]}
                >

                    <Text style={styles.statusText}>
                        {report.status}
                    </Text>

                </View>

            </View>

        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: "white",
        borderRadius: 12,
        padding: 12,
        marginBottom: 12,
        elevation: 3,
        position: "relative"
    },

    deleteIcon: {
        position: "absolute",
        top: 10,
        right: 10,
        zIndex: 10
    },

    info: {
        gap: 4
    },

    title: {
        fontSize: 18,
        fontWeight: "bold"
    },

    brand: {
        fontSize: 14,
        color: "#555"
    },

    category: {
        fontSize: 14,
        color: "#555"
    },

    statusBadge: {
        marginTop: 6,
        alignSelf: "flex-start",
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 20
    },

    statusText: {
        color: "white",
        fontWeight: "bold",
        fontSize: 12
    }
})