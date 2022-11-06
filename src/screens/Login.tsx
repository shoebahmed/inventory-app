import React, {useCallback, useEffect, useState} from 'react';
import {Linking, Platform} from 'react-native';
import {useNavigation} from '@react-navigation/core';

import {useData, useTheme, useTranslation} from '../hooks';
import * as regex from '../constants/regex';
import {Block, Button, Input, Image, Text, Checkbox} from '../components';

const isAndroid = Platform.OS === 'android';

interface ILogin {
  email: string;
  password: string;
}

const Login = () => {
  const {isDark} = useData();
  const {t} = useTranslation();
  const navigation = useNavigation();

  const [hiddenErrorMessage, setHiddenErrorMessage] = useState(true);

  const loginForm = {
    email: '',
    password: '',
  };

  const {assets, colors, gradients, sizes} = useTheme();

  const handleSignIn = useCallback(() => {
    
    /** send and validate login credentials */
    if(loginForm.email === 'sa' 
          && loginForm.password === 'sa'){
        navigation.navigate('Home');
    }else{
      setHiddenErrorMessage(false);
    }
   
  }, [loginForm]);

  return (
    <Block safe marginTop={sizes.md}>
    <Block paddingHorizontal={sizes.s}>
      <Block flex={0} style={{zIndex: 0}}>
        <Image
          background
          resizeMode="cover"
          padding={sizes.sm}
          radius={sizes.cardRadius}
          source={assets.background}
          height={sizes.height * 0.3}>
          <Text h4 center white marginBottom={sizes.md}>
            {t('login.title')}
          </Text>
        </Image>
      </Block>
      {/* register form */}
      <Block
        keyboard
        behavior={!isAndroid ? 'padding' : 'height'}
        marginTop={-(sizes.height * 0.2 - sizes.l)}>
        <Block
          flex={0}
          radius={sizes.sm}
          marginHorizontal="8%"
          shadow={!isAndroid} // disabled shadow on Android due to blur overlay + elevation issue
        >
          <Block
            blur
            flex={0}
            intensity={90}
            radius={sizes.sm}
            overflow="hidden"
            justify="space-evenly"
            tint={colors.blurTint}
            paddingVertical={sizes.sm}>
            <Text p semibold center>
              {t('login.subtitle')}
            </Text>
            <Text 
              hidden={hiddenErrorMessage} 
              center 
              danger 
              marginBottom={sizes.md}>
              {t('login.error')}
            </Text>
            {/* social buttons */}
            <Block row center justify="space-evenly" marginVertical={sizes.m}>
              <Button outlined gray shadow={!isAndroid}>
                <Image
                  source={assets.facebook}
                  height={sizes.m}
                  width={sizes.m}
                  color={isDark ? colors.icon : undefined}
                />
              </Button>
              <Button outlined gray shadow={!isAndroid}>
                <Image
                  source={assets.apple}
                  height={sizes.m}
                  width={sizes.m}
                  color={isDark ? colors.icon : undefined}
                />
              </Button>
              <Button outlined gray shadow={!isAndroid}>
                <Image
                  source={assets.google}
                  height={sizes.m}
                  width={sizes.m}
                  color={isDark ? colors.icon : undefined}
                />
              </Button>
            </Block>
            <Block
              row
              flex={0}
              align="center"
              justify="center"
              marginBottom={sizes.sm}
              paddingHorizontal={sizes.xxl}>
              <Block
                flex={0}
                height={1}
                width="50%"
                end={[1, 0]}
                start={[0, 1]}
                gradient={gradients.divider}
              />
              <Text center marginHorizontal={sizes.s}>
                {t('common.or')}
              </Text>
              <Block
                flex={0}
                height={1}
                width="50%"
                end={[0, 1]}
                start={[1, 0]}
                gradient={gradients.divider}
              />
            </Block>
            {/* form inputs */}
            <Block paddingHorizontal={sizes.sm}>
              <Input
                autoCapitalize="none"
                marginBottom={sizes.m}
                label={t('common.email')}
                keyboardType="email-address"
                placeholder={t('common.emailPlaceholder')}
                onChangeText={(value) => loginForm.email = value}
              />
              <Input
                secureTextEntry
                autoCapitalize="none"
                marginBottom={sizes.m}
                label={t('common.password')}
                placeholder={t('common.passwordPlaceholder')}
                onChangeText={(value) => loginForm.password = value}
              />
            </Block>
            <Button
              primary
              outlined
              shadow={!isAndroid}
              marginVertical={sizes.s}
              marginHorizontal={sizes.sm}
              onPress={() => handleSignIn()}>
              <Text bold primary transform="uppercase">
                {t('common.signin')}
              </Text>
            </Button>
          </Block>
        </Block>
      </Block>
    </Block>
  </Block>
);
};

export default Login;

