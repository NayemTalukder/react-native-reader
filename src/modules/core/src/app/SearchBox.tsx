import React, { useState, useEffect, useRef, useCallback } from 'react'
import { useNavigation } from '@react-navigation/native';
import { View, Text, StyleSheet, Dimensions, TextInput, TouchableOpacity } from 'react-native'

import { PropTypesSearchBox } from './propTypes'
import { shadow } from './style'
import Icon from './Icon'

const SearchIcon2 = { uri: 'https://bupko-cdn.s3.ap-south-1.amazonaws.com/app/core/SearchIcon2.png' }
const { width: sw, height: sh } = Dimensions.get('window')

const SearchBox = ({editable, marginVertical, isDisplay, flex, searchProps}) => {
  const [result, setResult] = useState([])
  const navigation = useNavigation();
  const styles = getStyleSheet(marginVertical, isDisplay, shadow, flex, editable)

  const onSubmitEditing = () => {
    searchProps.setSeeAll(result)
    navigation.navigate('SeeAll', { heading: 'Search Result', searchFor: searchProps.searchValue })
  }

  const onChangeText = (value: string) => {
    searchProps.setSearchValue(value)
    const algoliasearch = require("algoliasearch")
    const client = algoliasearch('YZPGVNGXXJ', '68ad2c6c6f91a8bc1b7719dfe340d780')
    const index = client.initIndex("Books")

    if (value !== '') {
      index.search(value).then(({ hits }) => {
        searchProps.setSearchResult(hits); setResult(hits) 
      }).catch((err:any) => console.log(err))
    } else { searchProps.setSearchResult([]); setResult([]) }
  }

  const onPresss = () => {
    if (!editable) navigation.navigate('Search')
  }

  return (
    <TouchableOpacity onPress={onPresss} activeOpacity={!editable ? 0.8 : 1} style={styles.topContainer} >
      <Icon imageContainerStyle={styles.icon} width={editable ? 12.77 : 16.77} height={editable ? 13 : 17} source={SearchIcon2} />
      <TextInput
        editable={editable}
        placeholder='Search'
        value={searchProps ? searchProps.searchValue : ''}
        onChangeText={onChangeText}
        onSubmitEditing={onSubmitEditing}
        placeholderTextColor='#77838F'
        style={styles.textInput} />
    </TouchableOpacity>
  )
}

SearchBox.propTypes = PropTypesSearchBox

SearchBox.defaultProps = {
  editable: true,
}

const getStyleSheet = (marginVertical: number, isDisplay: Boolean, shadow: any, flex: number, editable: Boolean) => (
  StyleSheet.create({
    topContainer: {
      ...shadow,
      flex,
      display: isDisplay ? 'flex' : 'none',
      height: 37,
      marginHorizontal: 12,
      marginVertical: marginVertical || 5,
      marginTop: editable ? 10 : null,
      borderRadius: 31,
      marginBottom: sw * .03
    },
    icon: {
      width: 30,
      marginLeft: 5,
      marginBottom: editable ? 2 : null,
      zIndex: 1000,
      alignItems: 'flex-start',
    },
    textInput: {
      fontFamily: 'Segoe UI',
      fontWeight: '400',
      fontSize: 12,
      lineHeight: 15.96,
      backgroundColor: '#FFFFFF',
      color: '#77838F',
      paddingLeft: 40,
      marginTop: -35,
      height: 37,
      borderRadius: 31
    },
  })
)

export default SearchBox
