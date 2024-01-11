// CameraScreen.jsx

import React, { useRef, useState, useEffect } from 'react';
import { View, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import { Camera } from 'expo-camera';
import * as FileSystem from 'expo-file-system';
import * as MediaLibrary from 'expo-media-library';
import { useNavigation } from '@react-navigation/native';

const CameraScreen = () => {
  const [hasPermission, setHasPermission] = useState(null);
  const cameraRef = useRef(null);
  const navigation = useNavigation();

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const takePicture = async () => {
    if (cameraRef.current) {
      if (hasPermission) {
        try {
          const photo = await cameraRef.current.takePictureAsync();

          const fileName = `photo_${Date.now()}.jpg`;

          const photosDirectory = FileSystem.documentDirectory + 'photos/';

          await FileSystem.makeDirectoryAsync(photosDirectory, {
            intermediates: true,
          });

          const photoUri = photosDirectory + fileName;
          await FileSystem.moveAsync({ from: photo.uri, to: photoUri });

          if (Platform.OS === 'android') {
            await MediaLibrary.createAssetAsync(photoUri);
          }

          console.log('Foto tomada y guardada:', photoUri);
          navigation.navigate('CreateBook', { photo: photoUri });
        } catch (error) {
          console.error('Error al tomar la foto:', error);
        }
      } else {
        console.log('No se otorgaron los permisos necesarios.');
      }
    }
  };

  return (
    <View style={styles.container}>
      <Camera style={styles.camera} type={Camera.Constants.Type.back} ref={cameraRef}>
        <View style={styles.cameraButtons}>
          <TouchableOpacity style={styles.captureButton} onPress={takePicture}>
            <View style={styles.captureButtonInner} />
          </TouchableOpacity>
        </View>
      </Camera>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  camera: {
    flex: 1,
  },
  cameraButtons: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    marginBottom: 10,
  },
  captureButton: {
    backgroundColor: "#2196F3",
    padding: 15,
    borderRadius: 50,
  },
  captureButtonInner: {
    backgroundColor: "white",
    width: 60,
    height: 60,
    borderRadius: 30,
  },
});

export default CameraScreen;
