import React from 'react';
import {
  View,
  Text,
  Image,
  useColorScheme,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import tailwind from '@tailwind';
import assets_manifest from '@assets';
import { useNavigation } from '@react-navigation/native';

export default function HomeSearchComponent({
  onSearch,
  searchText,
  setSearchText,
}) {
  const Color = useColorScheme();
  const navigation = useNavigation();

  const handleTextChange = text => {
    // Update local state in parent component
    setSearchText(text);
    // Call parent's search function
    if (onSearch) {
      onSearch(text);
    }
  };

  const clearSearch = () => {
    setSearchText('');
    if (onSearch) {
      onSearch('');
    }
  };

  return (
    <View style={[tailwind('mx-4 mt-3 my-3 items-center')]}>
      <View
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
        <TextInput
          style={[
            tailwind('font-15 ml-3 flex-1'),
            { color: Color === 'dark' ? '#8d9296' : '#63676a' },
          ]}
          placeholder="Ask Meta AI or Search"
          placeholderTextColor={Color === 'dark' ? '#8d9296' : '#63676a'}
          value={searchText}
          onChangeText={handleTextChange}
          autoCapitalize="none"
          autoCorrect={false}
          onFocus={() => {
          }}
        />
        {searchText && searchText.length > 0 && (
          <TouchableOpacity onPress={clearSearch} style={tailwind('ml-2')}>
            <Text
              style={{
                fontSize: 18,
                color: Color === 'dark' ? '#8d9296' : '#63676a',
              }}
            >
              ×
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}
