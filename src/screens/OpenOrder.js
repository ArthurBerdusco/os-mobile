import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Dimensions } from "react-native";

const OpenOrder = ({ navigation }) => {
  const [location, setLocation] = useState("");
  const [tower, setTower] = useState("");
  const [floor, setFloor] = useState("");
  const [area, setArea] = useState("");
  const [description, setDescription] = useState("");

  const handleOpenOrder = async () => {
    try {
      const response = await fetch('http://192.168.15.21:8080/order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          location,
          tower,
          floor,
          area,
          description,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      console.log('Ordem de Serviço Aberta:', data);
    } catch (error) {
      console.error('Erro ao fazer a solicitação:', error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Nova Ordem de Serviço</Text>

      <Text style={styles.label}>Localização:</Text>
      <TextInput
        style={styles.input}
        placeholder="Digite a localização"
        value={location}
        onChangeText={(text) => setLocation(text)}
      />

      <Text style={styles.label}>Torre:</Text>
      <TextInput
        style={styles.input}
        placeholder="Digite a torre"
        value={tower}
        onChangeText={(text) => setTower(text)}
      />

      <Text style={styles.label}>Andar:</Text>
      <TextInput
        style={styles.input}
        placeholder="Digite o andar"
        value={floor}
        onChangeText={(text) => setFloor(text)}
      />

      <Text style={styles.label}>Área:</Text>
      <TextInput
        style={styles.input}
        placeholder="Digite a área"
        value={area}
        onChangeText={(text) => setArea(text)}
      />


      <Text style={styles.label}>Descrição</Text>
      <TextInput
        style={[styles.input, { height: 100 }]}
        placeholder="Digite a descrição"
        multiline
        numberOfLines={4}
        value={description}
        onChangeText={(text) => setDescription(text)}
      />

      <TouchableOpacity style={styles.button} onPress={handleOpenOrder}>
        <Text style={styles.buttonText}>Abrir OS</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10,
  },
  orderId: {
    fontSize: 18,
    marginTop: 5,
    marginBottom: 20,
  },
  input: {
    width: Dimensions.get('window').width - 40,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 8,
    paddingLeft: 10,
    marginBottom: 20,
  },
  button: {
    width: Dimensions.get('window').width - 40,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#3498db',
    borderRadius: 10,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
});

export default OpenOrder;
