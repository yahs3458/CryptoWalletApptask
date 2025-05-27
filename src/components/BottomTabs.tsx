import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';

type TabName = 'Wallet' | 'NFT' | 'Browser' | 'Swap' | 'Earn';

const tabs: { name: TabName; icon: any }[] = [
  { name: 'Wallet', icon: require('../assets/icons/wallet.png') },
  { name: 'NFT', icon: require('../assets/icons/NFT.png') },
  { name: 'Browser', icon: require('../assets/icons/browser.png') },
  { name: 'Swap', icon: require('../assets/icons/swap.png') },
  { name: 'Earn', icon: require('../assets/icons/earn.png') },
];

interface BottomTabBarProps {
  onTabPress?: (tab: TabName) => void;
  activeTab?: TabName;
}

const BottomTabBar = ({ onTabPress, activeTab }: BottomTabBarProps) => {
  const [selectedTab, setSelectedTab] = useState<TabName>(activeTab || 'Wallet');

  const handlePress = (tab: TabName) => {
    setSelectedTab(tab);
    onTabPress?.(tab);
  };

  return (
    <View style={styles.tabBar}>
{tabs.map((tab) => (
  <TouchableOpacity key={tab.name} onPress={() => handlePress(tab.name)} style={styles.tabItem}>
    <Image
      source={tab.icon}
      style={[
        styles.icon,
        { tintColor: selectedTab === tab.name ? '#fff' : '#888' },
      ]}
    />
    <Text style={{ color: selectedTab === tab.name ? '#fff' : '#888', fontSize: 11 }}>
      {tab.name.toUpperCase()}
    </Text>
  </TouchableOpacity>
))}

    </View>
  );
};

export default BottomTabBar;

const styles = StyleSheet.create({
  tabBar: {
    flexDirection: 'row',
    backgroundColor: '#000',
    height: 70,
    width: '100%',
    borderTopWidth: 0.5,
    borderTopColor: '#333',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  tabItem: { alignItems: 'center' },
  icon: { width: 24, height: 24, marginBottom: 4 },
});
