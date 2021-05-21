import React, { useState, useEffect, useRef, useCallback } from 'react'
import { RefreshControl, FlatList, Dimensions } from 'react-native'

export const useRefreshControlEffect = () => {
  const [refreshing, setRefreshing] = useState(false)

  const wait = (timeout: number) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  }

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
  }, [])

  const refreshControl = (
    <RefreshControl
        colors={["#9Bd35A", "#689F38"]}
        refreshing={refreshing}
        onRefresh={onRefresh} />
  )
  
  return { refreshControl, refreshing, onRefresh }
}