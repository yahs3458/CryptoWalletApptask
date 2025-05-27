import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList, RootStackNavigationProp } from '../navigationTypes';

export type TokenItemProps = {
  item: {
    name: string;
    symbol: string;
    icon: any;
    price: string;
    change: number;
    amount: string;
    usdValue: string;
  };
};

const TokenItem: React.FC<TokenItemProps> = ({ item }) => {
  const navigation = useNavigation<RootStackNavigationProp>();

  const handlePress = () => {
    navigation.navigate('CurrencyDetail', { currencyName: item.name });
  };
  return (
    <TouchableOpacity style={styles.tokenRow} onPress={handlePress}>
    <View style={styles.leftSection}>
      <Image source={item.icon} style={styles.icon} />
      <View>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.symbol}>{item.symbol}</Text>
      </View>
    </View>

    <View style={styles.centerSection}>
      <Text style={styles.price}>{item.price}</Text>
      <Text
        style={[
          styles.change,
          { color: item.change >= 0 ? '#4CAF50' : '#F44336' },
        ]}
      >
        {item.change >= 0 ? '▲' : '▼'} {Math.abs(item.change).toFixed(2)}%
      </Text>
    </View>

    <View style={styles.rightSection}>
      <Text style={styles.amount}>{item.amount}</Text>
      <Text style={styles.usd}>{item.usdValue}</Text>
    </View>
  </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  tokenRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: 16,
    paddingVertical: 14,
    paddingHorizontal: 16,
    marginBottom: 12,
    marginHorizontal: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
  },
  leftSection: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  icon: {
    width: 36,
    height: 36,
    marginRight: 12,
  },
  name: {
    color: '#ffffff',
    fontWeight: '600',
    fontSize: 14,
  },
  symbol: {
    color: '#aaa',
    fontSize: 12,
  },
  centerSection: {
    alignItems: 'flex-end',
    marginRight: 12,
  },
  price: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '600',
  },
  change: {
    fontSize: 12,
    fontWeight: '500',
  },
  rightSection: {
    alignItems: 'flex-end',
  },
  amount: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '500',
  },
  usd: {
    color: '#666',
    fontSize: 12,
  },
});

export default TokenItem;
