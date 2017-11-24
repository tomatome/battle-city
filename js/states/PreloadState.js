var Phaser = Phaser || {};
var GameTank = GameTank || {};

GameTank.PreloadState = function() {
	"use strict";
	GameTank.BaseState.call(this);
};

GameTank.PreloadState.prototype = Object.create(GameTank.BaseState.prototype);
GameTank.PreloadState.prototype.constructor = GameTank.PreloadState;

GameTank.PreloadState.prototype.preload = function() {
	"use strict";
	//var preloadSprite = game.add.sprite((game.width-220)/2, game.height/2, 'loading');
	//game.load.setPreloadSprite(preloadSprite);
	game.load.atlas('generic', 'assets/generic-joystick.png', 'assets/generic-joystick.json');
	game.load.image('logo', 'assets/logo.png');
	game.load.image('foot', 'assets/foot.png');
	game.load.tilemap('map', 'assets/map.json', null, Phaser.Tilemap.TILED_JSON);
	game.load.image('tiles', 'assets/map_tile.jpg');
	game.load.image('brick', 'assets/brick.jpg');
	game.load.image('iron', 'assets/iron.jpg');
	game.load.image('grass', 'assets/grass.jpg');
	game.load.image('waterv', 'assets/waterv.jpg');
	game.load.image('waterh', 'assets/waterh.jpg');
	game.load.image('nest', 'assets/nest.jpg');
	game.load.image('nest_dead', 'assets/nest_dead.jpg');
	game.load.spritesheet('bouns', 'assets/bouns.jpg', 32, 30);
	game.load.spritesheet('bore', 'assets/bore.png', 32, 32, 2);
	game.load.spritesheet('enemy', 'assets/enemy.png', 32, 32);
	game.load.spritesheet('explode', 'assets/explode.png', 33, 25);
	game.load.image('bullet', 'assets/bullet.png');
	game.load.spritesheet('player1', 'assets/player1.png', 32, 32);
	game.load.spritesheet('player2', 'assets/player2.png', 32, 32);
	game.load.spritesheet('shield', 'assets/shield.png', 32, 32);
	game.load.image('enemyScoreTank', 'assets/enemyScoreTank.png');
	game.load.image('playerScoreTank', 'assets/playerScoreTank.png');
	game.load.image('player1Logo', 'assets/player1Logo.png');
	game.load.image('player2Logo', 'assets/player2Logo.png');
	game.load.image('flag', 'assets/flag.png');
	game.load.bitmapFont('tankNum', 'assets/num.png', 'assets/num.xml');
	game.load.audio("sound-start", ["assets/sound/start.mp3", "assets/sound/start.ogg", "assets/sound/start.wav"]);
	game.load.audio("sound-win", ["assets/sound/win.mp3", "assets/sound/win.ogg", "assets/sound/win.wav"]);
	game.load.audio("sound-player-fire", ["assets/sound/player-fire.mp3", "assets/sound/player-fire.ogg", "assets/sound/player-fire.wav"]);
	game.load.audio("sound-enemy-fire", ["assets/sound/enemy-fire.mp3", "assets/sound/enemy-fire.ogg", "assets/sound/enemy-fire.wav"]);
	game.load.audio("sound-over", ["assets/sound/over.mp3"]);
	game.load.audio("sound-hit-brick", ["assets/sound/hit-brick.mp3", "assets/sound/hit-brick.ogg", "assets/sound/hit-brick.wav"]);
	game.load.audio("sound-hit-iron", ["assets/sound/hit-iron.mp3", "assets/sound/hit-iron.ogg", "assets/sound/hit-iron.wav"]);
	game.load.audio("sound-enemy-boom", ["assets/sound/enemy-boom.mp3", "assets/sound/enemy-boom.ogg", "assets/sound/enemy-boom.wav"]);
	game.load.audio("sound-player-boom", ["assets/sound/player-boom.mp3", "assets/sound/player-boom.ogg", "assets/sound/player-boom.wav"]);
	game.load.audio("sound-generate-award", ["assets/sound/generate-award.mp3", "assets/sound/generate-award.ogg", "assets/sound/generate-award.wav"]);
	game.load.audio("sound-get-award", ["assets/sound/get-award.mp3", "assets/sound/get-award.ogg", "assets/sound/get-award.wav"]);

	for(var i = 1; i <= TOTAL_LEVEL; i++) {
		game.load.json('level' + i, 'js/levels/level' + i + '.json');
	}
	var progressText = game.add.text(game.world.centerX, game.world.centerY, '0%', {
		fontSize: '30px',
		fill: '#ffffff'
	});
	progressText.anchor.setTo(0.5, 0.5);
	// 监听加载完一个文件的事件
	game.load.onFileComplete.add(function(progress) {
		progressText.text = progress + '%';
	});
	// 监听加载完毕事件
	game.load.onLoadComplete.add(onLoad);
	// 最小展示时间，示例为3秒
	var deadLine = false;
	setTimeout(function() {
		deadLine = true;
	}, 3000);
	// 加载完毕回调方法
	function onLoad() {
		if(deadLine) {
			// 已到达最小展示时间，可以进入下一个场景
			game.state.start('created');
		} else {
			// 还没有到最小展示时间，1秒后重试
			setTimeout(onLoad, 1000);
		}
	}
};

GameTank.PreloadState.prototype.create = function() {
	"use strict";
	game.state.start('StartState');
};