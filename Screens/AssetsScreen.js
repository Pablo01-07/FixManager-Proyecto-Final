import React, { useState, useEffect } from "react"
import { View, FlatList, StyleSheet, Text, TouchableOpacity } from "react-native"
import { useSelector, useDispatch } from "react-redux"
import { useTheme } from "@react-navigation/native"
import { useGetAssetsQuery } from "../services/firebaseApi"
import { setAssets } from "../store/slices/assetsSlice"
import AssetCard from "../Components/AssetCard"
import Search from "../Components/Search"
import { Ionicons } from "@expo/vector-icons"

export default function AssetsScreen({ route, navigation }) {

    const { colors } = useTheme()

    const categoryTitle = route?.params?.categoryTitle;
    const dispatch = useDispatch();
    const { data = [], isLoading, error } = useGetAssetsQuery();
    const allAssets = useSelector(state => state.assets);
    const [search, setSearch] = useState("");

    useEffect(() => {
        if (data.length > 0) {
            dispatch(setAssets(data));
        }
    }, [data, dispatch]);

    const filteredByCategory = categoryTitle
        ? allAssets.filter(
            item => item.category?.toLowerCase() === categoryTitle.toLowerCase()
        )
        : allAssets;

    const filteredAssets = filteredByCategory.filter(item =>
        item.title.toLowerCase().includes(search.toLowerCase()) ||
        item.brand.toLowerCase().includes(search.toLowerCase())
    );

    if (isLoading) {
        return (
            <View style={[styles.container, { backgroundColor: colors.background }]}>
                <Text style={{ color: colors.text }}>Cargando activos...</Text>
            </View>
        );
    }

    if (error) {
        return (
            <View style={[styles.container, { backgroundColor: colors.background }]}>
                <Text style={{ color: colors.text }}>Error al cargar los activos</Text>
            </View>
        );
    }

    return (
        <View style={[styles.container, { backgroundColor: colors.background }]}>

            <Search
                value={search}
                onChangeText={setSearch}
            />

            <Text style={[styles.counter, { color: colors.text }]}>
                {filteredAssets.length} activos encontrados
            </Text>

            <FlatList
                data={filteredAssets}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <AssetCard
                        asset={item}
                        onPress={() =>
                            navigation.navigate("Detail", { asset: item })
                        }
                    />
                )}
            />

            {!categoryTitle && (
                <TouchableOpacity
                    style={[
                        styles.fab,
                        { backgroundColor: colors.primary }
                    ]}
                    onPress={() => navigation.navigate("NewReport")}
                >
                    <Ionicons name="add" size={28} color="#fff" />
                </TouchableOpacity>
            )}

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20
    },

    counter: {
        marginBottom: 10,
        fontSize: 14,
        color: "#666"
    },

    fab: {
        position: "absolute",
        bottom: 30,
        right: 30,
        backgroundColor: "#007AFF",
        width: 60,
        height: 60,
        borderRadius: 30,
        justifyContent: "center",
        alignItems: "center",
        elevation: 6
    }
})