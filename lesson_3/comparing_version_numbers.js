"use strict"

// To look at the steps of this problem solving approach in depth, we will work
// through a problem and see how to apply each step in the process. The problem
// we will look at compares software version numbers.

// While version numbers often appear to be decimal numbers, they are, in fact,
// a convenient notation for a more complicated number system. The following are
// all legal version numbers:

// 1
// 1.0
// 1.2
// 3.2.3
// 3.0.0
// 4.2.3.0

// Write a function that takes any two version numbers in this format and
// compares them, with the result of this comparison showing whether the first
// is less than, equal to, or greater than the second version:

//     If version1 > version2, we should return 1.
//     If version1 < version2, we should return -1.
//     If version1 === version2, we should return 0.
//     If either version number contains characters other than digits and the .
//     character, we should return null.

// Here is an example of version number ordering:

// 0.1 < 1 = 1.0 < 1.1 < 1.2 = 1.2.0.0 < 1.18.2 < 13.37

/*
Problem:
take two input strings (must be strings bc those aren't valid numbers)
- if either string consists of chars other than numbers or '.' return nil
determine whether value 1 is greater than value 2
- if both values are the same then return 0
- compare numbers beginning with the first number before the "."
  - if one is greater, then the value is greater
  - if both are the same, then compare the next set of values, and so on until
    one is greater, or you have determined they are equal
- if one is shorter than the oher, and they are equal up until the point where
  the shorter one terminates, then the longer one is greater

DATA:
input: string
work with: arr
compare as numbers inside of array
return numbers or null
tricky part is sort function

algo:
split both strings into arr's with '.' as delmiter;
"clean" with loop to pop out last index values that are 0;
compare two "clean" arrays, rejoined as strings with '.' as delimeter, to
seeif they are equal; return 0 if true

iterate thruogh version 1 with for loop and index less than version 1 length;
if index is greater than version2.length 1 -return 1 (this accounts for
  situations where the beginning of two versions is the same, but version 1 has
  extra elements and therefore is greater)
assign variables to the explicit conversion of each value to integer
(version1[index] and version2[index]), using parseInt and base 10
if number1 > number2 return 1
if numbrt2 > numbrt1 return -1

return -1 --this accounts for if the two versions are the same but the second
is longer (thus the loop which terminates at the end of version1's length will
have stopped executing without identifying a greater version)
*/

function compareVersions(version1, version2) {
  if (version1.match(/[^0-9.]/) || version2.match(/[^0-9.]/)) return null;

  version1 = formatVersionArray(version1);
  version2 = formatVersionArray(version2);

  if (checkEqual(version1, version2)) return 0;

  for (let i = 0; i < version1.length; i += 1) {
    if (i > version2.length - 1) return 1;
    let num1 = parseInt(version1[i], 10);
    let num2 = parseInt(version2[i], 10);
    if (num1 > num2) return 1;
    if (num2 > num1) return -1;
  }

  return -1;
}

function formatVersionArray(versionStr) {
  let versionArr = versionStr.split('.');
  while (versionArr[versionArr.length - 1] === '0') { versionArr.pop() };
  return versionArr;
}

function checkEqual(versionArr1, versionArr2) {
  return versionArr1.join('.') === versionArr2.join('.');
}

console.log(compareVersions('1.18.2', '13.37')); // -1
console.log(compareVersions('1.2','1.2.0.0')); // 0
console.log(compareVersions('1.2', '1.1.1')); // 1
console.log(compareVersions('12.1', '0.1')); // 1
console.log(compareVersions('0.1', '12.1')); // -1
console.log(compareVersions('1.r', '0')); // null