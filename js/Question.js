export default function Question(question, choices, answerKey) { //q1~Question,q2~question
  this.question = question;
  this.choices = choices;
  this.answerKey = answerKey
}

Question.prototype.isCorrect = function (guessKey) { // if userinput === answerKey-->true
  return guessKey === this.answerKey //true or false
}

