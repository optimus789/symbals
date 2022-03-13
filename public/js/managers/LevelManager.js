
var Phaser = Phaser || {};
var Symbals = Symbals || {};

Symbals.LevelManager = function(gameState) {
  "use strict";
  Object.call(this);
  this.gameState = gameState;
  
};

Symbals.LevelManager.prototype = Object.create(Object.prototype);
Symbals.LevelManager.prototype.constructor = Symbals.LevelManager;

Symbals.LevelManager.prototype.loadStage = function(stage) {
  this.levelJSON = game.cache.getJSON('level' + stage);
}

Symbals.LevelManager.prototype.loadLevel = function(level) {
  var curLevelArr = this.levelJSON[level];
  this.gameState.missions.splice(0, this.gameState.missions.length);
  this.itemCount = 0;

  for(var i=0; i<curLevelArr.length; i++) {
    var line = curLevelArr[i];
    var totalWidth = line.length * 85;
    var missionLine = [];
    this.itemCount += line.length;
    for(var j=0; j<line.length; j++) {
      var item = line[j];
      var position = {
        x: WIDTH / 2 - totalWidth / 2 + 85/2 + j * 85,
        y: 190 + i * 85
      }
      if(item.length == 1) {
        var mission = this.gameState.groups["mission"].getFirstExists(false);
        if(mission) {
          mission.changeMission(position, MissionMap[item[0]], item[0]);
        } else {
          mission = new Symbals.Mission(this.gameState, position, MissionMap[item[0]], 'mission', {
            index: item[0]
          });
        }
        var missionObj = {
          index: item[0],
          sprite: mission
        }
        missionLine.push(missionObj);
      }
    }
    this.gameState.missions.push(missionLine);
  }
}

Symbals.LevelManager.prototype.nextLevel = function(level) {
  for(var i=0; i<this.gameState.missions.length; i++) {
    for(var j=0; j<this.gameState.missions[i].length; j++) {
      this.gameState.missions[i][j].sprite.kill();
    }
  }
}
