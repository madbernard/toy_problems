/*
  Your distributeEvenly function will take an array as an argument and needs to return a new array with the values distributed evenly.

  Example:

  Argument: ['one', 'one', 'two', 'two', 'three', 'three', 'four', 'four']

  Result: ['one', 'two', 'three', 'four', 'one', 'two', 'three', 'four']

  The underlying order will stay the same as in the original array. So in the case of our argument above, one comes before two so it stays this way in the returned array.

  The aim is to have the longest possible chain of evenly distributed values (from the left to right), this means that an argument with many of the same elements might have many which are repeated at the end.

  Example:

  Argument: ['one', 'one', 'one', 'one', 'one', 'two', 'three']

  Result: [ 'one', 'two', 'three', 'one', 'one', 'one', 'one' ]
*/
const distributeEvenly = (array) => {
  var result = [];
  var ref = {};
  var set = new Set(array);
  // load reference object with # of occurrences
  array.forEach(function(el){
    if (!ref[el]) {
    ref[el] = 1;}
    else {ref[el]++;}
  });
  // when we've used all the things delete from set, otherwise cycle through set
  while (set.size) {
    for (let thing of set) {
      if (ref[thing] > 0) {
        result.push(thing);
        ref[thing]--;
        if (!ref[thing]) {set.delete(thing);}
      }
    }
  }
  return result;
};
