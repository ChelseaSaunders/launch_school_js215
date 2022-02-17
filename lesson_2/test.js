"use strict"
function longestSentence(text) {
  let sentences = generateSentenceArray(text);
  let orderedPunctuation = generatePunctuationArray(text);
  let sentenceWords = generateWordArray(sentences);
  let longestIndex = findIndexOfLongestSentence(sentenceWords)
  let longestCount = sentenceWords[longestIndex].length;
  let longestSentence = sentences[longestIndex];
  let longestPunctuation = orderedPunctuation[longestIndex];

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
