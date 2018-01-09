import React from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';


export default class App extends React.Component {


    constructor(props, context) {
        super(props, context);
        this.state = {
	  
        };
    }


    render() {
        return (
            <div className="app">
                <nav id="nav" className="navbar navbar-default navbar-fixed-top">
                    <h1 className="navbar-header">
                        React Redux Sheet
                    </h1>
                    <ul className="nav navbar-nav pull-right">
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/about">About</Link></li>
                        <li><a href="https://github.com/Jarosh/react-redux-sheet" target="_blank">GitHub</a></li>
                    </ul>
                </nav>
                <div id="app">
                    { React.cloneElement(this.props.children, { app: this }) }
                </div>
            </div>
        );
    }


}
