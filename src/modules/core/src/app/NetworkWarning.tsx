import React, { useEffect, useState, useRef } from 'react'
import { StyleSheet, Text, Animated, View, SafeAreaView, Dimensions, StatusBar } from 'react-native'
import NetInfo from "@react-native-community/netinfo"

const { width: sw, height: sh } = Dimensions.get('window')

const NetworkWarning = () => {
    const [ isInternetReachable, setIsInternetReachable ] = useState(true)
    const fadeAnim = useRef(new Animated.Value(0)).current

    useEffect(() => {
        const unsubscribe = NetInfo.addEventListener(state => {
            setIsInternetReachable(state.isInternetReachable)
          });
        return () => unsubscribe();
    }, [])

    useEffect(() => {
        Animated.timing(
          fadeAnim,
          {
            toValue: 1,
            duration: 10000,
            useNativeDriver: true
          }
        ).start();
      }, [fadeAnim])    

    if(isInternetReachable) return null

    return (
      <Animated.View style={[styles.topContainer]} >
        <StatusBar hidden />
        <Text style={styles.text}>No Internet Connection</Text>
      </Animated.View>
    )
}

const styles = StyleSheet.create({
    topContainer: {
        flex: 1,
        zIndex: 100000,
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: 25,
        width: sw,
        backgroundColor: 'red',
        justifyContent: 'center',
        alignItems: 'center'
    },
    text: {
        color: 'white',
        fontSize: 14,
        marginBottom: 2
    }
})


export default NetworkWarning