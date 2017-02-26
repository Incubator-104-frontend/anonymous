import React, { Component } from 'react';
import css from './App.css';
import CSSModule from 'react-css-modules';
import Header from './header';

@CSSModule(css)

class App extends Component {
	constructor(props){
		super(props);
		this.state = {};
	}
	render() {
		return (
			<div>
				<Header/>
				<div styleName="container">
					{ this.props.children }
				</div>
			</div>
		);
	}
}

export default App;
