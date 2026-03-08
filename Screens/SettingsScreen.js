import { View, Text, StyleSheet, TouchableOpacity, Switch } from "react-native"
import { Ionicons } from "@expo/vector-icons"
import { useDispatch, useSelector } from "react-redux"
import { logout } from "../store/slices/authsSlice"
import { toggleDarkMode } from "../store/slices/themesSlice"
import { LightTheme, DarkTheme } from "../Global/themes"

const SettingsScreen = ({ navigation }) => {
    const dispatch = useDispatch()
    const darkMode = useSelector(state => state.theme.darkMode)

    const theme = darkMode ? DarkTheme : LightTheme
    const colors = theme.colors

    return (
        <View style={[styles.container, { backgroundColor: colors.background }]}>
            <Text style={[styles.title, { color: colors.text }]}>
                Settings
            </Text>

            <TouchableOpacity
                style={[styles.item, { borderColor: colors.border }]}
                onPress={() => navigation.navigate("Profile")}
            >
                <Ionicons
                    name="person-outline"
                    size={22}
                    color={colors.text}
                />
                <Text style={[styles.text, { color: colors.text }]}>
                    Edit Profile
                </Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={[styles.item, { borderColor: colors.border }]}
                onPress={() => navigation.navigate("ChangePassword")}
            >
                <Ionicons
                    name="lock-closed-outline"
                    size={22}
                    color={colors.text}
                />
                <Text style={[styles.text, { color: colors.text }]}>
                    Change Password
                </Text>
            </TouchableOpacity>

            <View style={[styles.item, { borderColor: colors.border }]}>
                <Ionicons
                    name="moon-outline"
                    size={22}
                    color={colors.text}
                />

                <Text style={[styles.text, { color: colors.text }]}>
                    {darkMode ? "Dark Mode" : "Light Mode"}
                </Text>

                <Switch
                    value={darkMode}
                    onValueChange={() => dispatch(toggleDarkMode())}
                />
            </View>

            <TouchableOpacity
                style={[styles.item, { borderColor: colors.border }]}
                onPress={() => dispatch(logout())}
            >
                <Ionicons
                    name="log-out-outline"
                    size={22}
                    color="red"
                />
                <Text style={[styles.text, { color: "red" }]}>
                    Logout
                </Text>
            </TouchableOpacity>
        </View>
    )
}

export default SettingsScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20
    },

    title: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 30
    },

    item: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingVertical: 15,
        borderBottomWidth: 1
    },

    text: {
        flex: 1,
        marginLeft: 15,
        fontSize: 16
    }
})