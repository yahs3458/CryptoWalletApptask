import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';
import Header from '../components/Header';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../navigation/RootNavigator';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

type TransferSuccessScreenRouteProp = RouteProp<RootStackParamList, 'TransferSuccess'>;
type TransferSuccessScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'TransferSuccess'>;

interface TransferSuccessScreenProps {
  route: TransferSuccessScreenRouteProp;
}

const TransferSuccessScreen = ({ route }: TransferSuccessScreenProps) => {
  const navigation = useNavigation<TransferSuccessScreenNavigationProp>();
  const { amount, currency } = route.params;

  return (
    <SafeAreaView style={styles.safeArea}>
      <LinearGradient
        colors={['#252531', '#181826']}
        start={{x: 0.5, y: 0}}
        end={{x: 0.5, y: 1}}
        style={[styles.container, styles.gradientContainer]}>
        <Header
          title="Jenny Lee"
          leftIcon={require('../assets/icons/back.png')}
          onLeftPress={() => navigation.navigate('Home')}
        />
        <View style={styles.contentContainer}>
          <LinearGradient
            colors={['#252531', '#1818260F']}
            start={{x: 0.5, y: 0}}
            end={{x: 0.5, y: 1}}
            style={styles.successContainer}>
            <Image 
              source={require('../assets/icons/tick.png')} 
              style={styles.successIcon} 
            />
            <Text style={styles.successTitle}>Transfer Success</Text>
            <View style={styles.amountContainer}>
              <Text style={styles.amountLabel}>Amount</Text>
              <Text style={styles.amountText}>
                {amount}
              </Text>
            </View>
            <Text style={styles.recipientName}>To Jenny Lee</Text>
            <TouchableOpacity 
              style={styles.homeButton}
              onPress={() => navigation.navigate('Home')}
            >
              <Text style={styles.homeButtonText}>Back</Text>
            </TouchableOpacity>
          </LinearGradient>
        </View>
      </LinearGradient>
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
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  successContainer: {
    alignItems: 'center',
    borderRadius: 32,
    padding: 32,
    width: '100%',
    minHeight: 600,
    justifyContent: 'flex-start',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  successIcon: {
    width: 120,
    height: 120,
    marginTop: 40,
    marginBottom: 40,
  },
  successTitle: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  amountContainer: {
    width: '100%',
    paddingHorizontal: 32,
    marginBottom: 24,
    alignItems: 'center',
  },
  amountLabel: {
    color: '#8E8E93',
    fontSize: 16,
    marginBottom: 8,
    textAlign: 'center',
  },
  amountText: {
    color: '#FFFFFF',
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  recipientName: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 24,
  },
  homeButton: {
    backgroundColor: '#2F80ED',
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 24,
    width: '100%',
    alignItems: 'center',
  },
  homeButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default TransferSuccessScreen;
