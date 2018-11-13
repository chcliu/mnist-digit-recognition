import React, { Component } from "react";

class DrawingPad extends Component {

    componentDidMount() {
        this.props.createDrawPad(this.refs.canvas);

    }
    render() {
        return (
            <div>
                <div className="drawingPad">
                    <canvas ref="canvas" width="250" height="250" style={{ border: "2px solid black" }}></canvas>
                </div>
                <button className="clear-btn" onClick={this.props.clearDrawPad}>Clear</button>
            </div >
        )
    }
}

export default DrawingPad;
