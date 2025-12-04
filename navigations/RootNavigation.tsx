import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';

import BottomTabNavigation from './BottomTabNavigation';
import {
  CommunitiesScreen,
  QrScreen,
  SearchScreen,
  SplashScreen,
  UpdatesScreen,
} from '../screens';

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
        initialRouteName="SplashScreen"
        screenOptions={StackConfig}
      >
        <RootNavigator.Screen
          component={BottomTabNavigation}
          name="BottomTabNavigation"
        />
        <RootNavigator.Screen name="SearchScreen" component={SearchScreen} />

        <RootNavigator.Screen component={QrScreen} name="QrScreen" />
        <RootNavigator.Screen component={SplashScreen} name="SplashScreen" />
        {/* <RootNavigator.Screen
          component={CommunitiesScreen}
          name="CommunitiesScreen"
        />

        <RootNavigator.Screen name="UpdatesScreen" component={UpdatesScreen} /> */}
      </RootNavigator.Navigator>
    </NavigationContainer>
  );
}
