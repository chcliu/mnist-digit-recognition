
export function createDrawPad(ref) {
    return function (dispatch, getState) {
        return (async () => {
            const canvas = ref;
            const context = canvas.getContext("2d");
            canvas.width = 250;
            canvas.height = 250;
            context.rect(0, 0, canvas.width, canvas.height);
            context.fillStyle = "white";
            context.fill();

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
                dispatch(setCurrentDraw(getState().canvas.toDataURL()))
                //CONSOLE LOG RIGHT HERE
                console.log(getState().currentDraw);
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
            fillWhite();
            fillWhite();
            fillWhite();
            fillWhite();
            function fillWhite() {
                context.rect(0, 0, canvas.width, canvas.height);
                context.fillStyle = "white";
                context.fill();
            }

            dispatch(setDrawPad(canvas, context));
        })();
    };
}
