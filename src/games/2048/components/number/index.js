/**
 * Created by my on 2018/1/29.
 */


import React, {Component} from "react";
import PropTypes from "prop-types";
// import classnames from "classnames";
import {Colors} from "../../utils/const";

import "./index.less"


class CmptNumber extends Component {

    render() {
        const props = this.props;
        const style = {
            backgroundColor: Colors[props.num],
            color: props.num > 0 ? "white" : "transparent"
        }
        return (
            <div className="cmpt cmpt-number" style={style}>
                {props.num}
            </div>
        )
    }
}

CmptNumber.propTypes = {
    num: PropTypes.number.isRequired
}

export default CmptNumber;