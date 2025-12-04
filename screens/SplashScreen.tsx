import React, { useEffect } from 'react';
import { View, Text, Image, Animated, Easing } from 'react-native';
import tailwind from '@tailwind';
import assets_manifest from '@assets';
import { useNavigation } from '@react-navigation/native';

export default function SplashScreen() {
  const fadeAnim = new Animated.Value(0);
  const scaleAnim = new Animated.Value(0.5);
  const navigation = useNavigation();
  useEffect(() => {
    // Logo fade in and scale animation
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        easing: Easing.ease,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        tension: 100,
        friction: 7,
        useNativeDriver: true,
      }),
    ]).start();
    setTimeout(() => {
              navigation?.navigate('BottomTabNavigation');
            }, 3000);
  }, []);
//   useEffect(() => {
//     setTimeout(() => {
//       navigation?.navigate('BottomTabNavigation');
//     }, 5000);
//   }, []);
  return (
    <View style={styles.container}>
      <View style={styles.mainContent}>
        <Animated.View
          style={[
            styles.animatedContainer,
            {
              opacity: fadeAnim,
              transform: [{ scale: scaleAnim }],
            },
          ]}
        >
          <Image
            style={styles.logo}
            source={assets_manifest?.whatsapp}
            resizeMode="contain"
          />
        </Animated.View>
      </View>

      <Animated.View
        style={[
          styles.footer,
          {
            opacity: fadeAnim,
          },
        ]}
      >
        <Text style={styles.footerText}>from</Text>
        <View style={styles.metaContainer}>
          <Image
            source={assets_manifest?.meta}
            style={styles.metaIcon}
            resizeMode="contain"
            tintColor="#49A600"
          />
          <Text style={styles.metaText}>Meta</Text>
        </View>
      </Animated.View>
    </View>
  );
}

const styles = {
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  mainContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  animatedContainer: {
    alignItems: 'center',
  },
  logo: {
    height: 80,
    width: 80,
  },
  footer: {
    position: 'absolute',
    bottom: 30,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  footerText: {
    color: '#000',
    fontSize: 13,
    // fontWeight: 'bold',
    marginBottom: 4,
  },
  metaContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  metaIcon: {
    height: 20,
    width: 20,
    marginRight: 4,
  },
  metaText: {
    color: '#49A600',
    fontSize: 15,
    fontWeight: 'bold',
  },
};
