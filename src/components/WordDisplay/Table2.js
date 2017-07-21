import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Table from 'antd/lib/table';
import Icon from 'antd/lib/icon';
import Radio from 'antd/lib/radio';
import 'antd/lib/table/style/css';
import 'antd/lib/button/style/css';

//----Styled Components -----//
const WordCardDiv = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

//------------- antd Table prep functions ---------------
const formatDataForTable = data => {
  let dataSource = data.map(wordObj => ({
    key: wordObj.id,
    syllables: wordObj.syllables,
    partOfSpeech: wordObj.partOfSpeech,
    diacritic: wordObj.diacritic,
    origin: wordObj.origin,
    isNewWord: wordObj.isNewWord,
    isFavorite: wordObj.isFavorite
  }));
  return dataSource;
};
const setupTableColumns = (onUpdateFavorite, wordListName) => {
  let newWordClass = ''
  const columns = [{
    title: 'Syllables',
    dataIndex: 'syllables',
    key: 'syllables',
    width: 250
  }, {
    title: 'Part of Speech',
    dataIndex: 'partOfSpeech',
    key: 'partOfSpeech',
    width: 250
  }, {
    title: 'Diacritic',
    dataIndex: 'diacritic',
    key: 'diacritic',
    width: 250
  }, {
    title: 'Origin',
    dataIndex: 'origin',
    key: 'origin',
    width: 400
  },{
    title: 'Favorite?',
    dataIndex: 'isFavorite',
    key: 'isFavorite',
    width: 100,
    render: (text, record, index) => {
      // console.log(`cell (data content for this cell)${text}
      // row data ${record}
      // index of row ${index}`);
      let wordId = record.key;
      return (text ?
        <div><button style={{width:"100%"}} onClick={() => onUpdateFavorite(wordListName, wordId, false)}><Icon type="heart" /></button></div>
        :
        <div><button style={{width:"100%"}} onClick={() => onUpdateFavorite(wordListName, wordId, true)}><Icon type="heart-o" /></button></div>);
    }
  },{
    title: 'New Word?',
    dataIndex: 'isNewWord',
    key: 'isNewWord',
    width: 100,
    render: (text, record, index) => {
      // console.log(`cell (data content for this cell)${text}
      // row data ${record}
      // index of row ${index}`);
      return (text ? <Icon style={{width:"100%"}} type="check" /> : null);
    }
  }];
  return columns;
}
const getRowConfig = (onDeleteToggle, idsToDelete) => {
  return {
    type: 'checkbox',
    selectedRowKeys: idsToDelete,
    onSelect: (record, selected, selectedRows) => {
        //create array of ids to delete
        let rowsToDelete = selectedRows.map(row => row.key);
        onDeleteToggle(rowsToDelete);
      },
    onSelectAll: (selected, selectedRows, changeRows) => {
      //create array of ids to delete
      console.log('sleected', selected, changeRows, selectedRows);
      let rowsToDelete = selectedRows.map(row => row.key);
      onDeleteToggle(rowsToDelete);
    }
  }
}
class Table2 extends React.Component {
  state = {
    fontsize: "large"
  };
  render() {
    let rowClassName = [];
    //--create antd needed this.props
    const tableData = formatDataForTable(this.props.pageData);
    const tableColumns = setupTableColumns(this.props.onUpdateFavorite, this.props.wordListName);
    const rowSelectionConfig = getRowConfig(this.props.onDeleteToggle, this.props.idsToDelete);
    const getRowClassName = (record, index) => {
      //console.log('rowclassName', record);
      let rowClass = ''
      if (this.props.idsToDelete.filter(id => id === record.key).length > 0) {
        rowClass = 'row-selected';
      }

      let newWordClass = record.isNewWord ? 'new-word' : '';
      let fontsizeClass = this.state.fontsize === 'small' ? 'row-size-small' :
                          this.state.fontsize === 'medium' ? 'row-size-medium' : 'row-size-large';
      return `${rowClass} ${newWordClass} ${fontsizeClass}`;
    }
    let table2JSX = <Table
              dataSource={tableData}
              columns={tableColumns}
              pagination={false}
              size='small'
              bordered
              rowSelection={rowSelectionConfig}
              rowClassName={getRowClassName}
            />;

    return (
        <div>
          <Radio.Group value={this.state.fontsize} onChange={(e) => this.setState({ fontsize: e.target.value })}>
            <Radio.Button value="small">Small</Radio.Button>
            <Radio.Button value="medium">Medium</Radio.Button>
            <Radio.Button value="large">Large</Radio.Button>
          </Radio.Group>
          {table2JSX}
        </div>
    );
  }
}

Table2.propTypes = {
  pageData: PropTypes.array,
	/** params: id (string), checked (bool)*/
	onDeleteToggle: PropTypes.func,
  onUpdateFavorite: PropTypes.func,
  idsToDelete: PropTypes.array,
  wordListName: PropTypes.string
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
