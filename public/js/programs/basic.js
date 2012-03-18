(function() {

  define(function() {
    var Basic;
    Basic = (function() {

      function Basic(name) {
        this.name = name;
      }

      Basic.prototype.move = function(freespaces) {};

      Basic.prototype.winning_combos = [['0', '1', '2'], ['3', '4', '5'], ['6', '7', '8'], ['0', '3', '6'], ['1', '4', '7'], ['3', '5', '8'], ['0', '4', '8'], ['2', '4', '6']];

      return Basic;

    })();
    return Basic;
  });

}).call(this);
