/*
  https://www.codewars.com/kata/541c8630095125aba6000c00/javascript

  Digital root is the recursive sum of all the digits in a number.

  Given n, take the sum of the digits of n. If that value has more than one digit, continue reducing in this way until a single-digit number is produced. This is only applicable to the natural numbers.
*/

function digital_root(n) {
  var sum = n;
  var stringN = n + "";

  if (stringN.length > 1) {
    var arrayN = stringN.split("");
    var numberArraySum = arrayN
      .map(ea => parseInt(ea, 10))
      .reduce((soFar, now) => {return soFar + now});
    sum = digital_root(numberArraySum);
  }

  return sum;
}
