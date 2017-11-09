var GameTank = GameTank || {};

GameTank.Player1 = function(gameState, position, texture, group, properties) {
	"use strict";
	GameTank.Player.call(this, gameState, position, texture, group, properties);

	this.cursors = gameState.game.input.keyboard.createCursorKeys();
	this.space = gameState.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
	this.space.onDown.add(this.fire, this);

	this.pad = this.game.plugins.add(Phaser.VirtualJoystick);
	this.stick = this.pad.addStick(0, 0, 50, 'generic');
	this.stick.alignBottomLeft(10);

	this.buttonA = this.pad.addButton(100, 300, 'generic', 'button1-up', 'button1-down');
	this.buttonA.alignBottomRight(20);
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

	if(this.stick.isDown) {
		if(this.stick.direction === Phaser.LEFT) {
			this.move("left");
		} else if(this.stick.direction === Phaser.RIGHT) {
			this.move("right");
		} else if(this.stick.direction === Phaser.UP) {
			this.move("up");
		} else if(this.stick.direction === Phaser.DOWN) {
			tthis.move("down");
		}
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