(function() {

  define(['bonzo', 'qwery'], function(Bonzo, Qwery) {
    return function(Bonzo, Qwery) {
      return function(select) {
        return Bonzo(Qwery(select));
      };
    };
  });

}).call(this);
