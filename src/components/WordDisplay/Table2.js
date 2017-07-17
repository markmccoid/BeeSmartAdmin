import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Table from 'antd/lib/table';
import 'antd/lib/table/style/css';

//----Styled Components -----//
const WordCardDiv = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

//------------- antd Table prep functions ---------------
const formatDataForTable = data => {
  let dataSource = data.map(wordObj => ({
    key: wordObj.id,
    word: wordObj.word,
    syllables: wordObj.syllables,
    partOfSpeech: wordObj.partOfSpeech,
    diacritic: wordObj.diacritic,
    isNewWord: wordObj.isNewWord
  }));
  return dataSource;
};
const setupTableColumns = () => {
  const columns = [{
    title: 'Word',
    dataIndex: 'word',
    key: 'word'
  }, {
    title: 'Syllables',
    dataIndex: 'syllables',
    key: 'syllables'
  }, {
    title: 'Part of Speech',
    dataIndex: 'partOfSpeech',
    key: 'partOfSpeech'
  }, {
    title: 'Diacritic',
    dataIndex: 'diacritic',
    key: 'diacritic'
  }, {
    title: 'New Word?',
    dataIndex: 'isNewWord',
    key: 'isNewWord'
  }];
  return columns;
}
const getRowConfig = (onDeleteToggle) => {
  return {
    type: 'checkbox',
    onSelect: (record, selected, selectedRows) => {
        //create array of ids to delete
        let rowsToDelete = selectedRows.map(row => row.key);
        this.handleTableDeleteSelect(rowsToDelete);
      },
    onSelectAll: (selected, selectedRows, changeRows) => {
      //create array of ids to delete
      let rowsToDelete = selectedRows.map(row => row.key);
      onDeleteToggle(rowsToDelete);
    }
  }
}
const Table2 = (props) => {
  //--create antd needed props
  const tableData = formatDataForTable(props.pageData);
  const tableColumns = setupTableColumns();
  const rowSelectionConfig = getRowConfig(props.onDeleteToggle);
  let table2JSX = <Table
            dataSource={tableData}
            columns={tableColumns}
            pagination={false}
            size='middle'
            bordered
            rowSelection={rowSelectionConfig}
          />;

  return (
      <div>Table 2</div>
  );
};

Table2.propTypes = {
  pageData: PropTypes.array,
	/** params: id (string), checked (bool)*/
	onDeleteToggle: PropTypes.func
};

export default Table2;
/*pageData array object shape:
  id: PropTypes.string,
  word: PropTypes.string,
  syllables: PropTypes.string,
  partOfSpeech: PropTypes.string,
  diacritic: PropTypes.string,
  origin: PropTypes.string,
  isNewWord: PropTypes.bool,
  mwLink: PropTypes.string,
*/
/* <WordCardDiv>
  {pageData.map(wordObj => {
      return (
        <WordCard
          key={wordObj.id}
          wordObj={wordObj}
          onDeleteToggle={this.handleDeleteToggle}
        />
        )
    })}
</WordCardDiv> */
