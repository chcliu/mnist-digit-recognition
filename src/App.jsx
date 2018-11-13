import React, { Component } from "react";
import { DrawingPadContainer } from "./containers/DrawingPad";
import { PredictionContainer } from "./containers/Prediction";

class App extends Component {
    render() {
        return (
            <div>
                <DrawingPadContainer />
                <PredictionContainer />
            </div>

        )
    }
}

export default App;
