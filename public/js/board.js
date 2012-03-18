(function() {

  define(['bean', 'bonzo', 'qwery'], function(Bean, Bonzo, Qwery) {
    var count, freespaces, has, isFree, isTaken, random, reset, select, selectedTitles, setup;
    freespaces = [0, 1, 2, 3, 4, 5, 6, 7, 8];
    selectedTitles = [];
    count = function() {
      return freespaces.length;
    };
    isFree = function(space) {
      return freespaces.has(space);
    };
    isTaken = function(space) {
      return !freespaces.has(space);
    };
    has = function(opponent, space) {
      var x, _i, _len;
      if (selectedTitles[opponent] != null) {
        if (space instanceof Array) {
          for (_i = 0, _len = space.length; _i < _len; _i++) {
            x = space[_i];
            if (!selectedTitles[opponent].has(x)) return false;
          }
          return true;
        } else {
          return selectedTitles[opponent].has(space);
        }
      }
      return false;
    };
    random = function() {
      var index;
      index = Math.round(Math.random() * (freespaces.length - 1));
      return freespaces[index];
    };
    reset = function() {
      freespaces = [0, 1, 2, 3, 4, 5, 6, 7, 8];
      selectedTitles = [];
      return setup();
    };
    select = function(opponent, space) {
      if (!(selectedTitles[opponent] != null)) selectedTitles[opponent] = [];
      if (isFree(space)) {
        selectedTitles[opponent].push(space);
        freespaces.remove(space);
        Bonzo(Qwery('td[data-title=' + space + ']')).each(function(element, index) {
          Bean.remove(element);
          Bonzo(element).addClass(opponent);
          return Bonzo(element).removeClass('hover');
        });
        console.log('Title ' + space + ' selected by ' + opponent);
        return true;
      } else {
        console.log('Illegal Move. Cheaters never prosper!');
      }
      return false;
    };
    setup = function() {
      var _this = this;
      return Bonzo(Qwery('.title')).each(function(element, index) {
        Bonzo(element).removeClass('user sark mcp clu');
        return Bean.add(element, {
          'mouseover': function(e) {
            return Bonzo(e.target).addClass('hover');
          },
          'mouseout': function(e) {
            return Bonzo(e.target).removeClass('hover');
          }
        });
      });
    };
    return {
      count: count,
      isFree: isFree,
      isTaken: isTaken,
      has: has,
      random: random,
      reset: reset,
      select: select,
      setup: setup
    };
  });

}).call(this);
