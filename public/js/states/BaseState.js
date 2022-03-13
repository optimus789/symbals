
var Phaser = Phaser || {};
var Symbals = Symbals || {};

Symbals.BaseState = function () {
  "use strict";
  Phaser.State.call(this);
};

Symbals.BaseState.prototype = Object.create(Phaser.State.prototype);
Symbals.BaseState.prototype.constructor = Symbals.BaseState;
