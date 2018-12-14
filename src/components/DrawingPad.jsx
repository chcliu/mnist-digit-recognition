import React, { Component } from "react";
import Button from '@material-ui/core/Button';

class DrawingPad extends Component {

    componentDidMount() {
        this.props.createDrawPad(this.refs.canvas);

    }
    render() {
        return (
            <div>
                <div className="drawingPad">
                    <canvas ref="canvas" width="250" height="250" style={{ border: "3px inset gray" }}></canvas>
                </div>
                <Button className="clear-btn" size="small" variant="contained" color="primary" onClick={this.props.clearDrawPad}>Clear</Button>
            </div >
        )
    }
}

export default DrawingPad;
