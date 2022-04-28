const express = require('express');
const router = express.Router();

const exportModel = require('../models/user_model')

// user router
router.get('/users', (req, res) => {
    exportModel.UserModel.find()
    .then((result)=>{
        console.log(result) ;
        res.send(result)})
})

// create user 
router.post('/create', (req, res) => {
    exportModel.UserModel.create(req.body)
    .then((result)=> {
        res.send(result)
    }).catch((erorr)=> {
        res.send(erorr)
    })
})
// login user
router.get("/login" , (req, res)=> {
    res.send("login")
})
  
// login check
router.post("/login", async (req, res)=> {
    try {
        const email = req.body.email;
        const password = req.body.password;
        const useremail = await Resgister.findOne({email:email});
        if(useremail.password == password) {
        res.status(201).render("index")
        }else {
        res.send("Your are not matching")
        }
    }catch (error) {
        res.status(400).send("invalid email")
    }
})
// TODO: export router
module.exports = router