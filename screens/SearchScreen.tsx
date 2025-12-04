import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  useColorScheme,
  Image,
  FlatList,
  Dimensions,
} from 'react-native';
import tailwind from '@tailwind';
import assets_manifest from '@assets';
import { BackIcon } from '../assets/index';
import { useNavigation } from '@react-navigation/native';
const { width } = Dimensions.get('window');
const ITEM_WIDTH = (width - 32) / 3; // 32 = margin horizontal (16*2)
export default function SearchScreen() {
  const Color = useColorScheme();
  const navigation = useNavigation();
  const [searchText, setSearchText] = useState('');

  const DataValue = [
    'data',
    'data',
    'hari',
    'haran',
    'sri hari',
    'tamil',
    'vignesh',
    'mental',
    'vinoth',
    'gopi',
    'boopathi',
    'yogi',
    'karthi',
    'kumaresh',
    'ak',
    'siva',
    'imran',
    'ravi',
  ];
  const groupDataIntoRows = (data: string[], itemsPerRow: number) => {
    const rows = [];
    for (let i = 0; i < data.length; i += itemsPerRow) {
      rows.push(data.slice(i, i + itemsPerRow));
    }
    return rows;
  };

  const rowData = groupDataIntoRows(DataValue, 3);

  // Filter data based on search
  const filteredData = searchText
    ? DataValue.filter(item =>
        item.toLowerCase().includes(searchText.toLowerCase()),
      )
    : DataValue;

  const filteredRowData = groupDataIntoRows(filteredData, 3);

  // Render each row with 3 items
  const renderRow = ({ item: rowItems }: { item: string[] }) => (
    <View style={tailwind('flex-row justify-between mb-3')}>
      {rowItems.map((item, index) => (
        <TouchableOpacity
          key={index}
          style={[
            tailwind('items-center justify-center rounded-lg p-3'),
            {
              width: ITEM_WIDTH,
              backgroundColor: Color === 'dark' ? '#23282c' : '#f6f5f3',
            },
          ]}
          onPress={() => console.log('Selected:', item)}
        >
          <Text
            style={[
              tailwind('text-center font-medium'),
              { color: Color === 'dark' ? '#f6f5f3' : '#23282c' },
            ]}
          >
            {item}
          </Text>
        </TouchableOpacity>
      ))}
      {/* Add empty views if row has less than 3 items */}
      {rowItems.length < 3 &&
        Array(3 - rowItems.length)
          .fill(null)
          .map((_, index) => (
            <View key={`empty-${index}`} style={{ width: ITEM_WIDTH }} />
          ))}
    </View>
  );
  const renderGridItem = ({ item }: { item: string }) => (
    <TouchableOpacity
      style={[
        tailwind('items-center justify-center m-1 rounded-lg p-3'),
        {
          width: ITEM_WIDTH,
          backgroundColor: Color === 'dark' ? '#23282c' : '#f6f5f3',
        },
      ]}
      onPress={() => console.log('Selected:', item)}
    >
      <Text
        style={[
          tailwind('text-center font-medium'),
          { color: Color === 'dark' ? '#f6f5f3' : '#23282c' },
        ]}
      >
        {item}
      </Text>
    </TouchableOpacity>
  );
  return (
    <View
      style={[
        tailwind('h-full'),
        { backgroundColor: Color === 'dark' ? 'black' : 'white' },
      ]}
    >
      <View style={[tailwind('mx-3 my-3'), {}]}>
        <View
          style={[
            tailwind('flex-row px-5 py-2 w-full rounded-full items-center'),
            { backgroundColor: Color === 'dark' ? '#23282c' : '#f6f5f3' },
          ]}
        >
          <TouchableOpacity
            onPress={() => {
              navigation.goBack();
            }}
          >
            <BackIcon color={Color === 'light' ? '#23282c' : '#f6f5f3'} />
          </TouchableOpacity>
          <Text
            style={[
              tailwind('font-15 ml-3'),
              { color: Color === 'dark' ? '#8d9296' : '#63676a' },
            ]}
          >
            Ask Meta AI or Search
          </Text>
        </View>
        <FlatList
          data={filteredData}
          renderItem={renderGridItem}
          keyExtractor={(item, index) => index.toString()}
          numColumns={3}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={tailwind('pb-4')}
          columnWrapperStyle={tailwind('justify-between')}
        />
      </View>
    </View>
  );
}
