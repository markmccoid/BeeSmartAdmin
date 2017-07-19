import _ from 'lodash';

import { LOAD_WORD_LIST, DELETE_WORDS } from '../actions';

export const currWordListReducer = (state = [], action) => {
	switch (action.type) {
		case LOAD_WORD_LIST:
			return action.wordList;
		case DELETE_WORDS:
		console.log('State before',state[1], action.idsToDelete);
			let newWordList = _.filter(state, obj => {
				//want to remove any words with ids that are in the array "idsToDelete"
				//thus if indexOf returns -1, it means the id we are checking is NOT in the delete list
				return (_.indexOf(action.idsToDelete, obj.id) === -1);
			});
			console.log('New State',newWordList.length);
			return newWordList;
		default:
			return state;
	}
};
