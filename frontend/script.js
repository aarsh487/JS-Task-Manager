//  start from here


let ctr = 1

async function fetchTask(){
    try{
        const response = await axios.get("http://localhost:3000/tasks")
        const tasks = await response.data

        const parentEl = document.querySelector('.taskOut')
        parentEl.innerHTML = ''

        ctr = 1

        tasks.forEach(task => {
            const taskEl = document.createElement('div')
            taskEl.setAttribute('id', task.id)

            const newH = document.createElement('h4')
            newH.textContent = `${ctr}. ${task.task}`
            ctr++

            const editEl = document.createElement('button')
            editEl.textContent = 'Edit'
            editEl.onclick = function () { editTask(task.id) }

            const deleteEl = document.createElement('button')
            deleteEl.textContent = 'Delete'
            deleteEl.onclick = function () { deleteTask(task.id) }

            taskEl.appendChild(newH)
            taskEl.appendChild(editEl)
            taskEl.appendChild(deleteEl)
            parentEl.appendChild(taskEl)

        })


    }
    catch(error){
        console.error('Error fetchinng tasks: ', error)
    }

}


async function addTask(){

    const taskInput = document.getElementById('t').value
    
    if(!taskInput){
        alert("Please enter both the values")
        return
    }

    try{

        const response = await axios.post("http://localhost:3000/task", {task: taskInput})

        const task = await response.data

        const parentEl = document.querySelector('.taskOut')

        const taskEl = document.createElement('div')
        taskEl.setAttribute('id', task.id)

        const newH = document.createElement('h4')
        newH.textContent = `${ctr}. ${task.task}`
        ctr++

        const editEl = document.createElement('button')
        editEl.textContent = 'Edit'
        editEl.onclick = function () { editTask(task.id) }

        const deleteEl = document.createElement('button')
        deleteEl.textContent = 'Delete'
        deleteEl.onclick = function () { deleteTask(task.id) }

        taskEl.appendChild(newH)
        taskEl.appendChild(editEl)
        taskEl.appendChild(deleteEl)
        parentEl.appendChild(taskEl)

        document.getElementById('t').value = ''

        
    }
    catch(error){
        console.log(error)
    }
        
}

async function editTask(taskId){
    const updatedTask = prompt("enter new Task")

    if(!updatedTask){
        alert("Please enter a valid task")
        return
    }

    try{
        const response =  await axios.put(`http://localhost:3000/task/${taskId}`, {task: updatedTask})
        fetchTask()
    }
    catch(error){
        console.error('Not updated', error)
    }
}

async function deleteTask(taskId){

    try{
        const response =  await axios.delete(`http://localhost:3000/task/${taskId}`)
        fetchTask()
    }
    catch(error){
        console.error('Not deleted', error)
    }
}
