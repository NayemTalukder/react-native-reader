import * as React from 'react'
import { Text, View } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createStackNavigator } from '@react-navigation/stack';

import Home from '../screens/Home'
import Author from '../screens/Author'
import Genre from '../screens/Genre'
import Library from '../screens/Library'
import Me from '../screens/Me'
import Reader from '../screens/Reader'
import { Icon } from '../modules/core/src/app'

const HomeActive = require('../assets/bottom-tab-icons/HomeActive.png')
const HomeInActive = require('../assets/bottom-tab-icons/HomeInActive.png')
const AuthorActive = require('../assets/bottom-tab-icons/AuthorActive.png')
const AuthorInActive = require('../assets/bottom-tab-icons/AuthorInActive.png')
const GenreActive = require('../assets/bottom-tab-icons/GenreActive.png')
const GenreInActive = require('../assets/bottom-tab-icons/GenreInActive.png')
const LibraryActive = require('../assets/bottom-tab-icons/LibraryActive.png')
const LibraryInActive = require('../assets/bottom-tab-icons/LibraryInActive.png')
const MeActive = require('../assets/bottom-tab-icons/MeActive.png')
const MeInActive = require('../assets/bottom-tab-icons/MeInActive.png')

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const getSource = (title: string) => {
  if (title === 'Home') return [HomeActive, HomeInActive]
  else if (title === 'Author') return [AuthorActive, AuthorInActive]
  else if (title === 'Genre') return [GenreActive, GenreInActive]
  else if (title === 'Library') return [LibraryActive, LibraryInActive]
  else if (title === 'Me') return [MeActive, MeInActive]
}

const sceneContainerStyle = {
    backgroundColor: '#FFFFFF'
}

const tabBarOptions: any = {
    lazy: true,
    labelStyle: {
      color: '#FFFFFF',
      fontFamily: 'Ubuntu',
      fontWeight: 'normal',
      fontSize: 8,
    },
    style: { height: 44 }
}

const tabOptions = (title: string, width: number, height: number) => {
  const source = getSource(title)
  return ({
    tabBarLabel: ({focused}: {focused: boolean}) => (
      <Text style={[focused ? {color: '#0BA3FF'} : {color: '#CCCCCC'}, {marginBottom: 3, fontSize: 9}]} >{title}</Text>
    ),
    tabBarIcon: ({focused}: {focused: boolean}) => (
      <Icon imageContainerStyle={{flex: 1, marginTop: 6}} width={width * 1.25} height={height * 1.25} activeOpacity={0.3} 
            source={focused ? source[0] : source[1]} />
    ),
  })
}

const screenOptions = { 
  headerLeft: null,
  cardStyle: {
    backgroundColor: '#FFFFFF'
  }
}

export const BottmTab = () => (
  <Tab.Navigator sceneContainerStyle={sceneContainerStyle} tabBarOptions={tabBarOptions} >
    <Tab.Screen options={tabOptions('Home', 14.22, 16)} name="Home" component={Home} />
    <Tab.Screen initialParams={{navigateTo: false}} options={tabOptions('Author', 14, 15.59)} name="Author" component={Author} />
    <Tab.Screen initialParams={{navigateTo: false}} options={tabOptions('Genre', 15, 12.19)} name="Genre" component={Genre} />
    <Tab.Screen options={tabOptions('Library', 14.22, 16)} name="Library" component={Library} />
    <Tab.Screen options={tabOptions('Me', 12, 14)} name="Me" component={Me} />
  </Tab.Navigator>
)

const Navigations = () => (
  <NavigationContainer>
    <Stack.Navigator screenOptions={screenOptions} headerMode="screen" >
      <Stack.Screen options={{ headerShown: false }} name="Home" component={BottmTab} />
      <Stack.Screen options={{ headerShown: false }} name="Reader" component={Reader} />
    </Stack.Navigator>
  </NavigationContainer>
)

export default Navigations
