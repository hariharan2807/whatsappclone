import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import {
  CallScreen,
  CommunitiesScreen,
  HomeScreen,
  SearchScreen,
  UpdatesScreen,
} from '../screens';

// const StackConfig = {headerShown: false, animation: 'none'};

const HomeStack = createNativeStackNavigator();
const SearchStack = createNativeStackNavigator();
const CartStack = createNativeStackNavigator();
const UserStack = createNativeStackNavigator();
const AuthStack = createNativeStackNavigator();
const PickUpStack = createNativeStackNavigator();
const PreOrderStack = createNativeStackNavigator();

export function Chats(props: any) {
  return (
    <HomeStack.Navigator
      screenOptions={{ headerShown: false, animation: 'none' }}
      // initialRouteName="HomeScreen"
    >
      <HomeStack.Screen name="HomeScreen" component={HomeScreen} />
      {/* <HomeStack.Screen name="SearchScreen" component={SearchScreen} /> */}
    </HomeStack.Navigator>
  );
}
export function Update(props: any) {
  return (
    <PreOrderStack.Navigator
      screenOptions={{ headerShown: false, animation: 'none' }}
      initialRouteName="UpdatesScreen"
    >
      <PreOrderStack.Screen name="UpdatesScreen" component={UpdatesScreen} />
    </PreOrderStack.Navigator>
  );
}
export function Communities(props: any) {
  return (
    <CartStack.Navigator
      screenOptions={{ headerShown: false, animation: 'none' }}
      initialRouteName="CommunitiesScreen"
    >
      <CartStack.Screen
        name="CommunitiesScreen"
        component={CommunitiesScreen}
      />
    </CartStack.Navigator>
  );
}
export function Call(props: any) {
  return (
    <UserStack.Navigator
      initialRouteName="CallScreen"
      screenOptions={{ headerShown: false, animation: 'none' }}
    >
      <UserStack.Screen name="CallScreen" component={CallScreen} />
    </UserStack.Navigator>
  );
}

// export function Auth(props: any) {
//   return (
//     <AuthStack.Navigator
//       initialRouteName="SigninScreen"
//       screenOptions={{headerShown:false,animation:"none"}}>
//         <AuthStack.Screen name='SigninScreen' component={SigninScreen}/>
//       <AuthStack.Screen name="LoginScreen" component={LoginScreen} />
//     </AuthStack.Navigator>
//   );
// }
// export function PickAnddrop(props: any) {
//   return (
//     <PickUpStack.Navigator screenOptions={{headerShown:false,animation:"none"}}>
//       <PickUpStack.Screen
//         name="PickAndDropScreen"
//         component={PickAndDropScreen}
//       />
//       <PickUpStack.Screen
//         name="AddAddressScreen"
//         component={AddAddressScreen}
//       />
//       <PickUpStack.Screen
//         name="PickupCustomizationScreen"
//         component={PickupCustomizationScreen}
//       />
//       <PickUpStack.Screen
//         name="PickupCheckoutScreen"
//         component={PickupCheckoutScreen}
//       />
//     </PickUpStack.Navigator>
//   );
// }
