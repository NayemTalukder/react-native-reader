import React from 'react'
import { StyleSheet, Dimensions } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { PropTypesBack, Icon } from '.'

const BackIcon = { uri: 'https://bupko-cdn.s3.ap-south-1.amazonaws.com/app/core/BackIcon.png' }
const { width: sw, height: sh } = Dimensions.get('window')

const Back = ({ style, isDisplay, flex, home, marginTop, marginLeft }) => {
    const navigation = useNavigation()
    const styles = getStyleSheet(marginTop, marginLeft)

    return (
        <Icon 
            onPress={() => {
                if (home) navigation.navigate('Home')
                else navigation.goBack()
            }}
            flex={flex}
            isDisplay={isDisplay}
            imageContainerStyle={[styles.backIcon, style]}
            width={sw > 500 ? 18 * 1.8 : 18} 
            height={sw > 500 ? 14 * 1.8 : 14} 
            source={BackIcon} 
        />
    )
}

Back.propTypes = PropTypesBack

const getStyleSheet = (marginTop: number, marginLeft: number) => (
    StyleSheet.create({
        backIcon: { 
            marginTop: marginTop || 25,
            marginLeft: marginLeft || 10,
            alignItems: 'flex-start'
        },
    })
  )

export default Back
