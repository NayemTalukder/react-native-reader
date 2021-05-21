import React, { useState, useEffect, useRef, useCallback } from 'react'
import { ActivityIndicator } from 'react-native'
import { Overlay } from 'react-native-elements'

export const useCustomLoaderEffect = (loading: boolean = null) => {
  const [visible, setVisible] = useState(false)

  const CustomLoader = () => (
    <Overlay isVisible={loading || visible} >
      <ActivityIndicator size="large" color="#000" />
    </Overlay>
  )
  
  return { CustomLoader, setVisible }
}