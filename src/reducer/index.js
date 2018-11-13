const defaultState = {
    canvas: null,
    context: null,
    currentDraw: null,
    model: null,
    predictions: null,
    answer: null,
};


const reducer = (state = defaultState, action) => {
    switch (action.type) {
        case "SET_DRAWPAD":
            return { ...state, canvas: action.canvas, context: action.context };
        case "SET_CURRENT_DRAW":
            return { ...state, currentDraw: action.currentDraw };
        case "SET_MODEL":
            return { ...state, model: action.model };
        case "SET_PREDICTIONS":
            return { ...state, answer: action.answer, predictions: action.predictions }
        default:
            return state;
    }
};

export default reducer;