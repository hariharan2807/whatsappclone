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

export default function HomeTopList(props: any) {
  const colorScheme = useColorScheme();
  const isSelected = props.value?.name === props.i?.name; // Check if this item is selected
  const getUnreadCount = () => {
    if (props.i?.name === 'Unread' && props.UserList) {
      // Count users with status === 4 OR unread > 0
      const unreadCount = props.UserList.filter(
        user => user.status === 4 || user.unread > 0
      ).length;
      return unreadCount;
    }
    return 0;
  };

  const unreadCount = getUnreadCount();  return (
    <TouchableOpacity
      onPress={() => {
        props?.setValue(props?.i);
        props?.setSearchText('')
      }}
      style={[
        tailwind('ml-3 px-1 my-1 rounded-full items-center '),
        {
          backgroundColor: isSelected
            ? colorScheme === 'light'
              ? '#b9debc'
              : '#103629' // Selected color
            : colorScheme === 'dark'
            ? '#333333'
            : '#ffffff', // Not selected color
          borderColor: colorScheme === 'light' ? 'silver' : 'gray',
          borderWidth: 0.5,
        },
      ]}
      key={props?.index}
    >
      <Text
        style={[
          tailwind('px-3 py-1 font-12'),
          {
            color: isSelected
              ? colorScheme === 'light'
                ? '#0a3629'
                : '#dffde3' // Selected text color
              : colorScheme === 'dark'
              ? '#8d9296'
              : 'gray', // Not selected text color
          },
        ]}
      >
        {props?.i?.name} {props?.i?.name =='Unread' && unreadCount} 
      </Text>
    </TouchableOpacity>
  );
}
