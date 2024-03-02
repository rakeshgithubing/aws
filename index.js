let quoteDisplayEl = document.getElementById("quoteDisplay");
let timerEl = document.getElementById("timer");
let textareaEl = document.getElementById("quoteInput");
let resultEl = document.getElementById("result");

let submitBtnEl = document.getElementById("submitBtn");
let resetBtnEl = document.getElementById("resetBtn");
let spinnerEl = document.getElementById("spinner");


let count = 0;
let uniqueId = null;

function intervalCall() {
    uniqueId = setInterval(function() {
        count = count + 1;
        timerEl.textContent = count;
    }, 1000);
}

intervalCall();

let url = "https://apis.ccbp.in/random-quote";
let options = {
    method: "GET"
};
fetch(url, options)
    .then(function(response) {
        return response.json();
    })
    .then(function(data) {
        quoteDisplayEl.textContent = data.content;
    });


resetBtnEl.addEventListener("click", function() {
    count = 0;
    timerEl.textContent = count;
    clearInterval(uniqueId);
    intervalCall();
    spinnerEl.classList.add("d-none");
    spinnerEl.classList.remove("d-none");
    let url = "https://apis.ccbp.in/random-quote";
    let options = {
        method: "GET"
    };
    fetch(url, options)
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            quoteDisplayEl.textContent = data.content;
            spinnerEl.classList.toggle("d-none");
        });
    resultEl.textContent = "";
    textareaEl.value = "";
});


submitBtnEl.addEventListener("click", function() {
    if (quoteDisplayEl.textContent === textareaEl.value) {
        clearInterval(uniqueId);
        resultEl.textContent = "You typed in " + count + " seconds";

    } else {
        resultEl.textContent = "You typed incorrect sentence";
    }
});
