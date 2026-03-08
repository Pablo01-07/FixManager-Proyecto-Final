import React from "react"
import { useSelector } from "react-redux"
import { NavigationContainer } from "@react-navigation/native"
import AuthStack from "./AuthStack"
import TabNavigator from "./TabNavigator"

import { LightTheme, DarkTheme } from "../Global/themes"

export default function MainNavigator() {
    const token = useSelector(state => state.auth.token)
    const darkMode = useSelector(state => state.theme.darkMode)

    return (
        <NavigationContainer theme={darkMode ? DarkTheme : LightTheme}>
            {token ? <TabNavigator /> : <AuthStack />}
        </NavigationContainer>
    );
}