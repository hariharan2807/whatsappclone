// import analytics from '@react-native-firebase/analytics';
import tailwind from '@tailwind';
import React, { useEffect, useState } from 'react';
import { Image, Keyboard, Text, TouchableOpacity, View } from 'react-native';
// import {useSelector} from 'react-redux';
import {
  Bag,
  BagColor,
  Home,
  HomeColor,
  MyOrderColorIcon,
  MyOrderIcon,
  PreOrder,
  PreOrder1,
  Profile,
  ProfileColor,
  SearchBottom,
  SearchBottomColor,
} from '../../assets/index';
import { useColorScheme } from 'react-native';
export default function CustomBottomTab({
  state,
  descriptors,
  navigation,
}: any) {
  const [showTab, setShowTab] = useState(true);
  useEffect(() => {
    let show = Keyboard.addListener('keyboardDidShow', () => {
      setShowTab(false);
    });
    let close = Keyboard.addListener('keyboardDidHide', () => {
      setShowTab(true);
    });
    return () => {
      show.remove();
      close.remove();
    };
  }, []);

  const focusedOptions = descriptors[state.routes[state.index].key].options;
  const colorScheme = useColorScheme(); // Returns 'light', 'dark', or null

  // if (focusedOptions.tabBarVisible === false) {
  //     return null;
  // }
  if (showTab === false) {
    return null;
  }

  return (
    <View
      style={[
        tailwind('flex flex-row  items-center'),
        { backgroundColor: colorScheme === 'dark' ? '#000' : '#fff' },
      ]}
    >
      {state.routes.map((route: any, index: number) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;
        const isFocused = state.index === index;

        const onPress = async () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });
          // if (route?.name == 'Home') {
          //   await analytics().logEvent('click_homemenu');
          // }
          // if (route?.name == 'Search') {
          //   await analytics().logEvent('click_searchmenu');
          // }
          // if (route?.name == 'Cart') {
          //   await analytics().logEvent('click_cartmenu');
          // }
          // if (route?.name == 'Account') {
          //   await analytics().logEvent('click_accountmenu');
          // }
          // console.log(route);
          if (!isFocused && !event.defaultPrevented) {
            try {
              if (route.name == 'Account') {
                navigation.openDrawer();
              } else {
                navigation.navigate(route.state.routeNames[0]);
              }
            } catch {
              navigation.navigate(route.name);
            }
          }
        };

        return (
          <TouchableOpacity
            activeOpacity={0.9}
            key={index}
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            style={{ flex: 1 }}
          >
            <View style={tailwind('flex items-center my-2')}>
              {/* {index === 3 && CartState?.length > 0 ? (
                <View
                  style={[
                    tailwind(
                      'flex absolute bg-primary rounded-full items-center justify-center  items-center flex-row',
                    ),
                    {
                      right: 20,
                      bottom: 36,
                      zIndex: 999,
                      height: 16,
                      width: 16,
                    },
                  ]}>
                  <Text
                    style={[
                      tailwind('font-regular font-10  text-center'),
                      {color: 'white'},
                    ]}>
                    {CartState?.length}
                  </Text>
                </View>
              ) : null} */}
              <View
                style={[
                  tailwind('px-5 py-2 '),
                  {
                    backgroundColor: isFocused
                      ? `${colorScheme === 'dark' ? '#103629' : '#d8fdd2'}`
                      : '',
                    borderRadius: isFocused ? 50 : 0,
                  },
                ]}
              >
                {index === 0 ? (
                  isFocused ? (
                    <Image
                      source={require('../../assets/image/speechbubble.png')}
                      style={[tailwind(''), { height: 20, width: 20 }]}
                      tintColor={colorScheme === 'dark' ? '#b9debc' : '#103629'}
                    />
                  ) : (
                    // <HomeColor />
                    <Image
                      source={require('../../assets/image/speechbubble.png')}
                      style={[tailwind(''), { height: 20, width: 20 }]}
                      tintColor={colorScheme === 'dark' ? '#fff' : '#000'}
                    />
                  )
                ) : index === 1 ? (
                  isFocused ? (
                    <Image
                      source={require('../../assets/image/updates.png')}
                      style={[tailwind(''), { height: 20, width: 20 }]}
                      tintColor={colorScheme === 'dark' ? '#b9debc' : '#103629'}
                    />
                  ) : (
                    <Image
                      source={require('../../assets/image/updates.png')}
                      style={[tailwind(''), { height: 20, width: 20 }]}
                      tintColor={colorScheme === 'dark' ? '#fff' : '#000'}
                    />
                  )
                ) : index === 2 ? (
                  isFocused ? (
                    <Image
                      source={require('../../assets/image/group.png')}
                      style={[tailwind(''), { height: 20, width: 20 }]}
                      tintColor={colorScheme === 'dark' ? '#b9debc' : '#103629'}
                    />
                  ) : (
                    <Image
                      source={require('../../assets/image/group.png')}
                      style={[tailwind(''), { height: 20, width: 20 }]}
                      tintColor={colorScheme === 'dark' ? '#fff' : '#000'}
                    />
                  )
                ) : isFocused ? (
                  <Image
                    source={require('../../assets/image/call.png')}
                    style={[tailwind(''), { height: 20, width: 20 }]}
                    tintColor={colorScheme === 'dark' ? '#b9debc' : '#103629'}
                  />
                ) : (
                  <Image
                    source={require('../../assets/image/call.png')}
                    style={[tailwind(''), { height: 20, width: 20 }]}
                    tintColor={colorScheme === 'dark' ? '#fff' : '#000'}
                  />
                )}
              </View>

              <Text
                style={[
                  tailwind(
                    `text-white font-13 py-1.5  ${
                      isFocused ? 'font-bold' : 'font-regular'
                    }`,
                  ),
                  {
                    color: `${colorScheme === 'dark' ? '#fff' : '#000'}`,
                    textTransform: 'capitalize',
                  },
                ]}
              >
                {label}
              </Text>
            </View>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}
