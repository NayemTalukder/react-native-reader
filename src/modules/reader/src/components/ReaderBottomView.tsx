import React from 'react';
import { View, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

import { connect } from 'react-redux';
import * as actions from '../redux/actions/';

const { width: sw, height: sh } = Dimensions.get('window');

const ReaderBottomView = (props: any) => {
  const styles = getStyleSheet(props.handleBottom, props.darkMode, props.yellowMode)
  return (
    <View style={styles.bar} >
        { props.handleBottom
        ? <View style={styles.optionBar} >
            <TouchableOpacity onPress={props.onAddHighlight} style={styles.optionButton} >
                <FontAwesome5 style={styles.iconColor} name="highlighter" size={30} /> 
            </TouchableOpacity>
          </View> : null }
    </View>
  );
}

const getStyleSheet = (handleBottom: Boolean, darkMode: Boolean, yellowMode: Boolean) => {
  return StyleSheet.create({
    bar: {
      height: handleBottom ? 60 : 0,
      alignItems: 'center',
      // width: sw * 0.1,
      position: 'absolute',
      // left: sw * 0.45,
      left: 0,
      right: 0,
      top: 0,
      backgroundColor: 'transparent'
    },
    optionBar: {
      backgroundColor: darkMode || yellowMode ? (darkMode ? '#312E43' : '#FFF4D8')  :  '#FFFFFF',
      paddingTop: 13,
      flex: 1,
      flexDirection: 'row',
      paddingLeft: 7,
    },
    optionButton: {
      width: sw * 0.1,
      alignItems: 'center',
      // marginLeft: -sw * 0.02,
      flex: 1,
    },
    iconColor: {
        color: darkMode ? '#fff' : '#312E43' 
    }
  })
}

const mapStateToProps = (state: any) => ({ 
  handleBottom: state.reducer.handleBottom,
  darkMode: state.reducer.darkMode,
  yellowMode: state.reducer.yellowMode,
});

export default connect(mapStateToProps, actions)(ReaderBottomView);
