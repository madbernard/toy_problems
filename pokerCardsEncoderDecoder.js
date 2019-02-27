/*
  You are going to write a simple function - decoder/encoder for poker cards (any card game in fact).
  Your task is to encode array of human readable symbols to array of codes or decode it doing this process with reversed way.

  ['Ac', 'Ks', '5h', 'Td', '3c'] -> [0, 2 ,22, 30, 51] //encoding
  [0, 51, 30, 22, 2] -> ['Ac', '3c', 'Td', '5h', 'Ks'] //decoding

  Remember that the returned array must be sorted from lowest to highest code (or its symbol value).

  Card suits:

  name    |  symbol   |  precedence
  ---------------------------------
  club          c            0
  diamond       d            1
  heart         h            2
  spade         s            3

  52-card deck:


    c    |     d     |    h     |    s
  ---------------------------------------
   0: A      13: A      26: A      39: A
   1: 2      14: 2      27: 2      40: 2
   2: 3      15: 3      28: 3      41: 3
   3: 4      16: 4      29: 4      42: 4
   4: 5      17: 5      30: 5      43: 5
   5: 6      18: 6      31: 6      44: 6
   6: 7      19: 7      32: 7      45: 7
   7: 8      20: 8      33: 8      46: 8
   8: 9      21: 9      34: 9      47: 9
   9: T      22: T      35: T      48: T
  10: J      23: J      36: J      49: J
  11: Q      24: Q      37: Q      50: Q
  12: K      25: K      38: K      51: K

  Requirements
  input: array of strings (symbols)/integers (codes) you must encode/decode
  output: array of integers (codes)/strings (symbols) sorted by code values ASC
*/
var list = 'Ac,2c,3c,4c,5c,6c,7c,8c,9c,Tc,Jc,Qc,Kc,Ad,2d,3d,4d,5d,6d,7d,8d,9d,Td,Jd,Qd,Kd,Ah,2h,3h,4h,5h,6h,7h,8h,9h,Th,Jh,Qh,Kh,As,2s,3s,4s,5s,6s,7s,8s,9s,Ts,Js,Qs,Ks';
var order = list.split(',');

function cardsConverter(input){
  if (!Array.isArray(input)) {return null;}
  if (!input.length) {return [];}
  if (typeof input[0] === 'number') {return sortByCard(input.sort(tinyNumberFirst));}
  return sortByIndex(input);
}

function sortByIndex(input) {
  // input is an array of card name strings to convert to their number
  return input.map(function(e){
    return order.indexOf(e);
  }).sort(tinyNumberFirst);
}

function sortByCard(input) {
  // input is an array of numbers to convert to their card name string
  return input.map(function(e){return order[e]});
}

function tinyNumberFirst(a, b) {
  return a - b;
}
