import React, { Component } from "react";
import { DrawingPadContainer } from "./containers/DrawingPad";
import { PredictionContainer } from "./containers/Prediction";

class App extends Component {
    render() {
        return (
            <div class="app">
                <PredictionContainer />
                <DrawingPadContainer />
            </div>

        )
    }
}

export default App;
