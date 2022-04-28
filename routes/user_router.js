

const express = require('express');
const router = express.Router();

const exportModel = require('../models/user_model')

// user router
router.get('/', (req, res) => {
    exportModel.UserModel.find()
    .then((result)=>{
        console.log(result) ;
        res.send(result)})
})


// create user 
router.post('/users', (req, res) => {

})

// TODO: export router

module.exports = router