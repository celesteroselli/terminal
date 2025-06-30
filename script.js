const current_text = document.getElementById("current-text");
const line_default = document.getElementById("line-default");
const textarea = document.getElementById("textarea");
const textarea_container = document.getElementById("textarea-container");
const caret = document.getElementById("caret");
const datespan = document.getElementById("date");

const canvas = document.createElement('canvas');
const context = canvas.getContext('2d');
context.font = '17px Monospace';

was_text = true

function setTextSize() {
    var line_width = line_default.offsetWidth + 50;
    var text_width = window.innerWidth - line_width;
    textarea_container.style.width = text_width + "px";
    textarea_container.style.maxWidth = text_width + "px";
    resize()
}

function resize() {
    var num = textarea.value.length;
    var metrics = context.measureText(textarea.value); // Replace 'a' with your desired character
    var characterWidth = metrics.width;
    console.log(characterWidth)
    textarea.style.width=((characterWidth+15)+"px");
}

function writeText(input, isuser, type) {
    if (!(type==true)) {
        if (isuser) {
            if (was_text) {
                current_text.innerHTML = current_text.innerHTML + line_default.innerText + input;
                was_text = false;
            } else {
                current_text.innerHTML = current_text.innerHTML + "<br>" + line_default.innerText + input;
            }
            console.log("user!!")
        } else {
            current_text.innerHTML = current_text.innerHTML + "<br>" + input;
        }
    } else {
        current_text.innerHTML += "<br><br>";
        var i = 0;
        var is_bold = false
        var is_italic = false

        var intervalID = setInterval(() => {
        var char = input.charAt(i);


        if (char=="%") {
            current_text.innerHTML += "<br>";
        } 
        else if (char=='/') {
            current_text.innerHTML += "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;";
        }
        else if (char=='~') {
            if (is_italic) {
                is_italic = false;
            } else {
                is_italic = true;
            }
        }
        else if (char=='*') {
            if (is_bold) {
                is_bold = false;
            } else {
                is_bold = true;
            }
        }
        else {
            if (is_bold) {
                current_text.innerHTML += "<span id='color-white'><strong>" + char + "</strong></span>";
            } else if (is_italic) {
                current_text.innerHTML += "<span id='color-white'><em>" + char + "</em></span>";
            } else {
                current_text.innerHTML += "<span id='color-white'>" + char + "<span>";
            }
        }

        //ending run!
        if (i==(input.length-1)) {
            clearInterval(intervalID);
            current_text.innerHTML += "<br><br></span>";
            was_text = true
        }

        i++;

        }, 50);
    }
}

document.addEventListener("keydown", handleInput);
document.addEventListener("click", (evt)=> textarea.focus());

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
            writeText(help, false, true);
        break;
        case "bio":
            writeText(bio, false, true);
        break;
        case "projects":
            writeText(projects, false, true);
        break;
        case "clear":
            current_text.innerHTML = "<p>welcome to celeste roselli's portfolio site. celeste roselli is a software developer from atlanta, georgia.<br><br>type <em>help</em> to learn more!<br></p>";
            was_text = true;
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

const date = new Date();

let day = date.getDate();
let month = date.getMonth() + 1;
let year = date.getFullYear();

datespan.innerHTML = date;


//WRITINGS

bio = "Hi! My name is Celeste Roselli, and I'm a 16-year-old coder, musician, maker, writer, roboticist, and scientist.%%I began my coding journey at 6 (shoutout to Hour of Code), and started competitive robotics at 10-years-old, which I've been pursuing ever since.%%In addition to STEM, I have a passion for music performance and theory, leading to my interdisciplinary interest in musicology and harmonics (the science behind music).%%I love how computers allow us to visualize advanced science concepts, making STEM less obscure, and increasing STEM education accessibility.%%This has inspired me to pursue studying computational physics as I enter undergraduate :)"

projects = `Check out all of my projects at my GitHub. Here are some of my favorites!%%
*CourtConnect:* a messaging web app utilized by Georgia state and federal courts to speed up jury selection.%
/- *Awards: *Congressional App Challenge%
/- *Tools: *VSCode, Railway (for deployment), Python, Django, HTML, CSS, Bootstrap%%

*Oscillart:* a YSWS program for Hack Club, combining art, music, science, and technology to teach teens to make musical web apps.%
/- *Tools: *VSCode, GitHub Codespaces, Markdown, HTML, CSS, Javascript%%

*Elevator:* a quick web app made in tribute to my favorite Lemony Snicket quote. Iykyk. :)%
/- *Tools: *VSCode, GitHub Codespaces, HTML, CSS, Javascript%%

*FRC ML Vision Algorithm:* a robotics feature for First Robotics Competition using Tensorflow and Limelight Cameras to detect and automatically align robots to specific field objects.%
/- *Awards: *First Creativity Award (x3)%
/- *Tools: *VSCode, Java, Limelight Cameras, Tensorflow, Google Coral
`

help = `
~help~ = see the list of commands%
~bio~ = read about me!%
~projects~ = see my favorite projects I've worked on%
~clear~ = clear the screen
`