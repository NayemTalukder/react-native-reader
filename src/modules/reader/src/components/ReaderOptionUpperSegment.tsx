import React, { useState } from 'react';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import Orientation from '@lightbase/react-native-orientation';
import { connect } from 'react-redux';

import * as actions from '../redux/actions/';
import { Icon } from '../../../core/src/app';

const ArrowLeft = require('../assets/ArrowLeft.png');
const ArrowRight = require('../assets/ArrowRight.png');

const { width: sw, height: sh } = Dimensions.get('window');

const ReaderOptionUpperSegment = (props: any) =>  {
    const { heading, text, backgroundColor, textColor, onLeftPress, onRightPress, marginBottom } = props
    const [isPortrait, setIsPortrait] = useState(true)
    const styles = getStyleSheet(isPortrait, marginBottom, textColor)

    useFocusEffect(() => {
        Orientation.getOrientation((error, orientation) => {
          if (orientation === Orientation.LANDSCAPE) setIsPortrait(true)  
          else setIsPortrait(false) 
        });
    })
    
    return (
        <View style={[{ marginBottom: marginBottom || 0 }, styles.topContainer]}>
            <View style={styles.headingContainer}>
                <Text style={styles.heading}>{heading}</Text>
            </View>
            <View style={{ flexDirection: 'row' }}>
                <Icon 
                    imageContainerStyle={styles.arrow}
                    onPress={onLeftPress} 
                    width={!isPortrait ? (sw > 500 ? (9 * 1.5) : 9) : (sw > 500 ? (9 * 1.2) : (9 * 0.8))}
                    height={!isPortrait ? (sw > 500 ? (14 * 1.5) : 14) : (sw > 500 ? (14 * 1.2) : (14 * 0.8))}
                    source={ArrowLeft} />
                <View style={[{backgroundColor}, styles.textContainer]} >
                    <Text style={styles.text} >{text}</Text>
                </View>
                <Icon 
                    imageContainerStyle={styles.arrow}
                    onPress={onRightPress}
                    width={!isPortrait ? (sw > 500 ? (9 * 1.5) : 9) : (sw > 500 ? (9 * 1.2) : (9 * 0.8))}
                    height={!isPortrait ? (sw > 500 ? (14 * 1.5) : 14) : (sw > 500 ? (14 * 1.2) : (14 * 0.8))}
                    source={ArrowRight} />
            </View>
        </View>
    )
}

const getStyleSheet = (isPortrait: Boolean, marginBottom: any, textColor: string,) => (
  StyleSheet.create({
    topContainer: {
        flex: 1, 
        width: !isPortrait ? sw - 60 : sh - 80,
        marginTop: !isPortrait ? sw * .02 : (sw * .02) * 0.8,
        marginBottom: !isPortrait ? sw * .02 : (sw * .02) * 0.8,
    },
    headingContainer: {
        paddingBottom: !isPortrait ? 10 : 10 * 0.8,
    },
    heading: {
        fontFamily: 'Roboto',
        fontStyle: 'normal',
        fontWeight: 'normal',
        fontSize: !isPortrait ? sw > 500 ? sw * 0.045 : 16   :   sw > 500 ? ((sw * 0.045) * 0.9) : (16 * 0.8),
        color: '#706C83'
    },
    arrow: {
        flex: 1,
        padding: 18,
        justifyContent: 'center',
        alignItems: 'center',
        height: !isPortrait ? (sw > 500 ? sw * 0.07 : 40)   :   sw > 500 ? ((sw * 0.07) * 0.9) : (40 * 0.8),
        width: !isPortrait ? (sw > 500 ? sw * 0.07 : 40)   :   sw > 500 ? ((sw * 0.07) * 0.9) : (40 * 0.8),
        borderWidth: 1,
        borderColor: '#C2B8F7',
        borderRadius: 5
    },
    textContainer: {
        flex: 6,
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: !isPortrait ? 10 : 10 * 1.7,
        borderWidth: 1,
        borderColor: '#C2B8F7',
        borderRadius: 5
    },
    text: {
      color: textColor || '#706C83',
      fontFamily: 'Roboto',
      fontStyle: 'normal',
      fontWeight: '500',
      fontSize: !isPortrait ? ( sw > 500 ? sw * 0.04 : 16)   :   (sw > 500 ? ((sw * 0.04) * 0.9) : (16 * 0.8)),
      letterSpacing: 0.06,
    }
  })
)

const mapStateToProps = (state: any) => ({ 
    bookState: state.reducer,
    userUid: state.reducer.userUid, 
});
  
export default connect(mapStateToProps, actions)(ReaderOptionUpperSegment);