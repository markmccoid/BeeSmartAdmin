import React from 'react';
import { Route, Switch } from 'react-router-dom';
import styled from 'styled-components';

//Import Components
import Navbar from './Navbar';
import MainDisplay from './MainDisplay';
import SettingsContainer from './Settings/SettingsContainer';

const OuterDiv = styled.div`
	background-color: rgba(233, 84, 31, 0.5);
	height: 100vh;
`
const Main = () => {
	return (
		<OuterDiv>
			<Navbar />
			<Switch>
				<Route path="/settings" component={SettingsContainer} />
				<Route path="/" component={MainDisplay} />
			</Switch>
		</OuterDiv>
	);
};

export default Main;
