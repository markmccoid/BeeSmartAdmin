import { SET_WORDS_PER_PAGE, LOAD_INITIAL_SETTINGS } from './actionTypes';
import * as api from '../api';

export const startLoadSettings = () => {
	return dispatch => {
		api.getSettings()
			.then(data => {
				dispatch({type: LOAD_INITIAL_SETTINGS, settings: data})
			});
	};
};
//-----------------------------------------------
//Sets the number of words per page
export const setWordsPerPage = (wordsPerPage) => {
	return {
		type: SET_WORDS_PER_PAGE,
		wordsPerPage
	};
};

export const startSetWordsPerPage = (wordsPerPage) => {
	return dispatch => {
		api.saveWordsPerPage(wordsPerPage)
			.then(response => {
				dispatch(setWordsPerPage(wordsPerPage));
			});
	};
};
