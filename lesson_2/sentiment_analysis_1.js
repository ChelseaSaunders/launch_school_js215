"use strict"

// Sentiment analysis, sometimes known as opinion mining, attempts to ascertain
// subjective information from a text and convert it to something concrete. For
// example, by using lists of positive and negative words, we can analyze the
// words in some text to determine whether the mood is positive, negative, or
// neutral.

// Sentiment analysis adds a dimension to content that is mostly text based. Its
// main task is to classify the polarity of the text. In this practice problem,
// we will build a tool that determines the mood of some text. Note that we will
// take a simplistic approach. We don't recommend this approach for live
// sentiment analysis.

// There are many ways to implement sentiment analysis. Here, we will use two
// arrays of words. One array contains words that connote a "positive"
// sentiment, while the other contains words that connote a "negative"
// sentiment. Given the counts of positive and negative words in our text, we
// can compute a sentiment score as the difference between the two counts,
// "positive word count - negative word count." The sentiment of the text is
// positive if the difference is positive, negative if the difference is
// negative, and neutral if the difference is 0 (the word counts are equal).

// Implement a function that takes some text as an argument and logs some
// information about whether the text has a positive, negative, or neutral
// sentiment.

// Here's an excerpt of some text taken from a Wikipedia article that compares
// different versions of "To be, or not to be".

/*
Data:
input: text
output: text (but uses array)

ALGO:
create empty array positive and empty array negative
using iterate through PositiveWords (outer-scope variable)
- check if word is in input string
- if it is add word to positive array
do the same for negative array
assing positive total to positive array lnength and negative total to negative
array length
set sentiment to empty string
if positive total > negative total, sentiment = positive, else sentiment negative
*/

let textExcerpt = 'To be or not to be-that is the question:\n' +
  'Whether \'tis nobler in the mind to suffer\n' +
  'The slings and arrows of outrageous fortune,\n' +
  'Or to take arms against a sea of troubles,\n' +
  'And, by opposing, end them. To die, to sleep-\n' +
  'No more-and by a sleep to say we end\n' +
  'The heartache and the thousand natural shocks\n' +
  'That flesh is heir to-\'tis a consummation\n' +
  'Devoutly to be wished. To die, to sleep-\n' +
  'To sleep, perchance to dream. Aye, there\'s the rub,\n' +
  'For in that sleep of death what dreams may come,\n' +
  'When we have shuffled off this mortal coil,\n' +
  'Must give us pause. There\'s the respect\n' +
  'That makes calamity of so long life.\n' +
  'For who would bear the whips and scorns of time,\n' +
  'Th\' oppressor\'s wrong, the proud man\'s contumely, [F: poor]\n' +
  'The pangs of despised love, the law’s delay, [F: disprized]\n' +
  'The insolence of office, and the spurns\n' +
  'That patient merit of the unworthy takes,\n' +
  'When he himself might his quietus make\n' +
  'With a bare bodkin? Who would fardels bear, [F: these Fardels]\n' +
  'To grunt and sweat under a weary life,\n' +
  'But that the dread of something after death,\n' +
  'The undiscovered country from whose bourn\n' +
  'No traveler returns, puzzles the will\n' +
  'And makes us rather bear those ills we have\n' +
  'Than fly to others that we know not of?\n' +
  'Thus conscience does make cowards of us all,\n' +
  'And thus the native hue of resolution\n' +
  'Is sicklied o\'er with the pale cast of thought,\n' +
  'And enterprises of great pitch and moment, [F: pith]\n' +
  'With this regard their currents turn awry, [F: away]\n' +
  'And lose the name of action.-Soft you now,\n' +
  'The fair Ophelia.-Nymph, in thy orisons\n' +
  'Be all my sins remembered';

  let positiveWords = ['fortune', 'dream', 'love', 'respect', 'patience', 'devout', 'noble', 'resolution'];
  let negativeWords = ['die', 'heartache', 'death', 'despise', 'scorn', 'weary', 'trouble', 'oppress'];


function sentiment(text) {
  text = text.toLowerCase().match(/[a-z']+/g);
  let positive = findWords(positiveWords, text);
  let negative = findWords(negativeWords, text);

  let sentiment = detectSentiment(positive.length, negative.length);
  console.log(formatOutput(positive, negative, sentiment));
}

function findWords(wordArr, text) {
  let words = []

  wordArr.forEach((word) => {
    if (text.includes(word)) words.push(word);
  })
  return words;
}

function detectSentiment(posCount, negCount) {
  let sentiment = 'Neutral';
  if (posCount > negCount) sentiment = 'Positive';
  if (negCount > posCount) sentiment = 'Negative';
  return sentiment;
}

function formatOutput(positive, negative, sentiment) {
  return `There are ${positive.length} positive words in the text.\n` +
  `Positive sentiments: ${positive.join(', ')}\n` +
  `There are ${negative.length} negative words in the text.\n` +
  `Negative sentiments: ${negative.join(', ')}\n` +
  `\n` +
  `The sentiment of the text is ${sentiment}.`;
}

sentiment(textExcerpt);

  // console output

  // There are 5 positive words in the text.
  // Positive sentiments: fortune, dream, respect, love, resolution

  // There are 6 negative words in the text.
  // Negative sentiments: die, heartache, die, death, weary, death

  // The sentiment of the text is Negative.