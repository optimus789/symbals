FlameParticle = function (game, x, y) {
  Phaser.Particle.call(this, game, x, y, game.cache.getBitmapData('flameParticle'));
};
FlameParticle.prototype = Object.create(Phaser.Particle.prototype);
FlameParticle.prototype.constructor = FlameParticle;
