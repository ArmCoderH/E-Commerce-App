import { Image, StyleSheet, Text, View } from 'react-native';
import React, { FC } from 'react';
import UniversalAdd from '@modules/products/atoms/UniversalAdd';
import { RFValue } from 'react-native-responsive-fontsize';

const OrderItem: FC<{ item: any }> = ({ item }) => {
  return (
    <View style={styles.container}>
      {/* Product Image */}
      <View style={styles.imageContainer}>
        <Image source={{ uri: item?.image_uri }} style={styles.image} />
      </View>

      {/* Product Details */}
      <View style={styles.detailsContainer}>
        <Text style={styles.itemName} numberOfLines={2}>{item.name}</Text>
        <Text style={styles.itemDetails}>₹{item.price} × {item.quantity}</Text>
        <Text style={styles.itemTotal}>Total: ₹{item.totalPrice}</Text>

        {/* Quantity Update UI */}
        <View style={styles.actionContainer}>
          <UniversalAdd item={item} />
          <Text style={styles.inStock}>In Stock</Text>
        </View>
      </View>
    </View>
  );
};

export default OrderItem;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 14,
    borderRadius: 2,
    backgroundColor: '#fff',
    marginBottom: 12,
    elevation: 2, // Shadow effect
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 3,
    borderWidth: 1,
    borderColor: '#E5E5E5',
  },
  imageContainer: {
    width: 90,
    height: 90,
    borderRadius: 10,
    overflow: 'hidden',
    marginRight: 12,
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  detailsContainer: {
    flex: 1,
  },
  itemName: {
    fontSize: RFValue(14),
    fontWeight: '600',
    color: '#333',
    marginBottom: 6,
  },
  itemDetails: {
    fontSize: RFValue(12),
    color: '#666',
    marginBottom: 4,
  },
  itemTotal: {
    fontSize: RFValue(14),
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 8,
  },
  actionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  inStock: {
    fontSize: RFValue(12),
    color: '#28A745', // Green color for stock status
    fontWeight: '500',
  },
});
