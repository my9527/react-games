/**
 * Created by my on 2018/1/29.
 */


import * as immutable from "immutable"
import store from "./store"
import {VARS, DefaultMatrix} from "./const"

const matrixCopy = (arr) => {
    return arr.map(row => {
        return [...row]
    })
}

/**
 * 生成下一个将出现的数
 * @returns {number}
 */
const genNumber = () => {

    return Math.random() > 0.2 ? 2 : 4;

}

/**
 * 转置矩阵
 * @param arr
 */
const arrRotate = arr => {
    return arr[0].map(function (col, i) {
        return arr.map(function (row) {
            return row[i];
        })
    });
}

// 向右移动， 以此为基础实现其他方向的移动
const arrRow = (originRow = [], isRight = true) => {
    let nRow = [];
    let oLen = originRow.length;

    let row = (originRow.join("-").replace(/0+/g, "").split("-")).filter(r => {
        return r * 1;
    })
    let len = row.length;
    let score = 0;

    if (row.length < 2) {
        nRow.push(row[0] || 0)
    } else {
        for (let i = len - 1; i > -1; i--) {
            if (row[i] === undefined) {
                continue
            }
            if (row[i - 1] === undefined) {
                nRow.push(row[i])
                continue
            }

            if (row[i] === row[i - 1]) {
                i--;
                nRow.push(row[i] * 2);
                score += (row[i] * 2);
                continue;
            }

            nRow.push(row[i])
        }
    }

    if (nRow.length < oLen) {
        if (isRight) {

            nRow.push(...new Array(oLen - nRow.length).fill(0))
        } else {

            nRow.unshift(...new Array(oLen - nRow.length).fill(0))
        }

    }


    return {
        row: nRow.reverse(),
        score
    };
}

/**
 *
 * @param arr
 * @param isRight
 * @returns {Array}
 */
const moveHor = (arr = [], isRight = true, isTest = false) => {

    let score = 0;
    const nextMatrix = arr.map(row => {
        const rowInfo = arrRow(row, isRight);
        score += rowInfo.score;
        return rowInfo.row
    })
    !isTest && store.dispatch({
        type: VARS.SCORE_INCREASE,
        payload: {
            score
        }
    })
    return nextMatrix
}

/**
 * 数组竖向合并
 * @param arr 原数组
 */
const moveVer = (arr, dir, isTest = false) => {
    let newArr = arrRotate(arr);
    let tmpArr = null;

    if (dir === "down") {
        // 向右移
        tmpArr = moveHor(newArr, true, isTest);


    } else {
        // 向左移动
        tmpArr = moveHor(newArr, false, isTest);

    }

    return arrRotate(tmpArr)
    // 再次转置

}

/**
 * 矩阵移动
 * @param arr
 * @param dir
 */
const moveMatrix = (arr, dir, isTest = false) => {

    if (!isTest) {
        // !isTest && console.matrix(arr);
    }

    if (dir === "left") {
        return moveHor(arr, false, isTest)
    }

    if (dir === "right") {
        return moveHor(arr, true, isTest)
    }

    if (dir === "up") {
        return moveVer(arr, "up", isTest)
    }

    return moveVer(arr, "down", isTest)
}

/**
 * 判断游戏是否结束
 * @param matrix
 * @param dir
 * @returns {boolean}
 */
const isGameOver = (matrix, dir) => {
    let o = immutable.fromJS(matrix)
    let up = immutable.fromJS(moveMatrix(matrix, "up", true))
    let down = immutable.fromJS(moveMatrix(matrix, "down", true))
    let left = immutable.fromJS(moveMatrix(matrix, "left", true))
    let right = immutable.fromJS(moveMatrix(matrix, "right", true))

    if (immutable.is(up, down) && immutable.is(left, right) && immutable.is(left, up)) {
        return true
    }
    return false
}

/**
 * window.localStorage 操作
 * @type {{specifix: string, set: ((name, val?)), get: ((name))}}
 */
const storage = {

    specifix: "_r2048_",

    set(name, val = {}) {
        window.localStorage.setItem(storage.specifix + name, JSON.stringify(val))
    },
    get(name) {
        return JSON.parse(window.localStorage.getItem(storage.specifix + name) || "{}")
    }
}

// 获取初始化分数（刷新后从此获取，保证分数持久化）
const initScore = (() => {
    // const _sc =
    return storage.get("score") * 1 || 0
})();

// 随机生成初始化矩阵
const genInitMatrix = (matrix = DefaultMatrix) => {
    const d = matrixCopy(matrix);
    const x = Math.floor(Math.random() * d[0].length);
    const y = Math.floor(Math.random() * d[0].length);

    d[x][y] = genNumber();
    return d;
}

/**
 * 将矩阵的元素数字化
 * @param matrix
 */
const matrixNum = matrix => {
    return matrix.map(row => {
        return row.map(mtr => {
            return mtr * 1
        })
    })
}

/**
 * 初始化时获取上次的矩阵或新生成一个矩阵
 */
const initMatrix = (() => {
    const m = storage.get("matrix");
    if (m.matrix) {
        return matrixNum(m.matrix);
    }
    return genInitMatrix(genInitMatrix())
    // return matrixNum(storage.get("matrix").matrix ||)
})();

/**
 * 重新生成一个矩阵
 */
const resetMatrix = () => {
    // console.matrix(DefaultMatrix)
    const newMatrix = genInitMatrix(genInitMatrix(DefaultMatrix));

    return newMatrix;
}

// console.log(initMatrix, "dddd", storage.get("matrix"));
export {
    genNumber,
    moveMatrix,
    isGameOver,
    storage,
    initScore,
    initMatrix,
    matrixNum,
    resetMatrix,
    matrixCopy

}