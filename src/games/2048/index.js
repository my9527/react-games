import React, {Component} from 'react';

import {connect} from "react-redux";

import PropTypes from "prop-types"
import * as immutable from "immutable";
import store from './utils/store'

// import './App.css';
import './index.less';

import Number from "./components/number"
import Matrix from "./components/matrix"
import Score from "./components/score"

import {DefaultMatrix, VARS} from "./utils/const"

import * as utils from "./utils/utils"

import "./utils/index";

class App extends Component {

    componentDidMount() {

        if ((/Android|webOS|iPhone|iPod|BlackBerry/i.test(window.navigator.userAgent))) {

            let pos = {x: 0, y: 0};
            // let dpos = {dx:0, dy:0};

            window.addEventListener("touchstart", e => {
                Object.assign(pos, {
                    x: e.touches[0].pageX,
                    y: e.touches[0].pageY,
                })
            });

            window.addEventListener("touchend", e => {
                let dpos = Object.assign({}, {
                    dx: e.changedTouches[0].pageX - pos.x,
                    dy: e.changedTouches[0].pageY - pos.y,
                })
                Object.assign(pos, {
                    x: 0,
                    y: 0,
                })

                if (Math.abs(dpos.dx) > Math.abs(dpos.dy)) {
                    if (dpos.dx > 0) {
                        this.move("right");
                    } else {
                        this.move("left")
                    }
                } else {
                    if (dpos.dy > 0) {
                        this.move("down")
                    } else {
                        this.move("up")
                    }
                }
            });

            return
        }
        window.addEventListener("keydown", e => {
            if (e.keyCode === 37) {
                this.move("left")
            }
            if (e.keyCode === 38) {
                this.move("up")
            }
            if (e.keyCode === 39) {
                this.move("right")
            }
            if (e.keyCode === 40) {
                this.move("down")
            }
        })
    }

    move(dir) {
        const lastMatrix = this.getMatrix();
        const _last = utils.matrixCopy(lastMatrix);

        const tempMatrix = utils.moveMatrix(lastMatrix, dir);

        if (utils.isGameOver(lastMatrix)) {
            alert("Game Over");
            return
        }

        let l = immutable.fromJS(tempMatrix);
        let c = immutable.fromJS(_last);

        if (immutable.is(l, c)) {
            // console.log("*************** " + "88888888888888888888" + " ***************")
            return
        }

        // 移动过后再空白的位置新增一个2或者4
        const emptyIndex = [];

        tempMatrix.forEach((row, idx) => {
            row.forEach((i, idy) => {
                i === 0 && emptyIndex.push({x: idx, y: idy})
            })
        });

        if (emptyIndex.length > 0) {
            let nextI = this.getEmpties(emptyIndex)
            tempMatrix[nextI.x][nextI.y] = utils.genNumber();
        }

        this.props.updateMatrix(tempMatrix);

    }

    getEmpties(emptyMatrix) {
        if (emptyMatrix.length === 1) {
            return emptyMatrix[0];
        }
        let nextI = emptyMatrix[Math.random() * emptyMatrix.length | 1];
        if (!nextI) {
            nextI = this.getEmpties(emptyMatrix);
        }

        return nextI
    }

    getMatrix() {
        return utils.matrixCopy(this.props.game.matrix);
    }

    reset() {
        this.props.restart();
    }

    render() {
        const props = this.props.game;
        return (
            <div className="game-2048">
                2048GAME

                <div style={{textAlign: "center", display: "flex", justifyContent: "center", position: "relative"}}>
                    <Matrix className={"bg-matrix"} matrix={DefaultMatrix}/>
                    {/*<div className="zone">*/}
                    <Matrix className={"zone-matrix"} matrix={props.matrix}/>
                    {/*</div>*/}
                </div>
                <div>
                    <span onClick={e => this.move("left")}>moveHor</span>

                    <Score score={props.score}/>
                    <div>
                        <span onClick={e => this.reset()}>reset</span>
                    </div>
                </div>
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
const mapDispatchToState = dispatch => {
    return {
        updateMatrix(nextMatrix) {
            dispatch({
                type: VARS.UPDATE_MATRIX,
                payload: {
                    matrix: nextMatrix
                }
            })
        },
        restart() {
            dispatch({
                type: VARS.GAME_RESTART,
                dispatch: dispatch
            })
        }
    }
}

export default connect(mapPropToState, mapDispatchToState)(App);
