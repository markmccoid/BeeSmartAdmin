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
const SETTINGS = 'settings.json';

//=====================================================
//--settings.json
//=====================================================
//--------------------
//-Returns the settings object
const getSettings = () => {
  return readFilePromise(getLocalFile(SETTINGS))
    .then(data => {
      return JSON.parse(data);
    });
};

//--Saves the wordsPerPage settings option
const saveWordsPerPage = wordsPerPage => {
  return readFilePromise(getLocalFile(SETTINGS))
    .then(data => {
      let settings = JSON.parse(data);
      let updatedSettings = Object.assign({}, settings, {wordsPerPage: wordsPerPage});
      fs.writeFile(getLocalFile(SETTINGS), JSON.stringify(updatedSettings), err => {
        if (err) {
          console.log(`Error writing settings file-wordPerPage`, err);
          return {status: 400, err};
        }
        return {status: 200}
      });
    });
}

//=====================================================
//--Word List File access
//=====================================================
//--------------------
//-Returns the list of words (array of objects) from the passed
//-wordListName parameter.
const getWordList = wordListName => {
  return readFilePromise(`${getLocalFile(wordListName)}.json`)
    .then (data => {
      //get the page number if set in wordListIndex
      return getWordListIndexEntry(wordListName)
        .then(WLIData => {
          let returnObj = {
              wordListData: _.sortBy(JSON.parse(data), obj => obj.word.toLowerCase()), //_.sortBy(JSON.parse(data), 'word'),
              currPageNumber: WLIData.currPageNumber
            };
          return returnObj;
        });
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
      return newWordList;
  });
};

//---Update isFavorite field
const updateIsFavorite = (wordListName, wordId, isFavorite) => {
  wordListName = getLocalFile(wordListName);
  return readFilePromise(`${wordListName}.json`)
    .then(data => {
      let wordData = JSON.parse(data);

      wordData.forEach(wordObj => {
        if(wordObj.id === wordId) {
          wordObj.isFavorite = isFavorite;
        }
      });

      fs.writeFile(`${wordListName}.json`, JSON.stringify(wordData), (err) => {
        if (err) {
          console.log(`updateIsFavorite-Error writing ${wordListName}.json!`, err);
        }
        console.log(`updateIsFavorite-${wordListName}.json written successfully!`);
      });
    });
};

//=====================================================
//--wordListIndex.json
//=====================================================
//-Returns the wordListIndex array of objects found in wordListIndex.json
const getWordListIndex = () => {
  return readFilePromise(getLocalFile(WORD_LIST_INDEX))
    .then(data => {
      return JSON.parse(data);
    });
};
//--Updates the word count in the wordListIndex.json
const updateWordListIndex = (wordListName, newCount) => {
  wliFileName = getLocalFile(WORD_LIST_INDEX);
  return readFilePromise(wliFileName)
    .then(data => {
      data = JSON.parse(data);
      let newWordListObj = Object.assign({}, data[wordListName], {numberOfWords: newCount});
			//reconstruct state replacing the wordListName entry with the updated one.
			let newWordListIndex = Object.assign({}, data, {[wordListName]: newWordListObj});

      fs.writeFile(`${wliFileName}`, JSON.stringify(newWordListIndex), (err) => {
        if (err) {
          console.log(`Error writing ${wliFileName}!`, err);
        }
        console.log(`${wliFileName} written successfully!`);
      });
      return {status: 200};
  });
};
//--Return the wordListIndex entry for the wordListName passed
//--Also check for currPageNumber property and if not there set to 1
const getWordListIndexEntry = wordListName => {
  return readFilePromise(getLocalFile(WORD_LIST_INDEX))
    .then(data => {
      data = JSON.parse(data);
      let wordListIndexEntry = data[wordListName] || {};
      if (!wordListIndexEntry.hasOwnProperty('currPageNumber')) {
        wordListIndexEntry = Object.assign({}, wordListIndexEntry, {currPageNumber: 1});
      }
      return wordListIndexEntry;
    });
};

//--Save page number to the WordListIndex for the wordListName passed
const savePageNumber = (pageNumber, wordListName) => {
  wliFileName = getLocalFile(WORD_LIST_INDEX);
  return readFilePromise(wliFileName)
    .then(data => {
      data = JSON.parse(data);
      let newWordListObj = Object.assign({}, data[wordListName], {currPageNumber: pageNumber});
			//reconstruct state replacing the wordListName entry with the updated one.
			let newWordListIndex = Object.assign({}, data, {[wordListName]: newWordListObj});

      fs.writeFile(`${wliFileName}`, JSON.stringify(newWordListIndex), (err) => {
        if (err) {
          console.log(`Error writing ${wliFileName}!`, err);
        }
        console.log(`${wliFileName} written successfully!`);
      });
      return {status: 200};
  });
};
//--Exports the functions to be used in the application
module.exports = {
	getWordListIndex,
  getWordList,
  deleteWordsFromList,
  getSettings,
  saveWordsPerPage,
  updateWordListIndex,
  updateIsFavorite,
  savePageNumber
}
