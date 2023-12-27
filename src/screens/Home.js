import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome5';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Home = ({ navigation, route }) => {

    const [technician, setTechnician] = useState(null);

    useEffect(() => {
        const fetchTechnician = async () => {
            const storedTechnician = await AsyncStorage.getItem('technician');
            if (storedTechnician) {
                setTechnician(JSON.parse(storedTechnician));
            }
        };

        fetchTechnician();
    }, []);

    return (
        <View style={styles.container}>


            <ButtonOption title="Preventivas" icon="shield-alt" onPress={() => { /* Adicione a lógica de navegação ou outra ação */ }} color="#27ae60" />
            <ButtonOption title="Corretivas" icon="tools" onPress={() => { navigation.navigate("Corrective", { technician: technician }) }} color="#e74c3c" />
            <ButtonOption title="Histórico" icon="history" onPress={() => { navigation.navigate("History") }} color="#f39c12" />
            <ButtonOption title="Abrir Ordem de Serviço" icon="file-alt" onPress={() => { navigation.navigate("OpenOrder") }} color="#3498db" />

            <TouchableOpacity style={[styles.button, { backgroundColor: "#2c3e50" }]} onPress={() => { navigation.navigate('Login') }}>
                <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>

            <TouchableOpacity style={[styles.button, { backgroundColor: "#9b59b6" }]} onPress={() => { navigation.navigate('Help') }}>
                <Text style={styles.buttonText}>Ajuda</Text>
            </TouchableOpacity>
        </View>
    );
};

const ButtonOption = ({ title, onPress, icon, color }) => {
    return (
        <TouchableOpacity onPress={onPress} style={[styles.optionButton, { backgroundColor: color }]}>
            <Text style={styles.optionText}>{title}</Text>
            <Icon name={icon} size={24} color="#fff" />
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    optionButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: Dimensions.get('window').width - 40,
        height: 80,
        marginVertical: 10,
        padding: 20,
        borderRadius: 10,
    },
    optionText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#fff',
        marginLeft: 10,
    },
    button: {
        width: Dimensions.get('window').width - 40,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'black',
        borderRadius: 10,
        marginTop: 40,
    },
    buttonText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#fff',
    },
});

export default Home;
