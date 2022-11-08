import React from 'react';
import {TouchableOpacity} from 'react-native';
import {Block, Image, Text} from '.';
import {useTheme, useTranslation} from '../hooks';
import {IGroup, INewProduct, IProduct} from '../constants/types';

const ProductDetail = ({
    id,
    name,
    category,
    location,
    quantity,
    description,
   }: INewProduct ) => {
  
  const {t} = useTranslation();
  const {colors, gradients, icons, sizes, assets} = useTheme();

  return (
      <Block card marginTop={sizes.sm}>
          <Block row>
            {/* user details */}
            <Block row marginBottom={sizes.xs}  >
              <Block marginLeft={sizes.s} >
                <Text
                    h5
                    bold
                    size={13}
                    transform="uppercase"
                    gradient={gradients.primary}>
                    {name}
                  </Text>
                <Text p  size={11} marginBottom={sizes.xs}>
                  {description}
                </Text>
              <Block row align="center">
                <Image source={icons.location} marginRight={sizes.s} />
                <Text p size={13} semibold>
                  {location}
                </Text>
                <Text p bold marginHorizontal={sizes.s}>
                </Text>
                <Image source={icons.quantity}  />
                <Text p size={13} semibold marginHorizontal={sizes.s}>
                  {quantity}
                </Text>
                <Text p marginRight={sizes.s} size={13} semibold>
                  {category}
                </Text>
              </Block>
            </Block>
          </Block>
        </Block>
      </Block>
  );
}

export default ProductDetail;