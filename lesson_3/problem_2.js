// The Luhn formula is a simple checksum formula used to validate a variety of
// identification numbers, such as credit card numbers and Canadian Social
// Insurance Numbers.

// The formula verifies a number against its included check digit, which is
// usually appended to a partial number to generate the full number. This number
// must pass the following test:

//     Counting from the rightmost digit and moving left, double the value of
//     every second digit
//     For any digit that thus become 10 or more, subtract 9 from the result
//       - 1111 becomes 2121
//       - 8763 becomes 7733
//         (from 2 x 6 = 12 -> 12 - 9 = 3 and 2 x 8 = 16 -> 16 - 9 = 7)
//     Add all these digits together
//       - 1111 becomes 2121 sums as 2 + 1 + 2 + 1 to give a checksum of 6
//       - 8763 becomes 7733, and 7 + 7 + 3 + 3 is 20

// If the total (the checksum) ends in 0 (put another way, if the total modulo
//   10 is congruent to 0), then the number is valid according to the Luhn
//   Formula; else it is not valid. Thus, 1111 is not valid (as shown above, it
//     comes out to 6), while 8763 is valid (as shown above, it comes out to 20).

// Write a program that, given a number in string format, check if it is valid
// per the Luhn formula. This should treat, for example, "2323 2005 7766 3554"
// as valid. You can ignore all non-numeric characters in the input string.

/*
Problem:
Take a number string
ignore all non-number characters
beginning with the smallest digit (number on the right)
multiply every SECOND number by 2 (so leave 1's, double 10's, leave 100's,
  double 1000, and so on)
  IF the result of doubling any digit is greater/equal to 10, subtract 9. Replace
  the digit with either itself doubled, or itself doubled minus 9, to make a new
  number value

Add all of the digits of the new number value
if that sum is divisile by 10, then the number is valid, if not it is not

questions:
if string contains values other than numbers and spaces, what to do?
if string does not contain numbers what to do?
need to validate to be sure input is string?
zero valid number?

input: string
-- will need to use array to iterate thruogh chars
-- will need to use numbers to double numbers and determine value of number % 10
output: boolean

ALGO
create function checksum that takes one string number, num, as input
use replace to replace all non-digit characters with empty string,
  reassign num to that value
if num is empty string, return false
use helper function to convert number:
  split num into an array, reverse array (since problem works from r-l) map over
  it so that the element at each eveb index
    (index % 2 === 0) is converted to a number, and each odd index
    is just converted to a number and doubled
    -if result number is less than or equal to 10, subtract 9
use helper method to generate sum:
  use reduce to add all of the numbers together

retur number % 10 === 0, and number is not zero (if want zero to fail)


*/

function checksum(num) {
  num = cleanNumber(num);
  if (num.length === 0) return false;

  let sum = generateSum(num);
  return sum % 10 === 0 && sum != 0;
}

function cleanNumber(numStr) {
  return numStr.replace(/[^0-9]/g, '');
}

function generateSum(number){
  return number.split('')
               .reverse()
               .map((digit, index) => convertNumber(digit, index))
               .reduce((sum, currentNum) => sum += currentNum);
}

function convertNumber(numStr, idx) {
  if (idx % 2 === 0) {
    return parseInt(numStr, 10);
  } else {
    let newNum = parseInt(numStr, 10) * 2;
    if (newNum >= 10) newNum -= 9;

    return newNum;
  }
}



console.log(checksum('11110')); // false
console.log(checksum('8763')); // true
console.log(checksum('87630')); // false *odd number of digits changes value
// since different digits are being doubled.
console.log(checksum('')); // false
console.log(checksum('ab')); // false
console.log(checksum('1')); // false
console.log(checksum(' 8763')); // true
console.log(checksum('8763 ')); // true
console.log(checksum('8 763')); // true
console.log(checksum('0')); // false