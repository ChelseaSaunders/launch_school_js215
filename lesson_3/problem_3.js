"use strict"

// A collection of spelling blocks has two letters per block, as shown in this
// list:

// B:O   X:K   D:Q   C:P   N:A
// G:T   R:E   F:S   J:W   H:U
// V:I   L:Y   Z:M

// This limits the words you can spell with the blocks to only those words that
// do not use both letters from any given block. You can also only use each
// block once.

// Write a function that takes a word string as an argument, and returns true if
// the word can be spelled using the set of blocks, or false otherwise. You can
// consider the letters to be case-insensitive when you apply the rules.

/*
PROBLEM
RULES
letters are paired together in "blocks"
words can only contain one of the letters from each pair; (and a letter pair
can be used only once)
take a word and determine if it meets the above rules
- implicit: solution must not be case sensitive

Questions:
- do we need to validate input?
- what to do with empty strings?
- what to do with non-letter characters

EDGE CASES:

DATA:
Input: string
Manipulation:
- use array of arrays to store letter pairs
Output: boolean

ALGO:
create function that takes string as input
use .replace to replace any non-alpha chars with empty string

use constant with array of arrays of char pairs
create alpha string of each alpha char
create for loop that iterates through indexes of string.
--create for loop that iterates through the array of chars
--if alpha string does not include char, return false


*/
const LETTER_BLOCKS = [['B', 'O'], ['X', 'K'], ['D','Q'], ['C', 'P'],
['N', 'A'], ['G', 'T'], ['R', 'E'], ['F', 'S'],
['J', 'W'], ['H', 'U'], ['V', 'I'], ['L', 'Y'],
['Z', 'M']];

function isBlockWord(word) {
  let alphabet = 'ABCDEFGHIJKLMNOPQRSTUVQXYZ';
  word = cleanUpperString(word);

  if (word.length === 0) return false;

  for (let i = 0; i < word.length; i += 1) {
    let char = word[i];
    if (!alphabet.includes(char)) return false;

    LETTER_BLOCKS.forEach((letterSubArr) => {
      if (letterSubArr.includes(char)) {
        alphabet = alphabet.replace(letterSubArr[0], '');
        alphabet = alphabet.replace(letterSubArr[1], '');
      }
    });
  }

  return true;
}

function cleanUpperString(string){
  return string.replace(/[^a-z]/gi, '').toUpperCase();
}

console.log(isBlockWord('BATCH'));      // true
console.log(isBlockWord('BUTCH'));      // false
console.log(isBlockWord('jest'));       // true
console.log(isBlockWord('BBATCH'));     // false
console.log(isBlockWord('   BATCH'));  // true
console.log(isBlockWord('BATCH    '));  // true
console.log(isBlockWord('B ATCH'));    // true
console.log(isBlockWord('B A T C H')); // true
console.log(isBlockWord('')); // false
console.log(isBlockWord('0')); // false
console.log(isBlockWord('a')); // true
