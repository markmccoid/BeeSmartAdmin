import _ from 'lodash';

import { LOAD_WORD_LIST_INDEX, UPDATE_WORD_LIST_INDEX } from '../actions';

export const wordListIndexReducer = (state = [], action) => {
	switch (action.type) {
		case LOAD_WORD_LIST_INDEX:
			return action.wordListIndex;
		case UPDATE_WORD_LIST_INDEX:
			let { wordListName, newCount } = action.payload;
			//create new object for the wordList we are updating
			let newWordListObj = Object.assign({}, state[wordListName], {numberOfWords: newCount});
			//reconstruct state replacing the wordListName entry with the updated one.
			let newState = Object.assign({}, state, {[wordListName]: newWordListObj});
			return newState;
		default:
			return state;
	}
};
