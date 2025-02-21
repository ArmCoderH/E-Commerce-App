import { Colors } from "@utils/Constants";
import { FC, ReactNode } from "react";
import { SafeAreaView, ViewStyle } from "react-native";
import { StyleSheet, Text, View } from 'react-native'
import React from 'react'


interface CustomeSafeAreaViewProps {
    children : ReactNode;
    style? : ViewStyle
}



const CustomSafeAreaView:FC<CustomeSafeAreaViewProps> = ({children,style}) => {
  return (
    <View style={styles.container}>
      <SafeAreaView/>
      {children}
    </View>
  )
}

export default CustomSafeAreaView

const styles = StyleSheet.create({
    container  : {
        flex : 1,
        backgroundColor : Colors.background
    }
})