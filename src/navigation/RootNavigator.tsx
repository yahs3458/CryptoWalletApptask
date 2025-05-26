import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import BottomTabs from '../components/BottomTabs';
import HomeScreen from '../screens/HomeScreen';
import OnboardingScreen from '../screens/OnboardingScreen';
import ReceiveScreen from '../screens/ReceiveScreen';

export type RootStackParamList = {
  Main: undefined;
  Home: undefined;
  Onboarding: undefined;
  Receive: undefined;
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
        name="Main"
        component={BottomTabs}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Receive"
        options={{headerShown: false}}
        component={ReceiveScreen}
      />
    </Stack.Navigator>
  );
};

export default RootNavigator;
