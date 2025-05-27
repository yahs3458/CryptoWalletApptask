import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Share,
  Image,
  SafeAreaView,
  TextInput,
  Modal,
  FlatList,
} from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import Clipboard from '@react-native-clipboard/clipboard';
import LinearGradient from 'react-native-linear-gradient';
import Header from '../components/Header';
import BottomTabBar from '../components/BottomTabs';

const networkOptions = [
  { id: '1', name: 'Ethereum', symbol: 'ETH' },
  { id: '2', name: 'Bitcoin', symbol: 'BTC' },
  { id: '3', name: 'Binance Smart Chain', symbol: 'BSC' },
  { id: '4', name: 'Polygon', symbol: 'MATIC' },
  { id: '5', name: 'Solana', symbol: 'SOL' },
  { id: '6', name: 'Avalanche', symbol: 'AVAX' },
];

const generateRandomHex = (length: number) => {
  const chars = 'ABCDEF0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
};

const ReceiveScreen = ({navigation}: any) => {
  const [walletAddress, setWalletAddress] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState('Network');
  const [ownerName, setOwnerName] = useState('John Doe'); // You can replace this with actual user name

  useEffect(() => {
    const newAddress = generateRandomHex(40);
    setWalletAddress(newAddress);
  }, []);

  const copyToClipboard = () => {
    Clipboard.setString(walletAddress);
   
  };

  const shareAddress = async () => {
    try {
      await Share.share({message: walletAddress});
    } catch (error) {
      Alert.alert('Error', 'Failed to share address.');
    }
  };

  const handleSelectOption = (option: { name: string; symbol: string }) => {
    setSelectedOption(`${option.name} (${option.symbol})`);
    setIsDropdownOpen(false);
  };

  const getQRValue = () => {
    return JSON.stringify({
      address: walletAddress,
      owner: ownerName,
      network: selectedOption
    });
  };

  const renderOption = ({ item }: { item: { id: string; name: string; symbol: string } }) => (
    <TouchableOpacity
      style={styles.optionItem}
      onPress={() => handleSelectOption(item)}>
      <Text style={styles.optionText}>{item.name}</Text>
      <Text style={styles.optionSymbol}>{item.symbol}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <LinearGradient
        colors={['#252531', '#181826']}
        start={{x: 0.5, y: 0}}
        end={{x: 0.5, y: 1}}
        style={[styles.container, styles.gradientContainer]}>
        <Header
          title="Receive"
          leftIcon={require('../assets/icons/back.png')}
          onLeftPress={() => navigation.goBack()}
          onRightPress={() => console.log('Scan')}
        />
        <View style={styles.contentContainer}>
          <View style={styles.dropdownContainer}>
            <TextInput
              style={styles.dropdownInput}
              value={selectedOption}
              editable={false}
              placeholder="Network"
              placeholderTextColor="#666"
            />
            <TouchableOpacity 
              style={styles.dropdownIcon}
              onPress={() => setIsDropdownOpen(!isDropdownOpen)}>
              <Image
                source={isDropdownOpen 
                  ? require('../assets/icons/optionclose.png')
                  : require('../assets/icons/optionopen.png')}
                style={styles.iconSmall}
              />
            </TouchableOpacity>
          </View>

          <Modal
            visible={isDropdownOpen}
            transparent={true}
            animationType="fade"
            onRequestClose={() => setIsDropdownOpen(false)}>
            <TouchableOpacity
              style={styles.modalOverlay}
              activeOpacity={1}
              onPress={() => setIsDropdownOpen(false)}>
              <View style={styles.dropdownList}>
                <FlatList
                  data={networkOptions}
                  renderItem={renderOption}
                  keyExtractor={(item) => item.id}
                  showsVerticalScrollIndicator={false}
                />
              </View>
            </TouchableOpacity>
          </Modal>

          <View style={styles.card}>
            {walletAddress ? (
              <QRCode value={getQRValue()} size={200} />
            ) : null}

            <View style={styles.addressContainer}>
              <Text style={styles.address} numberOfLines={2}>
                {walletAddress}
              </Text>
              <TouchableOpacity
                style={styles.copyButton}
                onPress={copyToClipboard}>
                <Image
                  source={require('../assets/icons/copy.png')}
                  style={styles.iconSmall}
                />
              </TouchableOpacity>
            </View>

            <View style={styles.divider} />

            <TouchableOpacity style={styles.shareButton} onPress={shareAddress}>
              <Image
                source={require('../assets/icons/share.png')}
                style={styles.iconTiny}
              />
              <Text style={styles.shareText}>Share</Text>
            </TouchableOpacity>
          </View>
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
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 20, // Reduced padding since BottomTabs will add its own spacing
  },
  card: {
    backgroundColor: '#252531',
    padding: 20,
    borderRadius: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  addressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
    width: '100%',
    paddingHorizontal: 10,
  },
  address: {
    color: '#fff',
    fontSize: 12,
    flex: 1,
    marginRight: 10,
  },
  copyButton: {
    padding: 5,
  },
  divider: {
    height: 1,
    width: '100%',
    marginVertical: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
  },
  shareButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 14,
    borderColor: '#fff',
    borderWidth: 1,
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  shareText: {
    color: '#fff',
    fontSize: 14,
  },
  iconSmall: {
    width: 22,
    height: 22,
    resizeMode: 'contain',
  },
  iconTiny: {
    width: 16,
    height: 16,
    resizeMode: 'contain',
    marginRight: 8,
  },
  dropdownContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.3)',
    paddingBottom: 10,
  },
  dropdownInput: {
    flex: 1,
    color: '#fff',
    fontSize: 16,
    paddingVertical: 8,
  },
  dropdownIcon: {
    padding: 5,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dropdownList: {
    backgroundColor: '#252531',
    borderRadius: 12,
    width: '90%',
    maxHeight: 300,
    padding: 10,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  optionItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.3)',
  },
  optionText: {
    color: '#fff',
    fontSize: 16,
  },
  optionSymbol: {
    color: '#666',
    fontSize: 14,
  },
  ownerName: {
    color: '#fff',
    fontSize: 16,
    marginTop: 10,
    marginBottom: 5,
  },
});

export default ReceiveScreen;
