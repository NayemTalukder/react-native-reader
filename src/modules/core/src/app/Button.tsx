import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { TouchableOpacity, Text, StyleSheet, Dimensions } from 'react-native'

const { width: sw, height: sh } = Dimensions.get('window')

const Button = ({ onPress, style, width, backgroundColor, text, textColor, fontSize, borderColor, borderWidth, borderRadius, activeOpacity }) => {
  const styles = getStyleSheet(style, width, backgroundColor, borderColor, textColor, borderWidth, borderRadius, fontSize)
  return (
    <TouchableOpacity style={styles.topContainer} onPress={onPress} activeOpacity={activeOpacity || .5} >
      <Text style={styles.text} >{text || 'Read'}</Text>
    </TouchableOpacity>
  )
}

Button.propTypes = {
  onPress: PropTypes.func,
  style: PropTypes.object,
  width: PropTypes.number,
  backgroundColor: PropTypes.string,
  borderColor: PropTypes.string,
  text: PropTypes.string,
  textColor: PropTypes.string,
  fontSize: PropTypes.number,
  borderWidth: PropTypes.number,
  borderRadius: PropTypes.number,
  activeOpacity: PropTypes.number
}

const getStyleSheet = (style: object, width: number, backgroundColor: string, borderColor: string, textColor: string, fontSize: number, borderWidth: number, borderRadius: number) => (
  StyleSheet.create({
    topContainer: {
      // flex: 1,
      width: width || 110,
      height: 30,
      marginTop: 5,
      marginBottom: 3,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: backgroundColor || '#FFFFFF',
      borderColor: borderColor || backgroundColor || '#F38F11',
      borderWidth: borderWidth || 1,
      borderRadius: borderRadius || 20,
      ...style
    },
    text: {
      color: textColor || borderColor || '#FFFFFF',
      fontSize: fontSize || 12
    }
  })
)

export default Button
