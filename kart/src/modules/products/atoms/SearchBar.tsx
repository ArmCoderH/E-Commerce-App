import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { FC } from 'react'
import Icon from '@components/atoms/Icon';
import { goBack, navigate } from '@navigation/NavigationUtil';

interface SearchBarProps{
    cartLength :  number;
}
const SearchBar:FC<SearchBarProps> = ({cartLength}) => {
  return (
    <View style={styles.container}>
      <Pressable onPress={() =>  goBack()}>
        <Icon size={24} name='arrow-left' iconFamily='MaterialCommunityIcons'color='#000'/>

      </Pressable>
      <View style={styles.SearchConatiner}>
        <Icon size={20} name='search' iconFamily='MaterialIcons' color='#000'/>
        <TextInput
        style={styles.serchINput}
        placeholder='Serach Products'
        placeholderTextColor={'#666'}
        />
      </View>
      <Icon size={24} name='heart-outline' iconFamily='Ionicons' color='#000'/>
      <Pressable onPress={() => navigate('cart')}>
      <Icon size={24} name='cart-sharp' iconFamily='Ionicons' color='#000'/>
        {cartLength > 0 &&
        <View style={styles.badge}>
            <Text style={styles.bagText}>{cartLength}</Text>
        </View>
        }
      </Pressable>
    </View>
  )
}

export default SearchBar

const styles = StyleSheet.create({
    container : {
        flexDirection : 'row',
        alignItems : 'center',
        padding : 10,
        gap : 5,
        marginTop : 20
    
    },
    SearchConatiner : {
        flexDirection : 'row',
        alignItems : 'center',
        width : '75%',
        paddingHorizontal : 10,
        borderRadius : 20,
        backgroundColor : '#f0f0f0',
        marginLeft : 10
    },
    serachIcon : {
        marginRight : 50,
    },
    serchINput : {
        flex : 1,
        height : 40,
        color : '#fff'
    },
    cartCOnatiner : {
        position : 'relative'
    },
    badge : {
        position : 'absolute',
        top : -5,
        right : -6,
        backgroundColor : 'red',
        borderRadius : 10,
        width : 16,
        height : 16,
        justifyContent : 'center',
        alignItems : 'center',
    },
    bagText : {
        color : '#fff',
        fontSize : 12,
        fontWeight : 'bold'
    }
})