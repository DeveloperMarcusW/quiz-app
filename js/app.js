import Question from "./Question.js";
import Quiz from "./Quiz.js";

// ******cache the DOM, so we don't need to do .document.querySelector all the time
const App = (() => { //create an expression iife, assigned to App, 
  //with a bracket to isolate the variables, nameless arrow function
    
  //grab all the moving parts here first:
  const quizEl = document.querySelector(".jabquiz");
  const quizQuestionEl = document.querySelector(".jabquiz__question");
  const trackerEl = document.querySelector(".jabquiz__tracker");
  const taglineEl = document.querySelector(".jabquiz__tagline");
  const choicesEl = document.querySelector(".jabquiz__choices");
  const progressInnerEl = document.querySelector(".progress__inner");
  const nextButtonEl = document.querySelector(".next");
  const restartButtonEl = document.querySelector(".restart");
//******* Finished caching the DOM
//*** begin initialing questions */
  const q1 = new Question( //create instance of Question, being q1
    "First President of US?", //.question
    ["Barrack", "Osama", "George", "Monkey"], ///.choices
    2 //.answerKey //George
  )
  const q2 = new Question( //create instance of Question, being q1
    "When was Javascript created?", //.question
    ["Jun 1995", "May 1995", "July 1885", "Sep 1996"], ///.choices
    1 //.answerKey // May1995
  )
  const q3 = new Question( //create instance of Question, being q1
    "What does CSS stand for?", //.question
    ["Countr Sheriff Service", "Cascading sexy sheets", "Cascading style sheets"], ///.choices
    2 //.answerKey
  )
  const q4 = new Question( //create instance of Question, being q1
    "The full form of HTML is...", //.question
    ["Hyper Text Narkup Language", "Hold The Mic", "Error"], ///.choices
    0 //.answerKey
  )
  const q5 = new Question( //create instance of Question, being q1
    "console.log(typeof [] would return what?", //.question
    ["Array", "Object", "null", "array"], ///.choices
    1 //.answerKey //type of array is object
  )
    //***finished initializing the questions */
  //***start initializing the quiz */
  const quiz = new Quiz([q1,q2,q3,q4,q5]); // an instance of Quiz object, question parameter takes an array
    //console.log(quiz) //print a test
    //***finished init ializing the quiz */
  
  //***start binding event listeners */
  const listeners = _ => {
    nextButtonEl.addEventListener("click", function() {
      const selectedRadioElem = document.querySelector('input[name="choice"]:checked');
      // console.log(selectedRadioElem);
      if (selectedRadioElem) { //if the user checked an option so there is a checked radio element, then
        //use a custom data attribute instead of using slice to get the index
        const key = Number(selectedRadioElem.getAttribute("data-order"));//get the data order make it a number
        // console.log(key); //test
        quiz.guess(key); //check number is correct and go to the next page regardless. Score++,currentIndex++
        renderAll(); //to activate next page after click event, we need to add this here
      }
    })

    restartButtonEl.addEventListener("click", function() {
      // console.log("restart clicked") //test
      //1.reset the quiz
      quiz.reset();
      //2.renderAll
      renderAll();
      //3.restore the next button
      nextButtonEl.style.opacity = 1;
      //4.change 'complet!' back to 'Pick an option below!'
      setValue(taglineEl, `Pick an option below!`);
    })
  }
  //***end binding event listeners */

    //***start rendering dynamically */
  const setValue = (elem, value) => { //changeText function to streamline quizQuestionEl.innerHTML = question;
    elem.innerHTML = value;
  }

  const renderQuestion = _ => { // 1. Render the question - <h1> tag's text
    const question = quiz.getCurrentQuestion().question; //quiz.getCurrentQuestion()--->.questions[index]--->
    //-->return the object q1, we want to render only the title therefore quiz.getCurrentQuestion().question-->
    //---> the string itself "Who is the first president of the US?"
    // console.log(question); //test
    //quizQuestionEl.innerHTML = question; //dynamically change the inner HTML of <h1>...
    //...but further use a setValue function to streamline this
    setValue(quizQuestionEl,question) // setValue function, dynamically change the inner HTML of <h1>...
  }
  
  const renderChoicesElements = _ => { // 2. Render the choies elements - <li> tags
    //need a loop & es6 string template lateral
    let markup = "";
    const currentChoices = quiz.getCurrentQuestion().choices //quiz.getCurrentQuestion()--->.questions[index]--->
    //-->return the object q1, we want to render only the choices therefore quiz.getCurrentQuestion().choices-->
    //--> the choices/options "["Barrack", "Osama", "George", "Monkey"]"
    // console.log(currentChoices); //test
    currentChoices.forEach((elem,index) => { //use built-in forEach method, es6 function,
      // console.log(elem,index) //test [Barrack, 0] [George 1] etc loop through the choices
      markup += `
        <li class="jabquiz__choice">
        <input type="radio" name="choice" class="jabquiz__input" data-order="${index}" id="choice${index}">
        <label for="choice${index}" class="jabquiz__label">
          <i></i> <!--for images-->
          <span>${elem}</span>
        </label>
      </li>
      ` 
    });    
    setValue(choicesEl,markup);//choicesEl.innerHTML = markup; //change innerHTML of choicesEl (.jabquiz__choices)
  }
 
  const renderTracker = _ => { //3. Render tracker - <p class="jabquiz__tracker">1 of 7</p>
    const index = quiz.currentIndex;  //quiz object, it has [0],[1],...[5] --> assign index [0] to index variable
    // console.log(index);
    //change inneer HTML:
    setValue(trackerEl, `${index+1} of ${quiz.questions.length}`) //the array stored in questions method has 5
  }

  const getPercentage = (num1, num2) => { //4. for the % bar width
    return Math.round((num1/num2) * 100);
  }

  const launch = (width, maxPercent) => {
    let loadingBar = setInterval(function() {
      if (width > maxPercent) {
        clearInterval(loadingBar);
      } else {
        width++;
        progressInnerEl.style.width = width + "%" // or `${width}%`
      }
    },3) //3 ms
  }
// console.log(launch(0,100))

  const renderProgress = _ => { //4. Render Progress, the % bar
    //1. width in %
    // e.g. 1/5questions*100 = 20% completed
    // console.log(currentWidth); //test
    const currentWidth = getPercentage(quiz.currentIndex,quiz.questions.length)
    //2. launch(0, width) //e.g. 0% to 30%
    launch(0, currentWidth);

  }
  const renderEndScreen = _ => {
    setValue(quizQuestionEl, `Great job!`);
    setValue(taglineEl, `Complete!`);
    setValue(trackerEl,`Your score: ${getPercentage(quiz.score, quiz.questions.length)}%`);
    nextButtonEl.style.opacity = 0;
    renderProgress();
  }
//the plan and overall rendering flow control
  const renderAll = _ => { //global function
    if (quiz.hasEnded()) {
      //renderEndScreen
      renderEndScreen();
    } else {
      // 1. Render the question
      renderQuestion();
      // 2. Render the choies elements
      renderChoicesElements()
      // 3. Render the Tracker
      renderTracker();
      // 4. Render Progress
      renderProgress()
    }
  }

  return { //expose private functions to the public
    renderAll: renderAll, //expose private functions to the public
    listeners: listeners //expose private functions to the public
  }
}) () //return in right away, iffe
// console.log(quizEl)

App.renderAll() //run App object's renderall method (a private function made public)
App.listeners() //run App object's lisneners method
