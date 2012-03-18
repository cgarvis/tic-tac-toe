(function() {

  define(['bean', 'bonzo', 'qwery', 'board', 'programs/sark', 'programs/mcp'], function(Bean, Bonzo, Qwery, Board, Sark, MCP) {
    var $, isGameover, move, opponent, setup, start, stop, winning_combos;
    winning_combos = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]];
    opponent = 'mcp';
    $ = function(select) {
      return Bonzo(Qwery(select));
    };
    setup = function() {
      console.log('Setting up the board');
      $('#win-message').addClass('hide');
      $('#lose-message').addClass('hide');
      $('#play-again-message').addClass('hide');
      Board.reset();
      return Board.setup();
    };
    start = function(basic) {
      var _this = this;
      if (basic == null) basic = "mcp";
      opponent = basic;
      console.log('Starting game against ' + opponent + '. Good Luck');
      return $('.title').each(function(element, index) {
        return Bean.add(element, {
          'click': function(e) {
            move('user', parseInt(Bonzo(e.target).attr('data-title')));
            if (isGameover()) {
              return stop('win');
            } else if (Board.count() === 0) {
              return stop('lose');
            } else {
              move(opponent);
              if (isGameover()) return stop('lose');
            }
          }
        });
      });
    };
    stop = function(verdict) {
      console.log('Stopping Game');
      if (verdict === 'win') {
        $('#win-message').removeClass('hide');
        $('#score .user').text(parseInt($('#score .user').text()) + 1);
      } else {
        $('#lose-message').removeClass('hide');
        $('#score .basic').text(1);
      }
      $('#play-again-message').removeClass('hide').each(function(element, index) {
        return Bean.add(element, {
          'click': function(e) {
            setup();
            return start();
          }
        });
      });
      return $('.title').each(function(element, index) {
        return Bean.remove(element);
      });
    };
    isGameover = function() {
      var combo, _i, _len;
      for (_i = 0, _len = winning_combos.length; _i < _len; _i++) {
        combo = winning_combos[_i];
        if (Board.has('user', combo)) return true;
        if (Board.has(opponent, combo)) return true;
      }
      return false;
    };
    move = function(who, position) {
      if (who !== 'user' && (typeof position === "undefined" || position === null)) {
        position = MCP.move();
      }
      return Board.select(who, position);
    };
    return {
      setup: setup,
      start: start,
      stop: stop,
      move: move
    };
  });

}).call(this);
