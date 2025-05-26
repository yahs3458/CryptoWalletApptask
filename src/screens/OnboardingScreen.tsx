import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import Swiper from 'react-native-swiper';
import FastImage from 'react-native-fast-image';
import LinearGradient from 'react-native-linear-gradient';
import { colors, gradients, spacing, typography } from '../theme/theme';

const { width, height } = Dimensions.get('window');

const slides = [
    {
      key: '1',
      title: 'Multicurrency',
      description: 'Use over 20 cryptocurrencies, stablecoins and fiat payments',
      image: require('../assets/gifs/multicurrency.gif'),
    },
    {
      key: '2',
      title: 'Buying & Selling',
      description: 'Buy and sell cryptocurrencies with popular payment solutions',
      image: require('../assets/gifs/buyandsel.gif'),
    },
    {
      key: '3',
      title: 'Conversion',
      description: 'Conduct secure exchange transactions in all directions',
      image: require('../assets/gifs/conversion.gif'),
    },
    {
      key: '4',
      title: 'Debit card',
      description: 'Make any type of payment using a fiat debit card',
      image: require('../assets/gifs/debitcard.gif'),
    },
  ];

const OnboardingScreen = ({navigation}: any) => {
    return (
        <LinearGradient
            colors={gradients.background}
            style={styles.container}
        >
            <Swiper 
                loop={true}
                autoplay={true}
                autoplayTimeout={3}
                showsPagination={true}
                dotColor={colors.border}
                activeDotColor={colors.primary}
                removeClippedSubviews={false}
                paginationStyle={styles.pagination}
            >
                {slides.map(slide =>(
                    <View key={slide.key} style={styles.slide}>
                        <FastImage 
                            source={slide.image} 
                            style={styles.image} 
                            resizeMode={FastImage.resizeMode.contain}
                        />
                        <Text style={styles.title}>{slide.title}</Text>
                        <Text style={styles.description}>{slide.description}</Text>
                    </View>
                ))}
            </Swiper>
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.primaryButton} onPress={() => navigation.navigate('Main')}>
                    <Text style={styles.primaryButtonText}>Create a new wallet</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.secondaryButton} onPress={() => navigation.navigate('Main')}>
                    <Text style={styles.secondaryButtonText}>I already have a wallet</Text>
                </TouchableOpacity>
            </View>
        </LinearGradient>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    slide: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: spacing.medium,
    },
    image: {
        width: width * 0.7,
        height: height * 0.35,
        marginBottom: spacing.medium,
    },
    title: {
        ...typography.title,
        marginBottom: spacing.small,
        textAlign: 'center',
    },
    description: {
        ...typography.description,
        textAlign: 'center',
        marginBottom: spacing.large,
    },
    pagination: {
        bottom: height * 0.2,
    },
    buttonContainer: {
        position: 'absolute',
        bottom: spacing.xlarge,
        left: spacing.medium,
        right: spacing.medium,
    },
    primaryButton: {
        backgroundColor: colors.primary,
        borderRadius: 10,
        paddingVertical: 12,
        paddingHorizontal: 30,
        marginBottom: spacing.small,
        width: '100%',
        alignItems: 'center',
    },
    primaryButtonText: {
        color: colors.text.primary,
        fontWeight: 'bold',
    },
    secondaryButton: {
        borderColor: colors.border,
        borderWidth: 1,
        borderRadius: 10,
        paddingVertical: 12,
        paddingHorizontal: 30,
        width: '100%',
        alignItems: 'center',
    },
    secondaryButtonText: {
        color: colors.text.secondary,
    },
});

export default OnboardingScreen;