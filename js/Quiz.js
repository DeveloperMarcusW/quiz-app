export default function Quiz(questions) { //questions is the array [q1,q2]
  this.questions = questions;
  this.score = 0;
  this.currentIndex = 0;
}
Quiz.prototype.getCurrentQuestion = function() {
  return this.questions[this.currentIndex]; //guestions[0] //q1
}
Quiz.prototype.nextIndex = function () {
  this.currentIndex++; //currentIndex = 0 + 1 -->1
}
Quiz.prototype.hasEnded = function() {
  return this.currentIndex === this.questions.length; //0 = 2, 1 = 2
}
Quiz.prototype.guess = function (userGuess) {
  const currentQuestion = this.questions[this.currentIndex]; //questions[0]
  //questions property[index], in this case same as currentIndex property
  //we can just run getCurrentQuestion right here alternatively 
  //q1 object
  if (currentQuestion.isCorrect(userGuess)) { 
    //*note: by the last question is answered, there is no key from the selectedRadioElem anymore, ...
    //... nothing to comapare against...we need to render the end screen in the renderAll function
    //Quiz Object q1 has properties&methods of Question object-->
      //--> isCorrect method for q1--> if true,score++, move on, otherwise move on anyways
    this.score++;
  }
  this.nextIndex();
}

Quiz.prototype.reset = function() {
  this.currentIndex = 0;
  this.score = 0;
}