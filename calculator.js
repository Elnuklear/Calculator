let runningTotal = 0;
let buffer = "0";
let previousOperator;
const screen = document.querySelector(".output");

function clickIt (value) {
    if (isNaN(parseInt(value))) {
        handleSymbol(value);        
    } else {
        handleNumber(value);
    }
    rerender();
}

document.querySelector("#calculator").addEventListener("click", function (event) {
    clickIt(event.target.innerText);
}, false)

function handleNumber (value) {
    if (buffer === "0") {
        buffer = value;
    } else {
        buffer += value;
    }
}

function handleSymbol (value) {
    switch (value) {
        case "C":
            buffer = "0";
            runningTotal = 0;
            previousOperator = null;
            break;

        case "=":
            if (previousOperator === null) {
                return
            } else {
                flushOperation(parseInt(buffer));
                previousOperator = null;
                buffer = "" + runningTotal;
                runningTotal = 0;
                break;
            }
            break;

        case "←":
            if (buffer.length === 0) {
                buffer = 0;
            } else {
                buffer = buffer.substring(0, buffer.length - 1)
            }
            break;

        default:
        handleMath(value)
        break;
    }
}

function rerender () {
    output.innerText = buffer;
}

function handleMath (value) {
    const intBuffer = parseInt(buffer);

    if (runningTotal === 0) {
        runningTotal = intBuffer;
    } else {
        flushOperation(intBuffer);
    }
    previousOperator = value;

    buffer = "0";
}

function flushOperation (intBuffer) {
    switch (previousOperator) {
        case "+":
            runningTotal += intBuffer;
            break;

       case "-":
            runningTotal -= intBuffer;
            break;

        case "÷":
            runningTotal /= intBuffer;
            break;

        case "×":
            runningTotal *= intBuffer;
            break;
    }
}