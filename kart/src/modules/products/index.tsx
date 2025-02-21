import { SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React, { FC, useEffect, useState } from 'react'
import { useRoute } from '@react-navigation/native'
import { getProductsByCategory } from './api/getProducts'
import { screenWidth } from '@utils/Constants'
import { RFValue } from 'react-native-responsive-fontsize'
import SearchBar from './atoms/SearchBar'
import { FlatList } from 'react-native-gesture-handler'
import ProductItem from './atoms/ProductItem'
import { useAppSelector } from '@store/reduxHook'
import { selectTotalItemsInCart } from '@modules/cart/api/slice'

const products:FC = () => {

    const route = useRoute()
    const category = route?.params as any;
      const count = useAppSelector(selectTotalItemsInCart);
    
    const [products,setProducts] = useState<any[]>([])

    const getchProducts = async () => {
        const data = await getProductsByCategory(category?.id)
        setProducts(data)
    }

    useEffect(() => {
        if (category?.id) {
            getchProducts()
        }
    },[category?.id])

    const renderItem=({item,index}:any)=>{
        const isOdd = index % 2 !== 0
        return (
            <ProductItem isOdd={isOdd} item={item}/>
        )
    }
  return (
    <View style={styles.container}>
      <SafeAreaView/>
      <SearchBar cartLength={count}/>
      <FlatList
      bounces={false}
      data={products}
      renderItem={renderItem}
      keyExtractor={(item) => item._id.toString()}
      numColumns={2}
      ListEmptyComponent={
        <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>Oops ! NO utems in this categories</Text>
        </View>
      }
      contentContainerStyle={styles.listContainer}
      />
    </View>
  )
}

export default products

const styles = StyleSheet.create({
    container : {
        flex : 1,
        backgroundColor : '#fff'
    },
    listContainer : {
        paddingBottom : 30,
        backgroundColor : '#fff'
    },
    emptyContainer : {
        height : screenWidth - 80,
        width : '100%',
        justifyContent : 'center',
        alignItems : 'center',
        padding : 16
    },
    emptyText: {
        fontSize : RFValue(14),
        color : '#666',
        marginBottom : 16
    },
})