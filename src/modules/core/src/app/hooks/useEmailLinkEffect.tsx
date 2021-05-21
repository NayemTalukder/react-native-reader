import React, { useState, useEffect } from 'react' 
import { Alert } from 'react-native'
import AsyncStorage from '@react-native-community/async-storage' 
import { useNavigation } from '@react-navigation/native' 
import { auth as Auth } from '../'

export const useEmailLinkEffect = (props: any) => {
  const [emailLinkLoader, setLoading] = useState(false) 
  const [error, setError] = useState(null) 

  return { emailLinkLoader, error } 
}