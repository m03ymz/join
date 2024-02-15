async function initBoard() {
    await init();
    renderContactsAddTask();
}

let targetColumnId;
// let currentDraggedElement;

function openOverlay(taskId){
    // let clickedElement = event.target;
    // while (clickedElement && !clickedElement.classList.contains('column_board')) {
    //     clickedElement = clickedElement.parentElement;
    // }
    // if (clickedElement) {
    //     let targetColumnId = clickedElement.id;

    //     let tasks = columns[targetColumnId];
    //     let taskNumber = tasks[i];

    let task = tasks[taskId];
    let targetColumnId = task.column;
    if (document.getElementById(targetColumnId)) {
        let backgroundColor = (task.category === 'Technical Task') ? '#1FD7C1' : '#0038FF';
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
                <span>${task.date}</span>
            </div>
            <div class="priority_taskoverlay">
                <span class="textcolor_taskoverlay">Priority:</span>
                <div class="priority_taskoverlay2">
                    <span>Medium</span>
                    <img src="./assets/img/prio_media.svg" alt="">
                </div>
            </div>
            <span class="textcolor_taskoverlay">Assigned To:</span>
        </div>
        <div>
            <div class="task_overlay_assigned">
                <div class="assigned_profiles">
                    <img src="./assets/img/profile1.svg" alt="">
                    <span>Emmanuel Mauer</span>
                </div>
                <div class="assigned_profiles">
                    <img src="./assets/img/profile2.svg" alt="">
                    <span>Marcel Bauer</span>
                </div>
                <div class="assigned_profiles">
                    <img src="./assets/img/profile3.svg" alt="">
                    <span>Anton Mayer</span>
                </div>
            </div>
            <div class="subtasks_taskoverlay">
                <span>Subtasks</span>
                <div><input type="checkbox"><span>Implement Recipe Recommendation</span></div>
                <div><input type="checkbox"><span>Start Page Layout</span></div>
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
    document.getElementById(`task-overlay`).style.right = "500px";
    document.getElementById(`overlay`).style.display = "flex";
    document.getElementById(`content-board`).classList.add('pointer_events-none');
    document.getElementById(`body`).classList.add('overflow_hidden');
}}

function closeOverlay(){
    document.getElementById(`task-overlay`).style.right = "-700px";
    document.getElementById(`overlay`).style.display = "none";
    document.getElementById(`content-board`).classList.remove('pointer_events-none');
    document.getElementById(`body`).classList.remove('overflow_hidden');
}

function openTaskFormOnBoard(columnId){
    targetColumnId = columnId;
    document.getElementById(`task-form`).style.right = "20%";
    document.getElementById(`overlay`).style.display = "flex";
    document.getElementById(`content-board`).classList.add('pointer_events-none');
    document.getElementById(`body`).classList.add('overflow_hidden');
}

function closeTaskFormOnBoard(){
    document.getElementById(`task-form`).style.right = "-100%";
    document.getElementById(`overlay`).style.display = "none";
    document.getElementById(`content-board`).classList.remove('pointer_events-none');
    document.getElementById(`body`).classList.remove('overflow_hidden');
}

let tasks = [];
let taskIdCounter = 0;

function createTaskArray(targetColumnId) {
    targetColumnId = (typeof targetColumnId === 'undefined') ? 'column_board' : targetColumnId;
    let title = document.getElementById('title');
    let description = document.getElementById('description');
    let date = document.getElementById('date');
    let category = document.getElementById('category_task');
    let subtask = document.getElementById('subtaskInput');
    
    let task = {
        "title": title.value,
        "description": description.value,
        "date": date.value,
        "category": category.value,
        "subtask": subtask.value,
        "column": targetColumnId,
        "id": taskIdCounter,
        "prio": selectedPriority
        // "id": id+1
        // "category": targetColumnId
    }
    tasks.push(task);
    taskIdCounter++;
    // columns[targetColumnId].push(task);
    // // console.log(tasks);
    title.value = '';
    description.value = '';
    date.value = '';
    renderTask();
    // targetColumnId = 'column_board';
}

function renderTask() {
    let columnTasks1 = tasks.filter(task => task.column == 'column_board');
    document.getElementById(`column_board`).innerHTML = '';
    
    for (let i = 0; i < columnTasks1.length; i++) {
        let taskNumber = columnTasks1[i];
        let taskId = taskNumber.id;
        let backgroundColor = (taskNumber.category === 'Technical Task') ? '#1FD7C1' : '#0038FF';
        document.getElementById(`column_board`).innerHTML += /*html*/ `
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
                    <div class="card_img_box_board">
                        <div class="card_img_board"><img src="./assets/img/profile1.svg" alt=""></div>
                        <div class="card_img_board"><img  src="./assets/img/profile2.svg" alt=""></div>
                        <div class="card_img_board"><img src="./assets/img/profile3.svg" alt=""></div>
                    </div>
                    <img class="pro_media_board" src="./assets/img/prio_media.svg" alt="">
                </div>
            </div>
        </div>
        `;
    }

    let columnTasks2 = tasks.filter(task => task.column == 'column_board2');
    document.getElementById(`column_board2`).innerHTML = '';
    // let countColumn1 = columnTasks1.length;
    
    for (let i = 0; i < columnTasks2.length; i++) {
        let taskNumber = columnTasks2[i];
        // let columnIndex = tasks.filter(task => task.column == 'column_board').length + i;
        let taskId = taskNumber.id
        let backgroundColor = (taskNumber.category === 'Technical Task') ? '#1FD7C1' : '#0038FF';
        document.getElementById(`column_board2`).innerHTML += /*html*/ `
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
                    <div class="card_img_box_board">
                        <div class="card_img_board"><img src="./assets/img/profile1.svg" alt=""></div>
                        <div class="card_img_board"><img  src="./assets/img/profile2.svg" alt=""></div>
                        <div class="card_img_board"><img src="./assets/img/profile3.svg" alt=""></div>
                    </div>
                    <img class="pro_media_board" src="./assets/img/prio_media.svg" alt="">
                </div>
            </div>
        </div>
        `;
    }

    let columnTasks3 = tasks.filter(task => task.column == 'column_board3');
    document.getElementById(`column_board3`).innerHTML = '';
    // let countColumn1 = columnTasks1.length;
    
    for (let i = 0; i < columnTasks3.length; i++) {
        let taskNumber = columnTasks3[i];
        // let columnIndex = tasks.filter(task => task.column == 'column_board').length + i;
        let taskId = taskNumber.id
        let backgroundColor = (taskNumber.category === 'Technical Task') ? '#1FD7C1' : '#0038FF';
        document.getElementById(`column_board3`).innerHTML += /*html*/ `
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
                    <div class="card_img_box_board">
                        <div class="card_img_board"><img src="./assets/img/profile1.svg" alt=""></div>
                        <div class="card_img_board"><img  src="./assets/img/profile2.svg" alt=""></div>
                        <div class="card_img_board"><img src="./assets/img/profile3.svg" alt=""></div>
                    </div>
                    <img class="pro_media_board" src="./assets/img/prio_media.svg" alt="">
                </div>
            </div>
        </div>
        `;
    }

    let columnTasks4 = tasks.filter(task => task.column == 'column_board4');
    document.getElementById(`column_board4`).innerHTML = '';
    // let countColumn1 = columnTasks1.length;
    
    for (let i = 0; i < columnTasks4.length; i++) {
        let taskNumber = columnTasks4[i];
        // let columnIndex = tasks.filter(task => task.column == 'column_board').length + i;
        let taskId = taskNumber.id
        let backgroundColor = (taskNumber.category === 'Technical Task') ? '#1FD7C1' : '#0038FF';
        document.getElementById(`column_board4`).innerHTML += /*html*/ `
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
                    <div class="card_img_box_board">
                        <div class="card_img_board"><img src="./assets/img/profile1.svg" alt=""></div>
                        <div class="card_img_board"><img  src="./assets/img/profile2.svg" alt=""></div>
                        <div class="card_img_board"><img src="./assets/img/profile3.svg" alt=""></div>
                    </div>
                    <img class="pro_media_board" src="./assets/img/prio_media.svg" alt="">
                </div>
            </div>
        </div>
        `;
    }

    clearEmptyAlert();
    closeTaskFormOnBoard();
    
}

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

function deleteTask(taskId) {
    tasks.splice(taskId, 1);
    for (let i = taskId; i < tasks.length; i++) {
        tasks[i].id = i; // Ändere die ID der Aufgabe
    }
    renderTask();
    closeOverlay();
    taskIdCounter--;
}

function clearTask() {
    title.value = '';
    description.value = '';
    date.value = '';
}

// function startDragging(i) {
//     currentDraggedElement = i;
// }

// function allowDrop(ev) {
//     ev.preventDefault();
// }

// function moveTo(category) {
//     columns[currentDraggedElement]['category'] = category;
//     renderTask(targetColumnId);
// }

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

// function searchTask() {
//     let title = columns.column_board.filter(t => t['title'] == search_input_task.value);

//     for (let i = 0; i < columns.column_board.length; i++) {
//         const element = title[i];
//         document.getElementById(`${targetColumnId}`).innerHTML += /*html*/ `
//         <div id="new_content${i}" draggable="true" ondragstart="startDragging(${i})" class="card_board2">
//             <div onclick="openOverlay(${i})" class="inner_card_board2">
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
//                     <div class="card_img_box_board">
//                         <div class="card_img_board"><img src="./assets/img/profile1.svg" alt=""></div>
//                         <div class="card_img_board"><img  src="./assets/img/profile2.svg" alt=""></div>
//                         <div class="card_img_board"><img src="./assets/img/profile3.svg" alt=""></div>
//                     </div>
//                     <img class="pro_media_board" src="./assets/img/prio_media.svg" alt="">
//                 </div>
//             </div>
//         </div>
//         `;
//     }
//     }


// document.addEventListener('DOMContentLoaded', function() {
//     document.getElementById('search_input_task').addEventListener('keyup', function() {
//         searchTask();
//     });
// });

document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('search_input_task').addEventListener('keyup', function() {
        searchTask();
    });
});

function searchTask() {
    let searchInput = document.getElementById('search_input_task').value.toLowerCase();
    let tasks = columns[targetColumnId];
    let filteredTasks = tasks.filter(task => task.title.toLowerCase().includes(searchInput));
    
    renderFilteredTasks('column_board', filteredTasks);
    renderFilteredTasks('column_board2', filteredTasks);
    renderFilteredTasks('column_board3', filteredTasks);
}

function renderFilteredTasks(targetColumnId, filteredTasks) {
    // let targetColumnId = 'column_board'; // Annahme, dass es nur eine Spalte gibt, ändere dies entsprechend deiner Struktur
    // document.getElementById(`${targetColumnId}`).innerHTML = '';
    let columnElement = document.getElementById(targetColumnId);
    columnElement.innerHTML = '';

    for (let i = 0; i < filteredTasks.length; i++) {
        let taskNumber = filteredTasks[i];
        let backgroundColor = (taskNumber.category === 'Technical Task') ? '#1FD7C1' : '#0038FF';
        document.getElementById(`${targetColumnId}`).innerHTML += /*html*/ `
        <div id="new_content${i}" draggable="true" ondragstart="startDragging(${i})" class="card_board2">
            <div onclick="openOverlay(${i})" class="inner_card_board2">
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
                    <div class="card_img_box_board">
                        <div class="card_img_board"><img src="./assets/img/profile1.svg" alt=""></div>
                        <div class="card_img_board"><img  src="./assets/img/profile2.svg" alt=""></div>
                        <div class="card_img_board"><img src="./assets/img/profile3.svg" alt=""></div>
                    </div>
                    <img class="pro_media_board" src="./assets/img/prio_media.svg" alt="">
                </div>
            </div>
        </div>
        `;
    }  

    
}

// function renderFilteredTasks2(filteredTasks) {
//     let targetColumnId = 'column_board2'; // Annahme, dass es nur eine Spalte gibt, ändere dies entsprechend deiner Struktur
//     document.getElementById(`${targetColumnId}`).innerHTML = '';

//     for (let i = 0; i < filteredTasks.length; i++) {
//         let taskNumber = filteredTasks[i];
//         let backgroundColor = (taskNumber.category === 'Technical Task') ? '#1FD7C1' : '#0038FF';
//         document.getElementById(`${targetColumnId}`).innerHTML += /*html*/ `
//         <div id="new_content${i}" draggable="true" ondragstart="startDragging(${i})" class="card_board2">
//             <div onclick="openOverlay(${i})" class="inner_card_board2">
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
//                     <div class="card_img_box_board">
//                         <div class="card_img_board"><img src="./assets/img/profile1.svg" alt=""></div>
//                         <div class="card_img_board"><img  src="./assets/img/profile2.svg" alt=""></div>
//                         <div class="card_img_board"><img src="./assets/img/profile3.svg" alt=""></div>
//                     </div>
//                     <img class="pro_media_board" src="./assets/img/prio_media.svg" alt="">
//                 </div>
//             </div>
//         </div>
//         `;
//     }  

    
// }

// function renderFilteredTasks3(filteredTasks) {
//     let targetColumnId = 'column_board3'; // Annahme, dass es nur eine Spalte gibt, ändere dies entsprechend deiner Struktur
//     document.getElementById(`${targetColumnId}`).innerHTML = '';

//     for (let i = 0; i < filteredTasks.length; i++) {
//         let taskNumber = filteredTasks[i];
//         let backgroundColor = (taskNumber.category === 'Technical Task') ? '#1FD7C1' : '#0038FF';
//         document.getElementById(`${targetColumnId}`).innerHTML += /*html*/ `
//         <div id="new_content${i}" draggable="true" ondragstart="startDragging(${i})" class="card_board2">
//             <div onclick="openOverlay(${i})" class="inner_card_board2">
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
//                     <div class="card_img_box_board">
//                         <div class="card_img_board"><img src="./assets/img/profile1.svg" alt=""></div>
//                         <div class="card_img_board"><img  src="./assets/img/profile2.svg" alt=""></div>
//                         <div class="card_img_board"><img src="./assets/img/profile3.svg" alt=""></div>
//                     </div>
//                     <img class="pro_media_board" src="./assets/img/prio_media.svg" alt="">
//                 </div>
//             </div>
//         </div>
//         `;
//     }  

    
// }

let currentDraggedElement;

function startDragging(id) {
    currentDraggedElement = id;
}

function allowDrop(ev) {
    ev.preventDefault();
}

function moveTo(category) {
    tasks[currentDraggedElement]['column'] = category;
    renderTask();
}

function highlight(id) {
    document.getElementById(id).classList.add('drag-area-highlight');
}

function removeHighlight(id) {
    document.getElementById(id).classList.remove('drag-area-highlight');
}
    
