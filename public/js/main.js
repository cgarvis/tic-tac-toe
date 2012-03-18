(function() {

  Array.prototype.remove = function(e) {
    var t, _ref;
    if ((t = this.indexOf(e)) > -1) {
      return ([].splice.apply(this, [t, t - t + 1].concat(_ref = [])), _ref);
    }
  };

  Array.prototype.has = function(obj) {
    return this.indexOf(obj) >= 0;
  };

  require.config({
    paths: {
      'bean': 'libs/bean/bean.min',
      'bonzo': 'libs/bonzo/bonzo.min',
      'jquery': 'libs/jquery/jquery-1.7.1.min',
      'qwery': 'libs/qwery/qwery.min'
    }
  });

  require(['domReady!', 'bean', 'game'], function(domReady, Bean, Game) {
    Game.setup();
    return Game.start('mcp');
  });

}).call(this);
