/*
  Here, I'm commenting on le_m's Stack Overflow implementation of the quickest permutation algorithm, Heap's.
  https://stackoverflow.com/questions/9960908/permutations-in-javascript/37580979#37580979
  The renaming is happening as I come to understand it.
*/
// returns an array of the possible combos. mixThis is an array.
function permute(mixThis) {
  var length = mixThis.length,
      result = [mixThis.slice()], // include original order as first element of result
      controlArray = new Array(length).fill(0),
      i = 1,
      k,
      temp;

  while (i < length) {
    if (controlArray[i] < i) { /*
      1st: 0 is less than 1. Swap mixthis 1 and 0.
      2nd: 1 is not less than 1, set controlArray at 1 to 0, i is now 2,
      3rd: 0 (controlArray[2]) is less than 2. Swap mixthis 2 and 0. i becomes 1.
      4th: 1 is less than 2. Swap mixthis 2 and 1. i remains 1.
      5th: controlArray at 2 becomes 2...  set it to 0, i becomes 2.
      */
      k = i % 2 && controlArray[i]; // 'k' is 1 if i is odd and controlArray[i] contains 1, 0 if i is even
      temp = mixThis[i]; // store the element in question
      mixThis[i] = mixThis[k]; // replace the element in question with the first element of the array of interest, at first run, and nth element of array of interest if we've built up n strings so far
      mixThis[k] = temp; // complete the swap, where the element of interest moves to either the first or second place in the array of interest
      ++controlArray[i]; // controlArray at this index (1, to start with) is truthy now
      i = 1; // i is one?  why would it ever not be 1?
      result.push(mixThis.slice()); // only add to result when controlArray is 0 at i
    } else {
      controlArray[i] = 0; // every other time through this controlArray[i] is 0
      ++i; // i gains in length, and is reset to 1 the first time at each element of interest (because controlArray begins at 0 and only becomes 1 once )
    }
  }
  return result;
}

/*
  These investigations were inspired by:
  https://www.codewars.com/kata/5865a407b359c45982000036/train/javascript

  All Star Code Challenge #19

  You work for an ad agency and your boss, Bob, loves a catchy slogan. He's always jumbling together "buzz" words until he gets one he likes. You're looking to impress Boss Bob with a function that can do his job for him.

  Create a function called sloganMaker() that accepts an array of string "buzz" words. The function returns an array of all possible UNIQUE string permutations of the buzz words (concatonated and separated by spaces).

  Your boss is not very bright, so anticipate him using the same "buzz" word more than once, by accident. The function should ignore these duplicate string inputs.

  sloganMaker(["super", "hot", "guacamole"]);
  //[ 'super hot guacamole',
  //  'super guacamole hot',
  //  'hot super guacamole',
  //  'hot guacamole super',
  //  'guacamole super hot',
  //  'guacamole hot super' ]

  sloganMaker(["cool", "pizza", "cool"]); // => [ 'cool pizza', 'pizza cool' ]

  Note:
  There should be NO duplicate strings in the output array The input array MAY contain duplicate strings, which should STILL result in an output array with all unique strings An empty string is valid input
  The order of the permutations in the output array does not matter
*/
var sloganMaker = function(array){
  var set = new Set(array);
  var test = [...set];
  var results = permute(test);
  return results.map(arr => arr.join(' '));
}

function permute(arr) {
  var permutations = [];
  permutations.push(arr.slice());
  var control = new Array(arr.length).fill(0);
  var i = 1, temp, wobbler;

  while (i < arr.length) {
    if (control[i] < i) {
      wobbler = i % 2 && control[i];

      temp = arr[i];
      arr[i] = arr[wobbler];
      arr[wobbler] = temp;

      ++control[i];
      i = 1;
      permutations.push(arr.slice());
    }
    else {
      control[i] = 0;
      ++i;
    }
  }

  return permutations;
}
