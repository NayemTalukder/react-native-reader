import { StyleSheet, Dimensions, Alert, Linking} from 'react-native'
// import { AccessToken, LoginManager } from 'react-native-fbsdk'
import AsyncStorage from '@react-native-community/async-storage'
import { readerCore } from '../../../reader/src'

export const authentication = {
  async googleAuth (props: any, setVisible: Function) {
    // const { idToken } = await GoogleSignin.signIn()
    // const googleCredential = auth.GoogleAuthProvider.credential(idToken)
    // await auth().signInWithCredential(googleCredential)
    // .then(() => this.syncInitialState(props, setVisible))
    // .catch(() => {
    //   Alert.alert('Warning!', 'Something went wrong.', [
    //       { text: 'Ok', onPress: () => setVisible(false) }
    //   ])
    // })
  },

  async facebookAuth (props: any, setVisible: Function) {
    // const result = await LoginManager.logInWithPermissions(['public_profile', 'email'])
    // if (result.isCancelled) {
    //   throw 'User cancelled the login process'
    // }
    // const data = await AccessToken.getCurrentAccessToken()
    // if (!data) {
    //   throw 'Something went wrong obtaining access token'
    // }
    // const facebookCredential = auth.FacebookAuthProvider.credential(data.accessToken)
    // auth().signInWithCredential(facebookCredential)
    // .then(() => {
    //   this.syncInitialState(props, setVisible)
    // })
    // .catch(err => {
    //   Alert.alert('Warning!', 'Something went wrong', [
    //       { text: 'Ok', onPress: () => setVisible(false) }
    //   ])
    // })
  },

}