import React from "react"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import AssetsScreen from "../Screens/AssetsScreen"
import AssetDetailScreen from "../Screens/AssetDetailScreen"
import NewReportScreen from "../Screens/NewReportScreen"

const Stack = createNativeStackNavigator();

export default function AssetsStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="AssetsMain"
                component={AssetsScreen}
                options={{ title: "Assets" }}
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