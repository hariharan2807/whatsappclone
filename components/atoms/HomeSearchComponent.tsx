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

export default function HomeSearchComponent() {
  const Color = useColorScheme();

  return (
    <View style={[tailwind(' mx-4 mt-3 my-3 items-center')]}>
      <TouchableOpacity
        style={[
          tailwind('flex-row px-5 py-2 w-full rounded-full items-center'),
          { backgroundColor: Color === 'dark' ? '#23282c' : '#f6f5f3' },
        ]}
      >
        <Image
          source={assets_manifest?.search}
          style={[tailwind(''), { height: 17, width: 17 }]}
          tintColor={Color === 'dark' ? '#8d9296' : '#63676a'}
        />
        <Text
          style={[
            tailwind('font-15 ml-3'),
            { color: Color === 'dark' ? '#8d9296' : '#63676a' },
          ]}
        >
          Ask Meta AI or Search
        </Text>
      </TouchableOpacity>
    </View>
  );
}
