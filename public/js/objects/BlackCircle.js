
var Symbals = Symbals || {};

Symbals.BlackCircle = function(gameState, position, group, properties) {
  "use strict";
  Phaser.Graphics.call(this, gameState.game, position.x, position.y);
  this.gameState = gameState;
  if(group) {
    this.gameState.groups[group].add(this);
  }
  this.anchor.setTo(0.5, 0.5);
  this.lineStyle(5, 0x001221);
  this.arc(0, 0, 700, 0, 2*Math.PI);
  this.scale.setTo(2, 2);
};

Symbals.BlackCircle.prototype = Object.create(Phaser.Graphics.prototype);
Symbals.BlackCircle.prototype.constructor = Symbals.BlackCircle;

Symbals.BlackCircle.prototype.update = function () {
  "use strict";
}

Symbals.BlackCircle.prototype.show = function(callback) {
  var tween = game.add.tween(this.scale).to({x: 1, y: 1}, 0, Phaser.Easing.Exponential.Out, true);
  tween.onComplete.add(callback, this.gameState);
}

Symbals.BlackCircle.prototype.hide = function(callback) {
  var tween = game.add.tween(this.scale).to({x: 2, y: 2}, 500, Phaser.Easing.Exponential.Out, true);
  tween.onComplete.add(callback, this.gameState);
}
