define ['board'], (Board) ->
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

  # pick a move.
  move = ->
    position = -1

    # find the winning combo
    for combo in winning_combos
      if Board.has('mcp', combo[0]) && Board.has('mcp', combo[1]) && Board.isFree(combo[2])
        position = combo[2]
        break
      else if Board.isFree(combo[0]) && Board.has('mcp', combo[1]) && Board.has('mcp', combo[2])
        position = combo[0]
        break
      else if Board.has('mcp', combo[0]) && Board.isFree(combo[1]) && Board.has('mcp', combo[2])
        position = combo[1]
        break

    # see if there is a title that will block the user from winning
    if position is -1
      for combo in winning_combos
        if Board.has('user', combo[0]) && Board.has('user', combo[1]) && Board.isFree(combo[2])
          position = combo[2]
          break
        else if Board.isFree(combo[0]) && Board.has('user', combo[1]) && Board.has('user', combo[2])
          position = combo[0]
          break
        else if Board.has('user', combo[0]) && Board.isFree(combo[1]) && Board.has('user', combo[2])
          position = combo[1]
          break

    # middle title is the best move
    if position is -1 and Board.isFree(4)
      position = 4

    # no good move so might as well be random
    if position is -1
      position = Board.random()

    position

  { move: move }
