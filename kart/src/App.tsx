import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Navigation from '@navigation/Navigation'
import { Provider } from 'react-redux'
import { store } from '@store/store'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
const App = () => {
  return (
  <GestureHandlerRootView style={{flex:1}}>
    <Provider store={store}>
    <Navigation/>
    </Provider>
   </GestureHandlerRootView>
  )
}

export default App

const styles = StyleSheet.create({}) 