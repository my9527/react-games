/**
 * Created by my on 2018/1/30.
 */
import {combineReducers} from "redux";
import * as utils from "../utils/utils"
import {VARS, DefaultMatrix} from "../utils/const"

//  分数更新
const score = (dScore = utils.initScore, action) => {
    switch (action.type) {
        case VARS.SCORE_INCREASE: {

            const nextScore = dScore + action.payload.score
            utils.storage.set("score", nextScore);
            return nextScore
        }
        case VARS.SCORE_INIT: {
            return action.payload.score
        }
        case VARS.SCORE_RESET: {
            return 0
        }
        default: {
            return dScore;
        }
    }
}

// 矩阵更新
const matrix = (dMatrix = {matrix: utils.initMatrix}, action) => {
    switch (action.type) {
        case VARS.UPDATE_MATRIX: {
            const nextMatrix = action.payload.matrix;
            utils.storage.set("matrix", {matrix: nextMatrix});
            return {matrix: nextMatrix}
        }
        case VARS.INIT_MATRIX: {
            const _matrix = action.payload.matrix || utils.storage.get("matrix");

            return {matrix: _matrix.matrix || utils.resetMatrix()}
        }
        default: {

            return {matrix: dMatrix.matrix}
        }
    }
}

// 作为主要的相应，保证数据统一、唯一
const game = (state = {isOver: false, score: utils.initScore, matrix: utils.initMatrix}, action, ss) => {

    switch (action.type) {
        case VARS.GAME_RESTART: {
            utils.storage.set("matrix", {});
            utils.storage.set("score", 0);
            const _m = utils.resetMatrix();

            return {isOver: false, matrix: _m, score: 0}
        }

        case VARS.GAME_OVER: {
            return {...state, isOver: true}
        }

        default: {
            return {matrix: matrix(state, action).matrix, score: score(state.score, action), isOver: false}
        }
    }
}


export default game