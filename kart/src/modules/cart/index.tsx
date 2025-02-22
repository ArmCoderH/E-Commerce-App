import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { FC } from 'react';
import CustomSafeAreaView from '@components/atoms/CustomSafeAreaView';
import { RFValue } from 'react-native-responsive-fontsize';
import { useAppSelector } from '@store/reduxHook';
import { selectCartItems } from './api/slice';
import { FlatList } from 'react-native-gesture-handler';
import { navigate } from '@navigation/NavigationUtil';
import { Colors } from '@utils/Constants';
import OrderItem from './atoms/OrderItem';
import PlaceOrder from './atoms/PlaceOrder';

const Cart:FC = () => {
  const carts = useAppSelector(selectCartItems);
  const user = useAppSelector(state => state.account.user) as any;

  const renderItem = ({ item }: any) => <OrderItem item={item} />;

  return (
    <CustomSafeAreaView>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.heading}>🛒 My Cart</Text>
      </View>

      {/* Delivery Address Section */}
      <View style={styles.deliveryInfoContainer}>
        <View style={styles.deliveryInfo}>
          <Text style={styles.label}>📞 Phone:</Text>
          <Text style={styles.number}>{user?.phone ? user?.phone : "Not Available"}</Text>
        </View>

        <View style={styles.deliveryInfo}>
          <Text style={styles.label}>📍 Address:</Text>
          <Text style={styles.address}>
            {user?.address ? user?.address : "Login first to place your orders"}
          </Text>
        </View>
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
          <Text style={styles.emptyText}>Your cart is empty</Text>
          <TouchableOpacity style={styles.shopNowButton} onPress={() => navigate('Categories')}>
            <Text style={styles.shopText}>🛍️ Shop Now</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Place Order Button */}
      {carts.length > 0 && <PlaceOrder />}
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
  deliveryInfoContainer: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 10,
    marginHorizontal: 16,
    marginVertical: 10,
    elevation: 3, // Android shadow
    shadowColor: "#000", // iOS shadow
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  deliveryInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  label: {
    fontSize: RFValue(14),
    fontWeight: 'bold',
    color: '#333',
    marginRight: 8,
  },
  number: {
    fontSize: RFValue(14),
    color: '#444',
  },
  address: {
    fontSize: RFValue(14),
    color: '#666',
    flexShrink: 1, // Ensures address wraps properly
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
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
