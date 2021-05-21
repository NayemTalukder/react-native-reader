import PropTypes from 'prop-types'

export const PropTypesAuthor = {}

export const PropTypesGenre = {}

export const PropTypesLibrary = {}

export const PropTypesMe = {}

export const PropTypesBack = {}

export const PropTypesIcon = {
  isDisplay: PropTypes.bool,
  flex: PropTypes.number,
  source: PropTypes.any.isRequired,
  dimenssion: PropTypes.number,
  width: PropTypes.number,
  height: PropTypes.number,
  activeOpacity: PropTypes.number,
  onPress: PropTypes.func,
  imageContainerStyle: PropTypes.any,
  touchableContainerStyle: PropTypes.any,
  imageStyle: PropTypes.any,
  padding: PropTypes.number
}

export const PropTypesSearchBox = {
  flex: PropTypes.number,
  editable: PropTypes.bool,
  marginVertical: PropTypes.number,
  isDisplay: PropTypes.bool,
  searchProps: PropTypes.any,
}