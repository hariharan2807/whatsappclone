/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable @typescript-eslint/no-unused-vars */

import { AccountDetailsComp } from '@components';
import tailwind from '@tailwind';
import React from 'react';
import {
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions
} from 'react-native';
import {DrawerActions, useNavigation} from '@react-navigation/native';

//import {BellIcon, MsgIcon} from '../assets/icons';
//import Icon from 'react-native-vector-icons/Ionicons';
const log = console.log;
export default function CustomDrawer() {
  const navigation = useNavigation();
  const {height,width}=useWindowDimensions();
  return (
    <TouchableOpacity activeOpacity={1} onPress={()=>{
      navigation.dispatch(DrawerActions.closeDrawer());
    }}>
   <View style={[tailwind('rounded-tl-half  rounded-bl-3xl h-full bg-white self-end'),{width:width/1.3}]}>
      <View style={[tailwind('px-3  py-4 ')]}>
        <View style={[tailwind('items-end ')]}>
          <Text style={[tailwind('font-bold font-18 text-black'), {}]}>
           Account
          </Text>
        </View>
        <AccountDetailsComp/>
      </View>
    </View>
    </TouchableOpacity>
 
  );
}
