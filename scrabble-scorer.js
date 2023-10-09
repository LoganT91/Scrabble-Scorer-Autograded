// This assignment is inspired by a problem on Exercism (https://exercism.org/tracks/javascript/exercises/etl) that demonstrates Extract-Transform-Load using Scrabble's scoring system. 

const input = require("readline-sync");

const oldPointStructure = {
  1: ['A', 'E', 'I', 'O', 'U', 'L', 'N', 'R', 'S', 'T'],
  2: ['D', 'G'],
  3: ['B', 'C', 'M', 'P'],
  4: ['F', 'H', 'V', 'W', 'Y'],
  5: ['K'],
  8: ['J', 'X'],
  10: ['Q', 'Z']
};

function oldScrabbleScorer(word) {
	word = word.toUpperCase();
	let letterPoints = "";
 
	for (let i = 0; i < word.length; i++) {
 
	  for (const pointValue in oldPointStructure) {
 
		 if (oldPointStructure[pointValue].includes(word[i])) {
			letterPoints += `Points for '${word[i]}': ${pointValue}\n`
		 }
 
	  }
	}
	return letterPoints;
 }

// your job is to finish writing these functions and variables that we've named //
// don't change the names or your program won't work as expected. //

let inputWord = '';

function initialPrompt() {
   inputWord = input.question(`Let's play some scrabble!
   Enter a word: `);
   return inputWord;
};

function simpleScoreFunc(word) {
   word = word.toUpperCase();
   simpleScoreArr = word.split('');
   letterPoints = simpleScoreArr.length;
   return letterPoints;
};

function vowelBonusFunc(word){
   word = word.toUpperCase();
   vowelBonusArr = word.split('');
   letterPoints = 0;
   for(let i = 0; i < vowelBonusArr.length; i++){
      if (vowelBonusArr[i] === 'A' || vowelBonusArr[i] === 'E' || vowelBonusArr[i] === 'I' || vowelBonusArr[i] === 'O' || vowelBonusArr[i] === 'U'){
         letterPoints += 3;
      } else {
         letterPoints +=1;
      }
   }
   return letterPoints;
};

function scrabbleScoreFunc(word){
   word = word.toUpperCase();
   letterPoints = 0;
   for(let i = 0; i < word.length; i++){
      letterPoints += newPointStructure[word[i]];
   }
   return letterPoints;
};


let simpleScorer = {
   name: 'Simple Score',
   description: 'Each letter in the word is worth 1 point.',
   scoringFunction: simpleScoreFunc
};

let vowelBonusScorer = {
   name: 'Bonus Vowels',
   description: 'Vowels are worth 3 points, consonants are worth 1 point.',
   scoringFunction: vowelBonusFunc
};

let scrabbleScorer = {
   name: 'Scrabble',
   description: 'Uses Scrabble traditional scoring.',
   scoringFunction: scrabbleScoreFunc
}

const scoringAlgorithms = [simpleScorer, vowelBonusScorer, scrabbleScorer];

function scorerPrompt() {
   console.log('Which scoring algorithm will you be using?\n');
   for(let i = 0; i < scoringAlgorithms.length; i++){
      console.log(`${i} - ${scoringAlgorithms[i].name}: ${scoringAlgorithms[i].description}`);
   }
   scorerSelection = input.question('Enter 0, 1, or 2: ');
   scorerSelection = Number(scorerSelection);
   console.log(`Points for '${inputWord}': ${scoringAlgorithms[scorerSelection].scoringFunction(inputWord)}`);
};

function transform(pointStructure) {
   let newPointSys = {};
   for(key in pointStructure) {
      for (let i = 0; i < pointStructure[key].length; i++){
         let newPoint = pointStructure[key][i];
         newPoint = newPoint.toUpperCase();
         newPointSys[`${newPoint}`] = Number(key);
      }
   }
   return newPointSys;
};

let newPointStructure = transform(oldPointStructure);
newPointStructure[' '] = 0;

function runProgram() {
   initialPrompt();
   scorerPrompt();
}

// Don't write any code below this line //
// And don't change these or your program will not run as expected //
module.exports = {
   initialPrompt: initialPrompt,
   transform: transform,
   oldPointStructure: oldPointStructure,
   simpleScorer: simpleScorer,
   vowelBonusScorer: vowelBonusScorer,
   scrabbleScorer: scrabbleScorer,
   scoringAlgorithms: scoringAlgorithms,
   newPointStructure: newPointStructure,
	runProgram: runProgram,
	scorerPrompt: scorerPrompt
};
