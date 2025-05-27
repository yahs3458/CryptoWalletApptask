import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Image, Modal } from 'react-native';
import BottomTabBar from '../components/BottomTabs';
import { SafeAreaView } from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';
import Header from '../components/Header';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation/RootNavigator';


type SendScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Send'>;

interface SendScreenProps {
  navigation: SendScreenNavigationProp;
}

const SendScreen = ({ navigation }: SendScreenProps) => {
  const [amount, setAmount] = useState('');
  const [currency, setCurrency] = useState<'BTC' | 'USD'>('BTC');
  const [addressVisible, setAddressVisible] = useState(false);
  const [scannedAddress, setScannedAddress] = useState('');
  const [showScanner, setShowScanner] = useState(false);

  // Simulated wallet balance
  const btcBalance = 0.05;
  const btcToUsd = 44346.95;
  const usdBalance = btcBalance * btcToUsd;

  const numericAmount = parseFloat(amount) || 0;
  const remainingBalance = currency === 'BTC'
    ? (btcBalance - numericAmount)
    : (usdBalance - numericAmount);



  return (
    <SafeAreaView style={styles.safeArea}>
      <LinearGradient
        colors={['#252531', '#181826']}
        start={{x: 0.5, y: 0}}
        end={{x: 0.5, y: 1}}
        style={[styles.container, styles.gradientContainer]}>
        <Header
          title="Send"
          leftIcon={require('../assets/icons/back.png')}
          onLeftPress={() => navigation.goBack()}
        />
        <View style={styles.contentContainer}>
          {/* Coin icon and title */}
          <View style={styles.centered}>
            <Image source={require('../assets/tokensicon/bitwhite.png')} style={styles.coinIcon} />
            <Text style={styles.title}>Enter Amount</Text>
            <TextInput
              style={styles.amountInput}
              value={amount}
              onChangeText={setAmount}
              keyboardType="numeric"
              placeholder="0"
              placeholderTextColor="#444"
            />
            <Text style={styles.usdText}>
              ${currency === 'BTC' ? (numericAmount * btcToUsd).toFixed(2) : (numericAmount).toFixed(2)}
            </Text>
          </View>

          {/* Card containing Remaining Balance and Continue Button */}
          <View style={styles.card}>
            {/* Remaining Balance */}
            <View style={styles.balanceContainer}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Text style={styles.balanceText}>Remaining Balance</Text>
              </View>

              <Text style={styles.balanceAmount}>
                {currency === 'BTC'
                  ? `${remainingBalance.toFixed(8)} BTC`
                  : `$${remainingBalance.toFixed(2)}`}
              </Text>

              {/* Currency Toggle */}
              <View style={styles.switchContainer}>
                <TouchableOpacity
                  style={[styles.switchButton, currency === 'BTC' && styles.activeSwitch]}
                  onPress={() => setCurrency('BTC')}
                >
                  <Image source={require('../assets/tokensicon/bitcurrency.png')} style={styles.switchIcon} />
                  <Text style={[styles.switchText, currency === 'BTC' && styles.activeText]}>BTC</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.switchButton, currency === 'USD' && styles.activeSwitch]}
                  onPress={() => setCurrency('USD')}
                >
                  <Image source={require('../assets/tokensicon/usdcurrency.png')} style={styles.switchIcon} />
                  <Text style={[styles.switchText, currency === 'USD' && styles.activeText]}>USD</Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* Continue Button */}
            <TouchableOpacity style={styles.continueButton} onPress={() => setShowScanner(true)}>
              <Text style={styles.continueText}>Continue</Text>
            </TouchableOpacity>
          </View>

          {/* BTC Address */}
          {addressVisible && (
            <View style={styles.addressContainer}>
              <Text style={styles.addressLabel}>Address</Text>
              <View style={styles.addressBox}>
                <Text style={styles.addressText}>
                  {scannedAddress || '98A5...BECB4FDBF990A89DF199'}
                </Text>
                <TouchableOpacity onPress={() => setShowScanner(true)}>
                  <Image source={require('../assets/icons/scan.png')} style={styles.copyIcon} />
                </TouchableOpacity>
              </View>
            </View>
          )}
        </View>
      </LinearGradient>
      <BottomTabBar />

    
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#181826',
  },
  container: {
    flex: 1,
  },
  gradientContainer: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    overflow: 'hidden',
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 5,
    paddingBottom: 80,
  },
  centered: {
    alignItems: 'center',
    marginTop: 5,
    marginBottom: 10,
  },
  card: {
    backgroundColor: '#1C1C1E',
    borderRadius: 12,
    padding: 10,
    marginTop: 10,
    marginBottom: 10,
  },
  coinIcon: {
    width: 50,
    height: 50,
    marginBottom: 8,
  },
  iconCircle: {
    // backgroundColor: '#2F80ED',
    // borderRadius: 15,
    // width: 30,
    // height: 30,
    // justifyContent: 'center',
    // alignItems: 'center',
    // marginRight: 6,
  },
  title: {
    color: '#888',
    fontSize: 16,
    marginBottom: 8,
  },
  amountInput: {
    color: '#fff',
    fontSize: 42,
    fontWeight: '600',
    marginVertical: 4,
    marginBottom: 8,
  },
  usdText: {
    color: '#666',
    fontSize: 16,
    marginBottom: 12,
  },
  balanceContainer: {
    backgroundColor: '#1C1C1E',
    borderRadius: 12,
    padding: 10,
    marginBottom: 10,
  },
  balanceText: {
    color: '#888',
    fontSize: 14,
    marginBottom: 4,
  },
  balanceAmount: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
    marginTop: 2,
    marginBottom: 8,
  },
  switchContainer: {
    flexDirection: 'row',
    backgroundColor: '#1C1C25',
    borderRadius: 30,
    padding: 4,
    justifyContent: 'space-around',
    alignItems: 'center',
    marginBottom: 10,
  },
  switchButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 6,
    paddingHorizontal: 16,
    borderRadius: 20,
  },
  switchIcon: {
    width: 40,
    height: 40,
    marginRight: 6,
  },
  switchText: {
    color: '#888',
    fontSize: 14,
    fontWeight: 'bold',
  },
  activeSwitch: {
    backgroundColor: '#2F2F3A',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  activeText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  addressContainer: {
    marginTop: 8,
    marginBottom: 12,
  },
  addressLabel: {
    color: '#888',
    fontSize: 14,
    marginBottom: 6,
  },
  addressBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#1A1A1C',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 10,
  },
  addressText: {
    color: '#fff',
    fontSize: 13,
    flex: 1,
    marginRight: 8,
  },
  copyIcon: {
    width: 18,
    height: 18,
    tintColor: '#888',
    marginBottom: 2,
  },
  continueButton: {
    backgroundColor: '#2F80ED',
    borderRadius: 10,
    paddingVertical: 10,
    alignItems: 'center',
    marginTop: 12,
    marginBottom: 12,
  },
  continueText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default SendScreen;