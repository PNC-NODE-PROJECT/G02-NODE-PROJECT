//----------------function sign up-------------------------
function signUp(e) {
  e.preventDefault();
  let firstname = firstName.value;
  let lastname = lastName.value;
  let email = emailAddress.value;
  let password = pass.value;
  // request the server to create new user
  let URL = "http://localhost/users/create"
  let body = {first_name:firstname, last_name:lastname, email:email, password:password};
  axios.post(URL, body).then((response)=> {
    if(response) {
        document.querySelector(".Correct").style.display = "block";
        setTimeout(function(){
          window.location.reload(1);
      },2000);
    }
  }).catch((error)=> {
    console.log(error)
  })
}
// main button get name form html
let firstName = document.querySelector("#firstname");
let lastName = document.querySelector("#lastname");
let emailAddress = document.querySelector("#email");
let pass = document.querySelector("#password");
// button create user name
let adduser = document.querySelector("#btnsignin");
adduser.addEventListener("click", signUp);

//----------------- function login------------------------
function login(e){
  e.preventDefault();
  let useremail = uemail.value;
  let userpasword = upassword.value;
  let url = "http://localhost/users/login";
  let body = {email:useremail, password:userpasword};
  axios.post(url, body).then((response)=>{
      console.log(response);
      if(response.data){
          document.querySelector(".correct").style.display = "block";
          setTimeout(function(){
            document.querySelector(".containers").style.display = "none";
            document.querySelector(".contianerApp").style.display = "block";
            document.querySelector(".menus").style.display = "block";
        }, 2000);
      }else{
          document.querySelector(".incorrect").style.display = "block";
          setTimeout(function(){
            window.location.reload(1);
         },2000);
      }
  })   
}
// main button get name from html 
let uemail = document.querySelector("#loginemail");
let upassword = document.querySelector("#loginpasword");
let buttonlogin = document.querySelector("#btnlogin");
buttonlogin.addEventListener("click", login)

//-----------------------function add questions-----------------------
function addData(e) {
    e.preventDefault();
    let titlequestion = titleofquestion.value;
    let question = questions.value;
    let check = checkquestion.value;
    let answer = answerofquestions.value;
    let scores = totalscore.value
    // request the server to create new user
    let URL = "http://localhost/questions/add"
    let body = {title:titlequestion, question:question, isCorrect:check, answers:answer, score:scores};
    axios.post(URL, body)
    .then((response)=> {
      console.log(response)
    }).catch((error)=> {
      console.log("eror")
    })
}
// main button get name form html
let titleofquestion = document.querySelector("#getTitle");
let questions = document.querySelector("#QuestionId");
let checkquestion = document.querySelector("#answer");
let answerofquestions = document.querySelector("#correctAnswerId");
let totalscore = document.querySelector("#getScore");
// button add value form html
let addquestions = document.getElementById("btnAdd");
adduser.addEventListener("click", addData);

//------------------verirable display login and sign up---------------
const loginText = document.querySelector(".title-text .login");
const loginForm = document.querySelector("form.login");
const loginBtn = document.querySelector("label.login");
const signupBtn = document.querySelector("label.signup");
signupBtn.onclick = (()=>{
    loginForm.style.marginLeft = "-50%";
    loginText.style.marginLeft = "-50%";
    document.getElementById("eyInlogin").style.display="none"
});
loginBtn.onclick = (()=>{
    loginForm.style.marginLeft = "0%";
    loginText.style.marginLeft = "0%";
});

//----------------------functin show form login------------------------ 
function showform() {
  document.querySelector(".menus").style.display = "none";
  document.querySelector(".contianerApp").style.display = "none";
  document.querySelector(".correct").style.display = "none";
  setTimeout(function(){
    window.location.reload(1);
  },1000); 
}
// manin button
let btnshow = document.querySelector(".setLogin");
btnshow.addEventListener("click", showform);

//------------------function show index many quizses--------------------
function showquizses() {
  document.querySelector(".contianerApp").style.display = "none";
  document.querySelector(".cotaninercards").style.display = "block";
}
// main button 
let btnquiz = document.querySelector(".btnplay");
btnquiz.addEventListener("click", showquizses);

//---------------------function click back-------------------------------
var input = document.querySelector('.pswrd');
var show = document.querySelector('.fa-eye');
show.addEventListener('click', active);
function active(){
  if(input.type === "password"){
    input.type = "text";
    show.style.color = "#1DA1F2";
  }else{
    input.type = "password";
    show.style.color = "#111";
  }
}