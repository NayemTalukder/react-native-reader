import React, { useState, useCallback } from "react";
import { StyleSheet, View, Text, Dimensions, TouchableOpacity, FlatList } from "react-native";
import Modal from 'react-native-modal';
import { useFocusEffect } from "@react-navigation/native";
import { connect } from 'react-redux';

import * as actions from '../redux/actions/';
// import { analytic } from '../../../core/src/app';

const { width: sw, height: sh } = Dimensions.get('window');

const ReaderSidebar = (props: any) => {
  const [showChapters, setShowChapters] = useState(true);
  const [showBookmarks, setShowBookmarks] = useState(false);
  const [showHighlights, setShowHighlights] = useState(false);
  const [data, setData] = useState([]);

  useFocusEffect(() => {
    if(showChapters) setData(props.toc)
    else if(showBookmarks) setData(props.bookmarks)
    else setData(props.highlights)
    return;
  })

  const reset = () => {
    setShowChapters(false);
    setShowBookmarks(false);
    setShowHighlights(false);
  };

  const switchTab = (value: any) => {
    const [setActive, data, screen ] = value;
    reset();
    setActive(true);
    setData(data);
    // analytic.reader_log_event(['reader_view_'+screen, props.currentBook.name])
  }

  const onTabPress = (row: any) => {
    let screen = 'chapter'
    {showChapters ? screen = 'chapter'  :  [showBookmarks ? screen = 'bookmark' : screen = 'highlight']}
    // analytic.reader_log_event(['reader_'+screen+'_navigate', props.currentBook.name])
    props.setLocation([showChapters ? row.href : row.cfi])
    props.setReaderSidebar(false)
  }
  
  const renderRow = (row: any) => {
    return (
      <View>
        <TouchableOpacity onPress={() => onTabPress(row)}>
          <View style={[row.href ? {} : styles.row]} >
            <Text style={styles.title} >
              {showChapters ? row.label : row.text}
            </Text>
          </View>
        </TouchableOpacity>
        {(data.length - 1) === data.indexOf(row) ? <View style={styles.separator} /> : null }
      </View>
    );
  }

  const tabView = () => {
    return (
      <FlatList
        style={styles.tabViewContainer}
        data={data}
        renderItem={row => renderRow(row.item)}
        keyExtractor={(item, index) => `${item.cfi}_${index}`}
        ItemSeparatorComponent={() => <View style={styles.separator} />} />
    );  
  } 
  
  const onBackPress = () => {
    props.setReaderSidebar(false);
    switchTab([setShowChapters, props.toc, 'chapters'])
  }

  return (  
    <View>
      <Modal
        style={{margin: 0}}
        animationIn='slideInLeft'
        animationOut='slideOutLeft'
        animationInTiming={500}
        animationOutTiming={500}
        backdropTransitionInTiming={500}
        backdropTransitionOutTiming={500}
        isVisible={props.readerSidebar}
        onBackButtonPress={onBackPress}
        onBackdropPress={onBackPress}
        // onSwipeComplete={props.onBackButtonPress}
        // swipeDirection='left'
        backdropOpacity={0.2} >

        {/* Modal Content */}
        <View style={styles.modalView}>
          <View style={styles.headingContainer} >
            <TouchableOpacity onPress={() => switchTab([setShowChapters, props.toc, 'chapters'])} style={{ flex: 1 }} >
              <Text style={[showChapters ? styles.active : styles.inActive, { marginLeft: sw * 0.02 }]} >Chapters</Text>
              {showChapters ? <View style={[styles.tint, { marginLeft: 10 }]} /> : null}
            </TouchableOpacity>
            <TouchableOpacity onPress={() => switchTab([setShowBookmarks, props.bookmarks, 'bookmarks'])} style={{ flex: 1 }} >
              <Text style={[showBookmarks ? styles.active
              : [styles.inActive, { marginLeft: showBookmarks || showChapters ? sw * 0.03 : sw * 0.005} ]]} >Bookmarks</Text>
              {showBookmarks ? <View style={styles.tint} /> : null}
            </TouchableOpacity>
            <TouchableOpacity onPress={() => switchTab([setShowHighlights, props.highlights, 'highlights'])} style={{ flex: 1 }} >
                <Text style={[showHighlights ? [styles.active, { marginLeft: -sw * 0.005 }] 
                : [styles.inActive, { marginLeft: sw * 0.045 }]]} >Highlights</Text>
                {showHighlights ? <View style={styles.tint} /> : null}
            </TouchableOpacity>
          </View>
          <View style={styles.separator} />
            {tabView()}
        </View>
      </Modal>
    </View>
  )
};

const styles = StyleSheet.create({
  modalView: {
    position: 'absolute',
    height: sh,
    width: sw * 0.8,
    top: 0,
    left: 0,
    backgroundColor: "#FFFFFF",
  },
  headingContainer: {
    flexDirection: 'row', 
    alignItems: 'center',
    justifyContent: 'center',
    height: 100,
    padding: 10,
    paddingTop: 40
  },
  active: {
    fontSize: sw > 500 ? sw * 0.04 : 15, 
    color: '#585858',
  },
  inActive: {
    fontSize: sw > 500 ? sw * 0.035 : 12, 
    color: '#828282',
  },
  tint: {
    height: 1,
    marginTop: 1,
    backgroundColor: '#626262',
    width: sw > 500 ? sw * 0.1 : 50,
  },
  separator: {
    height: 1,
    backgroundColor: '#E5E5E5',
  },
  tabViewContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  row: {
    flexDirection: 'row',
    padding: 17,
    paddingLeft: 25,
    overflow: 'hidden',
  },
  title: {
    fontFamily: 'georgia',
    fontSize: sw > 500 ? sw * 0.035 : 14,
  },
});

const mapStateToProps = (state: any) => ({ 
  readerSidebar: state.reducer.readerSidebar,
  toc: state.reducer.toc,
  chapterIndex: state.reducer.chapterIndex,
  highlights: state.reducer.highlights,
  bookmarks: state.reducer.bookmarks,
  darkMode: state.reducer.darkMode,
  yellowMode: state.reducer.yellowMode,
});

export default connect(mapStateToProps, actions)(ReaderSidebar);