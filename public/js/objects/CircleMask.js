
var Symbals = Symbals || {};

Symbals.CircleMask = function(gameState, position, texture, group, properties) {
  "use strict";
  Symbals.Prefab.call(this, gameState, position, texture, group, properties);
  this.gameState = gameState;
  this.scale.setTo(0.1);
};

Symbals.CircleMask.prototype = Object.create(Symbals.Prefab.prototype);
Symbals.CircleMask.prototype.constructor = Symbals.CircleMask;

Symbals.CircleMask.prototype.update = function () {
  "use strict";
}

Symbals.CircleMask.prototype.show = function() {
  game.add.tween(this.scale).to({x: 6.5, y: 6.5}, 0, Phaser.Easing.Exponential.Out, true);
}

Symbals.CircleMask.prototype.disappear = function() {
  game.add.tween(this.scale).to({x: 0, y: 0}, 500, Phaser.Easing.Exponential.In, true);
}

Symbals.CircleMask.prototype.big = function() {
  game.add.tween(this.scale).to({x: 9, y: 9}, 1000, Phaser.Easing.Exponential.In, true);
}

Symbals.CircleMask.prototype.small = function() {
  game.add.tween(this.scale).to({x: 4, y: 4}, 1500, Phaser.Easing.Exponential.In, true);
}
