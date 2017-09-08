var wordBank = ["Darth Vader", "Leia Organa", "Luke Skywalker", "Han Solo", "Chewbacca", "Boba Fett", "Lando Calrissian", "Admiral Akbar"];



//would like to eventually use this to update html with a corresponding quote on win
var quotes = {
  "Darth Vader" : "I find your lack of faith disturbing.",
  "Leia Organa" : "Aren’t you a little short for a stormtrooper?",
  "Luke Skywalker" : "I'm Luke Skywalker and I'm here to rescue you!",
  "Han Solo" : "Great, kid. Don't get cocky.",
  "Chewbacca" : "GGGWARRRHHWWWW!",
  "Boba Fett" : "As you wish. ",
  "Lando Calrissian" : "Why, you slimy, double-crossing, no-good swindler.",
  "Admiral Akbar" : "It's a trap!!"
};


// quotes[wordBank[2]]


var winCount = 0;
var loseCount = 0;
var guessCount= 8;
var curGuess = "";
var guessedLetters = [];
var curWord = "";
var hiddenWord = [];
var prevWord = "";


//Function that picks a random word without repeating the same one twice in a row -- ideally I'd like to write it so it wouldn't repeat any of the words from wordBank until they had all been played
function wordPicker(){
  curWord = wordBank[Math.floor(Math.random()*wordBank.length)];
  if(curWord === prevWord){
    for(;curWord === prevWord;){
      curWord = wordBank[Math.floor(Math.random()*wordBank.length)];
    }
  }
  prevWord = curWord;
}


//function that converts the curWord into a string of underscores and spaces to display to the page
function wordConverter(str){
  str = str.split("");
  console.log(str);
  str.forEach(function(x){
    if(x === " "){
      hiddenWord.push("&nbsp");
    }
    else {
      hiddenWord.push("_");
    }
  });
  return hiddenWord.join(" ");
}
// console.log(curWord)
//curWord is now a string
//hiddenWord is now an array




//need a way to update the html after a guess, replacing underscores with the letter
//take the curWord and split it into an array and compare the guessed letter with each letter of the array(using toLowerCase), if they're equal, reassign index of the hiddenArray to equal guess
function checkGuess(guess){
  guess = guess.toLowerCase();
  var checkThis = curWord.toLowerCase().split("");
  if(checkThis.indexOf(guess) ===-1){
    if(guessedLetters.indexOf(guess) === -1){
      guessedLetters.push(guess);
      guessCount--;
    }
      document.getElementById('guessed').innerHTML = guessedLetters.join(" ");
      document.getElementById('guesses').innerHTML = guessCount;
      checkWin();
    } else {
  for(var i = 0; i<checkThis.length; i++){
    if(guess === checkThis[i]){
      hiddenWord[i] = curWord.split("")[i];
      document.getElementById('word-field').innerHTML = hiddenWord.join(" ");
      checkWin();
    } 
  }
 } //this funct got a little out of hand.. should probs be broken down into smaller functs
}



// to check for win see if hiddenWord and curWord have become equal
// or if chances or depleted, update win variable and html

function checkWin(){
  console.log(hiddenWord.join('').replace("&nbsp", " "), curWord);
  if(hiddenWord.join('').replace("&nbsp", " ") === curWord){
    winCount++;
    document.getElementById('wins').innerHTML = winCount;
    return true;
  }
  else {
    return false;
  }
}

//check if guesses are spent
//update lose variable and html
function checkLose(){
  if(guessCount === 0){
    loseCount++;
    document.getElementById('loses').innerHTML = loseCount; 
    return true;
  }
  else{
    return false;
  }
}



function gameReset(){
  console.log(checkLose(), checkWin());
  if(checkLose()||checkWin()){
    guessCount= 8;
    curGuess = "";
    guessedLetters = [];
    curWord = "";
    hiddenWord = [];
    gameOn();
  }

}




//setup game function
function gameOn(){
  wordPicker();
  //update the word-field with hiddenWord
  document.getElementById('word-field').innerHTML = wordConverter(curWord);
  document.getElementById('guessed').innerHTML = guessedLetters;
}



//update curGuess variable excluding non-alphabetic characters
//run curGuess through guess check funtion
document.onkeyup = function(event){
  if(event.keyCode >= 65 && event.keyCode  <= 90){
  curGuess = event.key;
  console.log(curGuess);
  checkGuess(curGuess);
  gameReset();
}
 
};
  

gameOn();
console.log(curWord);
console.log(hiddenWord);






// checkGuess("l");








// checkWin();



  // function updater(){
  //     document.getElementById("wins").innerHTML = winCount;
  //     document.getElementById("loses").innerHTML = loseCount;
  //     document.getElementById("guesses").innerHTML = guessCount;
  //   }
  //   document.onkeypress(updater());
