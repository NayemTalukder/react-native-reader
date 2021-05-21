import 'react-native-gesture-handler'
import React, { useEffect } from 'react'
import { StatusBar } from 'react-native'
import SplashScreen from 'react-native-splash-screen'
import { createStore } from 'redux'
import { enableScreens } from 'react-native-screens'
import { Provider } from 'react-redux'

import reducer from './redux/reducers'
import { Navigations } from './navigation'
import { NetworkWarning } from './modules/core/src/app'

enableScreens()

const App = () => {

  useEffect(() => {
    SplashScreen.hide()
  }, [])

  return (
    <Provider store={createStore(reducer)}>
      <StatusBar translucent barStyle='light-content' backgroundColor='rgba(0,0,0, .6)' />
      <Navigations />
      <NetworkWarning />
    </Provider>
  )
}

export default App
