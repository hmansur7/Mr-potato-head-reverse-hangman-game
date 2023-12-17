const words = ["woody", "lenny", "sarge", "robot"];

var correctWord = words[Math.floor(Math.random() * words.length)];
var hiddenWord = Array(correctWord.length).fill("_");
var wrongAttempts = 0;
var maxWrongAttempts = 5;
var guessedLetters = [];
const imageUrls = ["images/no body.png", "images/body.png", "images/eyes.png", "images/nose.png", "images/mouth.png", "images/hat.png"];
var stage = 0;

function checkGuess() {

    var guess = document.getElementById("input").value.toLowerCase();
    
    if (!/[a-zA-Z]/.test(guess)) {
        alert("Please enter a letter");
        return;
    }
    
    if (guessedLetters.includes(guess)) {
        alert("You have already guessed this letter");
        return;
    }

    if (correctWord.includes(guess)) {
        for (let i = 0; i < correctWord.length; i++) {
                if (correctWord[i] == guess) {
                    hiddenWord[i] = guess;
                    stage++;
                }
        }
    } else {wrongAttempts++;} 

    guessedLetters.push(guess);
    updateStats()
    $("#input").val("");
    
    if (maxWrongAttempts === wrongAttempts){
        setTimeout(function() {
            alert("You Lose!");
            reset();
        }, 2000);
    }

    if (!hiddenWord.includes("_")) {
        setTimeout(function() {
            alert("You Win!");
            reset();
        }, 2000);
      }

}

function updateStats() {
    $("#hiddenWord").text("Your word is a Toy Story character: " + hiddenWord.join(" "));
    $("#attempts").text("Your chances: " + String(maxWrongAttempts - wrongAttempts));
    $("#guessed").text("Already guessed: " + guessedLetters.join(", "));
    $("#stage").attr("src", imageUrls[stage]);
}

function onEnter(event) {
    if (event.key === "Enter") {
        checkGuess();
    }
}

function reset() {
    correctWord = words[Math.floor(Math.random() * words.length)];
    hiddenWord = Array(correctWord.length).fill("_");
    wrongAttempts = 0;
    maxWrongAttempts = 5;
    guessedLetters = [];
    stage = 0;
    updateStats();
    $("#hiddenWord").hide();
    $("#attempts").hide();
    $("#guessed").hide();
    $("#stage").attr("src", imageUrls[stage]);
    $("#input").val("");
    $("#startButton, #rules").show();
    $("#input, #instructions, #testing, #giveup, #reveal").hide();
}

$(document).ready(function() {
    $("#input, #instructions, #testing, #giveup, #reveal").hide();
    $("#startButton, #rules").show();
    $("#stage").on("mouseenter", function () {
        $("#stage").animate({
            width: "80vw", // Adjust the width to fill the full viewport width
            height: "80vh", // Adjust the height to fill the full viewport height
            top: "0",
            left: "0",
        }, "slow");
    });

    $("#shrink").on("mouseenter", function () {
        $("#shrink").animate({
            width: "4.5vw", // Adjust the width to fill the full viewport width
            height: "3.5vh", // Adjust the height to fill the full viewport height
        }, "fast");
    });

    $("#shrink").on("mouseleave", function () {
        $("#shrink").animate({
            width: "4vw", // Adjust the width to fill the full viewport width
            height: "3vh", // Adjust the height to fill the full viewport height
        }, "fast");
    });
    
    $("#shrink").on("click", function () {
        $("#stage").animate({
            width: "30vw", // Revert to original width
            height: "30vh", // Revert to original height
            top: "auto",
            left: "auto",
        }, "slow");
        $("#shrink").animate({
            width: "5vw", // Adjust the width to fill the full viewport width
            height: "3vh", // Adjust the height to fill the full viewport height
            top: "auto",
            left: "auto",
        }, "slow");

    });

    $("#startButton").click(function () {
        $("#rules, #startButton").hide();
        updateStats()
        $("#input, #instructions, #testing, #giveup").show();
        $("#hiddenWord").show();
        $("#attempts").show();
        $("#guessed").show();
        $("#giveup").click(function () {
            $("#reveal").text("Your word is: " + correctWord);
            $("#reveal").show();
        });
    });
        
    $("#downloadButton").click(function () {
        var link = document.createElement("a");
        link.href = document.getElementById("stage").src;
        link.download = "PO-TAE-TOH.png";
        link.click();
    });

});
  
  

