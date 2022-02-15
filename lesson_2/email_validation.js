"use strict"

// Implement a function that checks whether an email address is valid. An email
// address has two parts: A "local part" and a "domain part." An @ sign
// separates the two parts: local-part@domain-part. The local part is the name
// of the mailbox; this is usually a username. The domain part is the domain
// name (e.g., gmail.com, yahoo.com.ph, or myCompanyName.com). The domain name
// contains a server name (sometimes called the mail server name) and a
// top-level domain (.com, .ph, etc.).

// For this practice problem, use the following criteria to determine whether an
// email address is valid:

//   - There must be one @ sign.
//   - The local part must contain one or more letters (A-Z, a-z) and/or digits
//     (0-9). It may not contain any other characters.
//   - The domain part must contain two or more components with a single dot (.)
//     between each component. Each component must contain one or more letters
//     (A-Z, a-z) only.

// To keep things simple, you don't need to check whether the domain part or
// top-level domain is "real" or "official".

// Note: don't use this criteria for real email validation logic in your
// programs. We are using greatly simplified criteria to let you concentrate on
// the fundamentals of JavaScript, and not on the specifics of email addresses.

// PROBLEM:
// RULES:
//   EXPLICIT:
//   - must have two parts separated by exactly one '@'
//   - portion before @ must have only alphanumeric chars
//   - portion after @ must have at least one '.' but cannot start/ end with '.'
//   - apart from '.', all chars must be letters

// DATA:
//   INPUT: sting
//   OUTPUT: boolean

// ALGO:
// - if string starts with or ends with @ return false
// - split string on '@'
//   - if that array length !== 2, return false
// assign split arr[0] to local and split arr[1] to domain
// helper function:
// - check local; if any char is not a letter or number, return false
// main: if check local is false, return false
// helper function:
// - check domain: if
// main: if check domain is false, return false
// // return true

// function isValidEmail(email) {
//   let parts = email.split('@');
//   if (!validateParts(email, parts)) return false;

//   let local = parts[0];
//   if (!validateLocal(local)) return false;

//   let domain = parts[1];
//   if (!validateDomain(domain)) return false;

//   return true;
// }

// function validateParts(email, parts) {
//   return (email.startsWith('@') || email.endsWith('@') || parts.length === 2);
// }

// function validateLocal(local) {
//   return !local.match(/[^a-z0-9]/ig)
// }

// function validateDomain(domain) {
//   if (domain.startsWith('.')
//       || domain.endsWith('.')
//       || !domain.includes('.')
//       || domain.match(/\.\./g)
//       || domain.match(/[^a-z.]/ig)) {
//      return false;
//   }

//   return true;
// }

// REGEX SOLUTION:

function isValidEmail(email) {
  return /^[a-z0-9]+@([a-z]+\.)+[a-z]+$/i.test(email);
}

console.log(isValidEmail('Foo@baz.com.ph'));          // returns true
console.log(isValidEmail('Foo@mx.baz.com.ph'));       // returns true
console.log(isValidEmail('foo@baz.com'));             // returns true
console.log(isValidEmail('foo@baz.ph'));              // returns true
console.log(isValidEmail('HELLO123@baz'));            // returns false
console.log(isValidEmail('foo.bar@baz.to'));          // returns false
console.log(isValidEmail('foo@baz.'));                // returns false
console.log(isValidEmail('foo_bat@baz'));             // returns false
console.log(isValidEmail('foo@bar.a12'));             // returns false
console.log(isValidEmail('foo_bar@baz.com'));         // returns false
console.log(isValidEmail('foo@bar.....com'));         // returns false