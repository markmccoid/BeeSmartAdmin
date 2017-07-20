import axios from 'axios';
import _ from 'lodash';
import moment from 'moment';
const nfa = window.require('../app/nativeFileAccess');
const API_URL = 'http://localhost:3001';

//--------------------------------------------------------
//--Get the settings
export const getSettings = () => {
	return nfa.getSettings()
		.then(response => {
			return response;
		});
};
//--------------------------------------------------------
//--Save the wordPerPage setting
export const saveWordsPerPage = (wordsPerPage) => {
	return nfa.saveWordsPerPage(wordsPerPage)
		.then(response => response);
};

//--------------------------------------------------------
//--Get the wordListIndex.json in javascript object
export const getWordListIndex = () => {
	return nfa.getWordListIndex()
		.then(response => {
			return response;
		})
};

//--------------------------------------------------------
//Get a single word list's data
export const getWordList = wordListName => {
	return nfa.getWordList(wordListName)
		.then(response => {
			//check to see if isFavorite property exists, if not add it as false
			Object.keys(response).forEach(obj => {
				if(!response[obj].hasOwnProperty('isFavorite')) {
					response[obj].isFavorite = false;
				}
			});
			//need to deal with error responses i.e. wordList that doesn't exist.
			return response;
		});
};

//--------------------------------------------------------
//--Update the count in wordListIndex.json
export const updateWordListIndex = (wordListName, newCount) => {
	return nfa.updateWordListIndex(wordListName, newCount)
		.then(response => {
			return response;
		});
};

//--------------------------------------------------------
//--Delete an array of words from the passed wordListName
export const deleteWordsFromList = (wordListName, idsToDelete) => {
	//Using a post for a delete action against the words, cause I don't know no better
	return nfa.deleteWordsFromList(wordListName, idsToDelete)
			.then(response => {
				//should return the word list with the idsToDelete deleted.
				return response;
			});
};

//--------------------------------------------------------
//--Update the passed wordListName's isFavorite property
export const updateIsFavorite = (wordListName, wordId, isFavorite) => {
	return nfa.updateIsFavorite(wordListName, wordId, isFavorite)
		.then(response => {
			return response;
		});
};
