import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import Orientation from '@lightbase/react-native-orientation';
import { connect } from 'react-redux';

import * as actions from '../redux/actions/';
import ReaderOptionUpperSegment from './ReaderOptionUpperSegment';
import ReaderOptionLowerSegment from './ReaderOptionLowerSegment';

const { width: sw, height: sh } = Dimensions.get('window');

const ReaderOptions = (props: any) => {
  const [isPortrait, setIsPortrait] = useState(true)
  // const ReaderConfig = firestore().collection('Users').doc(props.userUid)
  const styles = getStyleSheet(props.handleOptions, isPortrait)
  
  const updateFontFamily = (payload: string) => {
    // if (props.userUid !== null) ReaderConfig.update({ 'ReaderConfig.font_family': payload });
  };

  useFocusEffect(() => {
    Orientation.getOrientation((error, orientation) => {
      if (orientation === Orientation.LANDSCAPE) setIsPortrait(true)  
      else setIsPortrait(false) 
    });
  })

  const updateTheme = (mode: string) => {
    // analytic.reader_log_event(['reader_change_theme', props.currentBook.name, 'theme', mode ]);
    // if (props.userUid !== null) {
    //   if (mode === 'Yellow') {
    //     ReaderConfig.update({
    //       'ReaderConfig.theme': 'Yellow',
    //       'ReaderConfig.yellow_mode': true,
    //       'ReaderConfig.dark_mode': false,
    //     });
    //   } else if (mode === 'Dark') {
    //     ReaderConfig.update({
    //       'ReaderConfig.theme': 'Dark',
    //       'ReaderConfig.dark_mode': true,
    //       'ReaderConfig.yellow_mode': false,
    //     });
    //   } else {
    //     ReaderConfig.update({
    //       'ReaderConfig.theme': 'Bright',
    //       'ReaderConfig.dark_mode': false,
    //       'ReaderConfig.yellow_mode': false,
    //     });
    //   }
    // }
  };

  const onRightPress = () => {
    if(props.theme === 'Bright'){
      props.alterTheme('Yellow');
      props.setYellowMode(true);
      updateTheme('Yellow');
    } else if(props.theme === 'Yellow'){
      props.alterTheme('Dark');
      props.setYellowMode(false);
      props.setDarkMode(true);
      updateTheme('Dark');
    } else if (props.theme === 'Dark'){
      props.alterTheme('Bright');
      props.setDarkMode(false);
      updateTheme('Bright');
    }
  }

  const onLeftPress = () => {
    if(props.theme === 'Bright'){
      props.alterTheme('Dark');
      props.setDarkMode(true);
      updateTheme('Dark');
    } else if(props.theme === 'Yellow'){
      props.alterTheme('Bright');
      props.setYellowMode(false);
      updateTheme('Bright');
    } else if (props.theme === 'Dark'){
      props.alterTheme('Yellow');
      props.setDarkMode(false);
      props.setYellowMode(true);
      updateTheme('Yellow');
    }
  }
     
  return (
    <View style={styles.bar} >
        { props.handleOptions
        ? <View style={[styles.optionBar]} >
            <View style={{ marginBottom: sw > 500 ? sw * .02 : sw * .04 }}/>
            <ReaderOptionUpperSegment
              onRightPress={onRightPress}
              onLeftPress={onLeftPress}  
              heading='Background Color' 
              text={props.theme}
              backgroundColor={props.theme === 'Dark' ? '#312E43'  :  props.theme === 'Yellow' ? '#FFF4D8' : '#FFFFFF'}
              textColor={props.theme === 'Dark' ? '#fff' : ''}
            />
            {/* {isPortrait ? <View style={{ marginBottom: 15 }}/> : null } */}
            <ReaderOptionLowerSegment currentBook={props.currentBook} userUid={props.userUid} />
          </View> : null }
    </View>
  );
} 

const getStyleSheet = (handleOptions: Boolean, isPortrait: Boolean,) => (
  StyleSheet.create({
    bar: {
      position: 'absolute',
      left: 0,
      right: 0,
      top: 0,
      height: handleOptions ? !isPortrait ? sh * 0.33 : sw * 0.71 : 0,
      backgroundColor: '#fff',
      borderBottomLeftRadius: 20,
      borderBottomRightRadius: 20,
      
      shadowColor: 'rgba(0, 0, 0, 0.15)',
      shadowOffset: {
        width: 0,
        height: 12,
      },
      shadowOpacity: 0.58,
      shadowRadius: 16.00,
      
      elevation: 40,
    },
    optionBar: {
      flex: 1,
      // justifyContent: 'flex-end',
      alignItems: 'center',
      // paddingLeft: 7,
      // marginRight: -(sw * 0.057),
    },
    darkIcon: {
        color: '#fff'
    }
  })
)

const mapStateToProps = (state: any) => ({ 
  handleOptions: state.reducer.handleOptions,
  theme: state.reducer.theme
});

export default connect(mapStateToProps, actions)(ReaderOptions);

