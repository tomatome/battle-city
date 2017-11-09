
var Phaser = Phaser || {};
var GameTank = GameTank || {};

GameTank.StartState = function () {
  "use strict";
  GameTank.BaseState.call(this);
};

GameTank.StartState.prototype = Object.create(GameTank.BaseState.prototype);
GameTank.StartState.prototype.constructor = GameTank.StartState;

GameTank.StartState.prototype.create = function () {
  "use strict";
  var style = { font: "bold 14px Arial", fill: "#fff", boundsAlignH: "center", boundsAlignV: "middle" };
  var logo = game.add.image(GAME_WIDTH/2, GAME_HEIGHT/4, 'logo');
  logo.anchor.setTo(0.5, 0.5);
  logo.scale.setTo(0.5, 1);
  var foot = game.add.image(GAME_WIDTH/2, GAME_HEIGHT-80, 'foot');
  foot.anchor.setTo(0.5, 0.5);
  foot.scale.setTo(0.5, 1);
  style = { font: "bold 24px 微软雅黑", fill: "#fff" };
  var player1 = game.add.text(GAME_WIDTH/2, GAME_HEIGHT/2, "单机练习", style);
  var player2 = game.add.text(GAME_WIDTH/2, GAME_HEIGHT/2 + 60, "多人联网", style);
 	player1.inputEnabled = true;
	player1.events.onInputDown.add(oneDown, this);
	player1.anchor.setTo(0.5,0.5);
	player1.scale.setTo(0.5, 1);
  player2.inputEnabled = true;
	player2.events.onInputDown.add(multDown, this);
	player2.anchor.setTo(0.5, 0.5);
	player2.scale.setTo(0.5, 1);
  /*this.tank = game.add.sprite(170, 251, 'player1');
  this.tank.animations.add('run', [0, 1], 10, true);
  this.tank.animations.play("run");
  this.tank.anchor.setTo(0.5, 0.5);
  this.tank.angle = 90;
  this.upKey = game.input.keyboard.addKey(Phaser.Keyboard.UP);
  this.downKey = game.input.keyboard.addKey(Phaser.Keyboard.DOWN);
  this.spaceKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
  game.physics.enable(player1, Phaser.Physics.ARCADE);*/
  
};

function oneDown(item) {
	var maxSpeed = 400;
  //this.physics.arcade.velocityFromRotation(this.stick.rotation, this.stick.force * maxSpeed, this.tank.body.velocity);
  
  game.playerNum = 1;
  // 从第几关开始
  game.level = START_LEVEL;
  game.state.start('GameState');
}
function multDown() {
	var maxSpeed = 400;
  //this.physics.arcade.velocityFromRotation(this.stick.rotation, this.stick.force * maxSpeed, this.tank.body.velocity);

  game.playerNum = 2;
  // 从第几关开始
  game.level = START_LEVEL;
  game.state.start('GameState');
}
