import React, { useEffect, useState } from 'react'
import { View, StyleSheet, TouchableOpacity, Text, Dimensions } from 'react-native'
import { connect } from 'react-redux'

import * as actions from '../redux/actions'
import { core, Header, CustomHooksHandler , PropTypesAuthor} from '../modules/core/src/app'

const { width: sw, height: sh } = Dimensions.get('window')

const Author = (props: any) => {
  const styles = getStyleSheet()

  const onPress = () => {
    props.navigation.navigate('Reader', { source: '93f1707b6ad641699245dce36ac9fa2d' })
  }

  return (
    <View style={styles.topContainer}>
      <CustomHooksHandler homeProps={props} />
      <Header title='Author' noSearchIcon center textColor='rgb(11, 163, 255)' />
      <View style={styles.btnContainer}>
        <TouchableOpacity style={styles.btnWrapper} onPress={onPress} >
          <Text style={styles.btnTxt}> Go To Reader</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

Author.propTypes = PropTypesAuthor

const getStyleSheet = () => (
  StyleSheet.create({
    topContainer: {
      backgroundColor: 'rgba(11, 163, 255, .5)',
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

export default connect(mapStateToProps, actions)(Author)
