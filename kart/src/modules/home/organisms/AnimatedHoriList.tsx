import { FlatList, Pressable, StyleSheet, Text, View,Image } from 'react-native'
import React, { FC } from 'react'
import { RFValue } from 'react-native-responsive-fontsize'
import { FONTS, screenWidth } from '@utils/Constants'
import { navigate } from '@navigation/NavigationUtil'
// import { Image } from 'react-native-reanimated/lib/typescript/Animated'

const AnimatedHoriList:FC<{data:any}> = ({data}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.textStyle}>{data?.title}</Text>
      <FlatList
      data={data?.data}
      horizontal
      keyExtractor={(item) => item.id}
      renderItem={({item, index}) => (
        <Pressable key={index} style={styles.imageContainer} onPress={() => navigate('Categories')}>
          <Image source={{uri: item.image_uri}} style={styles.image}/>
        </Pressable>
      )}
      showsHorizontalScrollIndicator={false}
      scrollEventThrottle={16}
      />
    </View>
  )
}

export default AnimatedHoriList

const styles = StyleSheet.create({
  container : {
    marginVertical : 15
  },
  textStyle : {
    fontSize : RFValue(14),
    fontFamily : FONTS.heading,
    marginHorizontal : 15,
    marginBottom : 15,
  },
  image : {
    width : '100%',
    height : '100%'
  },
  imageContainer : {
    width : screenWidth * 0.45,
    height : screenWidth * 0.6,
    marginRight : 15,
  }
})