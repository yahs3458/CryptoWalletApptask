import React from 'react';
import { SafeAreaView, StatusBar, FlatList, StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import BalanceCarousel from '../components/BalanceCourcel';
import TokenList, { tokens } from '../components/TokenList';
import TokenItem from '../components/TokenItem'; // Create this for single token row
import Header from '../components/Header';
import BottomTabBar from '../components/BottomTabs';

const HomeScreen = () => {
  return (
    <><Header
      title=""
      leftIcon={require('../assets/icons/settings.png')}
      rightIcon={require('../assets/icons/scan.png')}
      onLeftPress={() => console.log('Filter')}
      onRightPress={() => console.log('Scan')} />
      
      <LinearGradient
        colors={['#252531', '#181826']}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
        style={styles.container}
      >
        <StatusBar barStyle="light-content" />
        <SafeAreaView style={styles.safeArea}>
          <FlatList
            data={tokens}
            keyExtractor={(item) => item.symbol}
            renderItem={({ item }) => <TokenItem item={item} />}
            ListHeaderComponent={<BalanceCarousel />}
            contentContainerStyle={styles.listContent} />
        </SafeAreaView>
        <BottomTabBar />
      </LinearGradient></>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  listContent: {
    paddingBottom: 100,
  },
});

export default HomeScreen;
