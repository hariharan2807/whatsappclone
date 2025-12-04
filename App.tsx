/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { NewAppScreen } from '@react-native/new-app-screen';
import {
  Alert,
  Dimensions,
  Image,
  Linking,
  Platform,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
} from 'react-native';
import {
  SafeAreaProvider,
  useSafeAreaInsets,
  SafeAreaView,
} from 'react-native-safe-area-context';
import React from 'react';
import { SafeAreaView as RNSafeAreaView } from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';

// import QRCodeScanner from 'react-native-qrcode-scanner';
// import { RNCamera } from 'react-native-camera';
// import { check, PERMISSIONS, RESULTS, request } from 'react-native-permissions';
import { useEffect, useState } from 'react';
import { useCameraDevices, Camera } from 'react-native-vision-camera';
import QRScanner from './QRScanner';
import tailwind from './tailwind';
import RootNavigation from './navigations/RootNavigation';
// import { useScanBarcodes, BarcodeFormat } from 'vision-camera-code-scanner';
const dWidth = Dimensions.get('window').width;

const clr1 = 'mediumseagreen';
function App() {
  const isDarkMode = useColorScheme() === 'dark';
  const [showQR, setShowQR] = useState(false);
  const [qrCode, setQrCode] = useState('');

  const openQRscanner = () => {
    setShowQR(true);
  };

  const onQrRead = qrtext => {
    console.log('qrtextqrtextqrtextqrtext', qrtext);
    setQrCode(qrtext);
    setShowQR(false);
    // setTimeout(()=>{
    // setQrCode('');

    // })
  };
  return (
    <>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={
          Platform.OS === 'android'
            ? isDarkMode
              ? 'black'
              : 'white'
            : 'transparent'
        }
        translucent={Platform.OS === 'android' ? false : true}
      />
     {Platform.OS === 'android' ? (
                <GestureHandlerRootView style={{flex: 1}}>
                  {/* <SafeAreaView style={{flex: 0, backgroundColor: '#49A600'}} /> */}
                  <SafeAreaView style={{flex: 1}}>
                    <RootNavigation />
                  </SafeAreaView>
                </GestureHandlerRootView>
            ) : (
                <GestureHandlerRootView style={{flex: 1}}>
                  {/* <SafeAreaView style={{flex: 0, backgroundColor: '#49A600'}} /> */}
                  <RNSafeAreaView style={{flex: 1}}>
                    <RootNavigation />
                  </RNSafeAreaView>
                </GestureHandlerRootView>
            )}
    </>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  btn: {
    backgroundColor: 'transparent',
    alignItems: 'center',
    borderRadius: 10,
    paddingVertical: '3%',
    width: '50%',
    borderWidth: 2,
    borderColor: clr1,
  },
  btnText: {
    color: clr1,
  },
});

export default App;
