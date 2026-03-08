import React, { useState, useMemo } from "react"
import { View, FlatList, Text, StyleSheet, TouchableOpacity } from "react-native"
import { useTheme } from "@react-navigation/native"
import { useGetReportsQuery } from "../services/firebaseApi"
import { useNavigation } from "@react-navigation/native"
import ReportCard from "../Components/ReportCard"
import Header from "../Components/Header"

export default function ReportsScreen() {

    const { colors } = useTheme()

    const navigation = useNavigation();

    const { data: reports = [], isLoading } = useGetReportsQuery();

    const [filter, setFilter] = useState("Todos");

    const filteredReports = useMemo(() => {
        return reports.filter(
            r => filter === "Todos" || r.status === filter
        )
    }, [reports, filter]);

    if (isLoading) {
        return <Text style={{ padding: 20, color: colors.text }}>Cargando reportes...</Text>
    }

    return (
        <View style={[styles.container, { backgroundColor: colors.background }]}>

            <Header
                title="Reportes"
            />

            <View style={styles.filters}>
                {["Todos", "Pendiente", "En proceso", "Resuelto"].map(item => (
                    <TouchableOpacity
                        key={item}
                        style={[
                            styles.filterButton,
                            {
                                backgroundColor:
                                    filter === item ? colors.primary : colors.card,
                                borderColor: colors.border,
                                borderWidth: 1
                            }
                        ]}
                        onPress={() => setFilter(item)}
                    >
                        <Text
                            style={
                                filter === item
                                    ? styles.activeText
                                    : [styles.text, { color: colors.text }]
                            }
                        >
                            {item}
                        </Text>
                    </TouchableOpacity>
                ))}
            </View>

            {filteredReports.length === 0 ? (
                <Text style={[styles.empty, { color: colors.text }]}>
                    No hay reportes
                </Text>
            ) : (
                <FlatList
                    data={filteredReports}
                    keyExtractor={(item) => item.firebaseKey}
                    renderItem={({ item }) => (
                        <ReportCard report={item} />
                    )}
                    contentContainerStyle={{ paddingBottom: 20 }}
                />
            )}

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 15
    },

    filters: {
        flexDirection: "row",
        flexWrap: "wrap",
        marginBottom: 10
    },

    filterButton: {
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 20,
        backgroundColor: "#eee",
        margin: 4
    },

    activeFilter: {
        backgroundColor: "#007AFF"
    },

    text: {
        color: "#333"
    },

    activeText: {
        color: "white",
        fontWeight: "bold"
    },

    empty: {
        textAlign: "center",
        marginTop: 50,
        color: "#666",
        fontSize: 16
    }
})