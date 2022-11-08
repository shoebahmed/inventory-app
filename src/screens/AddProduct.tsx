import React, {useCallback, useEffect, useState, useRef} from 'react';
import {Linking, Platform, FlatList} from 'react-native';
import {useNavigation} from '@react-navigation/core';
import { useRoute } from '@react-navigation/native';

import {useData, useTheme, useTranslation} from '../hooks';
import * as regex from '../constants/regex';
import {Block, Button, Input, Image, Text, Modal} from '../components';

import * as ImagePicker from 'expo-image-picker'

import { Camera, CameraType } from 'expo-camera';
import * as MediaLibrary from 'expo-media-library';
import { RotateInUpLeft } from 'react-native-reanimated';
import { loadOptions } from '@babel/core';
import CameraModule from './CameraModule';
import { openMediaLibrary } from './CameraModule';

const isAndroid = Platform.OS === 'android';


const AddProduct = () => {

  const categoryList = ['Home Appliances', 'Electronic', 'Industrial', 'General'];
  const locationList = ['Flat 401', 'Flat 402', 'Flat 403', 'Flat 404'];

  const route = useRoute();
  const [showModal, setModal] = useState(false);
  const [showModalCategory, setModalCategory] = useState(false);
  const [action, setAction] = useState(1);
  const [modalList, setModalList] = useState(categoryList);
  const [quantity, setQuantity] = useState('Home Appliances');
  const [category, setCategory] = useState('Select Category');
  const [location, setLocation] = useState('Select Location');
  const {t} = useTranslation();
  const navigation = useNavigation();

  const {assets, colors, gradients, sizes} = useTheme();

  const [hasCameraPermission, setHasCameraPermission] = useState(false);
  const [image, setImage] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [flash, setFlash] = useState(Camera.Constants.FlashMode.off);
  const cameraRef = useRef(null);

  const handleModalList = useCallback(
    (action: number) => {
      setAction(action);
      if(action === 1){
        setModalList(categoryList);  
      }else if(action === 2){
        setModalList(locationList);
      }
      setModalCategory(true);
    },
    [categoryList, locationList, setAction, setModalList],
  );

  console.log('Calling AddProduct');
  console.log(route.params?.action);
  console.log(route.params?.productId);
  console.log(route.params?.imageUrl);

  let imageUrl = null
  let hiddenButton = false

    if(route.params?.imageUrl != 'null'){
    imageUrl = route.params?.imageUrl
    hiddenButton = true
  } 

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
        <Button
            row
            white
            outlined="#aeaeb2"
            shadow={false}
            marginBottom={sizes.sm}
            onPress={() => handleModalList(1)}>
            <Block
            row
              align="center"
              justify="space-between"
        
              paddingHorizontal={sizes.sm}>
              <Text gray bold transform="uppercase" marginRight={sizes.sm}>
                {category}
              </Text>
              <Image
                source={assets.arrow}
                color={colors.gray}
                transform={[{rotate: '90deg'}]}
              />
              </Block>
          </Button>

          <Button
            row
            white
            outlined="#aeaeb2"
            shadow={false}
            marginBottom={sizes.sm}
            onPress={() => handleModalList(2)}>
            <Block
            row
              align="center"
              justify="space-between"
              paddingHorizontal={sizes.sm}>
              <Text gray bold transform="uppercase" marginRight={sizes.sm}>
                {location}
              </Text>
              <Image
                source={assets.arrow}
                color={colors.gray}
                transform={[{rotate: '90deg'}]}
              />
            </Block>
          </Button>
          {/* Modal for Camera and Photo Library */}
          <Modal visible={showModal} onRequestClose={() => setModal(false)}>
            <FlatList 
              keyExtractor={(index) => `${index}`}
              data={['Camera', 'Photo Library']}
              renderItem={({item}) => (
                <Button
                  marginBottom={sizes.sm}
                  onPress={async () => {
                    setModal(false);
                    if(item === 'Camera'){
                      navigation.navigate('CameraModule')
                    }else {
                      imageUrl = await openMediaLibrary();
                      navigation.navigate('AddProduct',{imageUrl: imageUrl})
                    }
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
          
          {/* Generic Modal for Category and Location */}
          <Modal visible={showModalCategory} onRequestClose={() => setModalCategory(false)}>
            <FlatList 
              keyExtractor={(index) => `${index}`}
              data={modalList}
              renderItem={({item}) => (
                <Button
                  marginBottom={sizes.sm}
                  onPress={() => {
                    if(action === 1){
                      setCategory(item);
                    }else if(action === 2){
                      setLocation(item);
                    }
                    
                    setModalCategory(false);
                  }}>
                  <Text p white semibold transform="uppercase">
                    {item}
                  </Text>
                </Button>
              )}
            />
          </Modal>
      </Block>
      </Block>
  );
};

export default AddProduct;