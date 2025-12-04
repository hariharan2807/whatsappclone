import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import CustomBottomTab from '../components/atoms/CustomBottomTab';
import {  Update, Communities, Call, Chats } from './StackNavigations';

const BottomTab = createBottomTabNavigator();

const config = { headerShown: false, tabBarHideOnKeyboard: true };

export default function BottomTabNavigation() {
  return (
    <BottomTab.Navigator
      screenOptions={config}
      tabBar={props => <CustomBottomTab {...props} />}
    >
      <BottomTab.Screen name="Chats" component={Chats} />
      <BottomTab.Screen name="Updates" component={Update} />
      <BottomTab.Screen name="Communities" component={Communities} />
      <BottomTab.Screen name="Calls" component={Call} />
    </BottomTab.Navigator>
  );
}
