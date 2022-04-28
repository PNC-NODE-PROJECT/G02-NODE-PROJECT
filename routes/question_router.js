
const express = require('express');
const router = express.Router();

const exportModel = require('../models/question_model')
// items route

router.get('/get', (req, res) => {
    exportModel.QuestionModel.find()
    .then((result)=>{
        console.log(result) ;
        res.send(result)})
})


// create one quiz question

router.post('/add', (req, res) => {
    let isAddquestion = exportModel.QuestionModel.create(req.body)
    if (isAddquestion) {
        res.status(201).send({
            "message": 'Question added successfully'
        })
    } else {
        res.status(500).send({
            "message": 'All field required'
        })
    }
})

// delete one quiz question


// update one quiz question
router.put('/update/:id', (req, res) => {
    exportModel.QuestionModel.updateMany({_id : req.params.id}, {title: req.body.title, question: req.body.question, description: req.body.description, isCorrect: req.body.isCorrect, answers: req.body.answers})
    .then((result)=> {
        res.send("Question update successfully")

    })
    .catch((error)=> {
        res.send(error)
    })
})
module.exports = router;
