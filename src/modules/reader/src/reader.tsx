import React, { useEffect, useState } from 'react'
import { View, StatusBar, BackHandler, Alert } from 'react-native'
import { useFocusEffect } from '@react-navigation/native'
import { Streamer } from 'epubjs-rn'
import { connect } from 'react-redux'

import * as actions from './redux/actions'
import { FullScreen, NetworkWarning } from '../../core/src/app'
import { readerCore, ReaderSidebar, ReaderMainView, ReaderBottomView, ReaderTopView, ReaderTopOverlay, ReaderOptions } from './components'

const Reader = (props: any) => {
  const [streamer, setStreamer] = useState(new Streamer(Math.floor(1000 + Math.random() * 9000)))
  const [cfi, setCfi] = useState(null)
  const [rendition, setRendition] = useState(null)
  // const [clearFlag, setClearFlag] = useState(null)
  const styles = readerCore.getStyleSheet()
  // const storeLogObj = () => { readerCore.storeLogObj(props) }

  useEffect(() => {
    props.alterTheme(props.readerConfig.theme)
    props.alterFontFamily(props.readerConfig.font_family)
    props.updateThemes(props.readerConfig.font_family)
    props.setFlow(props.readerConfig.flow)
    props.resizeFont(props.readerConfig.font_size)
    props.setYellowMode(props.readerConfig.yellow_mode)
    props.setDarkMode(props.readerConfig.dark_mode)
  }, [])

  useFocusEffect(() => {
    FullScreen.enable()
    // if(props.checkReaderConfig) {
    //   props.setCheckReaderConfig(false)
    //   if(props.userUid) readerCore.syncReaderState(props, props.userUid)
    // }
    
    const backAction = () => { readerCore.onBackAction(props, streamer); return true }
    const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction)
    return () => backHandler.remove()
  })
  
  // useEffect(() => {
  //   if(props.isReaderVisible && !props.readerOverlay) {
  //     const flag = setInterval(storeLogObj, 30000)
  //     setClearFlag(flag)
  //   } else if(!props.isReaderVisible && !props.readerOverlay) {
  //     clearInterval(clearFlag)
  //     setClearFlag(null)
  //   }
  // }, [props.readerOverlay, props.isReaderVisible])

  useEffect(() => { initialCall() }, [])

  const initialCall = async () => {
    // set percentage to Zero
    props.setLocation(0)
    // Load Book
    readerCore.streamBook(props, streamer, 5)
  }

  const onSelected = (cfi: string, rendition: any) => {
    props.setHandleBottom(true)
    setCfi(cfi)
    setRendition(rendition)
  }

  return (
    <View style={styles.container}>
      <StatusBar hidden translucent animated={false} />
      <NetworkWarning />
      <ReaderMainView currentBook={props.currentBook} userUid={props.userUid}
        isInternetReachable={props.isInternetReachable}
        backPress={() => readerCore.overlayBackPress(props, streamer)} onSelected={onSelected} />
      {/* Top Progress Slider */}
      {props.handleTop ? readerCore.getSlider(props, styles) : null }
      {/* Top Menu Bar */}
      <ReaderTopOverlay />
      <ReaderTopView currentBook={props.currentBook} onPress={() => readerCore.onBackAction(props, streamer)} onAddBookmark={() => readerCore.addBookmark(props)} onRemoveBookmark={() => readerCore.removeBookmark(props)} />
      {/* Top Options Card */}
      <ReaderOptions currentBook={props.currentBook} userUid={props.userUid} />
      {/* Text Decorator Tools */}
      <ReaderBottomView onAddHighlight={ () => readerCore.onAddHighlight (props, rendition, cfi)} />
      {/* Sidebar Area*/}
      <ReaderSidebar currentBook={props.currentBook} />
    </View>
  )
}

const mapStateToProps = (state: any) => ({ 
  isReaderVisible: state.reducer.isReaderVisible, 
  handleTop: state.reducer.handleTop, 
  bookmarks: state.reducer.bookmarks,
  percentage: state.reducer.percentage,
  sliderDisabled: state.reducer.sliderDisabled,
  visibleLocation: state.reducer.visibleLocation,
  readerSidebar: state.reducer.readerSidebar, 
  readerOverlay: state.reducer.readerOverlay, 
  readerFlag: state.reducer.readerFlag, 
  readerLoader: state.reducer.readerLoader,
  checkReaderConfig: state.reducer.checkReaderConfig,
  startReadingTime: state.reducer.startReadingTime,
  highlights: state.reducer.highlights,
  refreshBookmark: state.reducer.refreshBookmark,
  book: state.reducer.book,
  currentUserUid: state.reducer.currentUserUid,
});

export default connect(mapStateToProps, actions)(Reader)
