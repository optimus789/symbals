
var Symbals = Symbals || {};

Symbals.Pointer = function(gameState, position, texture, group, properties) {
  "use strict";
  Symbals.Prefab.call(this, gameState, position, texture, group, properties);
  this.gameState = gameState;
  this.scale.x = -properties.dir;
  this.alpha = 0;
};

Symbals.Pointer.prototype = Object.create(Symbals.Prefab.prototype);
Symbals.Pointer.prototype.constructor = Symbals.Pointer;

Symbals.Pointer.prototype.update = function () {
  "use strict";
}
