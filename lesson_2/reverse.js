"use strict"

function reverse(string) {
  let reversed = '';
  for (let i = string.length - 1; i >= 0; i -= 1) {
    reversed += string.charAt(i);
  }

  return reversed;
}

console.log(reverse('hello'));                  // returns "olleh"
console.log(reverse('The quick brown fox'));    // returns "xof nworb kciuq ehT"

function alternativeReverse(string) {
  return string.split('').reverse().join('');
}
