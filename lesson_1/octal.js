"use strict"

// Write a Function named octalToDecimal that performs octal to decimal
// conversion. When invoked on a String that contains the representation of an
// octal number, the Function returns a decimal version of that value as a
// Number. Implement the conversion yourself: do not use something else to
// perform the conversion for you.

// Decimal, the numbering system we're most familiar with, is a base-10 system.
// You can understand the number 233 in base 10 notation as a linear combination
// of powers of 10:

//     The rightmost digit gets multiplied by 100 = 1
//     The next number gets multiplied by 101 = 10
//     ...
//     The nth number gets multiplied by 10n-1
//     All these values are summed

// Here is an example:

//   233                         // decimal
// = 2*10^2 + 3*10^1 + 3*10^0
// = 2*100  + 3*10   + 3*1

// Octal works in a similar way, but uses powers of 8 rather than powers of 10
// (and is called a base-8 system as a result):

//   233                          // octal
// = 2*8^2 + 3*8^1 + 3*8^0
// = 2*64  + 3*8   + 3*1
// = 128   + 24    + 3
// = 155                          // decimal

/*

DATA: input:
string of number chars in base-8
output: number, base 10

ABSTRACION:


ALGO:
split string into numbers array
reverse array
map over array with el's as numbers * 8 ^ index
reduce


*/

function octalToDecimal(numberString) {
  return numberString.split('').reverse().map((num, index) => {
    return parseInt(num, 10) * (8 ** index);
  }).reduce((total, currentNum) => total + currentNum);
}

console.log(octalToDecimal('1'));           // 1
console.log(octalToDecimal('10'));          // 8
console.log(octalToDecimal('130'));         // 88
console.log(octalToDecimal('17'));          // 15
console.log(octalToDecimal('2047'));        // 1063
console.log(octalToDecimal('011'));         // 9