const taskName = document.querySelector('#task-name');
const taskDescription = document.querySelector('#task-description');
const btnSubmit = document.querySelector('#btn-submit');
const desk = document.querySelector('#desk')
const toDoDesk = document.querySelector('#to-do-desk');
const inProgressDesk = document.querySelector('#in-progress-desk')
const doneDesk = document.querySelector('#done-desk')
const deletedDesk = document.querySelector('#deleted-desk')
let data = [];
let uniqueId = -1;
let queueProgress = -1;
let queueDone = -1;
let queueDeleted = -1;


function addData(taskNameValue, taskDescriptionValue){
    data.push({
        id: createId(),
        status: 0,
        previousStatus: 0,
        queueProgress: 0,
        queueDone: 0,
        queueDeleted: 0,
        taskName: taskNameValue,
        taskDescription: taskDescriptionValue
    })
}

function createId(){
    uniqueId++
    return uniqueId
}

function createToDoDesk(){
    data.sort((a, b) =>{
        return a.id - b.id
    })
    toDoDesk.innerHTML = `Список задач`;
    data.forEach(arrayElement => {
        if(arrayElement.status === 0){
            toDoDesk.innerHTML += `
            <div class="to-do-card">
            <p>${arrayElement.taskName}</p>
            <p>${arrayElement.taskDescription}</p>
            <button class ='btn-edit', id="${arrayElement.id}">✍</button>
            <button class ='btn-next', id="${arrayElement.id}">➱</button>
            <button class ='btn-delete', id="${arrayElement.id}">🗑️</button>
            </div>`
        }       
    })
}

function createInProgressDesk(){
    data.sort((a, b) =>{
        return a.queueProgress - b.queueProgress
    })

    inProgressDesk.innerHTML = `Задачи в процессе`;
    data.forEach(arrayElement => {
        if(arrayElement.status === 1){
            inProgressDesk.innerHTML += `
            <div class="in-progress-desk">
            <p>${arrayElement.taskName}</p>
            <p>${arrayElement.taskDescription}</p>
            <button class ='btn-edit', id="${arrayElement.id}">✍</button>
            <button class ='btn-next', id="${arrayElement.id}">➱</button>
            <button class ='btn-delete', id="${arrayElement.id}">🗑️</button>
            </div>`
        }       
    })

    data.sort((a, b) =>{
        return a.id - b.id
    })
}


function createDoneDesk(){
    data.sort((a, b) =>{
        return a.queueDone - b.queueDone
    })

    doneDesk.innerHTML = `Выполненные задачи`;
    data.forEach(arrayElement => {
        if(arrayElement.status === 2){
            doneDesk.innerHTML += `
            <div class="in-progress-desk">
            <p>${arrayElement.taskName}</p>
            <p>${arrayElement.taskDescription}</p>
            <button class ='btn-edit', id="${arrayElement.id}">✍</button>
            <button class ='btn-next', id="${arrayElement.id}">➱</button>
            <button class ='btn-delete', id="${arrayElement.id}">🗑️</button>
            </div>`
        }       
    })

    data.sort((a, b) =>{
        return a.id - b.id
    })
}






function moveTask(idValue, isFirtsMove){
    if(isFirtsMove){
        data.forEach(arrayElement =>{
            if (arrayElement.id === +idValue){
                arrayElement.previousStatus = arrayElement.status
                arrayElement.status = arrayElement.status + 1;
                arrayElement.queueProgress = increaseQueueProgress();
            }
        })
    } else {
        data.forEach(arrayElement =>{
            if (arrayElement.id === +idValue){
                arrayElement.previousStatus = arrayElement.status
                arrayElement.status = arrayElement.status + 1;
                arrayElement.queueDone = increaseQueueDone();
            }
        })
    }
}

function increaseQueueProgress(){
    queueProgress++
    return queueProgress;
}

function increaseQueueDone(){
    queueDone++
    return queueDone
}












btnSubmit.addEventListener('click', (event) =>{
    event.preventDefault();
    addData(taskName.value, taskDescription.value);
    console.log(data)
    createToDoDesk();
})


desk.addEventListener('click', (event) =>{
    const btnEdit = document.querySelector('.btn-edit');
    const btnNext = document.querySelector('.btn-next')
    const btnDelete = document.querySelector('.btn-delete');

    if(event.target.closest('.btn-edit')){
        console.log('edit')

        if(event.target.closest('#to-do-desk')){
            console.log('to do desk')
        } else if (event.target.closest('#in-progress-desk')){
            console.log('progress desk')
        } else if (event.target.closest('#done-desk')){
            console.log('done desk')
        } else if (event.target.closest('#deleted-desk')){
            console.log('deleted desk')
        }
 
        // let btn = event.target.closest('.btn-edit')
        // console.log(btn.id)
    } else if (event.target.closest('.btn-next')){
        console.log('next')
        if(event.target.closest('#to-do-desk')){
            moveTask((event.target.closest('.btn-next')).id, true)
            createToDoDesk();
            createInProgressDesk();
        } else if (event.target.closest('#in-progress-desk')){
            moveTask((event.target.closest('.btn-next')).id, false)
            createInProgressDesk();
            createDoneDesk();
        } else if (event.target.closest('#done-desk')){
            console.log('done desk')
        } else if (event.target.closest('#deleted-desk')){
            console.log('deleted desk')
        }

    } else if (event.target.closest('.btn-delete')){
        console.log('delete')

        if(event.target.closest('#to-do-desk')){
            console.log('to do desk')
        } else if (event.target.closest('#in-progress-desk')){
            console.log('progress desk')
        } else if (event.target.closest('#done-desk')){
            console.log('done desk')
        } else if (event.target.closest('#deleted-desk')){
            console.log('deleted desk')
        }

    }
})


