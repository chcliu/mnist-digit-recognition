import * as tf from '@tensorflow/tfjs';

export function createDrawPad(ref) {
    return function (dispatch, getState) {
        return (async () => {
            const canvas = ref;
            const context = canvas.getContext("2d");
            canvas.width = 28;
            canvas.height = 28;
            context.strokeStyle = "grey";
            var mouse = { x: 0, y: 0 };

            canvas.addEventListener('mousemove', function (e) {
                mouse.x = e.pageX - this.offsetLeft;
                mouse.y = e.pageY - this.offsetTop;

            }, false);

            canvas.addEventListener('mousedown', function (e) {
                context.beginPath();
                console.log("MOUSE DOWN", mouse.x, mouse.y)
                context.moveTo(mouse.x, mouse.y);
                canvas.addEventListener('mousemove', onPaint, false);
            }, false);

            canvas.addEventListener('mouseup', function () {
                canvas.removeEventListener('mousemove', onPaint, false);
                // console.log(bounds);
                // dispatch(setCoordinates([...getState().arrayX, mouse.x], [...getState().arrayY, mouse.y]));
                console.log("MOUSE UP", mouse.x, mouse.y);
                // const left = Math.min(...getState().arrayX);
                // const top = Math.min(...getState().arrayY);
                // const right = Math.max(...getState().arrayX);
                // const bottom = Math.max(...getState().arrayY);
                // dispatch(setBoundBox(left, top, right, bottom))
                // const mostRight = arrayY.sort((a, b) => a < b)[0];
                // console.log("BOUND BOX", left, top, right, bottom);
                const width = getState().right - getState().left;
                const height = getState().bottom - getState().top;
                // console.log(width, height);
                context.rect(getState().left, getState().right, width, height);
                context.stroke();
                let imageData = getState().context.getImageData(0, 0, 28, 28);
                console.log(imageData);
                // for (let y = canvas.height; y > 0; y--) {
                //     for (let x = canvas.width; x > 0; x--) {
                //         if 
                //     }
                // }
                // dispatch(setCurrentDraw(imageData))
                dispatch(predict(imageData));
                // console.log(getState().answer);
                // console.log(getState().predictions);
            }, false);

            var onPaint = function () {
                // dispatch(setCoordinates([...getState().arrayX, mouse.x], [...getState().arrayY, mouse.y]));
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
            // const model = await tf.loadModel("https://raw.githubusercontent.com/ixartz/handwritten-digit-recognition-tensorflowjs/master/public/classifiers/model.json");
            const model = await tf.loadModel("https://raw.githubusercontent.com/aralroca/MNIST_React_TensorFlowJS/master/public/assets/model.json");
            console.log(model);
            dispatch(setModel(model));
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
            let tensor = tf.fromPixels(imageData, 1).toFloat().reshape([1, 28, 28, 1])

            // tensor = tf.cast(tensor, 'float32');

            const output = await getState().model.predict(tensor);
            const predictions = Array.from(output.dataSync());

            predictions.forEach((prob, num) => {
                if (prob > maxProb) {
                    maxProb = prob;
                    result = num;
                }
            });
            output.print();
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

function setCoordinates(arrayX, arrayY) {
    return {
        type: "SET_COORDINATES",
        arrayX, arrayY,
    };
}

function setBoundBox(left, top, right, bottom) {
    return {
        type: "SET_BOUND_BOX",
        left, right, top, bottom,
    };
}