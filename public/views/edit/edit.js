// URL FROM SERVER

const URL = "http://localhost:80"

function updateData(update){
    // TODO: Request to the server to update one task as completed
    let body = {title:update.quiz, question:update.question, isCorrect:update.isCorrect, answers:update.answers, score:update.score}
    axios.put(URL + "/questions/update/" + update.id,body)
    .catch((error)=>{console.log(error)})
    refreshData()
}


 // TODO: Request to the server to detele one task

function deleteData(question){
    axios.delete(URL + "/questions/delete/" + question)
    .catch((error)=>{console.log(error)})
    refreshData()
}

 // TODO: request question from server and add DOM

function addData(add){
    console.log("my quiz title is ", add.quiz);
    let body = {title:add.quiz, question:add.question, isCorrect:add.isCorrect, answers:add.answers, score:add.score}
    axios.post(URL + "/questions/add", body)
    .then((result)=>{console.log(result)})
    .catch((error)=>{console.log("My post is error at", error)})
    refreshData()
}

 // TODO: request tasks from server and update DOM

function refreshData(){
    axios.get("/questions/get")
    .then((result)=>{listQuestions(result.data)})
    .catch((error)=>{console.log("You are error at", error)})
}
refreshData()


//////////////// show list question ////////////////////////
function listQuestions(questions){
    while (dom_listQuestions.firstChild) {
        dom_listQuestions.removeChild(dom_listQuestions.lastChild);
      }
    questions.forEach(element => {
        const li = document.createElement("li")
        li.className = "li-getquestion"
        li.id = element._id
        const span = document.createElement("span")
        span.className = "getValue"
        span.textContent = element.question
        li.appendChild(span)
        let btn=document.createElement("button")
        btn.className = "btnInQuest"
        li.appendChild(btn)
        const imgEdit=document.createElement("img")
        imgEdit.src="../../img/edit.png"
        imgEdit.className="editor"
       
        btn.appendChild(imgEdit)
        let imgDelete=document.createElement("img")
        imgDelete.src="../../img/delete-icon.png"
        imgDelete.className="deleter"
        btn.appendChild(imgDelete)
        dom_listQuestions.appendChild(li)
        if(element.title!=="undefined"){
            document.getElementById("subjectQuiz").textContent = element.title
        }
    });
}



// TODO: even function 

// // update question in dom
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
                for(let index=0; index < dom_Answers.length; index++){
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
    console.log("Create question: ", data);
    clearForm()
}

// clear user in put

function clearForm(){
    document.getElementById("getScore").value=""
    document.getElementById("QuestionId").value=""
    document.querySelectorAll("#answer").forEach(element => {
        element.value=""
    });
    document.querySelectorAll("#correctAnswerId").forEach(element => {
        element.checked=false
    });
}


// TODO: call paramater

let dom_listQuestions = document.getElementById("question_view")
const btnAddandUpdateQuestion = document.getElementById("btnAdd")
let dom_CreateQuestion = document.querySelector(".contentInput")

// TODO: event button

// click add question or update
btnAddandUpdateQuestion.addEventListener("click",()=>{getInputFrom_Dom(btnAddandUpdateQuestion)})

// click delete question or update

dom_listQuestions.addEventListener("click", (e)=>{
    e.preventDefault()
    if(e.target.className=="deleter"){
        let questionToRemove = e.target.parentElement.parentElement.id
        deleteData(questionToRemove)
    }if(e.target.className == "editor"){
        let questionToupdate = e.target.parentElement.parentElement.id
        updateDataInDom(questionToupdate)
    }
})