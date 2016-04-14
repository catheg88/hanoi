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
