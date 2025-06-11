const current_text = document.getElementById("current-text");
const line_default = document.getElementById("line-default");
const textarea = document.getElementById("textarea");

//document.addEventListener("click", (evt) => writeText("hello2"));

function setTextSize() {
    var line_width = line_default.offsetWidth + 40;
    var text_width = window.innerWidth - line_width;
    textarea.style.width = text_width + "px";
    textarea.style.maxWidth = text_width+ "px";
}

function writeText(input) {
    current_text.innerHTML = current_text.innerHTML + "<br>" + line_default.innerText + input;
}

document.addEventListener("keydown", handleInput);

function handleInput(e) {
    if (e.keyCode == 13) {
        //prevents enter from creating a new line
        e.preventDefault();
        //first, add in whatever text the user has inputted
        writeText(textarea.value);
        textarea.value = "";
    }
}


function crontasks() {
    setTextSize();
}

var cron = setInterval(crontasks, 20);