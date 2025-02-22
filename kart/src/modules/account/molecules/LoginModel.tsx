import {
  Alert,
  Keyboard,
  KeyboardAvoidingView,
  Modal,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import React, {FC, useEffect, useState} from 'react';
import {useDispatch} from 'react-redux';
import {useAppDispatch, useAppSelector} from '@store/reduxHook';
import {loginOrSignup} from '../api/api';
import {setData} from '../api/slice';
import {navigate} from '@navigation/NavigationUtil';
import {clearCart} from '@modules/cart/api/slice';
import {modalStyles} from '@styles/modalStyles';
import Icon from '@components/atoms/Icon';
import {Colors} from '@utils/Constants';

const LoginModel: FC<{visible: boolean; onClose: () => void}> = ({
  visible,
  onClose,
}) => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(state => state.account.user) as any;
  const [number, setNumber] = useState('');
  const [address, setAddress] = useState('');

  const handleLogin = async () => {
    // Validation
    if (!number.trim()) {
      Alert.alert('Validation Error', 'Please enter your phone number.');
      return;
    }
  
    if (!/^\d{10}$/.test(number)) {
      Alert.alert('Validation Error', 'Please enter a valid 10-digit phone number.');
      return;
    }
  
    if (!address.trim()) {
      Alert.alert('Validation Error', 'Please enter your address.');
      return;
    }
  
    console.log('Sending login request...', { number, address }); // Debugging API call
  
    try {
      const data = await loginOrSignup(number, address);
      console.log('Login API Response:', data); // Check API response
  
      if (data) {
        dispatch(setData(data));
        onClose();
      } else {
        Alert.alert('Error', 'Invalid credentials or user not found.');
      }
    } catch (error) {
      console.error('Login error:', error);
      Alert.alert('Error', 'Something went wrong. Please try again later.');
    }
  };
  
  
  

  useEffect(() => {
    if (user?.phone) {
      setNumber(user?.phone);
      setAddress(user?.address);
    }
  }, [user]);

  const handleLogout = async () => {
    onClose();
    navigate('Home');
    setAddress('');
    setNumber('');
    await dispatch(clearCart());
    await dispatch(setData(null));
  };
  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={modalStyles.modalContainer}>
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={modalStyles.keyboardAvoidingView}>
            <ScrollView contentContainerStyle={modalStyles.scrollViewContent}>
              <View style={modalStyles.modalContent}>
                <TouchableOpacity
                  style={modalStyles.closeIcon}
                  onPress={onClose}>
                  <Icon
                    size={20}
                    color="#fff"
                    name="close"
                    iconFamily="Ionicons"
                  />
                </TouchableOpacity>
                <Text style={modalStyles.title}>
                  Login in for the best experience
                </Text>
                <Text style={modalStyles.subTitle}>
                  Enter your phone number to proceed
                </Text>
                <TextInput
                  style={modalStyles.input}
                  placeholder="Enter yout number"
                  value={number}
                  maxLength={10}
                  onChangeText={setNumber}
                  keyboardType="number-pad"
                  placeholderTextColor={'$ccc'}
                />

                <TextInput
                  style={modalStyles.textareainput}
                  placeholder="Enter your address here"
                  value={address}
                  textAlignVertical="top"
                  multiline
                  placeholderTextColor={'#ccc'}
                  onChangeText={setAddress}
                />

                <View style={modalStyles.buttonContainer}>
                  <TouchableOpacity
                    style={modalStyles.button}
                    onPress={handleLogin}>
                    <Text style={modalStyles.buttonText}>{!user ? 'Login' : 'Save'}</Text>
                  </TouchableOpacity>

                  {user && (
                    <TouchableOpacity onPress={handleLogout}
                      style={[
                        modalStyles.button,
                        {
                          backgroundColor: 'transparent',
                          borderColor: Colors.active,
                          borderWidth: 1,
                        },
                      ]}>
                      <Text
                        style={[
                          modalStyles.buttonText,
                          {color: Colors.active},
                        ]}>
                        Logout
                      </Text>
                    </TouchableOpacity>
                  )}
                </View>
              </View>
            </ScrollView>
          </KeyboardAvoidingView>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default LoginModel;

const styles = StyleSheet.create({});
