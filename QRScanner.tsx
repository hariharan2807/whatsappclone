import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  SafeAreaView,
  Dimensions,
} from 'react-native';
import {
  Camera,
  useCameraDevice,
  useCodeScanner,
} from 'react-native-vision-camera';

const { width, height } = Dimensions.get('window');

const QRScanner = (props) => {
  const [hasPermission, setHasPermission] = useState(false);
  const [cameraPosition, setCameraPosition] = useState('back');
  const [isActive, setIsActive] = useState(true);
  
  const backDevice = useCameraDevice('back');
  const frontDevice = useCameraDevice('front');
  const device = cameraPosition === 'back' ? backDevice : frontDevice;

  const codeScanner = useCodeScanner({
    codeTypes: ['qr', 'ean-13'],
    onCodeScanned: (codes) => {
      if (codes.length > 0 && codes[0].value) {
        console.log('QR Code Scanned:', codes[0].value);
        setIsActive(false); // Stop scanning after successful scan
        setTimeout(() => {
          props.onRead(codes[0].value);
        }, 500);
      }
    },
  });

  useEffect(() => {
    const requestCameraPermission = async () => {
      try {
        const permission = await Camera.requestCameraPermission();
        setHasPermission(permission === 'granted');
      } catch (error) {
        console.error('Permission Error:', error);
        setHasPermission(false);
      }
    };
    
    requestCameraPermission();

    // Auto-close after 30 seconds
    const timeout = setTimeout(() => {
      props.onRead(null);
    }, 30000);

    return () => clearTimeout(timeout);
  }, []);

  const toggleCamera = () => {
    setCameraPosition(prev => prev === 'back' ? 'front' : 'back');
  };

  const handleClose = () => {
    setIsActive(false);
    props.onRead(null);
  };

  if (device == null || !hasPermission) {
    return (
      <SafeAreaView style={styles.permissionContainer}>
        <StatusBar barStyle="light-content" backgroundColor="#000" />
        <View style={styles.permissionContent}>
          <Text style={styles.permissionIcon}>📷</Text>
          <Text style={styles.permissionTitle}>Camera Access Required</Text>
          <Text style={styles.permissionText}>
            {!hasPermission 
              ? 'Please allow camera access to scan QR codes.'
              : 'Camera not available on this device.'}
          </Text>
          <TouchableOpacity
            style={styles.permissionButton}
            onPress={async () => {
              const permission = await Camera.requestCameraPermission();
              setHasPermission(permission === 'granted');
            }}
          >
            <Text style={styles.permissionButtonText}>
              {!hasPermission ? 'Grant Permission' : 'Retry'}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.permissionButton, styles.closeButton]}
            onPress={() => props.onRead(null)}
          >
            <Text style={styles.permissionButtonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#000" />
      
      {/* Camera View */}
      <Camera
        style={StyleSheet.absoluteFill}
        device={device}
        isActive={isActive}
        codeScanner={codeScanner}
        enableZoomGesture={true}
        resizeMode="cover"
      />

      {/* Overlay */}
      <View style={styles.overlay}>
        
        {/* Top Header */}
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={handleClose}
          >
            <Text style={styles.backButtonIcon}>←</Text>
            <Text style={styles.backButtonText}>Back</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Scan QR Code</Text>
          <TouchableOpacity
            style={styles.flipButton}
            onPress={toggleCamera}
          >
            <Text style={styles.flipButtonIcon}>🔄</Text>
          </TouchableOpacity>
        </View>

        {/* Scanner Frame Area */}
        <View style={styles.scannerArea}>
          <View style={styles.scannerFrame}>
            {/* Corners */}
            <View style={[styles.corner, styles.topLeft]} />
            <View style={[styles.corner, styles.topRight]} />
            <View style={[styles.corner, styles.bottomLeft]} />
            <View style={[styles.corner, styles.bottomRight]} />
            
            {/* Animated Scan Line */}
            <View style={styles.scanLine} />
          </View>
          
          <Text style={styles.instruction}>
            Position QR code inside the frame
          </Text>
          <Text style={styles.subInstruction}>
            The code will be scanned automatically
          </Text>
        </View>

        {/* Bottom Controls */}
        <View style={styles.controls}>
          <View style={styles.controlButtons}>
            <TouchableOpacity
              style={styles.controlButton}
              onPress={toggleCamera}
            >
              <View style={styles.controlIcon}>
                <Text style={styles.controlIconText}>🔄</Text>
              </View>
              <Text style={styles.controlLabel}>Flip Camera</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.controlButton}
              onPress={handleClose}
            >
              <View style={[styles.controlIcon, styles.closeIcon]}>
                <Text style={styles.controlIconText}>✕</Text>
              </View>
              <Text style={styles.controlLabel}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  permissionContainer: {
    flex: 1,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  permissionContent: {
    alignItems: 'center',
    padding: 30,
  },
  permissionIcon: {
    fontSize: 60,
    marginBottom: 20,
  },
  permissionTitle: {
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  permissionText: {
    color: '#ccc',
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 30,
    lineHeight: 24,
  },
  permissionButton: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 10,
    marginBottom: 15,
    width: '100%',
    alignItems: 'center',
  },
  closeButton: {
    backgroundColor: '#ff3b30',
  },
  permissionButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 10,
    paddingHorizontal: 20,
    paddingBottom: 20,
    backgroundColor: 'rgba(0,0,0,0.7)',
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  backButtonIcon: {
    color: '#fff',
    fontSize: 24,
    marginRight: 5,
  },
  backButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  headerTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  flipButton: {
    padding: 10,
  },
  flipButtonIcon: {
    color: '#fff',
    fontSize: 24,
  },
  scannerArea: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  scannerFrame: {
    width: width * 0.7,
    height: width * 0.7,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.3)',
    backgroundColor: 'transparent',
    position: 'relative',
    borderRadius: 20,
    marginBottom: 30,
  },
  corner: {
    position: 'absolute',
    width: 30,
    height: 30,
    borderColor: '#00FF00',
  },
  topLeft: {
    top: 0,
    left: 0,
    borderTopWidth: 4,
    borderLeftWidth: 4,
    borderTopLeftRadius: 20,
  },
  topRight: {
    top: 0,
    right: 0,
    borderTopWidth: 4,
    borderRightWidth: 4,
    borderTopRightRadius: 20,
  },
  bottomLeft: {
    bottom: 0,
    left: 0,
    borderBottomWidth: 4,
    borderLeftWidth: 4,
    borderBottomLeftRadius: 20,
  },
  bottomRight: {
    bottom: 0,
    right: 0,
    borderBottomWidth: 4,
    borderRightWidth: 4,
    borderBottomRightRadius: 20,
  },
  scanLine: {
    position: 'absolute',
    height: 3,
    width: '100%',
    backgroundColor: '#00FF00',
    top: '20%',
    opacity: 0.8,
    transform: [{ translateY: 0 }],
  },
  instruction: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 10,
  },
  subInstruction: {
    color: '#ccc',
    fontSize: 14,
    textAlign: 'center',
  },
  controls: {
    padding: 20,
    backgroundColor: 'rgba(0,0,0,0.7)',
  },
  controlButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  controlButton: {
    alignItems: 'center',
  },
  controlIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  closeIcon: {
    backgroundColor: 'rgba(255,59,48,0.3)',
  },
  controlIconText: {
    fontSize: 24,
    color: '#fff',
  },
  controlLabel: {
    color: '#fff',
    fontSize: 14,
  },
});

export default QRScanner;