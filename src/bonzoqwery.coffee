define ['bonzo', 'qwery'], (Bonzo, Qwery) ->
  (Bonzo, Qwery) ->
    (select) ->
      return Bonzo(Qwery(select))
