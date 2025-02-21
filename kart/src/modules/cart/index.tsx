import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import CustomSafeAreaView from '@components/atoms/CustomSafeAreaView';
import { RFValue } from 'react-native-responsive-fontsize';
import { useAppSelector } from '@store/reduxHook';
import { selectCartItems } from './api/slice';
import { FlatList } from 'react-native-gesture-handler';
import { navigate } from '@navigation/NavigationUtil';
import { Colors } from '@utils/Constants';
import OrderItem from './atoms/OrderItem';
import LottieView from 'lottie-react-native'; // Animation

const Cart = () => {
  const carts = useAppSelector(selectCartItems);

  const renderItem = ({ item }: any) => <OrderItem item={item} />;

  return (
    <CustomSafeAreaView>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.heading}>🛒 My Cart</Text>
      </View>

      {/* Delivery Address Section */}
      <View style={styles.deliveryInfo}>
        <Text style={styles.number}>📍</Text>
        <Text style={styles.address}>Deliver to: Login first to place your orders</Text>
      </View>

      {/* Cart Items */}
      {carts.length > 0 ? (
        <FlatList
          data={carts}
          renderItem={renderItem}
          keyExtractor={(item) => item._id.toString()}
          contentContainerStyle={styles.listContainer}
        />
      ) : (
        <View style={styles.emptyContainer}>
          {/* Lottie Animation for Empty Cart */}
          {/* <LottieView
            source={require('@assets/animations/empty-cart.json')}
            autoPlay
            loop
            style={styles.animation}
          /> */}
          <Text style={styles.emptyText}>Your cart is empty</Text>

          <TouchableOpacity style={styles.shopNowButton} onPress={() => navigate('Categories')}>
            <Text style={styles.shopText}>🛍️ Shop Now</Text>
          </TouchableOpacity>
        </View>
      )}
    </CustomSafeAreaView>
  );
};

export default Cart;

const styles = StyleSheet.create({
  header: {
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderColor: '#E0E0E0',
    backgroundColor: '#fff',
    alignItems: 'center',
    elevation: 2,
  },
  heading: {
    fontSize: RFValue(18),
    fontWeight: 'bold',
    color: '#333',
  },
  deliveryInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginVertical: 10,
    backgroundColor: '#F7F7F7',
    paddingVertical: 12,
    borderRadius: 8,
  },
  number: {
    fontSize: RFValue(16),
    marginRight: 8,
  },
  address: {
    color: '#666',
    fontSize: RFValue(12),
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  animation: {
    width: 220,
    height: 220,
    marginBottom: 12,
  },
  emptyText: {
    fontSize: RFValue(14),
    color: '#666',
    marginBottom: 16,
  },
  shopNowButton: {
    backgroundColor: Colors.active,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    elevation: 3,
  },
  shopText: {
    fontSize: RFValue(14),
    color: '#fff',
    fontWeight: 'bold',
  },
  listContainer: {
    paddingTop: 8,
    paddingBottom: 100,
  },
});
