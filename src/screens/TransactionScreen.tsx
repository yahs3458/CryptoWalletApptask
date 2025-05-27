import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
} from 'react-native';
import Header from '../components/Header';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import LinearGradient from 'react-native-linear-gradient';

type RootStackParamList = {
  Settings: undefined;
  QrScreen: undefined;
  Transaction: undefined;
};

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

interface Transaction {
  id: string;
  type: string;
  icon: any;
  amount: string;
  currency: string;
  time: string;
  date: string;
  value: string;
}

interface GroupedTransactions {
  [key: string]: Transaction[];
}

const transactions: Transaction[] = [
    // 14 September
    {
      id: '1',
      type: 'Sent',
      icon: require('../assets/icons/sentransaction.png'),
      amount: '-100.00',
      currency: 'USDT',
      time: '12:23:11',
      date: '14 September',
      value: '$99.99',
    },
    {
      id: '2',
      type: 'Retrieved',
      icon: require('../assets/icons/reterivedtransaction.png'),
      amount: '+0.00113388',
      currency: 'BTC',
      time: '12:23:11',
      date: '14 September',
      value: '$10,234.23',
    },
  
    // 13 September
    {
      id: '3',
      type: 'Exchanged',
      icon: require('../assets/icons/exchanges.png'),
      amount: '0.0058459',
      currency: 'BTC',
      time: '12:23:11',
      date: '13 September',
      value: '$10,234.23',
    },
    {
      id: '4',
      type: 'Retrieved',
      icon: require('../assets/icons/reterivedtransaction.png'),
      amount: '+0.00113388',
      currency: 'BTC',
      time: '12:23:11',
      date: '13 September',
      value: '$10,234.23',
    },
    {
      id: '5',
      type: 'Sent',
      icon: require('../assets/icons/sentransaction.png'),
      amount: '-100.00',
      currency: 'USDT',
      time: '12:23:11',
      date: '13 September',
      value: '$99.99',
    },
  
    // 12 September
    {
      id: '6',
      type: 'Sent',
      icon: require('../assets/icons/sentransaction.png'),
      amount: '-100.00',
      currency: 'USDT',
      time: '12:23:11',
      date: '12 September',
      value: '$99.99',
    },
    {
      id: '7',
      type: 'Retrieved',
      icon: require('../assets/icons/reterivedtransaction.png'),
      amount: '+0.00089754',
      currency: 'BTC',
      time: '13:00:45',
      date: '12 September',
      value: '$9,876.45',
    },
    {
      id: '8',
      type: 'Sent',
      icon: require('../assets/icons/sentransaction.png'),
      amount: '-250.00',
      currency: 'USDT',
      time: '14:50:12',
      date: '12 September',
      value: '$249.99',
    },
  
    // 11 September
    {
      id: '9',
      type: 'Exchanged',
      icon: require('../assets/icons/exchanges.png'),
      amount: '0.0045123',
      currency: 'BTC',
      time: '09:15:00',
      date: '11 September',
      value: '$8,423.12',
    },
    {
      id: '10',
      type: 'Retrieved',
      icon: require('../assets/icons/reterivedtransaction.png'),
      amount: '+0.00100000',
      currency: 'BTC',
      time: '11:00:00',
      date: '11 September',
      value: '$10,000.00',
    },
    {
      id: '11',
      type: 'Sent',
      icon: require('../assets/icons/sentransaction.png'),
      amount: '-75.00',
      currency: 'USDT',
      time: '18:32:21',
      date: '11 September',
      value: '$74.99',
    },
  ];
  
  
const TransactionScreen = () => {
  const navigation = useNavigation<NavigationProp>();
  const [showSearchInput, setShowSearchInput] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredTransactions = useMemo(() => {
    if (!searchQuery.trim()) return transactions;
    
    const query = searchQuery.toLowerCase();
    return transactions.filter(tx => 
      tx.type.toLowerCase().includes(query) ||
      tx.currency.toLowerCase().includes(query) ||
      tx.amount.toLowerCase().includes(query)
    );
  }, [searchQuery]);

  const grouped = useMemo(() => {
    return filteredTransactions.reduce<GroupedTransactions>((acc, item) => {
      if (!acc[item.date]) acc[item.date] = [];
      acc[item.date].push(item);
      return acc;
    }, {});
  }, [filteredTransactions]);

  const handleClearAndHideSearch = () => {
    setSearchQuery('');
    setShowSearchInput(false);
  };

  return (
    <LinearGradient
      colors={['#252531', '#181826']}
      style={styles.container}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
    >
      <Header 
        title="TRANSACTIONS"
        leftIcon={require('../assets/icons/back.png')}
        rightIcon={require('../assets/icons/scan.png')}
        onLeftPress={() => navigation.goBack()}
        onRightPress={() => navigation.navigate('QrScreen')}
      />

      {/* Icons row below header - visible only when search bar is hidden */}
      {!showSearchInput && (
        <View style={styles.actionRow}>
           {/* Filter icon remains here */}
           <Image
              source={require('../assets/icons/fillterfilled.png')}
              style={styles.actionIcon}
            />
            {/* Search icon appears only when search bar is hidden and toggles search input */}
            <TouchableOpacity onPress={() => setShowSearchInput(true)}>
              <Image
                source={require('../assets/icons/search.png')}
                style={styles.actionIcon}
              />
            </TouchableOpacity>
        </View>
      )}

      {/* Search Input - visible only when search icon is clicked */}
      {showSearchInput && (
        <View style={styles.searchBar}>
           {/* Filter icon inside search bar */}
           <Image
            source={require('../assets/icons/fillterfilled.png')}
            style={styles.searchBarIcon}
          />
           {/* Calendar icon inside search bar */}
           <Image
            source={require('../assets/icons/calendar.png')}
            style={styles.searchBarIcon}
          />
          {/* Search input and inner search icon/clear button */}
          <View style={styles.searchInputContainer}>
             {/* Search icon inside input field */}
             <Image
              source={require('../assets/icons/search.png')}
              style={styles.searchIcon}
            />
            <TextInput
              placeholder="Search transactions..."
              placeholderTextColor="#999"
              style={styles.searchInput}
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
            {/* Cross icon inside search bar to clear and hide - always visible when search bar is shown */}
            <TouchableOpacity onPress={handleClearAndHideSearch}>
              <Text style={{ color: '#aaa', fontSize: 16 }}>✕</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

      {/* Transaction List */}
      <FlatList
        data={Object.entries(grouped)}
        keyExtractor={([date]) => date}
        renderItem={({ item }) => (
          <View>
            <Text style={styles.dateLabel}>{item[0]}</Text>
            {item[1].map(tx => (
              <View key={tx.id} style={styles.transactionRow}>
                <View style={styles.leftSide}>
                  <Image source={tx.icon} style={styles.txIcon} />
                  <View>
                    <Text style={styles.txType}>{tx.type}</Text>
                    <Text style={styles.txTime}>{tx.time}</Text>
                  </View>
                </View>
                <View style={{ alignItems: 'flex-end' }}>
                  <Text
                    style={[
                      styles.txAmount,
                      {
                        color: tx.amount.startsWith('-') ? '#FF4444' : '#4CAF50',
                      },
                    ]}
                  >
                    {tx.amount} {tx.currency}
                  </Text>
                  <Text style={styles.txValue}>{tx.value}</Text>
                </View>
              </View>
            ))}
          </View>
        )}
      />
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 0,
  },
  actionRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingHorizontal: 16,
    marginTop: 12,
    gap: 10,
  },
  actionIcon: {
    width: 24,
    height: 24,
    tintColor: '#aaa',
  },
  searchBar: {
    marginHorizontal: 16,
    marginTop: 12,
    marginBottom: 12,
    flexDirection: 'row',
    backgroundColor: '#1E1F2A',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
    gap: 10,
  },
  searchInputContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  searchInput: {
    flex: 1,
    color: 'white',
  },
  searchBarIcon: {
    width: 20,
    height: 20,
    tintColor: '#aaa',
  },
  searchIcon: {
    width: 18,
    height: 18,
    tintColor: '#aaa',
  },
  dateLabel: {
    color: '#888',
    marginTop: 20,
    marginBottom: 5,
    marginHorizontal: 16,
    fontWeight: '600',
  },
  transactionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomColor: '#333',
    borderBottomWidth: 1,
  },
  leftSide: {
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
  },
  txIcon: {
    width: 30,
    height: 30,
    resizeMode: 'contain',
  },
  txType: {
    color: 'white',
    fontWeight: '500',
  },
  txTime: {
    color: '#888',
    fontSize: 12,
  },
  txAmount: {
    fontWeight: 'bold',
  },
  txValue: {
    color: '#888',
    fontSize: 12,
  },
});

export default TransactionScreen;
