import React from 'react';
import { View, Text, Image, TouchableOpacity, TextInput, StyleSheet, ScrollView, SafeAreaView } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Header from '../components/Header';
import BottomTabBar from '../components/BottomTabs';

const ExchangeScreen = ({ navigation }: any) => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <Header
        title="Exchange"
        leftIcon={require('../assets/icons/back.png')}
        onLeftPress={() => navigation.goBack()}
      />
      <ScrollView style={styles.container}>
        {/* Title (removed as per image) */}

        {/* Combined From/To Section in a single card */}
        <LinearGradient
          colors={['#252531', '#181826']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.card}
        >
          {/* From Section */}
          <Text style={styles.label}>From</Text>
          <View style={styles.currencyInputRow}>
            <TouchableOpacity style={styles.currencySelector}>
              <Image source={require('../assets/tokensicon/bitcurrency.png')} style={styles.icon} />
              <Text style={styles.currencyText}>BTC</Text>
              <Image source={require('../assets/icons/chevron-down.png')} style={styles.dropdownIcon} />
            </TouchableOpacity>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.amountInput}
                value="0.01912343"
                placeholder="0.00"
                placeholderTextColor="#aaa"
                keyboardType="decimal-pad"
              />
            </View>
          </View>
          <Text style={styles.balanceText}>Balance: 0.01912343 BTC</Text>

          {/* Swap Button */}
          <View style={styles.swapButtonWrapper}> 
            <View style={styles.swapLine} />
            <TouchableOpacity style={styles.swapButton}>
              <Image source={require('../assets/icons/exchange.png')} style={{ width: 20, height: 20 }} />
            </TouchableOpacity>
          </View>

          {/* To Section */}
          <Text style={styles.label}>To</Text> 
          <View style={styles.currencyInputRow}>
            <TouchableOpacity style={styles.currencySelector}>
              <Image source={require('../assets/icons/currency.png')} style={styles.icon} />
              <Text style={styles.currencyText}>USDT</Text>
              <Image source={require('../assets/icons/chevron-down.png')} style={styles.dropdownIcon} />
            </TouchableOpacity>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.amountInput}
                value="0.01912343"
                placeholder="0.00"
                placeholderTextColor="#aaa"
                keyboardType="decimal-pad"
              />
            </View>
          </View>
          <Text style={styles.balanceText}>Balance: 0.01912343 USDT</Text>
        </LinearGradient>

        {/* Exchange Rate */}
        <LinearGradient
          colors={['#252531', '#181826']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.exchangeRateBox}
        >
          <Text style={styles.exchangeRateLabel}>Exchange Rate</Text>
          <Text style={styles.exchangeRateValue}>BTC/USDT   4.67654376</Text>
        </LinearGradient>

        {/* Exchange Button */}
        <TouchableOpacity style={styles.exchangeBtn}>
          <Text style={styles.exchangeBtnText}>Exchange</Text>
        </TouchableOpacity>
      </ScrollView>
      <BottomTabBar />
    </SafeAreaView>
  );
};

export default ExchangeScreen;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#0E0F24',
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  title: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    alignSelf: 'center',
    marginBottom: 20,
  },
  card: {
    borderRadius: 20,
    padding: 15,
    marginBottom: 10,
  },
  label: {
    color: '#808099',
    fontSize: 12,
    marginBottom: 10,
  },
  currencyInputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  currencySelector: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 10,
  },
  inputContainer: {
    flex: 1,
    alignItems: 'flex-end',
  },
  icon: {
    width: 22,
    height: 22,
    marginRight: 8,
  },
  currencyText: {
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: 14,
    marginRight: 5,
  },
  dropdownIcon: {
    width: 10,
    height: 6,
    tintColor: '#FFFFFF',
  },
  amountInput: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
    paddingVertical: 0,
    textAlign: 'right',
    width: '100%',
  },
  balanceText: {
    color: '#808099',
    fontSize: 12,
    marginTop: 5,
    textAlign: 'right',
  },
  swapButtonWrapper: {
    alignItems: 'center',
    marginVertical: 10,
    position: 'relative',
    height: 60,
  },
  swapButton: {
    backgroundColor: '#2C2E4E',
    width: 42,
    height: 42,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1,
  },
  swapLine: {
    position: 'absolute',
    height: 2,
    width: '100%',
    backgroundColor: '#2C2E4E',
    top: '50%',
    marginTop: -1,
  },
  exchangeRateBox: {
    borderRadius: 15,
    paddingVertical: 25,
    paddingHorizontal: 15,
    marginVertical: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  exchangeRateLabel: {
    color: '#808099',
    fontSize: 12,
    marginBottom: 5,
    fontWeight: '600',
  },
  exchangeRateValue: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
  exchangeBtn: {
    backgroundColor: '#2563EB',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 30,
  },
  exchangeBtnText: {
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: 16,
  },
});
