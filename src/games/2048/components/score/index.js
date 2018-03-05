/**
 * Created by my on 2018/1/30.
 */


import React from "react";
import PropTypes from "prop-types"

const CmptScore = (props) => {


    return (
        <div className="cmpt cmpt-score">
            {props.score}
        </div>
    )
}

CmptScore.propType = {
    score: PropTypes.number.isRequired
}

export default CmptScore;