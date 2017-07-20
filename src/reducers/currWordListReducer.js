import _ from 'lodash';

import { LOAD_WORD_LIST, DELETE_WORDS, UPDATE_FAVORITE } from '../actions';

export const currWordListReducer = (state = [], action) => {
	switch (action.type) {
		case LOAD_WORD_LIST:
			return action.wordList;
		case DELETE_WORDS:
			let newWordList = _.filter(state, obj => {
				//want to remove any words with ids that are in the array "idsToDelete"
				//thus if indexOf returns -1, it means the id we are checking is NOT in the delete list
				return (_.indexOf(action.idsToDelete, obj.id) === -1);
			});
			return newWordList;
		case UPDATE_FAVORITE:
			let { wordListName, wordId, isFavorite } = action.payload;
			let newUFWordList = state.map(wordObj => {
				if (wordObj.id === wordId) {
					console.log({...wordObj, isFavorite: isFavorite});
					return {...wordObj, isFavorite: isFavorite};
				}
				return wordObj;
			})
			return newUFWordList;
		default:
			return state;
	}
};
