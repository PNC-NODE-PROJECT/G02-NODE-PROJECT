// function sign up
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















































// get register
// app.get("/register" , (req, res)=> {
//     res.send("resgister")
//   })
//   // register check 
//   app.post("/register", async (req, res)=> {
//     try {
//       const password = req.body.password;
//       const cofirm_password = req.body.cofirm_password;
//       if (password === cofirm_password) {
//         const user = new Register({
//           first_name: req.body.first_name,
//           last_name: req.body.last_name,
//           email: req.body.email,
//           password: password,
//           cofirmpassword: cofirm_password
//         })
//       const resgistered = await user.save();
//       resgistered.status(201).render(index);
//       }
//     }catch (error) {
//       res.status(400).send(error)
//     }
//   })
//   // get login
//   app.get("/login" , (req, res)=> {
//     res.send("login")
//   })
  
//   // login check
//   app.post("/login", async (req, res)=> {
//     try {
//       const email = req.body.email;
//       const password = req.body.password;
//       const useremail = await Resgister.findOne({email:email});
//       if(useremail.password == password) {
//         res.status(201).render("index")
//       }else {
//         res.send("Your are not matching")
//       }
//     }catch (error) {
//       res.status(400).send("invalid email")
//     }
//   })
  