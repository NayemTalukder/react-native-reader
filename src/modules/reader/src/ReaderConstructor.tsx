import React, { useState, useEffect, useRef, useCallback } from 'react'
import { View, Text, StyleSheet, Dimensions } from 'react-native'
import { Provider } from 'react-redux';
import { createStore } from 'redux';

import reducer from './redux/reducers';
import Reader from './reader'

const ReaderConstructor = (props: any) => {
  return (
    <Provider store={createStore(reducer)}>
      <Reader 
        userUid={props.userUid}
        readerConfig={props.readerConfig} 
        currentBook={props.currentBook} 
        navigation={props.navigation} 
        isInternetReachable={props.isInternetReachable} />
    </Provider>
  )
}

export default ReaderConstructor
