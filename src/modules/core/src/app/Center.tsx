import React from 'react'
import { StyleSheet, View, StatusBar } from 'react-native'

interface CenterProps {}

const center: React.FC<CenterProps> = ({children}) => (
  <View style={styles.toContainer} >
    {children}
  </View>
)

const styles = StyleSheet.create({
  toContainer: {
    flex: 1,
    marginTop: StatusBar.currentHeight,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  }
})

export default center
