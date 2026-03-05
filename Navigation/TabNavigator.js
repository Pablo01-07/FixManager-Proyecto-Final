import React from "react"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { Ionicons } from "@expo/vector-icons"
import HomeStack from "./HomeStack"
import AssetsStack from "./AssetsStack"
import ReportsStack from "./ReportsStack"
import { useGetReportsQuery } from "../services/firebaseApi";

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
    const { data: reports = [] } = useGetReportsQuery();
    const reportsCount = reports.length;

    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                headerShown: false,
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;

                    if (route.name === "Home") {
                        iconName = focused ? "home" : "home-outline";
                    } else if (route.name === "Assets") {
                        iconName = focused ? "cube" : "cube-outline";
                    } else if (route.name === "Reports") {
                        iconName = focused ? "document-text" : "document-text-outline";
                    }

                    return (
                        <Ionicons
                            name={iconName}
                            size={size}
                            color={color}
                        />
                    );
                },
                tabBarActiveTintColor: "#007AFF",
                tabBarInactiveTintColor: "gray"
            })}
        >
            <Tab.Screen
                name="Home"
                component={HomeStack}
            />

            <Tab.Screen
                name="Assets"
                component={AssetsStack}
            />

            <Tab.Screen
                name="Reports"
                component={ReportsStack}
                options={{
                    tabBarBadge: reportsCount > 0 ? reportsCount : null
                }}
            />
        </Tab.Navigator>
    );
}