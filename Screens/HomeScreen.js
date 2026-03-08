import React from "react";
import { Text, View, FlatList, StyleSheet } from "react-native"
import { useTheme } from "@react-navigation/native"
import CategoryCard from "../Components/CategoryCard"
import { useGetCategoriesQuery } from "../services/firebaseApi";

export default function HomeScreen({ navigation }) {
    const { colors } = useTheme()

    const { data: categories = [], isLoading, error } = useGetCategoriesQuery();

    console.log("Loading:", isLoading);
    console.log("Error:", error);
    console.log("Categories:", categories);

    if (isLoading) return <Text style={{ padding: 20, color: colors.text }}>Cargando categorías...</Text>;
    if (error) return <Text style={{ padding: 20, color: colors.text }}>Error al cargar categorías</Text>;

    return (
        <View style={[styles.container, { backgroundColor: colors.background }]}>
            <FlatList
                data={categories}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <CategoryCard
                        category={item}
                        onPress={() =>
                            navigation.navigate("Assets", {
                                categoryTitle: item.title
                            })
                        }
                    />
                )}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20
    }
})