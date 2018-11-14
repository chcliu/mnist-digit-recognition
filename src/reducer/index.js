const defaultState = {
    canvas: null,
    context: null,
    currentDraw: null,
    model: null,
    predictions: null,
    answer: null,
    arrayX: [],
    arrayY: [],
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
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
        case "SET_BOUND_BOX":
            return { ...state, left: action.left, right: action.right, top: action.top, bottom: action.bottom }
        case "SET_COORDINATES":
            return { ...state, arrayX: action.arrayX, arrayY: action.arrayY };
        default:
            return state;
    }
};

export default reducer;