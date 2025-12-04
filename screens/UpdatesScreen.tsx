import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
  StatusBar,
  Modal,
  Animated,
  PanResponder,
  SafeAreaView,
  useColorScheme,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Video from 'react-native-video';

const { width, height } = Dimensions.get('window');

export default function UpdatesScreen() {
  const Color = useColorScheme();

  const [statusData, setStatusData] = useState([
    {
      id: '1',
      type: 'myStatus',
      name: 'My Status',
      time: 'Tap to add status update',
      avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
      hasNew: false,
      isViewed: false,
      statuses: [
        {
          id: '1-1',
          type: 'image',
          url: 'https://images.unsplash.com/photo-1579546929662-711aa81148cf',
          duration: 5,
        },
        {
          id: '1-2',
          type: 'video',
          url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
          thumbnail:
            'https://images.unsplash.com/photo-1555099962-4199c345e5dd',
          duration: 15,
        },
      ],
    },
    {
      id: '2',
      type: 'recent',
      name: 'Recent Updates',
      data: [
        {
          id: '2-1',
          name: 'John Doe',
          time: '20 minutes ago',
          avatar: 'https://randomuser.me/api/portraits/men/44.jpg',
          hasNew: true,
          isViewed: false,
          statusCount: 3,
          statuses: [
            {
              id: '2-1-1',
              type: 'image',
              url: 'https://images.unsplash.com/photo-1557683316-973673baf926',
              duration: 7,
            },
            {
              id: '2-1-2',
              type: 'video',
              url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
              thumbnail:
                'https://images.unsplash.com/photo-1555099962-4199c345e5dd',
              duration: 20,
            },
            {
              id: '2-1-3',
              type: 'image',
              url: 'https://images.unsplash.com/photo-1541963463532-d68292c34b19',
              duration: 5,
            },
          ],
        },
      ],
    },
  ]);

  const [selectedStatus, setSelectedStatus] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVideoPlaying, setIsVideoPlaying] = useState(true);
  const [isProgressActive, setIsProgressActive] = useState(true);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const progressAnim = useRef(new Animated.Value(0)).current;
  const videoRef = useRef(null);
  const autoAdvanceTimer = useRef(null);

  // Calculate duration for current status
  const getCurrentDuration = () => {
    const statuses = selectedStatus?.statuses || [];
    const currentStatus = statuses[currentIndex];

    if (currentStatus?.duration) {
      return currentStatus.duration * 1000; // Convert to milliseconds
    }

    // Default duration: 5 seconds for images, 10 seconds for video
    if (currentStatus?.type === 'video') {
      return 10000;
    }
    return 5000;
  };

  // Start progress animation for current status
  const startProgressAnimation = () => {
    // Clear any existing timers
    if (autoAdvanceTimer.current) {
      clearTimeout(autoAdvanceTimer.current);
    }

    // Reset progress animation
    progressAnim.setValue(0);
    setIsProgressActive(true);

    const duration = getCurrentDuration();

    // Start the progress animation
    Animated.timing(progressAnim, {
      toValue: 1,
      duration: duration,
      useNativeDriver: true,
    }).start(({ finished }) => {
      if (finished) {
        // Auto advance to next status when animation completes
        autoAdvanceToNext();
      }
    });
  };

  // Stop progress animation
  const stopProgressAnimation = () => {
    progressAnim.stopAnimation();
    setIsProgressActive(false);
  };

  // Auto advance to next status
  const autoAdvanceToNext = () => {
    const statuses = selectedStatus?.statuses || [];
    const statusCount = selectedStatus?.statusCount || 1;
    const totalItems = Math.max(statuses.length, statusCount);

    if (currentIndex < totalItems - 1) {
      setCurrentIndex(prev => prev + 1);
    } else {
      closeStatusViewer();
    }
  };

  // Handle manual next
  const goToNext = () => {
    // Stop current progress animation
    stopProgressAnimation();

    const statuses = selectedStatus?.statuses || [];
    const statusCount = selectedStatus?.statusCount || 1;
    const totalItems = Math.max(statuses.length, statusCount);

    if (currentIndex < totalItems - 1) {
      setCurrentIndex(currentIndex + 1);
      setIsVideoPlaying(true);
    } else {
      closeStatusViewer();
    }
  };

  // Handle manual previous
  const goToPrev = () => {
    // Stop current progress animation
    stopProgressAnimation();

    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setIsVideoPlaying(true);
    }
  };

  // Toggle play/pause
  const togglePlayPause = () => {
    if (isProgressActive) {
      stopProgressAnimation();
      setIsVideoPlaying(false);
    } else {
      startProgressAnimation();
      setIsVideoPlaying(true);
    }
  };

  // Effect to handle progress animation when modal opens or index changes
  useEffect(() => {
    if (modalVisible && selectedStatus) {
      // Start progress animation for the current status
      startProgressAnimation();
    }

    // Cleanup function
    return () => {
      if (autoAdvanceTimer.current) {
        clearTimeout(autoAdvanceTimer.current);
      }
      progressAnim.stopAnimation();
    };
  }, [currentIndex, modalVisible, selectedStatus]);

  // Effect to handle video pause/resume
  useEffect(() => {
    if (
      modalVisible &&
      selectedStatus?.statuses?.[currentIndex]?.type === 'video'
    ) {
      setIsVideoPlaying(isProgressActive);
    } else {
      setIsVideoPlaying(false);
    }
  }, [currentIndex, modalVisible, selectedStatus, isProgressActive]);

  // Reset progress when modal opens
  const openStatusViewer = status => {
    setSelectedStatus(status);
    setCurrentIndex(0); // Always start from first status
    setModalVisible(true);
    setIsVideoPlaying(true);
    setIsProgressActive(true);

    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  // Close status viewer
  const closeStatusViewer = () => {
    setIsVideoPlaying(false);
    setIsProgressActive(false);
    progressAnim.stopAnimation();

    if (autoAdvanceTimer.current) {
      clearTimeout(autoAdvanceTimer.current);
    }

    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 200,
      useNativeDriver: true,
    }).start(() => {
      setModalVisible(false);
      setSelectedStatus(null);
      setCurrentIndex(0);
    });
  };

  // Pan responder for swipe gestures
  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        // Pause progress when user starts touching
        stopProgressAnimation();
      },
      onPanResponderRelease: (evt, gestureState) => {
        if (gestureState.dx > 120) {
          // Swipe right - previous
          goToPrev();
        } else if (gestureState.dx < -120) {
          // Swipe left - next
          goToNext();
        } else if (gestureState.dy > 100) {
          // Swipe down - close
          closeStatusViewer();
        } else {
          // If no swipe, resume progress animation
          if (isVideoPlaying) {
            startProgressAnimation();
          }
        }
      },
    }),
  ).current;

  // Update the renderMedia function to handle auto-advance
  const renderMedia = () => {
    const currentStatus = selectedStatus?.statuses?.[currentIndex];
    const statusCount = selectedStatus?.statusCount || 1;

    // If no statuses array, use fallback images
    if (!currentStatus) {
      const fallbackImages = [
        'https://images.unsplash.com/photo-1579546929662-711aa81148cf',
        'https://images.unsplash.com/photo-1557683316-973673baf926',
        'https://images.unsplash.com/photo-1555099962-4199c345e5dd',
      ];

      return (
        <TouchableOpacity
          style={styles.imageContainer}
          activeOpacity={1}
          onPress={goToNext}
          onLongPress={() => {
            // Pause progress on long press
            if (isProgressActive) {
              stopProgressAnimation();
            }
          }}
          onPressOut={() => {
            // Resume progress when long press ends
            if (!isProgressActive) {
              startProgressAnimation();
            }
          }}
        >
          <Image
            source={{
              uri: fallbackImages[currentIndex % fallbackImages.length],
            }}
            style={styles.statusImage}
            resizeMode="cover"
          />
        </TouchableOpacity>
      );
    }

    if (currentStatus.type === 'video') {
      return (
        <View style={styles.videoContainer}>
          <Video
            ref={videoRef}
            source={{ uri: currentStatus.url }}
            style={styles.video}
            resizeMode="cover"
            paused={!isVideoPlaying}
            repeat={false}
            controls={false}
            onEnd={() => {
              // Auto advance when video ends
              autoAdvanceToNext();
            }}
            onLoad={data => {
              // You can adjust duration based on actual video length if needed
              console.log('Video loaded:', data);
            }}
          />
          {!isVideoPlaying && (
            <TouchableOpacity
              style={styles.playButton}
              onPress={() => {
                setIsVideoPlaying(true);
                startProgressAnimation();
              }}
            >
              <Ionicons
                name="play-circle"
                size={60}
                color="rgba(255,255,255,0.8)"
              />
            </TouchableOpacity>
          )}
          {currentStatus.thumbnail && !isVideoPlaying && (
            <Image
              source={{ uri: currentStatus.thumbnail }}
              style={[styles.statusImage, styles.videoThumbnail]}
              resizeMode="cover"
            />
          )}
        </View>
      );
    } else {
      // Image type - add tap to advance
      return (
        <TouchableOpacity
          style={styles.imageContainer}
          activeOpacity={1}
          onPress={goToNext}
          onLongPress={() => {
            // Pause progress on long press
            if (isProgressActive) {
              stopProgressAnimation();
            }
          }}
          onPressOut={() => {
            // Resume progress when long press ends
            if (!isProgressActive) {
              startProgressAnimation();
            }
          }}
        >
          <Image
            source={{ uri: currentStatus.url }}
            style={styles.statusImage}
            resizeMode="cover"
          />
        </TouchableOpacity>
      );
    }
  };

  // Update the renderStatusViewer function's progress bar section
  const renderStatusViewer = () => {
    if (!selectedStatus) return null;

    const statuses = selectedStatus?.statuses || [];
    const statusCount = selectedStatus?.statusCount || 1;
    const totalItems = Math.max(statuses.length, statusCount);

    return (
      <Modal
        visible={modalVisible}
        transparent
        animationType="slide"
        onRequestClose={closeStatusViewer}
      >
        <StatusBar hidden />
        <Animated.View
          style={[styles.statusViewerContainer, { opacity: fadeAnim }]}
          {...panResponder.panHandlers}
        >
          {/* Progress Bars - Updated with progressAnim */}
          <View style={styles.progressBarContainer}>
            {[...Array(totalItems)].map((_, i) => (
              <View key={i} style={styles.progressBarBackground}>
                <Animated.View
                  style={{
                    ...styles.progressBarFill,
                    transform: [
                      {
                        scaleX:
                          currentIndex === i
                            ? progressAnim.interpolate({
                                inputRange: [0, 1],
                                outputRange: [0, 1],
                              })
                            : i < currentIndex
                            ? 1
                            : 0,
                      },
                    ],
                  }}
                />
              </View>
            ))}
          </View>

          {/* Header */}
          <View style={styles.headerContent}>
            <Image
              source={{ uri: selectedStatus.avatar }}
              style={styles.viewerAvatar}
            />
            <View style={styles.viewerInfo}>
              <Text style={styles.viewerName}>{selectedStatus.name}</Text>
              <Text style={styles.viewerTime}>
                {currentIndex + 1} of {totalItems} • {selectedStatus.time}
              </Text>
            </View>

            {/* Play/Pause Button */}
            <TouchableOpacity
              style={styles.playPauseButton}
              onPress={togglePlayPause}
            >
              <Ionicons
                name={isProgressActive ? 'pause' : 'play'}
                size={24}
                color="white"
              />
            </TouchableOpacity>

            <TouchableOpacity onPress={closeStatusViewer}>
              <Ionicons name="close" size={28} color="white" />
            </TouchableOpacity>
          </View>

          {/* Media Content */}
          <View style={styles.statusContent}>
            {renderMedia()}

            {/* Navigation Arrows */}
            {currentIndex > 0 && (
              <TouchableOpacity
                style={[styles.navButton, styles.prevButton]}
                onPress={goToPrev}
              >
                <Ionicons name="chevron-back" size={30} color="white" />
              </TouchableOpacity>
            )}

            {currentIndex < totalItems - 1 && (
              <TouchableOpacity
                style={[styles.navButton, styles.nextButton]}
                onPress={goToNext}
              >
                <Ionicons name="chevron-forward" size={30} color="white" />
              </TouchableOpacity>
            )}
          </View>

          {/* Touch areas for navigation (optional) */}
          <View style={styles.touchAreas}>
            <TouchableOpacity
              style={styles.leftTouchArea}
              onPress={goToPrev}
              activeOpacity={0.8}
            />
            <TouchableOpacity
              style={styles.centerTouchArea}
              onPress={togglePlayPause}
              activeOpacity={0.8}
            />
            <TouchableOpacity
              style={styles.rightTouchArea}
              onPress={goToNext}
              activeOpacity={0.8}
            />
          </View>
        </Animated.View>
      </Modal>
    );
  };

  const renderStatusItem = ({ item }) => {
    if (item.type === 'myStatus') {
      return (
        <TouchableOpacity
          style={[
            styles.statusItem,
            { backgroundColor: Color === 'dark' ? 'black' : 'white' },
          ]}
          activeOpacity={0.7}
          onPress={() => openStatusViewer(item)}
        >
          <View style={styles.avatarContainer}>
            <Image source={{ uri: item.avatar }} style={styles.avatar} />
            <View style={styles.addButton}>
              <Ionicons name="add-circle" size={24} color="green" />
            </View>
          </View>
          <View style={styles.statusInfo}>
            <Text
              style={[
                styles.statusName,
                { color: Color === 'dark' ? 'white' : 'black' },
              ]}
            >
              {item.name}
            </Text>
            <Text
              style={[
                styles.statusTime,
                { color: Color === 'dark' ? 'white' : 'black' },
              ]}
            >
              {item.time}
            </Text>
          </View>
        </TouchableOpacity>
      );
    }

    return (
      <View
        style={[
          styles.section,
          { backgroundColor: Color === 'dark' ? 'black' : 'white' },
        ]}
      >
        <Text
          style={[
            styles.sectionTitle,
            { color: Color === 'dark' ? 'white' : 'black' },
          ]}
        >
          {item.name}
        </Text>
        {item.data?.map(status => (
          <TouchableOpacity
            key={status.id}
            style={styles.statusItem}
            activeOpacity={0.7}
            onPress={() => openStatusViewer(status)}
          >
            <View style={styles.avatarContainer}>
              <Image
                source={{ uri: status.avatar }}
                style={[styles.avatar, status.isViewed && styles.viewedAvatar]}
              />
              {status.hasNew && <View style={styles.unreadIndicator} />}
              {status.isMuted && (
                <View style={styles.mutedIcon}>
                  <Ionicons name="notifications-off" size={14} color="#666" />
                </View>
              )}
            </View>
            <View style={styles.statusInfo}>
              <View style={styles.nameRow}>
                <Text
                  style={[
                    styles.statusName,
                    status.hasNew && styles.unreadName,
                    { color: Color === 'dark' ? 'white' : 'black' },
                  ]}
                >
                  {status.name}
                </Text>
                <Text
                  style={[
                    styles.statusTime,
                    { color: Color === 'dark' ? 'white' : 'black' },
                  ]}
                >
                  {status.time}
                </Text>
              </View>
              <View style={styles.statusDetails}>
                <Text
                  style={[
                    styles.statusCount,
                    { color: Color === 'dark' ? 'white' : 'black' },
                  ]}
                >
                  {status.statusCount}{' '}
                  {status.statusCount === 1 ? 'update' : 'updates'}
                </Text>
                {status.isMuted && <Text style={styles.mutedText}>Muted</Text>}
              </View>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#999" />
          </TouchableOpacity>
        ))}
      </View>
    );
  };

  return (
    <SafeAreaView
      style={[
        styles.container,
        { backgroundColor: Color === 'dark' ? 'black' : 'white' },
      ]}
    >
      {/* Header */}
      <View
        style={[
          styles.header,
          { backgroundColor: Color === 'dark' ? 'black' : 'white' },
        ]}
      >
        <Text
          style={[
            styles.headerTitle,
            { color: Color === 'dark' ? 'white' : 'black' },
          ]}
        >
          Status
        </Text>
        <View style={styles.headerIcons}>
          <TouchableOpacity style={styles.iconButton}>
            <Ionicons
              name="search"
              size={24}
              color={Color === 'dark' ? 'white' : 'black'}
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton}>
            <Ionicons
              name="ellipsis-vertical"
              size={24}
              color={Color === 'dark' ? 'white' : 'black'}
            />
          </TouchableOpacity>
        </View>
      </View>

      {/* Status List */}
      <FlatList
        data={statusData}
        renderItem={renderStatusItem}
        keyExtractor={item => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContainer}
      />

      {/* Floating Action Button */}
      {/* <TouchableOpacity
        style={styles.fab}
        activeOpacity={0.8}
        onPress={() => console.log('Create status')}
      >
        <View style={styles.fabInner}>
          <MaterialIcons name="photo-camera" size={24} color="#075E54" />
          <Ionicons
            name="pencil"
            size={16}
            color="#075E54"
            style={styles.fabPencil}
          />
        </View>
      </TouchableOpacity> */}

      {/* Status Viewer Modal */}
      {renderStatusViewer()}
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
    marginLeft: 10,
  },
  listContainer: {
    paddingBottom: 20,
  },
  statusItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
  },
  section: {
    marginTop: 8,
  },
  sectionTitle: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    fontSize: 14,
    color: '#666',
  },
  avatarContainer: {
    position: 'relative',
    marginRight: 12,
  },
  avatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    borderWidth: 2,
    borderColor: 'green',
  },
  viewedAvatar: {
    borderColor: '#999',
  },
  addButton: {
    position: 'absolute',
    bottom: -2,
    right: -2,
    backgroundColor: 'white',
    borderRadius: 12,
  },
  unreadIndicator: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: 'green',
    borderWidth: 2,
    borderColor: 'white',
  },
  mutedIcon: {
    position: 'absolute',
    bottom: -4,
    right: -4,
    backgroundColor: 'white',
    borderRadius: 9,
    padding: 2,
  },
  statusInfo: {
    flex: 1,
  },
  nameRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  statusName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
  },
  unreadName: {
    fontWeight: 'bold',
  },
  statusTime: {
    fontSize: 12,
    color: '#666',
  },
  statusDetails: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusCount: {
    fontSize: 13,
    color: '#666',
    marginRight: 8,
  },
  mutedText: {
    fontSize: 12,
    color: '#999',
    fontStyle: 'italic',
  },
  fab: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: 'green',
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
  fabInner: {
    backgroundColor: 'white',
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  fabPencil: {
    position: 'absolute',
    bottom: 6,
    right: 6,
  },
  statusViewerContainer: {
    flex: 1,
    backgroundColor: 'black',
  },
  progressBarContainer: {
    flexDirection: 'row',
    paddingHorizontal: 8,
    paddingTop: 40,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 100,
  },
  progressBarBackground: {
    flex: 1,
    height: 2,
    backgroundColor: 'rgba(255,255,255,0.3)',
    marginHorizontal: 2,
    borderRadius: 1,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: 'white',
    transformOrigin: 'left',
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingTop: 60,
    paddingBottom: 12,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10,
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  viewerAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  viewerInfo: {
    flex: 1,
  },
  viewerName: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  viewerTime: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: 12,
  },
  playPauseButton: {
    marginRight: 15,
    padding: 5,
  },
  statusContent: {
    flex: 1,
    position: 'relative',
  },
  videoContainer: {
    width: width,
    height: height,
    backgroundColor: 'black',
    position: 'relative',
  },
  video: {
    width: '100%',
    height: '100%',
  },
  playButton: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -30,
    marginLeft: -30,
    zIndex: 10,
  },
  videoThumbnail: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  imageContainer: {
    width: width,
    height: height,
  },
  statusImage: {
    width: width,
    height: height,
  },
  navButton: {
    position: 'absolute',
    top: '50%',
    marginTop: -25,
    padding: 10,
    backgroundColor: 'rgba(0,0,0,0.3)',
    borderRadius: 25,
  },
  prevButton: {
    left: 20,
  },
  nextButton: {
    right: 20,
  },
  bottomControls: {
    position: 'absolute',
    bottom: 30,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  controlButton: {
    marginHorizontal: 15,
    padding: 12,
    backgroundColor: 'rgba(0,0,0,0.3)',
    borderRadius: 25,
  },
  touchAreas: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
  },
  leftTouchArea: {
    flex: 1,
  },
  centerTouchArea: {
    flex: 1,
  },
  rightTouchArea: {
    flex: 1,
  },
});
