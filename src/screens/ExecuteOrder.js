import React, { useState } from "react";
import { View, Text, TouchableOpacity, TextInput, StyleSheet, Alert, Image, FlatList, Button } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';

import { FontAwesome } from '@expo/vector-icons'; // Importe o pacote FontAwesome

import { useFocusEffect } from '@react-navigation/native';

const ExecuteOrder = ({ navigation, route }) => {

    const API_BASE_URL = 'http://192.168.15.21:8080';

    const [images, setImages] = useState([]);
    const [jobDescription, setJobDescription] = useState("");
    const service = route.params.service;

    const idService = service.id.toString()

    useFocusEffect(
        React.useCallback(() => {
            const fetchTakenImage = async () => {
                try {
                    const cachedImages = await AsyncStorage.getItem(idService);
                    if (cachedImages) {
                        const parsedImages = JSON.parse(cachedImages);
                        setImages(parsedImages);
                    }
                } catch (error) {
                    console.error('Erro ao obter imagens do cache:', error.message);
                }
            };

            fetchTakenImage();
        }, [idService])
    );

    const handleFinishOrder = async () => {
        try {

            if (jobDescription.trim() === "") {
                Alert.alert("Erro", "A descrição do trabalho deve ser preenchida.");
                return;
            }

            const formData = new FormData();

            formData.append('idServico', idService);

            formData.append('jobDescription', jobDescription)

            images.forEach((image, index) => {
                const uri = image;
                const type = 'image/jpg';
                formData.append('images', {
                    uri: Platform.OS === 'android' ? 'file://' + uri : uri,
                    name: "image.jpg",
                    type,
                });
            });

            const response = await fetch(`${API_BASE_URL}/correctives/complete/${service.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
                body: formData
            });

            if (!response.ok) {
                throw new Error('Erro ao finalizar a ordem de serviço');
            }

            await AsyncStorage.removeItem(idService);

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
                style={{ marginBottom: 10 }}
                contentContainerStyle={styles.imageListContainer}
                data={images}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                    <View style={styles.imageContainer}>
                        <Image source={{ uri: item }} style={styles.takenImage} />
                    </View>
                )}
                horizontal={true}
            />

            <TouchableOpacity
                style={styles.roundButton}
                onPress={() => {
                    navigation.navigate("CameraOS", { idService: idService });
                }}
            >
                <FontAwesome name="camera" size={24} color="white" />
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.finishButton}
                onPress={handleFinishOrder}
            >
                <Text style={styles.finishButtonText}>Finalizar</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: "#F5F5F5",
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
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        padding: 8,
        marginBottom: 16,
        height: 60,
    },
    imageContainer: {
        marginHorizontal: 8,
        marginBottom: 16,
    },
    takenImage: {
        width: 150,
        height: 300, // Ajuste a altura conforme necessário
        resizeMode: 'contain',
    },
    roundButton: {
        width: 60,
        height: 60,
        borderRadius: 100,
        backgroundColor: "gray",
        alignItems: "center",
        justifyContent: "center",
        alignSelf: 'flex-end',
        marginBottom: 16,
    },
    finishButton: {
        backgroundColor: "red",
        padding: 12,
        borderRadius: 8,
        alignItems: "center",
        marginTop: 16,
    },
    finishButtonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "bold",
    },
});


export default ExecuteOrder;