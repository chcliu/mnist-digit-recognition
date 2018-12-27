import React, { Component } from "react";
import { DrawingPadContainer } from "./containers/DrawingPad";
import { PredictionContainer } from "./containers/Prediction";
import 'typeface-roboto';
import { Typography } from '@material-ui/core';

class App extends Component {
    render() {
        return (
            <div class="app">
                <Typography className="text" style={{ color: 'gray', fontSize: 25 }}>
                    Enter a digit from 0 to 9.
                </Typography>
                <DrawingPadContainer />
                <PredictionContainer />
            </div>

        )
    }
}

export default App;
