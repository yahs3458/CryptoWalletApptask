import React, { useRef, useState } from 'react';
import { View, Text, FlatList, Dimensions, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../navigation/RootNavigator';
import { StackNavigationProp } from '@react-navigation/stack';


const {width} = Dimensions.get('window');
type NavigationProp = StackNavigationProp<RootStackParamList, 'Main'>
const ActionButton = ({ label, onPress }: { label: string, onPress: () => void }) => {
    const getIcon = () => {
      switch(label) {
        case 'SEND':
          return require('../assets/icons/send.png');
        case 'RECEIVE':
          return require('../assets/icons/recieve.png');
        case 'BUY':
          return require('../assets/icons/buy.png');
        default:
          return null;
      }
    };
  
    return (
      <View style={styles.actionButtonContainer}>
        <TouchableOpacity style={styles.actionButton} onPress={onPress}>
          <Image source={getIcon()} style={styles.actionIcon} resizeMode="contain" />
        </TouchableOpacity>
        <Text style={styles.buttonText}>{label}</Text>
      </View>
    );
  };
  

const data =[ 
    {
        key:'1',
        type:'Balance',
        balance:'$ 44,346.95',
    },
    {
        key:'2',
        type:'card',
        image: require('../assets/images/debitcard.png'),
      
    },
]

const BalanceCourcel = () => {
    const navigation = useNavigation<NavigationProp>();
    const flatListRef = useRef<FlatList>(null);
    const [activeIndex, setActiveIndex] = useState(0);
    const [isBalanceVisible, setIsBalanceVisible] = useState(true);

    const toggleBalanceVisibility = () => {
        setIsBalanceVisible(!isBalanceVisible);
    };

    const renderItem = ({item}:any) => {
        if(item.type === 'Balance'){
            return(
                <View style={styles.slide}>
                    <View style={styles.balanceHeader}>
                        <Text style={styles.totalLabel}>Total Balance</Text>
                        <TouchableOpacity onPress={toggleBalanceVisibility} style={styles.eyeButton}>
                            <Image 
                                source={isBalanceVisible ? require('../assets/icons/hidepassword.png') : require('../assets/icons/showpassword.png')} 
                                style={styles.eyeIcon}
                                resizeMode="contain"
                            />
                        </TouchableOpacity>
                    </View>
                    <Text style={styles.totalValue}>
                        {isBalanceVisible ? item.balance : '****'}
                    </Text>
                    <View style={styles.buttonRow}>
                    <ActionButton label="SEND" onPress={() => navigation.navigate('Send')} />
            <ActionButton label="RECEIVE" onPress={() => navigation.navigate('Receive')} />
            <ActionButton label="BUY" onPress={() => console.log("Buy Pressed")} />
                    </View>
                    <View style={styles.paginationContainer}>
                        {data.map((_, index) => (
                            <View
                                key={index}
                                style={[
                                    styles.paginationDot,
                                    index === activeIndex && styles.paginationDotActive
                                ]}
                            />
                        ))}
                    </View>
                </View>
            )
        }
        if (item.type === 'card') {
            return (
                <View style={styles.slide}>
                    <Image source={item.image} style={styles.cardImage} resizeMode="contain" />
                    <View style={styles.paginationContainer}>
                        {data.map((_, index) => (
                            <View
                                key={index}
                                style={[
                                    styles.paginationDot,
                                    index === activeIndex && styles.paginationDotActive
                                ]}
                            />
                        ))}
                    </View>
                </View>
            );
        }
        return null;
    }

    return(
        <View style={styles.container}>
            <FlatList
                ref={flatListRef}
                data={data}
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                renderItem={renderItem}
                keyExtractor={(item) => item.key}
                onMomentumScrollEnd={(event) => {
                    const newIndex = Math.round(event.nativeEvent.contentOffset.x / width);
                    setActiveIndex(newIndex);
                }}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 60,
    },
    slide: {
        width,
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingTop: 20,
    },
    totalLabel: {
        color: '#888',
        fontSize: 14,
        marginBottom: 5,
        marginTop: 20,
    },
    totalValue: {
        color: '#fff',
        fontSize: 26,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    buttonRow: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        width: '100%',
        marginTop: 20,
    },
    actionButtonContainer: {
        alignItems: 'center',
        marginHorizontal: 8,
    },
    actionButton: {
        backgroundColor: '#2D4EFF',
        width: 60,
        height: 60,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 8,
    },
    actionIcon: {
        width: 24,
        height: 24,
        tintColor: '#fff',
    },
    buttonText: {
        color: '#fff',
        fontSize: 12,
        fontWeight: '600',
    },
    cardImage: {
        width: width * 0.9,
        height: 180,
        borderRadius: 16,
    },
    paginationContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
        width: '100%',
    },
    paginationDot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: 'rgba(255, 255, 255, 0.4)',
        marginHorizontal: 4,
        marginBottom: 5
    },
    paginationDotActive: {
        backgroundColor: '#fff',
        width: 12,
        height: 12,
        borderRadius: 6,
    },
    balanceHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 5,
    },
    eyeButton: {
        marginLeft: 5,
        padding: 2,
    },
    eyeIcon: {
        width: 16,
        height: 16,
        tintColor: '#888',
    },
});

export default BalanceCourcel;