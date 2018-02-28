function generateWinningNumber() {
  return Math.floor(Math.random() * 100) + 1;
}

//https://bost.ocks.org/mike/shuffle/
function shuffle(array) {
  let m = array.length, t, i;
  // While there remain elements to shuffle…
  while (m) {
    // Pick a remaining element…
    i = Math.floor(Math.random() * m--);
    // And swap it with the current element.
    t = array[m];
    array[m] = array[i];
    array[i] = t;
  }
  return array;
}

function Game() {
  this.playersGuess = null;
  this.pastGuesses = [];
  this.winningNumber = generateWinningNumber();
}

Game.prototype.difference = function () {
  return Math.abs(this.winningNumber - this.playersGuess);
}

Game.prototype.isLower = function () {
  return this.winningNumber > this.playersGuess;
}

Game.prototype.playersGuessSubmission = function (num) {
  if (num < 1 || num > 100 || typeof num !== 'number' || isNaN(num)) {
    $('#players-input').val('');
    $('#result').text('That is an invalid guess.');
    $('#subresult').text('Enter a valid guess!')
    throw 'That is an invalid guess. Enter a valid guess!';
  }

  this.playersGuess = num;
  return this.checkGuess();
}

function makeAGuess(game) {
  let guess = $('#players-input').val();
  let output = game.playersGuessSubmission(Number(guess));

  $('#players-input').val('');
  $('#result').text(output);
  console.log(output);
}

Game.prototype.checkGuess = function () {
  if (this.playersGuess === this.winningNumber) {
    $('#hint-btn, #submit-btn').prop('disabled', true);
    $('#subresult').text('Click the Reset button to play again!');
    return `You Win! Winning number is ${this.winningNumber}`;
  } else {
    if (this.pastGuesses.indexOf(this.playersGuess) > -1) {
      return 'You have already guessed that number.';
    } else {
      this.pastGuesses.push(this.playersGuess);
      $('#guesses li:nth-child(' + this.pastGuesses.length + ')').text(this.playersGuess);

      if (this.pastGuesses.length === 5) {
        $('#submit-btn, #hint-btn').prop('disabled', true);
        $('#subresult').text('Click the Reset button to play again!');

        return `You Lose! Winning number is ${this.winningNumber}`;
      } else {
        if (this.isLower()) {
          $('#subresult').text('Guess Higher!');
        } else {
          $('#subresult').text('Guess Lower!');
        }

        if (this.difference() < 10) {
          return "You're burning up!";
        } else if (this.difference() < 25) {
          return "You're lukewarm.";
        } else if (this.difference() < 50) {
          return "You're a bit chilly.";
        } else {
          return "You're ice cold!";
        }
      }
    }
  }
}

Game.prototype.provideHint = function () {
  let hintArray = [this.winningNumber, generateWinningNumber(), generateWinningNumber()];

  return shuffle(hintArray);
}

function newGame() {
  return new Game();
}

function makeAGuess(game) {
  let guess = $('#players-input').val();
  let output = game.playersGuessSubmission(Number(guess));

  $('#players-input').val('');
  $('#result').text(output);
}

$(document).ready(() => {
  let game = new Game();

  $('#submit-btn').click(function () {
    makeAGuess(game);
  });

  $('#players-input').keypress(function (event) {
    // enter key has keyCode of 13
    if (event.which === 13) {
      makeAGuess(game);
    }
  });

  $('#hint-btn').click(function () {
    let hints = game.provideHint();
    $('#result').text('Winning umber is...')
    $('#subresult').text(hints[0] + ', ' + hints[1] + ' or ' + hints[2]);
  });

  $('#reset-btn').click(function () {
    game = newGame();

    $('#result').text('Are you Ready?');
    $('#subresult').text('Enter a valid guess!')
    $('.guess').text('-');
    $('#hint-btn, #submit-btn').prop('disabled', false);
  });
})
