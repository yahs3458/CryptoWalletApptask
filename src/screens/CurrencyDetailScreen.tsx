import { StyleSheet, Text, View, Dimensions, ScrollView, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import Header from '../components/Header'
import { RouteProp, useNavigation, NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '../navigation/RootNavigator';
import BottomTabs from '../components/BottomTabs';

// Define the type for route parameters
type CurrencyDetailScreenRouteProp = RouteProp<{ CurrencyDetail: { currencyName: string } }, 'CurrencyDetail'>;

interface CurrencyDetailScreenProps {
  route: CurrencyDetailScreenRouteProp;
}

const CurrencyDetailScreen: React.FC<CurrencyDetailScreenProps> = ({ route }) => {
  const { currencyName } = route.params || { currencyName: 'Currency' };
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  return (
    <View style={styles.container}>
      <Header
        title={currencyName}
        leftIcon={require('../assets/icons/back.png')}
        onLeftPress={() => navigation.goBack()}
        rightIcon={require('../assets/icons/settings2.png')}
      />
      <View style={styles.priceContainer}>
        <Text style={styles.currentPrice}>$ 61.03</Text>
        <Text style={styles.priceChange}>(+0.023189)</Text>
        <View style={styles.percentageChangeButton}>
          <Text style={styles.percentageChangeText}>▲ 2991.28 %</Text>
        </View>
      </View>

      <View style={styles.timeRangeContainer}>
        <Text style={styles.timeRangeText}>1 h</Text>
        <Text style={styles.timeRangeText}>24 h</Text>
        <Text style={styles.timeRangeText}>1 w</Text>
        <Text style={styles.timeRangeText}>1 m</Text>
        <Text style={styles.timeRangeText}>3 m</Text>
        <Text style={styles.selectedTimeRange}>1 year</Text>
        <Text style={styles.timeRangeText}>All time</Text>
      </View>

      <View style={styles.graphContainer}>
        <Image
          source={require('../assets/icons/Chart.png')}
          style={styles.chartImage}
          resizeMode="cover"
        />
      </View>

      <View style={styles.priceDetailsContainer}>
        <View style={[styles.priceCard, { backgroundColor: '#383A46' }]}>
          <Text style={styles.priceCardTitle}>Max price</Text>
          <Text style={styles.priceCardValue}>$0.9999</Text>
          <Text style={styles.priceCardDate}>July 11, 2022, 6:04 p.m.</Text>
        </View>
        <View style={[styles.priceCard, { backgroundColor: '#464D6854' }]}>
          <Text style={styles.priceCardTitle}>Min. price.</Text>
          <Text style={styles.priceCardValue}>$0.9999</Text>
          <Text style={styles.priceCardDate}>July 11, 2022, 03:23</Text>
        </View>
      </View>

      <TouchableOpacity style={styles.transactionButton} onPress={() => navigation.navigate('Transaction')}>
        <Text style={styles.transactionButtonText}>Transaction</Text>
      </TouchableOpacity>

      <BottomTabs />

    </View>
  )
}

export default CurrencyDetailScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#11101C',
  },
  priceContainer: {
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  currentPrice: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginRight: 8,
  },
  priceChange: {
    fontSize: 16,
    color: '#AAA',
    marginRight: 8,
  },
  percentageChangeButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 'auto',
  },
  percentageChangeText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: 'bold',
  },
  timeRangeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    marginTop: 8,
    marginBottom: 16,
  },
  timeRangeText: {
    color: '#AAA',
    fontSize: 14,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  selectedTimeRange: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: 'bold',
    backgroundColor: '#28283D',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  graphContainer: {
    width: Dimensions.get('window').width - 32,
    height: Dimensions.get('window').width - 32,
    backgroundColor: '#28283D',
    marginHorizontal: 16,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
  },
  graphPlaceholderText: {
    color: '#AAA',
    fontSize: 16,
  },
  chartImage: {
    width: '100%',
    height: '100%',
  },
  priceDetailsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    marginTop: 16,
  },
  priceCard: {
    borderRadius: 8,
    padding: 12,
    width: '48%',
  },
  priceCardTitle: {
    color: '#AAA',
    fontSize: 12,
    marginBottom: 4,
  },
  priceCardValue: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  priceCardDate: {
    color: '#AAA',
    fontSize: 10,
  },
  transactionButton: {
    backgroundColor: '#007BFF',
    paddingVertical: 14,
    marginHorizontal: 16,
    borderRadius: 8,
    marginTop: 24,
    alignItems: 'center',
  },
  transactionButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  bottomNavPlaceholder: {
    height: 60,
    backgroundColor: '#1E1D2E',
    marginTop: 'auto',
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottomNavText: {
    color: '#AAA',
    fontSize: 14,
  },
})