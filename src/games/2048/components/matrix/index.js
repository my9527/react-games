/**
 * Created by my on 2018/1/29.
 */


import  React, {Component} from "react";
import * as immutable from "immutable";
import PropTypes from "prop-types"

import Number from "../number";


import "./index.less"


class CmptMatrix extends Component {

    getMatrix() {

        return this.props.matrix

    }

    render() {

        const matrix = this.getMatrix();
        return (
            <div className={`cmpt cmpt-matrix ${this.props.className}`}>
                {matrix.map((row, idx) => {
                    return row.map((mtr, idy) => {
                        return <Number key={`${idx}-${idy}`} num={mtr * 1}/>
                    })
                })}
            </div>
        )

    }
}
CmptMatrix.propTypes = {
    matrix: PropTypes.array.isRequired,
    className: PropTypes.string
}

export default CmptMatrix;