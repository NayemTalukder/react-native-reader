import React from 'react'
import { Alert, Linking} from 'react-native'
import VersionCheck from 'react-native-version-check'
import RNExitApp from 'react-native-exit-app'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import AsyncStorage from '@react-native-community/async-storage'
import axios from 'axios'
import publicIP from 'react-native-public-ip'
import { readerCore } from '../../../reader/src'
import { auth } from '.'


export const core = {
  popItem (array: any[], item: any) {
    const index: number = array.indexOf(item)
    if (index > -1) array.splice(index, 1);
  },

  deleteItemFromArray (array: any, item: any) {
    const index = array.findIndex((elem: any) => elem.name === item.name )
    array.splice(index, 1)
  },

  getExcerpt(title: string, limit: number) {
    if (title.length <= limit) return title
    else return title.slice(0, limit) + '...'
  },  
  
  // [Start] => AsyncStorage Handling
  async getFromAsyncStorage (key: string, isString: Boolean) {
    try {
      const jsonValue = await AsyncStorage.getItem(key)
      if (isString) return jsonValue
      return jsonValue != null ? JSON.parse(jsonValue) : null
    } catch (e) {
      // saving error
    }
  },
  async storeInAsyncStorage (value: object | string, key: string) {
    try {
      let jsonValue = value
      if (typeof jsonValue === 'object') jsonValue = JSON.stringify(value)
      await AsyncStorage.setItem(key, jsonValue)
    } catch (e) {
      // saving error
    }
  },  
  async removeValue () {
    try {
      await AsyncStorage.removeItem('@MyApp_key')
    } catch(e) {
      // remove error
    }
  },
  // [End] <= AsyncStorage Handling

  async getCountry () {
    const ip = await publicIP()
    let country = (
      await axios.get(`https://api.ipgeolocationapi.com/geolocate/${ip}`)
      .then(res => {
        if (res && res.data) return res.data.name
        return null
      }).catch(() => { return null })
    )
    if (country) return country
    else {
      axios.get(`http://api.ipstack.com/${ip}?access_key=YOUR_ACCESS_KEY`)
        .then(res => {
          if (res && res.data) return res.data.country_name
          return ''
        }).catch(() => { return '' })
    }
  },

  async checkVersion () {
    try {
      let updateNeeded = await VersionCheck.needUpdate()
      if (updateNeeded.isNeeded) {
        Alert.alert(
          'Please Update', 
          'You will have to update your app to the latest version to continue using.', 
          [
            { 
              text: 'Update', 
              onPress: () => {
                Linking.openURL(updateNeeded.storeUrl)
                RNExitApp.exitApp()
              }
            }
          ],
          { cancelable: false },
        )
      }
    } catch (error) { console.log('error', error) }
  },

  async getHomeContent (props: any, actions: Function[], retry: number, setRetry: Function) {},

  resetHomeSate (actions: Function[]) {},

  async handleCloudMessage (data: any, props: any, setLoading: any, routes: string[]) {},

  // [Start] => Handle Fetching
  fetchInitial(props: any, actions: Array<Function>) {},
  
  createPromise(promisses: any, collection: string, action: Function, orderBy: string, limit: number, doc: string) {},
  fetch(collection: string, orderBy: string, limit: number, doc: string) {},

  async conditionFetch(field: string, value: string, limit: number) {},

  fetchUserActivityList (props: any, collection: string, setActivityList: Function) {},
  // [End] <= Handle Fetching

  // [Start] => Handle Bookmark
  getUserActivitykRef (collection: string, props: any, book: any, isAsc: Boolean, docId: string) {},

  setIsListed (props: any, book: any, setIsListed: Function, collection: string) {},

  onBookmarkIconPress (props: any, isListed: Boolean, setIsListed: Function, book: any) {},

  deleteThenAdd (props: any, book: any, setIsListed: Function) {},
  // [End] <= Handle Bookmark

  // [Start] => Handle Review
  fetchReviews (book: any = {}, setReviews: Function = () => {}, setVisible: Function) {},
  
  async onReact (user: any, book: any, item: any, setVisible: Function, isLike: Boolean, navigation: any) {},

  async onSubmitReview (user: any, book: any, comment: string, rating: number, parrent: string = null, setVisible: Function , reviews: any, setReviews: Function, docId: string, navigation: any) {},
  // [End] <= Handle Review
  
  // [Start] => Handle Recommendaion

  // Build Recommendation List
  setRecommendationData (book: any) {
    this.pushRecommendationData('@authors', [book.serial_number_author])
    this.pushRecommendationData('@categories', book.serial_number_category)
  },
  async pushRecommendationData (field: string, data: object[]) {},

  // Fetch Recommendation Books
  async fetchRecommendedBooks (limit: number) {},

  async getRandomBooks (limit: number) {},

  async filteredArray (array: object[], limit: number) {},

  async fetchRecommended (field: string, array: string[], Books: any) {},

  pickRandomNumber (min: number, max: number) {
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min + 1)) + min
  },
  // [End] <= Handle Recommendaion

  getUid (props: any, item: any) {},

  // [Start] => Handle Payment
  async paymentGateway (props: any, item: any) {}
}