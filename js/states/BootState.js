
var Phaser = Phaser || {};
var GameTank = GameTank || {};

GameTank.BootState = function () {
  "use strict";
  GameTank.BaseState.call(this);
};

GameTank.BootState.prototype = Object.create(GameTank.BaseState.prototype);
GameTank.BootState.prototype.constructor = GameTank.BootState;

GameTank.BootState.prototype.preload = function () {
  "use strict";
  game.scale.pageAlignHorizontally = true;
  game.scale.pageAlignVertically = true;
  game.scale.scaleMode = Phaser.ScaleManager.EXACT_FIT;
};

GameTank.BootState.prototype.create = function () {
  "use strict";
  game.state.start('PreloadState');
};

