import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import {Articles, Components, Home, Profile,Register, Login, Locations, 
  Categories,AddCategory,Groups, AddProduct, CameraModule, AddLocation,ProductList} from '../screens';
import {useScreenOptions, useTranslation} from '../hooks';


const Stack = createStackNavigator();

export default () => {
  const {t} = useTranslation();
  const screenOptions = useScreenOptions();

  return (
    <Stack.Navigator screenOptions={screenOptions.stack}>
      <Stack.Screen
        name="Login"
        component={Login}
        options={{headerShown: false}}
      />
      
      <Stack.Screen
        name="Home"
        component={Home}
        options={{title: t('navigation.home')}}
      />

      <Stack.Screen
        name="Components"
        component={Components}
        options={screenOptions.components}
      />

      <Stack.Screen
        name="Articles"
        component={Articles}
        options={{title: t('navigation.articles')}}
      />

      <Stack.Screen
        name="Profile"
        component={Profile}
        options={{headerShown: false}}
      />

      <Stack.Screen
        name="Register"
        component={Register}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Locations"
        component={Locations}
        options={{headerShown: true}}
      />
      
      <Stack.Screen 
        name="AddLocation" 
        component={AddLocation} 
        options={{ 
                  headerShown: true,  
                  title: t('navigation.addlocation') 
                }} 
      /> 
      
      <Stack.Screen
        name="Categories"
        component={Categories}
        options={{headerShown: true}}
      />
      <Stack.Screen
        name="AddProduct"
        component={AddProduct}
        initialParams={{
          'action': 'add',
          'productId':'-1',
          'imageUrl': 'null'
          }} 
        options={{
                  headerShown: true, 
                  title: t('navigation.addcategory')
                }}
      />
      <Stack.Screen
        name="CameraModule"
        component={CameraModule}
        options={{
                  headerShown: false, 
                  title: t('navigation.addcategory')
                }}
      />
      <Stack.Screen
        name="AddCategory"
        component={AddCategory}
        options={{
                  headerShown: true, 
                  title: t('navigation.addcategory')
                }}
      />
      <Stack.Screen
        name="Groups"
        component={Groups}
        options={{headerShown: true}}
      />
      <Stack.Screen
        name="ProductList"
        component={ProductList}
        options={{headerShown: true}}
      />
      
    </Stack.Navigator>
  );
};
