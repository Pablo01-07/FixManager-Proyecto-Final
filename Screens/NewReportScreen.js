import React, { useState, useEffect } from "react"
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert, Image, ScrollView } from "react-native"
import * as ImagePicker from "expo-image-picker"
import { Picker } from "@react-native-picker/picker"
import { useGetCategoriesQuery, useGetAssetsQuery, useGetReportsQuery, useAddAssetMutation, useAddReportMutation } from "../services/firebaseApi"

export default function NewReportScreen({ navigation }) {
    const { data: assets = [] } = useGetAssetsQuery();
    const { data: reports = [] } = useGetReportsQuery();
    const { data: categories = [], isLoading } = useGetCategoriesQuery();

    const [addAssetFirebase] = useAddAssetMutation();
    const [addReportFirebase] = useAddReportMutation();

    const newReportId = reports.length + 1;

    const [title, setTitle] = useState("");
    const [brand, setBrand] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("");
    const [assetStatus, setAssetStatus] = useState("Operativo");
    const [location, setLocation] = useState("");
    const [image, setImage] = useState(null);

    const assetStatuses = [
        "Operativo",
        "En reparación",
        "Averiado",
        "Dañado",
        "Requiere mantenimiento",
        "Fuera de servicio"
    ];

    useEffect(() => {
        if (categories.length > 0 && !category) {
            setCategory(categories[0].title);
        }
    }, [categories]);

    const pickImage = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            quality: 1
        });

        if (!result.canceled) {
            setImage(result.assets[0].uri);
        }
    };

    const takePhoto = async () => {
        const permission = await ImagePicker.requestCameraPermissionsAsync();

        if (!permission.granted) {
            Alert.alert("Permiso requerido", "Debes permitir acceso a la cámara");
            return;
        }

        const result = await ImagePicker.launchCameraAsync({
            quality: 1
        });

        if (!result.canceled) {
            setImage(result.assets[0].uri);
        }
    };

    const handleSubmit = async () => {

        if (!title || !brand || !description || !location) {
            Alert.alert("Error", "Todos los campos son obligatorios");
            return;
        }

        const lastAssetId =
            assets.length > 0
                ? Math.max(...assets.map(a => a.id))
                : 0;

        const newAssetId = lastAssetId + 1;

        const newAsset = {
            id: newAssetId,
            title,
            brand,
            category,
            availabilityStatus: assetStatus,
            shippingInformation: location,
            thumbnail: image
        };

        const newReport = {
            id: reports.length + 1,
            assetId: newAssetId,
            title,
            brand,
            description,
            category,
            status: "Pendiente",
            date: new Date().toISOString()
        };

        try {
            await addAssetFirebase(newAsset).unwrap();
            await addReportFirebase(newReport).unwrap();

            Alert.alert("Reporte creado correctamente");
            navigation.goBack();

        } catch (error) {
            console.log(error);
            Alert.alert("Error al guardar en Firebase");
        }
    };

    if (isLoading) {
        return <Text style={{ padding: 20 }}>Cargando categorías...</Text>
    }

    const lastAssetId =
        assets.length > 0
            ? Math.max(...assets.map(a => a.id))
            : 0;

    const newAssetId = lastAssetId + 1;

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.title}>Nuevo Reporte</Text>

            <Text>ID Reporte: {newReportId}</Text>
            <Text>ID Asset: {newAssetId}</Text>

            <Text>Título</Text>
            <TextInput
                style={styles.input}
                value={title}
                onChangeText={setTitle}
            />

            <Text>Marca</Text>
            <TextInput
                style={styles.input}
                value={brand}
                onChangeText={setBrand}
                placeholder="Ej: HP, Lenovo, Dell..."
            />

            <Text>Descripción</Text>
            <TextInput
                style={[styles.input, styles.textArea]}
                value={description}
                onChangeText={setDescription}
                multiline
            />

            <Text>Categoría</Text>
            <Picker
                selectedValue={category}
                onValueChange={(itemValue) => setCategory(itemValue)}
                style={styles.input}
            >
                {categories.map(cat => (
                    <Picker.Item
                        key={cat.id}
                        label={cat.title}
                        value={cat.title}
                    />
                ))}
            </Picker>

            <Text>Estado del Asset</Text>
            <Picker
                selectedValue={assetStatus}
                onValueChange={(itemValue) => setAssetStatus(itemValue)}
                style={styles.input}
            >
                {assetStatuses.map(status => (
                    <Picker.Item
                        key={status}
                        label={status}
                        value={status}
                    />
                ))}
            </Picker>

            <Text>Ubicación</Text>
            <TextInput
                style={styles.input}
                value={location}
                onChangeText={setLocation}
            />

            <TouchableOpacity style={styles.imageButton} onPress={pickImage}>
                <Text>Seleccionar imagen</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.imageButton} onPress={takePhoto}>
                <Text>Tomar foto</Text>
            </TouchableOpacity>

            {image && (
                <Image source={{ uri: image }} style={styles.preview} />
            )}

            <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                <Text style={styles.buttonText}>Guardar</Text>
            </TouchableOpacity>
        </ScrollView>
    );
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
        borderColor: "#ccc",
        borderRadius: 8,
        padding: 10,
        marginBottom: 15
    },

    textArea: {
        height: 100,
        textAlignVertical: "top"
    },

    button: {
        backgroundColor: "#007AFF",
        padding: 15,
        borderRadius: 8,
        alignItems: "center",
        marginTop: 20
    },

    buttonText: {
        color: "#fff",
        fontWeight: "bold"
    },

    imageButton: {
        padding: 12,
        backgroundColor: "#EAF2F8",
        borderRadius: 8,
        marginBottom: 10,
        alignItems: "center"
    },

    preview: {
        width: "100%",
        height: 200,
        marginTop: 10,
        borderRadius: 10
    }
})