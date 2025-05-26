import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useRoute } from '@react-navigation/native';

const CurrencyScreen = () => {
  const route = useRoute();
 // const { tokenName, tokenPrice } = route.params;

  return (
    <View style={styles.container}>
      <Text>Currency Details Screen</Text>
      {/* <Text>Token Name: {tokenName}</Text>
      <Text>Token Price: {tokenPrice}</Text> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default CurrencyScreen; 