import React, {Component} from 'react';

import {Route, Switch} from 'react-router-dom';


import PageIndex from './indexPage';
import Game2048 from '../games/2048';
// import Game2048 from '../games/test';

export default class Routes extends Component {

    render() {

        return (

            <div>
                <Switch>
                    <Route exact path="/" component={PageIndex}/>
                    <Route path="/games/2048" component={Game2048}/>
                </Switch>
            </div>

        )
    }
}