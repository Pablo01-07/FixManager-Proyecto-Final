import React, { useEffect, useRef } from "react"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { Ionicons } from "@expo/vector-icons"
import { useSelector } from "react-redux"
import { Image, Animated, Text, View, StyleSheet } from "react-native"
import HomeStack from "./HomeStack"
import AssetsStack from "./AssetsStack"
import ReportsStack from "./ReportsStack"
import ProfileStack from "./ProfileStack"
import { useGetReportsQuery } from "../services/firebaseApi"

const Tab = createBottomTabNavigator()

export default function TabNavigator() {
    const userId = useSelector(state => state.auth.user?.localId)
    const { data: reports = [] } = useGetReportsQuery(userId)

    const filter = useSelector(state => state.filter)
    const profileImage = useSelector(state => state.auth.profileImage)

    const scaleAnim = useRef(new Animated.Value(1)).current

    const filteredReports =
        filter === "Todos"
            ? reports
            : reports.filter(r => r.status === filter)

    const reportsCount = filteredReports.length

    useEffect(() => {
        if (reportsCount === 0) return

        Animated.sequence([
            Animated.timing(scaleAnim, {
                toValue: 1.3,
                duration: 120,
                useNativeDriver: true
            }),
            Animated.timing(scaleAnim, {
                toValue: 1,
                duration: 120,
                useNativeDriver: true
            })
        ]).start()
    }, [reportsCount])

    const getBadgeColor = () => {
        if (filter === "Pendiente") return "#FF9500"
        if (filter === "En proceso") return "#007AFF"
        if (filter === "Resuelto") return "#34C759"

        return "#FF3B30"
    }

    const renderBadge = () => {
        if (reportsCount === 0) return null

        return (
            <Animated.View
                style={[
                    styles.badge,
                    {
                        backgroundColor: getBadgeColor(),
                        transform: [{ scale: scaleAnim }]
                    }
                ]}
            >
                <Text style={styles.badgeText}>
                    {reportsCount}
                </Text>
            </Animated.View>
        )
    }

    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                headerShown: false,
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName

                    if (route.name === "Home") {
                        iconName = focused ? "home" : "home-outline"
                    }

                    else if (route.name === "Assets") {
                        iconName = focused ? "cube" : "cube-outline"
                    }

                    else if (route.name === "Reports") {
                        iconName = focused
                            ? "document-text"
                            : "document-text-outline"
                    }

                    else if (route.name === "Profile") {
                        iconName = focused ? "person" : "person-outline"
                    }

                    return (
                        <View>
                            <Ionicons
                                name={iconName}
                                size={size}
                                color={color}
                            />
                            {route.name === "Reports" && renderBadge()}
                        </View>
                    )
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
            />

            <Tab.Screen
                name="Profile"
                component={ProfileStack}
                options={{
                    tabBarIcon: ({ size }) =>
                        profileImage ? (
                            <Image
                                source={{
                                    uri: `data:image/jpeg;base64,${profileImage}`
                                }}
                                style={{
                                    width: size,
                                    height: size,
                                    borderRadius: size / 2
                                }}
                            />
                        ) : (
                            <Ionicons
                                name="person"
                                size={size}
                                color="gray"
                            />
                        )
                }}
            />
        </Tab.Navigator>
    )
}

const styles = StyleSheet.create({
    badge: {
        position: "absolute",
        right: -10,
        top: -4,
        minWidth: 18,
        height: 18,
        borderRadius: 9,
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 4
    },

    badgeText: {
        color: "white",
        fontSize: 11,
        fontWeight: "bold"
    }
})