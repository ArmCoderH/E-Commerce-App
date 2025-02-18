import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { RFValue } from 'react-native-responsive-fontsize'

const FilmSlip = () => {
  return (
    <View>
      <Text>FilmSlip</Text>
    </View>
  )
}

const styles = StyleSheet.create({
    container : {
        height : 40,
        width : "100%"
    },
    gridContainer : {
        flexDirection : "row",
        alignItems : "center"
    },
    gridItem : {
        height: 40,
        justifyContent : "center",
        alignItems : 'center',
        backgroundColor : '#300',
        flexDirection : "row",
    },
    gridText : {
        color : '#fff',
        fontSize : RFValue(12),
        fontWeight : "500",
        textAlign : "center",
    },
    gridTextStart : {
        fontSize : RFValue(12),
        color : "#999",
        fontWeight:'bold',
        textAlign : "center",
    }
})
export default FilmSlip
