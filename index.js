// start writing from here

const express = require("express")

const app = express()

const cors = require("cors")

app.use(cors())
app.use(express.json())

let tasks = []

app.get('/tasks', (req, res) => {
    res.json(tasks)
})


app.post('/task',  (req, res) => {
    const newTask = {
    id : Math.floor(Math.random()*100),
    task: req.body.task,
    }

    tasks.push(newTask)
    res.json(newTask) 
})

app.put('/task/:id', (req, res) => {
    const taskId = parseInt(req.params.id)
    updatedTask = req.body.task

    const taskIndex = tasks.findIndex(t => t.id === taskId)

    if(taskIndex !== -1){
        tasks[taskIndex].task = updatedTask
        res.json(tasks[taskIndex])
    }
    else{
        res.status(404).send("not Updated server error")
    }
})

app.delete('/task/:id', (req, res) => {
    const taskId = parseInt(req.params.id)

    const taskIndex = tasks.findIndex(t => t.id === taskId)

    if(taskIndex !== -1){
        tasks.splice(taskIndex, 1)
        res.json(tasks[taskIndex])
    }
    else{
        res.status(404).send("not Deleted server error")
    }
})


app.listen(3000)




