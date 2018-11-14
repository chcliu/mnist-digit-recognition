import { connect } from "react-redux";
import DrawingPad from "../components/DrawingPad";
import { createDrawPad, clearDrawPad } from "../actions/index";


const mapDispatchToProps = (dispatch) => {
    return {
        createDrawPad: (ref) => {
            const res = createDrawPad(ref);
            dispatch(res);
        },
        clearDrawPad: () => {
            const res = clearDrawPad();
            dispatch(res);
        },
    };
};

const mapStateToProps = (state) => {
    return {
        canvas: state.canvas,
        context: state.context,
    };
};

export const DrawingPadContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(DrawingPad);
