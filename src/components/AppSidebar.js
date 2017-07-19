import React from 'react';
import PropTypes from 'prop-types';
import { NavLink, withRouter } from 'react-router-dom';
import _ from 'lodash';

const AppSidebar = (props) => {
	const sortedKeys = (obj, func) => {
		let arrayOfKeys = (Object.keys(obj));
		arrayOfKeys.sort((a,b) => {
			let aUp = a.toUpperCase(); // ignore upper and lowercase
			let bUp = b.toUpperCase(); // ignore upper and lowercase
			if (aUp < bUp) {
				return -1;
			}
			if (aUp > bUp) {
				return 1;
			}
			// names must be equal
			return 0;
		});
		
		let returnArr = [];
		arrayOfKeys.forEach(key => {
			returnArr.push(func(obj[key], key));
		});
		return returnArr;
	};
	return (
		<ul className="content-nav-menu">
			{
				sortedKeys(props.wordListIndex, (data, key) => {
					return <li key={key}>
							<NavLink to={`/wordlist/${key}`}>{`${key} - ${data.numberOfWords}`}</NavLink>
						</li>
				})
			}
		</ul>
	)
};

AppSidebar.propType = {
	wordListIndex: PropTypes.object
};

export default AppSidebar;
