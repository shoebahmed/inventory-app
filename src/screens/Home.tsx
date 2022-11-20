import React, {useCallback, useState} from 'react';
import {FlatList} from 'react-native';

import {useData, useTheme, useTranslation} from '../hooks/';
import {Block, Button, Image, Input, Product, Text} from '../components/';
import NewProduct from '../components/NewProduct';
import { 
  recentProductList, 
  electronicProductList, 
  homeApplianceProductList,
  industrialProductList,
  General,
 } from '../constants/products';

const Home = () => {
  const {t} = useTranslation();
  const [tab, setTab] = useState<number>(0);
  const {} = useData();
  const [products, setProducts] = useState(recentProductList);
  const {assets, colors, fonts, gradients, sizes} = useTheme();

  const handleProducts = useCallback(
    (tab: number) => {
      setTab(tab);
      if(tab === 0){
        setProducts(recentProductList);   
      }else if(tab === 1){
        setProducts(electronicProductList);
      }else if(tab === 2){
        setProducts(homeApplianceProductList);
      }else if(tab === 3){
        setProducts(industrialProductList);
      }else if(tab === 4){
        setProducts(General);
      }
      
    },
    [recentProductList, electronicProductList, homeApplianceProductList, industrialProductList, General, setTab, setProducts],
  );

  return (
    <Block>
      {/* search input */}
      <Block color={colors.card} flex={0} padding={sizes.padding}>
        <Input search placeholder={t('common.search')} />
      </Block>

      {/* toggle products list */}
      <Block
        scroll
        horizontal
        showsHorizontalScrollIndicator={false}
        row
        flex={0}
        color={colors.card}
        paddingBottom={sizes.ms}>
        <Button onPress={() => handleProducts(0)}>
          <Block row>
            <Block
              flex={1}
              radius={6}
              align="center"
              justify="center"
              marginRight={sizes.s}
              marginHorizontal={sizes.s}
              gradient={gradients?.[tab === 0 ? 'primary' : 'secondary']}>
            </Block>
            <Text p font={fonts?.[tab === 0 ? 'medium' : 'normal']}>
              {t('home.recentProductList')}
            </Text>
          </Block>
        </Button>
        <Block
          gray
          flex={0}
          width={1}
          marginHorizontal={sizes.sm}
          height={sizes.socialIconSize}
        />
        <Button onPress={() => handleProducts(1)}>
          <Block row>
            <Block
              flex={1}
              radius={6}
              align="center"
              justify="center"
              marginRight={sizes.s}
              marginHorizontal={sizes.ms}
              gradient={gradients?.[tab === 1 ? 'primary' : 'secondary']}>
            </Block>
            <Text p font={fonts?.[tab === 1 ? 'medium' : 'normal']}>
              {t('home.electronicProductList')}
            </Text>
          </Block>
        </Button>
        <Block
          gray
          flex={0}
          width={1}
          marginHorizontal={sizes.sm}
          height={sizes.socialIconSize}
        />
        <Button onPress={() => handleProducts(2)}>
          <Block row>
            <Block
              flex={0}
              radius={6}
              align="center"
              justify="center"
              marginRight={sizes.s}
              gradient={gradients?.[tab === 2 ? 'primary' : 'secondary']}>
            </Block>
            <Text p font={fonts?.[tab === 2 ? 'medium' : 'normal']}>
              {t('home.homeApplianceProductList')}
            </Text>
          </Block>
        </Button>
        <Block
          gray
          flex={0}
          width={1}
          marginHorizontal={sizes.sm}
          height={sizes.socialIconSize}
        />
        <Button onPress={() => handleProducts(3)}>
          <Block row>
            <Block
              flex={0}
              radius={6}
              align="center"
              justify="center"
              marginRight={sizes.s}
              gradient={gradients?.[tab === 3 ? 'primary' : 'secondary']}>
            </Block>
            <Text p font={fonts?.[tab === 3 ? 'medium' : 'normal']}>
              {t('home.industrialProductList')}
            </Text>
          </Block>
        </Button>
        <Block
          gray
          flex={0}
          width={1}
          marginHorizontal={sizes.sm}
          height={sizes.socialIconSize}
        />
        <Button onPress={() => handleProducts(4)}>
          <Block row>
            <Block
              flex={0}
              radius={6}
              align="center"
              justify="center"
              marginRight={sizes.s}
              gradient={gradients?.[tab === 4 ? 'primary' : 'secondary']}>
            </Block>
            <Text p font={fonts?.[tab === 4 ? 'medium' : 'normal']}>
              {t('home.general')}
            </Text>
          </Block>
        </Button>
        <Block
          flex={0}
          width={1}
          marginHorizontal={sizes.sm}
          height={sizes.socialIconSize}
        />
      </Block>
      

      {/* products list */}
      <FlatList
        data={products}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item) => `${item?.id}`}
        style={{paddingHorizontal: sizes.padding}}
        contentContainerStyle={{paddingBottom: sizes.l}}
        renderItem={({item}) => <NewProduct {...item} />}
      />
    </Block>
  );
};

export default Home;
