import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { startSetWordsPerPage } from '../../actions';

const OuterDiv = styled.div`
    display: flex;
    flex-direction: column;
    margin: 20px;
`;
const Label = styled.div`
  font-size: 14px;
  font-weight: bold;
`;
const Display = styled.div`
  margin-left: 20px;
  font-size: 14px;
  font-weight: bold;
`
const Section = styled.div`
  display: flex;
  align-items: center;
`;
const Input = styled.input`
  width: 200px;
  margin: 0 20px;
`;
const Button = styled.a`
  margin: 0;
`
class SettingsContainer extends React.Component {
  state = {
    wordsPerPageInput: ''
  }

  render() {
    return (
      <OuterDiv>
      <Section>
        <Label>Current Words Per Page:</Label>
        <Display> {this.props.settings.wordsPerPage}</Display>
      </Section>
      <Section>
      <Label>Set Words Per Page:</Label>

        <Input
          type="text"
          value={this.state.wordsPerPageInput}
          onChange={(e) => this.setState({ wordsPerPageInput: e.target.value })}
          onKeyPress={(e) => {
            if (e.key === 'Enter') {
              this.props.setWordsPerPage(parseInt(this.state.wordsPerPageInput));
              this.setState({wordsPerPageInput: ''});
            }
          }}
        />
        <Button
          className="button primary"
          onClick={() => {
            this.props.setWordsPerPage(parseInt(this.state.wordsPerPageInput));
            this.setState({wordsPerPageInput: ''});
          }}>Set</Button>
      </Section>
      </OuterDiv>
    )
  }
}

const mapStateToProps = state => {
  return {
    settings: state.settings
  }
}
export default connect(mapStateToProps, {setWordsPerPage: startSetWordsPerPage})(SettingsContainer);
