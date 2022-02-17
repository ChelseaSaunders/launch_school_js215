"use strict"

function longestSentence(text) {
  let sentences = separateSentences(text);
  let longestSentence = findMostWords(sentences);
  let longestWordCount = wordCount(longestSentence);
  console.log(generateOutput(longestSentence, longestWordCount));
}

function separateSentences(text) {
  return text.match(/[^\.?!]+[\.?!]+\s*/gi).map((sentence) => sentence.trim());
}

function wordCount(sentence) {
  return sentence.split(' ').length;
}

function findMostWords(sentenceArr) {
  sentenceArr.sort((a, b) => wordCount(b) - wordCount(a));
  return sentenceArr[0];
}

function wordOrWords(count) {
  return count === 1 ? 'word' : 'words';
}

function generateOutput(sentence, count) {
  return `${sentence}\n\n` +
    `The longest sentence has ${count} ${wordOrWords(count)}.`;
}