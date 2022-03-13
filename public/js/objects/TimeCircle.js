
var Symbals = Symbals || {};

Symbals.TimeCircle = function(gameState, position, group, properties) {
  "use strict";
  Phaser.Graphics.call(this, gameState.game, position.x, position.y);
  this.gameState = gameState;
  if(group) {
    this.gameState.groups[group].add(this);
  }
  this.anchor.setTo(0.5, 0.5);
};

Symbals.TimeCircle.prototype = Object.create(Phaser.Graphics.prototype);
Symbals.TimeCircle.prototype.constructor = Symbals.TimeCircle;

Symbals.TimeCircle.prototype.update = function () {
  "use strict";
}

Symbals.TimeCircle.prototype.setTime = function(sec) {
  this.clear();
  this.lineStyle(3, 0xFFFFFF);
  this.arc(0, 0, 460, -Math.PI/2 + sec * Math.PI/this.gameState.LevelTime, Math.PI/2);
  this.arc(0, 0, 460, Math.PI/2, Math.PI*3/2 - sec * Math.PI/this.gameState.LevelTime);
}

