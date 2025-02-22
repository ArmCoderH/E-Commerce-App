import { ActivityIndicator, Alert, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';
import { RFValue } from 'react-native-responsive-fontsize';
import { useAppSelector } from '@store/reduxHook';
import { selectCartItems, selectTotalCartPrice } from '../api/slice';
import { navigate } from '@navigation/NavigationUtil';
import LoginModel from '@modules/account/molecules/LoginModel';
import { createOrder, createTransaction } from '../api/paygateway';

const PlaceOrder = () => {
  const user = useAppSelector((state) => state.account.user) as any;
  const carts = useAppSelector(selectCartItems);
  const price = useAppSelector(selectTotalCartPrice);
  const [loading, setLoading] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const handlePlaceOrder = async () => {
    setLoading(true);
    const data = await createTransaction(price, user?._id);
    if (data) {
      const order = await createOrder(data?.key, data?.amount, data?.order_id, carts, user?._id, user?.address);
      setLoading(false);
      if (order?.type === 'error') {
        Alert.alert('Payment Failed');
      } else {
        navigate('PaymentSuccess', {
          price: price / 100,
          address: user?.address,
        });
      }
    } else {
      setLoading(false);
      Alert.alert('There was an error');
    }
  };

  return (
    <>
      <View style={styles.container}>
        <View style={styles.priceContainer}>
          <Text style={styles.strikPrice}>₹{price + 1200}</Text>
          <Text style={styles.price}>
            ₹{price} <Text style={styles.infoIcon}>ⓘ</Text>
          </Text>
        </View>
        <TouchableOpacity
          style={[styles.button, loading && { opacity: 0.7 }]}
          disabled={loading}
          onPress={() => {
            if (user) {
              handlePlaceOrder();
            } else {
              setIsVisible(true);
            }
          }}
        >
          {loading ? <ActivityIndicator color="black" size="small" /> : <Text style={styles.btnText}>Place Order</Text>}
        </TouchableOpacity>
      </View>

      {isVisible && <LoginModel onClose={() => setIsVisible(false)} visible={isVisible} />}
    </>
  );
};

export default PlaceOrder;

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    backgroundColor: '#fff',
    width: '100%',
    padding: 15,
    paddingBottom: Platform.OS === 'ios' ? 30 : 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderColor: '#F0F2F5',
    elevation: 3, // For shadow on Android
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  priceContainer: {
    flexDirection: 'column',
  },
  strikPrice: {
    fontSize: RFValue(11),
    color: '#888',
    textDecorationLine: 'line-through',
  },
  price: {
    fontSize: RFValue(16),
    color: '#000',
    fontWeight: '600',
  },
  infoIcon: {
    fontSize: RFValue(10),
    color: '#888',
  },
  button: {
    backgroundColor: '#FFC201',
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    width: '40%',
  },
  btnText: {
    color: '#222',
    fontWeight: '600',
    fontSize: RFValue(13),
  },
});