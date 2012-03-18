define ['bean', 'bonzo', 'qwery', 'board', 'programs/sark', 'programs/mcp'], (Bean, Bonzo, Qwery, Board, Sark, MCP) ->
  winning_combos = [
    [0, 1, 2]
    [3, 4, 5]
    [6, 7, 8]
    [0, 3, 6]
    [1, 4, 7]
    [2, 5, 8]
    [0, 4, 8]
    [2, 4, 6]
  ]

  opponent = 'mcp'

  # shortcut the selector
  $ = (select) ->
    return Bonzo(Qwery(select))

  # create a new board
  setup = ->
    console.log 'Setting up the board'
    $('#win-message').addClass('hide')
    $('#lose-message').addClass('hide')
    $('#play-again-message').addClass('hide')
    Board.reset()
    Board.setup()

  # set the opponent and set click events
  start = (basic = "mcp") ->
    opponent = basic
    console.log 'Starting game against ' + opponent + '. Good Luck'

    # adding game events to titles
    $('.title').each (element, index) =>
      Bean.add element,
        'click': (e) =>
          move 'user', parseInt(Bonzo(e.target).attr('data-title'))

          if isGameover()
            stop('win')
          else if Board.count() is 0
            stop('lose')
          else
            move opponent
            if isGameover()
              stop('lose')

  # clean up the game
  stop = (verdict) ->
    console.log 'Stopping Game'

    if verdict is 'win'
      $('#win-message').removeClass('hide')
      $('#score .user').text(parseInt($('#score .user').text()) + 1)
    else
      $('#lose-message').removeClass('hide')
      $('#score .basic').text(1)

    $('#play-again-message').removeClass('hide').each (element, index) ->
      Bean.add element,
        'click': (e) ->
          setup()
          start()

    $('.title').each (element, index) ->
      Bean.remove element

  # determine if a winning move has ben made
  isGameover = ->
    for combo in winning_combos
      if Board.has('user', combo)
        return true
      if Board.has(opponent, combo)
        return true

    return false

  # select the opponents move.  If no position is given and `who` is "program", the program is
  # asked for a position
  move = (who, position) ->
    if who isnt 'user' and (typeof position is "undefined" or position is null)
      position = MCP.move()

    Board.select who, position

  { setup: setup, start: start, stop: stop, move: move }
