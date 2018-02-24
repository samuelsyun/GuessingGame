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
  if (num < 1 || num > 100 || typeof num !== 'number') {
    throw 'That is an invalid guess.';
  }

  this.playersGuess = num

  return this.checkGuess();
}

Game.prototype.checkGuess = function () {
  if (this.playersGuess === this.winningNumber) {
    return 'You Win!';
  } else {
    if (this.pastGuesses.indexOf(this.playersGuess) > -1) {
      return 'You have already guessed that number.';
    } else {
      this.pastGuesses.push(this.playersGuess);

      if (this.pastGuesses.length >= 5) {
        return 'You Lose.';
      } else {
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
