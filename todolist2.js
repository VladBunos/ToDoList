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

function createId(){
    uniqueId++
    return uniqueId
}

function createDesks(dataType, deskType, elementToEdit){
    deskType.innerHTML = ``
    dataType.forEach(arrayElement => {
        // let elementToEdit = dataType.findIndex(item => item.id == id)
        let taskName = `<p class ='task-n'>${arrayElement.taskName}</p>`;
        let taskDescription = `<p class ='task-desc'>${arrayElement.taskDescription}</p>`;
        let btnEdit = `<button class ='btn-edit', id="${arrayElement.id}">✍</button>`;
        let btnNext = `<button class ='btn-next', id="${arrayElement.id}">➱</button>`;
        let btnDelete = `<button class ='btn-delete', id="${arrayElement.id}">🗑️</button>`;

        if(dataType == dataDeletedDesk){
            btnNext = ``;
            btnEdit = ``;
            btnDelete = `<button class ='btn-erase', id="${arrayElement.id}">❌</button>`;
        } 

        if(dataType == dataDoneDesk){
            btnNext = ``;
        } 

        if (arrayElement.changingModeOn == true){
            // let tn = cardToEdit.querySelector('.tn')
            // let td = cardToEdit.querySelector('.td')
            // let taskNameValue = tn.querySelector('.task-n').textContent
            // let taskDescriptionValue = td.querySelector('.task-desc').textContent
            // tn.innerHTML = `<input class = 'input-task-name'>`
            // td.innerHTML = `<input class = 'input-description-name'>`
            // inputTaskNameValue = cardToEdit.querySelector('.task-n').textContent
            // inputDescriptionValue = cardToEdit.querySelector('.task-desc').textContent
            taskName = `<input class = 'input-task-name', id = "${arrayElement.id}">`
            taskDescription = `<input class = 'input-task-description', id = "${arrayElement.id}">`
            btnNext = ``;
            btnDelete = ``;
        
        }

        deskType.innerHTML += `<div class="card", id = "${arrayElement.id}">
        <div class ='tn'>${taskName}</div> 
        <div class ='td'>${taskDescription}</div> 
        ${btnEdit}
        ${btnNext}
        ${btnDelete} 
        </div>`

        if(arrayElement.changingModeOn == true){
            // let inputName = document.querySelector('.input-task-name')
            // let inputDescription = document.querySelector('.input-task-description')
            // console.log(inputName)
            // inputName.value = arrayElement.taskName
            // inputDescription.value = arrayElement.taskDescription 
            // console.log(inputName.value)

            
            let x = deskType.querySelector('.input-task-name')
            let y = deskType.querySelector('.input-task-description')
            x.value = arrayElement.taskName
            y.value = arrayElement.taskDescription 
            console.log(x.value)
            console.log(y.value)

            // let x = [...deskType.querySelectorAll('.input-task-name')]
            // x[0].value = 15
            // console.log(x[0].value)
        }  
    })    
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


function editCard(id, dataType, deskType){
    let elementToEdit = dataType.findIndex(item => item.id == id)
    dataType.forEach(arrayElement => {
        arrayElement.changingModeOn = false
    })
    createDesks(dataType, deskType)
    dataType[elementToEdit].changingModeOn = true
    createDesks(dataType, deskType)
    
}


btnSubmit.addEventListener('click', (event) =>{
    event.preventDefault();
    addDataToDoDesk(taskName.value, taskDescription.value)
    createDesks(dataToDoDesk, toDoDesk);
})

desk.addEventListener('click', (event) =>{
    
    if(event.target.closest('.btn-edit')){
        if(event.target.closest('#to-do-desk')){
            editCard((event.target.closest('.btn-edit').id), dataToDoDesk, toDoDesk)
            
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
            createDesks(dataToDoDesk, toDoDesk);
            createDesks(dataInProgressDesk, inProgressDesk);
        } else if (event.target.closest('#in-progress-desk')){
            moveData((event.target.closest('.btn-next').id), dataInProgressDesk, dataDoneDesk)
            createDesks(dataInProgressDesk, inProgressDesk);
            createDesks(dataDoneDesk, doneDesk)  
        } 

    } else if (event.target.closest('.btn-delete')){
        if(event.target.closest('#to-do-desk')){
            moveData(event.target.closest('.btn-delete').id, dataToDoDesk, dataDeletedDesk)
            createDesks(dataToDoDesk, toDoDesk);
            createDesks(dataDeletedDesk, deletedDesk)
        } else if (event.target.closest('#in-progress-desk')){
            moveData(event.target.closest('.btn-delete').id, dataInProgressDesk, dataDeletedDesk)
            createDesks(dataInProgressDesk, inProgressDesk);
            createDesks(dataDeletedDesk, deletedDesk)
        } else if (event.target.closest('#done-desk')){
            moveData(event.target.closest('.btn-delete').id, dataDoneDesk, dataDeletedDesk)
            createDesks(dataDoneDesk, doneDesk)  
            createDesks(dataDeletedDesk, deletedDesk)
        } 

    } else if (event.target.closest('.btn-erase')){
        console.log('erase !')
    }
})













// const displayList = (data, listNode) => {
//     listNode.innerHTML = "";
//     data[listNode.id].forEach((el) => {
//       listNode.innerHTML += `<li class="list__item">
//       <h3 class="item__title">${el.title}</h3>
//       <p class="item__description">${el.desc}</p>
//       <div class="icon-wrapper">     
//         ${
//           listNode.id === "deleted"
//             ? <img class="icon arrow reverse"  src="images/arrow.svg" alt="arrow" />
//             : `<img class="icon arrow"  src="images/arrow.svg" alt="arrow" />
//                <img class="icon pencil" src="images/pencil.svg" alt="pencil" />
//                <img class="icon basket" src="images/trash.svg" alt="basket" />`
//         }
//       </div>
//     </li>`;
//     });
//   };