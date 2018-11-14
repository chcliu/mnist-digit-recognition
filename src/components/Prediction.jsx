import React, { Component } from "react";

class Prediction extends Component {

    componentDidMount() {
        this.props.loadModel();
    }
    render() {
        return (
            <h3 className="prediction">
                {this.props.answer !== null ? this.props.answer : "Draw something"}
            </h3>
        )
    }
}

export default Prediction;