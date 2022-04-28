

let URL = "http://localhost:80"

// let questions; 
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

// api get axios

// axios.get(URL+"/get")
// .then((result)=>{console.log("data", result.data);})
// .catch((error)=>{console.log(error);})


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


// /////////// local storage ///////////

// function setDataTolocalsotrage(){
//     localStorage.setItem("questions",JSON.stringify(questions));
//     localStorage.setItem('time', JSON.stringify(timeValue))
//     localStorage.setItem('score', JSON.stringify(scoreInput))
//     dataQuestions()
// }

// function dataQuestions(){
//     storeQuestion = JSON.parse(localStorage.getItem('questions'))
//     scoreInput = JSON.parse(localStorage.getItem('score'));
//     if (storeQuestion!=null){
//         questions = storeQuestion
//         if (counterCreateQues==true){
//             countAddQ=0;
//             showListQuestion()
//             counterCreateQues=false
//         }
//     }
//     timeValue = JSON.parse(localStorage.getItem('time'))
//     console.log('time: ', timeValue);
//     console.log('score: ', scoreInput);
//     console.log("storage: ", storeQuestion);
// }


// request 

function addData(getData){
    axios.post(URL + "questions/add", {title:getData.title, question:getData.question})
    console.log("adds : ", getData);
}


///////////// SELECT ANSWERS ////////////
console.log(document.getElementById("QuestionId").value);

function createAnswerAndChose(){
    // let countQ = questions.length
    // let getQInput={}
    let datas = {}
    let getAnswers=[]
    let isCorrectAnswer=[]
    let quizTitle=document.getElementById("getTitle").value
    let questionInput = document.getElementById("QuestionId").value
    let answer1=document.getElementById("answer1Id").value
    let answer2=document.getElementById("answer2Id").value
    let answer3=document.getElementById("answer3Id").value
    let answer4=document.getElementById("answer4Id").value
    const checkA1=document.getElementById("A1")
    const checkA2=document.getElementById("A2")
    const checkA3=document.getElementById("A3")
    const checkA4=document.getElementById("A4")
    
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
            // post data
            // datas.title = quizTitle
            // datas.question.description = questionInput
            // datas.question.isCorrect = isCorrectAnswer
            // datas.question.answers = getAnswers
            // datas.question.score = 10;

            // addData(datas)
            console.log("my datas is: ",questionInput);


            // getQInput.numb = countQ+1
            // getQInput.question = getQuestion
            // getQInput.answer = thisAnswer
            // getQInput.options = getOption
            // questions.push(getQInput)
            // goodInput()
            // addQuestions(getQuestion)
            // clearInput()
            // addTitleQuiz(quizTitle)
            // deSelectAnswers()
            // setDataTolocalsotrage()
        }else{
            swal.fire({
                icon: 'error',
                title: 'Cannot Add',
                text: 'Please chose the correct answer!!',
                timer: 5000
            })
        }
    }else{
        errorInput()
    }
}

///////////////// CLEAR INFORMATION ////////

// function clearInput(){
//     document.getElementById("QuestionId").value=""
//     document.getElementById("answer1Id").value=""
//     document.getElementById("answer2Id").value=""
//     document.getElementById("answer3Id").value=""
//     document.getElementById("answer4Id").value=""
// }

// /////// EDIT QUESTION AN ANSWERS //////////////

// function CheckToEdit(edit){
//     edit.addEventListener("click",(e)=>{
//         if (e.target==edit){
//             let index=e.target.id
//             document.getElementById("QuestionId").value = questions[index].question
//             document.getElementById("answer1Id").value = questions[index].options[0]
//             document.getElementById("answer2Id").value = questions[index].options[1]
//             document.getElementById("answer3Id").value = questions[index].options[2]
//             document.getElementById("answer4Id").value = questions[index].options[3] 
//             e.target.parentNode.parentNode.remove()
//             document.querySelector(".btnAdd").value="Update"
//             updateQuNum = questions[index].numb
//             indexEdit = index
//             questions.splice(index,1)
//             setDataTolocalsotrage()
//         }
//     })
// }

// //////////////// DESELECTED /////////////
// function deSelectAnswers(){
//     checkAllBox.forEach((elBox)=> elBox.checked=false)
//     document.querySelector(".btnAdd").value="Add+"
// }

// //////////////// ADD QUESTION ////////////////////////
// function addQuestions(question){
//     const li = document.createElement("li")
//     li.className = "li-getquestion"
//     const span = document.createElement("span")
//     span.className = "getValue"
//     span.textContent=question
//     li.appendChild(span)
//     let btn=document.createElement("button")
//     btn.className = "btnInQuest"
//     li.appendChild(btn)
//     const imgEdit=document.createElement("img")
//     imgEdit.src="img/edit.png"
//     imgEdit.className="editor"
//     imgEdit.id=countAddQ
//     btn.appendChild(imgEdit)
//     let imgDelete=document.createElement("img")
//     imgDelete.src="img/delete-icon.png"
//     imgDelete.className="deleter"
//     imgDelete.id = countAddQ
//     btn.appendChild(imgDelete)
//     listAddQu.appendChild(li)
//     deleteQuestion(imgDelete)
//     CheckToEdit(imgEdit)
//     countAddQ++
//     timeValue = document.getElementById("gettimer").value
// }

// //////// UPDATE ////////////////

// function updateQbyHTML(question){
//     const li = document.createElement("li")
//     li.className = "li-getquestion"
//     const span = document.createElement("span")
//     span.className = "getValue"
//     span.textContent=question
//     li.appendChild(span)
//     let btn=document.createElement("button")
//     btn.className = "btnInQuest"
//     li.appendChild(btn)
//     const imgEdit=document.createElement("img")
//     imgEdit.src="img/edit.png"
//     imgEdit.className="editor"
//     imgEdit.id = indexEdit
//     btn.appendChild(imgEdit)
//     let imgDelete=document.createElement("img")
//     imgDelete.src="img/delete-icon.png"
//     imgDelete.className="deleter"
//     imgDelete.id = indexEdit
//     btn.appendChild(imgDelete)
//     listAddQu.appendChild(li)
//     deleteQuestion(imgDelete)
//     CheckToEdit(imgEdit)
//     console.log('li: ', listAddQu);
//     timeValue = document.getElementById("gettimer").value
// }

// ///////// UPDATE QUESTION ////////////
// function updateQuestion(){
//     let getQInput={}
//     let getOption=[]
//     let thisAnswer=""
//     let quizTitle=document.getElementById("getTitle").value
//     let getQuestion=document.getElementById("QuestionId").value
//     let answer1=document.getElementById("answer1Id").value
//     let answer2=document.getElementById("answer2Id").value
//     let answer3=document.getElementById("answer3Id").value
//     let answer4=document.getElementById("answer4Id").value
//     const checkA1=document.getElementById("A1")
//     const checkA2=document.getElementById("A2")
//     const checkA3=document.getElementById("A3")
//     const checkA4=document.getElementById("A4")
//     if (getQuestion!=="" && answer1!=="" && answer2!=="" && answer3!=="" && answer4!==""){
//         if (checkA1.checked || checkA2.checked || checkA3.checked || checkA4.checked){
//             if (checkA1.checked){
//                 thisAnswer = answer1
//             }else if (checkA2.checked){
//                 thisAnswer = answer2
//             }else if(checkA3.checked){
//                 thisAnswer = answer3
//             }else if(checkA4.checked){
//                 thisAnswer = answer4
//             }
//             getOption.push(answer1)
//             getOption.push(answer2)
//             getOption.push(answer3)
//             getOption.push(answer4)




//             getQInput.numb = updateQuNum
//             getQInput.question = getQuestion
//             getQInput.answer = thisAnswer
//             getQInput.options = getOption
//             questions.splice(indexEdit, 0, getQInput);
//             goodInput()
//             updateQbyHTML(getQuestion)
//             clearInput()
//             addTitleQuiz(quizTitle)
//             deSelectAnswers()
//             setDataTolocalsotrage()
//         }else{
//             swal.fire({
//                 icon: 'error',
//                 title: 'Cannot Update',
//                 text: 'Please select your answer',
//                 timer: 5000
//             })
//         }
//     }else{
//         errorInput()
//     }
// }

/////// CHECK ADD OR UPDATE QUESTION //////
// function checkAddOrUpdate(){
//     if (document.querySelector(".btnAdd").value.toLowerCase()=="add+"){
//         createAnswerAndChose()
//         console.log('add Question');
//     }else if(element="update"){
//         console.log("update question");
//         updateQuestion()
//     }
// }

// function showListQuestion(){
//     for (let index = 0; index < questions.length ; index++){
//        addQuestions(questions[index].question)
//     }
// }

// ////////////// ADD QUIZ ////////////
// function addTitleQuiz(quiz){
//     if (quiz!==""){
//         document.getElementById("subjectQuiz").textContent=quiz
//         document.querySelector(".titleQuiz").classList.remove("hide")
//     }
// }
// /////////// DELETE QUESTION ////////////

// function deleteQuestion(deletes){
//     deletes.addEventListener("click",(e)=>{
//         if (e.target==deletes){
//             let parent=e.target.parentNode.parentNode.parentNode
//             while (parent.firstChild) {
//                 parent.removeChild(parent.firstChild);
//             }
//             counterCreateQues=true
//             questions.splice(e.target.id, 1)
//             console.log("deleteQ: ", e.target.id);
//             setDataTolocalsotrage()
//             console.log('parents: ',parent);
//         }
//     })
// }

// function goodInput(){
//     swal.fire({
//         position: 'center',
//         icon: 'success',
//         title: 'Question added',
//         showConfirmButton: false,
//         timer: 3000
//     }) 
// }

// function errorInput(){
//     swal.fire({
//         icon: 'error',
//         title: 'Cannot Add',
//         text: 'You need complete all',
//         timer: 5000
//     })
// }

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


let saved = true
// let btnBackToFirst = document.querySelectorAll(".imgBack")
// btnBackToFirst.forEach((btnEl) =>{
//     btnEl.addEventListener("click",()=>{
//         if (saved==true){
//             hide(contianerQuiz)
//             hide(contianerCreate)
//             show(contianerFirst)
//         }else{
//             swal.fire({
//                 icon: 'error',
//                 title: 'Cannot back',
//                 text: 'You need to save',
//                 timer: 5000
//             })
//         }
//     })
// })

//// ====================================================btn

// const btnSave = document.getElementById("btnSaveId")
// btnSave.addEventListener("click",()=>{
//     let putTitle = document.getElementById("subjectQuiz").textContent
//     if (putTitle!="" && questions.length>0){
//         swal.fire({
//             position: 'center',
//             icon: 'success',
//             title: 'Quiz saved',
//             showConfirmButton: false,
//             timer: 3000
//         }) 
//         saved=true
        
       
//         document.getElementById("quizTitle").textContent = putTitle
//         document.getElementById("showtitle").textContent = putTitle
//         document.getElementById("getTitle").value = ""
        
//     }if ( document.getElementById("gettimer").value!=null || document.getElementById("getScore")!=null){
//         scoreInput = parseInt(document.getElementById("getScore").value)
//         timeValue = document.getElementById("gettimer").value
//         document.getElementById("gettimer").value=''
//         document.getElementById("getScore").value=''

//     }else{
//         swal.fire({
//             icon: 'error',
//             title: 'Cannot Save',
//             text: 'Missing some require',
//             timer: 5000
//         })
//     } 

    
// })
