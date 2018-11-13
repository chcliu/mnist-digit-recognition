import { connect } from "react-redux";
import Prediction from "../components/Prediction";
import { loadModel } from "../actions/index";

const mapDispatchToProps = (dispatch) => {
    return {
        loadModel: () => {
            const res = loadModel();
            dispatch(res);
        },
    };
};

const mapStateToProps = (state) => {
    return {
        currentDraw: state.currentDraw,
        answer: state.answer
    };
};

export const PredictionContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(Prediction);
