define ['bean', 'bonzo', 'qwery'], (Bean, Bonzo, Qwery) ->
  freespaces = [0, 1, 2, 3, 4, 5, 6, 7, 8]

  selectedTitles = []

  # number of free spaces left
  count = ->
    freespaces.length

  isFree = (space) ->
    freespaces.has(space)

  isTaken = (space) ->
    not freespaces.has(space)

  # determine if the opponent has selected th title. takes both int and array
  has = (opponent, space) ->
    if selectedTitles[opponent]?
      if space instanceof Array
        for x in space
          return false unless selectedTitles[opponent].has(x)
        return true
      else
        return selectedTitles[opponent].has(space)

    false

  # pick a random title
  random = ->
    index = Math.round(Math.random() * (freespaces.length - 1))
    freespaces[index]

  # reset variables and game board
  reset = ->
    freespaces = [0, 1, 2, 3, 4, 5, 6, 7, 8]
    selectedTitles = []
    setup()

  # remove the space from the freespaces and push it onto the opponent's selected titles
  select = (opponent, space) ->
    if not selectedTitles[opponent]?
      selectedTitles[opponent] = []

    if isFree(space)
      selectedTitles[opponent].push(space)
      freespaces.remove(space)
      Bonzo(Qwery('td[data-title=' + space + ']')).each (element, index) ->
        Bean.remove element
        Bonzo(element).addClass(opponent)
        Bonzo(element).removeClass('hover')

      console.log ('Title ' + space + ' selected by ' + opponent)
      return true
    else
      console.log 'Illegal Move. Cheaters never prosper!'

    false

  # add mouseover events to the game board
  setup = ->
    Bonzo(Qwery('.title')).each (element, index) =>
      Bonzo(element).removeClass('user sark mcp clu')
      Bean.add element,
        'mouseover' : (e) ->
          Bonzo(e.target).addClass 'hover'
        'mouseout': (e) ->
          Bonzo(e.target).removeClass 'hover'

  {
    count: count
    isFree: isFree
    isTaken: isTaken
    has: has
    random: random
    reset: reset
    select: select
    setup: setup
  }
