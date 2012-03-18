Array::remove = (e) -> @[t..t] = [] if (t = @indexOf(e)) > -1
Array::has = (obj) -> @indexOf(obj) >= 0

require.config
  paths:
    'bean': 'libs/bean/bean.min'
    'bonzo': 'libs/bonzo/bonzo.min'
    'jquery': 'libs/jquery/jquery-1.7.1.min'
    'qwery': 'libs/qwery/qwery.min'

require ['domReady!', 'bean', 'game'], (domReady, Bean, Game) ->
  Game.setup()
  Game.start('mcp')
