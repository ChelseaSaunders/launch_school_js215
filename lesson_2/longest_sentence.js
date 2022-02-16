"use strict"

// Write a program that determines the sentence with the most words in some
// text. Sentences may end with periods (.), exclamation points (!), or question
// marks (?). Sentences always begin with a word character. You should treat any
// sequence of characters that are not spaces or sentence-ending characters, as
// a word. Log the longest sentence and its word count to the console. Pay
// attention to the expected output. Note that this problem is about
// manipulating and processing strings. As such, every detail about the string
// matters (e.g., case, punctuation, tabs, spaces, etc.).

/*
PROBLEM:
- Take input string, break into sentences
- count the number of words in sentences
- determine which sentence has the most words
- output the sentence with the most words, along with its wordcount.

RULES:
- sentences are deliminated by '.', '!', and '?'
- sentences always begin with a letter
- words are ANY character sequence other than spaces or sentence ending
characters

*/

let longText = 'Four score and seven years ago our fathers brought forth' +
  ' on this continent a new nation, conceived in liberty, and' +
  ' dedicated to the proposition that all men are created' +
  ' equal.' +
  ' Now we are engaged in a great civil war, testing whether' +
  ' that nation, or any nation so conceived and so dedicated,' +
  ' can long endure. We are met on a great battlefield of that' +
  ' war. We have come to dedicate a portion of that field, as' +
  ' a final resting place for those who here gave their lives' +
  ' that that nation might live. It is altogether fitting and' +
  ' proper that we should do this.' +
  ' But, in a larger sense, we can not dedicate, we can not' +
  ' consecrate, we can not hallow this ground. The brave' +
  ' men, living and dead, who struggled here, have' +
  ' consecrated it, far above our poor power to add or' +
  ' detract. The world will little note, nor long remember' +
  ' what we say here, but it can never forget what they' +
  ' did here. It is for us the living, rather, to be dedicated' +
  ' here to the unfinished work which they who fought' +
  ' here have thus far so nobly advanced. It is rather for' +
  ' us to be here dedicated to the great task remaining' +
  ' before us -- that from these honored dead we take' +
  ' increased devotion to that cause for which they gave' +
  ' the last full measure of devotion -- that we here highly' +
  ' resolve that these dead shall not have died in vain' +
  ' -- that this nation, under God, shall have a new birth' +
  ' of freedom -- and that government of the people, by' +
  ' the people, for the people, shall not perish from the' +
  ' earth.';

let shorterText = 'Four score and seven years ago our fathers brought forth' +
  ' on this continent a new nation, conceived in liberty, and' +
  ' dedicated to the proposition that all men are created' +
  ' equal.' +
  ' Now we are engaged in a great civil war, testing whether' +
  ' that nation, or any nation so conceived and so dedicated,' +
  ' can long endure. We are met on a great battlefield of that' +
  ' war. We have come to dedicate a portion of that field, as' +
  ' a final resting place for those who here gave their lives' +
  ' that that nation might live. It is altogether fitting and' +
  ' proper that we should do this.' +
  ' But, in a larger sense, we can not dedicate, we can not' +
  ' consecrate, we can not hallow this ground. The brave' +
  ' men, living and dead, who struggled here, have' +
  ' consecrated it, far above our poor power to add or' +
  ' detract. The world will little note, nor long remember' +
  ' what we say here, but it can never forget what they' +
  ' did here. It is for us the living, rather, to be dedicated' +
  ' here to the unfinished work which they who fought' +
  ' here have thus far so nobly advanced.';

function longestSentence(text) {
  let sentences = generateSentenceArray(text);
  let orderedPunctuation = generatePunctuationArray(text);
  let sentenceWords = generateWordArray(sentences);
  let longestIndex = findIndexOfLongestSentence(sentenceWords)
  let longestCount = sentenceWords[longestIndex].length;
  let longestSentence = sentences[longestIndex];
  let longestPunctuation = orderedPunctuation[longestIndex];

  // console.log(`sentences = ${sentences}\npunctuation = ${orderedPunctuation}\nsentenceWords = ${sentenceWords}\nlongestIndex = ${longestIndex}\nlongestCount = ${longestCount}\nlongestSentence = ${longestSentence}\nlongestPunctuation = ${longestPunctuation}`);
// console.log(orderedPunctuation);
  console.log(generateOutput(longestSentence, longestPunctuation, longestCount));
}

function generateSentenceArray(text) {
  return text.split(/[\.|?|!]/g)
              .map((sentence) => sentence.trim())
              .filter((words) => words !== '');
}

function generateWordArray(sentenceArr) {
  return sentenceArr.map((sentence) => sentence.split(' '));
}

function findIndexOfLongestSentence(sentenceArr) {
  let longestIndex = 0;
  let count = 0

  for (let i = 0; i < sentenceArr.length; i += 1) {
    let sentenceLength = sentenceArr[i].length;
    if (sentenceLength > count) {
      longestIndex = i;
      count = sentenceLength;
    }
  }

  return longestIndex;
}

function generatePunctuationArray(text) {
  return text.split(/[^\.|?|!]/g).filter((char) => char !== '');
}

function wordOrWords(count) {
  return count === 1 ? 'word' : 'words';
}
function generateOutput(sentence, punctuation, count) {
  return `${sentence}${punctuation}\n\n` +
  `The longest sentence has ${count} ${wordOrWords(count)}.`;
}

longestSentence(longText);

// console output
// It is rather for us to be here dedicated to the great task remaining before
// us -- that from these honored dead we take increased devotion to that cause
// for which they gave the last full measure of devotion -- that we here highly
// resolve that these dead shall not have died in vain -- that this nation, under
// God, shall have a new birth of freedom -- and that government of the people,
// by the people, for the people, shall not perish from the earth.

// The longest sentence has 86 words.


// Assuming the last sentence is removed:

longestSentence(shorterText);

// console output
// Four score and seven years ago our fathers brought forth on this continent a
// new nation, conceived in liberty, and dedicated to the proposition that all
// men are created equal.

// The longest sentence has 30 words.

console.log(longestSentence('Hello! Why?'));
console.log(longestSentence('            Hello!!!! Why? Goodbye.'));