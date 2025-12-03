import tailwind from '@tailwind';
import React from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';
//@ts-ignore
import {useNavigation} from '@react-navigation/native';
import {BackIcon, LeftArrowIcon} from '../../assets/icons';
import assets_manifest from '@assets';
import {useSelector} from 'react-redux';

interface Props {
  text: string;
  type: number;
}

export default function TopBar(props: Props) {
  const navigation = useNavigation();
  const CartState = useSelector(state => state.user.cart);

  function goBack() {
    navigation.goBack();
  }
  let isPreOrderMatch = false;

  // Check if any item in the CartState matches the props.pre_order_status
  CartState.forEach(item => {
    if (item.preOrderStatus == 1) {
      isPreOrderMatch = true; // Set flag to true if a match is found
    }
  });
  // console.log('isPreOrderMatch--------->', isPreOrderMatch);
  if (props.type == 1) {
    return (
      <View
        style={[
          tailwind(
            'flex flex-row bg-white  items-center  p-3 border-b border-gray-300',
          ),
        ]}>
        {navigation.canGoBack() ? (
          // <TouchableOpacity onPress={goBack}>
          //   <LeftArrowIcon/>
          // </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              if (isPreOrderMatch) {
                navigation.navigate('Pre Order');
              } else {
                navigation.navigate('Home');
              }
            }}
            activeOpacity={0.9}>
            {/* <Image
              source={assets_manifest?.Backarrow}
              style={[tailwind(''), {width: 20, height: 20}]}
            /> */}
            <BackIcon />
            {/* <Icon name="arrow-back-outline" size={25} color="gray" /> */}
          </TouchableOpacity>
        ) : null}

        <Text style={[tailwind('ml-5 font-semibold text-black font-16')]}>
          {props.text}
        </Text>
      </View>
    );
  }
  if (props.type == 2) {
    return (
      <View
        style={[
          tailwind(
            'flex flex-row  bg-white justify-between items-center  p-3 border-b border-gray-300',
          ),
        ]}>
        {/* <TouchableOpacity onPress={()=>navigation?.goBack()}>
             <LeftArrowIcon/>
          </TouchableOpacity> */}
        <TouchableOpacity
          onPress={() => navigation?.goBack()}
          activeOpacity={0.9}>
          {/* <Image
            source={assets_manifest?.Backarrow}
            style={[tailwind(''), {width: 20, height: 20}]}
          /> */}
          <BackIcon />

          {/* <Icon name="arrow-back-outline" size={25} color="gray" /> */}
        </TouchableOpacity>

        <Text style={[tailwind('ml-5 font-semibold text-black font-16')]}>
          {props.text}
        </Text>
      </View>
    );
  } else {
    return (
      <View
        style={[
          tailwind('flex flex-row justify-between  items-center  p-3 bg-white'),
        ]}>
        {navigation.canGoBack() ? (
          // <TouchableOpacity onPress={goBack}>
          //   <LeftArrowIcon/>
          // </TouchableOpacity>
          <TouchableOpacity onPress={goBack} activeOpacity={0.9}>
            {/* <Image
              source={assets_manifest?.Backarrow}
              style={[tailwind(''), {width: 20, height: 20}]}
            /> */}
            <BackIcon />

            {/* <Icon name="arrow-back-outline" size={25} color="gray" /> */}
          </TouchableOpacity>
        ) : null}

        <Text style={[tailwind('font-semibold text-black font-16')]}>
          {props.text}
        </Text>
      </View>
    );
  }
}
