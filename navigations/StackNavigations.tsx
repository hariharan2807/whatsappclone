import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { HomeScreen, UpdatesScreen } from '../screens';


// const StackConfig = {headerShown: false, animation: 'none'};

const HomeStack = createNativeStackNavigator();
const SearchStack = createNativeStackNavigator();
const CartStack = createNativeStackNavigator();
const UserStack = createNativeStackNavigator();
const AuthStack = createNativeStackNavigator();
const PickUpStack = createNativeStackNavigator();
const PreOrderStack = createNativeStackNavigator();

export function Home(props: any) {
  return (
    <HomeStack.Navigator screenOptions={{headerShown:false,animation:"none"}}>
      <HomeStack.Screen name="HomeScreen" component={HomeScreen} />
     
    </HomeStack.Navigator>
  );
}
export function Update(props: any) {
  return (
    <PreOrderStack.Navigator screenOptions={{headerShown:false,animation:"none"}}>
      <PreOrderStack.Screen name="UpdatesScreen" component={UpdatesScreen} />
</PreOrderStack.Navigator>
  );
}
export function Cart(props: any) {
  return (
    <CartStack.Navigator screenOptions={{headerShown:false,animation:"none"}}>
      <CartStack.Screen name="HomeScreen" component={HomeScreen}  />
   </CartStack.Navigator>
  );
}
export function User(props: any) {
  return (
    <UserStack.Navigator
      initialRouteName="HomeScreen"
      screenOptions={{headerShown:false,animation:"none"}}>
      <UserStack.Screen
       name="HomeScreen" component={HomeScreen} 
      />
     
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
