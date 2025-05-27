import { NavigatorScreenParams } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
// import { TokenItemProps } from './components/TokenItem'; // Adjust the import path if necessary - This import is no longer needed for the type definition

export type RootStackParamList = {
  Main: undefined; // Added from RootNavigator
  Onboarding: undefined; // Added from RootNavigator
  Receive: undefined; // Added from RootNavigator
  Home: undefined;
  Send: { // Added from RootNavigator
    recipientAddress: string;
    recipientName: string;
  };
  QrScreen: undefined; // Added from RootNavigator
  Transfer: undefined; // Added from RootNavigator
  TransferSuccess: { // Added from RootNavigator
    amount: string;
    currency: 'BTC' | 'USD';
  };
  Transaction:undefined; // Added from RootNavigator
  Exchange: undefined; // Added from RootNavigator
  CurrencyDetail: { currencyName: string }; // Corrected to match RootNavigator
};

export type RootStackNavigationProp = NativeStackNavigationProp<RootStackParamList>; 