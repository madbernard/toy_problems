/*
  Given an array of integers of any length, return an array that has 1 added to the value represented by the array.

    the array can't be empty
    only non-negative, single digit integers are allowed

  Return nil (or your language's equivalent) for invalid inputs.
  Examples

  For example the array [2, 3, 9] equals 239, adding one would return the array [2, 4, 0].

  [4, 3, 2, 5] would return [4, 3, 2, 6]
*/
function upArray(arr){
  var result = null;
  // if array qualifies
  if (arr.length > 0 && arr.every(isPositiveSingleInt)){
    result = (parseInt(arr.join(''), 10) + 1).toString().split('').map(Number);
  }
  return result;
}

function isPositiveSingleInt(elem) {
  return elem > -1 && elem < 10 && (elem).toString().match(/\./) === null;
}

// Failed on Expected: '[9, 2, 2, 3, 3, 7, 2, 0, 3, 6, 8, 5, 4, 7, 7, 5, 8, 0, 8]', instead got: '[9, 2, 2, 3, 3, 7, 2, 0, 3, 6, 8, 5, 4, 7, 7, 6, 0, 0, 0]'
// Expected: '[9, 2, 2, 3, 3, 7, 2, 0, 3, 6, 8, 5, 4, 7, 7, 5, 8, 0, 7, 5, 3, 2, 6, 7, 8, 4, 2, 4, 2, 6, 7, 8, 7, 4, 5, 2, 2]', instead got: '[9, NaN, 2, 2, 3, 3, 7, 2, 0, 3, 6, 8, 5, 4, 7, 7, 6, NaN, NaN, 3, 6]'

// next try =
function upArray(arr){
  var result = null;
  // if array qualifies
  if ( arr.length > 0 && arr.every(isPositiveSingleInt) ) {
    for (var i = arr.length - 1; i > -1; i--) {
      arr[i]++;

      if (arr[i] < 9) break;

      arr[i] = 0;

      if (arr[i - i] !== undefined) {
        arr[i - 1]++;
      }
    }

    if (arr[0] === 0) {arr.unshift(1);}

    result = arr;
  }
  return result;
}

function isPositiveSingleInt(elem) {
  return elem > -1 && elem < 10 && (elem).toString().match(/\./) === null;
}

// Failed on Expected: '[5, 0, 8, 7, 8, 6, 2, 5, 0, 0, 6, 8, 2, 0]', instead got: '[5, 0, 8, 7, 8, 6, 2, 5, 0, 0, 6, 8, 3, 0]'
// ...also Expected: '[1, 3, 7, 8, 1, 4, 0, 9, 7, 8, 5, 6, 2, 9]', instead got: '[1, 3, 7, 8, 1, 4, 0, 9, 7, 8, 5, 6, 3, 0]'

function upArray(arr){
  var result = null;
  // if array qualifies
  if (arr.length > 0 && arr.every(isPositiveSingleInt)){
    for (var i = arr.length - 1; i > -1; i--) {
      arr[i]++;
      if (arr[i] < 10) break;
      arr[i] = 0;
      if (arr[i - i] !== undefined) {
        arr[i - 1]++;
        if (arr[i - 1] < 10) break;
      }
    }

    if (arr[0] === 0) {arr.unshift(1);}

    result = arr;
  }
  return result;
}

function isPositiveSingleInt(elem) {
  return elem > -1 && elem < 10 && (elem).toString().match(/\./) === null;
}