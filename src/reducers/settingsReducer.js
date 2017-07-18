import { SET_WORDS_PER_PAGE, LOAD_INITIAL_SETTINGS, LOAD_WORD_LISTS } from '../actions';
//import { SET_WORDS_PER_PAGE, LOAD_INITIAL_SETTINGS, LOAD_WORD_LISTS } from '../actions/actionTypes';

const INIT_STATE = {wordsPerPage: 10};

export const settingsReducer = (state = INIT_STATE, action) => {
	switch (action.type) {
		case LOAD_INITIAL_SETTINGS:
			return {...action.settings}
		case SET_WORDS_PER_PAGE:
			return {...state, wordsPerPage: action.wordsPerPage}
		default:
			return state;
	}
};
