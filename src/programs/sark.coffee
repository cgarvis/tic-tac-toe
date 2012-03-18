define ['board'], (Board) ->
  # easy mode just pick a random title
  move = ->
    Board.random()

  { move: move }
