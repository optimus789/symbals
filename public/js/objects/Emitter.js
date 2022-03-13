var Phaser = Phaser || {};
var Symbals = Symbals || {};

Symbals.Emitter = function(gameState, position, maxParticles, group, properties) {
  "use strict";
  Phaser.Particles.Arcade.Emitter.call(this, gameState.game, position.x, position.y, maxParticles);
  
  this.gameState = gameState;
  if(group) {
    this.gameState.groups[group].add(this);
  }

  this.bitmap = game.add.bitmapData(20, 20);
  game.cache.addBitmapData('flameParticle', this.bitmap);

  this.particleClass = FlameParticle;
  this.makeParticles();
  this.setAlpha(1, 0, 1000);
  this.minParticleSpeed.setTo(-600, -600);
  this.maxParticleSpeed.setTo(600, 600);
  this.gravity = 0;
};

Symbals.Emitter.prototype = Object.create(Phaser.Particles.Arcade.Emitter.prototype);
Symbals.Emitter.prototype.constructor = Symbals.Emitter;

Symbals.Emitter.prototype.emit = function(index, sprite) {
  var emitColor = EmitterMap[index];

  this.generateFlame(this.bitmap, emitColor);
  if(index != 5) {
    this.x = sprite.x + sprite.width/2 - 35;
    this.y = sprite.y + sprite.height/2 - 15;
  } else {
    this.x = sprite.x + 15;
    this.y = sprite.y;
  }
  this.start(true, 1000, null, 20);
}

Symbals.Emitter.prototype.generateFlame = function(bitmap, color) {
  var len = 10;
  bitmap.context.clearRect(0, 0, 2*len, 2*len);
  var radgrad = bitmap.ctx.createRadialGradient(len, len, 4, len, len, len);
  color = Phaser.Color.getRGB(color);
  radgrad.addColorStop(0, Phaser.Color.getWebRGB(color));
  color.a = 0;
  radgrad.addColorStop(1, Phaser.Color.getWebRGB(color));
  bitmap.context.fillStyle = radgrad;
  bitmap.context.fillRect(0, 0, 2*len, 2*len);
};

