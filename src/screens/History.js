import React, { useEffect, useState } from "react";
import { FlatList, TouchableOpacity, Text, View, StyleSheet, ActivityIndicator } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';

const History = ({ navigation }) => {
  
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [technician, setTechnician] = useState(null);

  const Service = ({ service }) => {
    return (
      <TouchableOpacity style={styles.card} onPress={() => { navigation.navigate('InfoOrder', { service: service }) }}>
        <Text style={styles.location}>{service.location}</Text>
        <Text style={styles.description}>{service.description}</Text>
        <Text style={styles.status}>{service.status}</Text>
        <Text style={styles.createdAt}>{service.created_at}</Text>
      </TouchableOpacity>
    );
  };

  useEffect(() => {
    const fetchTechnician = async () => {
      try {
        const storedTechnician = await AsyncStorage.getItem('technician');
        if (storedTechnician) {
          setTechnician(JSON.parse(storedTechnician));
        }
      } catch (error) {
        console.error('Erro ao buscar técnico:', error.message);
        setError('Erro ao buscar técnico. Tente novamente mais tarde.');
      }
    };

    fetchTechnician();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Verifique se o técnico está definido antes de fazer a chamada para evitar id nulo
        if (technician) {
          const response = await fetch(`http://192.168.15.21:8080/orders/${technician.id}`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          });

          if (!response.ok) {
            throw new Error('Erro ao buscar dados');
          }

          const data = await response.json();
          setOrders(data.orders);
        }

        setLoading(false);
      } catch (error) {
        console.error('Erro ao fazer a solicitação:', error.message);
        setError('Erro ao buscar dados. Tente novamente mais tarde.');
        setLoading(false);
      }
    };

    // Execute a chamada apenas se o técnico estiver definido
    if (technician) {
      fetchData();
    }
  }, [technician]);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text>{error}</Text>
      </View>
    );
  }

  return (
    <View>
      <FlatList
        data={orders}
        renderItem={({ item }) => <Service service={item} />}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    errorContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    errorText: {
        color: 'red',
        fontSize: 16,
    },
    card: {
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 8,
        padding: 16,
        margin: 8,
        backgroundColor: '#fff',
    },
    location: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    description: {
        fontSize: 16,
        marginBottom: 8,
    },
    status: {
        fontSize: 14,
        color: '#007BFF',
        marginBottom: 8,
    },
    createdAt: {
        fontSize: 12,
        color: '#6C757D',
    },
});

export default History;
