import { Image, Pressable, StyleSheet, Text, View } from 'react-native'
import React, { FC, useState } from 'react'
import { screenHeight, screenWidth } from '@utils/Constants'
import FilmSlip from '../molecules/FilmSlip'
import Carousel from 'react-native-reanimated-carousel'
import Dots from '../atoms/Dots'

const AdCarousal:FC <{data:any}> =({data}) => {

    const [active, setactive] = useState(0)

    const hashOptions = {
        vertical : false,
        width : screenWidth,
        height : screenWidth * 0.8
    }
  return (
    <View>
      <FilmSlip/>
      <Carousel
      {...hashOptions}
      loop
      pagingEnabled
      snapEnabled
      autoPlay
      autoPlayInterval={3500}
      onSnapToItem={(index:any) => setactive(index)}
      data={data.data}
      renderItem={({item}:any)=>(
        <Pressable style={styles.imageContainer}>
          <Image
          source={item?.image_uri}
          style={styles.img}
          />
        </Pressable>
      )}
      />
      {
        active!=null &&

        <View style={styles.dots}>
          {
            data?.data?.map((item:any,index:any) =>{
              return(
                <Dots
                active={active}
                index={index}
                key={index}
                />
              )
            })
          }
        </View>
      }
    </View>
  )
}

const styles = StyleSheet.create({
  imageContainer : {
    width : "100%",
    height : "100%"
  },
  img : {
    width : '100%',
    height : '100%',
    resizeMode : 'cover'
  },
  dots : {
    flexDirection : 'row',
    width : 100,
    justifyContent : 'center',
    alignSelf : 'center',
    marginTop : 10
  }
})

export default AdCarousal
