
// TODO: identify requirement 

// main button get name form html
let firstName = document.querySelector("#firstname");
let lastName = document.querySelector("#lastname");
let emailAddress = document.querySelector("#email");
let pass = document.querySelector("#signinpassword");

let DomOfQuizses = document.querySelector(".card-group")
let adduser = document.querySelector("#btnsignin");

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


//----------------- function login------------------------
function login(e){
  e.preventDefault();
  let useremail = uemail.value;
  let userpassword = upassword.value;
  let url = "http://localhost/users/login";
  let body = {email:useremail, password:userpassword};
  axios.post(url, body).then((response)=>{
      if(response.data){
          document.querySelector(".correct").style.display = "block";
          setTimeout(function(){
            getInforOfUser(userpassword)
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

function getInforOfUser(userpassword){
  console.log("pssw", userpassword);
  let url = "http://localhost:80/users/logined/";
  axios.get(url + userpassword).then((respone)=>{
    console.log("user information is", respone.data);
    let userInfor = respone.data
    for (user of userInfor){
      localStorage.setItem("USER_ID", JSON.stringify(user._id))
    }
  })
}



// main button get name from html 
let uemail = document.querySelector("#loginemail");
let upassword = document.querySelector("#loginpasword");
let buttonlogin = document.querySelector("#btnlogin");
buttonlogin.addEventListener("click", login)

// //-----------------------function add questions-----------------------


// adduser.addEventListener("click", addData);

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


///// view topic of quiz

function refreshDOMToViewTopic(quizses){
  console.log("my quizses is", quizses);
  while(DomOfQuizses.firstChild){DomOfQuizses.removeChild(DomOfQuizses.lastChild)}
  quizses.forEach(element => {
    let headBody = '<div class="card-body m-2"><div class="card-title mt-4"><h5>'+ element.title +'</h5></div>'
    let partBody = '<div class="btngroup" id="'+ element._id +'"> <a href="views/play/play.html" class="btn btn-primary mr-2">Play Quiz</a> <a href="views/edit/edit.html" class="btn btn-primary ml-2">Edit Quiz</a></div>'
    let footBody = "</div"
    DomOfQuizses.insertAdjacentHTML("beforeend", headBody+partBody+footBody)
  });
}



// TODO: request datas

function requestQuizsesFromServer(){
  axios.get("quizses/quiz").then((result)=>{
    refreshDOMToViewTopic(result.data)
  }).catch((error)=>console.log(error))
}
requestQuizsesFromServer()

/// Dom of button
document.body.addEventListener("click", (e)=>{
  let URL = "http://localhost:80"
  if(e.target.textContent == "Play Quiz"){
    localStorage.setItem("QUIZ_ID"+JSON.parse(localStorage.getItem("USER_ID")), JSON.stringify(e.target.parentElement.id))
  }if(e.target.textContent == "Edit Quiz" && e.target.className=="btn btn-primary ml-2"){
    localStorage.setItem("EDIT_ID"+ JSON.parse(localStorage.getItem("USER_ID")), JSON.stringify(e.target.parentElement.id))
  }if(e.target.textContent == "Create Quiz"){
    localStorage.setItem("CREATE_ID"+JSON.parse(localStorage.getItem("USER_ID")), JSON.stringify("Empty"))
  }
})




