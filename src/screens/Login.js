import React, { useState } from "react";
import { View, Text, TouchableOpacity, TextInput, StyleSheet, Alert } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';

const Login = ({ navigation }) => {
    const [client, setClient] = useState("arthur");
    const [email, setEmail] = useState("arthu@gmail.com");
    const [error, setError] = useState("");

    const AuthLogin = async () => {
        if (!client || !email) {
            setError("Por favor, preencha todos os campos.");
            return;
        }

        try {
            const response = await fetch('http://192.168.15.21:8080/technicianauth', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email
                })
            });

            const data = await response.json();
            if (data.success) {
                // Salvar o técnico no AsyncStorage
                await AsyncStorage.setItem('technician', JSON.stringify(data.technician));
                navigation.navigate("Home");
            } else {
                setError("Credenciais inválidas. Tente novamente.")
            }
        } catch (error) {
            console.error('Ocorreu um erro ao fazer login:', error);
            setError("Ocorreu um erro ao fazer login. Por favor, tente novamente. Detalhes: " + error.message);
        }
    }
    return (
        <View style={styles.container}>
            <Text style={styles.logo}>Master OS</Text>
            <View style={styles.formContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="Cliente"
                    placeholderTextColor="#666"
                    onChangeText={(text) => { setClient(text) }}
                />

                <TextInput
                    style={styles.input}
                    placeholder="E-mail"
                    placeholderTextColor="#666"
                    marginBottom={20} // Ajuste para dar mais espaço entre as entradas
                    onChangeText={(text) => { setEmail(text) }}
                />

                <TouchableOpacity
                    style={styles.button}
                    onPress={AuthLogin}
                >
                    <Text style={styles.buttonText}>Entrar</Text>
                </TouchableOpacity>

                {error ? <Text style={styles.errorText}>{error}</Text> : null}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#3498db", // Azul escuro
    },
    logo: {
        fontSize: 32,
        color: "#fff", // Branco
        marginBottom: 30,
        fontWeight: "bold",
    },
    formContainer: {
        backgroundColor: "#fff", // Branco
        width: '80%',
        borderRadius: 10,
        padding: 20,
        paddingTop: 30, // Ajuste para aumentar o espaço acima das entradas
        paddingBottom: 30, // Ajuste para aumentar o espaço abaixo das entradas
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.2, // Opacidade reduzida
        shadowRadius: 3,
        elevation: 5,
    },
    input: {
        height: 40,
        borderColor: "#ccc", // Cinza claro
        borderWidth: 1,
        borderRadius: 5,
        marginBottom: 20,
        paddingLeft: 10,
        color: "#333", // Cinza escuro
    },
    button: {
        backgroundColor: "#2980b9", // Azul mais claro
        paddingVertical: 12,
        borderRadius: 5,
    },
    buttonText: {
        color: "#fff", // Branco
        fontSize: 16,
        textAlign: "center",
        fontWeight: "bold",
    },
    errorText: {
        color: "red",
        fontSize: 14,
        textAlign: "center",
        marginTop: 10,
    },
});

export default Login;
