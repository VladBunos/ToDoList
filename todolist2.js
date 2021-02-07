const taskName = document.querySelector('#task-name');
const taskDescription = document.querySelector('#task-description');
const btnSubmit = document.querySelector('#btn-submit');
const desk = document.querySelector('#desk')
const toDoDesk = document.querySelector('#to-do-desk');
const inProgressDesk = document.querySelector('#in-progress-desk')
const doneDesk = document.querySelector('#done-desk')
const deletedDesk = document.querySelector('#deleted-desk')
let dataToDoDesk = [];
let dataInProgressDesk = [];
let dataDoneDesk = [];
let dataDeletedDesk = []
let uniqueId = -1;
let queueProgress = -1;
let queueDone = -1;
let queueDeleted = -1;

function createId(){
    uniqueId++
    return uniqueId
}

function createDesks(deskType){
    if(deskType === 'toDoDesk'){
        toDoDesk.innerHTML = `Список задач`;
        dataToDoDesk.forEach(arrayElement =>{
            if (arrayElement.changingModeOn === true){
                // toDoDesk.innerHTML +=`<div class="card">
                // <input id="task-name-input">
                // <input id="task-description-input">
                // <button class ='btn-change', id="${arrayElement.id}">✔</button>
                // <button class ='btn-delete', id="${arrayElement.id}">🗑️</button>
                // </div>`
                // let taskNameInput = document.querySelector('#task-name-input')
                // taskNameInput.value = arrayElement.taskName;
                // console.log(taskNameInput.value)
                // let taskDescriptionInput = document.querySelector('#task-description-input')
                // taskDescriptionInput.value = arrayElement.taskDescription
            } else {
                toDoDesk.innerHTML +=`<div class="card">
                <p>${arrayElement.taskName}</p>
                <p>${arrayElement.taskDescription}</p>
                <button class ='btn-edit', id="${arrayElement.id}">✍</button>
                <button class ='btn-next', id="${arrayElement.id}">➱</button>
                <button class ='btn-delete', id="${arrayElement.id}">🗑️</button>
                </div>`
            }            
        })
    } else if (deskType === 'inProgressDesk'){
        inProgressDesk.innerHTML = `Задачи в процессе`;
        dataInProgressDesk.forEach(arrayElement =>{
            inProgressDesk.innerHTML +=`<div class="card">
            <p>${arrayElement.taskName}</p>
            <p>${arrayElement.taskDescription}</p>
            <button class ='btn-edit', id="${arrayElement.id}">✍</button>
            <button class ='btn-next', id="${arrayElement.id}">➱</button>
            <button class ='btn-delete', id="${arrayElement.id}">🗑️</button>
            </div>`
        })
    } else if (deskType === 'doneDesk'){
        doneDesk.innerHTML = `Выполненные задачи`;
        dataDoneDesk.forEach(arrayElement =>{
            doneDesk.innerHTML +=`<div class="card">
            <p>${arrayElement.taskName}</p>
            <p>${arrayElement.taskDescription}</p>
            <button class ='btn-edit', id="${arrayElement.id}">✍</button>
            <button class ='btn-delete', id="${arrayElement.id}">🗑️</button>
            </div>`
        })

    } else if (deskType === `deletedDesk`){
        console.log('!')
        deletedDesk.innerHTML = `Удаленные задачи`;
        dataDeletedDesk.forEach(arrayElement =>{
            deletedDesk.innerHTML +=`<div class="card">
            <p>${arrayElement.taskName}</p>
            <p>${arrayElement.taskDescription}</p>
            <button class ='btn-erase', id="${arrayElement.id}">❌</button>
            </div>`
        })
    }
}

function addDataToDoDesk(taskNameValue, taskDescriptionValue){
    dataToDoDesk.unshift({
        id: createId(),
        status: 0,
        taskName: taskNameValue,
        taskDescription: taskDescriptionValue,
        changingModeOn: false
    })
}

function moveData(id, dataFrom, dataTo){
    let elementToMove = dataFrom.findIndex(item => item.id == id)
    dataTo.unshift(dataFrom[elementToMove])
    dataFrom.splice(elementToMove, 1)  
}

function editCard(id, dataToEdit, flag){
    let elementToEdit = dataToEdit.findIndex(item => item.id == id)
    if(flag){
        dataToEdit[elementToEdit].changingModeOn = true 
    } else {
        dataToEdit[elementToEdit].changingModeOn = false
    }
    
    console.log(dataToEdit)

}




btnSubmit.addEventListener('click', (event) =>{
    event.preventDefault();
    addDataToDoDesk(taskName.value, taskDescription.value)
    createDesks('toDoDesk');
})


desk.addEventListener('click', (event) =>{
    
    if(event.target.closest('.btn-edit')){
        if(event.target.closest('#to-do-desk')){
            editCard((event.target.closest('.btn-edit').id), dataToDoDesk, true)
            createDesks('toDoDesk')
        } else if (event.target.closest('#in-progress-desk')){
            editCard((event.target.closest('.btn-edit').id), dataInProgressDesk)
        } else if (event.target.closest('#done-desk')){
            editCard((event.target.closest('.btn-edit').id), dataDoneDesk)
        } else if (event.target.closest('#deleted-desk')){
            editCard((event.target.closest('.btn-edit').id), dataDeletedDesk)
        }
        
    } else if (event.target.closest('.btn-next')){
        if(event.target.closest('#to-do-desk')){ 
            moveData((event.target.closest('.btn-next').id), dataToDoDesk, dataInProgressDesk)
            createDesks('toDoDesk');
            createDesks('inProgressDesk')
        } else if (event.target.closest('#in-progress-desk')){
            moveData((event.target.closest('.btn-next').id), dataInProgressDesk, dataDoneDesk)
            createDesks('inProgressDesk')
            createDesks('doneDesk')  
        } 

    } else if (event.target.closest('.btn-delete')){
        if(event.target.closest('#to-do-desk')){
            moveData(event.target.closest('.btn-delete').id, dataToDoDesk, dataDeletedDesk)
            createDesks('toDoDesk')
            createDesks('deletedDesk')
        } else if (event.target.closest('#in-progress-desk')){
            moveData(event.target.closest('.btn-delete').id, dataInProgressDesk, dataDeletedDesk)
            createDesks('inProgressDesk')
            createDesks('deletedDesk')
        } else if (event.target.closest('#done-desk')){
            moveData(event.target.closest('.btn-delete').id, dataDoneDesk, dataDeletedDesk)
            createDesks('doneDesk')
            createDesks('deletedDesk')
        } 

    } else if (event.target.closest('.btn-erase')){
        console.log('erase !')
    }
})













