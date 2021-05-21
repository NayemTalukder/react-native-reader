import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { BackHandler as BackHandlerRN, Alert } from 'react-native'
import RNExitApp from 'react-native-exit-app'

const BackHandler = (props: any) => {
  
  const exitAlert = () => {
    Alert.alert('Hold on!', 'Are you sure you want to Exit?', [
      { text: 'Cancel', onPress: () => null, style: 'cancel' },
      { text: 'YES', onPress: () => RNExitApp.exitApp() }
    ]);
  }
  
  useEffect(() => {
    const backAction = () => {
      if (props.onExit) exitAlert()
      else props.navigation.goBack()
      return true;
    };
    const backHandler = BackHandlerRN.addEventListener('hardwareBackPress', backAction);
    return () => backHandler.remove()
    
  }, [props.navigation])

  return <></>
}

BackHandler.propTypes = {
  navigation: PropTypes.any,
  onExit: PropTypes.bool,
}

export default BackHandler
