import { ActivityIndicator, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { RFValue } from 'react-native-responsive-fontsize'
import { useAppSelector } from '@store/reduxHook'
import { selectTotalCartPrice } from '../api/slice'
import { navigate } from '@navigation/NavigationUtil'

const PlaceOrder = () => {
    const price = useAppSelector(selectTotalCartPrice)
    const [loading, setLoading] = useState(false)
    const [isVisible, setIsVisible] = useState(false)
  return (
    <>
      <View style={styles.container}>
        <View>
            <Text style={styles.strikPrioce}>₹{price + 1200}</Text>
            ₹<Text style={styles.price}>₹{price}
                <Text style={{fontSize:RFValue(10)}}>{" "}ⓘ</Text>
            </Text>
        </View>
        <TouchableOpacity style={styles.button} disabled={loading} onPress={() => setIsVisible(true)}>
    {
        loading ? <ActivityIndicator color='black' size='small'/> :
        <Text style={styles.btnText}>Place Order</Text>
    }
        </TouchableOpacity>
      </View>
    </>
  )
}

export default PlaceOrder

const styles = StyleSheet.create({
    strikPrioce : {
        fontSize : RFValue(11),
        color : '#000',
        textDecorationLine : 'line-through'
    },
    price : {
        fontSize : RFValue(16),
        color : '#000',
        fontWeight : '600'
    },
    button : {
        backgroundColor : '#FFC201',
        padding : 10,
        borderRadius : 8,
        width : 150,
        justifyContent : 'center',
        alignItems : 'center',
        paddingHorizontal : 20
    },
    btnText : {
        color : '#222',
        fontWeight : '600',
        fontSize : RFValue(13)
    },
    container : {
        position  :'absolute',
        bottom : 0,
        borderRadius : 2,
        borderColor : '#F0F2F5',
        width : '100%',
        padding : 15,
        paddingBottom : Platform.OS === 'ios' ? 30 : 10,
        flexDirection : 'row',
        alignItems : 'center',
        justifyContent : 'space-between'
        }
})