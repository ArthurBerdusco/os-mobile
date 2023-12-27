import React, { useState } from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';

const MenuModal = ({ isVisible, onClose, userName, onDownloadOrders, onLogout }) => {
  return (
    <Modal
      transparent={true}
      visible={isVisible}
      onRequestClose={onClose}
      animationType="slide"
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Image
            style={styles.profileImage}
            source={{ uri: 'URL_DA_IMAGEM' }} // Substitua 'URL_DA_IMAGEM' pela URL real da imagem
          />
          <Text style={styles.userName}>{userName}</Text>
          <TouchableOpacity style={styles.button} onPress={onDownloadOrders}>
            <Text style={styles.buttonText}>Baixar Ordens de Serviço</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={onLogout}>
            <Text style={styles.buttonText}>Sair</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Text style={styles.closeButtonText}>Fechar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: 300,
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    alignItems: 'center',
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  userName: {
    fontSize: 16,
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#007BFF',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
    width: '100%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  closeButton: {
    backgroundColor: '#ccc',
    padding: 10,
    borderRadius: 5,
    width: '100%',
    alignItems: 'center',
  },
  closeButtonText: {
    color: '#333',
    fontSize: 16,
  },
});

export default MenuModal;
