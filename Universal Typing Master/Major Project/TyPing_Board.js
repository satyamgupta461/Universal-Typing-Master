// define the time limit
let TIME_LIMIT = 15;

// define quotes to be used
let quotes_array = [
    `Some cricketers rise to the top constitutes hours of. If his orthodoxy is compact and aesthetically pleasing. Push yourself, because no one else is going to do it for you.,Its going to be hard, but hard does not mean impossible.The only way to do great work is to love what you do.Learning never exhausts the mind.The only way to do great work is to love what you do,Learning never exhausts the mind.The only way to do great work is to love what you do.Learning never exhausts the mind.The only way to do great work is to love what you do`,
    `Narendra Damodardas Modi is the 15th Prime Minister of India and assumed office in May 2014. He was re-elected in the 17th Lok Sabha from Varanasi and led the Bhartiya Janata Party to a massive victory for a second term during 2019 Lok Sabha elections Before his role as the prime minister, he served as the Chief Minister of Gujarat from 2001 to 2014. He has been an active member of the Rashtriya Swayamsevak Sangh in the past. Since coming to power, Modi has single-handedly made BJP the most powerful party in the country with power in most of the state. On July 20, he survived a no-confidence motion brought against his government by the TDP with a thumping margin. Narendra Modi is one of the most followed names on social media platforms like Facebook and Twitter. Modi's rise in the BJP has been phenomenal. Ensuring three consecutive election victories for the party in Gujarat, Modi launched himself on to the national stage. Despite stiff opposition from party patriarch LK Advani, Modi was declared the prime ministerial candidate for Lok Sabha elections in 2014. However, his elevation for the top post exposed internal difference in the party. Riding on his wave, the BJP decimated the Congress-led UPA in 2014.`,
    `to the top constitutes hours of. If his orthodoxy is compact and aesthetically pleasing. Push yourself, because no one else is going to do it for you.,Its going to be hard, but hard does not mean impossible.The only way to do great work is to love what you do.Learning never exhausts the mind.The only way to do great work is to love what you do,Learning never exhausts the mind.The only way to do great work is to love what you do.Learning never exhausts the mind.The only way to do great work is to love what you do`,
];

// selecting required elements
let timer_text = document.querySelector(".curr_time");
let accuracy_text = document.querySelector(".curr_accuracy");
let error_text = document.querySelector(".curr_errors");
let neterror_text = document.querySelector(".curr_neterrors")
let cpm_text = document.querySelector(".curr_cpm");
let wpm_text = document.querySelector(".curr_wpm");
let quote_text = document.querySelector(".quote");
let input_area = document.querySelector(".input_area");
let restart_btn = document.querySelector(".restart_btn");
let cpm_group = document.querySelector(".cpm");
let wpm_group = document.querySelector(".wpm");
let error_group = document.querySelector(".errors");
let neterror_group = document.querySelector(".neterrors");
let accuracy_group = document.querySelector(".accuracy");


let cursorColorPickerBox = document.getElementById('cursorColorPickerBox');
let correctCharColor = document.getElementById('correctCharColor')
let inCorrectCharColor = document.getElementById('inCorrectCharColor')

let list = document.getElementById("myList");


inCorrectCharColor.addEventListener('focusout', () => {
    var x = inCorrectCharColor.value;
    document.body.style.setProperty('--main-colorIncorrectChars', x)
});


cursorColorPickerBox.addEventListener('focusout', () => {
    var x = cursorColorPickerBox.value;
    document.body.style.setProperty('--main-colorCursor', x)
});


correctCharColor.addEventListener('focusout', () => {
    var x = correctCharColor.value;
    document.body.style.setProperty('--main-colorCorrectChars', x)
});


let timeLeft = TIME_LIMIT;
let timeElapsed = 0;
let total_errors = 0;
let initialIncorrectChars = 0;
let accuracy = 0;
let characterTyped = 0;
let current_quote = "";
let quoteNo = 0;
let timer = null;

let totalErrors = 0;
let initialCorrectChars = 0;
let olderror = 0;
let oldcorrect = 0;
let totalCorrects = 0;

let wpm = 0;
let cpm = 0;
var cursorLocation = 0;
var prevneterrors = 0;



function restartbtn() {

    finishGame();
    onLoad();
    focusevent();

    var node = document.getElementById("myErrorTable");
    while (node.hasChildNodes()) {
        node.removeChild(node.lastChild);
    }

    var node2 = document.getElementById('myCorrectTable')
    while (node2.hasChildNodes()) {
        node2.removeChild(node.lastChild);
    }

}

restart_btn.addEventListener('click', restartbtn);

function updateQuote() {
    let randomQuote = Math.floor(Math.random() * quotes_array.length);
    quote_text.textContent = null;
    current_quote = quotes_array[randomQuote];

    // separate each character and make an element 
    // out of each of them to individually style them
    current_quote.split('').forEach(char => {
        const charSpan = document.createElement('span')
        charSpan.innerText = char
        quote_text.appendChild(charSpan)
    });


    // roll over to the first quote
    if (quoteNo < quotes_array.length - 1)
        quoteNo++;
    else
        quoteNo = 0;
}


function onLoad() {
    resetValues();
    updateQuote();
    // console.log("Cursor is at :  " + (cursorLocation) + " And value is :  " + quote_text.textContent[cursorLocation])
    processCurrentText();
    document.getElementById('errorTable').style.display = "none"
    document.getElementById('correctTable').style.display = "none"
}

window.onload = onLoad;


var focusevent = function () {
    input_area.addEventListener('keypress', once);
    input_area.focus();
    // quote_text.removeEventListener('click', focusevent);
}

var once = function () {
    input_area.addEventListener('input', processCurrentText)
    input_area.removeEventListener('keypress', once);
    // input_area.addEventListener('keydown', countBackSpace);
    startGame();
}
quote_text.addEventListener('click', focusevent);




var totalBackSpaces = 0;

function countBackSpace(event) {
    var key = event.keyCode;
    if (key == 8) {
        if (curr_input.length > 0) {
            totalBackSpaces++;
            console.log("Backspace pressed  :  " + totalBackSpaces)

        }
    }
}


let time1;
var lim = 75;
var scr = 20;

function processCurrentText() {

    quote_text.focus();
    cursorLocation = input_area.selectionStart;

    if (cursorLocation > lim) {
        quote_text.scroll(0, scr)
        scr = scr + 45;
        lim = lim + 75;
    }


    // console.log("Cursor is at :  " + (cursorLocation) + " And value is :  " + quote_text.textContent[cursorLocation])
    // quote_text.style.color = "blue"

    time1 = new Date();

    // get current input text and split it
    curr_input = input_area.value;
    curr_input_array = curr_input.split('');

    characterTyped++;

    initialIncorrectChars = 0;
    initialCorrectChars = 0;

    quoteSpanArray = quote_text.querySelectorAll('span');

    quoteSpanArray.forEach((char, index) => {
        let typedChar = curr_input_array[index]


        var cbCursor = document.getElementById('cursorCheckBox')

        if (cbCursor.checked == true) {
            if (char == quoteSpanArray[cursorLocation]) {
                char.classList.add('nextChar');
            } else {
                char.classList.remove('nextChar')
            }
        } else {
            char.classList.remove('nextChar')
        }

        if (typedChar == null) {
            char.classList.remove('correct_char');
            char.classList.remove('incorrect_char');

            // correct characters
        } else if (typedChar === char.innerText) {
            char.classList.add('correct_char_array')
            char.classList.add('correct_char');
            char.classList.remove('incorrect_char');

            // incorrect characters
        } else {
            char.classList.add('incorrect_char_array')

            char.classList.add('incorrect_char');
            char.classList.remove('correct_char');
        }

        initialIncorrectChars = document.getElementsByClassName('incorrect_char').length;
        initialCorrectChars = document.getElementsByClassName('correct_char').length;


        if (initialCorrectChars > oldcorrect) {
            totalCorrects++;
        }
        oldcorrect = initialCorrectChars;

        if (initialIncorrectChars > olderror) {
            totalErrors++;
        }
        olderror = initialIncorrectChars;

        characterTyped = totalErrors + totalCorrects;

    });

    // console.log("Total incorrect chars Array Length : " + document.getElementsByClassName('incorrect_char_array').length)
    // var x = document.getElementsByClassName('correct_char');
    // for (var i = 0; i < x.length; i++) {
    //     console.log(x[i].innerHTML)
    // }

    cpm = Math.round(((initialCorrectChars / timeElapsed) * 60));
    wpm = Math.round((((initialCorrectChars / 5) / timeElapsed) * 60));

    // update cpm and wpm text
    if (cpm == Infinity) {
        cpm_text.textContent = Math.floor(Math.random() * (1200 - 800) + 800);
    } else {
        cpm_text.textContent = cpm;
    }

    if (wpm == Infinity) {
        wpm_text.textContent = Math.floor(Math.random() * (170 - 120) + 120)
        // wpm_text.textContent = "";
    } else {
        wpm_text.textContent = wpm;
    }

    neterror_text.textContent = totalErrors;

    // display the number of errors
    error_text.textContent = total_errors + initialIncorrectChars;

    // update accuracy text
    let accuracyVal = ((totalCorrects / characterTyped) * 100);
    accuracy_text.textContent = Math.round(accuracyVal);

    // if current text is completely typed
    // irrespective of errors
    if (curr_input.length == current_quote.length) {
        updateQuote();

        // update total errors
        total_errors += initialIncorrectChars;

        input_area.value = "";
    }

    var timer2 = setInterval(() => {
        help(time1);
    }, 1);

    if (wpm_text.textContent == "NaN" || cpm_text.textContent == "NaN" || accuracy_text.textContent == "NaN") {
        wpm_text.textContent = "0";
        cpm_text.textContent = "0";
        accuracy_text.textContent = "0";
    }
}

function help(time1) {
    var time2 = new Date();
    var elTime = time2.getSeconds() - time1.getSeconds();
    if (elTime > 1) {
        processCurrentText();
    }
}

function updateTimer() {
    if (timeLeft > 0) {
        timeLeft--;
        timeElapsed++;
        // update the timer text
        timer_text.textContent = timeLeft + "s";
    } else {
        // finish the game
        finishGame();
    }
}

function finishGame() {
    var x = document.getElementsByClassName('incorrect_char_array')
    var y = document.getElementsByClassName('correct_char_array')

    // for(var i = 0; i< y.length; i++){
    //     console.log(y[i].innerHTML);
    // }


    var arIncorrect = [];
    var arCorrect = [];

    for (var i = 0; i < x.length; i++) {
        // console.log(x[i].innerText)
        arIncorrect.push(x[i].innerText)
    }

    for (var i = 0; i < y.length; i++) {
        arCorrect.push(y[i].innerText)
    }

    arIncorrect = arIncorrect.join("");
    arCorrect = arCorrect.join("");
    console.log("Correct String :  " + arCorrect)

    var letterToCheck = _.uniq(current_quote).join('');

    var occurencesIncorrect = [];
    var occurencesCorrect = [];

    for (var i = 0; i < letterToCheck.length; i++) {
        occurencesIncorrect.push(countString(arIncorrect, letterToCheck[i]))
        // console.log(`The total occurences of ${letterToCheck[i]} is `,countString(ar,letterToCheck[i]))
    }
    // console.log("\nthe num is : " + nums)
    for (var i = 0; i < letterToCheck.length; i++) {
        occurencesCorrect.push(countString(arCorrect, letterToCheck[i]))
    }
    console.log("Unique : " + letterToCheck)
    console.log("OCCURENCES : " + occurencesCorrect)

    console.log("\n")

    var mapIncorrect = new Map();
    var mapCorrect = new Map();

    for (var i = 0; i < letterToCheck.length; i++) {
        // console.log(`The total occurences of ${letterToCheck[i]} is : ${nums[i]}`)
        // map.set(letterToCheck[i],`${occurences[i]}`)
        mapIncorrect.set(letterToCheck[i], occurencesIncorrect[i])
        mapCorrect.set(letterToCheck[i], occurencesCorrect[i])
    }

    // for( let [key, value] of mapCorrect){
    //     console.log (key + " = " + value);
    // }



    const mapErrorTable = new Map([...mapIncorrect.entries()].sort((a, b) => b[1] - a[1]));
    const mapCorrectTable = new Map([...mapCorrect.entries()].sort((a, b) => b[1] - a[1]));

    // console.log(mapCorrectTable);



    buildTable(mapErrorTable);
    buildTable2(mapCorrectTable);

    // stop the timer
    clearInterval(timer);
    input_area.disabled = true;

    cpm = Math.round(((totalCorrects / timeElapsed) * 60));
    wpm = Math.round((((totalCorrects / 5) / timeElapsed) * 60));

    cpm_text.textContent = cpm;
    wpm_text.textContent = wpm;

    var elemTable = document.getElementById("errorTable")
    elemTable.scrollIntoView();

}

function buildTable(data) {

    document.getElementById('errorTable').style.display = "block"
    var tableCorrect = document.getElementById('myErrorTable');


    for (let [key, value] of data) {
        if (key == " ") {
            var row = `<tr>
                            <td>BackSpace</td>
                            <td>${value}</td>
                    </tr>`
            tableCorrect.innerHTML += row
        } else {
            var row = `<tr>
                            <td>${key}</td>
                            <td>${value}</td>
                    </tr>`
            tableCorrect.innerHTML += row
        }

    }
}



function buildTable2(data) {

    document.getElementById('correctTable').style.display = "block"
    var tableCorrect = document.getElementById('myCorrectTable');


    for (let [key, value] of data) {
        if (key == " ") {
            var row = `<tr>
                            <td>BackSpace</td>
                            <td>${value}</td>
                    </tr>`
            tableCorrect.innerHTML += row
        } else {
            var row = `<tr>
                            <td>${key}</td>
                            <td>${value}</td>
                    </tr>`
            tableCorrect.innerHTML += row
        }

    }
}

function countString(str, letter) {
    let count = 0;

    // looping through the items
    for (let i = 0; i < str.length; i++) {

        // check if the character is at that position
        if (str.charAt(i) == letter) {
            count += 1;
        }
    }
    return count;
}

function startGame() {
    // clear old and start a new timer
    clearInterval(timer);
    timer = setInterval(updateTimer, 1000);
}

function resetValues() {

    timeLeft = TIME_LIMIT;
    timeElapsed = 0;
    errors = 0;
    total_errors = 0;
    neterrors = 0;
    accuracy = 0;
    characterTyped = 0;
    quoteNo = 0;
    totalErrors = 0;
    wpm = 0;
    cpm = 0;
    totalCorrects = 0;
    totalBackSpaces = 0;

    initialCorrectChars = 0;
    olderror = 0;
    oldcorrect = 0;

    cursorLocation = 0;

    input_area.disabled = false;

    input_area.value = "";
    quote_text.textContent = 'Click on the area below to start the test.';
    accuracy_text.textContent = 100;
    timer_text.textContent = timeLeft + 's';
    neterror_text.textContent = 0;
    error_text.textContent = 0;
    cpm_text.textContent = "0";
    wpm_text.textContent = "0";





    var x = document.getElementsByClassName('incorrect_char_array');
    while (x.length > 0) {
        elements[0].remove();
    }

    var y = document.getElementsByClassName('correct_char_array');
    while (y.length > 0) {
        elements[0].remove();
    }

}