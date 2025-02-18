import { Image, ImageSourcePropType, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { FC } from 'react';
import { RFValue } from 'react-native-responsive-fontsize';

interface MenuItemProps {
  item: { name: string; iconUri: string };
  isFocused: boolean;
  onSelect: () => void;
}

const MenuItem: FC<MenuItemProps> = ({ item, isFocused, onSelect }) => {
  return (
    <TouchableOpacity style={[styles.container, isFocused && styles.focused]} onPress={onSelect}>
      <Image source={item?.iconUri as ImageSourcePropType} style={styles.icon} />
      <Text style={[styles.text, isFocused && styles.focusedText]}>{item.name}</Text>
    </TouchableOpacity>
  );
};

export default MenuItem;

const styles = StyleSheet.create({
  container: {
    padding: 5,
    width: '23%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
    backgroundColor: '#f0f0f0',
  },
  focused: {
    backgroundColor: 'black',
  },
  focusedText: {
    color: 'white',
  },
  icon: {
    width: RFValue(18),
    height: RFValue(18),
    marginVertical: 4,
  },
  text: {
    fontSize: RFValue(12),
    color: 'black',
  },
});