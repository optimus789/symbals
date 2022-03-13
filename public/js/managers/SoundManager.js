
var Phaser = Phaser || {};
var Symbals = Symbals || {};

Symbals.SoundManager = function() {
  "use strict";
  Object.call(this);
  this.soundMenu = game.add.audio("sound-menu", 1, true);
  this.soundWin = game.add.audio("sound-win");
  this.soundRight = game.add.audio("sound-right");
  this.soundNextLevel = game.add.audio("sound-nextlevel");
  this.soundGameOver = game.add.audio("sound-gameover");
  this.soundError = game.add.audio("sound-error");
  this.soundStartLevel = game.add.audio("sound-startlevel");
};

Symbals.SoundManager.prototype = Object.create(Object.prototype);
Symbals.SoundManager.prototype.constructor = Symbals.SoundManager;

Symbals.SoundManager.prototype.playSound = function(key) {
  try {
    this[key].play();
  } catch (e) {}
}

Symbals.SoundManager.prototype.playSoundMenu = function() {
  if(!this.soundMenu.isPlaying) {
    this.soundMenu.play();
  }
}

Symbals.SoundManager.prototype.stopSoundMenu = function() {
  this.soundMenu.stop();
}

Symbals.SoundManager.prototype.playSoundWin = function() {
  this.playSound('soundWin');
}

Symbals.SoundManager.prototype.playSoundRight = function() {
  this.playSound('soundRight');
}

Symbals.SoundManager.prototype.playSoundNextLevel = function() {
  this.playSound('soundNextLevel');
}

Symbals.SoundManager.prototype.playSoundGameOver = function() {
  this.playSound('soundGameOver');
}

Symbals.SoundManager.prototype.playSoundError = function() {
  this.playSound('soundError');
}

Symbals.SoundManager.prototype.playSoundStartLevel = function() {
  this.playSound('soundStartLevel');
}
