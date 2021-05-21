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
} from './actionTypes';

export const setUser = (payload: string) => ({ type: SET_USER, payload })
export const setUserUid = (payload: string) => ({ type: SET_USER_UID, payload })
export const setUserName = (payload: string) => ({ type: SET_USER_NAME, payload })
export const setReaderConfig = (payload: string) => ({ type: SET_READER_CONFIG, payload })
export const setIsInternetReachable = (payload: Boolean) => ({ type: SET_IS_INTERNET_REACHABLE, payload })
export const setSeeAll = (payload: Boolean) => ({ type: SET_SEE_ALL, payload })
export const setSearchValue = (payload: Boolean) => ({ type: SET_SEARCH_VALUE, payload })
export const setSearchResult = (payload: Boolean) => ({ type: SET_SEARCH_RESULT, payload })
export const setScreenRefresher = (payload: Boolean) => ({ type: SET_SCREEN_REFRESHER, payload })
