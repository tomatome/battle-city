var GameTank = GameTank || {};

GameTank.Player1 = function(gameState, position, texture, group, properties) {
	"use strict";
	GameTank.Player.call(this, gameState, position, texture, group, properties);

	this.cursors = gameState.game.input.keyboard.createCursorKeys();
	this.space = gameState.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
	this.space.onDown.add(this.fire, this);

	this.curAngle = 0

	this.pad = this.game.plugins.add(Phaser.VirtualJoystick);
	this.stick = this.pad.addStick(0, 0, 50, 'generic');
	this.stick.alignBottomLeft(10);
console.log('init.stick.angle:',this.stick.angle); 
	this.buttonA = this.pad.addButton(100, 300, 'generic', 'button1-up', 'button1-down');
	this.buttonA.alignBottomRight(20);
	this.buttonA.angle = 90
};

GameTank.Player1.prototype = Object.create(GameTank.Player.prototype);
GameTank.Player1.prototype.constructor = GameTank.Player1;

GameTank.Player1.prototype.update = function() {
	"use strict";
	if(game.gameover) {
		return;
	}

	this.playerUpdate();

	if(this.cursors.right.isDown) {
		this.move("right");
	} else if(this.cursors.left.isDown) {
		this.move("left");
	} else if(this.cursors.up.isDown) {
		this.move("up");
	} else if(this.cursors.down.isDown) {
		this.move("down");
	} else {
		// stop
		this.body.velocity.x = 0;
		this.body.velocity.y = 0;
	}


var maxSpeed = 100
	if(this.stick.isDown) {
		//game.physics.arcade.velocityFromRotation(this.stick.rotation, this.stick.force * maxSpeed, this.body.velocity);
		console.log('this.stick.angle:',this.stick.angle); 
		var angle = this.stick.angle + this.curAngle
		if(angle > -45 && angle < 45 ) {
			this.move("up");
		} else if(angle > 45 && angle < 135) {
			this.move("right");
		} else if(angle > -135 && angle < -45 ) {
			this.move("left");
		} else {
			this.move("down");
		} 
		this.curAngle = this.stick.angle
	} else {
		this.body.velocity.set(0);
	}


};

GameTank.Player1.prototype.dead = function() {
	this.playerDead();
	if(this.gameState.scoreManager.playerKilled(1)) {
		// 还有命，就重生
		this.rebirth(this.gameState.playerBores[0]);
	} else {
		// 否则，死亡
		this.destroy();
	}
};