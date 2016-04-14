/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/js/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	var HanoiView = __webpack_require__(1);
	var HanoiGame = __webpack_require__(2);
	
	$(function () {
	  var rootEl = $('.hanoi');
	  var game = new HanoiGame();
	  new HanoiView(game,rootEl);
	});


/***/ },
/* 1 */
/***/ function(module, exports) {

	var HanoiView = function(game, $rootEl) {
	  this.game = game;
	  this.$rootEl = $rootEl;
	
	  this.setupTowers();
	  this.bindEvents();
	};
	
	HanoiView.prototype.setupTowers = function() {
	  var $towersContainer = $('<towers></towers>');
	  var $ul = $('<ul data-pos="0"></ul>');
	  $ul.append($('<li class="disc-1"></li>'));
	  $ul.append($('<li class="disc-2"></li>'));
	  $ul.append($('<li class="disc-3"></li>'));
	  $towersContainer.append($ul);
	
	  $ul = $('<ul data-pos="1"></ul>');
	  $ul.append($('<li></li>'));
	  $ul.append($('<li></li>'));
	  $ul.append($('<li></li>'));
	  $towersContainer.append($ul);
	
	  $ul = $('<ul data-pos="2"></ul>');
	  $ul.append($('<li></li>'));
	  $ul.append($('<li></li>'));
	  $ul.append($('<li></li>'));
	  $towersContainer.append($ul);
	
	  this.$rootEl.append($towersContainer);
	};
	
	HanoiView.prototype.bindEvents = function() {
	
	  $('ul').each(function(_, ul) {
	    console.log(this);
	    $(ul).on('click', this.clickTower.bind(this));
	  }.bind(this)).bind(this);
	};
	
	HanoiView.prototype.render = function () {
	  $('li').removeClass("disc-1");
	  $('li').removeClass("disc-2");
	  $('li').removeClass("disc-3");
	  this.game.towers.forEach(function(tower, towerIdx){
	    var x = $('ul[data-pos=' + towerIdx + ']').children();
	    console.log(tower);
	    console.log(x);
	  });
	};
	
	
	HanoiView.prototype.clickTower = function (event) {
	  if(!this.from){
	    console.log("first");
	    console.log(this);
	    this.from = $(event.currentTarget).attr("data-pos");
	  }else{
	    console.log("second");
	    console.log(this);
	    this.game.move(this.from, $(event.currentTarget).attr("data-pos"));
	    this.from = null;
	    this.render();
	  }
	  // console.log(this.game.towers);
	};
	
	module.exports = HanoiView;


/***/ },
/* 2 */
/***/ function(module, exports) {

	function Game () {
	  this.towers = [[3, 2, 1], [], []];
	};
	
	Game.prototype.isValidMove = function (startTowerIdx, endTowerIdx) {
	  var startTower = this.towers[startTowerIdx];
	  var endTower = this.towers[endTowerIdx];
	
	  if (startTower.length === 0) {
	    return false;
	  } else if (endTower.length == 0) {
	    return true;
	  } else {
	    var topStartDisc = startTower[startTower.length - 1];
	    var topEndDisc = endTower[endTower.length - 1];
	    return topStartDisc < topEndDisc;
	  }
	};
	
	Game.prototype.isWon = function () {
	  // move all the discs to the last or second tower
	  return (this.towers[2].length == 3) || (this.towers[1].length == 3);
	};
	
	Game.prototype.move = function (startTowerIdx, endTowerIdx) {
	  if (this.isValidMove(startTowerIdx, endTowerIdx)) {
	    this.towers[endTowerIdx].push(this.towers[startTowerIdx].pop());
	    return true;
	  } else {
	    return false;
	  }
	};
	
	Game.prototype.print = function () {
	  console.log(JSON.stringify(this.towers));
	};
	
	Game.prototype.promptMove = function (reader, callback) {
	  this.print();
	  reader.question("Enter a starting tower: ", function (start) {
	    var startTowerIdx = parseInt(start);
	    reader.question("Enter an ending tower: ", function (end) {
	      var endTowerIdx = parseInt(end);
	      callback(startTowerIdx, endTowerIdx)
	    });
	  });
	};
	
	Game.prototype.run = function (reader, gameCompletionCallback) {
	  this.promptMove(reader, (function (startTowerIdx, endTowerIdx) {
	    if (!this.move(startTowerIdx, endTowerIdx)) {
	      console.log("Invalid move!");
	    }
	
	    if (!this.isWon()) {
	      // Continue to play!
	      this.run(reader, gameCompletionCallback);
	    } else {
	      this.print();
	      console.log("You win!");
	      gameCompletionCallback();
	    }
	  }).bind(this));
	};
	
	module.exports = Game;


/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map