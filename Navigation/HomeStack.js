import React from "react"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import HomeScreen from "../Screens/HomeScreen"
import AssetsScreen from "../Screens/AssetsScreen"
import AssetDetailScreen from "../Screens/AssetDetailScreen"
import NewReportScreen from "../Screens/NewReportScreen"

const Stack = createNativeStackNavigator();

export default function HomeStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="Home"
                component={HomeScreen}
                options={{ title: "Categorías" }}
            />
            <Stack.Screen
                name="Assets"
                component={AssetsScreen}
                options={({ route }) => ({ title: route.params.categoryTitle })}
            />
            <Stack.Screen
                name="Detail"
                component={AssetDetailScreen}
                options={{ title: "Detalle" }}
            />
            <Stack.Screen
                name="NewReport"
                component={NewReportScreen}
                options={{ title: "Nuevo Reporte" }}
            />
        </Stack.Navigator>
    )
}