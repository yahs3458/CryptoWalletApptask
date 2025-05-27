import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import BottomTabs from '../components/BottomTabs';
import HomeScreen from '../screens/HomeScreen';
import OnboardingScreen from '../screens/OnboardingScreen';
import ReceiveScreen from '../screens/ReceiveScreen';
import SendScreen from '../screens/SendScreen';

export type RootStackParamList = {
  Main: undefined;
  Onboarding: undefined;
  Receive: undefined;
  Home: undefined;
  Send: undefined;
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
    </Stack.Navigator>
  );
};

export default RootNavigator;
