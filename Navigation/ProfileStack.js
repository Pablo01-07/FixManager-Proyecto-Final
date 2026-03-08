import React from "react"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import ProfileScreen from "../Screens/ProfileScreen"
import SettingsScreen from "../Screens/SettingsScreen"

const Stack = createNativeStackNavigator()

export default function ProfileStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="Profile"
                component={ProfileScreen}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="Settings"
                component={SettingsScreen}
                options={{ title: "Configuración" }}
            />
        </Stack.Navigator>
    )
}