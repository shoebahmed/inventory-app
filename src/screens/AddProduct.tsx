import React, {useCallback, useEffect, useState, useRef} from 'react';
import {Linking, Platform, FlatList} from 'react-native';
import {useNavigation} from '@react-navigation/core';
import { useRoute } from '@react-navigation/native';

import {useData, useTheme, useTranslation} from '../hooks';
import * as regex from '../constants/regex';
import {Block, Button, Input, Image, Text, Modal} from '../components';

import { Camera, CameraType } from 'expo-camera';
import * as MediaLibrary from 'expo-media-library';
import { RotateInUpLeft } from 'react-native-reanimated';

const isAndroid = Platform.OS === 'android';


const AddProduct = () => {
  const route = useRoute();
  const [showModal, setModal] = useState(false);
  const [quantity, setQuantity] = useState('Home Appliances');
  const {t} = useTranslation();
  const navigation = useNavigation();

  const {assets, colors, gradients, sizes} = useTheme();

  const [hasCameraPermission, setHasCameraPermission] = useState(false);
  const [image, setImage] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [flash, setFlash] = useState(Camera.Constants.FlashMode.off);
  const cameraRef = useRef(null);

  console.log('Calling AddProduct');
  
  let imageUrl = null
  let hiddenButton = false

  if(route.params != null){
    console.log(route.params.imageUrl)
    imageUrl = route.params.imageUrl
    hiddenButton = true
  }

  useEffect(() => {
    (async () => {
      MediaLibrary.requestPermissionsAsync();
      const cameraStatus = await Camera.requestCameraPermissionsAsync();
      setHasCameraPermission(cameraStatus.status === 'granted');
    })();
  }, []);

  
  return (
    <Block
      color={colors.card}
      marginTop={sizes.m}
      paddingTop={sizes.m}
      paddingHorizontal={sizes.padding}>
      <Block>
        <Button
            row
            white
            shadow={false}
            marginBottom={sizes.sm}
            onPress={() => setModal(true)}>
            <Block
              row
              flex={0}
              align="center"
              justify="space-between"
             >
            <Image 
                height={170}
                width={340} 
                resizeMode="cover" 
                source={{ uri: imageUrl }}
                marginBottom={sizes.sm}
            />
            <Image 
                hidden={hiddenButton}
                height={40} 
                width={40}
                source={assets.upload}
                marginBottom={sizes.sm}
                position="absolute" 
                right={sizes.s} 
                bottom={sizes.xxl}
              />
            </Block>
          </Button>
          <Modal visible={showModal} onRequestClose={() => setModal(false)}>
            <FlatList 
              keyExtractor={(index) => `${index}`}
              data={['Camera', 'Photo Library']}
              renderItem={({item}) => (
                <Button
                  marginBottom={sizes.sm}
                  onPress={() => {
                    setModal(false);
                    navigation.navigate('CameraModule')
                  }}>
                  <Text p white semibold transform="uppercase">
                    {item}
                  </Text>
                </Button>
              )}
            />
          </Modal>
          <Input placeholder="Product Name" marginBottom={sizes.sm} />
          <Button
            marginVertical={sizes.s}
            marginHorizontal={sizes.sm}
            gradient={gradients.primary}>
            <Text bold white transform="uppercase">
              {t('common.add')}
            </Text>
          </Button>
      </Block>
    </Block>
  );
};

export default AddProduct;