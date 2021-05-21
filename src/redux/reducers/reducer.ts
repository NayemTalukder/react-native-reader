import { actionObject, homeReducerStateObj } from '../../modules/core/src/app'
import { 
    SET_USER,
    SET_USER_UID,
    SET_USER_NAME,
    SET_READER_CONFIG,
    SET_IS_INTERNET_REACHABLE,
    SET_SEE_ALL,
    SET_SEARCH_VALUE,
    SET_SEARCH_RESULT,
    SET_SCREEN_REFRESHER
} from '../actions/actionTypes';

const initialMainSate: homeReducerStateObj = {
    user: null,
    userUid: null,
    userName: null,
    readerConfig: {
        dark_mode: false,
        flow: 'paginated',
        font_family: 'Kalpurush',
        font_size: 21,
        yellow_mode: false,
        theme: 'Bright',
    },
    isInternetReachable: true,
    seeAll: [],
    searchValue: '',
    searchResult: [],
    screenRefresher: false
}

const reducer = (MainState = initialMainSate, action: actionObject) => {
    switch (action.type) {
        case SET_USER: return { ...MainState, user: action.payload }
        case SET_USER_UID: return { ...MainState, userUid: action.payload }
        case SET_USER_NAME: return { ...MainState, userName: action.payload }
        case SET_READER_CONFIG: return { ...MainState, readerConfig: action.payload }
        case SET_IS_INTERNET_REACHABLE: return { ...MainState, isInternetReachable: action.payload }
        case SET_SEE_ALL: return { ...MainState, seeAll: action.payload }
        case SET_SEARCH_VALUE: return { ...MainState, searchValue: action.payload }
        case SET_SEARCH_RESULT: return { ...MainState, searchResult: action.payload }
        case SET_SCREEN_REFRESHER: return { ...MainState, screenRefresher: action.payload }
        default: return MainState;
    }
}

export default reducer
