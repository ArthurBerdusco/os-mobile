import React, { useEffect, useState } from "react";
import { FlatList, TouchableOpacity, Text, View, StyleSheet, ActivityIndicator } from "react-native";

const Corrective = ({ navigation, route }) => {
    const [corrective, setCorrective] = useState([]);
    const [loading, setLoading] = useState(true); // Add loading state
    const [error, setError] = useState(null);

    const technician = route.params.technician;
    const id = technician.id;

    const handleNavigate = (service) => {
        
        if (service.status == "IN_PROGRESS") {
            navigation.navigate('ExecuteOrder', { service: service })
            return;
        }
        navigation.navigate('InfoOrder', { service: service })
    }

    const Service = ({ service }) => {
        return (
            <TouchableOpacity style={styles.card} onPress={() => { handleNavigate(service) }}>
                <Text style={styles.location}>{service.location}</Text>
                <Text style={styles.description}>{service.description}</Text>
                <Text style={styles.status}>{service.status}</Text>
                <Text style={styles.createdAt}>{service.created_at}</Text>
            </TouchableOpacity>
        );
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`http://192.168.15.21:8080/correctives/${id}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    }
                });

                if (!response.ok) {
                    throw new Error('Erro ao buscar dados');
                }

                const { data } = await response.json();

                setCorrective(data);
                setLoading(false);
            } catch (error) {
                console.error('Erro ao fazer a solicitação:', error.message);
                setError('Erro ao buscar dados. Tente novamente mais tarde.');
                setLoading(false);
            }
        };

        fetchData();
    }, []);

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
                data={corrective}
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

export default Corrective;
