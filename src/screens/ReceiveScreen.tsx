import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, Share } from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import Clipboard from '@react-native-clipboard/clipboard'; 

const generateRandomHex = (length: number) => {
  const chars = 'ABCDEF0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
};

const ReceiveScreen = () => {
  const [walletAddress, setWalletAddress] = useState('');

  useEffect(() => {
    const newAddress = generateRandomHex(40); // 40-character hex address
    setWalletAddress(newAddress);
  }, []);

  const copyToClipboard = () => {
    Clipboard.setString(walletAddress);
    Alert.alert('Copied', 'Wallet address copied to clipboard!');
  };

  const shareAddress = async () => {
    try {
      await Share.share({ message: walletAddress });
    } catch (error) {
      Alert.alert('Error', 'Failed to share address.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>RECEIVE BTC</Text>

      <View style={styles.qrContainer}>
        {walletAddress ? <QRCode value={walletAddress} size={200} /> : null}

        <Text style={styles.address}>{walletAddress}</Text>

        <TouchableOpacity style={styles.copyButton} onPress={copyToClipboard}>
          <Text style={styles.copyText}>Copy</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.shareButton} onPress={shareAddress}>
          <Text style={styles.shareText}>Share</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0A0A0A', padding: 20 },
  title: { fontSize: 20, color: '#fff', textAlign: 'center', marginVertical: 20 },
  qrContainer: {
    backgroundColor: '#161616',
    padding: 20,
    borderRadius: 12,
    alignItems: 'center',
  },
  address: {
    color: '#fff',
    marginTop: 20,
    fontSize: 12,
    textAlign: 'center',
  },
  copyButton: {
    marginTop: 10,
    paddingVertical: 8,
    paddingHorizontal: 20,
    backgroundColor: '#2D4EFF',
    borderRadius: 8,
  },
  copyText: { color: '#fff', fontSize: 14 },
  shareButton: {
    marginTop: 10,
    borderColor: '#fff',
    borderWidth: 1,
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  shareText: { color: '#fff', fontSize: 14 },
});

export default ReceiveScreen;
