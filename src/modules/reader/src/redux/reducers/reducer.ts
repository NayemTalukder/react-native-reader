import { actionObject, readerReducerStateObj } from '../../../../core/src/app'
import { 
    HANDLE_TOP,
    HANDLE_OPTIONS,
    HANDLE_BOTTOM,
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
} from '../actions/actionTypes';

const initialState: readerReducerStateObj = {
    flow: 'paginated', // paginated || scrolled-continuous
    location: 0,
    percentage: 0,
    url: '',
    src: '',
    origin: '',
    title: '',
    toc: [],
    toggleNavTab: false,
    sliderDisabled: true,
    book: {},
    visibleLocation: '',
    navigationButtonDisabled: true,
    highlighterToggle: false,
    fontSize: 21,
    theme: 'Bright',
    fontFamily: 'Kalpurush',
    themes: {
        Bright: {
            body: {
                '-webkit-user-select': 'auto',
                'user-select': 'auto',
                'background-color': '#FFFFFF',
                color: '#706C83',
                'font-family': 'Kalpurush'
                // 'line-height': '60px',
            }
        },
        Dark: {
            body: {
                '-webkit-user-select': 'auto',
                'user-select': 'auto',
                'background-color': '#312E43',
                color: '#FFFFFF',
                'font-family': 'Kalpurush'
            }
        },
        Yellow: {
            body: {
                '-webkit-user-select': 'auto',
                'user-select': 'auto',
                'background-color': '#FFF4D8',
                color: '#706C83',
                'font-family': 'Kalpurush'
            }
        }
    },
    yellowMode: false,
    darkMode: false,
    highlights: [],
    bookmarks: [],
    refreshBookmark: true,
    chapters: [],
    rendition: null,
    handleBottom: false,
    handleTop: false,
    handleOptions: false,
    readerOverlay: true,
    readerSidebar: false,
    chapterIndex: null,
    bookData: false,
    readerLoader: true,
    fetchedPercentage: null,
    loaderFlag: true,
    checkReaderConfig: true,
    isReaderVisible: false,
    startReadingTime: null,
    readerFlag: true
};

const reducer = (state = initialState, action: actionObject) => {
    switch (action.type) {
        case HANDLE_TOP: return { ...state, handleTop: action.payload };
        case HANDLE_OPTIONS: return { ...state, handleOptions: action.payload };
        case HANDLE_BOTTOM: return { ...state, handleBottom: action.payload };
        case SET_ORIGIN: return { ...state, origin: action.payload };
        case SET_URL: return { ...state, url: action.payload };
        case SET_SRC: return { ...state, src: action.payload };
        case SET_VISIBLE_LOCATION: return { ...state, visibleLocation: action.payload };
        case SET_SLIDER_DISABLED: return { ...state, sliderDisabled: action.payload };
        case SET_TITLE: return { ...state, title: action.payload };
        case SET_TOC: return { ...state, toc: action.payload };
        case SET_BOOK: return { ...state, book: action.payload };
        case SET_FLOW: return { ...state, flow: action.payload };
        case SET_LOCATION: return { ...state, location: action.payload };
        case SET_PERCENTAGE: return { ...state, percentage: action.payload };
        case NAVIGATION_BUTTON_DISABLED: return { ...state, navigationButtonDisabled: action.payload };
        case HIGHLIGHTER_TOGGLE: return { ...state, highlighterToggle: action.payload };
        case RESIZE_FONT: return { ...state, fontSize: action.payload };
        case ALTER_THEME: return { ...state, theme: action.payload };
        case ALTER_FONT_FAMILY: return { ...state, fontFamily: action.payload };
        case SET_HIGHLIGHTS: return { ...state, highlights: action.payload };
        case SET_CHAPTER: return { ...state, chapters: action.payload };
        case SET_RENDITION: return { ...state, rendition: action.payload };
        case SET_BOOKMARKS: return { ...state, bookmarks: action.payload };
        case REFRESH_BOOKMARK: return { ...state, refreshBookmark: action.payload };
        case DARK_MODE: return { ...state, darkMode: action.payload };
        case YELLOW_MODE: return { ...state, yellowMode: action.payload };
        case SET_READER_OVERLAY: return { ...state, readerOverlay: action.payload };
        case SET_READER_SIDEBAR: return { ...state, readerSidebar: action.payload };
        case SET_CHAPTER_INDEX: return { ...state, chapterIndex: action.payload };
        case SET_BOOKDATA: return { ...state, bookData: action.payload };
        case SET_READER_LOADER: return { ...state, readerLoader: action.payload };
        case SET_FETCHED_PERCENTAGE: return { ...state, fetchedPercentage: action.payload };
        case SET_LOADER_FLAG: return { ...state, loaderFlag: action.payload };
        case SET_CHECK_READER_CONFIG: return { ...state, checkReaderConfig: action.payload };
        case SET_IS_READER_VISIBLE: return { ...state, isReaderVisible: action.payload };
        case SET_START_READING_TIME:  return { ...state, startReadingTime: action.payload };
        case SET_READER_FLAG:  return { ...state, readerFlag: action.payload };
        case UPDATE_THEMES:
            return { ...state, 
                themes: {
                    Bright: {
                        body: {
                            ...state.themes.Bright.body,
                            'font-family': action.payload
                        }
                    },
                    Dark: {
                        body: {
                            ...state.themes.Dark.body,
                            'font-family': action.payload
                        }
                    },
                    Yellow: {
                        body: {
                            ...state.themes.Yellow.body,
                            'font-family': action.payload
                        }
                    }
                }
            };
        default: return state;
    }
};

export default reducer;
