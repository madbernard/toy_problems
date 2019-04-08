/*
  Task

  Your task in the kata is to determine how many boats are sunk damaged and untouched from a set amount of attacks. You will need to create a function that takes two arguments, the playing board and the attacks.

  Boats are placed either horizontally, vertically or diagonally on the board. 0 represents a space not occupied by a boat. Digits 1-3 represent boats which vary in length 1-4 spaces long. There will always be at least 1 boat up to a maximum of 3 in any one game. Boat sizes and board dimentions will vary from game to game.
  Attacks

  Attacks are calculated from the bottom left, first the X coordinate then the Y. There will be at least one attack per game, and the array will not contain duplicates.

  [[2, 1], [1, 3], [4, 2]];

  First attack      `[2, 1]` = `3`
  Second attack `[1, 3]` = `0`
  Third attack     `[4, 2]` = `1`
  Function Initialization

  board = [[0,0,0,2,2,0],
           [0,3,0,0,0,0],
           [0,3,0,1,0,0],
           [0,3,0,1,0,0]];
  attacks = [[2, 1], [1, 3], [4, 2]];
  damagedOrSunk(board, attacks);

  Scoring
  1 point for every whole boat sank.
  0.5 points for each boat hit at least once (not including boats that are sunk).
  -1 point for each whole boat that was not hit at least once.
  Sunk or Damaged
  `sunk` = all boats that are sunk
  `damaged` = all boats that have been hit at least once but not sunk
  `notTouched/not_touched` = all boats that have not been hit at least once
  Output

  You should return a hash with the following data

  `sunk`, `damaged`, `notTouched`, `points`

  Example Game Output

  In our above example..
  First attack: `boat 3` was damaged, which increases the `points` by `0.5`
  Second attack: miss nothing happens
  Third attack: `boat 1` was damaged, which increases the `points` by `0.5`
  `boat 2` was untouched so `points -1` and `notTouched +1` in Javascript/Java/C# and `not_touched +1` in Python/Ruby.
  No whole boats sank
  Return Hash
*/

function damagedOrSunk (board, attacks) {
  var conclusion = { sunk: 0, damaged: 0, notTouched: 0, points: 0 }

  // initial note of ships and their sizes
  var flat = board.reduce((acc, val) => acc.concat(val), []);
  var shipInfo = {};
  flat.forEach(function(point){
    if (!point) return;
    if (shipInfo[point]) shipInfo[point]++;
    else shipInfo[point] = 1;
  });

  // go through attacks
  attacks.forEach(function(xy) {
    var x = xy[0] - 1;
    var y = xy[1];
    // set board at xy to 0
    var row = board[board.length - y];
    row[x] = 0;
  });

  // final note of ships and their sizes
  var flat2 = board.reduce((acc, val) => acc.concat(val), []);
  var final = {};
  flat2.forEach(function(point){
    if (!point) return;
    if (final[point]) final[point]++;
    else final[point] = 1;
  });

  // compare initial and final state of board
  for (var key in shipInfo) {
    if (!final[key]) conclusion.sunk++;
    else if (final[key] < shipInfo[key]) conclusion.damaged++;
    else conclusion.notTouched++;
  }

  // calculate score
  conclusion.points = conclusion.sunk + conclusion.damaged/2 - conclusion.notTouched;
  return conclusion;
}
