import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
  Image,
  StatusBar,
  ScrollView,
  useColorScheme,
  Dimensions,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const { width } = Dimensions.get('window');

export default function CommunitiesScreen() {
  const Color = useColorScheme();
  const isDark = Color === 'dark';
  
  // Mock communities data
  const [communities, setCommunities] = useState([
    {
      id: '1',
      name: 'Family Group',
      members: 24,
      description: 'Family updates and events',
      unreadCount: 3,
      isMuted: false,
      lastActive: '10:30 AM',
      avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
    },
    {
      id: '2',
      name: 'Work Team',
      members: 15,
      description: 'Office discussions and updates',
      unreadCount: 12,
      isMuted: false,
      lastActive: 'Yesterday',
      avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
    },
    {
      id: '3',
      name: 'Football Club',
      members: 42,
      description: 'Weekly matches and practice',
      unreadCount: 0,
      isMuted: true,
      lastActive: '2 days ago',
      avatar: 'https://randomuser.me/api/portraits/men/67.jpg',
    },
  ]);

  const renderEmptyState = () => (
    <ScrollView 
      contentContainerStyle={[
        styles.emptyStateContainer,
        { backgroundColor: isDark ? '#000' : '#f5f5f5' }
      ]}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.heroSection}>
        <View style={[
          styles.heroIconContainer,
          { backgroundColor: isDark ? '#2e2e2e' : '#e8f5e9' }
        ]}>
          <Ionicons 
            name="people" 
            size={80} 
            color={isDark ? '#25D366' : '#25D366'} 
          />
        </View>
        <Text style={[
          styles.heroTitle,
          { color: isDark ? '#fff' : '#000' }
        ]}>
          Communities
        </Text>
        <Text style={[
          styles.heroSubtitle,
          { color: isDark ? '#aaa' : '#666' }
        ]}>
          Stay connected with a community
        </Text>
      </View>

      <View style={[
        styles.infoCard,
        { backgroundColor: isDark ? '#1e1e1e' : '#fff' }
      ]}>
        <View style={styles.infoIcon}>
          <Ionicons 
            name="information-circle-outline" 
            size={24} 
            color={isDark ? '#25D366' : '#25D366'} 
          />
        </View>
        <View style={styles.infoTextContainer}>
          <Text style={[
            styles.infoText,
            { color: isDark ? '#fff' : '#000' }
          ]}>
            Communities bring members together in topic-based groups, and make it easy to get admin announcements. Any community you're added to will appear here.
          </Text>
        </View>
      </View>

      <View style={styles.dividerContainer}>
        <View style={[
          styles.divider,
          { backgroundColor: isDark ? '#333' : '#ddd' }
        ]} />
      </View>

      <View style={[
        styles.tipCard,
        { backgroundColor: isDark ? '#1e1e1e' : '#fff' }
      ]}>
        <View style={styles.tipHeader}>
          <Ionicons 
            name="sparkles" 
            size={24} 
            color={isDark ? '#FFD700' : '#FFA000'} 
          />
          <Text style={[
            styles.tipTitle,
            { color: isDark ? '#fff' : '#000' }
          ]}>
            Start your community
          </Text>
        </View>
        <Text style={[
          styles.tipText,
          { color: isDark ? '#aaa' : '#666' }
        ]}>
          Tap {' '}
          <Text style={[
            styles.highlightText,
            { color: isDark ? '#25D366' : '#25D366' }
          ]}>
            1
          </Text>
          {' '} on the Chats tab to create a new community.
        </Text>
      </View>

      <TouchableOpacity 
        style={[
          styles.createButton,
          { backgroundColor: isDark ? '#25D366' : '#25D366' }
        ]}
        activeOpacity={0.8}
      >
        <Ionicons name="add" size={24} color="white" />
        <Text style={styles.createButtonText}>Start a community</Text>
      </TouchableOpacity>

      <View style={styles.bottomTabs}>
        <View style={styles.tabItem}>
          <Ionicons 
            name="chatbubble-outline" 
            size={24} 
            color={isDark ? '#aaa' : '#666'} 
          />
          <Text style={[
            styles.tabText,
            { color: isDark ? '#aaa' : '#666' }
          ]}>
            Chats
          </Text>
        </View>
        <View style={styles.tabItem}>
          <Ionicons 
            name="time-outline" 
            size={24} 
            color={isDark ? '#aaa' : '#666'} 
          />
          <Text style={[
            styles.tabText,
            { color: isDark ? '#aaa' : '#666' }
          ]}>
            Updates
          </Text>
        </View>
        <View style={styles.tabItem}>
          <Ionicons 
            name="people" 
            size={24} 
            color={isDark ? '#25D366' : '#25D366'} 
          />
          <Text style={[
            styles.tabText,
            { color: isDark ? '#25D366' : '#25D366' }
          ]}>
            Communities
          </Text>
        </View>
        <View style={styles.tabItem}>
          <Ionicons 
            name="call-outline" 
            size={24} 
            color={isDark ? '#aaa' : '#666'} 
          />
          <Text style={[
            styles.tabText,
            { color: isDark ? '#aaa' : '#666' }
          ]}>
            Calls
          </Text>
        </View>
      </View>
    </ScrollView>
  );

  const renderCommunityItem = ({ item }) => (
    <TouchableOpacity 
      style={[
        styles.communityItem,
        { backgroundColor: isDark ? '#000' : '#fff' }
      ]}
      activeOpacity={0.7}
    >
      <View style={styles.avatarContainer}>
        <Image 
          source={{ uri: item.avatar }} 
          style={styles.communityAvatar} 
        />
        {item.unreadCount > 0 && (
          <View style={styles.unreadBadge}>
            <Text style={styles.unreadText}>{item.unreadCount}</Text>
          </View>
        )}
      </View>
      
      <View style={styles.communityInfo}>
        <View style={styles.nameRow}>
          <Text style={[
            styles.communityName,
            { color: isDark ? '#fff' : '#000' }
          ]}>
            {item.name}
          </Text>
          <Text style={[
            styles.lastActive,
            { color: isDark ? '#888' : '#666' }
          ]}>
            {item.lastActive}
          </Text>
        </View>
        
        <Text style={[
          styles.communityDescription,
          { color: isDark ? '#aaa' : '#666' }
        ]}>
          {item.description}
        </Text>
        
        <View style={styles.detailsRow}>
          <Text style={[
            styles.memberCount,
            { color: isDark ? '#888' : '#666' }
          ]}>
            {item.members} members
          </Text>
          {item.isMuted && (
            <Ionicons 
              name="notifications-off-outline" 
              size={16} 
              color={isDark ? '#888' : '#666'} 
            />
          )}
        </View>
      </View>
      
      <Ionicons 
        name="chevron-forward" 
        size={20} 
        color={isDark ? '#666' : '#999'} 
      />
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={[
      styles.container,
      { backgroundColor: isDark ? '#000' : '#fff' }
    ]}>
      <StatusBar 
        barStyle={isDark ? 'light-content' : 'dark-content'}
        backgroundColor={isDark ? '#000' : '#fff'}
      />

      {/* Header */}
      <View style={[
        styles.header,
        { backgroundColor: isDark ? '#000' : '#fff' }
      ]}>
        <Text style={[
          styles.headerTitle,
          { color: isDark ? '#fff' : '#000' }
        ]}>
          Communities
        </Text>
        <View style={styles.headerIcons}>
          <TouchableOpacity style={styles.iconButton}>
            <Ionicons 
              name="search" 
              size={24} 
              color={isDark ? '#fff' : '#000'} 
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton}>
            <Ionicons 
              name="ellipsis-vertical" 
              size={24} 
              color={isDark ? '#fff' : '#000'} 
            />
          </TouchableOpacity>
        </View>
      </View>

      {/* Communities List or Empty State */}
      {communities.length > 0 ? (
        <FlatList
          data={communities}
          renderItem={renderCommunityItem}
          keyExtractor={item => item.id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listContainer}
          ListHeaderComponent={
            <TouchableOpacity 
              style={[
                styles.newCommunityCard,
                { backgroundColor: isDark ? '#1e1e1e' : '#f0f0f0' }
              ]}
              activeOpacity={0.7}
            >
              <View style={[
                styles.newCommunityAvatar,
                { backgroundColor: isDark ? 'green' : 'green' }
              ]}>
                <Ionicons name="add" size={24} color="white" />
              </View>
              <View style={styles.newCommunityInfo}>
                <Text style={[
                  styles.newCommunityTitle,
                  { color: isDark ? '#fff' : '#000' }
                ]}>
                  New community
                </Text>
                <Text style={[
                  styles.newCommunitySubtitle,
                  { color: isDark ? '#aaa' : '#666' }
                ]}>
                  Create a new community
                </Text>
              </View>
            </TouchableOpacity>
          }
        />
      ) : (
        renderEmptyState()
      )}

      {/* Floating Action Button */}
      <TouchableOpacity 
        style={[
          styles.fab,
          { backgroundColor: isDark ? 'green' : 'green' }
        ]}
        activeOpacity={0.8}
      >
        <Ionicons name="add" size={24} color="white" />
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.1)',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  headerIcons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconButton: {
    marginLeft: 16,
    padding: 4,
  },
  listContainer: {
    paddingBottom: 80,
  },
  newCommunityCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    marginHorizontal: 16,
    marginTop: 12,
    marginBottom: 8,
    borderRadius: 12,
  },
  newCommunityAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  newCommunityInfo: {
    flex: 1,
  },
  newCommunityTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 2,
  },
  newCommunitySubtitle: {
    fontSize: 14,
  },
  communityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.05)',
  },
  avatarContainer: {
    position: 'relative',
    marginRight: 12,
  },
  communityAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  unreadBadge: {
    position: 'absolute',
    top: -4,
    right: -4,
    backgroundColor: 'green',
    width: 20,
    height: 20,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#fff',
  },
  unreadText: {
    color: 'white',
    fontSize: 10,
    fontWeight: 'bold',
  },
  communityInfo: {
    flex: 1,
  },
  nameRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  communityName: {
    fontSize: 16,
    fontWeight: '600',
  },
  lastActive: {
    fontSize: 12,
  },
  communityDescription: {
    fontSize: 14,
    marginBottom: 4,
  },
  detailsRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  memberCount: {
    fontSize: 12,
    marginRight: 8,
  },
  emptyStateContainer: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingTop: 40,
    paddingBottom: 100,
  },
  heroSection: {
    alignItems: 'center',
    marginBottom: 40,
  },
  heroIconContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  heroTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  heroSubtitle: {
    fontSize: 16,
    textAlign: 'center',
  },
  infoCard: {
    flexDirection: 'row',
    padding: 16,
    borderRadius: 12,
    marginBottom: 24,
  },
  infoIcon: {
    marginRight: 12,
  },
  infoTextContainer: {
    flex: 1,
  },
  infoText: {
    fontSize: 14,
    lineHeight: 20,
  },
  dividerContainer: {
    alignItems: 'center',
    marginBottom: 24,
  },
  divider: {
    width: '100%',
    height: 1,
  },
  tipCard: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 32,
  },
  tipHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  tipTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginLeft: 8,
  },
  tipText: {
    fontSize: 14,
    lineHeight: 20,
  },
  highlightText: {
    fontWeight: 'bold',
  },
  createButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 28,
    marginTop: 8,
  },
  createButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  bottomTabs: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    backgroundColor: 'rgba(0,0,0,0.9)',
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
  },
  tabText: {
    fontSize: 12,
    marginTop: 4,
  },
  fab: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
});