/*
  https://www.codewars.com/kata/advanced-pig-latin/javascript

  Description:

  Pig latin is created by taking all the consonants before the first vowel of a word and moving them to the back of the word followed by the letters "ay".

  "hello" => "ellohay"
  "creating" => "eatingcray"

  If the first letter of the word is a vowel, the string is left the same and the letters "way" are appended to the end.

  "algorithm" => "algorithmway"

  This problem is different from other variations in that it expects casing to remain the same so:

  "Hello World" => "Ellohay Orldway"

  as well as punctuation.

  "Pizza? Yes please!" => "Izzapay? Esyay easeplay!"

  Your job is to take a string and translate it to Pig Latin. The string will never be undefined but may contain both numbers and letters. A word will never be a combination of numbers and letters. Also, there will never be punctuation at the beginning of a word and the only capital letter in a word will be the first letter meaning there are zero all capitalized words.
*/
function translate(sentence) {
  return sentence.split(' ').map(pigLatin).join(' ');
};

function pigLatin(word) {
  var vowelStart = /^[aeiou]/i;
  var consonantsStart = /^[^aeiou]+/ig
  var upperCaseStart = /^[A-Z]/;
  var nonWordEnd = /\W+$/;
  var pl = '', reArr, endArr, end = '';

  if ( (endArr = nonWordEnd.exec(word)) !== null ) {
    end = endArr[0];
    word = word.replace(nonWordEnd, '');
  }

  if (vowelStart.test(word)) return word + 'way' + end;

  if ( (reArr = consonantsStart.exec(word)) !== null ) {
    pl = word.substring(consonantsStart.lastIndex) + reArr[0] + 'ay';
  }

  if (upperCaseStart.test(word)) {
    pl = pl.toLowerCase();
    pl = pl[0].toUpperCase() + pl.substring(1);
  }

  return pl + end || word + end;
}
