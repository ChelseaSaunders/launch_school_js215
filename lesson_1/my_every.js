"use strict"

function myOwnEvery(array, func) {
  let every = true
  array.forEach((val) => {
    if (!func(val)) {
      every = false;
    }
  });
  return every;
}

let isAString = value => typeof value === 'string';
console.log(myOwnEvery(['a', 'a234', '1abc'], isAString));       // true
console.log(myOwnEvery(['a', 234, '1abc'], isAString));