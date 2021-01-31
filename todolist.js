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
        taskDescription: taskDescriptionValue,
        isGettingChanged: false
    })
}

function createId(){
    uniqueId++
    return uniqueId
}


function createCards(arrayElement, status){
    let btnNext= ``;
    let btnDelete =``;
    let btnErase = ``;

    if(status < 2){
        btnNext = `<button class ='btn-next', id="${arrayElement.id}">➱</button>`
    } else {
        btnNext = ``;
    }

    if(status <= 2){
        btnDelete = `<button class ='btn-delete', id="${arrayElement.id}">🗑️</button>`
    } else {
        btnErase = `<button class ='btn-erase', id="${arrayElement.id}">❌</button>`
    }

    if(arrayElement.isGettingChanged){

    } else {
        let card = `<div class="card">
        <p>${arrayElement.taskName}</p>
        <p>${arrayElement.taskDescription}</p>
        <button class ='btn-edit', id="${arrayElement.id}">✍</button>
        ${btnNext}
        ${btnDelete}
        ${btnErase}
        </div>`  
    }
      
    return card
}

function createDesks(status){
    if(status === 0){
        data.sort((a, b) =>{
            return b.id - a.id
        })
        toDoDesk.innerHTML = `Список задач`;
        data.forEach(arrayElement => {
            if(arrayElement.status === 0){
                toDoDesk.innerHTML += createCards(arrayElement, status)
            }   
            
        })

    } else if (status === 1){
        data.sort((a, b) =>{
            return b.queueProgress - a.queueProgress
        })
        inProgressDesk.innerHTML = `Задачи в процессе`;
        data.forEach(arrayElement => {
            if(arrayElement.status === 1){
                inProgressDesk.innerHTML += createCards(arrayElement, status)
            }       
        })
       
    } else if (status === 2){
        data.sort((a, b) =>{
            return b.queueDone - a.queueDone
        })
        doneDesk.innerHTML = `Выполненные задачи`;
        data.forEach(arrayElement => {
            if(arrayElement.status === 2){
                doneDesk.innerHTML += createCards(arrayElement, status)
            }       
        })
    } else if (status === 3){
        data.sort((a, b) =>{
            return b.queueDeleted - a.queueDeleted
        })
        deletedDesk.innerHTML = `Удаленные задачи`;
        data.forEach(arrayElement => {
            if(arrayElement.status === 3){
                deletedDesk.innerHTML += createCards(arrayElement, status)
            }       
        })
    }
    
    
    data.sort((a, b) =>{
        return b.id - a.id
    })
}



function moveTask(idValue, isFirtsMove){
    data.forEach(arrayElement =>{
        if (arrayElement.id === +idValue){
            arrayElement.previousStatus = arrayElement.status;
            arrayElement.status = arrayElement.status + 1;
            if(isFirtsMove){
                arrayElement.queueProgress = increaseQueueProgress();  
            } else {
                arrayElement.queueDone = increaseQueueDone();
            }
        }
        })
    
}

function deleteTask(idValue){
    data.forEach(arrayElement =>{
        if(arrayElement.id === +idValue){
            arrayElement.previousStatus = arrayElement.status;
            arrayElement.status = 3;
            arrayElement.queueDeleted = increaseQueueDeleted();
        }
    })
}


function editTask(idValue){
    data.forEach(arrayElement =>{
        if(arrayElement.id === +idValue){
            let status = arrayElement.status;
            let taskName = arrayElement.taskName;
            let taskDescription = arrayElement.taskDescription;
            let id = arrayElement.id;
            arrayElement.isGettingChanged = true;
        }
    })
}

function increaseQueueProgress(){
    queueProgress++
    return queueProgress;
}

function increaseQueueDone(){
    queueDone++
    return queueDone
}

function increaseQueueDeleted(){
    queueDeleted++
    return queueDeleted
}



btnSubmit.addEventListener('click', (event) =>{
    event.preventDefault();
    addData(taskName.value, taskDescription.value);
    let start = Date.now()
    createDesks(0);
    let end = Date.now()
    console.log(`Цикл отработал за ${end - start} миллисекунд` )
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
 
        
    } else if (event.target.closest('.btn-next')){
        console.log('next')
        if(event.target.closest('#to-do-desk')){
            moveTask((event.target.closest('.btn-next')).id, true)
            createDesks(0);
            createDesks(1);
        } else if (event.target.closest('#in-progress-desk')){
            moveTask((event.target.closest('.btn-next')).id, false)
            createDesks(1);
            createDesks(2);
        } else if (event.target.closest('#done-desk')){
            console.log('done desk')
        } else if (event.target.closest('#deleted-desk')){
            console.log('deleted desk')
        }

    } else if (event.target.closest('.btn-delete')){
        console.log('delete')

        if(event.target.closest('#to-do-desk')){
            deleteTask((event.target.closest('.btn-delete')).id)
            createDesks(0);
            createDesks(3);
        } else if (event.target.closest('#in-progress-desk')){
            deleteTask((event.target.closest('.btn-delete')).id)
            createDesks(1);
            createDesks(3);
        } else if (event.target.closest('#done-desk')){
            deleteTask((event.target.closest('.btn-delete')).id)
            createDesks(2);
            createDesks(3);
        } else if (event.target.closest('#deleted-desk')){
            console.log('deleted desk')
        }

    }
})



// function x(){
//     let start = Date.now()
//     for(let i = 0; i < 1000; i++){
//         addData();
//     }
//     let end = Date.now()
//     console.log(`Цикл отработал за ${end - start} миллисекунд` )
// }

// x();















// function createToDoDesk(){
//     data.sort((a, b) =>{
//         return b.id - a.id
//     })
//     toDoDesk.innerHTML = `Список задач`;
//     data.forEach(arrayElement => {
//         if(arrayElement.status === 0){
//             toDoDesk.innerHTML += `
//             <div class="card">
//             <p>${arrayElement.taskName}</p>
//             <p>${arrayElement.taskDescription}</p>
//             <button class ='btn-edit', id="${arrayElement.id}">✍</button>
//             <button class ='btn-next', id="${arrayElement.id}">➱</button>
//             <button class ='btn-delete', id="${arrayElement.id}">🗑️</button>
//             </div>`
//         }       
//     })
// }


// function createInProgressDesk(){
//     data.sort((a, b) =>{
//         return b.queueProgress - a.queueProgress
//     })

//     inProgressDesk.innerHTML = `Задачи в процессе`;
//     data.forEach(arrayElement => {
//         if(arrayElement.status === 1){
//             inProgressDesk.innerHTML += `
//             <div class="in-progress-desk">
//             <p>${arrayElement.taskName}</p>
//             <p>${arrayElement.taskDescription}</p>
//             <button class ='btn-edit', id="${arrayElement.id}">✍</button>
//             <button class ='btn-next', id="${arrayElement.id}">➱</button>
//             <button class ='btn-delete', id="${arrayElement.id}">🗑️</button>
//             </div>`
//         }       
//     })

//     data.sort((a, b) =>{
//         return b.id - a.id
//     })
// }


// function createDoneDesk(){
//     data.sort((a, b) =>{
//         return b.queueDone - a.queueDone
//     })

//     doneDesk.innerHTML = `Выполненные задачи`;
//     data.forEach(arrayElement => {
//         if(arrayElement.status === 2){
//             doneDesk.innerHTML += `
//             <div class="in-progress-desk">
//             <p>${arrayElement.taskName}</p>
//             <p>${arrayElement.taskDescription}</p>
//             <button class ='btn-edit', id="${arrayElement.id}">✍</button>
//             <button class ='btn-next', id="${arrayElement.id}">➱</button>
//             <button class ='btn-delete', id="${arrayElement.id}">🗑️</button>
//             </div>`
//         }       
//     })

//     data.sort((a, b) =>{
//         return b.id - a.id
//     })
// }