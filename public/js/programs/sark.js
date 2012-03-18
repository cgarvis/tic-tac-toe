(function() {

  define(['board'], function(Board) {
    var move;
    move = function() {
      return Board.random();
    };
    return {
      move: move
    };
  });

}).call(this);
