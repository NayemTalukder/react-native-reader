import React from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, View, Text, Dimensions, StatusBar } from 'react-native'
import { useNavigation } from '@react-navigation/native';

import Center from './Center'
import Icon from './Icon'
import Back from './Back'
import SearchBox from './SearchBox'

const SearchIcon = { uri: 'https://bupko-cdn.s3.ap-south-1.amazonaws.com/app/core/SearchIcon.png' }
const { width: sw, height: sh } = Dimensions.get('window')

const Header = (props: any) => {
  const { center, hasBackIcon, noSearchIcon, hasSearchBox, title, searchProps, style, textColor } = props
  const styles = getStyleSheet(title, center, hasBackIcon, noSearchIcon, hasSearchBox, textColor)
  const navigation = useNavigation()

  return (
    <View style={[styles.toContainer, style]} >
      <Center>
        <Back flex={1} style={styles.backIcon} isDisplay={hasBackIcon} />
        <Text style={styles.title} >{title ? title : title}</Text>
        <SearchBox searchProps={searchProps} flex={10} isDisplay={hasSearchBox} />
        <Icon isDisplay={!noSearchIcon && !hasSearchBox} flex={1} imageContainerStyle={styles.searchIcon} dimenssion={20} source={SearchIcon} onPress={() => navigation.navigate('Search')} />
      </Center>
    </View>
  )
} 

Header.propTypes = {
  center: PropTypes.bool,
  hasBackIcon: PropTypes.bool,
  noSearchIcon: PropTypes.bool,
  hasSearchBox: PropTypes.bool,
  title: PropTypes.string,
  style: PropTypes.any,
  textColor: PropTypes.string,
  searchProps: PropTypes.any,
}

Header.defaultProps = {
  hasBackIcon: false,
  noSearchIcon: false,
};


const getStyleSheet = (title: string, center: Boolean, hasBackIcon: Boolean, noSearchIcon: Boolean, hasSearchBox: Boolean, textColor: string) => (
  StyleSheet.create({
    toContainer: {
      height: hasSearchBox ? 60 + StatusBar.currentHeight : 55 + StatusBar.currentHeight,
      backgroundColor: textColor || '#FFFFFF',
      borderBottomLeftRadius: 20,
      borderBottomRightRadius: 20,
      // borderBottomColor: '#D8D8D8',
      // borderBottomWidth: hasBackIcon ? ((noSearchIcon || !title) ? 0 : 1) : 0
    },
    title: {
      display: !hasSearchBox ? 'flex' : 'none',
      flex: hasBackIcon ? 6 : 8,
      fontSize: 18,
      color: '#FFFFFF',
      textAlign: (hasBackIcon || center) ? 'center' : 'auto',
      marginLeft: (hasBackIcon || center) ? 0 : sw * .05,
      // marginRight: !noSearchIcon ? 0 : sw * .12
    },
    backIcon: { 
      marginLeft: hasBackIcon ? (noSearchIcon ? sw * .02 : sw * .02) : 5,
      marginRight: hasSearchBox ? -sw * .05 : 0,
      marginTop: hasSearchBox ? -sw * .02 : noSearchIcon ? -10 : 0,
      flex: hasSearchBox ? 1 : null,
    },
    searchIcon: {
      marginRight: (!hasBackIcon || !title) ? sw * .05 :  -sw * .01
    },
  })
)

export default Header
