export interface actionObject {
  type: string,
  payload: string
}

interface readerConfig {
  dark_mode: Boolean,
  flow: string,
  font_family: string,
  font_size: number,
  yellow_mode: Boolean,
  theme: string,
}

export interface homeReducerStateObj {
  user: object[] | null,
  userUid: string | null,
  userName: string | null,
  readerConfig: readerConfig,
  isInternetReachable: Boolean,
  seeAll: object[],
  searchValue: string,
  searchResult: object[],
  screenRefresher: Boolean
}
export interface readerReducerStateObj {
  flow: string,
  location: number,
  percentage: number,
  url: string,
  src: string,
  origin: string,
  title: string,
  toc: Array<object>,
  toggleNavTab: Boolean,
  sliderDisabled: Boolean,
  book: object,
  visibleLocation: any,
  navigationButtonDisabled: Boolean,
  isReaderVisible: Boolean,
  highlighterToggle: Boolean,
  fontSize: number,
  theme: string,
  fontFamily: string,
  themes: any,
  yellowMode: Boolean,
  darkMode: Boolean,
  highlights: Array<object>,
  bookmarks: Array<object>,
  refreshBookmark: Boolean,
  chapters: Array<object>,
  rendition: any | null,
  handleBottom: Boolean,
  handleTop: Boolean,
  handleOptions: Boolean,
  readerOverlay: Boolean,
  bookData: Boolean,
  chapterIndex: any | null,
  readerSidebar: Boolean,
  readerLoader: Boolean,
  fetchedPercentage: any | null,
  loaderFlag: Boolean,
  checkReaderConfig: Boolean,
  startReadingTime: any | null,
  readerFlag: Boolean,
}
