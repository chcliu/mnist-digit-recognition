import * as tf from '@tensorflow/tfjs';

export function createDrawPad(ref) {
    return function (dispatch, getState) {
        return (async () => {
            const canvas = ref;
            const context = canvas.getContext("2d");
            canvas.width = 250;
            canvas.height = 250;
            context.strokeStyle = "grey";

            var mouse = { x: 0, y: 0 };

            canvas.addEventListener('mousemove', function (e) {
                mouse.x = e.pageX - this.offsetLeft;
                mouse.y = e.pageY - this.offsetTop;
            }, false);


            canvas.addEventListener('mousedown', function (e) {
                context.beginPath();
                context.lineWidth = 10;
                context.moveTo(mouse.x, mouse.y);

                canvas.addEventListener('mousemove', onPaint, false);
            }, false);

            canvas.addEventListener('mouseup', function () {
                canvas.removeEventListener('mousemove', onPaint, false);
                const imageData = getState().context.getImageData(0, 0, 28, 28);
                dispatch(setCurrentDraw(imageData))
                dispatch(predict(imageData));
                console.log(getState().answer);
                console.log(getState().predictions);
            }, false);

            var onPaint = function () {
                context.lineTo(mouse.x, mouse.y);
                context.stroke();
            };
            dispatch(setDrawPad(canvas, context));
        })();
    };
}

function setCurrentDraw(currentDraw) {
    return {
        type: "SET_CURRENT_DRAW",
        currentDraw,
    };
}

function setDrawPad(canvas, context) {
    return {
        type: "SET_DRAWPAD",
        canvas, context,
    };
}

export function clearDrawPad() {
    return function (dispatch, getState) {
        return (async () => {
            const canvas = getState().canvas;
            const context = canvas.getContext('2d');;
            context.clearRect(0, 0, canvas.width, canvas.height);
            dispatch(setDrawPad(canvas, context));
            dispatch(setPredictions(null, null));
        })();
    };
}

export function loadModel() {
    return function (dispatch) {
        return (async () => {
            const model = await tf.loadModel('./assets/model.json');
            dispatch(setModel(model));
            console.log(model);
        })();
    }
}

function setModel(model) {
    return {
        type: "SET_MODEL",
        model,
    };
}

function predict(imageData) {
    return function (dispatch, getState) {
        return (async () => {
            let maxProb = 0;
            let result;
            let img = tf.fromPixels(imageData, 1).reshape([1, 28, 28, 1]);
            img = tf.cast(img, 'float32');

            const output = await getState().model.predict(img);
            const predictions = Array.from(output.dataSync());

            predictions.forEach((prob, num) => {
                if (prob > maxProb) {
                    maxProb = prob;
                    result = num;
                }
                output.print();
            });
            dispatch(setPredictions(result, predictions));
        })();
    }
}

function setPredictions(answer, predictions) {
    return {
        type: "SET_PREDICTIONS",
        answer, predictions
    };
}