import React from 'react';
import { View, StyleSheet } from 'react-native';
import { connect } from 'react-redux';

import * as actions from '../redux/actions/';

const back = { uri: 'https://bupko-cdn.s3.ap-south-1.amazonaws.com/app/core/BackIcon.png' }
const nav = require('../assets/Nav.png');
const bookmark = require('../assets/Bookmark.png');
const bookmarked = require('../assets/Bookmarked.png');
const options = require('../assets/Options.png');

const ReaderTopOverlay = (props: any) => {
  const styles = getStyleSheet(props.handleTop, props.darkMode, props.yellowMode)

  return <View  style={ styles.bar} />
} 

const getStyleSheet = (handleTop: Boolean, darkMode: Boolean, yellowMode: Boolean) => (
  StyleSheet.create({
    bar: {
      height: handleTop ? 60 : 0,
      backgroundColor: darkMode ? '#312E43' : yellowMode ? '#FFF4D8' : 'rgba(255,255,255, 1)',
      position: 'absolute',
      left: 0,
      right: 0,
      bottom: 0
    },
  })
)

const mapStateToProps = (state: any) => ({
  bookState: state.reducer,
  handleTop: state.reducer.handleTop,
  darkMode: state.reducer.darkMode,
  yellowMode: state.reducer.yellowMode,
});

export default connect(mapStateToProps, actions)(ReaderTopOverlay);
