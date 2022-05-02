
const URL = "http://localhost:80"

function requestFromServer(){
    let id = JSON.parse(localStorage.getItem("QUIZ_ID"+JSON.parse(localStorage.getItem("USER_ID"))))
    axios.get(URL + "/questions/quiz/"+id).then((respone)=>{
        let questions = respone.data
        localStorage.setItem("YOUR_QUIZ", JSON.stringify(questions))
    })
}

let questions = JSON.parse(localStorage.getItem("YOUR_QUIZ"));

requestFromServer()


// let questions = [
//     {
//     question: "What does HTML stand for?",
//     answer: ["Hyper Text Markup Language"],
//     options: [
//       "Hyper Text Preprocessor",
//       "Hyper Text Markup Language",
//       "Hyper Text Multiple Language",
//       "Hyper Tool Multi Language",
//       "Hyper Tool Multi Language",
//       "Hyper Tool Multi Language"
//     ],
//     score:10
//   },
//     {
    
//     question: "What does CSS stand for?",
//     answer:[ "Cascading Style Sheet"],  
//     options: [
//       "Cascading Style Sheet"
//     ],
//     score:10
//   },
//     {
    
//     question: "What does PHP stand for?",
//     answer:[ "Hypertext Preprocessor"],
//     options: [
//       "Hypertext Preprocessor",
//       "Hypertext Programming",
//       "Hypertext Preprogramming",
//       "Hometext Preprocessor"
//     ],
//     score:10
//   },
//     {
    
//     question: "What does SQL stand for?",
//     answer:[ "Structured Query Language"],
//     options: [
      
//       "Structured Query Language"
//     ],
//     score:10
//   },
//     {
    
//     question: "What does XML stand for?",
//     answer:[ "eXtensible Markup Language"],
//     options: [
//       "eXtensible Markup Language",
      
//     ],
//     score:10
//   },
  
// ];


//selecting all required elements
const start_btn = document.querySelector(".start_btn button");
const info_box = document.querySelector(".info_box");
const exit_btn = info_box.querySelector(".buttons .quit");
const continue_btn = info_box.querySelector(".buttons .restart");
const quiz_box = document.querySelector(".quiz_box");
const result_box = document.querySelector(".result_box");
const answersDOM = document.querySelector(".option_list");
const time_line = document.querySelector("header .time_line");
const timeText = document.querySelector(".timer .time_left_txt");
const timeCount = document.querySelector(".timer .timer_sec");
const typeAnswers = document.querySelector(".typeOfAnswer")
const DOMBUTTON_BODY = document.body


// if startQuiz button clicked
start_btn.onclick = ()=>{
    info_box.classList.add("activeInfo"); //show info box
    requestFromServer()
}

// if exitQuiz button clicked
exit_btn.onclick = ()=>{
    info_box.classList.remove("activeInfo"); //hide info box
}

// if continueQuiz button clicked
continue_btn.onclick = ()=>{
   
    info_box.classList.remove("activeInfo"); //hide info box
    quiz_box.classList.add("activeQuiz"); //show quiz box
    showQuetions(0); //calling showQestions function
    queCounter(1); //passing 1 parameter to queCounter
    startTimer(15); //calling startTimer function
    startTimerLine(0); //calling startTimerLine function
}

let timeValue =  15;
let que_count = 0;
let que_numb = 1;
let userScore = 0;
let totalScore=0;
let counter;
let counterLine;
let widthValue = 0;
let clickAnswers = 0

const restart_quiz = result_box.querySelector(".buttons .restart");
const quit_quiz = result_box.querySelector(".buttons .quit");

// if restartQuiz button clicked
restart_quiz.onclick = ()=>{
    quiz_box.classList.add("activeQuiz"); //show quiz box
    result_box.classList.remove("activeResult"); //hide result box
    timeValue = 15; 
    que_count = 0;
    que_numb = 1;
    totalScore=0;
    score = 0
    userScore = 0;
    widthValue = 0;
    clickAnswers=0;
    showQuetions(que_count); //calling showQestions function
    queCounter(que_numb); //passing que_numb value to queCounter
    clearInterval(counter); //clear counter
    clearInterval(counterLine); //clear counterLine
    startTimer(timeValue); //calling startTimer function
    startTimerLine(widthValue); //calling startTimerLine function
    timeText.textContent = "Time Left"; //change the text of timeText to Time Left
    next_btn.classList.remove("show"); //hide the next button
}

// if quitQuiz button clicked
quit_quiz.onclick = ()=>{
    window.location.reload(); //reload the current window
}

const next_btn = document.querySelector("footer .next_btn");
const bottom_ques_counter = document.querySelector("footer .total_que");

// if Next Que button clicked

next_btn.onclick = ()=>{
    if(que_count < questions.length - 1){ //if question count is less than total question length
        que_count++; //increment the que_count value
        que_numb++; //increment the que_numb value
        showQuetions(que_count); //calling showQestions function
        queCounter(que_numb); //passing que_numb value to queCounter
        clearInterval(counter); //clear counter
        clearInterval(counterLine); //clear counterLine
        startTimer(timeValue); //calling startTimer function
        startTimerLine(widthValue); //calling startTimerLine function
        timeText.textContent = "Time Left"; //change the timeText to Time Left
        next_btn.classList.remove("show"); //hide the next button
    }else{
        clearInterval(counter); //clear counter
        clearInterval(counterLine); //clear counterLine
        showResult(); //calling showResult function
    }
}

// getting questions and options from array
function showQuetions(index){
    const questionDOM = document.querySelector(".que_text");
    if(questions[index].isCorrect.length == 1){
        typeAnswers.innerHTML = "There is "+ questions[index].isCorrect.length + " answer correct !!!"
    }else{typeAnswers.innerHTML = "There are "+ questions[index].isCorrect.length + " answers correct !!!"}

//creating a new span and div tag for question and option and passing the value using array index
    let dom_Question = '<span>'+ que_numb + ". " + questions[index].question + " (" + questions[index].score + 'pt )</span>';
    let numOfAnswers = questions[index].answers
    let option_tag = ""
    for(A=0; A < numOfAnswers.length; A++){
        option_tag += '<div class="option"><span>'+ questions[index].answers[A] +'</span></div>'
    }
    
    questionDOM.innerHTML = dom_Question; //adding new span tag inside dom_Question
    answersDOM.innerHTML = option_tag; //adding new div tag inside option_tag
    
    const option = answersDOM.querySelectorAll(".option");
    totalScore += questions[index].score
    score = questions[index].score
    // set onclick attribute to all available options
    for(i=0; i < option.length; i++){
        option[i].setAttribute("onclick", "optionSelected(this)");
    }
}


// creating the new div tags which for icons
let tickIconTag = '<div class="icon tick"><i class="fas fa-check"></i></div>';
let crossIconTag = '<div class="icon cross"><i class="fas fa-times"></i></div>';

//if user clicked on option

function optionSelected(answer){
    clickAnswers ++
    let userAns = answer.textContent; //getting user selected option
    let correcAns = questions[que_count].isCorrect; //getting correct answer from array
    const allOptions = answersDOM.children.length; //getting all option items
    let outOfCorrect = 0;
    for(correctanswer of correcAns){
        outOfCorrect++
        if(userAns == correctanswer){ //if user selected option is equal to array's correct answer
            answer.classList.add("correct"); //adding green color to correct selected option
            answer.insertAdjacentHTML("beforeend", tickIconTag); //adding tick icon to correct selected option
        }else if(outOfCorrect == correcAns.length && !answer.children[1]){
            score -= questions[que_count].score/correcAns.length;
            answer.classList.add("incorrect"); //adding red color to correct selected option
            answer.insertAdjacentHTML("beforeend", crossIconTag); //adding cross icon to correct selected option
            for(i=0; i < allOptions; i++){
                if(answersDOM.children[i].textContent == correcAns){ //if there is an option which is matched to an array answer 
                    answersDOM.children[i].setAttribute("class", "option correct"); //adding green color to matched option
                    answersDOM.children[i].insertAdjacentHTML("beforeend", tickIconTag); //adding tick icon to matched option
                }
            }
           
        }
    }
    
    // multiple choice of question
    if(clickAnswers == correcAns.length){
        clearInterval(counter); //clear counter
        clearInterval(counterLine); //clear counterLine
        userScore += parseInt(score)  //upgrading score value with 1
        for(i=0; i < allOptions; i++){
            answersDOM.children[i].classList.add("disabled"); //once user select an option then disabled all options
            clickAnswers = 0
        }
        next_btn.classList.add("show"); //show the next button if user selected any option
    } 
}

function showResult(){
    info_box.classList.remove("activeInfo"); //hide info box
    quiz_box.classList.remove("activeQuiz"); //hide quiz box
    result_box.classList.add("activeResult"); //show result box
    const scoreText = result_box.querySelector(".score_text");
    if (userScore > totalScore-totalScore/4){ // if user scored more than 3
        //creating a new span tag and passing the user score number and total question number
        let scoreTag = '<span>and congrats! 🎉, You got <p>'+ userScore +'</p> out of <p>'+ totalScore +'</p></span>';
        scoreText.innerHTML = scoreTag;  //adding new span tag inside score_Text
    }
    else if(userScore > totalScore-totalScore/2){ // if user scored more than 1
        let scoreTag = '<span>and nice 😎, You got <p>'+ userScore +'</p> out of <p>'+ totalScore +'</p></span>';
        scoreText.innerHTML = scoreTag; 
    }
    else{ // if user scored less than 1
        let scoreTag = '<span>and sorry 😐, You got only <p>'+ userScore +'</p> out of <p>'+ totalScore +'</p></span>';
        scoreText.innerHTML = scoreTag;
    }
}

function startTimer(time){
    counter = setInterval(timer, 1000);
    function timer(){
        timeCount.textContent = time; //changing the value of timeCount with time value
        time--; //decrement the time value
        if(time < 9){ //if timer is less than 9
            let addZero = timeCount.textContent; 
            timeCount.textContent = "0" + addZero; //add a 0 before time value
        }
        if(time < 0){ //if timer is less than 0
            clearInterval(counter); //clear counter
            timeText.textContent = "Time Off"; //change the time text to time off
            const allOptions = answersDOM.children.length; //getting all option items
            let correcAns = questions[que_count].isCorrect; //getting correct answer from arra
            for(i=0; i < allOptions; i++){
                for(correctanswer of correcAns){
                    if(answersDOM.children[i].textContent == correctanswer && !answersDOM.children[i].children[1]){ //if there is an option which is matched to an array answer
                        answersDOM.children[i].setAttribute("class", "option correct"); //adding green color to matched option
                        answersDOM.children[i].insertAdjacentHTML("beforeend", tickIconTag); //adding tick icon to matched option
                        console.log("Time Off: Auto selected correct answer.");
                    }
                }
                if(!answersDOM.children[i].children[1]){
                    answersDOM.children[i].classList.add("incorrect"); //adding red color to correct selected option
                    answersDOM.children[i].insertAdjacentHTML("beforeend", crossIconTag); //adding cross icon to correct selected option
                    console.log("Wrong Answer");
                }else{false}
                answersDOM.children[i].classList.add("disabled"); //once user select an option then disabled all options
            }
            next_btn.classList.add("show"); //show the next button if user selected any option
        }
    }
}

function startTimerLine(time){
    let widthOfdomline = quiz_box.clientWidth-1
    console.log("my line is", widthOfdomline);
    counterLine = setInterval(timer, 29);
    function timer(){
        time += 1; //upgrading time value with 1
        time_line.style.width = time + "px"; //increasing width of time_line with px by time value
        if(time > widthOfdomline){ //if time value is greater than 549
            clearInterval(counterLine); //clear counterLine
        }
    }
}

function queCounter(index){
    let totalQueCounTag = '<span><p>'+ index +'</p> of <p>'+ questions.length +'</p> Questions</span>';
    bottom_ques_counter.innerHTML = totalQueCounTag;  
}

