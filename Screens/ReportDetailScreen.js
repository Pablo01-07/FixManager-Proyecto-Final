import React, { useState, useEffect } from "react"
import { View, Text, StyleSheet, TouchableOpacity, Alert, ScrollView, Image } from "react-native"
import { useDispatch, useSelector } from "react-redux"
import { useTheme } from "@react-navigation/native"
import Header from "../Components/Header"
import { updateReportStatus } from "../store/slices/reportsSlice"
import { updateAssetStatus } from "../store/slices/assetsSlice"
import { useUpdateReportMutation } from "../services/firebaseApi"
import { FIREBASE_DB_URL } from "../firebase/database"

export default function ReportDetailScreen({ route }) {
    const { colors } = useTheme()

    const { report } = route.params

    const dispatch = useDispatch()
    const [updateReport] = useUpdateReportMutation()

    const reportFromRedux = useSelector(state =>
        state.reports.find(r => r.id === report.id)
    )

    const [currentReport, setCurrentReport] = useState(reportFromRedux || report)
    const [reportImage, setReportImage] = useState(null)

    useEffect(() => {
        if (reportFromRedux) {
            setCurrentReport(reportFromRedux)
        }
    }, [reportFromRedux])

    const asset = useSelector(state =>
        state.assets.find(a => a.id === currentReport.assetId)
    )

    useEffect(() => {
        const loadReportImage = async () => {
            try {
                const response = await fetch(
                    `${FIREBASE_DB_URL}reportPictures/${currentReport.id}.json`
                )

                const data = await response.json()

                if (data?.image) {
                    setReportImage(`data:image/jpeg;base64,${data.image}`)
                }
            } catch (error) {
                console.log("ERROR LOADING REPORT IMAGE:", error)
            }
        }
        loadReportImage()
    }, [])

    const changeStatus = (newStatus) => {
        if (currentReport.status === newStatus) return

        Alert.alert(
            "Confirmar cambio",
            `¿Cambiar estado a "${newStatus}"?`,
            [
                { text: "Cancelar", style: "cancel" },
                {
                    text: "Confirmar",
                    onPress: async () => {

                        const previousStatus = currentReport.status

                        const newHistory = [
                            ...(currentReport.history || []),
                            {
                                from: previousStatus,
                                to: newStatus,
                                date: new Date().toISOString()
                            }
                        ]

                        try {
                            await updateReport({
                                firebaseKey: currentReport.firebaseKey,
                                updatedData: {
                                    status: newStatus,
                                    history: newHistory
                                }
                            }).unwrap()

                            setCurrentReport({
                                ...currentReport,
                                status: newStatus,
                                history: newHistory
                            })

                            dispatch(updateReportStatus({
                                id: currentReport.id,
                                status: newStatus
                            }))

                            if (newStatus === "En proceso") {
                                dispatch(updateAssetStatus({
                                    id: currentReport.assetId,
                                    availabilityStatus: "En reparación"
                                }))
                            }

                            if (newStatus === "Resuelto") {
                                dispatch(updateAssetStatus({
                                    id: currentReport.assetId,
                                    availabilityStatus: "Operativo"
                                }))
                            }

                            Alert.alert("Estado actualizado correctamente")

                        } catch (error) {
                            console.log(error)
                            Alert.alert("Error actualizando estado")
                        }
                    }
                }
            ]
        )
    }

    const renderButton = (status, styleColor) => {
        const isActive = currentReport.status === status
        const isResolved = currentReport.status === "Resuelto"

        return (
            <TouchableOpacity
                style={[
                    styles.statusButton,
                    styleColor,
                    (isActive || isResolved) && styles.disabledButton
                ]}
                disabled={isActive || isResolved}
                onPress={() => changeStatus(status)}
            >

                <Text style={styles.buttonText}>
                    {status}
                </Text>

            </TouchableOpacity>
        )
    }

    return (
        <View style={{ flex: 1, backgroundColor: colors.background }}>
            <Header
                title="Detalle del Reporte"
                showBack
            />

            <ScrollView contentContainerStyle={styles.container}>

                <Text style={[styles.title, { color: colors.text }]}>
                    {currentReport.title}
                </Text>

                {reportImage && (
                    <Image
                        source={{ uri: reportImage }}
                        style={styles.image}
                    />
                )}

                <Text style={{ color: colors.text }}>
                    Marca: {currentReport.brand}
                </Text>

                <Text style={{ color: colors.text }}>
                    Descripción: {currentReport.description}
                </Text>

                <Text style={{ color: colors.text }}>
                    Categoría: {currentReport.category}
                </Text>

                <Text style={[styles.assetInfo, { color: colors.text }]}>
                    Estado actual del Asset: {asset?.availabilityStatus}
                </Text>

                <Text style={[styles.currentStatus, { color: colors.text }]}>
                    Estado actual del Reporte: {currentReport.status}
                </Text>

                <Text style={[styles.sectionTitle, { color: colors.text }]}>
                    Cambiar estado
                </Text>

                {renderButton("Pendiente", styles.pending)}
                {renderButton("En proceso", styles.process)}
                {renderButton("Resuelto", styles.resolved)}

                <Text style={[styles.sectionTitle, { color: colors.text }]}>
                    Historial de cambios
                </Text>

                {currentReport.history?.map((item, index) => (

                    <View
                        key={`${item.date}-${index}`}
                        style={[
                            styles.historyItem,
                            { backgroundColor: colors.card }
                        ]}
                    >

                        <Text style={{ color: colors.text }}>
                            {item.from
                                ? `${item.from} → ${item.to}`
                                : `Creado como ${item.to}`}
                        </Text>

                        <Text style={[styles.historyDate, { color: colors.text }]}>
                            {new Date(item.date).toLocaleString()}
                        </Text>
                    </View>
                ))}
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 20
    },

    title: {
        fontSize: 22,
        fontWeight: "bold",
        marginBottom: 10
    },

    image: {
        width: "100%",
        height: 220,
        borderRadius: 12,
        marginVertical: 15
    },

    assetInfo: {
        marginTop: 10,
        fontWeight: "600"
    },

    currentStatus: {
        marginVertical: 15,
        fontWeight: "bold"
    },

    sectionTitle: {
        marginTop: 20,
        marginBottom: 10,
        fontSize: 16,
        fontWeight: "bold"
    },

    statusButton: {
        padding: 12,
        borderRadius: 8,
        marginBottom: 10,
        alignItems: "center"
    },

    disabledButton: {
        opacity: 0.5
    },

    pending: {
        backgroundColor: "#F4D03F"
    },

    process: {
        backgroundColor: "#3498DB"
    },

    resolved: {
        backgroundColor: "#2ECC71"
    },

    buttonText: {
        color: "#fff",
        fontWeight: "bold"
    },

    historyItem: {
        padding: 10,
        borderRadius: 8,
        marginBottom: 8
    },

    historyDate: {
        fontSize: 12,
        color: "#7F8C8D"
    }
})