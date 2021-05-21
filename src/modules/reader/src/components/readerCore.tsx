import React from 'react'
import { Alert } from 'react-native'
import axios from 'axios'
import Orientation from '@lightbase/react-native-orientation'
import publicIP from 'react-native-public-ip'
import AsyncStorage from '@react-native-community/async-storage'
import Slider from '@react-native-community/slider'
import { StyleSheet } from 'react-native'
import { core, FullScreen, dateTime, dateUnderscore } from '../../../core/src/app'

export const readerCore = {
  //[Start] HandloverlayBackPress
  getStyleSheet () {
    return StyleSheet.create({
      container: {
        flex: 1,
      },
      slider: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        //height: 120,
        backgroundColor: 'transparent',
        flex: 1,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row'
      }
    })
  },

  // Temporary
  // syncInitialState () {
  //   auth().onAuthStateChanged(async user => {
  //     if (user) {
  //       let val = true
  //       await firestore().collection("Users").doc(user.uid).get()
  //       .then(querySnapshot => { if(querySnapshot.exists) val = false })
  //       // Set Initial User State
  //       if(val) {
  //         firestore().collection('Users').doc(user.uid).set({
  //           PersonalData: {
  //             email: user.email,
  //             user_name: user.displayName,
  //             first_name: user.displayName,
  //             last_name: '',
  //             phone: user.phoneNumber,
  //           },
  //           ReaderConfig: {
  //             dark_mode: false,
  //             flow: 'paginated',
  //             font_family: 'Kalpurush',
  //             font_size: 21,
  //             yellow_mode: false,
  //             theme: 'Bright',
  //           }
  //         })
  //       }
  //     }
  //   })
  // },
  
  // Handle syncReaderState
  // syncReaderState (props: any, userUid: string) {
  //   firestore().collection('Users').doc(userUid).get()
  //   .then(querySnapshot => {
  //     if(querySnapshot.exists){
  //       props.alterTheme(querySnapshot.data().ReaderConfig.theme)
  //       props.alterFontFamily(querySnapshot.data().ReaderConfig.font_family)
  //       props.updateThemes(querySnapshot.data().ReaderConfig.font_family)
  //       props.setFlow(querySnapshot.data().ReaderConfig.flow)
  //       props.resizeFont(querySnapshot.data().ReaderConfig.font_size)
  //       props.setYellowMode(querySnapshot.data().ReaderConfig.yellow_mode)
  //       props.setDarkMode(querySnapshot.data().ReaderConfig.dark_mode)
  //     }
  //   })
  // },

  // async clearAllKeys () {
  //   let keys = []
  //   try {
  //     keys = await AsyncStorage.getAllKeys()
  //   } catch(e) {
  //     // read key error
  //   }
  
  //   const safeKeys = ["@logFlag", "@logObj", "@recentList", "@downloadList"]
  //   const result = keys.filter(word => !safeKeys.includes(word))

  //   try {
  //     await AsyncStorage.multiRemove(result)
  //   } catch(e) {
  //     // remove error
  //   }
  // },

  // Handle Download
  // async downloadBook (currentBook:any, streamer: any, setScreenRefresher: Function, attempt: number) {
  //   if (attempt > 0) {
  //     this.setLibraryList('@downloadList', null, currentBook, 'pending')
  //     await this.clearAllKeys()
  //     const bookUrl = `https://book-storage-bupko.s3.ap-south-1.amazonaws.com/${currentBook.book}`
  //     streamer.start().then(async (origin: string) => {
  //       streamer.check(bookUrl).then((res: any) => {
  //         if (!res) 
  //           streamer.get(bookUrl).then((src: string) => {
  //             if(!src) this.downloadBook(currentBook, streamer, setScreenRefresher, attempt-1)
  //             else {
  //               this.setLibraryList('@downloadList', null, currentBook, 'success').then(() => setScreenRefresher())
  //               streamer.kill()
  //             }
  //           }).catch(() => this.downloadBook(currentBook, streamer, attempt-1) )
  //         else{
  //           this.setLibraryList('@downloadList', null, currentBook, 'success').then(() => setScreenRefresher())
  //           streamer.kill()
  //         }
  //       }).catch((e: any) => this.downloadBook(currentBook, streamer, setScreenRefresher, attempt-1) )
  //     }).catch(() => this.downloadBook(currentBook, streamer, setScreenRefresher, attempt-1) )
  //   } else this.setLibraryList('@downloadList', null, currentBook, 'failed')
  // },

  // Start Streamer
  streamBook (props:any, streamer: any, attempt: number) {
    if (attempt > 0) {
      const bookUrl = `https://book-storage-bupko.s3.ap-south-1.amazonaws.com/${props.currentBook.book}`
      streamer.start().then(async (origin: string) => {
        props.setOrigin(origin)
        return streamer.get(bookUrl)
          .then((src: string) => {
            props.setSource(src)
          })
          .catch((e: any) => {
            this.streamBook(props, streamer, attempt-1)
          })
      })
      .catch((e: any) => {
        this.streamBook(props, streamer, attempt-1)
      })
    } else {
      Alert.alert('Warning!', 'Something went wrong. Please check your internet and try again.', [
        { text: 'Ok', onPress: () => this.overlayBackPress(props, streamer) }
      ])
    }
  },

  //[Start] Handle Slider
  getSlider (props: any, styles: any) {
    return <Slider
      thumbTintColor='#674DEC'
      minimumTrackTintColor='#674DEC'
      maximumTrackTintColor='#C2B8F7'
      style={styles.slider}
      disabled={props.sliderDisabled}
      value={props.visibleLocation ? props.visibleLocation.start.percentage : 0}
      onSlidingComplete={(value) => this.onSlidingComplete(props, value)} />
  },

  onSlidingComplete (props: any, value: number) {
    props.setLocation(value.toFixed(6))
    // analytic.reader_log_event(['reader_slider_navigate', props.currentBook.name])
  },//[END] Handle Slider

  // restoreHighlightBookmark (props: any, collection: string, action: Function) {
  //   const BookData = firestore().collection('BookData').doc(props.currentBook.name)
  //   BookData.collection(collection).doc(props.userUid).get().then(data => {
  //     if(data.exists) {
  //       if(collection === 'Bookmarks') action(data.data().bookmarks)
  //       else if(collection === 'Highlights') action(data.data().highlights)
  //     }
  //   })
  // },

  //[Start] Handle Highlight
  onAddHighlight (props: any, rendition: any, cfi: string) {
    this.doHighlight(props, rendition, cfi)
    props.setHandleBottom(false)              
    // analytic.reader_log_event(['reader_do_highlight', props.currentBook.name]) 
  },

  doHighlight (props: any, rendition: any, cfi: string) {
    rendition.highlight(cfi, {})
    props.book.getRange(cfi)
    .then((range) => {
      const text = `${range.endContainer.data.substring(0, 35)}.....`
      const highlights = props.highlights
      highlights.push({ text, cfi })
      props.setHighlights(highlights)
      // if (props.userUid) this.updateHighlights(props, ['add', { text, cfi }])
    })
  },

  removeHighlight (props: any, rendition: any, cfi: string) {
    rendition.unhighlight(cfi)
    const prevHighlights = props.highlights
    let removedHighlight = null
    const filteredHighlights = prevHighlights.filter((item: any) => {
      if(item.cfi === cfi) removedHighlight = item
      return item.cfi !== cfi
    })
    props.setHighlights(filteredHighlights)
    // if (props.userUid) this.updateHighlights(props, ['remove', removedHighlight])
  },

  // updateHighlights (props: any, value: Array<object | string>) {
  //   const BookData = firestore().collection('BookData').doc(props.currentBook.name)
  //   const [type, data] = value
  //   const Highlight = BookData.collection('Highlights').doc(props.userUid)
  //   Highlight.get().then(querySnapshot => {
  //     if (querySnapshot.exists) {
  //       if(type === 'add'){
  //         // analytic.reader_log_event(['reader_add_highlight', props.currentBook.name])
  //         Highlight.update({ highlights: firestore.FieldValue.arrayUnion(data)})
  //       } else if(type === 'remove'){
  //         // analytic.reader_log_event(['reader_remove_highlight', props.currentBook.name])
  //         Highlight.update({ highlights: firestore.FieldValue.arrayRemove(data)})
  //       }
  //     } else Highlight.set({ highlights: [data]})
  //   })
  // }, //[END] Handle Highlight

  //[Start] Handle Bookmark
  addBookmark (props: any) {
    const cfi = props.visibleLocation.start.cfi
    props.book.getRange(cfi)
    .then((range) => {
      const text = `${range.endContainer.data.substring(0, 35)}.....`
      const bookmarks = props.bookmarks
      bookmarks.push({ text, cfi })
      props.setBookmarks(bookmarks)
      props.setRefreshBookmark(!props.refreshBookmark)
      // if (props.userUid) this.updateBookmarks(props, ['add', { text, cfi }])
    })
  },
  
  removeBookmark (props: any) {
    const prevBookmarks = props.bookmarks
    const currentCfi = props.visibleLocation.start.cfi
    let removedBookmark = null
    const filteredBookmarks = prevBookmarks.filter(item => {
      if(item.cfi === currentCfi) removedBookmark = item
      return item.cfi !== currentCfi
    })
    props.setBookmarks(filteredBookmarks)
    // if (props.userUid) this.updateBookmarks(props, ['remove', removedBookmark])
  },

  // updateBookmarks (props: any, value: Array<object | string>) {
  //   const BookData = firestore().collection('BookData').doc(props.currentBook.name)
  //   const [type, data] = value
  //   const Bookmark = BookData.collection('Bookmarks').doc(props.userUid)
  //   Bookmark.get().then(querySnapshot => {
  //     if (querySnapshot.exists) {
  //       if(type === 'add'){
  //         // analytic.reader_log_event(['reader_add_bookmark', props.currentBook.name])
  //         Bookmark.update({ bookmarks: firestore.FieldValue.arrayUnion(data)})
  //       } else if(type === 'remove'){
  //         // analytic.reader_log_event(['reader_remove_bookmark', props.currentBook.name])
  //         Bookmark.update({ bookmarks: firestore.FieldValue.arrayRemove(data)})
  //       }
  //     } else Bookmark.set({ bookmarks: [data]})
  //   })
  // }, // [END] Handle Bookmark

  //  Handle Log
  // async storeLogObj (props:any) {
  //   const time_elapsed = Math.abs(Date.now() - props.startReadingTime) / 1000
  //   const logObj = {
  //     book: props.currentBook.name,
  //     author: props.currentBook.author,
  //     category: props.currentBook.category,
  //     publisher: props.currentBook.publisher,
  //     created_at: dateTime(new Date()),
  //     book_created_at: props.currentBook.name+'_'+dateUnderscore(new Date()),
  //     time_elapsed: Math.round(time_elapsed)
  //   }
  //   await this.storeInAsyncStorage(logObj, '@logObj')
  //   await this.storeInAsyncStorage({logFlag: true}, '@logFlag')
  // },

  async storeInAsyncStorage (value: object, setItemFlag: string) {
    try {
      const jsonValue = JSON.stringify(value)
      await AsyncStorage.setItem(setItemFlag, jsonValue)
    } catch (e) {
      // saving error
    }
  },

  async getFromAsyncStorage (getItemFlag: string) {
    try {
      const jsonValue = await AsyncStorage.getItem(getItemFlag)
      return jsonValue != null ? JSON.parse(jsonValue) : null
    } catch (e) {
      // saving error
    }
  },

  // async logItem (props: any, logFlag: Boolean, logObj: object) {
  //   let log = null
  //   if(logFlag) log = logObj 
  //   else {
  //     const time_elapsed = Math.abs(Date.now() - props.startReadingTime) / 1000
  //     log = {
  //       book: props.currentBook.name,
  //       author: props.currentBook.author,
  //       category: props.currentBook.category,
  //       publisher: props.currentBook.publisher,
  //       created_at: dateTime(new Date()),
  //       book_created_at: props.currentBook.name+'_'+dateUnderscore(new Date()),
  //       time_elapsed: Math.round(time_elapsed)
  //     }
  //   }
  //   const newRef = firestore().collection('Logs')
  //   const ip = await publicIP()
  //   const country = await core.getCountry()

  //   await newRef.add({...log, ip, country }).then(() => console.log('Data Logged.'))
  //   // analytic.reader_log_event(['log_added'])
  // },


  // Handle BackPress
  overlayBackPress (props: any, streamer: any) {
    streamer.kill()
    setTimeout(() => FullScreen.disable(), 1000)
    props.setIsReaderVisible(false)
    props.setReaderOverlay(false)
    props.setReaderFlag(true)
    props.setLoaderFlag(true)
    props.navigation.goBack()
  },

  // setLibraryList (key: string, props: any, book: any, status: string) {
  //   let currentBook = {...book, status, time_stamp: Date.now(), key}
  //   if (props) currentBook = {...props.currentBook, percentage: props.percentage, time_stamp: Date.now(), key}
  //   return this.getFromAsyncStorage(key).then(res => {
  //     if(res) {
  //       const newList = []
  //       res.forEach((e: any) => {
  //         if (e.name !== currentBook.name) newList.push(e)
  //       })
  //       newList.unshift(currentBook)
  //       return this.storeInAsyncStorage(newList, key)
  //     } else return this.storeInAsyncStorage([currentBook], key)
  //   })
  // },

  onBackAction (props: any, streamer: any) {
    // this.setLibraryList('@recentList', props)
    streamer.kill()
    this.storeInAsyncStorage({logFlag: false}, '@logFlag')
    setTimeout(() => FullScreen.disable(), 1000)
    Orientation.lockToPortrait()
    props.setIsReaderVisible(false)
    props.setReaderFlag(true)
    props.setLoaderFlag(true)
    // props.setBookData(true)
    // this.logItem(props, false, null)
    // this.updateFavourites(props)
    // this.updateContinueReading(props)
    props.navigation.goBack()
  },

  // Start Favourites
  // updateFavourites (props:any) {
  //   const ref = firestore().collection('UsersActivity').doc(props.userUid).collection('Favourites').doc(props.currentBook.name)
  //   if(props.userUid) {
  //     ref.get().then(snap => {
  //       if(snap.exists) ref.update({ percentage: props.percentage, time_stamp: Date.now() })
  //     })
  //   }
  // },

  // Start ContinueReading
  // updateContinueReading (props: any) {
  //   const ref = firestore().collection('UsersActivity').doc(props.userUid).collection('ContinueReading').doc(props.currentBook.name)
  //   const ContinueCount = firestore().collection('UsersActivity').doc(props.userUid)
  //   const currentBook = { ...props.currentBook, percentage: props.percentage, time_stamp: Date.now() }

  //   if(props.userUid) {
  //     ref.get().then(snapShot => {
  //       if(snapShot.exists) ref.set({...currentBook}, {merge: true})
  //       else {
  //         ContinueCount.get().then(snap => {
  //           if(snap.exists && snap.data().continueCount ? true : false) {
  //             if(snap.data().continueCount < 100){
  //               ref.set(currentBook)
  //               ContinueCount.update({ continueCount: snap.data().continueCount + 1 })
  //             } else {
  //               ContinueCount.collection("ContinueReading").orderBy("time_stamp", "asc").limit(1).get()
  //               .then(querySnapshot => {
  //                 querySnapshot.forEach(doc => {
  //                   doc.ref.delete()
  //                   ref.set(currentBook)
  //                 })
  //               })
  //             }
  //           } else {
  //             ref.set(currentBook)
  //             ContinueCount.set({ continueCount: 1 }, {merge: true})
  //           } 
  //         })
  //       }
  //     })
  //   }
  // },

  //ReaderMainView.js_onReady
  onReady (book: any, props: any) {
    const chapters = book.navigation.toc.map(row => row.href)
    props.setChapters(chapters)
    props.setTitle(book.package.metadata.title)
    props.setToc(book.navigation.toc)
    props.setBook(book)
  },

  //ReaderMainView.js_onLocationsReady
  onLocationsReady (locations: any, props: any) {
    setTimeout(() => {
      props.navigationButtonDisabled(false)
    }, 1000)
    props.setSliderDisabled(false)
  },

  //ReaderMainView.js_onLocationChange
  onLocationChange (VisibleLocation: any, props: any) {
    console.log(`VisibleLocation`, VisibleLocation)
    props.setVisibleLocation(VisibleLocation)
    props.setPercentage(VisibleLocation.start.percentage)
    props.setChapterIndex(VisibleLocation.start.href)
    props.setStartReadingTime(new Date())
    if(props.loaderFlag) {
      props.setLoaderFlag(false)
      props.setIsReaderVisible(true)
      this.setPercentage(props)
    }
  },

  //ReaderMainView.js_setPercentage
  setPercentage (props: any) {
    this.getFromAsyncStorage('@recentList').then(res => {
      if(res) {
        const found = res.find((elem: any) => elem.name === props.currentBook.name )
        if (found) {
          if(found.percentage !== 0) {
            props.setLocation(found.percentage.toFixed(6))
            setTimeout(() => props.setReaderOverlay(false), 1000)
          } else props.setReaderOverlay(false)
        } else props.setReaderOverlay(false)
      } else props.setReaderOverlay(false)
    })
  },

  // ReaderMainView.js_onPress
  onPress (rendition: any, props: any, highlights: any, bookmarks: object[]) {
    if (props.bookData) {
      props.setBookData(false)
      props.setHighlights(highlights)
      props.setBookmarks(bookmarks)
      for (let i = 0; i < highlights.length; i++) 
        rendition.highlight(highlights[i].cfi, {})
    }
    // toggle top icons
    if (props.handleTop) props.setHandleTop(false)
    else props.setHandleTop(true)
    // hide Options
    props.setHandleOptions(false)
    // hide bottom bar
    props.setHandleBottom(false)
  },

  //ReaderMainView.js_onMarkClicked
  onMarkClicked (cfiRange: string, data: object, rendition: any, props: any) {
    props.book.getRange(cfiRange)
    .then((range: any) => {
      const text = `${range.endContainer.data.substring(0, 35)}.....`
      Alert.alert('Remove Highlight!', `Do you really want to remove "${text}" this Highlight ?`, [
        { text: 'Yes', onPress: () => this.removeHighlight(props, rendition, cfiRange) },
        { text: 'No', onPress: () => null }
      ])
    })
  }
}