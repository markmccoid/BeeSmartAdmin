import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Route, Link } from 'react-router-dom';
import _ from 'lodash';
import Button from 'antd/lib/button';
import Radio from 'antd/lib/Radio';
import Table from 'antd/lib/table';
import 'antd/lib/button/style/css';
import 'antd/lib/table/style/css';


import WordDisplay from './WordDisplay/WordDisplay';
import PageControl from './PageControl/PageControl';
import Search from './Search';

//----Styled Components -----//
const WordCardDiv = styled.div`
  display: flex;
  flex-wrap: wrap;
`;
const PageControlSearchContainer = styled.div`
	display: flex;
	align-items: center;
`;
//----PageContainer Component -----//
class PageContainer extends React.Component {
  constructor(props) {
    super(props);
		this.idsToDelete = [];
    this.state = {
      deleteActive: false,
      viewType: "table1"
    }
  }

  componentWillReceiveProps(nextProps) {
    //Handle when search limits numberOfPages to less than what is currently in redux store.
    if (nextProps.pageNumber > nextProps.numberOfPages) {
      // nextProps.numberOfPages;
      this.props.onSetPageNumber(nextProps.numberOfPages);
    }

  }

	handleDeleteToggle = (id, checked) => {
	//Will get an id and a checked flag.  If flag is true,
	//then this word is to be deleted (add to delete array), if false, then remove it
	//from the static idsToDelete array
		if (checked) {
			this.idsToDelete.push(id);
		} else {
			_.remove(this.idsToDelete, currId => currId === id);
		}
	}

  handleTableDeleteSelect = (idArray) => {
    //load the ids to delete into class variable
    this.idsToDelete = idArray;
    //set the state to alert component that delete button should be active
    if (this.idsToDelete.length > 0 && !this.state.deleteActive) {
      this.setState({deleteActive: true});
    }
    if (this.idsToDelete.length === 0) {
      this.setState({deleteActive: false});
    }

  }

  handlePageChange = pageNumber => {
    pageNumber = pageNumber < 1 ? 1 : pageNumber;
    pageNumber = pageNumber > this.props.numberOfPages ? this.props.numberOfPages : pageNumber;
    this.props.onSetPageNumber(pageNumber);
  }
  render() {
    let { pageData, numberOfPages } = this.props.pageInfo;
    return (
      <div>
        <h4>{this.props.wordListName}</h4>
        <h6>{`Number Of Pages - ${numberOfPages}`}</h6>
        <Radio.Group value={this.state.viewType} onChange={(e) => this.setState({ viewType: e.target.value })}>
          <Radio.Button value="card">Cards</Radio.Button>
          <Radio.Button value="table1">Table 1</Radio.Button>
          <Radio.Button value="table2">Table 2</Radio.Button>
        </Radio.Group>
        <Radio.Group value={this.state.viewType} onChange={(e) => <Link to="/table2"/>}>
          <Radio.Button value="card">Cards</Radio.Button>
          <Radio.Button value="table1">Table 1</Radio.Button>
          <Radio.Button value="table2">Table 2</Radio.Button>
        </Radio.Group>
        <Link to="/table2">Table2</Link>
        <PageControlSearchContainer>
        	<PageControl pageNumber={this.props.pageNumber} onPageChange={this.handlePageChange} />
        	<Search
            onFilterWords={this.props.onFilterWords}
            searchText={this.props.searchText}
            showNewWordsOnly={this.props.showNewWordsOnly}
          />
				<button className={this.state.deleteActive ? "button primary" : "button primary disabled"} onClick={() => this.props.onDeleteWords(this.props.wordListName, this.idsToDelete)}>Delete Selected</button>

        </PageControlSearchContainer>
        <Route path="/table2"
          render={() => {console.log("here"); <Table2 pageData={pageData} onDeleteToggle={this.handleTableDeleteSelect} />}}
        />
        {/* <WordDisplay
          pageData={pageData}
          onDeleteToggle={this.handleTableDeleteSelect}
          viewType={this.state.viewType}
        /> */}

        {/* <WordCardDiv>
          {pageData.map(wordObj => {
              return (
								<WordCard
									key={wordObj.id}
									wordObj={wordObj}
									onDeleteToggle={this.handleDeleteToggle}
								/>
								)
            })}
        </WordCardDiv> */}
        <PageControlSearchContainer>
          <PageControl pageNumber={this.props.pageNumber} onPageChange={this.handlePageChange} />
        </PageControlSearchContainer>
      </div>
    );
  }
}

PageContainer.propTypes = {
  onSetPageNumber: PropTypes.func,
  onSavePageData: PropTypes.func,
  onFilterWords: PropTypes.func,
	/** Parms: wordList (string), idsToDelete (array) */
	onDeleteWords: PropTypes.func,
  pageNumber: PropTypes.number,
  numberOfPages: PropTypes.number,
  pageInfo: PropTypes.object,
  wordListName: PropTypes.string,
  searchText: PropTypes.string,
  showNewWordsOnly: PropTypes.bool
}
export default PageContainer;

/**
pageInfo.pageData
{
	id,
	word,
	syllables,
	partOfSpeech,
	origin,
	isNewWord,
	mwLink
}
*/
