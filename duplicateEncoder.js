/**
 * Duplicate Encode
 * https://www.codewars.com/kata/54b42f9314d9229fd6000d9c/javascript
 *
Description:

The goal of this exercise is to convert a string to a new string where each character in the new string is "(" if that character appears only once in the original string, or ")" if that character appears more than once in the original string. Ignore capitalization when determining if a character is a duplicate.
Examples

"din"      =>  "((("
"recede"   =>  "()()()"
"Success"  =>  ")())())"
"(( @"     =>  "))(("
 */

function duplicateEncode(word){
  const word_arr = word.toUpperCase().split('');
  const letterCounts = {};
  for (let i = 0; i < word_arr.length; i++) {
    const letter = word_arr[i];
    if (letterCounts[letter] !== undefined) letterCounts[letter]++;
    else letterCounts[letter] = 0;
  }

  const dupes_arr = [];
  for (const key in letterCounts) {
    if (letterCounts[key]) dupes_arr.push(key);
  }
  const word_set = new Set(dupes_arr);

  return word_arr.map(e => {
    if (word_set.has(e)) return ')';
    return '(';
  }).join('');
}
