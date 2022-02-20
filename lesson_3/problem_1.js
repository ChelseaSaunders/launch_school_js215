// Write a program that cleans up user-entered phone numbers so that they can be
// sent as SMS messages.  Other than digits, the number may also contain special
// characters such as space, dash, dpt, and parentheses that should be ignored.

// The rules are as follows:
// - If the phone number is less than 10 digits, it is a bad number;
// - if the phone number is 10 digits, assume it is good
// - If the phone number is 11 digits and the first number is 1, trim the 1 and
//  use the last 10 digits
// - If the phone numbe is 11 digits and the first number is not 1, it is a bad
//   number
// - If the phone number is more than 11 digits, assume it is a bad number;

// For bad numbers return a string of 10 0's

/*
PROBLEM:
take an input string (see question below)
- determine whether the input, when a possible single leading "1" and additional
  spaces, dashes, periods, and parentheses are removed, is precisely 10 digits;
  if so, return the cleaned digits, if not, return a string of 10 zeros;

Questions: problem specifies user-entered strings, so should the program take an
argument or should program prompt for input and use that? (argument)
questions: do I need to validate input to only accept string numbers and the
specified characters? (assume valid)
- if so, what should the program do if there is invalid input? (assume valid)
- should returned digits be string or number? STRING (answer in video)

data:
input: string
output: string

ALGO
Create function smsPhoneNumber that takes a string as an argument:
- use .replace to replace any ()-. or space with empty string
- if length is 11, check if the first value is 1, if so, remove value
-- helper function, removeLeading1

- if length is 10, return that string, if not, return ten 0's string.
*/

function smsPhoneNumber(num) {
  num = num.replace(/[^0-9]/g, '');
  if (num.length === 11 && num[0] === '1') num = num.slice(1);
  return num.length === 10 ? num : '0000000000';
}

console.log(smsPhoneNumber('223456789')); // 0000000000 less than 10
console.log(smsPhoneNumber('01234567()')); // 0000000000 10 but has special chars
console.log(smsPhoneNumber('01234567890')); // 0000000000 more than ten
console.log(smsPhoneNumber('12345678901')); // 2345678901 11 but first num is 1
console.log(smsPhoneNumber('')); // 0000000000 empty sting
console.log(smsPhoneNumber('..........')); // 0000000000 10 non-num chars
console.log(smsPhoneNumber('(425) 218-2036')); //  4252182036 non-numbers but otherwise good
console.log(smsPhoneNumber('4252182036')); // 4252182036 good
console.log(smsPhoneNumber('1252182036')); // 1252182036 good but starts with 1, want to be sure 1 doesn't get removed
