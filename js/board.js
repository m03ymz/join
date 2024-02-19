async function initBoard() {
    await init();
    // delete currentUser.taskId;
    // currentUser.tasks = [];
    // await saveUsers();
    renderTask();
    renderContactsAddTask('');
}

let targetColumnId;
let taskIdCounter;

function openOverlay(taskId){
    let task = currentUser.tasks[taskId];
    let targetColumnId = task.column;
    if (document.getElementById(targetColumnId)) {
        let backgroundColor = (task.category === 'Technical Task') ? '#1FD7C1' : '#0038FF';
        let subtasksHTML = task.subtask.map((subtask, index) => {
            return `<div class="subtask_taskoverlay"><input type="checkbox" onchange="updateProgress(${taskId}, ${index})" ${subtask.checked ? 'checked' : ''}><span>${subtask.subtask}</span></div>`;
        }).join('');
        let assignedProfilesHTML = task.contacts.map(contact => {
            let initials = getInitials(contact.name);
            return /*html*/`
                <div class="assigned_profiles">
                    <span style="background-color: ${contact.color}" class="initials_card_img_board">${initials}</span>
                    <span>${contact.name}</span>
                </div>
            `;
        }).join('');
        // let subtasksSpan = task.subtask.length > 0 ? `<span>Subtasks</span>` : '';
        let subtasksText = task.subtask.length === 1 ? 'Subtask' : 'Subtasks';
        let subtasksSpan = task.subtask.length > 0 ? `<span class="subtask_span_taskoverlay">${subtasksText}</span>` : '';
        let priorityText = task.prio ? task.prio : 'Medium';

        let priorityImage;
        switch (priorityText) {
            case 'Urgent':
                priorityImage = './assets/img/prio_up_red.svg';
                break;
            case 'Low':
                priorityImage = './assets/img/prio_low.svg';
                break;
            default:
                priorityImage = './assets/img/prio_media.svg';
                break;
        }

        let taskDate = new Date(task.date);
        let day = taskDate.getDate();
        let month = taskDate.getMonth() + 1; // Monate beginnen bei 0, also +1 für den korrekten Monat
        let year = taskDate.getFullYear();
        day = (day < 10) ? '0' + day : day;
        month = (month < 10) ? '0' + month : month;
        let formattedDate = `${day}/${month}/${year}`;

        document.getElementById('w3-include-board1').innerHTML = /*html*/ `
        <div class="task_overlay_box_board" id="task-overlay">
        <div class="task_overlay_top_board">
            <div class="card_title_board" style="background: ${backgroundColor};">${task.category}</div>
            <img class="x_button_board" onclick="closeOverlay()" src="./assets/img/close.svg" alt="">
        </div>
        <h2>${task.title}</h2>
        <div class="task_overlay_text">
                <span>${task.description}</span>
            <div class="date_taskoverlay">
                <span class="textcolor_taskoverlay">Due date:</span>
                <span>${formattedDate}</span>
            </div>
            <div class="priority_taskoverlay">
                <span class="textcolor_taskoverlay">Priority:</span>
                <div class="priority_taskoverlay2">
                    <span>${priorityText}</span>
                    <img src="${priorityImage}" alt="">
                </div>
            </div>
            <span class="textcolor_taskoverlay">Assigned To:</span>
        </div>
        <div>
        <div class="task_overlay_assigned" id="task_overlay_assigned${taskId}">
                        ${assignedProfilesHTML} <!-- Hier werden die zugewiesenen Profile eingefügt -->
                    </div>
            <div class="subtasks_taskoverlay">
                ${subtasksSpan}
                ${subtasksHTML} <!-- Hier wird der HTML-Code für die Subtasks eingefügt -->
            </div>
        </div> 
        <div class="delete_edit_taskoverlay">
            <div onclick="deleteTask('${taskId}')" class="delete_box">
                <img src="./assets/img/delete.svg" alt="">
                <span>Delete</span>
            </div>
            <img src="./assets/img/vector2.svg" alt="">
            <div class="edit_box">
                <img src="./assets/img/edit.svg" alt="">
                <span>Edit</span>
            </div>
        </div>
    </div>
    `;
    // for (let j = 0; j < task.contacts.length; j++) {
    //     let contact = task.contacts[j];    
    //     let initials = getInitials(contact.name)
    //     document.getElementById(`task_overlay_assigned${taskId}`).innerHTML += /*html*/`
    //         <div class="assigned_profiles">
    //                 <span style="background-color: ${contact.color}" class="initials_card_img_board">${initials}</span>
    //                 <span>${contact.name}</span>
    //         </div>
    //     `;
    // }
    document.getElementById(`task-overlay`).style.display = "unset";
    document.getElementById(`overlay`).style.display = "flex";
    document.getElementById(`content-board`).classList.add('pointer_events-none');
    document.getElementById(`body`).classList.add('overflow_hidden');
}}

async function updateProgress(taskId, subtaskIndex) {
    let task = currentUser.tasks.find(task => task.id === taskId);
    if (task) {
        task.subtask[subtaskIndex].checked = !task.subtask[subtaskIndex].checked;
        updateProgressBar(task);
        await saveUsers();
    }
}

function updateProgressBar(task) {
    let totalSubtasks = task.subtask.length;
    let checkedSubtasks = task.subtask.filter(subtask => subtask.checked).length;
    let progress = (checkedSubtasks / totalSubtasks) * 100;
    let progressBar = document.getElementById(`progress_${task.id}`);
    let progressText = document.getElementById(`progressText_${task.id}`);
    if (progressBar && progressText) {
        progressBar.style.width = `${progress}%`;
        progressText.textContent = `${checkedSubtasks}/${totalSubtasks} Subtasks`;
    }
}

function calculateProgress(totalSubtasks, checkedSubtasks) {
    return totalSubtasks > 0 ? (checkedSubtasks / totalSubtasks) * 100 : 0;
}

function closeOverlay(){
    document.getElementById(`task-overlay`).style.display = "none";
    document.getElementById(`overlay`).style.display = "none";
    document.getElementById(`content-board`).classList.remove('pointer_events-none');
    document.getElementById(`body`).classList.remove('overflow_hidden');
}

function openTaskFormOnBoard(columnId){
    targetColumnId = columnId;
    document.getElementById(`task-form`).style.display = "unset";
    document.getElementById(`overlay`).style.display = "flex";
    document.getElementById(`content-board`).classList.add('pointer_events-none');
    document.getElementById(`body`).classList.add('overflow_hidden');
}

function closeTaskFormOnBoard(){
    document.getElementById(`task-form`).style.display = "none";
    document.getElementById(`overlay`).style.display = "none";
    document.getElementById(`content-board`).classList.remove('pointer_events-none');
    document.getElementById(`body`).classList.remove('overflow_hidden');
}

function addSelectedContactsToBoard() {
    currentUser.tasks.push(selectedContactsAddTask)
}

async function createTaskArray(targetColumnId) {
    targetColumnId = (typeof targetColumnId === 'undefined') ? 'column_board' : targetColumnId;
    let title = document.getElementById('title');
    let description = document.getElementById('description');
    let date = document.getElementById('date');
    let category = document.getElementById('category_task');
    taskIdCounter = currentUser.taskId;
    if (taskIdCounter == undefined) {
        taskIdCounter = 0;
    }
    let task = {
        "title": title.value,
        "description": description.value,
        "date": date.value,
        "category": category.value,
        "subtask": subtaskValues,
        "column": targetColumnId,
        "id": taskIdCounter,
        "contacts": selectedContactsAddTask,
        "prio": selectedPriority
     
    }
    currentUser.tasks.push(task);
    taskIdCounter++;
    currentUser.taskId = taskIdCounter;
    title.value = '';
    description.value = '';
    date.value = '';
    category.selectedIndex = 0;
    await saveUsers();
    // targetColumnId = 'column_board';
}

// function renderTask() {
//     let columnTasks1 = currentUser.tasks.filter(task => task.column == 'column_board');
//     document.getElementById(`column_board`).innerHTML = '';
    
//     for (let i = 0; i < columnTasks1.length; i++) {
//         let taskNumber = columnTasks1[i];
//         let taskId = taskNumber.id;
//         let backgroundColor = (taskNumber.category === 'Technical Task') ? '#1FD7C1' : '#0038FF';
//         document.getElementById(`column_board`).innerHTML += /*html*/ `
//         <div draggable="true" ondragstart="startDragging(${taskId})" class="card_board2">
//             <div onclick="openOverlay(${taskId})" class="inner_card_board2">
//                 <div class="card_title_board" style="background: ${backgroundColor};">${taskNumber.category}</div>
//                 <div class="card_text_board"><b>${taskNumber.title}</b></div>
//                 <div class="card_text2_board">${taskNumber.description}</div>
//                 <div class="progressbar_box_board">
//                     <div class="progressbar_board">
//                         <div class="progressbar_filter_board"></div>
//                     </div>
//                     <div class="progressbar_text_board">1/2 Subtasks</div>
//                 </div>
//                 <div class="card_img_main_board">
//                     <div class="card_img_box_board" id="card_img_box_board${i}"></div>
//                     <img class="pro_media_board" src="./assets/img/prio_media.svg" alt="">
//                 </div>
//             </div>
//         </div>
//         `;
//         for (let j = 0; j < taskNumber.contacts.length; j++) {
//             let contact = taskNumber.contacts[j];    
//             let initials = getInitials(contact.name)
//             document.getElementById(`card_img_box_board${i}`).innerHTML += /*html*/`
//                 <div class="card_img_board"><span style="background-color: ${contact.color}" class="initials_card_img_board">${initials}</span></div>
//             `;
//         }
//     }

//     let columnTasks2 = currentUser.tasks.filter(task => task.column == 'column_board2');
//     document.getElementById(`column_board2`).innerHTML = '';
//     // let countColumn1 = columnTasks1.length;
    
//     for (let i = 0; i < columnTasks2.length; i++) {
//         let taskNumber = columnTasks2[i];
//         // let columnIndex = tasks.filter(task => task.column == 'column_board').length + i;
//         let taskId = taskNumber.id
//         let backgroundColor = (taskNumber.category === 'Technical Task') ? '#1FD7C1' : '#0038FF';
//         document.getElementById(`column_board2`).innerHTML += /*html*/ `
//         <div draggable="true" ondragstart="startDragging(${taskId})" class="card_board2">
//             <div onclick="openOverlay(${taskId})" class="inner_card_board2">
//                 <div class="card_title_board" style="background: ${backgroundColor};">${taskNumber.category}</div>
//                 <div class="card_text_board"><b>${taskNumber.title}</b></div>
//                 <div class="card_text2_board">${taskNumber.description}</div>
//                 <div class="progressbar_box_board">
//                     <div class="progressbar_board">
//                         <div class="progressbar_filter_board"></div>
//                     </div>
//                     <div class="progressbar_text_board">1/2 Subtasks</div>
//                 </div>
//                 <div class="card_img_main_board">
//                     <div class="card_img_box_board" id="card_img_box_board${i}"></div>
//                     <img class="pro_media_board" src="./assets/img/prio_media.svg" alt="">
//                 </div>
//             </div>
//         </div>
//         `;
//         for (let j = 0; j < taskNumber.contacts.length; j++) {
//             let contact = taskNumber.contacts[j];    
//             let initials = getInitials(contact.name)
//             document.getElementById(`card_img_box_board${i}`).innerHTML += /*html*/`
//                 <div class="card_img_board"><span style="background-color: ${contact.color}" class="initials_card_img_board">${initials}</span></div>
//             `;
//         }
//     }

//     let columnTasks3 = currentUser.tasks.filter(task => task.column == 'column_board3');
//     document.getElementById(`column_board3`).innerHTML = '';
//     // let countColumn1 = columnTasks1.length;
    
//     for (let i = 0; i < columnTasks3.length; i++) {
//         let taskNumber = columnTasks3[i];
//         // let columnIndex = tasks.filter(task => task.column == 'column_board').length + i;
//         let taskId = taskNumber.id
//         let backgroundColor = (taskNumber.category === 'Technical Task') ? '#1FD7C1' : '#0038FF';
//         document.getElementById(`column_board3`).innerHTML += /*html*/ `
//         <div draggable="true" ondragstart="startDragging(${taskId})" class="card_board2">
//             <div onclick="openOverlay(${taskId})" class="inner_card_board2">
//                 <div class="card_title_board" style="background: ${backgroundColor};">${taskNumber.category}</div>
//                 <div class="card_text_board"><b>${taskNumber.title}</b></div>
//                 <div class="card_text2_board">${taskNumber.description}</div>
//                 <div class="progressbar_box_board">
//                     <div class="progressbar_board">
//                         <div class="progressbar_filter_board"></div>
//                     </div>
//                     <div class="progressbar_text_board">1/2 Subtasks</div>
//                 </div>
//                 <div class="card_img_main_board">
//                     <div class="card_img_box_board" id="card_img_box_board${i}"></div>
//                     <img class="pro_media_board" src="./assets/img/prio_media.svg" alt="">
//                 </div>
//             </div>
//         </div>
//         `;
//         for (let j = 0; j < taskNumber.contacts.length; j++) {
//             let contact = taskNumber.contacts[j];    
//             let initials = getInitials(contact.name)
//             document.getElementById(`card_img_box_board${i}`).innerHTML += /*html*/`
//                 <div class="card_img_board"><span style="background-color: ${contact.color}" class="initials_card_img_board">${initials}</span></div>
//             `;
//         }
//     }

//     let columnTasks4 = currentUser.tasks.filter(task => task.column == 'column_board4');
//     document.getElementById(`column_board4`).innerHTML = '';
//     // let countColumn1 = columnTasks1.length;
    
//     for (let i = 0; i < columnTasks4.length; i++) {
//         let taskNumber = columnTasks4[i];
//         // let columnIndex = tasks.filter(task => task.column == 'column_board').length + i;
//         let taskId = taskNumber.id
//         let backgroundColor = (taskNumber.category === 'Technical Task') ? '#1FD7C1' : '#0038FF';
//         document.getElementById(`column_board4`).innerHTML += /*html*/ `
//         <div draggable="true" ondragstart="startDragging(${taskId})" class="card_board2">
//             <div onclick="openOverlay(${taskId})" class="inner_card_board2">
//                 <div class="card_title_board" style="background: ${backgroundColor};">${taskNumber.category}</div>
//                 <div class="card_text_board"><b>${taskNumber.title}</b></div>
//                 <div class="card_text2_board">${taskNumber.description}</div>
//                 <div class="progressbar_box_board">
//                     <div class="progressbar_board">
//                         <div class="progressbar_filter_board"></div>
//                     </div>
//                     <div class="progressbar_text_board">1/2 Subtasks</div>
//                 </div>
//                 <div class="card_img_main_board">
//                     <div class="card_img_box_board" id="card_img_box_board${i}"></div>
//                     <img class="pro_media_board" src="./assets/img/prio_media.svg" alt="">
//                 </div>
//             </div>
//         </div>
//         `;
//         for (let j = 0; j < taskNumber.contacts.length; j++) {
//             let contact = taskNumber.contacts[j];    
//             let initials = getInitials(contact.name)
//             document.getElementById(`card_img_box_board${i}`).innerHTML += /*html*/`
//                 <div class="card_img_board"><span style="background-color: ${contact.color}" class="initials_card_img_board">${initials}</span></div>
//             `;
//         }
//     }

//     clearEmptyAlert();
//     closeTaskFormOnBoard();
    
// }

function clearEmptyAlert() {
    let column1 = document.getElementById('column_board');
    let column2 = document.getElementById('column_board2');
    let column3 = document.getElementById('column_board3');
    let column4 = document.getElementById('column_board4');
    // let emptyBox = document.getElementById('empty_box');
    // let newContent = document.getElementById(`new_content${i}`);

    // if (column1.contains(emptyBox) && newContent) {
    //     emptyBox.style.display = 'none';
    // }
    if (column1.childElementCount === 0) {
        document.getElementById('column_board').innerHTML = /*html*/ `
        <div id="empty_box" class="empty_card_board">
            <span>No tasks To do</span>
        </div>
        `;
    }
    if (column2.childElementCount === 0) {
        document.getElementById('column_board2').innerHTML = /*html*/ `
        <div id="empty_box" class="empty_card_board">
            <span>No tasks To do</span>
        </div>
        `;
    }
    if (column3.childElementCount === 0) {
        document.getElementById('column_board3').innerHTML = /*html*/ `
        <div id="empty_box" class="empty_card_board">
            <span>No tasks To do</span>
        </div>
        `;
    }
    if (column4.childElementCount === 0) {
        document.getElementById('column_board4').innerHTML = /*html*/ `
        <div id="empty_box" class="empty_card_board">
            <span>No tasks To do</span>
        </div>
        `;
    }
    
}

async function deleteTask(taskId) {
    currentUser.tasks.splice(taskId, 1);
    for (let i = taskId; i < currentUser.tasks.length; i++) {
        currentUser.tasks[i].id = i; // Ändere die ID der Aufgabe
    }
    taskIdCounter = currentUser.taskId
    taskIdCounter--;
    currentUser.taskId = taskIdCounter;
    await saveUsers();
    renderTask();
    closeOverlay();   
}

function clearTask() {
    title.value = '';
    description.value = '';
    date.value = '';
}

// function changeCategoryColor(){
//     document.getElementById('category_task').addEventListener('change', function() {
//         let selectedOption = this.value;
//         let cardTitleBoard = document.querySelector('.card_title_board');
//         if (selectedOption === 'Technical Task') {
//             cardTitleBoard.style.background = '#1FD7C1';
//         } else {
//             cardTitleBoard.style.background = '#0038FF'; // Set it back to default color if another option is selected
//         }
//     });
// }

let currentDraggedElement;

function startDragging(id) {
    currentDraggedElement = id;
}

function allowDrop(ev) {
    ev.preventDefault();
}

async function moveTo(category) {
    currentUser.tasks[currentDraggedElement]['column'] = category;
    await saveUsers();
    renderTask();
    let searchField = document.getElementById('search_input_task');
    searchField.value = '';
}

function highlight(id) {
    document.getElementById(id).classList.add('drag-area-highlight');
}

function removeHighlight(id) {
    document.getElementById(id).classList.remove('drag-area-highlight');
}
    

// async function createStaticTasks() {
//     let task = [{
//         "title": 'Kochwelt Page & Recipe Recommender',
//         "description": 'Build start page with recipe recommendation...',
//         "date": '20.12.2024',
//         "category": 'User Story',
//         "subtask": 'xxx',
//         "column": 'column_board2',
//         "id": 0
//         // "id": id+1
//         // "category": targetColumnId
//     },
//     {
//         "title": 'aaa',
//         "description": 'ggg',
//         "date": '20.12.2024',
//         "category": 'User Story',
//         "subtask": 'xxx',
//         "column": 'column_board3',
//         "id": 1
//         // "id": id+1
//         // "category": targetColumnId
//     },
//     {
//         "title": 'aaa',
//         "description": 'ggg',
//         "date": '20.12.2024',
//         "category": 'User Story',
//         "subtask": 'xxx',
//         "column": 'column_board3',
//         "id": 2
//         // "id": id+1
//         // "category": targetColumnId
//     },
//     {
//         "title": 'aaa',
//         "description": 'ggg',
//         "date": '20.12.2024',
//         "category": 'User Story',
//         "subtask": 'xxx',
//         "column": 'column_board4',
//         "id": 3
//         // "id": id+1
//         // "category": targetColumnId
//     }]
//     // currentUser.tasks.splice(0,3);
       // await saveUsers();
//     // currentUser.tasks.push(...task);
//     
// }

// document.addEventListener('DOMContentLoaded', function() {
//     document.getElementById('search_input_task').addEventListener('keyup', function() {
//         searchTask();
//     });
// });



// // RICHTIGE SUCHFUNKTION

document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('search_input_task').addEventListener('keyup', function() {
        searchTask(this.value.trim().toLowerCase());
    });
});

function searchTask(searchInput) {
    let allTasks = currentUser.tasks;
    let searchRegex = new RegExp('^' + searchInput, 'i');

    // Leeren Sie alle Spalten, um eine korrekte Anzeige sicherzustellen
    document.getElementById('column_board').innerHTML = '';
    document.getElementById('column_board2').innerHTML = '';
    document.getElementById('column_board3').innerHTML = '';
    document.getElementById('column_board4').innerHTML = '';

    // Variable, um zu überprüfen, ob Ergebnisse gefunden wurden
    let resultsFound = false;

    // Durchlaufen Sie jede Spalte und rendern Sie nur die passenden Aufgaben
    ['column_board', 'column_board2', 'column_board3', 'column_board4'].forEach(columnId => {
        let tasksForColumn = allTasks.filter(task => task.column === columnId && searchRegex.test(task.title.charAt(0)));

        for (let i = 0; i < tasksForColumn.length; i++) {
            let taskNumber = tasksForColumn[i];
            let taskId = taskNumber.id;
            let backgroundColor = (taskNumber.category === 'Technical Task') ? '#1FD7C1' : '#0038FF';
            let cardImgBoxId = `card_img_box_${columnId}${i}`; // Eindeutige ID für das Bildfeld

            document.getElementById(columnId).innerHTML += `
                <div draggable="true" ondragstart="startDragging(${taskId})" class="card_board2">
                    <div onclick="openOverlay(${taskId})" class="inner_card_board2">
                        <div class="card_title_board" style="background: ${backgroundColor};">${taskNumber.category}</div>
                        <div class="card_text_board"><b>${taskNumber.title}</b></div>
                        <div class="card_text2_board">${taskNumber.description}</div>
                        <div class="progressbar_box_board">
                            <div class="progressbar_board">
                                <div class="progressbar_filter_board"></div>
                            </div>
                            <div class="progressbar_text_board">1/2 Subtasks</div>
                        </div>
                        <div class="card_img_main_board">
                            <div class="card_img_box_board" id="${cardImgBoxId}"></div>
                            <img class="pro_media_board" src="./assets/img/prio_media.svg" alt="">
                        </div>
                    </div>
                </div>
            `;

            for (let j = 0; j < taskNumber.contacts.length; j++) {
                let contact = taskNumber.contacts[j];
                let initials = getInitials(contact.name);
                document.getElementById(cardImgBoxId).innerHTML += `
                    <div class="card_img_board"><span style="background-color: ${contact.color}" class="initials_card_img_board">${initials}</span></div>
                `;
            }

            // Setzen Sie die Variable auf true, da Ergebnisse gefunden wurden
            resultsFound = true;
        }
    });

    // Wenn keine Ergebnisse gefunden wurden, zeigen Sie einen Alert an
    if (!resultsFound) {
        alert('Keine Ergebnisse gefunden');
    }
}

// // RICHTIGE SUCHFUNKTION

// RICHTIGE RENDERFUNKTION

function renderTask() {
    let columnTasks1 = currentUser.tasks.filter(task => task.column == 'column_board');
    document.getElementById(`column_board`).innerHTML = '';
    renderTasks(columnTasks1, 'column_board');

    let columnTasks2 = currentUser.tasks.filter(task => task.column == 'column_board2');
    document.getElementById(`column_board2`).innerHTML = '';
    renderTasks(columnTasks2, 'column_board2');

    let columnTasks3 = currentUser.tasks.filter(task => task.column == 'column_board3');
    document.getElementById(`column_board3`).innerHTML = '';
    renderTasks(columnTasks3, 'column_board3');

    let columnTasks4 = currentUser.tasks.filter(task => task.column == 'column_board4');
    document.getElementById(`column_board4`).innerHTML = '';
    renderTasks(columnTasks4, 'column_board4');

    clearEmptyAlert();
    closeTaskFormOnBoard();
}

function renderTasks(columnTasks, columnId) {
    for (let i = 0; i < columnTasks.length; i++) {
        let taskNumber = columnTasks[i];
        let taskId = taskNumber.id;
        let backgroundColor = (taskNumber.category === 'Technical Task') ? '#1FD7C1' : '#0038FF';
        
        let containerId = `card_img_box_${columnId}_${i}`; // Unique container ID

        let totalSubtasks = taskNumber.subtask.length;
        let checkedSubtasks = taskNumber.subtask.filter(subtask => subtask.checked).length;
        let task = currentUser.tasks.find(task => task.id === taskId);
        
        let priorityImage;
        switch (taskNumber.prio) {
            case 'Urgent':
                priorityImage = './assets/img/prio_up_red.svg';
                break;
            case 'Low':
                priorityImage = './assets/img/prio_low.svg';
                break;
            default:
                priorityImage = './assets/img/prio_media.svg';
                break;
        }
        
        document.getElementById(columnId).innerHTML += /*html*/ `
            <div draggable="true" ondragstart="startDragging(${taskId})" class="card_board2">
                <div onclick="openOverlay(${taskId})" class="inner_card_board2">
                    <div class="card_title_board" style="background: ${backgroundColor};">${taskNumber.category}</div>
                    <div class="card_text_board"><b>${taskNumber.title}</b></div>
                    <div class="card_text2_board">${taskNumber.description}</div>
                    <div class="progressbar_box_board">
                        <div id="progressbar_${taskId}" class="progressbar_board">
                            <div id="progress_${taskId}" class="progressbar_filter_board"></div>
                        </div>
                        <div id="progressText_${taskId}" class="progressbar_text_board">${checkedSubtasks}/${totalSubtasks} Subtasks</div>
                    </div>                   
                    <div class="card_img_main_board">
                        <div class="card_img_box_board" id="${containerId}"></div>
                        <img class="pro_media_board" src="${priorityImage}" alt="">
                    </div>
                </div>
            </div>
        `;
        
        renderContactImages(containerId, taskNumber.contacts);
        updateProgressBar(task);
    }
}

function renderContactImages(containerId, contacts) {
    for (let contact of contacts) {
        let initials = getInitials(contact.name);
        document.getElementById(containerId).innerHTML += /*html*/`
            <div class="card_img_board"><span style="background-color: ${contact.color}" class="initials_card_img_board">${initials}</span></div>
        `;
    }
}

// RICHTIGE RENDERFUNKTION


























// // RICHTIGE RENDERFUNKTION

// function renderTask() {
//     let columnTasks1 = currentUser.tasks.filter(task => task.column == 'column_board');
//     document.getElementById(`column_board`).innerHTML = '';
//     renderTasks(columnTasks1, 'column_board');

//     let columnTasks2 = currentUser.tasks.filter(task => task.column == 'column_board2');
//     document.getElementById(`column_board2`).innerHTML = '';
//     renderTasks(columnTasks2, 'column_board2');

//     let columnTasks3 = currentUser.tasks.filter(task => task.column == 'column_board3');
//     document.getElementById(`column_board3`).innerHTML = '';
//     renderTasks(columnTasks3, 'column_board3');

//     let columnTasks4 = currentUser.tasks.filter(task => task.column == 'column_board4');
//     document.getElementById(`column_board4`).innerHTML = '';
//     renderTasks(columnTasks4, 'column_board4');

//     clearEmptyAlert();
//     closeTaskFormOnBoard();
// }

// function renderTasks(columnTasks, columnId) {
//     for (let i = 0; i < columnTasks.length; i++) {
//         let taskNumber = columnTasks[i];
//         let taskId = taskNumber.id;
//         let backgroundColor = (taskNumber.category === 'Technical Task') ? '#1FD7C1' : '#0038FF';
        
//         let containerId = `card_img_box_${columnId}_${i}`; // Unique container ID
        
//         document.getElementById(columnId).innerHTML += /*html*/ `
//             <div draggable="true" ondragstart="startDragging(${taskId})" class="card_board2">
//                 <div onclick="openOverlay(${taskId})" class="inner_card_board2">
//                     <div class="card_title_board" style="background: ${backgroundColor};">${taskNumber.category}</div>
//                     <div class="card_text_board"><b>${taskNumber.title}</b></div>
//                     <div class="card_text2_board">${taskNumber.description}</div>
//                     <div class="progressbar_box_board">
//                         <div class="progressbar_board">
//                             <div class="progressbar_filter_board"></div>
//                         </div>
//                         <div class="progressbar_text_board">1/2 Subtasks</div>
//                     </div>
//                     <div class="card_img_main_board">
//                         <div class="card_img_box_board" id="${containerId}"></div>
//                         <img class="pro_media_board" src="./assets/img/prio_media.svg" alt="">
//                     </div>
//                 </div>
//             </div>
//         `;
        
//         renderContactImages(containerId, taskNumber.contacts);
//     }
// }

// function renderContactImages(containerId, contacts) {
//     for (let contact of contacts) {
//         let initials = getInitials(contact.name);
//         document.getElementById(containerId).innerHTML += /*html*/`
//             <div class="card_img_board"><span style="background-color: ${contact.color}" class="initials_card_img_board">${initials}</span></div>
//         `;
//     }
// }

// // RICHTIGE RENDERFUNKTION



