import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, Text, Image } from 'react-native';
import HomeScreen from '../screens/HomeScreen';

type TabName = 'Wallet' | 'NFT' | 'Browser' | 'Swap' | 'Earn';

type TabParamList = {
    [K in TabName]: undefined;
};

const Tab = createBottomTabNavigator<TabParamList>();

const Placeholder = ({ title }: { title: string }) => (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#000' }}>
      <Text style={{ color: '#fff', fontSize: 20 }}>{title} Screen</Text>
    </View>
  );

const getIcon = (name: TabName, focused: boolean) => {
    const icons: Record<TabName, any> = {
      Wallet: require('../assets/icons/wallet.png'),
      NFT: require('../assets/icons/NFT.png'),
      Browser: require('../assets/icons/browser.png'),
      Swap: require('../assets/icons/swap.png'),
      Earn: require('../assets/icons/earn.png'),
    }
    return (
        <Image
          source={icons[name]}
          style={{
            width: 24,
            height: 24,
            tintColor: focused ? '#fff' : '#888',
            marginBottom: 4,
          }}
          resizeMode="contain"
        />
      );
}

const BottomTabs = () => {
    return (
      <Tab.Navigator
        screenOptions={({ route }: { route: { name: TabName } }) => ({
          headerShown: false,
          tabBarStyle: {
            backgroundColor: '#000',
            height: 70,
            borderTopWidth: 0,
          },
          tabBarLabel: ({ focused }) => (
            <Text style={{ fontSize: 11, color: focused ? '#fff' : '#888' }}>
              {route.name.toUpperCase()}
            </Text>
          ),
          tabBarIcon: ({ focused }) => getIcon(route.name, focused),
        })}
      >
        <Tab.Screen name="Wallet" component={HomeScreen} />
        <Tab.Screen name="NFT" children={() => <Placeholder title="NFT" />} />
        <Tab.Screen name="Browser" children={() => <Placeholder title="Browser" />} />
        <Tab.Screen name="Swap" children={() => <Placeholder title="Swap" />} />
        <Tab.Screen name="Earn" children={() => <Placeholder title="Earn" />} />
      </Tab.Navigator>
    );
  };
  
  export default BottomTabs;