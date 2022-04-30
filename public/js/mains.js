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
      alert("create successfully")
      location.reload();
    }else {
      alert("error")
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
let adduser = document.getElementById("submit");
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
          document.querySelector(".containers").style.display = "none";
          document.querySelector(".menu").style.display = "block";
          document.querySelector(".contianerApp").style.display = "block";
          alert("login successfully")
      }else{
          alert("Email not valid")
      }
  })   
}
// main button get name from html 
let uemail = document.querySelector("#loginemail");
let upassword = document.querySelector("#loginpasword");
let buttonlogin = document.querySelector("#btnsubmit");
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
    axios.post(URL, body).then((response)=> {
      if(response) {
        alert("create successfully")
      }else {
        alert("error")
      }
    }).catch((error)=> {
      console.log(error)
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
});
loginBtn.onclick = (()=>{
    loginForm.style.marginLeft = "0%";
    loginText.style.marginLeft = "0%";
});



