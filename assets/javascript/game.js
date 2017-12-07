// making the wordbank
var wordBank = ["Space Mountain", "Big Thunder Mountain Railroad", "Splash Mountain", "The Peoplemover", "Journey Into Imagination", "Mission: Space", "Frozen Ever After", "Avatar Flight of Passage", "Expedition: Everest", "The Twilight Zone Tower of Terror", "Toy Story Midway Mania", "Dinosaur", "Countdown to Extinction", "Test Track", "The Living Seas", "Spaceship Earth", "Reflections of China", "Jungle Cruise", "Illuminations: Reflections of Earth", "Rock 'n' Roller Coaster: Starring Aerosmith", "Rivers of Light", "Happily Ever After", "The American Adventure", "The Many Adventures of Winnie the Pooh", "The Enchanted Tiki Room", "Ellen's Energy Adventure", "The Universe of Energy", "World of Motion", "Horizons", "Fantasmic!", "Food Rocks", "Soarin'", "Soarin' Around the World", "The Great Movie Ride", "The Haunted Mansion", "If You Had Wings", "It's Tough to be a Bug!", "Kilimanjaro Safaris", "Kali River Rapids", "Lights, Motors, Action! Extreme Stunt Show", "Festival of the Lion King", "Peter Pan's Flight", "Tapestry of Nations", "Festival of Fantasy", "Dream Along With Mickey", "Under the Sea - Journey of the Little Mermaid"];


//making our base variables
var numLives;
var numPoints;
var lettersGuessed = [];
var gameOn = false;
var jWordContent = [];
var jWordContentCombine;
var selectedWord = "placeholder";
var selectedWordChar;
var correctAnswer = 0;
var wordBankIndex;

//link spans to new vars in our js file
var wordContent = document.getElementById("word-actual");
var lives = document.getElementById("lives");
var points = document.getElementById("points");
var letters = document.getElementById("letters");
var correctWord = document.getElementById("correct-word");
var finalScore = document.getElementById("final-score");
var gameContent = document.getElementById("game-content");
var buttonStart = document.getElementById("buttondiv");
var correctChoice = document.getElementById("correct-choice");
var endgame = document.getElementById("endgame");

//how we choose a new word
function newWord() {
    //Make sure Next Word Button is not there
    wordBankIndex = Math.floor(Math.random() * wordBank.length);
    selectedWord = wordBank[wordBankIndex];
    wordBank.splice(wordBankIndex, 1);
    console.log(selectedWord + " " + selectedWord.length);
    jWordContent = [];
    for (var i = 0; i < selectedWord.length; i++) {
        if (selectedWord.charAt(i) == " ") {
            jWordContent.push(" ");
        }
        else if (selectedWord.charAt(i) == ":") {
            jWordContent.push(":");
        }
        else if (selectedWord.charAt(i) == "-") {
            jWordContent.push("-");
        }
        else if (selectedWord.charAt(i) == "'") {
            jWordContent.push("'");
        }
        else if (selectedWord.charAt(i) == "!") {
            jWordContent.push("!");
        }
        else if (selectedWord.charAt(i) == ",") {
            jWordContent.push(",");
        }
        else {
            jWordContent.push("_");
        }
    }
    console.log(jWordContent);
    lettersGuessed = [];
    jWordContentCombine = jWordContent.join();
    jWordContentCombine = jWordContentCombine.replace(/,/g, "");
    wordContent.textContent = jWordContentCombine;
    letters.textContent = lettersGuessed;
    console.log(selectedWord);
    console.log(jWordContent);
};

// how we reset the game
function resetGame() {
    gameContent.className = "show";
    buttonStart.className = "hide";
    endgame.className = "hide";
    numLives = 15;
    numPoints = 0;
    lives.textContent = numLives;
    points.textContent = numPoints;
    gameOn = false;
    newWord();
    
};



//this is our actual game once everything has been reset
// i
//when a key is pressed
document.onkeyup = function (event) {
    //run through each letter in the letter array

    var userChoice = event.key.toLowerCase();
    
    //check if the letter they pressed is correct
    if (userChoice == "a" || userChoice == "b" || userChoice == "c" || userChoice == "d" || userChoice == "e" || userChoice == "f" || userChoice == "g" || userChoice == "h" || userChoice == "i" || userChoice == "j" || userChoice == "k" || userChoice == "l" || userChoice == "m" || userChoice == "n" || userChoice == "o" || userChoice == "p" || userChoice == "q" || userChoice == "r" || userChoice == "s" || userChoice == "t" || userChoice == "u" || userChoice == "v" || userChoice == "w" || userChoice == "x" || userChoice == "y" || userChoice == "z") {
        if (lettersGuessed.indexOf(" " + userChoice.toUpperCase()) == -1) {
            //see if the letter is in the word
            for (i = 0; i < selectedWord.length; i++) {

                //if the letter is in the word
                selectedWordChar = selectedWord.charAt(i).toLowerCase();
                if (userChoice == selectedWordChar) {
                    jWordContent.splice(i, 1, selectedWord.charAt(i));
                    jWordContentCombine = jWordContent.join();
                    jWordContentCombine = jWordContentCombine.replace(/,/g, "");
                    wordContent.textContent = jWordContentCombine;
                    console.log(jWordContentCombine);
                    correctAnswer += 100;
                }
                else {
                    correctAnswer--;
                }
            }

            //lose a life if you gave me the wrong letter
            if (correctAnswer > 0) {
                lettersGuessed.push(" " + userChoice.toUpperCase());
                letters.textContent = lettersGuessed;
                correctAnswer = 0;
            }
            else if (correctAnswer < 0) {
                numLives--;
                lives.textContent = numLives;
                lettersGuessed.push(" " + userChoice.toUpperCase());
                letters.textContent = lettersGuessed;
                correctAnswer = 0;
            }
            if (selectedWord == jWordContentCombine) {
                numPoints ++;
                points.textContent = numPoints;
                lives.textContent = numLives;
                correctWord.textContent = selectedWord;
                correctChoice.className = "show";
                newWord();
            }
            if (numLives == 0) {
                gameContent.className = "hide";
                finalScore.textContent = numPoints;
                buttonStart.className = "show";
                endgame.className = "show";
            }
        
        }
    }
    
};

