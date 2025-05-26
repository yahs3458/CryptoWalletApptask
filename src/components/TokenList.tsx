import React from 'react';
import { View, Text, Image, FlatList, StyleSheet } from 'react-native';

export const tokens = [
    {
      name: 'Bitcoin',
      symbol: 'BTC',
      icon: require('../assets/tokensicon/bitcoin.png'),
      price: '$22435.45',
      change: 2.05,
      amount: '0 BTC',
      usdValue: '$0',
    },
    {
      name: 'Ethereum',
      symbol: 'ETH',
      icon: require('../assets/tokensicon/etherium.png'),
      price: '$0.55',
      change: 5.65,
      amount: '0 ETH',
      usdValue: '$0',
    },
    {
      name: 'Tron',
      symbol: 'TRX',
      icon: require('../assets/tokensicon/tron.png'),
      price: '$22435.45',
      change: -5.03,
      amount: '0 TRX',
      usdValue: '$0',
    },
    {
      name: 'Tether',
      symbol: 'USDT',
      icon: require('../assets/tokensicon/tether.png'),
      price: '$0.99',
      change: -2.05,
      amount: '0 USDT',
      usdValue: '$0',
    },
    {
      name: 'USD Coin',
      symbol: 'USDC',
      icon: require('../assets/tokensicon/usd.png'),
      price: '$1.00',
      change: 0.01,
      amount: '0 USDC',
      usdValue: '$0',
    },
    {
      name: 'Solana',
      symbol: 'SOL',
      icon: require('../assets/tokensicon/solana.png'),
      price: '$150.23',
      change: 4.12,
      amount: '0 SOL',
      usdValue: '$0',
    },
  ];
  
  const Tokenlist = () =>{
    return(
      <FlatList 
      data={tokens}
      keyExtractor={(item) =>item.symbol}
     contentContainerStyle = {styles.container}
     renderItem={({item}) =>(
      <View style ={styles.tokenRow}>
        <Image source={item.icon} style={styles.icon}/>
        <View style={styles.namePrice}>
          <Text style={styles.name}>{item.name}</Text>
          <Text style={styles.price}>{item.price}</Text>
        </View>
        <Text 
        style={[styles.change,{color: item.change >= 0 ?'#4CAF50' : '#F44336' },
            ]}>
             {item.change >= 0 ? '▲' : '▼'} {Math.abs(item.change).toFixed(2)}%
            </Text>
            <View style={styles.amountContainer}>
            <Text style={styles.amount}>{item.amount}</Text>
            <Text style={styles.usd}>{item.usdValue}</Text>
          </View>
      </View>
     )}
      
      />
    )
  }

  const styles = StyleSheet.create({
    container: {
      padding: 16,
      backgroundColor: '#000',
    },
    tokenRow: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: '#1A1A1A',
      borderRadius: 12,
      padding: 12,
      marginBottom: 10,
    },
    icon: {
      width: 32,
      height: 32,
      marginRight: 12,
    },
    namePrice: {
      flex: 1,
    },
    name: {
      color: '#fff',
      fontWeight: 'bold',
    },
    price: {
      color: '#aaa',
      fontSize: 12,
    },
    change: {
      width: 70,
      textAlign: 'right',
      fontWeight: 'bold',
      fontSize: 12,
    },
    amountContainer: {
      alignItems: 'flex-end',
      marginLeft: 12,
    },
    amount: {
      color: '#fff',
    },
    usd: {
      color: '#aaa',
      fontSize: 12,
    },
  });
  
  export default Tokenlist;