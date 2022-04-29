

const express = require('express');
const router = express.Router();

const exportModel = require('../models/quiz_model');

// user router
router.get('/quiz', (req, res) => {
    exportModel.QuizModel.find()
    .populate("questions")
    // .populate("user")
    .then((result)=>{
        console.log("result ", result) ;
        res.send(result)})
})


// create 
router.post('/', (req, res) => {

})

// TODO: export router

module.exports = router