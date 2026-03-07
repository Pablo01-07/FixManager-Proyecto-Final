import React from "react"
import { useSelector } from "react-redux"
import { NavigationContainer } from "@react-navigation/native"
import AuthStack from "./AuthStack"
import TabNavigator from "./TabNavigator"

export default function MainNavigator() {
    const token = useSelector(state => state.auth.token);

    return (
        <NavigationContainer>
            {token ? <TabNavigator /> : <AuthStack />}
        </NavigationContainer>
    );
}