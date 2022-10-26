import React from 'react';
import {TouchableOpacity} from 'react-native';

import Text from './Text';
import Block from './Block';
import {useTheme, useTranslation} from '../hooks';
import {ICategory} from '../constants/types';

const Category = ({
    id,
    type,
    name
   }: ICategory ) => {
  
  const {t} = useTranslation();
  const {colors, gradients, icons, sizes} = useTheme();

  return (
    <Block card marginTop={sizes.sm}>
        <Block row>
          <Block padding={sizes.s} justify="space-between">
            <Text p>{name}</Text>
            <TouchableOpacity>
              <Block row align="center">
              <Text 
                  h5
                  bold
                  size={13}
                  marginTop={sizes.s}
                  transform="uppercase"
                  marginRight={sizes.s}
                  color={colors.link}
                  >
                  {type}
                </Text>
              </Block>
            </TouchableOpacity>
          </Block>
        </Block>
      </Block>
  );
}

export default Category;