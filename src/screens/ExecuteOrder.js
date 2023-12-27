import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, TextInput, StyleSheet, Alert, Image, FlatList } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';

const ExecuteOrder = ({ navigation, route }) => {

    const [images, setImages] = useState([]);
    const [jobDescription, setJobDescription] = useState("");
    const service = route.params.service;

    function addImage(imageUri) {
        const newImages = [...images, imageUri];
        setImages(newImages);
    }

    useEffect(() => {
        const fetchTakenImage = async () => {
            try {
                const imageUri = await AsyncStorage.getItem('takenImage');
                if (imageUri) {
                    addImage(imageUri)
                }
            } catch (error) {
                console.error('Error fetching image:', error);
            }
        };

        fetchTakenImage();

    }, []);

    const handleFinishOrder = async () => {
        try {
            if (jobDescription.trim() === "") {
                Alert.alert("Erro", "A descrição do trabalho deve ser preenchida.");
                return;
            }

            const response = await fetch(`http://192.168.15.21:8080/correctives/complete/${service.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    jobDescription: jobDescription,
                }),
            });

            if (!response.ok) {
                throw new Error('Erro ao finalizar a ordem de serviço');
            }

            // Remover a URI da imagem do AsyncStorage após concluir a ordem
            await AsyncStorage.removeItem('takenImage');

            navigation.navigate("Home");
        } catch (error) {
            console.error('Erro ao fazer a solicitação:', error.message);
            Alert.alert("Erro", "Não foi possível finalizar a ordem de serviço. Tente novamente mais tarde.");
        }
    };


    return (
        <View style={styles.container}>
            <Text style={styles.label}>Localização:</Text>
            <Text style={styles.value}>{service.location}</Text>

            <Text style={styles.label}>Descrição:</Text>
            <Text style={styles.value}>{service.description}</Text>

            <Text style={styles.label}>Status:</Text>
            <Text style={styles.value}>{service.status}</Text>

            <Text style={styles.label}>Serviço executado:</Text>
            <TextInput
                style={styles.input}
                multiline={true}
                numberOfLines={10}
                placeholder="Adicione um comentário"
                onChangeText={(text) => setJobDescription(text)}
            />

            <FlatList
                data={images}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                    <View style={styles.imageContainer}>
                        <Image source={{ uri: item }} style={styles.takenImage} />
                    </View>
                )}
            />

            <TouchableOpacity
                style={styles.startButton}
                onPress={() => {
                    navigation.navigate("CameraOS")
                }}
            >
                <Text style={styles.startButtonText}>Tirar Foto</Text>
            </TouchableOpacity>


            <TouchableOpacity
                style={styles.startButton}
                onPress={handleFinishOrder}
            >
                <Text style={styles.startButtonText}>Finalizar</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: "#fff",
    },
    label: {
        fontSize: 16,
        fontWeight: "bold",
        marginTop: 8,
    },
    value: {
        fontSize: 14,
        marginBottom: 16,
    },
    startButton: {
        backgroundColor: "red",
        padding: 12,
        borderRadius: 8,
        alignItems: "center",
        marginTop: 16,
    },
    startButtonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "bold",
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        padding: 8,
        marginBottom: 16,
        height: 60,
    },
    takenImage: {
        width: 200,
        height: 200,
        resizeMode: 'cover',
    },
});

export default ExecuteOrder;