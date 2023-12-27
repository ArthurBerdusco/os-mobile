import React, { useState, useEffect, useRef } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Image } from 'react-native';
import Constants from 'expo-constants';
import { Camera, CameraType } from 'expo-camera';
import * as MediaLibrary from 'expo-media-library';
import Button from '../components/Button';

import AsyncStorage from '@react-native-async-storage/async-storage';

const CameraOS = ({ navigation }) => {

  const [hasCameraPermission, setHasCameraPermission] = useState(null);
  const [image, setImage] = useState(null);

  const [type, setType] = useState(Camera.Constants.Type.back); //Back ou Front
  const [flash, setFlash] = useState(Camera.Constants.FlashMode.off); //Flash

  const cameraRef = useRef(null);

  useEffect(() => {
      (async () => {
          MediaLibrary.requestPermissionsAsync();
          const cameraStatus = await Camera.requestCameraPermissionsAsync();
          setHasCameraPermission(cameraStatus.status === 'granted');
      })();
  }, []);

  const takePicture = async () => {
      if (cameraRef) {
          try {
              const data = await cameraRef.current.takePictureAsync();

              setImage(data.uri);
              // Salvar a URI da imagem no AsyncStorage
              await AsyncStorage.setItem('takenImage', data.uri);
          } catch (error) {
              console.log(error);
          }
      }
  };

  const savePicture = async () => {
      if (image) {
          try {

              const asset = await MediaLibrary.createAssetAsync(image);
              alert('Picture saved! 🎉');
              setImage(null);
              navigation.goBack({reload: true});

          } catch (error) {
              console.log(error);
          }
      }
  };

  if (hasCameraPermission === false) {
      return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
      {!image ? (
        <Camera
          style={styles.camera}
          type={type}
          ref={cameraRef}
          flashMode={flash}
        >
          <View style={styles.controlsContainer}>
            <View style={styles.topControls}>
              <Button
                title=""
                icon="retweet"
                onPress={() => {
                  setType(
                    type === CameraType.back ? CameraType.front : CameraType.back
                  );
                }}
              />
              <Button
                onPress={() =>
                  setFlash(
                    flash === Camera.Constants.FlashMode.off
                      ? Camera.Constants.FlashMode.on
                      : Camera.Constants.FlashMode.off
                  )
                }
                icon="flash"
                color={flash === Camera.Constants.FlashMode.off ? 'gray' : '#fff'}
              />
            </View>

            <View style={styles.bottomControls}>
              <Button
                title="Take a picture"
                onPress={takePicture}
                icon="camera"
              />
            </View>
          </View>
        </Camera>
      ) : (
        <Image source={{ uri: image }} style={styles.camera} />
      )}


      {image ? (
        <View>
          <Button
            title="Re-take"
            onPress={() => setImage(null)}
            icon="retweet"
          />
          <Button title="Save" onPress={savePicture} icon="check" />
        </View>
      ) : (
        <View></View>
      )}
    </View>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#000',
  },
  controlsContainer: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    paddingHorizontal: 30,
    flex: 1,
  },
  topControls: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  bottomControls: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  controls: {
    flex: 0.5,
  },
  text: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#E9730F',
    marginLeft: 10,
  },
  camera: {
    flex: 5,
    borderRadius: 20,
  },
  topControls: {
    flex: 1,
  },
});

export default CameraOS