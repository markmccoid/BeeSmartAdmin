import React from 'react';
import { Route, Switch } from 'react-router-dom';

//Import Components
import Navbar from './Navbar';
import MainDisplay from './MainDisplay';
import SettingsContainer from './Settings/SettingsContainer';

const Main = () => {
	return (
		<div>
			<Navbar />
			<Switch>
				<Route path="/settings" component={SettingsContainer} />
				<Route path="/" component={MainDisplay} />
			</Switch>
		</div>
	);
};

export default Main;
