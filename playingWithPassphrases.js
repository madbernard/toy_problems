/*
  Playing with passphrases
  https://www.codewars.com/kata/559536379512a64472000053/train/javascript

  Everyone knows passphrases. One can choose passphrases from poems, songs, movies names and so on but frequently they can be guessed due to common cultural references. You can get your passphrases stronger by different means. One is the following:

  choose a text in capital letters including or not digits and non alphabetic characters,

      shift each letter by a given number but the transformed letter must be a letter (circular shift),
      replace each digit by its complement to 9,
      keep such as non alphabetic and non digit characters,
      downcase each letter in odd position, upcase each letter in even position (the first character is in position 0),
      reverse the whole result.

  Example:

  your text: "BORN IN 2015!", shift 1

  1 + 2 + 3 -> "CPSO JO 7984!"

  4 "CpSo jO 7984!"

  5 "!4897 Oj oSpC"

  With longer passphrases it's better to have a small and easy program. Would you write it?
*/

function playPass(s, n) {
  let result = '';
  for (let i = s.length - 1; i > -1; i--) {
    const me = s[i];
    const numMe = parseInt(me, 10);
    const lettersOnly = /[a-zA-Z]/;
    let processed = me;

    if (me.match(lettersOnly)) {
      const sIsEven = isEven(s.length);
      const iAmEven = isEven(i);
      let iWillBeEven = false;
      if (sIsEven) {if (iAmEven) iWillBeEven = true;}
      else {iWillBeEven = iAmEven;}

      const ciphered = caesarCipher(me, n);
      processed = iWillBeEven ? ciphered.toUpperCase() : ciphered.toLowerCase();
    }
    if (!Number.isNaN(numMe)) {
      processed = (9 - +me).toString();
    }
    result = result + processed;
  }
  return result;
}

function isEven(n) { return n % 2 === 0; }

function caesarCipher(s, n) {
  const alph = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const idx = alph.indexOf(s.toUpperCase());
  const look = (idx + n) % alph.length;
  return alph[look];
}
