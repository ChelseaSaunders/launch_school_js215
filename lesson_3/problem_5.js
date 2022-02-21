"use strict"

// Implement encoding and decoding for the rail fence cipher.

// The Rail Fence cipher is a form of transposition cipher that gets its name
// from the way in which it's encoded. It was already used by the ancient
// Greeks.

// In the Rail Fence cipher, the message is written downwards on successive
// "rails" of an imaginary fence, then moving up when we get to the bottom (like
// a zig-zag). Finally the message is then read off in rows.

// For example, using three "rails" and the message "WE ARE DISCOVERED FLEE AT
// ONCE", the cipherer writes out:

// W . . . E . . . C . . . R . . . L . . . T . . . E
// . E . R . D . S . O . E . E . F . E . A . O . C .
// . . A . . . I . . . V . . . D . . . E . . . N . .


// Then reads off:

// WECRLTEERDSOEEFEAOCAIVDEN

// To decrypt a message you take the zig-zag shape and fill the ciphertext
// along the rows.

// ? . . . ? . . . ? . . . ? . . . ? . . . ? . . . ?
// . ? . ? . ? . ? . ? . ? . ? . ? . ? . ? . ? . ? .
// . . ? . . . ? . . . ? . . . ? . . . ? . . . ? . .

// The first row has seven spots that can be filled with "WECRLTE".

// W . . . E . . . C . . . R . . . L . . . T . . . E
// . ? . ? . ? . ? . ? . ? . ? . ? . ? . ? . ? . ? .
// . . ? . . . ? . . . ? . . . ? . . . ? . . . ? . .

// Now the 2nd row takes "ERDSOEEFEAOC".

// W . . . E . . . C . . . R . . . L . . . T . . . E
// . E . R . D . S . O . E . E . F . E . A . O . C .
// . . ? . . . ? . . . ? . . . ? . . . ? . . . ? . .

// Leaving "AIVDEN" for the last row.

// W . . . E . . . C . . . R . . . L . . . T . . . E
// . E . R . D . S . O . E . E . F . E . A . O . C .
// . . A . . . I . . . V . . . D . . . E . . . N . .


// If you now read along the zig-zag shape you can read the original message.

/*
PROBLEM:
Rules:
Take a message, words with spaces (other charachters?)
break the word up such that it follows the pattern of characters being sorted
into 3 rows

As we go through the letters, they are added to the three rows in the following
order (numbers are row numbers)
- 1, 2, 3, 2, 1, 2, 3, 2, 1, 2, and so on until there are no more letters.
First organize the characters this way (to be output later)
then break up the lines to look like the encoded lines as follows:
- first row starts with a letter, three spaces surrounded by dots on eithr side
  then the next letter, and so on (in this problem the row end with a letter--in
  other problems if the words are different lengths, it might end with a period
  to line up with rows below (same is true for all row endings)
- second row starts with one dot, then space, then letter, then dot, space
  letter, etc
- third row follows pattern of first row, BUT starts with a dot, space, dot space

if the three rows are not equal lengths, add spaces and dots to the other two
rows following their rules to make them long enough

print out (or return?) the coded word and the three rows

QUESTIONS:
- Should program print or return the values?
- Starting with uncoded string, corred?
- Do we need to validate input?
- What to do with empty string?
- Do we neeed to include digits (might be like "3 men headin this way")?
-

DATA:
Input: string of letters
Manipulation: arrays
Output: encrypted string of letters (uppercase, no non-letter charachters)

ALGORITHM:
Create function that takes a string as input
create empty string, encoded

Create helper function, to split the word into 3 arrays (can be stored as
  subarray in single array and reurned)
  create 3 arrays
  set "currentRow" to the first array
  declare previousRow
  iterate thruogh hte string with "if" statement
  push character to current row
  if currentRow === first || currentRow === third
    reassign previousRow to current Row
    reassign currentRow to second
  if currentRow === second && previous row is first
     reassign previousRow to current Row
    reassign currentRow to third
  if
    reassign previousRow to current Row
  reassign currentRow to first

  return an array of the three arrays (in order)

assign rows to the return of the helper function
create helper function that joins the charachters in rows and assigns them to
encoded
create helper function that splits each row of the array with appropriate
  punctuation, checks length of each row and adds punctuation accordingly

create helper function that generates output, the three rows of the array and
the  encoded string
reurn the encoded string

*/

function railFenceCipher(secretMessage) {
  let cleanedMessage =  secretMessage.replace(/[^a-z]/gi, '').toUpperCase();
  if (cleanedMessage.length === 0) return '';

  let encodedWordArray = encryptCharachters(cleanedMessage);
  let encodedWord = encryptWord(encodedWordArray);
  let decypheredString = decypher(encodedWordArray);

  return encodedWord + '\n\n' + decypheredString;
}

function encryptCharachters(messageString) {
  let firstRow = [];
  let secondRow = [];
  let thirdRow = []
  let currentRow = firstRow;
  let previousRow;

  for (let i = 0; i < messageString.length; i += 1) {
    currentRow.push(messageString.charAt(i));

    if (currentRow === firstRow || currentRow === thirdRow) {
      [previousRow, currentRow] = [currentRow, secondRow]

    } else if (previousRow === firstRow) {
      [previousRow, currentRow] = [currentRow, thirdRow];
    } else {
      [previousRow, currentRow] = [currentRow, firstRow];
    }
  }

  return [firstRow, secondRow, thirdRow];
}

function encryptWord(encodedArray) {
  return encodedArray.map((row) => row.join('')).join('')
}

function decypher(encodedArray) {
  if (findEmptyRows(encodedArray)) return formatPartialCode(encodedArray);

  encodedArray[0] = encodedArray[0].join(' . . . ');
  encodedArray[1] = '. ' + encodedArray[1].join(' . ');
  encodedArray[2] = '. . ' + encodedArray[2].join(' . . . ');

  encodedArray = formatEvenRows(encodedArray);

  return encodedArray;
}

function findEmptyRows(secretArray) {
  return secretArray.some((row) => row.length === 0);
}

function formatPartialCode(secretArray) {
  if (secretArray[1].length === 0) {
    return secretArray[0].join('');
  } else if (secretArray[2].length === 0) {
    secretArray[0] = secretArray[0] + (' .');
    secretArray[1] = '. ' + secretArray[1];
    secretArray.length = 2;
    return secretArray.join('\n');
  }
}

function formatEvenRows(secretArray) {
  let firstRowLength = secretArray[0].length;
  let secondRowLength = secretArray[1].length;
  let thirdRowLength = secretArray[2].length;

  let longest = [firstRowLength,
                secondRowLength,
                thirdRowLength].sort((a, b) => b - a)[0];

  secretArray =  secretArray.map((row) => {
                                           while (row.length < longest) {
                                              row += ' .'
                                            };
                                           return row;
                                           });
  return secretArray.join('\n');
}

console.log(railFenceCipher("WE ARE DISCOVERED FLEE AT ONCE")); // "WECRLTEERDSOEEFEAOCAIVDEN"
console.log(railFenceCipher("OH HI MARK")); // OMHIAKHR
console.log(railFenceCipher("oh hi mark")); // OMHIAKHR
console.log(railFenceCipher("oh hi! mark!!!")); // OMHIAKHR
console.log(railFenceCipher('')); // ''
console.log(railFenceCipher('0')); // '
console.log(railFenceCipher('A')) // A (rows below should still have dots)
console.log(railFenceCipher('AB')) // AB (row below should still have dots)
console.log(railFenceCipher('ABC')) //ABC