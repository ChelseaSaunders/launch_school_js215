"use strict"

function totalArea(array) {
  let rectangleAreas = array.map((subarr) => subarr[0] * subarr[1]);
  return rectangleAreas.reduce((totalArea, rectangle) => totalArea + rectangle);
}

let rectangles = [[3, 4], [6, 6], [1, 8], [9, 9], [2, 2]];

console.log(totalArea(rectangles));    // 141

function findSquares(arr) {
  return arr.filter((subarr) => subarr[0] === subarr[1]);
}

function totalSquareArea(arr) {
  let squares = findSquares(arr);
  return totalArea(squares);
}


console.log(totalSquareArea(rectangles));    // 121