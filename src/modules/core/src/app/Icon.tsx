import PropTypes from 'prop-types'
import React from 'react'
import { View, Image, TouchableOpacity, StyleSheet } from 'react-native'
import { PropTypesIcon } from '.'

const Icon = ({ isDisplay, flex, source, dimenssion, width, height, activeOpacity, onPress, touchableContainerStyle, imageContainerStyle, imageStyle, padding, disabled }) => {
  const styles = getStyleSheet(padding, dimenssion, width, height, flex, isDisplay)
  const temp = <View style={[styles.imageContainer, imageContainerStyle]}>
    <Image style={[styles.image, imageStyle]} source={source} />
  </View>
  if (onPress) return (
    <TouchableOpacity 
      style={[styles.topContainer, touchableContainerStyle]}
      disabled={disabled}
      onPress={onPress} activeOpacity={activeOpacity || 0.3} >
      {temp}
    </TouchableOpacity>
  )
  else return <View style={styles.topContainer}>{temp}</View>
}


Icon.propTypes = PropTypesIcon


Icon.defaultProps = {
  isDisplay: true,
  disabled: false,
};

const getStyleSheet = (padding: number, dimenssion: number, width: number, height: number, flex: number, isDisplay: Boolean) => (
  StyleSheet.create({
    topContainer: {
      flex, display: isDisplay ? 'flex' : 'none'
    },
    imageContainer: {
      justifyContent: 'center', alignItems: 'center', padding: padding || 9
    },
    image: {
      width: dimenssion || width, height: dimenssion || height
    }
  })
)

export default Icon