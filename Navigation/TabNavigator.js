import React from "react"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { Ionicons } from "@expo/vector-icons"
import { useSelector } from "react-redux"
import { Image } from "react-native"
import HomeStack from "./HomeStack"
import AssetsStack from "./AssetsStack"
import ReportsStack from "./ReportsStack"
import ProfileStack from "./ProfileStack"
import { useGetReportsQuery } from "../services/firebaseApi"

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
    const { data: reports = [] } = useGetReportsQuery();
    const reportsCount = reports.length;
    const profileImage = useSelector(state => state.auth.profileImage)

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
                    } else if (route.name === "Profile") {
                        iconName = focused ? "person" : "person-outline";
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

            <Tab.Screen
                name="Profile"
                component={ProfileStack}
                options={{
                    tabBarIcon: ({ size }) => (
                        profileImage ? (
                            <Image
                                source={{ uri: `data:image/jpeg;base64,${profileImage}` }}
                                style={{ width: size, height: size, borderRadius: size / 2 }}
                            />
                        ) : (
                            <Ionicons name="person" size={size} color="gray" />
                        )
                    )
                }}
            />
        </Tab.Navigator>
    );
}