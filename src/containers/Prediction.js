import { connect } from "react-redux";
import Prediction from "../components/Prediction";
import { } from "../actions/index";

const mapDispatchToProps = (dispatch) => {
    return {};
};

const mapStateToProps = (state) => {
    return {
        currentDraw: state.currentDraw,
    };
};

export const PredictionContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(Prediction);
