import React, { Component } from "react";
import 'typeface-roboto';
import { Typography } from '@material-ui/core';

class Prediction extends Component {

    componentDidMount() {
        this.props.loadModel();
    }
    render() {
        return (
            <Typography className="prediction" style={{color: 'gray'}}>
                {this.props.answer !== null ? "Prediction: " + this.props.answer : "Enter a digit from 0 to 9."}
            </Typography>
        )
    }
}

export default Prediction;