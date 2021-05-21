import React, { useState } from 'react'
import { StyleSheet, Text, View, Dimensions, TouchableOpacity } from 'react-native'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { useFocusEffect } from '@react-navigation/native';
import Orientation from '@lightbase/react-native-orientation';
import { connect } from 'react-redux';

import * as actions from '../redux/actions/';
import { Icon } from '../../../core/src/app';

const ArrowUp = require('../assets/ArrowUp.png');
const ArrowDown = require('../assets/ArrowDown.png');

const { width: sw, height: sh } = Dimensions.get('window');

const ReaderOptionLowerSegment = (props: any) => {
    const isPaginated = props.flow === 'paginated';
    const [isPortrait, setIsPortrait] = useState(true)
    // const ReaderConfig = firestore().collection('Users').doc(props.userUid)
    const styles = getStyleSheet(isPortrait, isPaginated)

    const onFlowExchange = payload => {
        const [activeFlow, inActiveFlow] = payload;
        // analytic.reader_log_event(['reader_change_flow', props.currentBook.name, 'flow', inActiveFlow]);
        if(props.flow === activeFlow){
            props.setFlow(inActiveFlow);
            if (props.userUid) updateFlow(inActiveFlow);
        }
    }
    
    const updateFontSize = payload => {
        // analytic.reader_log_event(['reader_change_font_size', props.currentBook.name, 'font_size', props.fontSize + payload ]);
        // if (props.userUid !== null) ReaderConfig.update({ 'ReaderConfig.font_size': props.fontSize + payload });
        
      };

    const updateFlow = payload => {
        // if (props.userUid !== null) ReaderConfig.update({ 'ReaderConfig.flow': payload });
    };

    const arrow = (value) => {
        const [source, fontSize] = value;
        return (
            <Icon 
                imageContainerStyle={styles.arrow}
                onPress={() => {
                  props.resizeFont(props.fontSize + fontSize);
                  updateFontSize(fontSize);
                }}
                width={!isPortrait ? (sw > 500 ? (16 * 1.5) : 16) : (sw > 500 ? (16 * 1.2) : (16 * .8))}
                height={!isPortrait ? (sw > 500 ? (9 * 1.5) : 9) : (sw > 500 ? (9 * 1.2) : (9 * .8))}
                source={source}
            />
        )
    }

    useFocusEffect(() => {
        Orientation.getOrientation((error, orientation) => {
          if (orientation === Orientation.LANDSCAPE) setIsPortrait(true)  
          else setIsPortrait(false) 
        });
    })

    return (
        <View style={styles.topContainer}>
            <View style={{ flex: 6 }}>
                <View style={styles.headingContainer} >
                    <Text style={styles.heading} >Flow</Text>
                </View>
                <View style={{ flexDirection: 'row' }}>
                    <TouchableOpacity
                        onPress={() => onFlowExchange(['scrolled-continuous', 'paginated'])}
                        style={[isPaginated ? {backgroundColor: '#604AF5'} : {},{ marginRight: 10 }, styles.iconContainer ]} >
                        <FontAwesome5 
                            name="book-open" color={isPaginated ? '#fff' : '#000'}
                            size={!isPortrait ? (sw > 500 ? (20 * 1) : 20) : (sw > 500 ? ((20 * 0.8) * 1.4) : (20 * 0.8))} /> 
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => onFlowExchange(['paginated', 'scrolled-continuous'])} 
                        style={[!isPaginated ? {backgroundColor: '#604AF5'} : {}, styles.iconContainer]}>
                        <FontAwesome5 
                            name="scroll" size={!isPortrait ? (sw > 500 ? (20 * 1) : 20) : (sw > 500 ? ((20 * 0.8) * 1.4) : (20 * 0.8))} 
                            color={!isPaginated ? '#fff' : '#000'} /> 
                    </TouchableOpacity>
                </View>
            </View>
            <View style={{ flex: 5 }} />
            <View style={{ flex: 9 }}>
                <View style={styles.headingContainer} >
                    <Text style={styles.heading} >Size</Text>
                </View>
                <View style={{ flexDirection: 'row' }}>
                    {arrow([ArrowDown, -2])}
                    <View style={styles.textContainer}>
                        <Text style={styles.text} >{props.fontSize}</Text>
                    </View>
                    {arrow([ArrowUp, 2])}
                </View>
            </View>
        </View>
    )
}

const getStyleSheet = (isPortrait: Boolean, isPaginated: Boolean) => (
  StyleSheet.create({
    topContainer: {
        flexDirection: 'row',
        flex: 1, 
        width: !isPortrait ? sw - 60 : sh - 80,
        marginBottom: !isPortrait ? sw * 0.09 : sw * .1,
    },
    headingContainer: {
        marginVertical: !isPortrait ? 10 : 10 * 0.8
    },
    heading: {
        fontFamily: 'Roboto',
        fontStyle: 'normal',
        fontWeight: 'normal',
        fontSize: !isPortrait ? (sw > 500 ? sw * 0.045 : 16)  :  (sw > 500 ? ((sw * 0.045) * 0.9) : (16 * 0.8)),
        color: '#706C83'
    },
    iconContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        height: !isPortrait ? (sw > 500 ? sw * 0.07 : 40)  :  (sw > 500 ? ((sw * 0.07) * 0.9) : (40 * 0.8)),
        width: !isPortrait ? (sw > 500 ? sw * 0.07 : 40)  :  (sw > 500 ? ((sw * 0.07) * 0.9) : (40 * 0.8)),
        borderWidth: 1,
        borderColor: '#C2B8F7',
        borderRadius: 5
    },
    arrow: {
        flex: 3,
        padding: 18,
        justifyContent: 'center',
        alignItems: 'center',
        height: !isPortrait ? (sw > 500 ? sw * 0.07 : 40)  :  (sw > 500 ? ((sw * 0.07) * 0.9) : (40 * 0.8)),
        width: !isPortrait ? (sw > 500 ? sw * 0.07 : 40)  :  (sw > 500 ? ((sw * 0.07) * 0.9) : (40 * 0.8)),
        borderWidth: 1,
        borderColor: '#C2B8F7',
        borderRadius: 5
    },
    textContainer: {
      flex: 5,
      justifyContent: 'center',
      alignItems: 'center'
    },
    text: {
      fontFamily: 'Roboto',
      fontStyle: 'normal',
      fontWeight: 'normal',
      fontSize: !isPortrait ? (sw > 500 ? sw * 0.04 : 18)  :  (sw > 500 ? ((sw * 0.04) * 0.9) : (18 * 0.8)),
      color: '#706C83'
    },
  })
)

const mapStateToProps = (state: any) => ({ 
    flow: state.reducer.flow,
    fontSize: state.reducer.fontSize,
});
  
export default connect(mapStateToProps, actions)(ReaderOptionLowerSegment);