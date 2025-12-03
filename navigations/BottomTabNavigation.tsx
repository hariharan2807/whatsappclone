import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import CustomBottomTab from '../components/atoms/CustomBottomTab';
import { Home, Cart, User, Update } from './StackNavigations';

const BottomTab = createBottomTabNavigator();

const config = { headerShown: false, tabBarHideOnKeyboard: true };

export default function BottomTabNavigation() {
  return (
    <BottomTab.Navigator
      screenOptions={config}
      tabBar={props => <CustomBottomTab {...props} />}
    >
      <BottomTab.Screen name="Chats" component={Home} />
      <BottomTab.Screen name="Updates" component={Update} />
      {/* <BottomTab.Screen name="My Order" component={AllOrdersScreen} /> */}
      <BottomTab.Screen name="Communities" component={Cart} />
      <BottomTab.Screen name="Calls" component={User} />
    </BottomTab.Navigator>
  );
}
