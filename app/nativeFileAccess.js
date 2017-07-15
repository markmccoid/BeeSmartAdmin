//functions to access data from main electron thread
//to be used with ipc communication
const path = require('path');
const fs = require('fs');
const _ = require('lodash');
const uuid = require('uuid');
const { remote } = require('electron');

// make promise version of fs.readFile()
const readFilePromise = (filename) => {
    return new Promise((resolve, reject) => {
        fs.readFile(filename, (err, data) => {
            if (err)
                reject(err);
            else
                resolve(data);
        });
    });
};

//Can't access the remote.app. feature except from within a function.  Probably after app has loaded.
//pass the filename including extension, will return the path, relative to where the GroupCreate.EXE
//is located in production and relative to where electron index.js is in Dev.
const getLocalFile = (dataFile) => {
	if (process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'dev-home') {
		return path.join(remote.app.getAppPath(), '/dataFiles', dataFile);
	}
	return path.join(path.dirname(remote.app.getPath('exe')), '/dataFiles', dataFile);
};

const WORD_LIST_INDEX = 'wordListIndex.json';

//--------------------
//-Returns the wordListIndex array of objects found in wordListIndex.json
const getWordListIndex = () => {
  return readFilePromise(getLocalFile(WORD_LIST_INDEX))
    .then(data => {
      return JSON.parse(data);
    });
};
//--------------------
//-Returns the list of words (array of objects) from the passed
//-wordListName parameter.
const getWordList = wordListName => {
  return readFilePromise(`${getLocalFile(wordListName)}.json`)
    .then (data => {
    return _.sortBy(JSON.parse(data), 'word');
    });
};
//--------------------
//-Deletes the objects associated with the ids passed from the
//-wordListName file.
const deleteWordsFromList = (wordListName, idsToDelete) => {
  wordListName = getLocalFile(wordListName);
  return readFilePromise(`${wordListName}.json`)
    .then(data => {
    let wordList = _.sortBy(JSON.parse(data), 'word');
    let newWordList = _.filter(wordList, obj => {
      //want to remove any words with ids that are in the array "idsToDelete"
      //thus if indexOf returns -1, it means the id we are checking is NOT in the delete list
      return (_.indexOf(idsToDelete, obj.id) === -1);
    });
    fs.writeFile(`${wordListName}.json`, JSON.stringify(newWordList), (err) => {
      if (err) {
        console.log(`Error writing ${wordListName}.json!`, err);
      }
      console.log(`${wordListName}.json written successfully!`);
    });
  });
};

//--Exports the functions to be used in the application
module.exports = {
	getWordListIndex,
  getWordList,
  deleteWordsFromList
}