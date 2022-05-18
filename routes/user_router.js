const express = require('express');
const router = express.Router();

const exportModel = require('../models/user_model')

// user router
router.get('/get', (req, res) => {
    exportModel.UserModel.find()
    .then((result)=>{
        res.send(result)})
})

router.get("/logined/:userpassword", (req, res)=>{
    console.log("my pass", req.params.userpassword);
    exportModel.UserModel.find({password:req.params.userpassword})
    .then((result)=>{res.send(result)})
})


// create user 
router.post('/create', (req, res) => {
    exportModel.UserModel.find()
        .then((getresult) => {
            let isFoundUser = true;
            let registEmail = req.body.email;
            getresult.forEach(user => {
                if (user.email == registEmail) {
                    isFoundUser = false;
                }
            })
            if (isFoundUser) {
            exportModel.UserModel.create(req.body)
                    .then((result) => {
                        res.send(result);
                    })
                    .catch((error) => {
                        res.send(error);
                    });
            } else {
                res.send("Email is already exist");
            }
        }).catch((error) => {
        res.send(error);
    });
})

// login check
router.post("/login",(req, res) => {
    let useremail = req.body.email;
    let userpasword = req.body.password;
    let isvalid = false;
    exportModel.UserModel.find({email:useremail, password:userpasword})
    .then((result) => {
        if (result.length>0) {
            isvalid = true;
        }
        res.send(isvalid);
    })
    .catch((error) => {
        console.log(error)
    });
})

// TODO: export router
module.exports = router