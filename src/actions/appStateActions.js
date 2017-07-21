import * as api from '../api';
import { SET_SELECTED_WORD_LIST, SET_SIDEBAR_STATE } from './actionTypes';

export const setSelectedWordList = wordList => {
  return {
    type: SET_SELECTED_WORD_LIST,
    wordList
  }
};

export const setSideBarState = isSideBarHidden => {
  return {
    type: SET_SIDEBAR_STATE,
    isSideBarHidden
  }
}
