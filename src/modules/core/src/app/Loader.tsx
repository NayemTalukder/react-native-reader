import React from 'react'
import { StyleSheet, ActivityIndicator, View } from 'react-native'
import { Overlay, Badge } from 'react-native-elements'

const Loader = () => {
  
    return (
      <Overlay isVisible overlayStyle={styles.container}>
          <ActivityIndicator size="large" color="#000" />
      </Overlay>
    )
}

const styles = StyleSheet.create({
    container: {
      ...StyleSheet.absoluteFillObject,
      backgroundColor: 'rgb(250,250,250)',
      justifyContent: 'center',
      alignItems: 'center',
    },
  });

export default Loader
