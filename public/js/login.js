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

