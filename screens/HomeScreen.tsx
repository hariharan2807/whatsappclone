import React, { useState } from 'react';
import tailwind from '@tailwind';
import {
  FlatList,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  HomeSearchComponent,
  HomeTopComponent,
  HomeTopList,
} from '@components';
import { useColorScheme } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import assets_manifest from '@assets';

export default function HomeScreen() {
  const Color = useColorScheme();
  const List = [
    { name: 'All', id: 0 },
    { name: 'Unread', id: 1 },
    { name: 'Favorites', id: 2 },
    { name: 'Groups', id: 3 },
  ];
  const [value, setValue] = useState(List?.[0]);
  const UserList = [
    {
      id: 1,
      name: 'Gtech Adthil',
      profile_img:
        'https://images.ctfassets.net/h6goo9gw1hh6/2sNZtFAWOdP1lmQ33VwRN3/24e953b920a9cd0ff2e1d587742a2472/1-intro-photo-final.jpg?w=1200&h=992&fl=progressive&q=70&fm=jpg',
      message: 'Hello there!',
      time: '10:30 AM',
      status: 3, // 0 = sent, 1 = delivered, 2 = read
      unread: 3,
      isfav: 0,
      group: 0,
    },
    {
      id: 2,
      name: 'John Doe',
      profile_img: 'https://randomuser.me/api/portraits/men/32.jpg',
      message: 'See you tomorrow!',
      time: 'Yesterday',
      status: 1, // Delivered
      unread: 0,
      isfav: 0,
      group: 0,
    },
    {
      id: 3,
      name: 'Jane Smith',
      profile_img: 'https://randomuser.me/api/portraits/women/44.jpg',
      message: 'Thanks for the help!',
      time: '10:22 AM',
      status: 2, // Read
      unread: 0,
      isfav: 0,
      group: 0,
    },
    {
      id: 4,
      name: 'Robert Johnson',
      profile_img: 'https://randomuser.me/api/portraits/men/67.jpg',
      message: 'Where are you?',
      time: 'Monday',
      status: 4, // Sent
      unread: 1,
      isfav: 0,
      group: 0,
    },
    {
      id: 5,
      name: 'Sarah Williams',
      profile_img: 'https://randomuser.me/api/portraits/women/68.jpg',
      message: 'Okay, got it.',
      time: 'Sunday',
      status: 2, // Read
      unread: 0,
      isfav: 0,
      group: 0,
    },
    {
      id: 6,
      name: 'G Tech Solutions',
      profile_img:
        'https://i.pinimg.com/736x/45/a7/84/45a7849619b234b69d27ec48768ddeff.jpg',
      message: 'hari : Okay Sir.',
      time: 'Wednesday',
      status: 4, // Read
      unread: 3,
      isfav: 0,
      group: 1,
    },
  ];
  const renderContent = () => {
    switch (value?.id) {
      case 0:
        return (
          <View
            style={[
              tailwind('flex-1 p-4 '),
              { backgroundColor: Color === 'dark' ? 'black' : 'white' },
            ]}
          >
            <FlatList
              data={UserList}
              renderItem={renderUserItem}
              keyExtractor={item => item.id}
              showsVerticalScrollIndicator={false}
            />
            {/* Your all items content */}
          </View>
        );
      case 1:
        return (
          <View
            style={[
              tailwind('flex-1 p-4 '),
              { backgroundColor: Color === 'dark' ? 'black' : 'white' },
            ]}
          >
            <FlatList
              data={UserList.filter(user => user.unread !== 0)}
              renderItem={renderUserItem}
              keyExtractor={item => item.id}
              showsVerticalScrollIndicator={false}
            />
            {/* Your all items content */}
          </View>
        );
      case 2:
        return (
          <View
            style={[
              tailwind('flex-1 p-4 '),
              { backgroundColor: Color === 'dark' ? 'black' : 'white' },
            ]}
          >
            <FlatList
              data={UserList.filter(user => user.isfav === 1)}
              renderItem={renderUserItem}
              keyExtractor={item => item.id}
              showsVerticalScrollIndicator={false}
              ListEmptyComponent={
                <View
                  style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: 400, // Or whatever height you prefer
                  }}
                >
                  <Image
                    style={{ height: 90, width: 90, marginBottom: 20 }}
                    resizeMode="contain"
                    source={assets_manifest?.fav}
                    tintColor={'#b9debc'}
                  />
                  <Text
                    style={{
                      color: Color === 'dark' ? 'white' : 'black',
                      fontSize: 16,
                      textAlign: 'center',
                      marginTop: 10,
                      fontWeight: 'bold',
                    }}
                  >
                    Add to your Favourites List
                  </Text>
                  <Text
                    style={{
                      color: Color === 'dark' ? 'white' : 'black',
                      fontSize: 13,
                      textAlign: 'center',
                      marginTop: 10,
                      fontWeight: '600',
                    }}
                  >
                    See your favourites in both Chats and Calls. Add as
                  </Text>
                  <Text
                    style={{
                      color: Color === 'dark' ? 'white' : 'black',
                      fontSize: 13,
                      textAlign: 'center',
                      marginTop: 10,
                      fontWeight: '600',
                    }}
                  >
                    many people or groups as you want
                  </Text>
                </View>
              }
            />
            {/* Your all items content */}
          </View>
        );
      case 3:
        return (
          <View
            style={[
              tailwind('flex-1 p-4 '),
              { backgroundColor: Color === 'dark' ? 'black' : 'white' },
            ]}
          >
            <FlatList
              data={UserList.filter(user => user.group === 1)}
              renderItem={renderUserItem}
              keyExtractor={item => item.id}
              showsVerticalScrollIndicator={false}
            />
            {/* Your all items content */}
          </View>
        );
      default:
        return (
          <View style={tailwind('flex-1 p-4')}>
            <Text>Select a category</Text>
          </View>
        );
    }
  };
  const renderStatusIcon = status => {
    switch (status) {
      case 0: // Sent - single gray tick
        return <Ionicons name="checkmark" size={16} color="#888" />;
      case 1: // Delivered - double gray tick
        return (
          <View
            style={{
              flexDirection: 'row',
              position: 'relative',
              width: 20,
              height: 16,
            }}
          >
            <Ionicons
              name="checkmark"
              size={16}
              color="#888"
              style={{ position: 'absolute', left: 0 }}
            />
            <Ionicons
              name="checkmark"
              size={16}
              color="#888"
              style={{ position: 'absolute', left: 8 }}
            />
          </View>
        );
      case 2: // Read - double blue tick
        return (
          <View
            style={{
              flexDirection: 'row',
              position: 'relative',
              width: 20,
              height: 16,
            }}
          >
            <Ionicons
              name="checkmark"
              size={16}
              color="#4FC3F7"
              style={{ position: 'absolute', left: 0 }}
            />
            <Ionicons
              name="checkmark"
              size={16}
              color="#4FC3F7"
              style={{ position: 'absolute', left: 8 }}
            />
          </View>
        );
      default:
        return null;
    }
  };
  const renderUserItem = ({ item, index }) => (
    <TouchableOpacity
      key={index}
      style={{
        flexDirection: 'row',
        // padding: 10,
        paddingVertical: 10,
        // borderBottomWidth: 0.5,
        // borderBottomColor: '#E0E0E0',
        backgroundColor: Color === 'dark' ? 'black' : 'white',
      }}
      activeOpacity={0.7}
    >
      {/* Profile Image with Online Status */}
      <View style={{ position: 'relative', marginRight: 12 }}>
        <Image
          source={{ uri: item.profile_img }}
          style={{
            width: 45,
            height: 45,
            borderRadius: 55 / 2,
            backgroundColor: '#E0E0E0',
          }}
        />
        {/* Online indicator (optional) */}
        {item.online && (
          <View
            style={{
              position: 'absolute',
              bottom: 2,
              right: 2,
              width: 14,
              height: 14,
              borderRadius: 7,
              backgroundColor: '#4CAF50',
              borderWidth: 2,
              borderColor: '#FFF',
            }}
          />
        )}
      </View>

      {/* User Info */}
      <View style={{ flex: 1, justifyContent: 'center' }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: 4,
          }}
        >
          <Text
            style={{
              fontSize: 12,
              fontWeight: '600',
              color: Color === 'dark' ? 'white' : 'black',
              flex: 1,
              marginRight: 8,
            }}
            numberOfLines={1}
          >
            {item.name}
          </Text>
          <Text
            style={{ fontSize: 10, color: Color === 'dark' ? 'white' : '#888' }}
          >
            {item.time}
          </Text>
        </View>

        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          {renderStatusIcon(item.status)}
          <Text
            style={[
              {
                fontSize: 12,
                color: Color === 'dark' ? 'white' : '#888',
                marginLeft: 4,
                flex: 1,
              },
              item.unread > 0 && {
                color: Color === 'dark' ? 'white' : '#000',
                fontWeight: '500',
              },
            ]}
            numberOfLines={1}
          >
            {item.message}
          </Text>
          {item.unread > 0 && (
            <View
              style={{
                backgroundColor: '#25D366',
                borderRadius: 15,
                minWidth: 15,
                height: 15,
                justifyContent: 'center',
                alignItems: 'center',
                marginLeft: 4,
              }}
            >
              <Text
                style={{
                  color: Color === 'dark' ? 'white' : 'black',
                  fontSize: 10,
                  fontWeight: '600',
                  paddingHorizontal: 3,
                }}
              >
                {item.unread}
              </Text>
            </View>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
  return (
    <View
      style={[
        tailwind('h-full '),
        { backgroundColor: Color === 'dark' ? 'black' : 'white' },
      ]}
    >
      <HomeTopComponent />
      <HomeSearchComponent />
      <View style={[tailwind('flex-row')]}>
        {List?.map((i: any, index: any) => {
          return (
            <View key={index}>
              <HomeTopList
                i={i}
                setValue={setValue}
                value={value}
                UserList={UserList}
              />
            </View>
          );
        })}
      </View>
      {/* <ScrollView style={tailwind('h-full')}> */}
      {renderContent()}

      {/* </ScrollView> */}
    </View>
  );
}
