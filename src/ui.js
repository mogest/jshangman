$(function() {
  var guessInputElement = $("input");
  var game = new Game(Dictionary);

  var guessedLetterDisplay = function() {
    return game.getGuessedTargetLetters().map(function(letter) {
      return letter || "_"; 
    }).join(" ");
  };

  var render = function() {
    $("#guess-display").text(guessedLetterDisplay());

    var remaining = game.guessesRemaining();
    if (game.hasPlayerWon()) {
      $("#status").text("Woohoo, you got it!");
      $("form").hide();
    }
    else if (remaining < 0) {
      $("#status").text("Sorry, you lost :(  The word was " + game.targetWord + ".");
      $("form").hide();
    }
    else {
      $("#status").text(remaining + " bad guess" + (remaining == 1 ? "" : "es") + " remaining");
    }

    if (game.guesses.length) {
      $("#guesses").text("Your guesses: " + game.guesses.join(", "));
    }
  };

  $("form").submit(function(event) {
    event.preventDefault();

    var guess = guessInputElement.val();
    game.submitGuess(guess);

    render();
    guessInputElement.val("");
  });

  render();
});
