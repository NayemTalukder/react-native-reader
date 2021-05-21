import { 
    HANDLE_TOP,
    HANDLE_BOTTOM,
    HANDLE_OPTIONS,
    RESIZE_FONT,
    ALTER_THEME,
    UPDATE_THEMES,
    ALTER_FONT_FAMILY,
    NAVIGATION_BUTTON_DISABLED,
    HIGHLIGHTER_TOGGLE,
    SET_ORIGIN, 
    SET_URL,
    SET_SRC, 
    SET_VISIBLE_LOCATION, 
    SET_SLIDER_DISABLED, 
    SET_TITLE, 
    SET_TOC, 
    SET_BOOK, 
    SET_FLOW, 
    SET_LOCATION,
    SET_PERCENTAGE,
    SET_HIGHLIGHTS,
    SET_CHAPTER,
    SET_BOOKMARKS,
    REFRESH_BOOKMARK,
    DARK_MODE,
    YELLOW_MODE,
    SET_RENDITION,
    SET_READER_OVERLAY,
    SET_READER_SIDEBAR,
    SET_CHAPTER_INDEX,
    SET_BOOKDATA,
    SET_READER_LOADER,
    SET_FETCHED_PERCENTAGE,
    SET_LOADER_FLAG,
    SET_CHECK_READER_CONFIG,
    SET_IS_READER_VISIBLE,
    SET_START_READING_TIME,
    SET_READER_FLAG
} from './actionTypes';

export const setStartReadingTime = (payload: any | null) => ({ type: SET_START_READING_TIME, payload });
export const setReaderLoader = (payload: Boolean) => ({ type: SET_READER_LOADER, payload });
export const setCheckReaderConfig = (payload: Boolean) => ({ type: SET_CHECK_READER_CONFIG, payload });
export const setIsReaderVisible = (payload: Boolean) => ({ type: SET_IS_READER_VISIBLE, payload });
export const setFetchedPercentage = (payload: any | null) => ({ type: SET_FETCHED_PERCENTAGE, payload  });
export const setLoaderFlag = (payload: Boolean) => ({ type: SET_LOADER_FLAG, payload });
export const setHandleBottom = (payload: Boolean) => ({ type: HANDLE_BOTTOM, payload });
export const setHandleTop = (payload: Boolean) => ({ type: HANDLE_TOP, payload });
export const setHandleOptions = (payload: Boolean) => ({ type: HANDLE_OPTIONS, payload });
export const resizeFont = (payload: number) => ({ type: RESIZE_FONT, payload });
export const alterTheme = (payload: string) => ({ type: ALTER_THEME, payload });
export const updateThemes = (payload: any) => ({ type: UPDATE_THEMES, payload });
export const alterFontFamily = (payload: string) => ({ type: ALTER_FONT_FAMILY, payload });
export const navigationButtonDisabled = (payload: Boolean) => ({ type: NAVIGATION_BUTTON_DISABLED, payload });
export const highlighterToggle = (payload: Boolean) => ({ type: HIGHLIGHTER_TOGGLE, payload });
export const setOrigin = (payload: string) => ({ type: SET_ORIGIN, payload });
export const setUrl = (payload: string) => ({ type: SET_URL, payload });
export const setSource = (payload: string) => ({ type: SET_SRC, payload });
export const setVisibleLocation = (payload: any) => ({ type: SET_VISIBLE_LOCATION, payload });
export const setSliderDisabled = (payload: Boolean) => ({ type: SET_SLIDER_DISABLED, payload });
export const setTitle = (payload: string) => ({ type: SET_TITLE, payload });
export const setToc = (payload: Array<object>) => ({ type: SET_TOC, payload });
export const setBook = (payload: object) => ({ type: SET_BOOK, payload });
export const setFlow = (payload: string) => ({ type: SET_FLOW, payload });
export const setLocation = (payload: number) => ({ type: SET_LOCATION, payload });
export const setPercentage = (payload: number) => ({ type: SET_PERCENTAGE, payload });
export const setHighlights = (payload: Array<object>) => ({ type: SET_HIGHLIGHTS, payload });
export const setChapters = (payload: Array<object>) => ({ type: SET_CHAPTER, payload });
export const setRendition = (payload: any | null) => ({ type: SET_RENDITION, payload });
export const setBookmarks = (payload: Array<object>) => ({ type: SET_BOOKMARKS, payload });
export const setRefreshBookmark = (payload: Array<object>) => ({ type: REFRESH_BOOKMARK, payload });
export const setDarkMode = (payload: Boolean) => ({ type: DARK_MODE, payload });
export const setYellowMode = (payload: Boolean) => ({ type: YELLOW_MODE, payload });
export const setReaderOverlay = (payload: Boolean) => ({ type: SET_READER_OVERLAY, payload });
export const setReaderSidebar = (payload: Boolean) => ({ type: SET_READER_SIDEBAR, payload });
export const setChapterIndex = (payload: any | null) => ({ type: SET_CHAPTER_INDEX, payload });
export const setBookData = (payload: Boolean) => ({ type: SET_BOOKDATA, payload });
export const setReaderFlag = (payload: Boolean) => ({ type: SET_READER_FLAG, payload });
