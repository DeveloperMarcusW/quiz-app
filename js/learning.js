// import Question from "./Question.js";
// import Quiz from "./Quiz.js";

/*****************learning module pattern 
//revealing module pattern (a closure): 
//everything within the scope of a function can be referenced by 
//everything else in that same function))
const App = (function() {
  let counter = 0; //privateVar, can't be called directly from outside

  const doubleCounter = () => { //privateDoubleCounter method, can't be called directly from outside
    counter *= 2; //privateVar *= 2
  }

  const incrementCounter = () => { //privateDoubleCounter method, can't be called directly from outside
    counter++; //privateVar ++ 
  }

  const getCounter = () => { //publicGetCounter method
    return counter; //privateVar
  }

  const setCounter = (newNum) => { //publicSetCounter method
    counter = newNum; // privateVar get re-assigned
  }
  // public methods: reveal public methods from the outside world
  return {
    get: getCounter, //get: publicGetCounter
    set: setCounter, //set: publicSetCounter
  }
}) ();
console.log(App.get());//0
App.set(2);
console.log(App.get()); //2
******************Learning ended */



/*
const q1 = new Question(
  "What's 2+2?", //question
  [2,3,4,5], //choices
  2 //answerKey
);
const q2 = new Question(
  "First president of US?", //question
  ["AL", "George", "Barrack", "Johnny"], //choices
  1 //answerKey
);

const qArray = [q1,q2];
const myQuiz = new Quiz(qArray);
console.log(myQuiz.getCurrentQuestion()) //default current index is 0 
//button next
myQuiz.nextIndex();
console.log(myQuiz.getCurrentQuestion()) //default current index is 0 
console.log(myQuiz.hasEnded()) //currentIndex is 0, length is 2, ??
*/

// const q1 = new Question(
//   "What's 1 + 1?",
//   [2,3,7,4],
//   0
// )
// console.log(q1);
// console.log(q1.isCorrect(1))

