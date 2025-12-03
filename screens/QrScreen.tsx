import { 
    Image, 
    StyleSheet, 
    Text, 
    TouchableOpacity, 
    View, 
    SafeAreaView 
  } from 'react-native';
  import React, { useState } from 'react';
  import tailwind from '@tailwind';
  import QRScanner from '../QRScanner';
  
  export default function QrScreen() {
    const [showQR, setShowQR] = useState(false);
    const [qrCode, setQrCode] = useState('');
  
    const openQRscanner = () => {
      setShowQR(true);
    };
  
    const onQrRead = (qrtext) => {
      console.log('QR Code Scanned:', qrtext);
      setQrCode(qrtext);
      setShowQR(false);
    };
  
    if (showQR) {
      return (
        <QRScanner onRead={onQrRead} />
      );
    }
  
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.content}>
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.title}>QR Code Scanner</Text>
          </View>
  
          {/* QR Code Display */}
          {qrCode ? (
            <View style={styles.qrResultContainer}>
              <Text style={styles.qrResultLabel}>Scanned QR Code:</Text>
              <View style={styles.qrResultBox}>
                <Text style={styles.qrResultText}>{qrCode}</Text>
              </View>
              <TouchableOpacity
                style={styles.clearButton}
                onPress={() => setQrCode('')}
              >
                <Text style={styles.clearButtonText}>Clear</Text>
              </TouchableOpacity>
            </View>
          ) : null}
  
          {/* Scanner Illustration */}
          <View style={styles.illustrationContainer}>
            <Image
              source={require('../assets/image/scanner.png')}
              style={styles.scannerImage}
              resizeMode="contain"
            />
            <Text style={styles.instructionText}>
              Tap the button below to scan a QR code
            </Text>
          </View>
  
          {/* Scan Button */}
          <TouchableOpacity
            onPress={openQRscanner}
            style={styles.scanButton}
            activeOpacity={0.8}
          >
            <View style={styles.scanButtonContent}>
              <Text style={styles.scanIcon}>📷</Text>
              <Text style={styles.scanButtonText}>Scan QR Code</Text>
            </View>
          </TouchableOpacity>
  {
    !qrCode&&  <View style={styles.featuresContainer}>
    <Text style={styles.featuresTitle}>What you can scan:</Text>
    <View style={styles.featureItem}>
      <Text style={styles.featureIcon}>✅</Text>
      <Text style={styles.featureText}>Product QR codes</Text>
    </View>
    <View style={styles.featureItem}>
      <Text style={styles.featureIcon}>✅</Text>
      <Text style={styles.featureText}>Website URLs</Text>
    </View>
    <View style={styles.featureItem}>
      <Text style={styles.featureIcon}>✅</Text>
      <Text style={styles.featureText}>Contact information</Text>
    </View>
    <View style={styles.featureItem}>
      <Text style={styles.featureIcon}>✅</Text>
      <Text style={styles.featureText}>Wi-Fi credentials</Text>
    </View>
  </View>
  }
          {/* Features List */}
        
        </View>
      </SafeAreaView>
    );
  }
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#f8f9fa',
    },
    content: {
      flex: 1,
      padding: 20,
    },
    header: {
      alignItems: 'center',
      marginBottom: 30,
      paddingTop: 10,
    },
    title: {
      fontSize: 28,
      fontWeight: 'bold',
      color: '#333',
    },
    qrResultContainer: {
      backgroundColor: '#fff',
      borderRadius: 15,
      padding: 20,
      marginBottom: 25,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 8,
      elevation: 5,
    },
    qrResultLabel: {
      fontSize: 16,
      fontWeight: '600',
      color: '#555',
      marginBottom: 10,
    },
    qrResultBox: {
      backgroundColor: '#f5f5f5',
      borderRadius: 10,
      padding: 15,
      marginBottom: 15,
    },
    qrResultText: {
      fontSize: 14,
      color: '#333',
      fontFamily: 'monospace',
    },
    clearButton: {
      alignSelf: 'flex-end',
      backgroundColor: '#ff6b6b',
      paddingHorizontal: 20,
      paddingVertical: 10,
      borderRadius: 8,
    },
    clearButtonText: {
      color: '#fff',
      fontWeight: '600',
    },
    illustrationContainer: {
      alignItems: 'center',
      marginBottom: 40,
    },
    scannerImage: {
      height: 200,
      width: 200,
      marginBottom: 20,
    },
    instructionText: {
      fontSize: 16,
      color: '#666',
      textAlign: 'center',
      paddingHorizontal: 30,
      lineHeight: 24,
    },
    scanButton: {
      backgroundColor: '#4CAF50',
      borderRadius: 15,
      paddingVertical: 18,
      marginHorizontal: 20,
      marginBottom: 30,
      shadowColor: '#4CAF50',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.3,
      shadowRadius: 8,
      elevation: 8,
    },
    scanButtonContent: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
    },
    scanIcon: {
      fontSize: 24,
      marginRight: 12,
    },
    scanButtonText: {
      color: '#fff',
      fontSize: 18,
      fontWeight: 'bold',
    },
    featuresContainer: {
      backgroundColor: '#fff',
      borderRadius: 15,
      padding: 20,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 8,
      elevation: 5,
    },
    featuresTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      color: '#333',
      marginBottom: 15,
    },
    featureItem: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 12,
    },
    featureIcon: {
      fontSize: 16,
      marginRight: 12,
    },
    featureText: {
      fontSize: 15,
      color: '#555',
    },
  });