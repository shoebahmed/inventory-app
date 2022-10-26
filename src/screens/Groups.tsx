import React, {useCallback, useEffect, useState} from 'react';
import {Linking, Platform, FlatList, Share} from 'react-native';
import {useNavigation} from '@react-navigation/core';

import {useData, useTheme, useTranslation} from '../hooks';
import * as regex from '../constants/regex';
import {Block, Button, Input, Image, Text, Checkbox, Location} from '../components';
import Login from './Login';
import Group from '../components/Group';

const isAndroid = Platform.OS === 'android';

const Groups = () => {
  const {isDark} = useData();
  const {t} = useTranslation();
  const navigation = useNavigation();
  const {assets, colors, gradients, sizes} = useTheme();
  
  const group = [
    { id: 1, name: 'Mathew Bell', lastActivity: 'Added inventory on 13 Mar'},
    { id: 2, name: 'James Bond', lastActivity: 'Updated stock on 07 Mar'},
    { id: 3, name: 'Daniel Chase', lastActivity: 'Added inventory on 28 Feb'},
    { id: 1, name: 'Mathew Bell', lastActivity: 'Added inventory on 13 Mar'},
    { id: 2, name: 'James Bond', lastActivity: 'Updated stock on 07 Mar'},
    { id: 3, name: 'Daniel Chase', lastActivity: 'Added inventory on 28 Feb'},
  ]

  const onShare = async () => {
    try {
      const result = await Share.share({
        message: 'https://ty.me?c=gb3der',
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error);
    }
  };

  return (
    <Block>
        {/* search input */}
        <Block color={colors.card} flex={0} padding={sizes.padding}>
            <Input search placeholder={t('common.search')} />
        </Block>
        <Block marginTop={sizes.m} paddingHorizontal={sizes.padding}>
            <FlatList
                data={group}
                showsVerticalScrollIndicator={false}
                keyExtractor={(item) => `${item?.id}`}
                style={{paddingHorizontal: sizes.padding}}
                contentContainerStyle={{paddingBottom: sizes.l}}
                renderItem={({item}) => <Group{...item} />}
                />
                <Button 
                    position="absolute" 
                    right={sizes.s} 
                    bottom={sizes.xxl}
                    round
                    icon="share"
                    onPress={onShare}/> 
        </Block>
    </Block>
  );
};

export default Groups;