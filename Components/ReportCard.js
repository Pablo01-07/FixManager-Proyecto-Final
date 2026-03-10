import React from "react"
import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native"
import { useNavigation, useTheme } from "@react-navigation/native"
import { useDispatch, useSelector } from "react-redux"
import { deleteReport } from "../store/slices/reportsSlice"
import { deleteAsset } from "../store/slices/assetsSlice"
import { useDeleteReportMutation, useDeleteAssetMutation } from "../services/firebaseApi"
import { MaterialIcons } from "@expo/vector-icons"
import { FIREBASE_DB_URL } from "../firebase/database"

export default function ReportCard({ report }) {
    const navigation = useNavigation()
    const dispatch = useDispatch()
    const { colors } = useTheme()

    const userId = useSelector(state => state.auth.user?.localId)

    const [deleteReportFirebase] = useDeleteReportMutation()
    const [deleteAssetFirebase] = useDeleteAssetMutation()

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

    const deleteReportPicture = async (firebaseKey) => {
        try {
            const url = `${FIREBASE_DB_URL}reportPictures/${userId}/${firebaseKey}.json`

            await fetch(url, {
                method: "DELETE"
            })

        } catch (error) {
            console.log("ERROR DELETING REPORT IMAGE:", error)
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
                            console.log("DELETING REPORT:", report.firebaseKey)

                            await deleteReportFirebase({
                                userId,
                                firebaseKey: report.firebaseKey
                            }).unwrap()

                            if (report.assetFirebaseKey) {
                                await deleteAssetFirebase(
                                    report.assetFirebaseKey
                                ).unwrap()
                            }

                            await deleteReportPicture(report.firebaseKey)

                            dispatch(deleteReport(report.id))
                            dispatch(deleteAsset(report.assetId))

                            console.log("REPORT COMPLETELY DELETED")

                        } catch (error) {
                            console.log("DELETE ERROR:", error)
                            Alert.alert(
                                "Error",
                                "No se pudo eliminar el reporte"
                            )
                        }
                    }
                }
            ]
        )
    }

    return (
        <TouchableOpacity
            style={[
                styles.card,
                {
                    backgroundColor: colors.card,
                    borderColor: colors.border
                }
            ]}
            onPress={() =>
                navigation.navigate("ReportDetail", { report })
            }
            activeOpacity={0.9}
        >
            <TouchableOpacity
                style={styles.deleteIcon}
                onPress={handleDelete}
            >
                <MaterialIcons
                    name="delete"
                    size={22}
                    color="#FF3B30"
                />
            </TouchableOpacity>

            <View style={styles.info}>
                <Text style={[styles.title, { color: colors.text }]}>
                    {report.title}
                </Text>

                <Text style={[styles.brand, { color: colors.text + "99" }]}>
                    Marca: {report.brand}
                </Text>

                <Text style={[styles.category, { color: colors.text + "99" }]}>
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
        padding: 14,
        marginBottom: 12,
        elevation: 3,
        position: "relative",
        borderWidth: 1,
        shadowColor: "#000",
        shadowOpacity: 0.06,
        shadowRadius: 8,
        shadowOffset: { width: 0, height: 3 }
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
        fontSize: 14
    },

    category: {
        fontSize: 14
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