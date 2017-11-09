
var Phaser = Phaser || {};
var GameTank = GameTank || {};

GameTank.BootState = function () {
  "use strict";
  GameTank.BaseState.call(this);
};

Phaser.World.prototype.displayObjectUpdateTransform = function() {
  if(!game.scale.correct) {
    this.x = game.camera.y + game.width;
    this.y = -game.camera.x;
    this.rotation = Phaser.Math.degToRad(Phaser.Math.wrapAngle(90));
  } else {
    this.x = -game.camera.x;
    this.y = -game.camera.y;
    this.rotation = 0;
  }

  PIXI.DisplayObject.prototype.updateTransform.call(this);
}

GameTank.BootState.prototype = Object.create(GameTank.BaseState.prototype);
GameTank.BootState.prototype.constructor = GameTank.BootState;

GameTank.BootState.prototype.preload = function () {
  "use strict";
  game.scale.pageAlignHorizontally = true;
  game.scale.pageAlignVertically = true;
  game.scale.scaleMode = Phaser.ScaleManager.EXACT_FIT;
  //game.scale.scaleMode =  Phaser.ScaleManager.USER_SCALE;
  //game.scale.setUserScale(0.6, 1.4);
  if(game.scale.isLandscape) {
    game.scale.correct = true;
    game.scale.setGameSize(GAME_WIDTH, GAME_HEIGHT);
  } else {
    game.scale.correct = false;
    game.scale.setGameSize(GAME_HEIGHT, GAME_WIDTH);
  }
};

GameTank.BootState.prototype.create = function () {
  "use strict";
  game.scale.onOrientationChange.add(function() {
    if(game.scale.isLandscape) {
      game.scale.correct = true;
      game.scale.setGameSize(GAME_WIDTH, GAME_HEIGHT);
    } else {
      game.scale.correct = false;
      game.scale.setGameSize(GAME_HEIGHT, GAME_WIDTH);
    }
  }, this)
  game.state.start('PreloadState');
};

