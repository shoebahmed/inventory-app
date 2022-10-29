import React, {useCallback, useEffect, useState} from 'react';
import {Linking, Platform, FlatList} from 'react-native';
import {useNavigation} from '@react-navigation/core';

import {useData, useTheme, useTranslation} from '../hooks';
import * as regex from '../constants/regex';
import {Block, Button, Input, Image, Text, Checkbox, Location, Modal} from '../components';
import Login from './Login';
import { ICategory } from '../constants/types';
import Category from '../components/Category';

const isAndroid = Platform.OS === 'android';

const AddCategory = () => {
  const [showModal, setModal] = useState(false);
  const [quantity, setQuantity] = useState('Home Appliances');
  const {t} = useTranslation();
  const navigation = useNavigation();
  
  const {assets, colors, gradients, sizes} = useTheme();

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
            outlined="#aeaeb2"
            shadow={false}
            marginBottom={sizes.sm}
            onPress={() => setModal(true)}>
            <Block
            row
              align="center"
              justify="space-between"
              paddingHorizontal={sizes.sm}>
              <Text gray bold transform="uppercase" marginRight={sizes.sm}>
                {quantity}
              </Text>
              <Image
                source={assets.arrow}
                color={colors.gray}
                transform={[{rotate: '90deg'}]}
              />
            </Block>
          </Button>
          <Modal visible={showModal} onRequestClose={() => setModal(false)}>
            <FlatList 
              keyExtractor={(index) => `${index}`}
              data={['Home Appliances', 'Electronic', 'Industrial', 'General']}
              renderItem={({item}) => (
                <Button
                  marginBottom={sizes.sm}
                  onPress={() => {
                    setQuantity(item);
                    setModal(false);
                  }}>
                  <Text p white semibold transform="uppercase">
                    {item}
                  </Text>
                </Button>
              )}
            />
          </Modal>
          <Input placeholder="Name" marginBottom={sizes.sm} />
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

export default AddCategory;