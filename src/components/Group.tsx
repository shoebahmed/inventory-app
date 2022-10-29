import React from 'react';
import {TouchableOpacity} from 'react-native';
import {Block, Image, Text} from '../components/';
import {useTheme, useTranslation} from '../hooks';
import {IGroup} from '../constants/types';

const Group = ({
    id,
    name,
    lastActivity
   }: IGroup ) => {
  
  const {t} = useTranslation();
  const {colors, gradients, icons, sizes, assets} = useTheme();

  return (
    <Block card marginTop={sizes.sm}>
        <Block row>
          {/* user details */}
          <Block row marginBottom={sizes.xs}>
            <Image
              source={assets.avatar1}
              style={{width: sizes.xl, height: sizes.xl, borderRadius: sizes.s}}
            />
            <Block marginLeft={sizes.s}>
              <Text p semibold>
                {name}
              </Text>
              <Text p gray>
                {lastActivity}
              </Text>
            </Block>
          </Block>
        </Block>
      </Block>
  );
}

export default Group;