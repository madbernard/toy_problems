/*
  https://www.codewars.com/kata/identifying-top-users-and-their-corresponding-purchases-on-a-website/javascript

  Identifying Top Users and their Corresponding Purchases On a Website

  A website named "All for Five", sells many products to registered clients that cost all the same (5 dollars, the price is not relevant). Every user receives an alphanumeric id code, like D085. The page tracks all the purchases, that the clients do. For each purchase of a certain client, his/her id user will be registered once.

  You will be given an uncertain number of arrays that contains strings (the id code users). Each array will represent the purchases that the users do in a month. You should find the total number of purchases of the users that have bought in all the given months (the clients that their id code are present in all the arrays). e.g.:

  a1 = ['A042', 'B004', 'A025', 'A042', 'C025']
  a2 = ['B009', 'B040', 'B004', 'A042', 'A025', 'A042']
  a3 = ['A042', 'A025', 'B004']

  The result will be:

  'A042'---> 5 times
  'A025'---> 3 times
  'B004'---> 3 times

  It may be that not even a single user has purchased in all the months

  a1 = ['A043', 'B004', 'A025', 'A042', 'C025']
  a2 = ['B009', 'B040', 'B003', 'A042', 'A027', 'A044']
  a3 = ['A041', 'A026', 'B005']

  Even though '0042' is present in two arrays, is not present in all the arrays.

  The function that solves this challenge will be called as: id_best_users().

  The entries of the function and the output for the cases above will be:

  a1 = ['A042', 'B004', 'A025', 'A042', 'C025']
  a2 = ['B009', 'B040', 'B004', 'A042', 'A025', 'A042']
  a3 = ['A042', 'A025', 'B004']
  id_best_users(a1, a2, a3) == [[5, ['A042']], [3, ['A025', 'B004']]]

  a1 = ['A043', 'B004', 'A025', 'A042', 'C025']
  a2 = ['B009', 'B040', 'B003', 'A042', 'A027', 'A044']
  a3 = ['A041', 'A026', 'B005']
  id_best_users(a1, a2, a3) == []

  As you can see the output will have the total number of purchases in decreasing order. If two users have the same amount of total purchases, they will be sorted by their id user string value.

  More examples will be given in the example tests.

  Features of the Random Tests:

  Low Performance Tests
  maximum amount of users: 200
  maximum number of months: 8
  maximum amount of purchases per month: 100

  High Performance Tests
  maximum amount of users: 90000
  maximum number of months: 12
  maximum amount of purchases per month: 80000

  Enjoy it!!
*/

// works, but too slowly
function idBestUsers(...usersByMonth) {
  var store = {};

  usersByMonth.forEach( (arr, idx) => {
    // get single character that is convertible to number
    var letter = String.fromCodePoint(65 + idx);

    // all qualified users will exist in month 0
    if (idx === 0) {
      arr.forEach( entry => {
        if (store[entry]) {
          store[entry].purchases++;
        } else {
          store[entry] = { purchases: 1, months: letter};
        }
      });
    }
    else {
      arr.forEach( (entry, i) => {
        if (store[entry]) {
          var previousMonthPurchased = store[entry].months.slice(-1);
          if (letter.charCodeAt(0) - previousMonthPurchased.charCodeAt(0) === 1) {
            store[entry].purchases++;
            // if it's the last entry from this user in this month, note month
            if (arr.indexOf(entry, i + 1) === -1) {
              store[entry].months = store[entry].months + letter;
            }
          }
          else delete store[entry];
        }
      });
    }
  });

  var best = {};
  // now we have an object with all the user IDs as keys and their purchases counted
  for (var id in store) {
    if (store[id].months.length === usersByMonth.length) {
      var numberOfPurchases = store[id].purchases;
      best[numberOfPurchases] ?
        best[numberOfPurchases].push(id) :
        best[numberOfPurchases] = [id];
    }
  }

  // now we have an object with keys that are string numbers
  // and values that are an array of the user IDs that hit that number of purchases
  var sorted = Object.keys(best).map( k => Number(k) ).sort((a, b) => b - a);

  return sorted.map(num => {
    return [num, best[num].sort()];
  });
}

// second try is quick enough!
function idBestUsers(...usersByMonth) {
  var shortestSetSize = Infinity;
  var smallestSet;
  var sets = {};
  usersByMonth.forEach( (arr, idx) => {
    var set = new Set(arr);
    if (set.size < shortestSetSize) {
      shortestSetSize = set.size;
      smallestSet = set;
    }
    sets[idx] = set;
  });

  smallestSet.forEach(id => {
    for (let i = 0; i < usersByMonth.length; i++) {
      if (!sets[i].has(id)) {
        smallestSet.delete(id);
      }
    }
  });

  var test = usersByMonth.reduce((acc, val) => acc.concat(val), []).filter(id => smallestSet.has(id)).sort();

  var stash = {};

  var count = 1;
  for (let i = 0; i < test.length; i++) {
    var id = test[i];
    if (id === test[i+1]) {count++;}
    else {
      stash[count] ? stash[count].push(id) : stash[count] = [id];
      count = 1;
    }
  }

  return Object.keys(stash).map( num => Number(num)).sort((a, b) => b - a).map( num => [num, stash[num]]);
}
