var Phaser = Phaser || {};
var Symbals = Symbals || {};

Symbals.StartState = function () {
  'use strict';
  Symbals.BaseState.call(this);
};

Symbals.StartState.prototype = Object.create(Symbals.BaseState.prototype);
Symbals.StartState.prototype.constructor = Symbals.StartState;

Symbals.StartState.prototype.create = function () {
  'use strict';

  this.gOver = false;
  this.canButton = false;

  this.levelNum = 0;

  this.missions = [];
  this.curLine = 0;
  this.curLineCount = 0;

  this.LevelTime = 0;
  this.blood = TOTAL_BLOOD;
  this.timeCount = 0;

  game.add.tileSprite(0, 0, WIDTH, HEIGHT, 'background');
  game.add.image(0, 0, 'mask');

  this.groups = {};
  this.groups['circleMask'] = game.add.group();
  this.groups['mission'] = game.add.group();
  this.groups['pointer'] = game.add.group();
  this.groups['tree'] = game.add.group();
  this.groups['emitter'] = game.add.group();
  this.groups['error'] = game.add.group();
  this.groups['graphic'] = game.add.group();
  this.groups['button'] = game.add.group();

  this.circleMask = new Symbals.CircleMask(
    this,
    { x: WIDTH / 2, y: HEIGHT / 2 },
    'circleMask',
    'circleMask'
  );
  this.circleMask.show();

  this.blackCircle = new Symbals.BlackCircle(
    this,
    { x: WIDTH / 2, y: HEIGHT / 2 },
    'graphic'
  );
  this.blackCircle.show(function () {
    this.loadLevel(this.levelNum);
  });

  this.dashCircle = new Symbals.DashCircle(
    this,
    { x: WIDTH / 2, y: HEIGHT / 2 },
    'graphic'
  );

  this.timeCircle = new Symbals.TimeCircle(
    this,
    { x: WIDTH / 2, y: HEIGHT / 2 },
    'graphic'
  );

  this.bloodCircle = new Symbals.BloodCircle(
    this,
    { x: WIDTH / 2, y: HEIGHT / 2 },
    'graphic'
  );

  this.emitter = new Symbals.Emitter(
    this,
    {
      x: 0,
      y: 0,
    },
    200,
    'emitter'
  );

  this.treeManager = new Symbals.TreeManager(this);
  this.pointerManager = new Symbals.PointerManager(this);
  this.scoreManager = new Symbals.ScoreManager(this);
  this.levelManager = new Symbals.LevelManager(this);

  this.leftError = new Symbals.Error(
    this,
    { x: 0, y: 0 },
    'redError',
    'error',
    { dir: 1 }
  );
  this.rightError = new Symbals.Error(
    this,
    { x: WIDTH, y: 0 },
    'redError',
    'error',
    { dir: -1 }
  );

  this.buttonCircleGroup = game.add.group();
  this.buttonCircleGroup.createMultiple(12, 'button_circle');

  this.missionEffectGroup = game.add.group();

  this.missionGroup = game.add.group();

  var leftDash = game.add.image(0, 138, 'dash');
  this.leftBtn1 = new Symbals.MissionButton(
    this,
    { x: 20 + 145 / 2, y: 230 + 145 / 2 },
    'button_black',
    this.clickButton,
    { side: 'left', index: 0, game: this, btn: 'leftBtn1' },
    'button',
    { keyCode: Phaser.KeyCode.Q }
  );
  this.leftBtn2 = new Symbals.MissionButton(
    this,
    { x: 60 + 145 / 2, y: 480 + 145 / 2 },
    'button_red',
    this.clickButton,
    { side: 'left', index: 2, game: this, btn: 'leftBtn2' },
    'button',
    { keyCode: Phaser.KeyCode.A }
  );
  this.leftBtn3 = new Symbals.MissionButton(
    this,
    { x: 20 + 145 / 2, y: 730 + 145 / 2 },
    'button_yellow',
    this.clickButton,
    { side: 'left', index: 4, game: this, btn: 'leftBtn3' },
    'button',
    { keyCode: Phaser.KeyCode.Z }
  );
  this.leftScore = game.add.bitmapText(
    20,
    10,
    'SymbalsNum',
    game.leftScore + '',
    64
  );

  this.leftPart = game.add.sprite(0, 0);
  this.leftPart.addChild(leftDash);
  this.leftPart.addChild(this.leftBtn1);
  this.leftPart.addChild(this.leftBtn2);
  this.leftPart.addChild(this.leftBtn3);
  this.leftAll = game.add.sprite(0, 0);
  this.leftAll.addChild(this.leftPart);
  this.leftAll.addChild(this.leftScore);

  this.leftAll.x = -300;
  game.add
    .tween(this.leftAll)
    .to({ x: 0 }, 0, Phaser.Easing.Exponential.Out, true);

  var rightDash = game.add.image(1920, 138, 'dash');
  rightDash.scale.x = -1;
  this.rightBtn1 = new Symbals.MissionButton(
    this,
    { x: 1770 - 20 + 145 / 2, y: 230 + 145 / 2 },
    'button_blue',
    this.clickButton,
    { side: 'right', index: 1, game: this, btn: 'rightBtn1' },
    'button',
    { keyCode: Phaser.KeyCode.O }
  );
  this.rightBtn2 = new Symbals.MissionButton(
    this,
    { x: 1770 - 60 + 145 / 2, y: 480 + 145 / 2 },
    'button_red',
    this.clickButton,
    { side: 'right', index: 2, game: this, btn: 'rightBtn2' },
    'button',
    { keyCode: Phaser.KeyCode.K }
  );
  this.rightBtn3 = new Symbals.MissionButton(
    this,
    { x: 1770 - 20 + 145 / 2, y: 730 + 145 / 2 },
    'button_green',
    this.clickButton,
    { side: 'right', index: 3, game: this, btn: 'rightBtn3' },
    'button',
    { keyCode: Phaser.KeyCode.M }
  );
  this.rightScore = game.add.bitmapText(
    0,
    10,
    'SymbalsNum',
    game.rightScore + '',
    64
  );
  this.rightScore.x = 1920 - this.rightScore.width - 20;

  this.rightPart = game.add.sprite(0, 0);
  this.rightPart.addChild(rightDash);
  this.rightPart.addChild(this.rightBtn1);
  this.rightPart.addChild(this.rightBtn2);
  this.rightPart.addChild(this.rightBtn3);
  this.rightAll = game.add.sprite(0, 0);
  this.rightAll.addChild(this.rightPart);
  this.rightAll.addChild(this.rightScore);

  this.rightAll.x = 300;
  game.add
    .tween(this.rightAll)
    .to({ x: 0 }, 0, Phaser.Easing.Exponential.Out, true);

  // gameover
  var gameover = game.add.sprite(WIDTH / 2, HEIGHT / 2 - 100, 'gameover');
  gameover.anchor.setTo(0.5, 0.5);
  gameover.animations.add('shake');
  gameover.animations.play('shake', 3, true);
  this.totalScore = game.add.bitmapText(
    WIDTH / 2,
    HEIGHT / 2 + 100,
    'SymbalsNum',
    '',
    64
  );
  this.totalScore.x = WIDTH / 2 - this.totalScore.width / 2;
  this.gameoverAll = game.add.sprite(0, 0);
  this.gameoverAll.addChild(gameover);
  this.gameoverAll.addChild(this.totalScore);
  this.gameoverAll.y = -1080;

  this.brain = game.add.sprite(435 + 1043 / 2, 1041 / 2 + 10, 'brain');
  this.brain.anchor.setTo(0.5, 0.5);
  this.brain.alpha = 0;

  this.bloodCircle.setBlood(this.blood);

  this.levelManager.loadStage(1);
};

Symbals.StartState.prototype.clickButton = function () {
  var clickIndex = this.index;
  var clickSide = this.side;
  var missions = this.game.missions;
  var curLine = this.game.curLine;
  var btn = this.game[this.btn];

  var correct = false;
  if (!missions[curLine]) {
    return;
  }
  for (var i = 0; i < missions[curLine].length; i++) {
    if (
      !missions[curLine][i].sprite.isDone &&
      missions[curLine][i].index == clickIndex
    ) {
      missions[curLine][i].sprite.done();
      correct = true;
      game.soundManager.playSoundRight();
      this.game.curLineCount++;
      if (this.game.curLineCount === missions[curLine].length) {
        this.game.curLineCount = 0;
        this.game.curLine++;
        this.game.pointerManager.posPointer(this.game.curLine);
        if (this.game.curLine == missions.length) {
          game.time.events.remove(this.game.timer);
          this.game.nextLevel();
        }
      }
      break;
    }
  }

  if (!correct) {
    this.game.blood = this.game.blood - TIME_RATIO * 2;
    this.game.bloodCircle.setBlood(this.game.blood);
    this.game.scoreManager.updateScore(clickSide, -10);
    game.soundManager.playSoundError();
    if (clickSide == 'left') {
      this.game.leftError.blink();
    } else {
      this.game.rightError.blink();
    }
    if (this.game.blood <= 0) {
      this.game.gOver = true;
      this.game.gameOver();
      game.time.events.remove(this.game.timer);
    }
  }
};

Symbals.StartState.prototype.loadLevel = function (level) {
  this.levelManager.loadLevel(level);

  this.pointerManager.posPointer(this.curLine);

  this.LevelTime = Math.round(this.levelManager.itemCount * LEVEL_TIME_RATIO);

  game.soundManager.playSoundStartLevel();

  this.groups['mission'].y = -400;

  var spriteTween = game.add
    .tween(this.groups['mission'])
    .to({ y: 0 }, 500, Phaser.Easing.Bounce.Out, true);
  spriteTween.onComplete.add(function () {
    this.pointerManager.showPointer();

    if (level == 0) {
      this.dashCircle.show();
    }

    this.canButton = true;

    this.timeCount = 0;
    this.timer = game.time.events.loop(
      (Phaser.Timer.SECOND * 0.1) / TIME_RATIO,
      function () {
        if (this.timeCount < this.LevelTime) {
          this.timeCount++;
          this.timeCircle.setTime(this.timeCount);
        } else if (this.blood > 0) {
          this.blood--;
          this.bloodCircle.setBlood(this.blood);
        } else {
          this.gOver = true;
          this.gameOver();
          game.time.events.remove(this.timer);
        }
      },
      this
    );
  }, this);
};

Symbals.StartState.prototype.nextLevel = function () {
  var goNext = function () {
    this.curLine = 0;
    this.loadLevel(this.levelNum);
  };

  this.canButton = false;

  this.scoreManager.levelScore();

  this.levelManager.nextLevel();

  this.pointerManager.hidePointer();

  this.levelNum++;

  if (this.levelNum < this.levelManager.levelJSON.length) {
    game.soundManager.playSoundNextLevel();
    this.treeManager.winLevel(this.levelNum, function () {
      goNext.call(this);
    });
  } else {
    this.treeManager.through(this.levelNum);
    this.gOver = true;
    this.through();
  }
};

Symbals.StartState.prototype.allLeft = function (callback) {
  this.bloodCircle.kill();
  this.timeCircle.kill();
  this.dashCircle.kill();
  this.groups['mission'].destroy(true);
  this.pointerManager.killPointer();
  game.add
    .tween(this.leftPart)
    .to({ x: -300 }, 0, Phaser.Easing.Exponential.Out, true);
  game.add
    .tween(this.rightPart)
    .to({ x: 300 }, 0, Phaser.Easing.Exponential.Out, true);
  this.blackCircle.hide(callback);
};

async function createNft(currentScore, level) {
  console.log('Minting NFT');
  let user = Moralis.User.current();

  let node = document.getElementById('game');
  domtoimage.toBlob(node).then(function (blob) {
    var file = new File([blob], 'name1.png', {
      type: 'image/png',
      lastModified: new Date(),
      size: 2,
    });
    const form = new FormData();
    form.append('file', file);
    const options = {
      method: 'POST',
      body: form,
      headers: {
        Authorization: 'c00bc5e8-e27e-4e8b-8d4d-15e74a7a84d9',
      },
    };
    fetch('https://api.nftport.xyz/v0/files', options)
      .then((response) => {
        console.log(response);
        return response.json();
      })
      .then((responseJson) => {
        if (responseJson.ipfs_url) {
          const metadata = {
            name: 'SYMBALS GAME',
            description: `Scored ${currentScore} in level ${level}`,
            image: responseJson.ipfs_url,
            attributes: [
              {
                display_type: 'date',
                trait_type: 'created',
                value: new Date().getTime(),
              },
              {
                trait_type: 'Level', 
                value: level
              }, 
              {
                display_type: 'number',
                trait_type: 'Score',
                value: currentScore,
              },
            ],
          };

          const str = JSON.stringify(metadata);
          const bytes = new TextEncoder().encode(str);
          const blob = new Blob([bytes], {
            type: 'application/json;charset=utf-8',
          });
          var metadataFile = new File([blob], 'metadata.json', {
            type: 'application/json',
            size: 2,
          });
          console.log(metadataFile);
          const form = new FormData();
          form.append('file', metadataFile);
          const apiKey =
            'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDJmODkxMmM5NmEwNzRDZkE5OTFDMmVBREQ4Q0VkOTk2RTdDMDdjYjIiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTY0MjI4MzA5MDA3NCwibmFtZSI6Ik5GVCBHYW1lIENhcmQifQ.YJiXkpS--mDOZfJg9MjmBD-n5ZnwwSD6ifY8M6L97Js';
          const options = {
            method: 'POST',
            body: form,
            headers: {
              Authorization: apiKey,
            },
          };
          fetch('https://api.nft.storage/upload', options)
            .then((response) => {
              console.log(response);
              return response.json();
            })
            .then((responseJson) => {
              if (responseJson.ok) {
                let mintToAddress = user.get('ethAddress');
                const metadataUri = `https://ipfs.io/ipfs/${responseJson.value.cid}/metadata.json`;
                const settings = {
                  async: false,
                  crossDomain: true,
                  url: 'https://api.nftport.xyz/v0/mints/customizable',
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'c00bc5e8-e27e-4e8b-8d4d-15e74a7a84d9',
                  },
                  processData: false,
                  data:
                    '{\n  "chain": "polygon",\n  "contract_address": "0xb2C8c173E6A44DcE16cFE0619bA6EDf66a07d8bB",\n  "metadata_uri": "' +
                    metadataUri +
                    '",\n  "mint_to_address": "' +
                    mintToAddress +
                    '"\n}',
                };

                $.ajax(settings).done(function (response) {
                  console.log('Done: ', response);
                  console.log(
                    response.transaction_external_url
                      ? response.transaction_external_url
                      : 'No transaction url'
                  );
                });
              }
              console.log(responseJson);
            });
        }
        // Handle the response
        delMultiplier(user.get('ethAddress'));
        console.log(responseJson);
      });
  });
}

Symbals.StartState.prototype.gameOver = async function () {
  game.soundManager.playSoundGameOver();
  this.totalScore.text = Number(game.leftScore + game.rightScore + '') * Number(multiplier);
  this.totalScore.x = WIDTH / 2 - this.totalScore.width / 2;
  this.circleMask.disappear();
  if(Number(this.totalScore.text)>0){
    await Promise.all([createNft(this.totalScore.text, this.levelNum)]);
  }
  console.log('Gameover called');
  this.allLeft(function () {
    game.add
      .tween(this.gameoverAll)  
      .to({ y: 0 }, 500, Phaser.Easing.Exponential.In, true);
    game.input.onTap.add(function () {
      game.state.start('MenuState');
    }, this);
    this.space = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    this.space.onDown.add(function () {
      game.state.start('MenuState');
    }, this);
  });
};

Symbals.StartState.prototype.through = function () {
  game.soundManager.playSoundWin();
  this.timeCircle.kill();
  this.bloodCircle.kill();
  this.allLeft(function () {
    game.time.events.add(
      Phaser.Timer.SECOND * 0.5,
      function () {
        this.circleMask.big();
        var brainTween = game.add
          .tween(this.brain)
          .to({ alpha: 1 }, 1000, Phaser.Easing.Exponential.In, true);
        brainTween.onComplete.add(function () {
          this.circleMask.small();
          game.add
            .tween(this.brain.scale)
            .to({ x: 0.5, y: 0.5 }, 1500, Phaser.Easing.Exponential.In, true);
          this.treeManager.disappearCurrentTree(function () {
            var totalSc = game.add.bitmapText(
              20,
              10,
              'SymbalsNum',
              game.leftScore + game.rightScore + '',
              64
            );
            totalSc.x = WIDTH / 2 - totalSc.width / 2;
            totalSc.y = 100;
            game.soundManager.playSoundMenu();
            game.input.onTap.addOnce(function () {
              game.state.start('WinState');
            }, this);

            this.space = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
            this.space.onDown.addOnce(function () {
              game.state.start('WinState');
            }, this);
          });
        }, this);
      },
      this
    );
  });
};

Symbals.StartState.prototype.update = function () {};
