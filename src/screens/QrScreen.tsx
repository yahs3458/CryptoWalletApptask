import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  PermissionsAndroid,
  Platform,
  Alert,
  SafeAreaView,
} from 'react-native';
import { RNCamera } from 'react-native-camera';
import Header from '../components/Header';
import BottomTabBar from '../components/BottomTabs';
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

type RootStackParamList = {
  Send: {
    recipientAddress: string;
    recipientName: string;
  };
};

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'Send'>;

const QrScreen = () => {
  const navigation = useNavigation<NavigationProp>();
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);

  useEffect(() => {
    requestCameraPermission();
  }, []);

  const requestCameraPermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.CAMERA,
          {
            title: 'Camera Permission',
            message: 'App needs access to your camera to scan QR codes',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          }
        );
        setHasPermission(granted === PermissionsAndroid.RESULTS.GRANTED);
      } catch (err) {
        console.warn(err);
        setHasPermission(false);
      }
    } else {
      setHasPermission(true);
    }
  };

  const onBarCodeRead = ({ data }: { data: string }) => {
    try {
      // Assuming the QR code data is in the format: "wallet_address|user_name"
      const [walletAddress, userName] = data.split('|');
      
      if (walletAddress) {
        navigation.navigate('Send', {
          recipientAddress: walletAddress,
          recipientName: userName || 'Unknown User'
        });
      } else {
        Alert.alert('Invalid QR Code', 'The scanned QR code does not contain a valid wallet address');
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to process the QR code data');
    }
  };

  if (hasPermission === null) {
    return (
      <View style={styles.centered}>
        <Text>Requesting camera permission...</Text>
      </View>
    );
  }

  if (hasPermission === false) {
    return (
      <View style={styles.centered}>
        <Text>No access to camera</Text>
      </View>
    );
  }

  return (
    <LinearGradient
      colors={['#0B0F1C', '#1A1F2E']}
      style={styles.gradientContainer}
    >
      <Header
        title="SCAN QR"
        leftIcon={require('../assets/icons/back.png')}
        onLeftPress={() => navigation.goBack()}
        rightIcon={require('../assets/icons/scan.png')}
        onRightPress={() => console.log('Scan')}
      />
      <SafeAreaView style={styles.container}>
        <Text style={styles.instructionText}>
          Hold your camera at QR code{'\n'}to scan the address
        </Text>
        <View style={styles.scanBoxContainer}>
          <RNCamera
            style={styles.camera}
            onBarCodeRead={onBarCodeRead}
            flashMode={RNCamera.Constants.FlashMode.auto}
            type={RNCamera.Constants.Type.back}
            captureAudio={false}
            androidCameraPermissionOptions={{
              title: 'Permission to use camera',
              message: 'We need your permission to use your camera',
              buttonPositive: 'Ok',
              buttonNegative: 'Cancel',
            }}
            barCodeTypes={[RNCamera.Constants.BarCodeType.qr]}
          />
          <View style={styles.overlay}>
            <View style={styles.cornerTopLeft} />
            <View style={styles.cornerTopRight} />
            <View style={styles.cornerBottomLeft} />
            <View style={styles.cornerBottomRight} />
          </View>
        </View>
      </SafeAreaView>
      <BottomTabBar />
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  gradientContainer: {
    flex: 1,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  instructionText: {
    color: '#B0B0B0',
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 20,
    marginTop: 20,
  },
  scanBoxContainer: {
    width: 300,
    height: 300,
    borderRadius: 12,
    overflow: 'hidden',
    position: 'relative',
    marginTop: 40,
    alignSelf: 'center',
  },
  camera: {
    width: '100%',
    height: '100%',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: 12,
  },
  cornerTopLeft: {
    position: 'absolute',
    top: -2,
    left: -2,
    width: 30,
    height: 30,
    borderTopWidth: 4,
    borderLeftWidth: 4,
    borderColor: '#3B6AFF',
  },
  cornerTopRight: {
    position: 'absolute',
    top: -2,
    right: -2,
    width: 30,
    height: 30,
    borderTopWidth: 4,
    borderRightWidth: 4,
    borderColor: '#3B6AFF',
  },
  cornerBottomLeft: {
    position: 'absolute',
    bottom: -2,
    left: -2,
    width: 30,
    height: 30,
    borderBottomWidth: 4,
    borderLeftWidth: 4,
    borderColor: '#3B6AFF',
  },
  cornerBottomRight: {
    position: 'absolute',
    bottom: -2,
    right: -2,
    width: 30,
    height: 30,
    borderBottomWidth: 4,
    borderRightWidth: 4,
    borderColor: '#3B6AFF',
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default QrScreen;
