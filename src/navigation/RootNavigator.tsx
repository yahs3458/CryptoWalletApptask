import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import BottomTabs from '../components/BottomTabs';
import HomeScreen from '../screens/HomeScreen';
import OnboardingScreen from '../screens/OnboardingScreen';
import ReceiveScreen from '../screens/ReceiveScreen';
import SendScreen from '../screens/SendScreen';
import QrScreen from '../screens/QrScreen';
import TransferSuccessScreen from '../screens/TransferSuccessScreen';
import TransactionScreen from '../screens/TransactionScreen';
import ExchangeScreen from '../screens/Exchange';
import CurrencyDetailScreen from '../screens/CurrencyDetailScreen';

export type RootStackParamList = {
  Main: undefined;
  Onboarding: undefined;
  Receive: undefined;
  Home: undefined;
  Send: {
    recipientAddress: string;
    recipientName: string;
  };
  QrScreen: undefined;
  Transfer: undefined;
  TransferSuccess: {
    amount: string;
    currency: 'BTC' | 'USD';
  };
  Transaction:undefined;
  Exchange: undefined;
  CurrencyDetail: { currencyName: string };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const RootNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="Onboarding">
      <Stack.Screen
        name="Onboarding"
        component={OnboardingScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Receive"
        options={{headerShown: false}}
        component={ReceiveScreen}
      />
       <Stack.Screen
        name="Send"
        options={{headerShown: false}}
        component={SendScreen}
      />
      <Stack.Screen
        name="QrScreen"
        options={{headerShown: false}}
        component={QrScreen}
      />
      <Stack.Screen
        name="TransferSuccess"
        options={{headerShown: false}}
        component={TransferSuccessScreen}
      />
      <Stack.Screen
        name="Transaction"
        options={{headerShown: false}}
        component={TransactionScreen}
      />
      <Stack.Screen
        name="Exchange"
        options={{headerShown: false}}
        component={ExchangeScreen}
      />
      <Stack.Screen
        name="CurrencyDetail"
        options={{headerShown: false}}
        component={CurrencyDetailScreen}
      />
    </Stack.Navigator>
  );
};

export default RootNavigator;
