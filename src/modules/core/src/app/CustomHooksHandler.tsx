import React, { useState, useEffect } from 'react'
import { ActivityIndicator, StyleSheet } from 'react-native'
import { Overlay } from 'react-native-elements'

import { useEmailLinkEffect, useCloudMessageEffect, useCustomLoaderEffect } from '.'

const CustomHooksHandler = (props: any) => {
  const { emailLinkLoader } = useEmailLinkEffect(props.homeProps)
  const { cloudMessageLoader } = useCloudMessageEffect(props.homeProps)
  const loading = emailLinkLoader || cloudMessageLoader
  const { CustomLoader } = useCustomLoaderEffect(loading)

  if(loading)  return <CustomLoader />

  return null
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(250,250,250,0.33)',
    justifyContent: 'center',
    alignItems: 'center',
  },
})

export { CustomHooksHandler }