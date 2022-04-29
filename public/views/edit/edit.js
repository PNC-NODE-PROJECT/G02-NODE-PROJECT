// URL FROM SERVER



// TODO: call paramater
const URL = "http://localhost:80"


let displayDomscreen = document.getElementById("dopDisplayOnscreen")
const btnAddandUpdateQuestion = document.getElementById("btnAdd")
let dom_CreateQuestion = document.querySelector(".contentInput")
let DOMBODY=document.body

function updateData(update){
    // TODO: Request to the server to update one task as completed
    let body = {title:update.quiz, question:update.question, isCorrect:update.isCorrect, answers:update.answers, score:update.score}
    axios.put(URL + "/questions/update/" + update.id,body)
    .catch((error)=>{console.log(error)})
    displayQuestions()
}


 // TODO: Request to the server to detele one task

function deleteData(question){
    axios.delete(URL + "/questions/delete/" + question)
    .catch((error)=>{console.log(error)})
    displayQuestions()
}

 // TODO: request question from server and add DOM

function addData(add){
    console.log("my quiz title is ", add.quiz);
    let body = {title:add.quiz, question:add.question, isCorrect:add.isCorrect, answers:add.answers, score:add.score}
    axios.post(URL + "/questions/add", body)
    .then((result)=>{console.log(result)})
    .catch((error)=>{console.log("My post is error at", error)})
    displayQuestions()
}

 // TODO: request from from server and update DOM

function displayQuestions(){
    axios.get("/questions/get")
    .then((result)=>{refreshDOM(result.data)})
    .catch((error)=>{console.log("You are error at", error)})
}
displayQuestions()


//////////////// show list question ////////////////////////
function refreshDOM(displayData){
    displayData = displayData.reverse()
    while (displayDomscreen.firstChild) {displayDomscreen.removeChild(displayDomscreen.lastChild)}
    displayData.forEach(element => {
        const questionAndAnswersDom=document.createElement("div")
        questionAndAnswersDom.className = "setListAdd"
        const questionDOM = document.createElement("div")
       questionDOM.className = "li-getquestion"
       questionDOM.id = element._id
        const span = document.createElement("span")
        span.className = "getValue"
        span.textContent = element.question
       questionDOM.appendChild(span)
        let btn=document.createElement("button")
        btn.className = "btnInQuest"
       questionDOM.appendChild(btn)
        const imgEdit=document.createElement("img")
        imgEdit.src="../../img/edit.png"
        imgEdit.className="editor"
       
        btn.appendChild(imgEdit)
        let imgDelete=document.createElement("img")
        imgDelete.src="../../img/delete-icon.png"
        imgDelete.className="deleter"
        btn.appendChild(imgDelete)
        if(element.title!=="undefined"){
            document.getElementById("subjectQuiz").textContent = element.title
        }
        // create dom answers

        const answersDom = document.createElement("div")
        answersDom.className = "answers_list";
        let answers = element.answers
        let correctANswers = element.isCorrect
       
        for (num = 0; num < answers.length; num++){
            let divOption = document.createElement("div")
            let spanAnswer = document.createElement("span");
            divOption.appendChild(spanAnswer)
            spanAnswer.textContent = answers[num]
            divOption.className = "option"
            correctANswers.forEach(element => {if(answers[num]== element){divOption.className = "option correct"}})
            answersDom.appendChild(divOption)
        }
 
        // create dom show and hide answer

        let dom_onHideAndShow=document.createElement("div");
        dom_onHideAndShow.className = "clickDesplay";
        let btnClick = document.createElement("i")
        btnClick.className = "fas fa-chevron-circle-up"
        dom_onHideAndShow.appendChild(btnClick)
        ///appendquestion to dom
        questionAndAnswersDom.appendChild(questionDOM)
        questionAndAnswersDom.appendChild(answersDom)
        questionAndAnswersDom.appendChild(dom_onHideAndShow)
        // append question and answer to display on screen
        displayDomscreen.appendChild(questionAndAnswersDom)
     
    });
}


// TODO: even function 

function displayCorrectAnswerIdDOM(option){
    for (item of option.children){
        let iconTage = document.createElement("div")
        let icon = document.createElement("i")
        if(item.className=="option correct"){
            iconTage.className ="icon tick"
            icon.className = "fas fa-check"
            iconTage.appendChild(icon)
            
        }else{
            console.log(item);
            item.className="option incorrect"
            iconTage.className ="icon cross"
            icon.className = "fas fa-times"
        }
        iconTage.appendChild(icon)
        item.appendChild(iconTage)
    }
}


// update question in dom
function updateDataInDom(question){
    // TODO: request data from server
    axios.get("/questions/get")
    .then((result)=>{
        let questionToupdate = result.data
        document.getElementById("btnAdd").value = "Update"
        let dom_Answers = document.querySelectorAll("#answer")
        let dom_CorrectAnswers = document.querySelectorAll("#correctAnswerId")
        questionToupdate.forEach(element => {
            if(question == element._id){
                dom_CreateQuestion.id = element._id
                document.getElementById("getTitle").value = element.title
                document.getElementById("getScore").value = element.score
                document.getElementById("QuestionId").value = element.question
                for(let index=0; index < element.answers.length; index++){
                    let answer = element.answers[index]
                    let correctAnswer = element.isCorrect
                    dom_Answers[index].value = answer
                    for(let i = 0; i < correctAnswer.length; i++){
                        if(correctAnswer[i] == answer && correctAnswer[i].length == answer.length){dom_CorrectAnswers[index].checked=true}
                    }
                }

            }
        });
    })
}


// get question and answer from user create
function getInputFrom_Dom(btn){
    let data = {}
    let getAnswers=[]
    let isCorrectAnswer=[]
    let quizTitle= document.getElementById("getTitle").value
    let userSetScore = document.getElementById("getScore").value
    let questionInput = document.getElementById("QuestionId").value
    let dom_Answers = document.querySelectorAll("#answer")
    let dom_CorrectAnswers = document.querySelectorAll("#correctAnswerId")
    for(index = 0; index<dom_Answers.length; index++){
        getAnswers.push(dom_Answers[index].value)
        if(dom_CorrectAnswers[index].checked){
            isCorrectAnswer.push(dom_Answers[index].value)
        }
    }
    if(getAnswers.length > 0 && isCorrectAnswer.length > 0 && btn.value =="Add+"){
        data.question = questionInput
        data.isCorrect = isCorrectAnswer
        data.answers = getAnswers
        data.score = parseInt(userSetScore)
        data.quiz = quizTitle
        addData(data)
        
    }if(btn.value == "Update"){
        data.question = questionInput
        data.isCorrect = isCorrectAnswer
        data.answers = getAnswers
        data.score = parseInt(userSetScore)
        data.quiz = quizTitle
        data.id = btn.parentElement.id
        updateData(data)
        document.getElementById("btnAdd").value = "Add+"
    }
    clearFormInput()
}

// clear user in put

function clearFormInput(){
    document.getElementById("getScore").value=""
    document.getElementById("QuestionId").value=""
    document.querySelectorAll("#answer").forEach(element => {
        element.value=""
    });
    document.querySelectorAll("#correctAnswerId").forEach(element => {
        element.checked=false
    });
}



// TODO: event button

// click add question or update
btnAddandUpdateQuestion.addEventListener("click",()=>{getInputFrom_Dom(btnAddandUpdateQuestion)})

// click delete question or update

displayDomscreen.addEventListener("click", (e)=>{
    e.preventDefault()
    if(e.target.className=="deleter"){
        let questionToRemove = e.target.parentElement.parentElement.id
        deleteData(questionToRemove)
    }if(e.target.className == "editor"){
        let questionToupdate = e.target.parentElement.parentElement.id
        updateDataInDom(questionToupdate)
    }
})

// button to show and hind answer


DOMBODY.addEventListener("click", (e)=>{
    if(e.target.className == "fas fa-chevron-circle-down"){
        let hide = e.target.parentElement.parentElement.children[1]
        hide.style.display="none"
        e.target.className = "fas fa-chevron-circle-up"
    }else if(e.target.className == "fas fa-chevron-circle-up"){
        let hide = e.target.parentElement.parentElement.children[1]
        displayCorrectAnswerIdDOM(hide)
        hide.style.display="block"
        e.target.className ="fas fa-chevron-circle-down"
    }
})