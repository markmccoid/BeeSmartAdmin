import { SET_WORDS_PER_PAGE } from './actionTypes';

//-----------------------------------------------
//Sets the number of words per page
export const setWordsPerPage = (wordsPerPage) => {
	return {
		type: SET_WORDS_PER_PAGE,
		wordsPerPage
	}
};
