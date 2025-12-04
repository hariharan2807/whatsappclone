import React from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  useColorScheme,
  Linking,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

// Dummy data array for calls - WhatsApp style
const callsData = [
  {
    id: '1',
    name: 'Gtech Srihari',
    type: 'outgoing', // outgoing, incoming, missed
    time: '10:52 am',
    date: '28 November',
    dateGroup: '28 November',
    isVideo: false,
    multiple: false,
  },
  {
    id: '2',
    name: 'Udanpirappu (2)',
    type: 'incoming',
    time: '10:51 am',
    date: '28 November',
    dateGroup: '28 November',
    isVideo: false,
    multiple: true,
  },
  {
    id: '3',
    name: 'Gtech Srihari',
    type: 'outgoing',
    time: '9:34 am',
    date: '28 November',
    dateGroup: '28 November',
    isVideo: false,
    multiple: false,
  },
  {
    id: '4',
    name: 'Gtech Adatikalam',
    type: 'incoming',
    time: '9:24 am',
    date: '28 November',
    dateGroup: '28 November',
    isVideo: false,
    multiple: false,
  },
  {
    id: '5',
    name: 'Gtech Srihari',
    type: 'outgoing',
    time: '9:44 am',
    date: '28 November',
    dateGroup: '28 November',
    isVideo: false,
    multiple: false,
  },
  {
    id: '6',
    name: 'Gtech Adatikalam',
    type: 'incoming',
    time: '8:09 am',
    date: '28 November',
    dateGroup: '28 November',
    isVideo: false,
    multiple: false,
  },
  {
    id: '7',
    name: 'Gtech Tamizh',
    type: 'incoming',
    time: '8:08 am',
    date: '28 November',
    dateGroup: '28 November',
    isVideo: false,
    multiple: false,
  },
  {
    id: '8',
    name: 'Gtech Vinoth',
    type: 'incoming',
    time: '8:07 am',
    date: '28 November',
    dateGroup: '28 November',
    isVideo: false,
    multiple: false,
  },
  {
    id: '9',
    name: 'Raju Bai (2)',
    type: 'missed',
    time: '8:55 pm',
    date: '27 November',
    dateGroup: '27 November',
    isVideo: false,
    multiple: true,
  },
  {
    id: '10',
    name: 'Raju Bai',
    type: 'missed',
    time: '6:22 pm',
    date: '27 November',
    dateGroup: '27 November',
    isVideo: false,
    multiple: false,
  },
  {
    id: '11',
    name: 'Mathajit',
    type: 'outgoing',
    time: '4:49 pm',
    date: '27 November',
    dateGroup: '27 November',
    isVideo: false,
    multiple: false,
  },
];

// Group calls by date
const groupCallsByDate = () => {
    const colorScheme =useColorScheme();

  const groups = [];
  let currentGroup = null;
  
  callsData.forEach(call => {
    if (currentGroup?.date !== call.dateGroup) {
      currentGroup = {
        date: call.dateGroup,
        data: [call],
      };
      groups.push(currentGroup);
    } else {
      currentGroup.data.push(call);
    }
  });
  
  return groups;
};

// Call item component - WhatsApp style
const CallItem = ({ item }) => {
    const colorScheme =useColorScheme();

  const getCallIcon = () => {
    if (item.type === 'outgoing') return 'call-outline';
    if (item.type === 'incoming') return 'call-outline';
    if (item.type === 'missed') return 'call-outline';
    return 'call-outline';
  };

  const getCallIconColor = () => {
    if (item.type === 'missed') return '#FF3B30';
    if (item.type === 'outgoing') return '#25D366';
    return '#25D366'; // incoming
  };

  return (
    <TouchableOpacity style={[styles.callItem,{backgroundColor:colorScheme==='dark'?'black':'white'}]}>
      {/* Profile Icon */}
      <View style={styles.profileContainer}>
        <View style={styles.profileIcon}>
          <Text style={[styles.profileText,{color:colorScheme==='dark'?'white':'black'}]}>
            {item.name.charAt(0)}
          </Text>
        </View>
        {item.multiple && (
          <View style={styles.multipleBadge}>
            <Text style={styles.multipleText}>2</Text>
          </View>
        )}
      </View>

      {/* Call Info */}
      <View style={styles.callInfo}>
        <View style={styles.nameRow}>
          <Text 
            style={[
              styles.name,
              item.type === 'missed' && styles.missedName,{color:colorScheme==='dark'?'white':'black'}
            ]}
            numberOfLines={1}
          >
            {item.name}
          </Text>
          {item.isVideo && (
            <Ionicons 
              name="videocam-outline" 
              size={16} 
              color="#8E8E93" 
              style={styles.videoIcon}
            />
          )}
        </View>
        <View style={styles.detailsRow}>
          <Ionicons 
            name={getCallIcon()} 
            size={16} 
            color={getCallIconColor()} 
          />
          <Text style={styles.callTypeText}>
            {item.type === 'outgoing' ? 'Outgoing' : 
             item.type === 'incoming' ? 'Incoming' : 'Missed'}
          </Text>
          <Text style={styles.timeText}> • {item.time}</Text>
        </View>
      </View>

      {/* Call Button */}
      <TouchableOpacity style={styles.callButton} onPress={()=>{
        Linking.openURL(`whatsapp://send?phone=${"+919942148933"}`)
      }}>
        <Ionicons name="call-outline" size={24} color={colorScheme==='dark'?'white':'black'} />
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

// Date separator component
const DateSeparator = ({ date }) => (
  <View style={styles.dateSeparator}>
    <View style={styles.dateLine} />
    <Text style={styles.dateText}>{date}</Text>
    <View style={styles.dateLine} />
  </View>
);

// Main Calls Screen Component
export default function CallScreen() {
    const colorScheme =useColorScheme();

  const groupedCalls = groupCallsByDate();
  // Render each section (date group)
  const renderSection = ({ item: group }) => (
    <View style={styles.section}>
      <DateSeparator date={group.date} />
      {group.data.map((call, index) => (
        <CallItem key={`${call.id}-${index}`} item={call} />
      ))}
    </View>
  );

  return (
    <SafeAreaView style={[styles.container,{backgroundColor:colorScheme==='dark'?'black':'white'}]}>
      {/* <StatusBar barStyle="dark-content" backgroundColor={colorScheme==='dark'?'black':'white'} /> */}
      
      {/* Header - WhatsApp style */}
      <View style={[styles.header,{backgroundColor:colorScheme==='dark'?'black':'white'}]}>
        <Text style={[styles.headerTitle,{color:colorScheme==='dark'?'white':'black'}]}>Calls</Text>
        <View style={styles.headerButtons}>
          <TouchableOpacity style={styles.headerButton}>
            <Ionicons name="camera-outline" size={24} color={colorScheme==='dark'?'white':'black'} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.headerButton}>
            <Ionicons name="add" size={24} color={colorScheme==='dark'?'white':'black'} />
          </TouchableOpacity>
        </View>
      </View>

      {/* Call Link Section */}
      <TouchableOpacity style={[styles.callLinkContainer,{backgroundColor:colorScheme==='dark'?'black':'white'}]}>
        <View style={styles.linkIconContainer}>
          <Ionicons name="link" size={24} color={'black'} />
        </View>
        <View style={styles.linkTextContainer}>
          <Text style={[styles.linkTitle,{color:colorScheme==='dark'?'white':'black'}]}>Create call link</Text>
          <Text style={[styles.linkSubtitle,{color:colorScheme==='dark'?'white':'black'}]}>Share a link for your WhatsApp call</Text>
        </View>
      </TouchableOpacity>

      {/* Divider */}
      {/* <View style={styles.divider} /> */}

      {/* Calls List */}
      <FlatList
        data={groupedCalls}
        renderItem={renderSection}
        keyExtractor={(item) => item.date}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContainer}
      />

      {/* Floating Call Button */}
      <TouchableOpacity style={styles.floatingButton}>
        <Ionicons name="call" size={24} color="#FFFFFF" />
      </TouchableOpacity>
    </SafeAreaView>
  );
}

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#FFFFFF',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 16,
    // backgroundColor: '#FFFFFF',
    // borderBottomWidth: 1,
    // borderBottomColor: '#F0F0F0',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000000',
  },
  headerButtons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerButton: {
    marginLeft: 20,
    padding: 4,
  },
  callLinkContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    // backgroundColor: '#FFFFFF',
  },
  linkIconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#E8F5E8',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  linkTextContainer: {
    flex: 1,
  },
  linkTitle: {
    fontSize: 17,
    fontWeight: '600',
    color: '#000000',
    marginBottom: 2,
  },
  linkSubtitle: {
    fontSize: 14,
    color: '#8E8E93',
  },
  divider: {
    height: 8,
    backgroundColor: '#F8F8F8',
  },
  listContainer: {
    paddingBottom: 20,
  },
  section: {
    marginBottom: 8,
  },
  dateSeparator: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  dateLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#E5E5EA',
  },
  dateText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#8E8E93',
    marginHorizontal: 12,
    textTransform: 'uppercase',
  },
  callItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    // backgroundColor: '#FFFFFF',
  },
  profileContainer: {
    position: 'relative',
    marginRight: 12,
  },
  profileIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#25D366',
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileText: {
    fontSize: 20,
    fontWeight: 'bold',
    // color: '#FFFFFF',
  },
  multipleBadge: {
    position: 'absolute',
    top: -4,
    right: -4,
    backgroundColor: '#FF3B30',
    borderRadius: 12,
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  multipleText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  callInfo: {
    flex: 1,
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 2,
  },
  name: {
    fontSize: 17,
    fontWeight: '600',
    color: '#000000',
    flex: 1,
  },
  missedName: {
    color: '#FF3B30',
  },
  videoIcon: {
    marginLeft: 6,
  },
  detailsRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  callTypeText: {
    fontSize: 15,
    color: '#8E8E93',
    marginLeft: 6,
  },
  timeText: {
    fontSize: 15,
    color: '#8E8E93',
  },
  callButton: {
    padding: 8,
  },
  floatingButton: {
    position: 'absolute',
    bottom: 24,
    right: 24,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: 'green',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
});