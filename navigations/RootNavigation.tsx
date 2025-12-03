import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';

import BottomTabNavigation from './BottomTabNavigation';
import { QrScreen, UpdatesScreen } from '../screens';

const RootNavigator = createNativeStackNavigator();

const StackConfig = { headerShown: false };
const modalConfig = {
  presentation: 'transparentModal',
  cardOverlayEnabled: true,
};

export default function RootNavigation() {
  return (
      <NavigationContainer>
          <RootNavigator.Navigator
            initialRouteName="BottomTabNavigation"
            screenOptions={StackConfig}>
            <RootNavigator.Screen
              component={BottomTabNavigation}
              name="BottomTabNavigation"
            />
            <RootNavigator.Screen
              component={QrScreen}
              name="QrScreen"
            />
             <RootNavigator.Screen
              component={UpdatesScreen}
              name="UpdatesScreen"
            />
           
          </RootNavigator.Navigator>
      </NavigationContainer>
  );
}
