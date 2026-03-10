import React, { useState, useEffect } from "react"
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert, Image, ScrollView } from "react-native"
import { useTheme } from "@react-navigation/native"
import { useSelector } from "react-redux"
import * as ImagePicker from "expo-image-picker"
import * as FileSystem from "expo-file-system/legacy"
import { Picker } from "@react-native-picker/picker"
import { Ionicons } from "@expo/vector-icons"
import { FIREBASE_DB_URL } from "../firebase/database"
import { useGetCategoriesQuery, useGetAssetsQuery, useGetReportsQuery, useAddAssetMutation, useAddReportMutation } from "../services/firebaseApi"

export default function NewReportScreen({ navigation }) {
    const { colors } = useTheme()
    const userId = useSelector(state => state.auth.user?.localId)

    const { data: assets = [] } = useGetAssetsQuery()
    const { data: reports = [] } = useGetReportsQuery(userId)
    const { data: categories = [], isLoading } = useGetCategoriesQuery()

    const [addAssetFirebase] = useAddAssetMutation()
    const [addReportFirebase] = useAddReportMutation()

    const [title, setTitle] = useState("")
    const [brand, setBrand] = useState("")
    const [description, setDescription] = useState("")
    const [category, setCategory] = useState("")
    const [assetStatus, setAssetStatus] = useState("Operativo")
    const [location, setLocation] = useState("")
    const [image, setImage] = useState(null)

    const assetStatuses = [
        "Operativo",
        "En reparación",
        "Averiado",
        "Dañado",
        "Requiere mantenimiento",
        "Fuera de servicio"
    ]

    useEffect(() => {
        if (categories.length > 0 && !category) {
            setCategory(categories[0].title)
        }
    }, [categories])

    const pickImage = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            quality: 1
        })

        if (!result.canceled) {
            setImage(result.assets[0].uri)
        }
    }

    const takePhoto = async () => {
        const permission = await ImagePicker.requestCameraPermissionsAsync()

        if (!permission.granted) {
            Alert.alert("Permiso requerido", "Debes permitir acceso a la cámara")
            return
        }

        const result = await ImagePicker.launchCameraAsync({
            quality: 1
        })

        if (!result.canceled) {
            setImage(result.assets[0].uri)
        }
    }

    const convertToBase64 = async (uri) => {
        try {
            const base64 = await FileSystem.readAsStringAsync(uri, {
                encoding: FileSystem.EncodingType.Base64
            })
            return base64

        } catch (error) {
            console.log("ERROR CONVERTING IMAGE:", error)
            return null
        }
    }

    const saveReportPicture = async (base64Image, userId, reportFirebaseKey) => {
        try {
            const url = `${FIREBASE_DB_URL}reportPictures/${userId}/${reportFirebaseKey}.json`
            
            await fetch(url, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    image: base64Image
                })
            })
        } catch (error) {
            console.log("ERROR SAVING REPORT IMAGE:", error)
        }
    }

    const handleSubmit = async () => {
        if (!title || !brand || !description || !location) {
            Alert.alert("Error", "Todos los campos son obligatorios")
            return
        }

        const lastAssetId =
            assets.length > 0
                ? Math.max(...assets.map(a => a.id))
                : 0

        const newAssetId = lastAssetId + 1
        const newReportId = reports.length + 1

        let base64Image = null

        if (image) {
            base64Image = await convertToBase64(image)
        }

        const newAsset = {
            id: newAssetId,
            title,
            brand,
            category,
            availabilityStatus: assetStatus,
            shippingInformation: location,
            thumbnail: image
        }

        try {
            const assetResponse = await addAssetFirebase(newAsset).unwrap()
            const assetFirebaseKey = assetResponse.name

            const newReport = {
                id: newReportId,
                assetId: newAssetId,
                assetFirebaseKey,
                title,
                brand,
                description,
                category,
                status: "Pendiente",
                history: [
                    {
                        from: null,
                        to: "Pendiente",
                        date: new Date().toISOString()
                    }
                ],
                date: new Date().toISOString()
            }

            const reportResponse = await addReportFirebase({
                userId,
                newReport
            }).unwrap()

            const reportFirebaseKey = reportResponse.name

            if (base64Image) {
                await saveReportPicture(base64Image, userId, reportFirebaseKey)
            }
            Alert.alert("Reporte creado correctamente")
            navigation.goBack()
        } catch (error) {
            console.log("ERROR:", error)
            Alert.alert("Error al guardar en Firebase")
        }
    }

    if (isLoading) {
        return <Text style={{ padding: 20, color: colors.text }}>Cargando categorías...</Text>
    }

    const lastAssetId =
        assets.length > 0
            ? Math.max(...assets.map(a => a.id))
            : 0

    const newAssetId = lastAssetId + 1
    const newReportId = reports.length + 1

    return (
        <ScrollView
            contentContainerStyle={[
                styles.container,
                { backgroundColor: colors.background }
            ]}
        >
            <Text style={[styles.title, { color: colors.text }]}>
                Nuevo Reporte
            </Text>

            <Text style={{ color: colors.text }}>ID Reporte: {newReportId}</Text>
            <Text style={{ color: colors.text }}>ID Asset: {newAssetId}</Text>

            <Text style={{ color: colors.text }}>Título</Text>

            <TextInput
                style={[
                    styles.input,
                    {
                        color: colors.text,
                        borderColor: colors.border,
                        backgroundColor: colors.card
                    }
                ]}
                value={title}
                onChangeText={setTitle}
            />

            <Text style={{ color: colors.text }}>Marca</Text>

            <TextInput
                style={[
                    styles.input,
                    {
                        color: colors.text,
                        borderColor: colors.border,
                        backgroundColor: colors.card
                    }
                ]}
                value={brand}
                onChangeText={setBrand}
            />

            <Text style={{ color: colors.text }}>Descripción</Text>

            <TextInput
                style={[
                    styles.input,
                    styles.textArea,
                    {
                        color: colors.text,
                        borderColor: colors.border,
                        backgroundColor: colors.card
                    }
                ]}
                value={description}
                onChangeText={setDescription}
                multiline
            />

            <Text style={{ color: colors.text }}>Categoría</Text>

            <Picker
                selectedValue={category}
                onValueChange={(itemValue) => setCategory(itemValue)}
                style={[
                    styles.input,
                    {
                        color: colors.text,
                        backgroundColor: colors.card,
                        borderColor: colors.border
                    }
                ]}
                dropdownIconColor={colors.text}
            >

                {categories.map(cat => (

                    <Picker.Item
                        key={cat.id}
                        label={cat.title}
                        value={cat.title}
                    />

                ))}

            </Picker>

            <Text style={{ color: colors.text }}>Estado del Asset</Text>

            <Picker
                selectedValue={assetStatus}
                onValueChange={(itemValue) => setAssetStatus(itemValue)}
                style={[
                    styles.input,
                    {
                        color: colors.text,
                        backgroundColor: colors.card,
                        borderColor: colors.border
                    }
                ]}
                dropdownIconColor={colors.text}
            >
                {assetStatuses.map(status => (
                    <Picker.Item
                        key={status}
                        label={status}
                        value={status}
                    />
                ))}

            </Picker>

            <Text style={{ color: colors.text }}>Ubicación</Text>

            <TextInput
                style={[
                    styles.input,
                    {
                        color: colors.text,
                        borderColor: colors.border,
                        backgroundColor: colors.card
                    }
                ]}
                value={location}
                onChangeText={setLocation}
            />

            <View style={styles.imageButtons}>
                <TouchableOpacity
                    style={[
                        styles.imageButton,
                        {
                            backgroundColor: colors.card,
                            borderColor: colors.border
                        }
                    ]}
                    onPress={pickImage}
                >
                    <View style={{ flexDirection: "row", alignItems: "center", gap: 6 }}>
                        <Ionicons name="images-outline" size={20} color={colors.text} />

                        <Text style={{ color: colors.text }}>
                            Galería
                        </Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[
                        styles.imageButton,
                        {
                            backgroundColor: colors.card,
                            borderColor: colors.border
                        }
                    ]}
                    onPress={takePhoto}
                >
                    <View style={{ flexDirection: "row", alignItems: "center", gap: 6 }}>
                        <Ionicons name="camera-outline" size={20} color={colors.text} />

                        <Text style={{ color: colors.text }}>
                            Cámara
                        </Text>
                    </View>
                </TouchableOpacity>
            </View>

            {image && (
                <Image
                    source={{ uri: image }}
                    style={styles.preview}
                />
            )}

            <TouchableOpacity
                style={[
                    styles.button,
                    { backgroundColor: colors.primary }
                ]}
                onPress={handleSubmit}
            >
                <Text style={styles.buttonText}>
                    Guardar
                </Text>
            </TouchableOpacity>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 20
    },

    title: {
        fontSize: 22,
        fontWeight: "bold",
        marginBottom: 20
    },

    input: {
        borderWidth: 1,
        borderRadius: 8,
        padding: 10,
        marginBottom: 15
    },

    textArea: {
        height: 100,
        textAlignVertical: "top"
    },

    button: {
        padding: 15,
        borderRadius: 8,
        alignItems: "center",
        marginTop: 20
    },

    buttonText: {
        color: "#fff",
        fontWeight: "bold"
    },

    preview: {
        width: "100%",
        height: 200,
        marginTop: 10,
        borderRadius: 10
    },

    imageButtons: {
        flexDirection: "row",
        gap: 10,
        marginBottom: 10
    },

    imageButton: {
        flex: 1,
        padding: 12,
        borderRadius: 8,
        alignItems: "center",
        borderWidth: 1
    }
})