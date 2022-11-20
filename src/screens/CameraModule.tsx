import React, { useState, useEffect, useRef } from 'react';
import { useNavigation } from '@react-navigation/core';

import { Text, View, StyleSheet, TouchableOpacity, Image } from 'react-native';
import Constants from 'expo-constants';
import * as ImagePicker from 'expo-image-picker'
import { Camera, CameraType } from 'expo-camera';
import * as MediaLibrary from 'expo-media-library';
import { MaterialIcons, Feather } from '@expo/vector-icons';
import Button from '../components/Button';
import { Block } from '../components';
import CameraButton from '../components/CameraButton';
import { Platform } from 'expo-modules-core';
import { ImageEditor } from "expo-image-editor";

const CameraModule = () => {

  const navigation = useNavigation();
  const [hasCameraPermission, setHasCameraPermission] = useState(null);
  const [selectedImage, setSelectedImage] = React.useState(null);
  const [image, setImage] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [flash, setFlash] = useState(Camera.Constants.FlashMode.off);
  const cameraRef = useRef(null);
  const [editorVisible, setEditorVisible] = useState(false);

  useEffect(() => {
    (async () => {
      MediaLibrary.requestPermissionsAsync();
      const cameraStatus = await Camera.requestCameraPermissionsAsync();
      setHasCameraPermission(cameraStatus.status === 'granted');

      if (Platform.OS !== "web") {
        const { status } =
          await ImagePicker.requestMediaLibraryPermissionsAsync();

      }
    })();
  }, []);

  const takePicture = async () => {
    if (cameraRef) {
      try {
        const data = await cameraRef.current.takePictureAsync();
        console.log(data);
        setImage(data.uri);
        setEditorVisible(true);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const editComplete = async () => {
    
  };

  const launchEditor = (uri: string) => {
    // Then set the image uri
    setImage(image);
    // And set the image editor to be visible
    setEditorVisible(true);
  };

  const savePicture = async () => {
    console.log("savePicture");
    console.log(image);
    navigation.navigate('AddProduct', { imageUrl: image })
    setImage(null);

    /*if (image) {
      try {
        const asset = await MediaLibrary.createAssetAsync(image);
        alert('Picture saved! 🎉');
        setImage(null);
        console.log('saved successfully');
      } catch (error) {
        console.log(error);
      }
    }*/
  };

  if (hasCameraPermission === false) {
    return <Text>No access to camera</Text>
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
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingHorizontal: 30,
            }}
          >
            <CameraButton
              title=""
              icon="camera-reverse"
              visible = {true}
              onPress={() => {
                setType(
                  type === CameraType.back ? CameraType.front : CameraType.back
                );
              }}
            />
            <CameraButton
              onPress={() => {
                setFlash(
                  flash === Camera.Constants.FlashMode.off ? Camera.Constants.FlashMode.torch : Camera.Constants.FlashMode.off
                )
              }}
              visible = {true}
              icon="flash"
              color={flash === Camera.Constants.FlashMode.off ? 'gray' : '#fff'}
            />
          </View>
        </Camera>
      ) : (
        <Image source={{ uri: image }} style={styles.camera} />
      )}

      <View style={styles.controls}>
        {image ? (
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingHorizontal: 60
            }}
          >
            <ImageEditor
              visible={editorVisible}
              onCloseEditor={() => {
                setEditorVisible(false)
                console.log("on close editor")
                setImage(image);
              }}
              imageUri={image}
              fixedCropAspectRatio={16 / 9}
              lockAspectRatio={true}
              minimumCropDimensions={{
                width: 100,
                height: 100,
              }}
              onEditingComplete={(result) => {
                setImage(result.uri);
                setEditorVisible(false);
                console.log("Edit done");
              }}
              mode="full"
            />
            <CameraButton
              title="Re-take"
              visible={!editorVisible}
              onPress={() => setImage(null)}
              icon="close-outline"
            />
            <CameraButton
              title="Save"
              visible={!editorVisible}
              onPress={savePicture}
              icon="checkmark"
            />
          </View>
        ) : (
          <>
            <View>
                <View
                  style={{
                    flexDirection: 'row-reverse',
                    paddingHorizontal: 18,
                  }}
                >
                  <CameraButton
                    visible = {true}
                    onPress={ () => navigation.goBack() }
                    icon="close-outline"
                  />
               <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    paddingHorizontal: 100,
                  }}
                >
                <CameraButton
                  visible = {true}
                  onPress= {takePicture}
                  icon="camera"
                  />
                  </View>
                </View>
              </View>
          </>
        )}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ffffff',
    padding: 0,
  },
  controls: {
    flex: 0.5,
    backgroundColor: '#000',
  },
  button: {
    height: 40,
    borderRadius: 6,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ffffff',
  },
  text: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#E9730F',
    marginLeft: 10,
  },
  camera: {
    flex: 4,
    borderRadius: 5,
  },
  topControls: {
    flex: 1,
  },
});

export default CameraModule;

export async function openMediaLibrary() {

  console.log("Calling Media");
  const result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.Images,
    allowsEditing: true,
    aspect: [4, 3],
    quality: 1,
  });

  console.log(result.uri);
  return result.uri;
}