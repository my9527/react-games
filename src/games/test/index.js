import React, {Component} from 'react';

import {connect} from "react-redux";

import store from '../2048/utils/store';
// import PropTypes from "prop-types"
// import * as immutable from "immutable";


class App extends Component {


    render() {
        const props = this.props.game;
        return (
            <div className="App">
                test
            </div>
        );
    }
}

App.propTypes = {
    // score: PropTypes.number.isRequired,
    // matrix: PropTypes.array.isRequired,
    // game: PropTypes.object.isRequired
}

const mapPropToState = (state) => {
    return {
        // score: state.score.score,
        // matrix: state.matrix.matrix,
        game: store.getState().reducer2048
    }
}


export default connect(mapPropToState)(App);
