import React, { useEffect, useState } from 'react'
import { View, StyleSheet, TouchableOpacity, Text, Dimensions } from 'react-native'
import { connect } from 'react-redux'

import * as actions from '../redux/actions'
import { core, Header, CustomHooksHandler } from '../modules/core/src/app'

const { width: sw, height: sh } = Dimensions.get('window')

const Home = (props: any) => {
  const styles = getStyleSheet()

  // useEffect(() => { core.checkVersion() }, [])

  const onPress = () => {
    props.navigation.navigate('Reader', { source: '7fc6d1c37ac34e5c99ffb8443ce79458' })
  }

  return (
    <View style={styles.topContainer}>
      <CustomHooksHandler homeProps={props} />
      <Header title='Home' noSearchIcon center textColor='rgb(31, 190, 58)' />
      <View style={styles.btnContainer}>
        <TouchableOpacity style={styles.btnWrapper} onPress={onPress} >
          <Text style={styles.btnTxt}> Go To Reader</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const getStyleSheet = () => (
  StyleSheet.create({
    topContainer: {
      backgroundColor: 'rgba(31, 190, 58, .5)',
      height: sh,
    },
    btnContainer: {
      height: sh - 100,
      justifyContent: 'center', 
      alignItems: 'center'
    },
    btnWrapper: {
      backgroundColor: '#000000',
      padding: 10,
      borderRadius: 10
    },
    btnTxt: {
      color: '#FFFFFF',
      fontSize: 20
    }
  })
)

const mapStateToProps = () => ({})

export default connect(mapStateToProps, actions)(Home)
