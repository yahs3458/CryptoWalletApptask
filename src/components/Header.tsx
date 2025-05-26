import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';

interface HeaderProps {
  title: string;
  leftIcon?: any;
  rightIcon?: any;
  secondRightIcon?: any;
  centerIcon?: any;
  onLeftPress?: () => void;
  onRightPress?: () => void;
  onSecondRightPress?: () => void;
}

const Header: React.FC<HeaderProps> = ({
  title,
  leftIcon,
  rightIcon,
  secondRightIcon,
  centerIcon,
  onLeftPress,
  onRightPress,
  onSecondRightPress,
}) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onLeftPress}>
        {leftIcon && <Image source={leftIcon} style={styles.icon} />}
      </TouchableOpacity>

      <View style={styles.center}>
        <Text style={styles.title}>{title}</Text>
        {centerIcon && <Image source={centerIcon} style={styles.centerIcon} />}
      </View>

      <View style={styles.rightContainer}>
        {secondRightIcon && (
          <TouchableOpacity onPress={onSecondRightPress}>
            <Image source={secondRightIcon} style={styles.icon} />
          </TouchableOpacity>
        )}
        {rightIcon && (
          <TouchableOpacity onPress={onRightPress}>
            <Image source={rightIcon} style={styles.icon} />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
        height: 44,
        backgroundColor: '#11101C', // Updated background color
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
      },
  icon: {
    width: 20,
    height: 20,
    marginHorizontal: 4,
    tintColor: '#AAA', // Soft gray look
  },
  center: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    color: '#AAA',
    fontSize: 14,
    fontWeight: '600',
    marginRight: 6,
  },
  centerIcon: {
    width: 16,
    height: 16,
    tintColor: '#AAA',
  },
  rightContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default Header;
