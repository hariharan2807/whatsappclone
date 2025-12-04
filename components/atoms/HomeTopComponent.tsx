import {
  View,
  Text,
  Image,
  useColorScheme,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import tailwind from '@tailwind';
import assets_manifest from '@assets';
import { useNavigation } from '@react-navigation/native';

export default function HomeTopComponent() {
  const Color = useColorScheme();
const navigation =useNavigation();
  return (
    <View style={[tailwind('flex-row mx-4 mt-3 items-center')]}>
      <View style={[tailwind(''), { width: '70%' }]}>
        <Text
          style={[
            tailwind('font-20 font-bold'),
            { color: Color === 'dark' ? 'white' : 'green' },
          ]}
        >
          WhatsApp{' '}
        </Text>
      </View>
      <View
        style={[
          tailwind('flex-row items-center'),
          { width: '30%', justifyContent: 'space-between' },
        ]}
      >
        <TouchableOpacity onPress={()=>{
          navigation?.navigate('QrScreen')
        }}>
          <Image
            source={assets_manifest?.qrcode}
            style={[tailwind(''), { height: 22, width: 22 }]}
            tintColor={Color === 'dark' ? 'white' : 'black'}
          />
        </TouchableOpacity>
        <TouchableOpacity>
          <Image
            source={assets_manifest?.camera}
            style={[tailwind(''), { height: 20, width: 20 }]}
            tintColor={Color === 'dark' ? 'white' : 'black'}
          />
        </TouchableOpacity>
        <TouchableOpacity>
          <Image
            source={assets_manifest?.more}
            style={[tailwind(''), { height: 15, width: 15 }]}
            tintColor={Color === 'dark' ? 'white' : 'black'}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}
