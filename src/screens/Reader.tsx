import React from 'react';
import { connect } from 'react-redux'
import * as actions from '../redux/actions'
import { ReaderConstructor } from '../modules/reader/src/'

const Reader = (props:any) => {

  const currentBook = {
    book: props.route.params.source
  }

  return <ReaderConstructor 
      userUid={null}
      readerConfig={props.readerConfig}
      currentBook={currentBook} 
      navigation={props.navigation}
      isInternetReachable={props.isInternetReachable} />
}

const mapStateToProps = (state: any) => ({
  readerConfig: state.reducer.readerConfig,
  isInternetReachable: state.reducer.isInternetReachable,
})

export default connect(mapStateToProps, actions)(Reader)
