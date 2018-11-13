const defaultState = {
    canvas: null,
    context: null,
    currentDraw: "",
};


const reducer = (state = defaultState, action) => {
    switch (action.type) {
        case "SET_DRAWPAD":
            return { ...state, canvas: action.canvas, context: action.context };
        case "SET_CURRENT_DRAW":
            return { ...state, currentDraw: action.currentDraw };
        default:
            return state;
    }
};

export default reducer;