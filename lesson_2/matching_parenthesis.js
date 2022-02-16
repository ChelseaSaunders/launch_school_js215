// Write a function that takes a string as an argument and returns true if the
// string contains properly balanced parentheses, false otherwise. Parentheses
// are properly balanced only when '(' and ')' occur in matching pairs, with
// each pair starting with '('.

function isBalanced(str) {
  let balanced = 0;
  for (let i = 0; i < str.length; i += 1) {
    if (str[i] === '(') balanced += 1;
    if (str[i] === ')') balanced -= 1;
    if (balanced < 0) return false;
  }

  return balanced === 0;
}

console.log(isBalanced('What (is) this?'));        // true
console.log(isBalanced('What is) this?'));         // false
console.log(isBalanced('What (is this?'));         // false
console.log(isBalanced('((What) (is this))?'));    // true
console.log(isBalanced('((What)) (is this))?'));   // false
console.log(isBalanced('Hey!'));                   // true
console.log(isBalanced(')Hey!('));                 // false
console.log(isBalanced('What ((is))) up('));       // false