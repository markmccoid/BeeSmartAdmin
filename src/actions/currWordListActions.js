import * as api from '../api';

import { LOAD_WORD_LIST,
				 WORD_LIST_LOADING,
				 WORD_LIST_LOAD_SUCCESS,
				 WORD_LIST_LOAD_ERROR,
			 	 SET_PAGE_NUMBER,
			 	 DELETE_WORDS,
			   UPDATE_FAVORITE } from './actionTypes';
import { setSelectedWordList } from './appStateActions';

//-----------------------------------------------
//Loads the word list information from the /data/wordListIndex.json file
export const loadWordList = (wordList) => {
	return {
		type: LOAD_WORD_LIST,
		wordList
	}
};

export const startLoadWordList = wordListName => {
	return dispatch => {
		//Set the appState to the word list selected
		dispatch(setSelectedWordList(wordListName));
		//Set the loading flag for the wordlist
		dispatch({type: WORD_LIST_LOADING});
		//Get list of Applications in the QVVariables.json file on server
		const request = api.getWordList(wordListName);
			request.then(data => {
				dispatch(loadWordList(data.wordListData));
				//reset page number to either 1 or what was set in WLI
				dispatch({type: SET_PAGE_NUMBER, pageNumber: data.currPageNumber})
				dispatch({type: WORD_LIST_LOAD_SUCCESS});
			})
			.catch(err => {
				dispatch({type: WORD_LIST_LOAD_ERROR, error: err});
			});
	};
};

//===============================
//-DELETE_WORDS
//===============================
export const deleteWords = (idsToDelete) => {
	//Once words have been deleted from server file we could
	//remove them from the list already in redux store OR
	//Just tell it to reload the word list.
	// return {
	// 	type: LOAD_WORD_LIST,
	// 	wordListName
	// }
	return {
		type: DELETE_WORDS,
		idsToDelete
	}
};
export const startDeleteWords = (wordListName, idsToDelete) => {
	return dispatch => {
		api.deleteWordsFromList(wordListName, idsToDelete)
			.then(data => {
				dispatch(deleteWords(idsToDelete));
				//dispatch(startLoadWordList(wordListName));
				//console.log('delete words thunk', data);
			});
	};
};

//===============================
//-UPDATE_FAVORITE
//===============================
export const updateFavorite = (wordListName, wordId, isFavorite) => {
	return {
		type: UPDATE_FAVORITE,
		payload: {wordListName, wordId, isFavorite}
	}
};

export const startUpdateFavorite = (wordListName, wordId, isFavorite) => {
	return dispatch => {
		api.updateIsFavorite(wordListName, wordId, isFavorite)
			.then(data => {
				dispatch(updateFavorite(wordListName, wordId, isFavorite));
			});
	};
};
