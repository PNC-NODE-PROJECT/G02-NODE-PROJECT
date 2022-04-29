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

// login check
router.post("/login",(req, res) => {
    let userdata = req.body;
    let isvalid = false;
    exportModel.UserModel.find(userdata)
    .then((result) => {
        if (result.length>0) {
            isvalid = true;
        }
        res.send(isvalid);
    });
})
// TODO: export router
module.exports = router