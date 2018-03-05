const VARS = {
    // 分数
    SCORE_INCREASE: "2048_SCORE_INCREASE",
    SCORE_RESET: "2048_SCORE_RESET",
    SCORE_INIT: "2048_SCORE_INIT",

    // 移动
    MV_LEFT: "2048_MV_LEFT",
    MV_RIGHT: "2048_MV_RIGHT",
    MV_UP: "2048_MV_UP",
    MV_DOWN: "2048_MV_DOWN",

    // 游戏开始、结束
    GAME_OVER: "2048_GAME_OVER",
    GAME_RESTART: "2048_GAME_RESTART",

    // UPDATE_MATRIX
    UPDATE_MATRIX: "2048_UPDATE_MATRIX",
    INIT_MATRIX: "2048_INIT_MATRIX"

};


/**
 * 各个数代表的颜色
 * @type {{0: string, 2: string, 4: string, 8: string, 16: string, 32: string, 64: string, 128: string, 256: string}}
 */
const Colors = {
    0: "#cdc1b3",
    2: "#FFCC99",
    4: "#FFCC66",
    8: "#FF9933",
    16: "#FF9900",
    32: "#FF6633",
    64: "#FF3333",
    128: "#FF0000",
    256: "#CC3333"
};

const DefaultMatrix = [[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]];

export {
    Colors,
    DefaultMatrix,
    VARS
}
