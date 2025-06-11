const current_text = document.getElementById("current-text");
const line_default = document.getElementById("line-default");
const textarea = document.getElementById("textarea");
const textarea_container = document.getElementById("textarea-container");
const caret = document.getElementById("caret");

function setTextSize() {
    var line_width = line_default.offsetWidth + 50;
    var text_width = window.innerWidth - line_width;
    textarea_container.style.width = text_width + "px";
    textarea_container.style.maxWidth = text_width + "px";
}

function writeText(input, isuser) {
    if (isuser) {
        current_text.innerHTML = current_text.innerHTML + "<br>" + line_default.innerText + input;
    } else {
        current_text.innerHTML = current_text.innerHTML + "<br>" + input;
    }
}

document.addEventListener("keydown", handleInput);

function handleInput(e) {
    var temp_value = "";
    if (e.keyCode == 13) {
        //prevents enter from creating a new line
        e.preventDefault();
        //first, add in whatever text the user has inputted
        writeText(textarea.value, true);
        temp_value = textarea.value;
        textarea.value = "";
    }

    switch (temp_value) {
        case "help":
            writeText("thx for saying help!", false);
        break;
        case "bio":
            writeText("here is celeste's bio:", false);
        break;
    }
}


function crontasks() {
    setTextSize();
    blinker();
}

var cron = setInterval(crontasks, 20);

var blinking = false;
var blink_counter = 0;
function blinker() {
    blink_counter++;
    if (blink_counter > 40) {
        if (blinking) {
            caret.innerText = "";
            blinking = false;
        } else {
            caret.innerText = "|";
            blinking = true;
        }
        blink_counter = 0;
    }

}