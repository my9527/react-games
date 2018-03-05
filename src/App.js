import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import {Link, BrowserRouter as Router, Route} from 'react-router-dom';

import {games} from './utils/consts'
import Routes from './routes'

class App extends Component {
    render() {
        return (
            <div className="App">

                <Router>
                    <Route path="/" component={Routes}/>
                </Router>

            </div>
        );
    }
}

export default App;
