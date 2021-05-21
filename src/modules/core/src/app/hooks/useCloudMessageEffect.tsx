import React, { useState, useEffect } from 'react' 
import { Alert } from 'react-native'
import { useNavigationState, useIsFocused } from '@react-navigation/native';
import { core } from '../'

export const useCloudMessageEffect = (props: any) => {
  const [cloudMessageLoader, setLoading] = useState(false)
  const [routes, setRoutes] = useState([])
  const isFocused = useIsFocused()
  const routeNames = useNavigationState(state => state.routes)
  const route: any = routeNames.find((e: any) => e.name === 'Library' )

  return { cloudMessageLoader }
}
