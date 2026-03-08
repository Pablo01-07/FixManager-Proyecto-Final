import React, { useState, useEffect } from "react"
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native"
import { useSelector, useDispatch } from "react-redux"
import { useTheme } from "@react-navigation/native"
import { setProfileImage } from "../store/slices/authsSlice"
import { Ionicons } from "@expo/vector-icons"
import * as ImagePicker from "expo-image-picker"
import * as FileSystem from "expo-file-system/legacy"
import { useSaveProfilePictureMutation, useGetProfilePictureQuery } from "../services/userService"

export default function ProfileScreen({ navigation }) {
    const { colors } = useTheme()

    const dispatch = useDispatch();
    const user = useSelector(state => state.auth.user);

    const [image, setImage] = useState(null);
    const [saveProfilePicture] = useSaveProfilePictureMutation();

    const initial = user?.email?.charAt(0).toUpperCase();
    const profileImage = useSelector(state => state.auth.profileImage)

    const { data, refetch } = useGetProfilePictureQuery(user?.localId, {
        skip: !user?.localId
    })

    console.log("USER OBJECT:", user);
    console.log("IMAGE FROM FIREBASE:", data);

    useEffect(() => {
        if (data?.image) {
            dispatch(setProfileImage(data.image))
        }

    }, [data])

    const openCamera = async () => {
        console.log("📷 Botón cámara presionado")
        const permission = await ImagePicker.requestCameraPermissionsAsync()
        console.log("PERMISSION:", permission)

        if (!permission.granted) {
            alert("Se necesita permiso para usar la cámara")
            return
        }

        const result = await ImagePicker.launchCameraAsync({
            allowsEditing: true,
            aspect: [1, 1],
            quality: 0.5
        })

        console.log("RESULT CAMERA:", result)

        if (!result.canceled) {
            const uri = result.assets[0].uri
            console.log("IMAGE URI:", uri)
            setImage(uri)

            try {
                const base64 = await FileSystem.readAsStringAsync(uri, {
                    encoding: "base64"
                })

                console.log("BASE64 LENGTH:", base64.length)

                const response = await saveProfilePicture({
                    localId: user.localId,
                    image: base64
                }).unwrap()

                dispatch(setProfileImage(base64))
                console.log("Imagen guardada:", response)
            } catch (error) {
                console.log("Error guardando imagen:", error)
            }
        }
    }

    return (
        <View style={[styles.container, { backgroundColor: colors.background }]}>

            <View style={[styles.header, { borderBottomColor: colors.border }]}>

                <Text style={[styles.headerTitle, { color: colors.text }]}>
                    Perfil
                </Text>

                <TouchableOpacity style={styles.settingsButton} onPress={() => navigation.navigate("Settings")}>
                    <Ionicons
                        name="settings-outline"
                        size={24}
                        color={colors.text}
                    />
                </TouchableOpacity>

            </View>

            <View style={styles.avatarContainer}>
                {profileImage ? (
                    <Image
                        source={{ uri: `data:image/jpeg;base64,${profileImage}` }}
                        style={styles.avatar}
                    />
                ) : data?.image ? (
                    <Image
                        source={{ uri: `data:image/jpeg;base64,${data.image}` }}
                        style={styles.avatar}
                    />
                ) : image ? (
                    <Image
                        source={{ uri: image }}
                        style={styles.avatar}
                    />
                ) : (
                    <View style={styles.avatarPlaceholder}>
                        <Text style={styles.avatarLetter}>{initial}</Text>
                    </View>
                )}

                <TouchableOpacity
                    style={styles.cameraIcon}
                    onPress={openCamera}
                >
                    <Ionicons
                        name="camera"
                        size={18}
                        color="white"
                    />
                </TouchableOpacity>
            </View>

            <View style={[styles.card, { backgroundColor: colors.card }]}>

                <View style={styles.row}>
                    <Ionicons
                        name="mail-outline"
                        size={22}
                        color={colors.primary}
                    />

                    <View style={styles.info}>
                        <Text style={[styles.label, { color: colors.text }]}>
                            Email
                        </Text>

                        <Text style={[styles.value, { color: colors.text }]}>
                            {user?.email}
                        </Text>
                    </View>
                </View>

                <View style={[styles.divider, { backgroundColor: colors.border }]} />

                <View style={styles.row}>
                    <Ionicons
                        name="finger-print-outline"
                        size={22}
                        color={colors.primary}
                    />

                    <View style={styles.info}>
                        <Text style={[styles.label, { color: colors.text }]}>
                            User ID
                        </Text>

                        <Text style={[styles.value, { color: colors.text }]}>
                            {user?.localId}
                        </Text>
                    </View>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f4f6f8",
        padding: 20
    },

    header: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        paddingTop: 35,
        paddingBottom: 10,
        marginBottom: 20,
        borderBottomWidth: 1,
        borderBottomColor: "#ddd"
    },

    headerTitle: {
        fontSize: 22,
        fontWeight: "bold"
    },

    settingsButton: {
        position: "absolute",
        right: 10,
        top: 35
    },

    avatarContainer: {
        alignSelf: "center",
        marginBottom: 30
    },

    avatar: {
        width: 110,
        height: 110,
        borderRadius: 55
    },

    avatarPlaceholder: {
        width: 110,
        height: 110,
        borderRadius: 55,
        backgroundColor: "#7A3DB8",
        justifyContent: "center",
        alignItems: "center"
    },

    avatarLetter: {
        fontSize: 40,
        color: "white",
        fontWeight: "bold"
    },

    cameraIcon: {
        position: "absolute",
        bottom: 0,
        right: 0,
        backgroundColor: "#444",
        width: 36,
        height: 36,
        borderRadius: 18,
        justifyContent: "center",
        alignItems: "center"
    },

    card: {
        backgroundColor: "white",
        borderRadius: 15,
        padding: 20,
        elevation: 3,
        marginBottom: 30
    },

    row: {
        flexDirection: "row",
        alignItems: "center"
    },

    info: {
        marginLeft: 12
    },

    label: {
        fontSize: 13,
        color: "gray"
    },

    value: {
        fontSize: 16,
        fontWeight: "600"
    },

    divider: {
        height: 1,
        backgroundColor: "#eee",
        marginVertical: 15
    }
})