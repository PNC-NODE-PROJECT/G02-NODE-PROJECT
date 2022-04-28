
let questions; 
//= [
//     {
//     numb: 1,
//     question: "What does HTML stand for?",
//     answer: "Hyper Text Markup Language", 
//     options: [
//       "Hyper Text Preprocessor",
//       "Hyper Text Markup Language",
//       "Hyper Text Multiple Language",
//       "Hyper Tool Multi Language"
//     ]
//   },
//     
// ];


//=====================================================================================
// VARIBLE

let contianerFirst = document.querySelector(".contianerApp")
let contianerListTitle = document.querySelector(".contianerList")
let contianerCreate = document.querySelector(".contianerForm")
let contianerQuiz = document.querySelector(".contianerQuiz")
let listAddQu = document.querySelector(".setListAdd")
let setLists = document.querySelector(".setList")
const dom_btnToquiz = document.querySelector(".btn-ToQuiz")
let dom_menu = document.querySelector('.menu')
let checkAllBox = document.getElementsByName("check")
let countAddQ=0
let updateQuNum = 0
let indexEdit=0
let counterCreateQues = true
let timeCount = document.querySelector(".timer .timer_sec");
/////////// VARIABLE DURING PLAY QUIZ ///////////
let timeValue;
let que_count = 0;
let que_numb = 1;
let userScore = 0;
let counter;
let counterLine;
let widthValue = 0;
let storeQuestion;
let scoreInput;
//=======================================================================================
// FUNCTION 

function show(element){
    element.style.display="block"
}

function hide(element){
    element.style.display="none"
}


/////////// local storage ///////////

function setDataTolocalsotrage(){
    localStorage.setItem("questions",JSON.stringify(questions));
    localStorage.setItem('time', JSON.stringify(timeValue))
    localStorage.setItem('score', JSON.stringify(scoreInput))
    dataQuestions()
}

function dataQuestions(){
    storeQuestion = JSON.parse(localStorage.getItem('questions'))
    scoreInput = JSON.parse(localStorage.getItem('score'));
    if (storeQuestion!=null){
        questions = storeQuestion
        if (counterCreateQues==true){
            countAddQ=0;
            showListQuestion()
            counterCreateQues=false
        }
    }
    timeValue = JSON.parse(localStorage.getItem('time'))
    console.log('time: ', timeValue);
    console.log('score: ', scoreInput);
    console.log("storage: ", storeQuestion);
}

///////////// SELECT ANSWERS ////////////

function createAnswerAndChose(){
    let countQ = questions.length
    let getQInput={}
    let getOption=[]
    let thisAnswer=""
    let quizTitle=document.getElementById("getTitle").value
    let getQuestion=document.getElementById("QuestionId").value
    let answer1=document.getElementById("answer1Id").value
    let answer2=document.getElementById("answer2Id").value
    let answer3=document.getElementById("answer3Id").value
    let answer4=document.getElementById("answer4Id").value
    const checkA1=document.getElementById("A1")
    const checkA2=document.getElementById("A2")
    const checkA3=document.getElementById("A3")
    const checkA4=document.getElementById("A4")
    if (getQuestion!=="" && answer1!=="" && answer2!=="" && answer3!=="" && answer4!==""){
        if (checkA1.checked || checkA2.checked || checkA3.checked || checkA4.checked){
            if (checkA1.checked){
                thisAnswer = answer1
            }else if (checkA2.checked){
                thisAnswer = answer2
            }else if(checkA3.checked){
                thisAnswer = answer3
            }else if(checkA4.checked){
                thisAnswer = answer4
            }
            
            getOption.push(answer1)
            getOption.push(answer2)
            getOption.push(answer3)
            getOption.push(answer4)

            getQInput.numb = countQ+1
            getQInput.question = getQuestion
            getQInput.answer = thisAnswer
            getQInput.options = getOption
            questions.push(getQInput)
            goodInput()
            addQuestions(getQuestion)
            clearInput()
            addTitleQuiz(quizTitle)
            deSelectAnswers()
            setDataTolocalsotrage()
        }else{
            swal.fire({
                icon: 'error',
                title: 'Cannot Add',
                text: 'Please select your answer',
                timer: 5000
            })
        }
    }else{
        errorInput()
    }
}

///////////////// CLEAR INFORMATION ////////

function clearInput(){
    document.getElementById("QuestionId").value=""
    document.getElementById("answer1Id").value=""
    document.getElementById("answer2Id").value=""
    document.getElementById("answer3Id").value=""
    document.getElementById("answer4Id").value=""
}

/////// EDIT QUESTION AN ANSWERS //////////////

function CheckToEdit(edit){
    edit.addEventListener("click",(e)=>{
        if (e.target==edit){
            let index=e.target.id
            document.getElementById("QuestionId").value = questions[index].question
            document.getElementById("answer1Id").value = questions[index].options[0]
            document.getElementById("answer2Id").value = questions[index].options[1]
            document.getElementById("answer3Id").value = questions[index].options[2]
            document.getElementById("answer4Id").value = questions[index].options[3] 
            e.target.parentNode.parentNode.remove()
            document.querySelector(".btnAdd").value="Update"
            updateQuNum = questions[index].numb
            indexEdit = index
            questions.splice(index,1)
            setDataTolocalsotrage()
        }
    })
}

//////////////// DESELECTED /////////////
function deSelectAnswers(){
    checkAllBox.forEach((elBox)=> elBox.checked=false)
    document.querySelector(".btnAdd").value="Add+"
}

//////////////// ADD QUESTION ////////////////////////
function addQuestions(question){
    const li = document.createElement("li")
    li.className = "li-getquestion"
    const span = document.createElement("span")
    span.className = "getValue"
    span.textContent=question
    li.appendChild(span)
    let btn=document.createElement("button")
    btn.className = "btnInQuest"
    li.appendChild(btn)
    const imgEdit=document.createElement("img")
    imgEdit.src="img/edit.png"
    imgEdit.className="editor"
    imgEdit.id=countAddQ
    btn.appendChild(imgEdit)
    let imgDelete=document.createElement("img")
    imgDelete.src="img/delete-icon.png"
    imgDelete.className="deleter"
    imgDelete.id = countAddQ
    btn.appendChild(imgDelete)
    listAddQu.appendChild(li)
    deleteQuestion(imgDelete)
    CheckToEdit(imgEdit)
    countAddQ++
    timeValue = document.getElementById("gettimer").value
}

//////// UPDATE ////////////////

function updateQbyHTML(question){
    const li = document.createElement("li")
    li.className = "li-getquestion"
    const span = document.createElement("span")
    span.className = "getValue"
    span.textContent=question
    li.appendChild(span)
    let btn=document.createElement("button")
    btn.className = "btnInQuest"
    li.appendChild(btn)
    const imgEdit=document.createElement("img")
    imgEdit.src="img/edit.png"
    imgEdit.className="editor"
    imgEdit.id = indexEdit
    btn.appendChild(imgEdit)
    let imgDelete=document.createElement("img")
    imgDelete.src="img/delete-icon.png"
    imgDelete.className="deleter"
    imgDelete.id = indexEdit
    btn.appendChild(imgDelete)
    listAddQu.appendChild(li)
    deleteQuestion(imgDelete)
    CheckToEdit(imgEdit)
    console.log('li: ', listAddQu);
    timeValue = document.getElementById("gettimer").value
}

///////// UPDATE QUESTION ////////////
function updateQuestion(){
    let getQInput={}
    let getOption=[]
    let thisAnswer=""
    let quizTitle=document.getElementById("getTitle").value
    let getQuestion=document.getElementById("QuestionId").value
    let answer1=document.getElementById("answer1Id").value
    let answer2=document.getElementById("answer2Id").value
    let answer3=document.getElementById("answer3Id").value
    let answer4=document.getElementById("answer4Id").value
    const checkA1=document.getElementById("A1")
    const checkA2=document.getElementById("A2")
    const checkA3=document.getElementById("A3")
    const checkA4=document.getElementById("A4")
    if (getQuestion!=="" && answer1!=="" && answer2!=="" && answer3!=="" && answer4!==""){
        if (checkA1.checked || checkA2.checked || checkA3.checked || checkA4.checked){
            if (checkA1.checked){
                thisAnswer = answer1
            }else if (checkA2.checked){
                thisAnswer = answer2
            }else if(checkA3.checked){
                thisAnswer = answer3
            }else if(checkA4.checked){
                thisAnswer = answer4
            }
            getOption.push(answer1)
            getOption.push(answer2)
            getOption.push(answer3)
            getOption.push(answer4)

            getQInput.numb = updateQuNum
            getQInput.question = getQuestion
            getQInput.answer = thisAnswer
            getQInput.options = getOption
            questions.splice(indexEdit, 0, getQInput);
            goodInput()
            updateQbyHTML(getQuestion)
            clearInput()
            addTitleQuiz(quizTitle)
            deSelectAnswers()
            setDataTolocalsotrage()
        }else{
            swal.fire({
                icon: 'error',
                title: 'Cannot Update',
                text: 'Please select your answer',
                timer: 5000
            })
        }
    }else{
        errorInput()
    }
}

/////// CHECK ADD OR UPDATE QUESTION //////
function checkAddOrUpdate(){
    if (document.querySelector(".btnAdd").value.toLowerCase()=="add+"){
        createAnswerAndChose()
        console.log('add Question');
    }else if(element="update"){
        console.log("update question");
        updateQuestion()
    }
}

function showListQuestion(){
    for (let index = 0; index < questions.length ; index++){
       addQuestions(questions[index].question)
    }
}

////////////// ADD QUIZ ////////////
function addTitleQuiz(quiz){
    if (quiz!==""){
        document.getElementById("subjectQuiz").textContent=quiz
        document.querySelector(".titleQuiz").classList.remove("hide")
    }
}
/////////// DELETE QUESTION ////////////

function deleteQuestion(deletes){
    deletes.addEventListener("click",(e)=>{
        if (e.target==deletes){
            let parent=e.target.parentNode.parentNode.parentNode
            while (parent.firstChild) {
                parent.removeChild(parent.firstChild);
            }
            counterCreateQues=true
            questions.splice(e.target.id, 1)
            console.log("deleteQ: ", e.target.id);
            setDataTolocalsotrage()
            console.log('parents: ',parent);
        }
    })
}

function goodInput(){
    swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Question added',
        showConfirmButton: false,
        timer: 3000
    }) 
}

function errorInput(){
    swal.fire({
        icon: 'error',
        title: 'Cannot Add',
        text: 'You need complete all',
        timer: 5000
    })
}

/////// GO TO PLAY QUIZ ////////
dom_btnToquiz.addEventListener("click",()=>{
    hide(contianerFirst)
    show(contianerQuiz)
    hide(contianerCreate)
    addTitleQuiz("Language code")
    document.getElementById("quizTitle").textContent = document.getElementById("subjectQuiz").textContent
    document.getElementById("showtitle").textContent = document.getElementById("subjectQuiz").textContent
    document.getElementById("timeRule").textContent = timeValue
    dataQuestions()
    // hide(dom_menu)
})

// =====================================================================================

let btnToCreate = document.querySelector(".btn-ToCreat")
btnToCreate.addEventListener("click",()=>{
    hide(contianerFirst)
    hide(contianerQuiz)
    show(contianerCreate)
    addTitleQuiz("Language code")
    dataQuestions()
    saved=false
})

let saved = true
let btnBackToFirst = document.querySelectorAll(".imgBack")
btnBackToFirst.forEach((btnEl) =>{
    btnEl.addEventListener("click",()=>{
        if (saved==true){
            hide(contianerQuiz)
            hide(contianerCreate)
            show(contianerFirst)
        }else{
            swal.fire({
                icon: 'error',
                title: 'Cannot back',
                text: 'You need to save',
                timer: 5000
            })
        }
    })
})

const btnAddQuestion = document.querySelector(".btnAdd")
btnAddQuestion.addEventListener("click", checkAddOrUpdate)

const btnSave = document.getElementById("btnSaveId")
btnSave.addEventListener("click",()=>{
    let putTitle = document.getElementById("subjectQuiz").textContent
    if (putTitle!="" && questions.length>0){
        swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Quiz saved',
            showConfirmButton: false,
            timer: 3000
        }) 
        saved=true
        
       
        document.getElementById("quizTitle").textContent = putTitle
        document.getElementById("showtitle").textContent = putTitle
        document.getElementById("getTitle").value = ""
        
    }if ( document.getElementById("gettimer").value!=null || document.getElementById("getScore")!=null){
        scoreInput = parseInt(document.getElementById("getScore").value)
        timeValue = document.getElementById("gettimer").value
        document.getElementById("gettimer").value=''
        document.getElementById("getScore").value=''

    }else{
        swal.fire({
            icon: 'error',
            title: 'Cannot Save',
            text: 'Missing some require',
            timer: 5000
        })
    } 

    
})

//////////// PLAY QUIZ ////////////////

//selecting all required elements
const start_btn = document.querySelector(".start_btn button");
const info_box = document.querySelector(".info_box");
const exit_btn = info_box.querySelector(".buttons .quit");
const continue_btn = info_box.querySelector(".buttons .restart");
const quiz_box = document.querySelector(".quiz_box");
const result_box = document.querySelector(".result_box");
const option_list = document.querySelector(".option_list");
const time_line = document.querySelector("header .time_line");
const timeText = document.querySelector(".timer .time_left_txt");


// if startQuiz button clicked
start_btn.onclick = ()=>{
    info_box.classList.add("activeInfo"); //show info box
    document.getElementById("timeRule").textContent = timeValue;
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
    startTimer(timeValue); //calling startTimer function
    // startTimerLine(0); //calling startTimerLine function
    document.getElementById("timeplay").textContent = timeValue;
}


const restart_quiz = result_box.querySelector(".buttons .restart");
const quit_quiz = result_box.querySelector(".buttons .quit");

// if restartQuiz button clicked
restart_quiz.onclick = ()=>{
    quiz_box.classList.add("activeQuiz"); //show quiz box
    result_box.classList.remove("activeResult"); //hide result box
    que_count = 0;
    que_numb = 1;
    userScore = 0;
    widthValue = 0;
    showQuetions(que_count); //calling showQestions function
    queCounter(que_numb); //passing que_numb value to queCounter
    clearInterval(counter); //clear counter
    // clearInterval(counterLine); //clear counterLine
    startTimer(timeValue); //calling startTimer function
    // // startTimerLine(widthValue); //calling startTimerLine function
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
        // clearInterval(counterLine); //clear counterLine
        startTimer(timeValue); //calling startTimer function
        // // startTimerLine(widthValue); //calling startTimerLine function
        timeText.textContent = "Time Left"; //change the timeText to Time Left
        next_btn.classList.remove("show"); //hide the next button
    }else{
        clearInterval(counter); //clear counter
        // clearInterval(counterLine); //clear counterLine
        showResult(); //calling showResult function
    }
}

// getting questions and options from array
function showQuetions(index){
    const que_text = document.querySelector(".que_text");
    //creating a new span and div tag for question and option and passing the value using array index
    let que_tag = '<span>'+ questions[index].numb + ". " + questions[index].question +'</span>';
    let option_tag = '<div class="option"><span>'+ questions[index].options[0] +'</span></div>'
    + '<div class="option"><span>'+ questions[index].options[1] +'</span></div>'
    + '<div class="option"><span>'+ questions[index].options[2] +'</span></div>'
    + '<div class="option"><span>'+ questions[index].options[3] +'</span></div>';
    que_text.innerHTML = que_tag; //adding new span tag inside que_tag
    option_list.innerHTML = option_tag; //adding new div tag inside option_tag
    
    const option = option_list.querySelectorAll(".option");

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

    clearInterval(counter); //clear counter
    // clearInterval(counterLine); //clear counterLine
    let userAns = answer.textContent; //getting user selected option
    let correcAns = questions[que_count].answer; //getting correct answer from array
    const allOptions = option_list.children.length; //getting all option items
    
    if(userAns == correcAns){ //if user selected option is equal to array's correct answer
        userScore += parseInt(scoreInput); //upgrading score value with 1
        console.log('score: ', scoreInput);
        answer.classList.add("correct"); //adding green color to correct selected option
        answer.insertAdjacentHTML("beforeend", tickIconTag); //adding tick icon to correct selected option
        console.log("Correct Answer");
        console.log("Your correct answers = " + userScore);
    }else{
        answer.classList.add("incorrect"); //adding red color to correct selected option
        answer.insertAdjacentHTML("beforeend", crossIconTag); //adding cross icon to correct selected option
        console.log("Wrong Answer");

        for(i=0; i < allOptions; i++){
            if(option_list.children[i].textContent == correcAns){ //if there is an option which is matched to an array answer 
                option_list.children[i].setAttribute("class", "option correct"); //adding green color to matched option
                option_list.children[i].insertAdjacentHTML("beforeend", tickIconTag); //adding tick icon to matched option
                console.log("Auto selected correct answer.");
            }
        }
    }
    for(i=0; i < allOptions; i++){
        option_list.children[i].classList.add("disabled"); //once user select an option then disabled all options
    }
    next_btn.classList.add("show"); //show the next button if user selected any option
}


function showResult(){
    info_box.classList.remove("activeInfo"); //hide info box
    quiz_box.classList.remove("activeQuiz"); //hide quiz box
    result_box.classList.add("activeResult"); //show result box
    const scoreText = result_box.querySelector(".score_text");
    if (userScore > 3){ // if user scored more than 3
        //creating a new span tag and passing the user score number and total question number
        let scoreTag = '<span>and congrats! , You got <p>'+ userScore +'</p> out of <p>'+ questions.length*scoreInput +'</p></span>';
        scoreText.innerHTML = scoreTag;  //adding new span tag inside score_Text
    }
    else if(userScore > 1){ // if user scored more than 1
        let scoreTag = '<span>and nice , You got <p>'+ userScore +'</p> out of <p>'+ questions.length*scoreInput +'</p></span>';
        scoreText.innerHTML = scoreTag;
    }
    else{ // if user scored less than 1
        let scoreTag = '<span>and sorry , You got only <p>'+ userScore +'</p> out of <p>'+ questions.length*scoreInput +'</p></span>';
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
            const allOptions = option_list.children.length; //getting all option items
            let correcAns = questions[que_count].answer; //getting correct answer from array
            for(i=0; i < allOptions; i++){
                if(option_list.children[i].textContent == correcAns){ //if there is an option which is matched to an array answer
                    option_list.children[i].setAttribute("class", "option correct"); //adding green color to matched option
                    option_list.children[i].insertAdjacentHTML("beforeend", tickIconTag); //adding tick icon to matched option
                    console.log("Time Off: Auto selected correct answer.");
                }
            }
            for(i=0; i < allOptions; i++){
                option_list.children[i].classList.add("disabled"); //once user select an option then disabled all options
            }
            next_btn.classList.add("show"); //show the next button if user selected any option
        }
    }
}

// function startTimerLine(time){
// //     counterLine = setInterval(timer, 29);
// //     function timer(){
// //         time += 1; //upgrading time value with 1
// //         time_line.style.width = time + "px"; //increasing width of time_line with px by time value
// //         if(time > 649){ //if time value is greater than 549
//             clearInterval(counterLine); //clear counterLine
// //         }
// //     }
// // }

function queCounter(index){
    //creating a new span tag and passing the question number and total question
    let totalQueCounTag = '<span><p>'+ index +'</p> of <p>'+ questions.length +'</p> Questions</span>';
    bottom_ques_counter.innerHTML = totalQueCounTag;  //adding new span tag inside bottom_ques_counter
}