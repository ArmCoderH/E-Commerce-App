import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { RFValue } from 'react-native-responsive-fontsize'
import AutoScoll from "@homielab/react-native-auto-scroll"
import { slipData } from '@utils/db'
import Icon from '@components/atoms/Icon'

const FilmSlip = () => {
  return (
    <View>
      <AutoScoll style={styles.container} endPaddingWidth={0} duration={14000}>
        <View style={styles.gridContainer}>
            {slipData?.map((item,index) => (
                <View key={index} style={styles.gridItem}>
                    <Text style={styles.gridText}>
                        {"     "}{item}
                    </Text>
                    <Text style={styles.gridTextStart}>
                        {"     "}
                    </Text>
                    <Icon name='star-four-points' iconFamily='MaterialCommunityIcons' color='#888' size={18}/>
                </View>
            ))}
        </View>
      </AutoScoll>

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
