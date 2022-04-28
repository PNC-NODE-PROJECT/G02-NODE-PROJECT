
const express = require('express');
const router = express.Router();

const exportModel = require('../models/question_model')

// get questions

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
router.delete('/deletes/:id',(req, res) => {
    let deleteQuestion = exportModel.QuestionModel.findByIdAndDelete({_id:req.params.id})
    if (deleteQuestion) {
        res.status(200).send({
            "message": 'Question deleted successfully'
        })
    } else {
        res.status(404).send({
            "message": 'Item id not found'
        })
    }
})


// update one quiz question
router.put('/questions/:id', (req, res) => {

})

// TODO: export router
module.exports = router
