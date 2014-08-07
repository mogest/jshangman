function Game(dictionary) {
  this.targetWord = dictionary.selectRandomWord();
  this.targetLetters = this.targetWord.split("");
  this.guesses = [];
  this.wrongGuessesAllowed = 8;
}

Game.prototype.submitGuess = function(guess) {
  this.guesses.push(guess);
};

Game.prototype.wrongGuesses = function() {
  return this.guesses.filter(function(guess) {
    return this.targetWord.indexOf(guess) == -1;
  }, this);
};

Game.prototype.guessesRemaining = function() {
  return this.wrongGuessesAllowed - this.wrongGuesses().length;
};

Game.prototype.hasLetterBeenGuessed = function(letter) {
  return this.guesses.indexOf(letter) >= 0;
};

Game.prototype.guessedTargetLetters = function() {
  return this.targetLetters.filter(function(letter) {
    return this.hasLetterBeenGuessed(letter);
  }, this);
};

Game.prototype.hasPlayerWon = function() {
  return this.guessedTargetLetters().length == this.targetLetters.length;
};

Game.prototype.hasPlayerLost = function() {
  return this.guessesRemaining() < 0;
};

Game.prototype.getGuessedTargetLetters = function() {
  return this.targetLetters.map(function(letter) {
    return this.hasLetterBeenGuessed(letter) ? letter : null;
  }, this);
};
