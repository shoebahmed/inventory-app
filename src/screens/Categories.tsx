import React, {useCallback, useEffect, useState} from 'react';
import {Linking, Platform, FlatList} from 'react-native';
import {useNavigation} from '@react-navigation/core';

import {useData, useTheme, useTranslation} from '../hooks';
import * as regex from '../constants/regex';
import {Block, Button, Input, Image, Text, Checkbox, Location} from '../components';
import Login from './Login';
import { ICategory } from '../constants/types';
import Category from '../components/Category';

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


const Categories = () => {
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

  const category = [
    { id: 1, type: 'Electronic', name: 'Portable'},
    { id: 1, type: 'Home', name: 'Bulk'},
    { id: 1, type: 'Industrial', name: 'Heavy'},
  ]

  return (
    <Block>
        {/* search input */}
        <Block color={colors.card} flex={0} padding={sizes.padding}>
            <Input search placeholder={t('common.search')} />
        </Block>
        <Block marginTop={sizes.m} paddingHorizontal={sizes.padding}>
            <FlatList
                data={category}
                showsVerticalScrollIndicator={false}
                keyExtractor={(item) => `${item?.id}`}
                style={{paddingHorizontal: sizes.padding}}
                contentContainerStyle={{paddingBottom: sizes.l}}
                renderItem={({item}) => <Category{...item} />}
                />
                <Button 
                    position="absolute" 
                    right={sizes.s} 
                    bottom={sizes.xxl}
                    round
                    icon="add"
                    onPress={() =>
                        navigation.navigate('AddCategory')
                      }/> 
        </Block>
    </Block>
  );
};

export default Categories;