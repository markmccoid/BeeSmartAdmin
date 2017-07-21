import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Route, Link, Redirect, withRouter } from 'react-router-dom';
import _ from 'lodash';
import Button from 'antd/lib/button';
import Radio from 'antd/lib/radio';
import Table from 'antd/lib/table';
import Icon from 'antd/lib/icon';
import 'antd/lib/button/style/css';
import 'antd/lib/table/style/css';


import Table2 from './WordDisplay/Table2';
import WordCard from './WordDisplay/WordCard';
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
const FlexContainer = styled.div`
  display: flex;
  align-items: center;
`;
//----PageContainer Component -----//
class PageContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      viewType: "table",
      idsToDelete: []
    }
  }

  componentWillReceiveProps(nextProps) {
    //Handle when search limits numberOfPages to less than what is currently in redux store.
    if (nextProps.pageNumber > nextProps.numberOfPages) {
      // nextProps.numberOfPages;
      this.props.onSetPageNumber(nextProps.numberOfPages);
    }

  }

  handleTableDeleteSelect = (idArray) => {
    //load the ids to delete into state
    this.setState({idsToDelete: idArray});
  }

  handlePageChange = pageNumber => {
    pageNumber = pageNumber < 1 ? 1 : pageNumber;
    pageNumber = pageNumber > this.props.numberOfPages ? this.props.numberOfPages : pageNumber;
    this.props.onSetPageNumber(pageNumber);
  }
  render() {
    let { pageData, numberOfPages } = this.props.pageInfo;
    console.log(this.props.sideBarState)
    return (
      <div>
        <FlexContainer>
          <Button size="small" type="primary" style={{marginRight: "15px"}}
            onClick={() => this.props.onSetSideBarState(!this.props.sideBarState)}
          >
            {this.props.sideBarState ? <Icon type="right" /> : <Icon type="left" />}
          </Button>
          <h4>{this.props.wordListName}</h4>
        </FlexContainer>
        <h6>{`Number Of Pages - ${numberOfPages}`}</h6>
        <Radio.Group value={this.state.viewType} onChange={(e) => this.setState({ viewType: e.target.value })}>
          <Radio.Button value="card">Cards View</Radio.Button>
          <Radio.Button value="table">Table View</Radio.Button>
        </Radio.Group>
        <PageControlSearchContainer>
        	<PageControl pageNumber={this.props.pageNumber} onPageChange={this.handlePageChange} />
        	<Search
            onFilterWords={this.props.onFilterWords}
            searchText={this.props.searchText}
            showNewWordsOnly={this.props.showNewWordsOnly}
            showFavorites={this.props.showFavorites}
          />
				<button
          className={this.state.idsToDelete.length > 0 ? "button primary" : "button primary disabled"}
          onClick={() => {
                this.props.onDeleteWords(this.props.wordListName, this.state.idsToDelete);
                this.props.onUpdateWordListIndex(this.props.wordListName, this.props.wordCount - this.state.idsToDelete.length);
              }
            }
        >
          Delete Selected
        </button>

        </PageControlSearchContainer>
        {this.state.viewType === 'table' ?
          <Table2
            pageData={pageData}
            onDeleteToggle={this.handleTableDeleteSelect}
            idsToDelete={this.state.idsToDelete}
            onUpdateFavorite={this.props.onUpdateFavorite}
            wordListName={this.props.wordListName}
          /> :
          <WordCardDiv>
            {pageData.map(wordObj => {
                return (
  								<WordCard
  									key={wordObj.id}
  									wordObj={wordObj}
  									onDeleteToggle={this.handleDeleteToggle}
  								/>
  								)
              })}
          </WordCardDiv>
        }
        <br />
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
  /** Parms: wordListName(string), newCount(int) */
  onUpdateWordListIndex: PropTypes.func,
  /** Parms: wordListName(string), wordId(string), isFavorite(bool) */
  onUpdateFavorite: PropTypes.func,
  /** Parms: isSideBarHidden(bool) */
  onSetSideBarState: PropTypes.func,
  sideBarState: PropTypes.bool,
  pageNumber: PropTypes.number,
  numberOfPages: PropTypes.number,
  pageInfo: PropTypes.object,
  wordListName: PropTypes.string,
  searchText: PropTypes.string,
  showNewWordsOnly: PropTypes.bool,
  wordCount: PropTypes.number
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
