import React, { useState } from "react";
import { View, Text, TouchableOpacity, TextInput, StyleSheet } from "react-native";

const InfoOrder = ({ navigation, route }) => {
  const service = route.params.service;
  const [comment, setComment] = useState("");

  const handleStartOrder = async () => {
    try {
      // Aqui, você precisa implementar a lógica de atualização do status e started_at
      const response = await fetch(`http://192.168.15.21:8080/correctives/${service.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        }
      });

      if (!response.ok) {
        throw new Error('Erro ao iniciar a ordem de serviço');
      }

      navigation.navigate("ExecuteOrder", { service: service });
    } catch (error) {
      console.error('Erro ao fazer a solicitação:', error.message);
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

      <TouchableOpacity
        style={styles.startButton}
        onPress={handleStartOrder}
      >
        <Text style={styles.startButtonText}>Iniciar OS</Text>
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
    backgroundColor: "#007BFF", 
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
});

export default InfoOrder;
