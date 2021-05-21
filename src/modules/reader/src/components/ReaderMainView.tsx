import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';
import { useFocusEffect } from '@react-navigation/native'
import { Epub } from 'epubjs-rn'
import { Overlay } from 'react-native-elements'
import { connect } from 'react-redux';

import * as actions from '../redux/actions/';
import ReaderOverlay from './ReaderOverlay';
import { readerCore } from '.';

const ReaderMainView = (props: any) => {
  const [highlights, setHighlights] = useState([]);
  const [bookmarks, setBookmarks] = useState([]);
  const styles = getStyleSheet()

  useFocusEffect(() => {
    if (props.readerFlag) {
      props.setHandleBottom(false);
      props.setHighlights([]);
      setHighlights([]);
      props.setBookmarks([]);
      setBookmarks([]);
      props.setReaderFlag(false);
    }
  });

  // useEffect(() => {
  //   if (props.userUid && !props.readerFlag) {
  //     readerCore.restoreHighlightBookmark(props, 'Bookmarks', setBookmarks)
  //     readerCore.restoreHighlightBookmark(props, 'Highlights', setHighlights)
  //   }
  // }, [props.readerFlag]);

  return (
      <View style={styles.readerContainer} >
        { props.isReaderVisible && !props.isInternetReachable
        ? <Overlay isVisible onRequestClose={() => props.setIsLoaderVisible(false) } > 
              <ActivityIndicator size='large' /> 
          </Overlay> : null }
        <ReaderOverlay backPress={props.backPress} isVisible={props.readerOverlay} />
        { props.src !== ''
        ? <Epub
            style={styles.reader}
            origin={props.origin}
            src={props.src}
            flow={props.flow}
            location={props.location}
            onLocationChange={(VisibleLocation: any) => readerCore.onLocationChange(VisibleLocation, props)}
            onLocationsReady={(locations: any) => readerCore.onLocationsReady(locations, props)}
            onReady={(book: any) => readerCore.onReady(book, props)}
            onPress={(c:any, p:any, rendition:any) => readerCore.onPress(rendition, props, highlights, bookmarks)}
            onSelected={props.onSelected}
            onMarkClicked={(cfiRange:string, d:object, rendition:any) => readerCore.onMarkClicked(cfiRange, d, rendition, props)}
            themes={props.themes}
            theme={props.theme}
            onError={(message: any) => console.log('EPUBJS-Webview', message) }
            fontSize={`${props.fontSize}px`} /> : null }   
      </View>
  )
}

const getStyleSheet = () => (
  StyleSheet.create({
    readerContainer: {
      flex: 1
    },
    reader: {
      flex: 1,
      alignSelf: 'stretch',
      backgroundColor: '#3F3F3C'
    },
  })
)

const mapStateToProps = (state: any) => ({ 
  origin: state.reducer.origin, 
  src: state.reducer.src, 
  book: state.reducer.book,
  flow: state.reducer.flow, 
  location: state.reducer.location, 
  theme: state.reducer.theme, 
  themes: state.reducer.themes, 
  fontSize: state.reducer.fontSize, 
  bookData: state.reducer.bookData, 
  readerOverlay: state.reducer.readerOverlay, 
  handleTop: state.reducer.handleTop, 
  handleBottom: state.reducer.handleBottom,
  fetchedPercentage: state.reducer.fetchedPercentage, 
  orientation: state.reducer.orientation, 
  readerFlag: state.reducer.readerFlag, 
  isReaderVisible: state.reducer.isReaderVisible, 
  highlighterToggle: state.reducer.highlighterToggle, 
  prevBook: state.reducer.prevBook, 
  visibleLocation: state.reducer.visibleLocation,
  loaderFlag: state.reducer.loaderFlag,
  highlights: state.reducer.highlights,
});

export default connect(mapStateToProps, actions)(ReaderMainView);
