(function() {

  define(['board'], function(Board) {
    var move, winning_combos;
    winning_combos = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]];
    move = function() {
      var combo, position, _i, _j, _len, _len2;
      position = -1;
      for (_i = 0, _len = winning_combos.length; _i < _len; _i++) {
        combo = winning_combos[_i];
        if (Board.has('mcp', combo[0]) && Board.has('mcp', combo[1]) && Board.isFree(combo[2])) {
          position = combo[2];
          break;
        } else if (Board.isFree(combo[0]) && Board.has('mcp', combo[1]) && Board.has('mcp', combo[2])) {
          position = combo[0];
          break;
        } else if (Board.has('mcp', combo[0]) && Board.isFree(combo[1]) && Board.has('mcp', combo[2])) {
          position = combo[1];
          break;
        }
      }
      if (position === -1) {
        for (_j = 0, _len2 = winning_combos.length; _j < _len2; _j++) {
          combo = winning_combos[_j];
          if (Board.has('user', combo[0]) && Board.has('user', combo[1]) && Board.isFree(combo[2])) {
            position = combo[2];
            break;
          } else if (Board.isFree(combo[0]) && Board.has('user', combo[1]) && Board.has('user', combo[2])) {
            position = combo[0];
            break;
          } else if (Board.has('user', combo[0]) && Board.isFree(combo[1]) && Board.has('user', combo[2])) {
            position = combo[1];
            break;
          }
        }
      }
      if (position === -1 && Board.isFree(4)) position = 4;
      if (position === -1) position = Board.random();
      return position;
    };
    return {
      move: move
    };
  });

}).call(this);
