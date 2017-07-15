import axios from 'axios';
import _ from 'lodash';
import moment from 'moment';
const nfa = window.require('../app/nativeFileAccess');
const API_URL = 'http://localhost:3001';

export const getWordListIndex = () => {
	return nfa.getWordListIndex()
		.then(response => {
			return response
		})
};

//Get a single word list's data
export const getWordList = wordListName => {
	return nfa.getWordList(wordListName)
		.then(response => {
			//need to deal with error responses i.e. wordList that doesn't exist.
			return response
		});
};

export const deleteWordsFromList = (wordListName, idsToDelete) => {
	//Using a post for a delete action against the words, cause I don't know no better
	return nfa.deleteWordsFromList(wordListName, idsToDelete)
			.then(response => {
				//should return the word list with the idsToDelete deleted.
				return response;
			});
};
