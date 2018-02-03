'use strict';

const assert = require('assert');
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});


/***WHITEBOARD***

PROBLEM: Create the game PigLatin.
RULES:  0. If the first letter is a vowel, add 'yay'
      ---WHEN NOT BEGINNING WITH A VOWEL---
        1. Remove the leading characters up to the first vowel.
        2. Add the removed characters to the end of the word.
        3. Add 'ay' to the end of the new word.
PLAN:  Create a program that takes in a word, moves the leading characters up
to the first vowel to the end of the word, and appends 'ay' to the end.

VALIDATIONS: 1. Trim the word.
             2. Convert the word to lowercase.
             3. Test to ensure a string

VARIABLES:   1. vowelArray - Global to reduce storage
             2. vowelIndex - Local within a closure
             3. lowestIndexFromWord - Local within a closure
             4. wordTransformedForRunningPigLatin - Local
             5. --Holding for moments of brilliance--

METHODS:     1. indexOf (function 3)    --Function numbers refer to descriptions below
             2. substr (function 1)
             3. trim (function 2)
             4. toLowerCase (function 2)
             5. split (function 3)
             6. push (function 3)
             7. typeof (function 2)


FUNCTIONS:   1. PigLatin
                --Will callback the isTheInputValid and findTheFirstVowel functions
                a. Use substr methods to split and concat using lowestIndexFromWord variable
                b. Add "AY" to the end if the word begins with Vowel, else "YAY"
                  --c will use the lowestIndexFromWord to perform the comparison.
                  --if lowestIndexFromWord is 0, then this means the first letter is
                  --a vowel (YAY added).  Else (AY added)
             2. isTheInputValid
                 a. Will take in user input word and perform trim and toLowerCase methods
                 b. Test truthiness of wordTransformedForRunningPigLatin and datatype string;
                    i. when true, run pigLatin
                    ii. when false, return error message
             3. findTheFirstVowel
                 a. Accepts word as an argument and splits to vowelArray
                 b. Finds index of vowels (method indexOf) and push to new array (lowestIndexFromWord)
                 c. Returns lowest index from array to variable lowestIndexFromWord

*/

const vowelArray = ['a','e','i','o','u'];

//Function to locate the position of the first vowel

//Convert this function using a forEach method.
const findTheFirstVowel = (word) => {
const myWord = word.split('');
const foundVowelsfromWord = [];
  for (let i = 0; i < vowelArray.length; i++ ) {
    if (vowelArray.indexOf(myWord[i]) !== -1) {
      foundVowelsfromWord.push(myWord.indexOf(myWord[i]) )
    }
  }
  foundVowelsfromWord.sort();
  return foundVowelsfromWord[0];
};

//Function to validate the input before proceeding to pigLatin
const isTheInputValid = (word) => {
   return (typeof word) === 'string'
   ? findTheFirstVowel(word)
   : `Please only pass in a string containing letters`
}

//Function that will run PigLatin
const pigLatin = (word) => {
  const wordTransformedForRunningPigLatin = word.trim().toLowerCase();
  const vowelIndex = isTheInputValid(wordTransformedForRunningPigLatin);
  return vowelIndex === 0
    ? `${wordTransformedForRunningPigLatin}yay`
    : `${wordTransformedForRunningPigLatin.substr(vowelIndex)}${wordTransformedForRunningPigLatin.substr(0,vowelIndex)}ay`
}

function getPrompt() {
  rl.question('word ', (answer) => {
    console.log( pigLatin(answer) );
    getPrompt();
  });
}

// Tests

if (typeof describe === 'function') {

  describe('#pigLatin()', () => {
    it('should translate a simple word', () => {
      assert.equal(pigLatin('car'), 'arcay');
      assert.equal(pigLatin('dog'), 'ogday');
    });
    it('should translate a complex word', () => {
      assert.equal(pigLatin('create'), 'eatecray');
      assert.equal(pigLatin('valley'), 'alleyvay');
    });
    it('should attach "yay" if word begins with vowel', () => {
      assert.equal(pigLatin('egg'), 'eggyay');
      assert.equal(pigLatin('emission'), 'emissionyay');
    });
    it('should lowercase and trim word before translation', () => {
      assert.equal(pigLatin('HeLlO '), 'ellohay');
      assert.equal(pigLatin(' RoCkEt'), 'ocketray');
    });
  });
} else {

  getPrompt();

}
