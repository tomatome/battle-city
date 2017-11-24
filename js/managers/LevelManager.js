
var Phaser = Phaser || {};
var GameTank = GameTank || {};

GameTank.LevelManager = function(gameState) {
  "use strict";
  Object.call(this);
  this.gameState = gameState;
  this.keyMap = {
    1: "brick",
    2: "iron",
    3: "grass",
    4: "waterv",
    5: "waterh"
  }
  this.map = [];
  for(var i=0; i<LEVEL_ROW; i++) {
  	this.map[i] = [];
  	for(var j=0; j<LEVEL_COL; j++) {
    	this.map[i][j] = undefined;
   }
  }
};

GameTank.LevelManager.prototype = Object.create(Object.prototype);
GameTank.LevelManager.prototype.constructor = GameTank.LevelManager;

GameTank.LevelManager.prototype.load = function(level) {
  this.levelJSON = game.cache.getJSON(level);
  var curRow = GAME_HEIGHT/16+1>24?24:parseInt(GAME_HEIGHT/16+1);
	var curCol = GAME_WIDTH/16+1>36?36:parseInt(GAME_WIDTH/16+1);
	if (curRow%2) {
		curRow = curRow-1;
	}
	if (curCol%2){
		curCol = curCol-1;
	}
  var skipRow = (24 - curRow)/2;
	var skipCol = (36 - curCol)/2;
  for(var i=0; i<LEVEL_ROW; i++) {
  	if ((i>=2) && (skipRow > 0)) {
  		skipRow = skipRow - 1;
  		continue
  	}
    for(var j=skipCol; j<LEVEL_COL-skipCol; j++) {
      if(this.levelJSON[i][j]) {
        var tile = this.gameState.groups.map[this.keyMap[this.levelJSON[i][j]]].getFirstExists(false);
        tile.scale.setTo(1,1)
        tile.body.immovable = true;
        tile.reset(j * TILE_WIDTH, i * TILE_HEIGHT);
        tile.xIndex = j;
        tile.yIndex = i;
        tile.type = this.levelJSON[i][j];
        this.map[i][j] = tile;
      } else {
        this.map[i][j] = undefined;
      }
    }
  }
}

GameTank.LevelManager.prototype.updateMap = function(x, y) {
  this.map[x][y] = undefined;
}

GameTank.LevelManager.prototype.getShovel = function() {
  var indexes = [{x:11, y:25},{x:11, y:24},{x:11, y:23},{x:12, y:23},{x:13, y:23},{x:14, y:23},{x:14, y:24},{x:14, y:25},{x:14, y:26}];
  if(this.shovelTimer) {
    this.gameState.game.time.events.remove(this.shovelTimer);
    this.shovelTimer = null;
  }
  for(var i=0; i<indexes.length; i++) {
    if(this.map[indexes[i].x][indexes[i].y]) {
      this.map[indexes[i].x][indexes[i].y].kill();
      this.map[indexes[i].x][indexes[i].y] = undefined;
    }
    var tile = this.gameState.groups.map['iron'].getFirstExists(false);
    tile.body.immovable = true;
    tile.reset(indexes[i].x * TILE_WIDTH, indexes[i].y * TILE_HEIGHT);
    tile.xIndex = indexes[i].x;
    tile.yIndex = indexes[i].y;
    tile.type = 2;
    this.map[indexes[i].x][indexes[i].y] = tile;
  }
  this.shovelTimer = this.gameState.game.time.events.add(Phaser.Timer.SECOND * 8, function() {
    for(var i=0; i<indexes.length; i++) {
      if(this.map[indexes[i].x][indexes[i].y]) {
        this.map[indexes[i].x][indexes[i].y].kill();
        this.map[indexes[i].x][indexes[i].y] = undefined;
      }
      var tile = this.gameState.groups.map['brick'].getFirstExists(false);
      tile.body.immovable = true;
      tile.reset(indexes[i].x * TILE_WIDTH, indexes[i].y * TILE_HEIGHT);
      tile.xIndex = indexes[i].x;
      tile.yIndex = indexes[i].y;
      tile.type = 1;
      this.map[indexes[i].x][indexes[i].y] = tile;
    }
    this.shovelTimer = null;
  }, this);
}
