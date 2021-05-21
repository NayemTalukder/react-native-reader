import React, { useEffect, useState } from 'react'
import { View, StyleSheet, TouchableOpacity, Text, Dimensions } from 'react-native'
import { connect } from 'react-redux'

import * as actions from '../redux/actions'
import { core, Header, CustomHooksHandler , PropTypesAuthor} from '../modules/core/src/app'

const { width: sw, height: sh } = Dimensions.get('window')

const Genre = (props: any) => {
  const styles = getStyleSheet()

  const onPress = () => {
    props.navigation.navigate('Reader', { source: 'f6c2d8d319fe4eeab00048138bd4796b' })
  }

  return (
    <View style={styles.topContainer}>
      <CustomHooksHandler homeProps={props} />
      <Header title='Genre' noSearchIcon center textColor='rgb(243, 143, 17)' />
      <View style={styles.btnContainer}>
        <TouchableOpacity style={styles.btnWrapper} onPress={onPress} >
          <Text style={styles.btnTxt}> Go To Reader</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

Genre.propTypes = PropTypesAuthor

const getStyleSheet = () => (
  StyleSheet.create({
    topContainer: {
      backgroundColor: 'rgba(243, 143, 17, .5)',
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

export default connect(mapStateToProps, actions)(Genre)
