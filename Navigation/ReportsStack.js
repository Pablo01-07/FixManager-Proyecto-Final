import React from "react"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import ReportsScreen from "../Screens/ReportsScreen"
import ReportDetailScreen from "../Screens/ReportDetailScreen"

const Stack = createNativeStackNavigator();

export default function ReportsStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="ReportsMain"
                component={ReportsScreen}
                options={{ title: "Reportes" }}
            />
            <Stack.Screen
                name="ReportDetail"
                component={ReportDetailScreen}
                options={{ title: "Detalle del Reporte" }}
            />
        </Stack.Navigator>
    );
}