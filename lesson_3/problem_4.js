"use strict"

// You are given a list of numbers in a "short-hand" range where only the
// significant part of the next number is written because we know the numbers
// are always increasing (ex. "1, 3, 7, 2, 4, 1" represents
// [1, 3, 7, 12, 14, 21]). Some people use different separators for their
// ranges (ex. "1-3, 1-2", "1:3, 1:2", "1..3, 1..2" represent the same numbers
// [1, 2, 3, 11, 12]). Range limits are always inclusive.

// Your job is to return a list of complete numbers.

// The possible separators are: ["-", ":", ".."]

/*
PROBLEM:
- Take a string that consists of separator characters (,-:..) and numbers and
convert it to a series of numbers in which every number is greater than the
- The digits represent only the last digit(s) of the full number
- All numbers are greater than the previous number in the string (before the
separator)
- If the separator is '-', ':', or '..' the numbers on either side represent an
  inclusive range, so every number beween the first and last number, including
  the first and last number should be added
- return an array with partial numbers replaced with full numbers where needed,
  and ranges filled in where needed
- when range is followed by another range, start with next number (see example
  below) and end in inclusive number

ASSUMPTIONS
- when range is longer than 5 numbers (inclusive), AND  final number is less
  than, with 500, set replace numbers in between first and last with "... "
  prepended to the last number in range
- when the above conditions are true, but the last number in range is > 500,
  prepend '..' instead


EXAMPLES:
Example 1:

"1, 3, 7, 2, 4, 1" -->
1, 3, 7, 12, 14, 21
// 1, 3, 7 (all greater than the previous # without manipulation)
// 12 (next greatest number after previous number 7 that ends in the original
      digit, 2)
// 14 (next greatest number after previous modified number, 12 that ends in
      original digit 4)
// 21 (next greatest number after previous modified number, 15 that ends in
      original digit 1)

Example 2:
"1-3, 1-2" -->
1, 2, 3, 11, 12
// 1, 2, 3 (range of numbers from original numbers 1 and 3, separated by -)
// 11, 12 (range of numbers from original numbers 1 and 3 separated by , BUT
          starting from 11, next highest number after previous number 3 that
          ends in original digit 1)

Example 3:
"1:5:2" -->
1, 2, 3, 4, 5, 6, ... 12

// 1, 2, 3, 4, 5 makes sense--it is the range;
// 6 ... 12

Example 4:
"104-2" -->
104, 105, ... 112


    // "104-02" --> 104, 105, ... 202
    // "545, 64:11" --> 545, 564, 565, .. 611


Questions:
Need to validate input?
Return IS array of numbers?
Negative numbers--but seems like it would work the same

DATA:
INPUT: string of numbers and separators
MANIPULATION(?):
OUTPUT: array of numbers

ALGO:
- create function that takes string of numbers as input
prepare string for iteration:
- "clean" out any characters other than digits or the listed separators
- split by character
- create currentValues; assign to return of helper function below
    - set current val to empty string
    -iterate through characters array
        add character to currentVal
        if character is separator (use regex match) or last index
        add currentVal to values
        reassign current val to epmty string

iterate through CurrentValues

- set trackCurrentTens to 1
- set completedNumbers to parseInt(currentValues[0])

- let currentNum equal the current value, w/o separators parseNum
- let separator = previous index value setripped of numbers
- let lastNum = completedNumbers index - 1
- let nextNum equal helper method completeCurrentNum(previousNum, currenNum)

      currentNum = parseInt currentNum
      nextNum = p

- return completedNumbers
*/

function completeNumbers(numString) {
  let currentValues =  generateNumStringArray(numString);
  let completedNumbers = [parseInt(currentValues[0], 10)];

  for (let i = 1; i < currentValues.length; i += 1) {
    let currentNum = currentValues[i];
    let previousNum = completedNumbers[i - 1];
    currentNum = convertToNumber(currentNum, previousNum);
    // let separator = currentValues[i].match((/(,|:|\-|\.\.)/).join(''));

    currentNum = completeCurrentNum(currentNum, previousNum);

    completedNumbers.push(currentNum);
  }

  return completedNumbers;
}

function convertToNumber(num, prevNum) {
  if (num[0] !== '0') {
    return parseInt(num, 10);
  } else {
    return adjustDigits(num, prevNum);
  }
}

function adjustDigits(num, prevNum) {
  num = String(num);
  prevNum = String(prevNum);

  let differentLength = prevNum.length - num.length;

  if (differentLength <= 0) {
    num = '1' + num;
    return parseInt(num, 10);
  }

  let prepend = prevNum.slice(0, (differentLength));
  num = prepend + num;

  while (parseInt(num, 10) <= parseInt(prevNum, 10)) {
    prepend = String(parseInt(prepend, 10) + 1);
    num = prepend + num.slice(1);
  }

  return parseInt(num, 10);
}

function generateNumStringArray(numString) {
  let cleanString = numString.match(/(,|:|\-|\.\.|[0-9])/g).join('');
  let values = [];
  let currentValue = '';

  for (let i = 0; i < cleanString.length; i += 1) {
    let currentChar = cleanString[i];
    currentValue += currentChar;

    if (currentChar.match(/(,|:|\-|\.\.)/) || i === cleanString.length - 1) {
      values.push(currentValue);
      currentValue = '';
    }
  }

  return values;
}

function completeCurrentNum(num, prevNum) {
  if (num > prevNum) return num;
  num = adjustDigits(num, prevNum);

  // while (num <= prevNum) {
  //   num += 10;
  // }

  return num;
}

// console.log(completeNumbers("1, 3, 7, 2, 4, 1"));   // 1, 3, 7, 12, 14, 21
// console.log(completeNumbers("1-3, 1-2"));           // 1, 2, 3, 11, 12
// console.log(completeNumbers("1:5:2"));              // 1, 2, 3, 4, 5, 6, ... 12
console.log(completeNumbers("104-2"));              // 104, 105, ... 112
// console.log(completeNumbers("104-02"));             // 104, 105, ... 202
// console.log(completeNumbers("545, 64:11"));         // 545, 564, 565, .. 611
