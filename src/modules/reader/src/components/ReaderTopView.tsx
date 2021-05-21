import React from 'react';
import { View, StyleSheet } from 'react-native';
import { connect } from 'react-redux';

import * as actions from '../redux/actions/';
import { Icon } from '../../../core/src/app';


const back = { uri: 'https://bupko-cdn.s3.ap-south-1.amazonaws.com/app/core/BackIcon.png' }
const sidebar = require('../assets/Nav.png');
const bookmark = require('../assets/Bookmark.png');
const bookmarked = require('../assets/Bookmarked.png');
const options = require('../assets/Options.png');

const backBlack = require('../assets/BackBlack.png');
const sidebarBlack = require('../assets/NavBlack.png');
const bookmarkBlack = require('../assets/BookmarkBlack.png');
const bookmarkedBlack = require('../assets/BookmarkedBlack.png');
const optionsBlack = require('../assets/OptionsBlack.png');

const ReaderTopView = (props: any) => {
  const styles = getStyleSheet(props.handleTop)

  const getIcon = (onPress: any, width: number, height: number, source: any, sourceDark: any, marginLeft: number, marginRight: number) => {
    return <Icon  
      imageContainerStyle={[{marginLeft, marginRight}, styles.optionButton]}
      flex={1}
      onPress={onPress} 
      width={width}
      height={height}
      source={props.darkMode ? source : sourceDark} />
  }

  const onSidebarPress = () => {
    // analytic.reader_log_event(['reader_view_sidebar', props.currentBook.name])
    props.setReaderSidebar(!props.readerSidebar)
  }

  const onOptionPress = () => {
    // analytic.reader_log_event(['reader_view_options', props.currentBook.name])
    props.setHandleOptions(true)
  }
  
  return (
    <View style={styles.bar} >
        { props.handleTop
        ? <View style={styles.optionBar} >
            {/* Back Icon */}
            { getIcon(props.onPress, 20, 15, back, backBlack, null, null) }
            {/* Sidebar Icon */}
            { getIcon(onSidebarPress, 15, 8, sidebar, sidebarBlack, null, null) }
            {/* Bookmark Icon */}
            { props.bookmarks.find((item: any) => {
                if (item.cfi === props.visibleLocation.start.cfi) return true;
                return false;
              }) 
            ? getIcon(props.onRemoveBookmark, 13, 19, bookmarked, bookmarkedBlack, null, null) 
            : getIcon(props.onAddBookmark, 13, 19, bookmark, bookmarkBlack, null, null) } 
            {/* Option Icon */}
            { getIcon(onOptionPress, 15, 4, options, optionsBlack, null, null) }
        </View> : null }
    </View>
  );
}

const getStyleSheet = (handleTop: Boolean) => {
  return (
    StyleSheet.create({
      bar: {
        height: handleTop ? 60 : 0,
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'transparent',
      },
      optionBar: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
      },
      optionButton: {
        color: '#fff',
      }
    })
  )
}

const mapStateToProps = (state: any) => ({ 
  readerSidebar: state.reducer.readerSidebar,
  darkMode: state.reducer.darkMode,
  visibleLocation: state.reducer.visibleLocation,
  bookmarks: state.reducer.bookmarks,
  refreshBookmark: state.reducer.refreshBookmark,
  handleTop: state.reducer.handleTop, 
});

export default connect(mapStateToProps, actions)(ReaderTopView);
