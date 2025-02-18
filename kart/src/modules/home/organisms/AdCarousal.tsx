import { StyleSheet, Text, View } from 'react-native'
import React, { FC, useState } from 'react'
import { screenHeight, screenWidth } from '@utils/Constants'
import FilmSlip from '../molecules/FilmSlip'


const AdCarousal:FC <{data:any}> =({data}) => {

    const [active, setactive] = useState(0)

    const hashOptions = {
        vertical : false,
        width : screenWidth,
        height : screenHeight * 0.8
    }
  return (
    <View>
      <FilmSlip/>
    </View>
  )
}

const styles = StyleSheet.create({})

export default AdCarousal
