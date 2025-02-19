import { Image, Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import RollingContent from 'react-native-rolling-bar'
import { SafeAreaView } from 'react-native-safe-area-context'
import { RFValue } from 'react-native-responsive-fontsize'
import { Colors } from '@utils/Constants'
import Icon from '@components/atoms/Icon'
import { searchItems } from '@utils/db'
const Searchbar = () => {
  
    const [isOn , setIsOn] = useState(false)
  const toggleSwitch = () => {
    setIsOn(!isOn)
  }
    return (
    <>
    <SafeAreaView/>
    <View style={styles.container}>
        <Pressable onPress={toggleSwitch} style={styles.toggleContainer}>
        <Text style={styles.brandText}>Brand Mall</Text>
        <Image 
        style={styles.switchIcon}
        source={isOn ? require('@assets/icons/switch_on.png') : require('@assets/icons/switch_off.png')}
        />
        </Pressable>

        <Pressable style={styles.searchConatiner}>
            <Icon name='search' iconFamily='Ionicons' size={20} color='black'/>
            <RollingContent interval={3000} defaultStyle={false} customStyle={styles.textContainer}>
                    {searchItems?.map((item,index) => {
                        return(
                            <Text key={index} style={styles.contenteItems}>
                                {item}
                            </Text>
                        )
                    })}
            </RollingContent>
        </Pressable>
    </View>
    </>
  )
}

const styles = StyleSheet.create({
    container : {
        flexDirection : 'row',
        alignItems : "center",
        justifyContent : "space-between",
        paddingHorizontal : 10,
        paddingVertical : 10
    },
    toggleContainer : {
        width : "16%",
        justifyContent :  "center",
        alignItems : "center"
    },
    brandText : {
        fontWeight:"700",
        fontSize : RFValue(10),
        color : Colors.text
    },
    switchIcon : {
        width : "100%",
        height : 30,
        marginTop : 4,
        resizeMode : "contain"
    },
    textContainer : {
        flex : 1,
        height : 40,
        color : "black",
        marginLeft : 5
    },
    searchConatiner : {
        flexDirection : 'row',
        alignItems : "center",
        width : "80%",
        backgroundColor: '#fafafa',
        borderColor : "#ccc",
        paddingHorizontal : 10,
        borderWidth : 1,
        borderRadius : 5,
        marginLeft : 10,
        padding : 3
    },
    contenteItems:{
        fontSize : RFValue(13),  
        color : Colors.text,
        marginLeft : 5
    }
})

export default Searchbar
