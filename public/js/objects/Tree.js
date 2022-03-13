
var Symbals = Symbals || {};

Symbals.Tree = function(gameState, position, texturePrefix, group, properties) {
  "use strict";
  Symbals.Prefab.call(this, gameState, position, '', group, properties);
  this.gameState = gameState;
  this.texturePrefix = texturePrefix;
  this.alpha = 0;
};

Symbals.Tree.prototype = Object.create(Symbals.Prefab.prototype);
Symbals.Tree.prototype.constructor = Symbals.Tree;

Symbals.Tree.prototype.update = function () {
  "use strict";
}

Symbals.Tree.prototype.changeIndex = function(index) {
  this.loadTexture(this.texturePrefix + index);
}

Symbals.Tree.prototype.show = function() {
  this.alpha = 1;
}

Symbals.Tree.prototype.hide = function() {
  this.alpha = 1;
  game.add.tween(this).to( { alpha: 0 }, 500, Phaser.Easing.Linear.None, true);
}

Symbals.Tree.prototype.disappear = function(callback) {
  game.add.tween(this).to( { alpha: 0 }, 1500, Phaser.Easing.Linear.In, true);
  var tween = game.add.tween(this.scale).to({x: 0.5, y: 0.5}, 1500, Phaser.Easing.Exponential.In, true);
  tween.onComplete.add(callback, this.gameState);
}

Symbals.Tree.prototype.showAndHide = function(callback, treeAnim, treeManager) {
  var tweenIn = game.add.tween(this).to( { alpha: 1 }, 500, Phaser.Easing.Linear.None);
  var tweenOut = game.add.tween(this).to( { alpha: 0 }, 500, Phaser.Easing.Linear.None, false, 1000);
  tweenOut.onComplete.add(callback, this.gameState);
  tweenIn.chain(tweenOut);
  tweenIn.start();
  treeAnim.call(treeManager);
}
