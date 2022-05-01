// URL FROM SERVER




// TODO: get URL api

const URL = "http://localhost:80"

//TODO: selecting all required elements

let displayDomscreen = document.getElementById("dopDisplayOnscreen");
let dom_CreateQuestion = document.querySelector(".contentInput");
let multipleAnswers = document.querySelector(".multipleAnswer");
let answerOption = document.querySelector(".optionAnswers");
let booleanAnswer = document.querySelector(".truefalseAnswer");
let typeAnswers = document.getElementById("choseTypeAnswers");
let btnAddmultipleorOption = document.querySelector(".addoption")
let btn_Requestpostdata = document.querySelector(".btn_PostData")
let parameterButtonUpdateOrAdd="SAVE ANSWER"
let displayDialogForm = document.querySelector(".displayDialog")
let inputAnswerTag=""
const DOMBODY=document.body
let paraIdOfquestionToupdate = 0;


//TODO: show and hide
 
function hide(element){
    element.style.display="none"
}

function show(element){
    element.style.display="block"
}


function updateData(update){
    // TODO: Request to the server to update one task as completed
    let body = {title:update.quiz, question:update.question, isCorrect:update.isCorrect, answers:update.answers, score:update.score}
    axios.put(URL + "/questions/update/" + paraIdOfquestionToupdate,body)
    .catch((error)=>{console.log(error)})
    requestServer()
}


 // TODO: Request to the server to detele one task

function deleteData(question){
    axios.delete(URL + "/questions/delete/" + question)
    .catch((error)=>{console.log(error)})
    requestServer()
}

 // TODO: request question from server and add DOM

function addData(add){
    console.log("my quiz title is ", add.quiz);
    let body = {title:add.quiz, question:add.question, isCorrect:add.isCorrect, answers:add.answers, score:add.score}
    axios.post(URL + "/questions/add", body)
    .then((result)=>{console.log(result)})
    .catch((error)=>{console.log("My post is error at", error)})
    requestServer()
}

// function requestAddorUpdate(data){

// }

 // TODO: request from from server and update DOM

function requestServer(){
    axios.get("/questions/get")
    .then((result)=>{refreshDOM(result.data)})
    .catch((error)=>{console.log("You are error at", error)})
}
requestServer()


//////////////// show list question ////////////////////////
function refreshDOM(displayData){
    parameterButtonUpdateOrAdd="SAVE ANSWER"
    displayData = displayData.reverse()
    while (displayDomscreen.firstChild) {displayDomscreen.removeChild(displayDomscreen.lastChild)}
    displayData.forEach(element => {
        let defualtScore = "0.0"
        const questionAndAnswersDom=document.createElement("div")
        questionAndAnswersDom.className = "setListAdd"
        const questionDOM = document.createElement("div")
       questionDOM.className = "li-getquestion"
       questionDOM.id = element._id
        const span = document.createElement("span")
        span.className = "getValue"
        if(element.score!=null){defualtScore = element.score}else{false}
        span.textContent = "( "+ defualtScore +"pt ) "+ element.question
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
function getRequesToUpdateDataInDom(questionIdToupdate){
    // TODO: request data from server
    axios.get("/questions/get")
    .then((result)=>{
        let questionToupdate = result.data
        questionToupdate.forEach(element => {if(questionIdToupdate == element._id){showDomToUpdateData(element)}});
    })
    
}

// show DOM to update

function showDomToUpdateData(dataToupdate){
    // console.log("data to up date is", dataToupdate);
    document.getElementById("getTitle").value = dataToupdate.title
    document.getElementById("getScore").value = dataToupdate.score
    document.getElementById("QuestionId").value = dataToupdate.question
    paraIdOfquestionToupdate = dataToupdate._id
    let typeOfAnswers = dataToupdate.answers
    let typeOfcorrect = dataToupdate.isCorrect
    if(typeOfcorrect[0]=="True" || typeOfcorrect[0]=="False"){
        let option = booleanAnswer.querySelectorAll("#answer")
        let checkedOption = booleanAnswer.querySelectorAll("#correctAnswerId")
        for (let index = 0; index < typeOfAnswers.length; index++) {
            if(typeOfAnswers[index] == typeOfcorrect[0]){
                checkedOption[index].checked=true
                option.values=typeOfAnswers[index]
            }else{
                checkedOption[index].checked=false
                option.values=typeOfAnswers[index]
            }
        }
        show(booleanAnswer)
    }
    if(typeOfcorrect.length>1){
        
        for (let index = 0; index < typeOfAnswers.length; index++) {
            const element = typeOfAnswers[index]
            let goodAnswer = ""
            for(correct of typeOfcorrect){if (element == correct){goodAnswer = 'checked="checked"'}}
                inputMultipleAnswerTag = '<div class="set-input"> <input type="text" placeholder="Type answer" value="'+ element +'" id="answer" required><button class="removeAnswer">remove</button> <input type="checkbox" name="check" id="correctAnswerId" '+ goodAnswer+ ' required> </div>' 
                multipleAnswers.insertAdjacentHTML("beforeend", inputMultipleAnswerTag)  
        }
        show(multipleAnswers) 
    }else{
        
        inputOptionAnswerTag=""
        for (let index = 0; index < typeOfAnswers.length; index++) {
            const element = typeOfAnswers[index]
            let goodAnswer = ""
            if(element == typeOfcorrect[0]){
                goodAnswer = 'checked="checked"'
            }
            inputOptionAnswerTag = '<label for="check"></label> <div class="set-input"> <input type="text" placeholder="Type answer" id="answer" value="'+element+'" required><button class="removeAnswer">remove</button> <input type="radio" name="check" id="correctAnswerId" '+ goodAnswer+' required> </div>'
            answerOption.insertAdjacentHTML("beforeend", inputOptionAnswerTag)
        }
        show(answerOption)
    }
    document.querySelector(".displayDialog").style.display="flex"
}

function removeOldElement(){
    while (answerOption.firstChild) {answerOption.removeChild(answerOption.lastChild)}
    while (booleanAnswer.firstChild) {booleanAnswer.removeChild(booleanAnswer.lastChild)}
    while (multipleAnswers.firstChild) {multipleAnswers.removeChild(multipleAnswers.lastChild)}
}

// get question and answer from user create
function getDataFromDOM(typeInput){
    let data = {}
    let getAnswers=[]
    let isCorrectAnswer=[]
    let quizTitle= document.getElementById("getTitle").value
    let userSetScore = document.getElementById("getScore").value
    let questionInput = document.getElementById("QuestionId").value
    let dom_Answers = typeInput.querySelectorAll("#answer");
    let dom_CorrectAnswers = typeInput.querySelectorAll("#correctAnswerId");
    for(index = 0; index<dom_Answers.length; index++){
        if(dom_Answers[index].value==""){
            dom_Answers[index].parentElement.parentElement.remove()
        }
        getAnswers.push(dom_Answers[index].value)
        if(dom_CorrectAnswers[index].checked){
            isCorrectAnswer.push(dom_Answers[index].value)
        }
    }
    data.question = questionInput
    data.isCorrect = isCorrectAnswer
    data.answers = getAnswers
    data.score = parseInt(userSetScore)
    data.quiz = quizTitle
    if(getAnswers.length > 0 && isCorrectAnswer.length > 0 && btn_Requestpostdata.value == "SAVE ANSWER"){
        addData(data)
    }if(parameterButtonUpdateOrAdd == "UPDATE"){
        updateData(data)
        console.log("data is post", data)
    }
    clearFormInput(typeInput)
    hide(displayDialogForm)
}

// clear user in put

function clearFormInput(typeInput){
    document.getElementById("getScore").value=""
    document.getElementById("QuestionId").value=""
    typeInput.querySelectorAll("#answer").forEach(element => {
        element.remove()
    });
    typeInput.querySelectorAll("#correctAnswerId").forEach(element => {
        element.checked=false
    });
    removeOldElement()
    btn_Requestpostdata.value="SAVE ANSWER"
}



/////////////// chose type answers ////////////////////

function displayTypeanswers(type){
    if(type =="Multiple"){
        show(multipleAnswers)
        show(btnAddmultipleorOption)
        hide(answerOption)
        hide(booleanAnswer)
       }else if(type =="ChoseOne"){
        show(answerOption)
        show(btnAddmultipleorOption)
        hide(multipleAnswers)
        hide(booleanAnswer)
       }else if(type =="TrueFalse"){
        hide(answerOption)
        hide(btnAddmultipleorOption)
        hide(multipleAnswers)
        show(booleanAnswer)
    }else{
        hide(multipleAnswers)
        hide(btnAddmultipleorOption)
        hide(answerOption)
        hide(booleanAnswer)
    }
}

function addInputanswers(typeOfadd){
    console.log("my type need to add is: ", typeOfadd.children[0].value);
    if(typeOfadd.children[0].value=="Multiple"){
        inputAnswerTag = ""
        inputAnswerTag = '<div class="set-input"> <input type="text" placeholder="Type answer" id="answer" name="answer1" required><button class="removeAnswer">remove</button> <input type="checkbox" name="check" id="correctAnswerId" required> </div>'
        // multipleAnswers.innerHTML = inputAnswerTag
        multipleAnswers.insertAdjacentHTML("beforeend", inputAnswerTag)
    }else if(typeOfadd.children[0].value=="ChoseOne"){
        inputAnswerTag=""
        inputAnswerTag = '<label for="check"></label> <div class="set-input"> <input type="text" placeholder="Type answer" id="answer" name="answer1" required><button class="removeAnswer">remove</button> <input type="radio" name="check" id="correctAnswerId" required> </div>'
        answerOption.insertAdjacentHTML("beforeend", inputAnswerTag)
    }
}

function postTypeofQuestion(typeOfAnswers){
    if(typeOfAnswers.children[0].value=="Multiple"){
        // let options = typeOfAnswers.children[2]
        getDataFromDOM(typeOfAnswers.children[2])
        // console.log("Multiple", options);
    }else if(typeOfAnswers.children[0].value=="ChoseOne"){
        getDataFromDOM(typeOfAnswers.children[3])
    }else if(typeOfAnswers.children[0].value =="TrueFalse"){
        getDataFromDOM(typeOfAnswers.children[1])
    }
    // console.log(typeOfAnswers);
}


// TODO: event button

// click add question or update


// click delete question or update


// button to show and hind answer


DOMBODY.addEventListener("click", (e)=>{
    if(e.target.className == "fas fa-chevron-circle-down"){
        hide(e.target.parentElement.parentElement.children[1])
        e.target.className = "fas fa-chevron-circle-up"
    }if(e.target.className == "fas fa-chevron-circle-up"){
        show(e.target.parentElement.parentElement.children[1])
        displayCorrectAnswerIdDOM(e.target.parentElement.parentElement.children[1])
        e.target.className ="fas fa-chevron-circle-down"
    }if(e.target.id == "choseTypeAnswers"){
        displayTypeanswers(e.target.value)
    }if(e.target.className == "addoption"){
        addInputanswers(e.target.parentElement.parentElement)
        
    }if(e.target.className == "removeAnswer"){
        e.target.parentElement.remove()
    }if(e.target.id == "btn_displayDailog"){
        displayDialogForm.style.display="flex"
        document.querySelector("#choseTypeAnswers").value="No_Typeanswers"
    }if(e.target.className == "btn_PostData"){
        postTypeofQuestion(e.target.parentElement.parentElement)
    }if(e.target.className=="deleter"){
        let questionToRemove = e.target.parentElement.parentElement.id
        deleteData(questionToRemove)
    }if(e.target.className == "editor"){
        let questionIdToupdate = e.target.parentElement.parentElement.id
        getRequesToUpdateDataInDom(questionIdToupdate)
        btn_Requestpostdata.value="UPDATE"
        parameterButtonUpdateOrAdd="UPDATE"
    }

})
