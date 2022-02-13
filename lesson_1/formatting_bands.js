"use strict"

// We have the following Array of information for some popular bands:

// let bands = [
//   { name: 'sunset rubdown', country: 'UK', active: false },
//   { name: 'women', country: 'Germany', active: false },
//   { name: 'a silver mt. zion', country: 'Spain', active: true },
// ];

// There are problems with this data, though, so we first have to clean it up
// before we can use it:

//     The band countries are wrong: all the bands should have 'Canada' as the
//     country.
//     The band name should have all words capitalized.
//     Remove all dots from the band names.

// Write a function that can process the input band Array and return an Array
// that contains the fixed information:
// transformation with map

let bands = [
  { name: 'sunset rubdown', country: 'UK', active: false },
  { name: 'women', country: 'Germany', active: false },
  { name: 'a silver mt. zion', country: 'Spain', active: true },
];

function processCountry(band) {
  band.country = 'Canada';
  return band;
}

function capitalizeName(band) {
  band.name = band.name.split(' ').map((word) => {
    word = word.charAt(0).toUpperCase() + word.slice(1);
    return word;
  }).join(' ');

  return band;
}

function removePeriods(band) {
  band.name = band.name.replaceAll('.', '')
  return band;
}

function processBands(data) {
  return bands.map((band) => {
    processCountry(band);
    removePeriods(band);
    capitalizeName(band);
    return band;
  });
}

console.log(processBands(bands));

// // should return:
// [
//   { name: 'Sunset Rubdown', country: 'Canada', active: false },
//   { name: 'Women', country: 'Canada', active: false },
//   { name: 'A Silver Mt Zion', country: 'Canada', active: true },
// ]

/* LS's better solution:
function processBands(bands) {
  return bands.map(band => {
    let capitalizedName = capitalizePhrase(band.name);
    let newBandName = removeDotsInString(capitalizedName);

    return {
      name: newBandName,
      country: 'Canada',
      active: band.active,
    };
  });
}

function capitalizePhrase(phrase) {
  return phrase.split(' ')
               .map(word => capitalizeString(word))
               .join(' ');
}

function capitalizeString(string) {
  let initial = string[0].toUpperCase();
  let rest = string.slice(1, string.length);
  return initial + rest;
}

function removeDotsInString(string) {
  return string.replace(/\./g, '');
}

*/