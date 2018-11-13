import React, { Component } from "react";

class Prediction extends Component {

    componentDidMount() {
        this.props.loadModel();
    }
    render() {
        return (
            <div className="prediction">
                {this.props.answer ? this.props.answer : "Draw something"}
            </div >
        )
    }
}

export default Prediction;