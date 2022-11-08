import React, {useCallback, useEffect, useState} from 'react';
import {Linking, Platform, FlatList} from 'react-native';
import {useNavigation} from '@react-navigation/core';

import {useData, useTheme, useTranslation} from '../hooks';
import * as regex from '../constants/regex';
import {Block, Button, Input, Image, Text, Checkbox, Location} from '../components';
import ProductDetail from '../components/ProductDetail';


const isAndroid = Platform.OS === 'android';


interface IRegistration {
  name: string;
  email: string;
  password: string;
  agreed: boolean;
}
interface IRegistrationValidation {
  name: boolean;
  email: boolean;
  password: boolean;
  agreed: boolean;
}

const ProductList = () => {
  const {isDark} = useData();
  const {t} = useTranslation();
  const navigation = useNavigation();
  const [isValid, setIsValid] = useState<IRegistrationValidation>({
    name: false,
    email: false,
    password: false,
    agreed: false,
  });
  const [registration, setRegistration] = useState<IRegistration>({
    name: '',
    email: '',
    password: '',
    agreed: false,
  });
  const {assets, colors, gradients, sizes} = useTheme();

  const handleChange = useCallback(
    (value) => {
      setRegistration((state) => ({...state, ...value}));
    },
    [setRegistration],
  );

  const handleSignUp = useCallback(() => {
    if (!Object.values(isValid).includes(false)) {
      /** send/save registratin data */
      console.log('handleSignUp', registration);
    }
  }, [isValid, registration]);

  useEffect(() => {
    setIsValid((state) => ({
      ...state,
      name: regex.name.test(registration.name),
      email: regex.email.test(registration.email),
      password: regex.password.test(registration.password),
      agreed: registration.agreed,
    }));
  }, [registration, setIsValid]);

  const productList=[
  {
    id:11, 
    name:"Iphone",
    category:"Electronic Products",
    location: "Flat 402",
    quantity: 1,
    description: "IPhone 14 pro max purchased from MediaMarkt on 12-Oct-22",
  },
  {
    id:12, 
    name:"Mixer",
    category:"Home Appliances",
    location: "Flat 403",
    quantity: 10,
    description: "Juicer Grinder",
  },
  {
    id:13, 
    name:"Bike",
    category:"Industrial",
    location: "Flat 402",
    quantity: 10,
    description: "Hayabusa Bike Sensor",
   
  },

  {
    id:14, 
    name:"Iphone",
    category: "Electronic Products",
    location: "Flat 402",
    quantity: 1,
    timestamp: 22,
    description: "IPhone 14 pro max purchased from MediaMarkt on 12-Oct-22",
  },
  {
    id:15, 
    name:"Laptop",
    category: "Electronic Products",
    location: "Flat 403",
    quantity: 10,
    description: "Asus Tuf Gaming Laptop",
  },
  {
    id:16, 
    name:"Boat",
    category: "Electronic Products",
    location: "Flat 40",
    quantity: 10,
    description: "Boat Airdopes delivered",
  },
  {
    id:17, 
    name:"Refrigerator",
    category:"Home Appliances",
    location: "Flat 402",
    quantity: 1,
    description: "LG Refrigerator purchased from LG Store",
  },
  {
    id:18, 
    name:"Juicer",
    category:"Home Appliances",
    location: "Flat 403",
    quantity: 10,
    description: "Juicer Grinder",
  },
  {
    id:19, 
    name:"Machine",
    category:"Home Appliances",
    location: "Flat 40",
    quantity: 10,
    description: "Washing Machine",
  },

  {
    id:20, 
    name:"Bike",
    category:"Industrial Products",
    location: "Flat 402",
    quantity: 5,
    description: "Hayabusa Bike Sensor delivered",
  },
  {
    id:21,
    name:"Pumping Machine", 
    category:"Industrial Products",
    location: "Flat 403",
    quantity: 10,
    description: "Pumps, Pumping Machines & Spares",
  },
  {
    id:22, 
    name:"Pumping machine",
    category:"Industrial Products",
    location: "Flat 40",
    quantity: 10,
    description: "Pumps, Pumping Machines & Spares",
  },

  {
    id:23, 
    name:"Iphone",
    category:"General Products",
    location: "Flat 402",
    quantity: 4,
    description: "Ear drops and Nasal drops",
  },
  {
    id:24, 
    name:"Iphone",
    category:"General Products",
    location: "Flat 403",
    quantity: 5,
    description: "Dry Cough Syrups",
  },
  {
    id:25, 
    name:"Iphone",
    category:"General Products",
    location: "Flat 40",
    quantity: 10,
    description: "Axe Deodrants",
  },
]
   

  return (
    <Block>
        {/* search input */}
        <Block color={colors.card} flex={0} padding={sizes.padding}>
            <Input search placeholder={t('common.search')} />
        </Block>
        <Block marginTop={sizes.m} paddingHorizontal={sizes.padding}>
            <FlatList
                data={productList}
                showsVerticalScrollIndicator={false}
                keyExtractor={(item) => `${item?.id}`}
                style={{paddingHorizontal: sizes.padding}}
                contentContainerStyle={{paddingBottom: sizes.l}}
                renderItem={({item}) => <ProductDetail{...item} />}
                />
                
                {/* <Button 
                    position="absolute" 
                    right={sizes.s}
                    bottom={sizes.xxl}
                    round
                    icon="add"
                    onPress={() => navigation.navigate("")}/>  */}
        </Block>
    </Block>
  );
};

export default ProductList;