import React, { FC } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Splash from '@modules/onboard';
import { navigationRef } from './NavigationUtil';
import MainNavigator from './MainNavigator';
import products from '@modules/products';
import Cart from '@modules/cart';
import Categories from '@modules/categories';

const Stack = createNativeStackNavigator();

const Navigation: FC = () => {
    return (
        <NavigationContainer ref={navigationRef}>
            <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName='Splash'>
                <Stack.Screen name="Splash" component={Splash} />
                <Stack.Screen name="MainNavigator" component={MainNavigator} />
                <Stack.Screen name="products" component={products} />
                <Stack.Screen name="cart" component={Cart} />
                <Stack.Screen name="Categories" component={Categories} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default Navigation;