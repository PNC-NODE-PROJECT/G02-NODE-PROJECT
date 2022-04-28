// URL FROM SERVER

const URL = "http://localhost:80"

// TODO: request

function refreshData(){
    axios.get("/questions/get")
    .then((result)=>{listQuestions(result.data)})
    .catch((error)=>{console.log("You are error at", error)})
}

refreshData()


function addData(postData){
    console.log({title:postData.quiz, question:postData.ques});
    axios.post(URL + "/questions/add", {title:postData.quiz, question:postData.ques})
    .then((result)=>{console.log(result)})
    .catch((error)=>{console.log("My post is error at", error)})
    refreshData()
}


//////////////// ADD QUESTION ////////////////////////
function listQuestions(questions){
    console.log("questions: ",questions);
    questions.forEach(element => {
        const li = document.createElement("li")
        li.className = "li-getquestion"
        const span = document.createElement("span")
        span.className = "getValue"
        span.textContent= element.question.description
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
    });
    
}


function creatQuestionAndAnswers(){
   
    let datas = {}
    let getAnswers=[]
    let isCorrectAnswer=[]
    let question = {}
    let quizTitle= document.getElementById("getTitle").value
    let userSetScore = document.getElementById("getScore").value
    let questionInput = document.getElementById("QuestionId").value
    let answer1=document.getElementById("answer1Id").value
    let answer2=document.getElementById("answer2Id").value
    let answer3=document.getElementById("answer3Id").value
    let answer4=document.getElementById("answer4Id").value
    const checkA1=document.getElementById("A1")
    const checkA2=document.getElementById("A2")
    const checkA3=document.getElementById("A3")
    const checkA4=document.getElementById("A4")
    console.log("my question is :", questionInput);
    if (questionInput!=="" && answer1!=="" && answer2!=="" && answer3!=="" && answer4!==""){
        getAnswers.push(answer1)
        getAnswers.push(answer2)
        getAnswers.push(answer3)
        getAnswers.push(answer4)
        if (checkA1.checked || checkA2.checked || checkA3.checked || checkA4.checked){
            if (checkA1.checked){
                isCorrectAnswer.push(answer1)
            }if (checkA2.checked){
                isCorrectAnswer.push(answer2)
            }if(checkA3.checked){
                isCorrectAnswer.push(answer3)
            }if(checkA4.checked){
                isCorrectAnswer.push(answer4)
            }
            question["description"] = questionInput
            question["isCorrect"] = isCorrectAnswer
            question["answers"] = getAnswers
            question.score = parseInt(userSetScore);
            
            
        }else{
            swal.fire({
                icon: 'error',
                title: 'Cannot Add',
                text: 'Please chose the correct answer!!',
                timer: 5000
            })
        }
    }
    datas.ques = question
    datas.quiz = quizTitle
    addData(datas)
    console.log("my datas is: ",datas);
}



// TODO: event button


const btnAddQuestion = document.getElementById("btnAdd")
btnAddQuestion.addEventListener("click", creatQuestionAndAnswers)




// TODO: call paramater

let dom_listQuestions = document.getElementById("question_view")
