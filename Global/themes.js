import { DefaultTheme, DarkTheme as NavigationDarkTheme } from "@react-navigation/native"

export const LightTheme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        background: "#f4f6f8",
        card: "#ffffff",
        text: "#000000",
        border: "#e5e5e5",
        primary: "#007AFF"
    }
}

export const DarkTheme = {
    ...NavigationDarkTheme,
    colors: {
        ...NavigationDarkTheme.colors,
        background: "#121212",
        card: "#1e1e1e",
        text: "#ffffff",
        border: "#333333",
        primary: "#0A84FF"
    }
}