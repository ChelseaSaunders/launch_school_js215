"use strict"

function myReduce(array, func, initial) {
  let accumulator;
  let index;

  if (initial === undefined) {
    accumulator = array[0];
    index = 1;
  } else {
    accumulator = initial;
    index = 0;
  }

  array.slice(index).forEach((value) => accumulator = func(accumulator, value));

  return accumulator;
}

let smallest = (result, value) => (result <= value ? result : value);
let sum = (result, value) => result + value;

console.log(myReduce([5, 12, 15, 1, 6], smallest));           // 1
console.log(myReduce([5, 12, 15, 1, 6], sum, 10));            // 49