function initBoard(){
}

let targetColumnId;

function openOverlay(i){
    document.getElementById('w3-include-board1').innerHTML = /*html*/ `
    <div class="task_overlay_box_board" id="task-overlay">
        <div class="task_overlay_top_board">
            <div class="card_title_board">User Story</div>
            <img class="x_button_board" onclick="closeOverlay()" src="./assets/img/close.svg" alt="">
        </div>
        <h2>${columns[targetColumnId][i].title}</h2>
        <div class="task_overlay_text">
                <span>${columns[targetColumnId][i].description}</span>
            <div class="date_taskoverlay">
                <span class="textcolor_taskoverlay">Due date:</span>
                <span>${columns[targetColumnId][i].date}</span>
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
            <div onclick="deleteTask(${i})" class="delete_box">
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
}

function closeOverlay(){
    document.getElementById(`task-overlay`).style.right = "-700px";
    document.getElementById(`overlay`).style.display = "none";
    document.getElementById(`content-board`).classList.remove('pointer_events-none');
    document.getElementById(`body`).classList.remove('overflow_hidden');
}

function openTaskFormOnBoard(columnId){
    targetColumnId = columnId;
    document.getElementById(`task-form`).style.right = "500px";
    document.getElementById(`overlay`).style.display = "flex";
    document.getElementById(`content-board`).classList.add('pointer_events-none');
    document.getElementById(`body`).classList.add('overflow_hidden');
}

function closeTaskFormOnBoard(){
    document.getElementById(`task-form`).style.right = "-700px";
    document.getElementById(`overlay`).style.display = "none";
    document.getElementById(`content-board`).classList.remove('pointer_events-none');
    document.getElementById(`body`).classList.remove('overflow_hidden');
}

// let tasks = [];
// let column_board = [];
// let column_board2 = [];
// let column_board3 = [];
let columns = {
    column_board: [],
    column_board2: [],
    column_board3: []
};

function createTaskArray(targetColumnId) {
    let title = document.getElementById('title');
    let description = document.getElementById('description');
    let date = document.getElementById('date');
    let task = {
        "title": title.value,
        "description": description.value,
        "date": date.value
    }
    // tasks.push(task);
    columns[targetColumnId].push(task);
    // console.log(tasks);
    title.value = '';
    description.value = '';
    date.value = '';
    renderTask(targetColumnId);
}

function renderTask(targetColumnId) {
    document.getElementById(`${targetColumnId}`).innerHTML = '';
    let tasks = columns[targetColumnId];
    for (let i = 0; i < tasks.length; i++) {
        let taskNumber = tasks[i];
        document.getElementById(`${targetColumnId}`).innerHTML += /*html*/ `
        <div id="new_content${i}" draggable="true" ondragstart="" class="card_board2">
            <div onclick="openOverlay(${i})" class="inner_card_board2">
                <div class="card_title_board">User Story</div>
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
    
}

function deleteTask(i) {
    columns[targetColumnId].splice(i, 1);
    renderTask(targetColumnId);
    closeOverlay();
}

function clearTask() {
    title.value = '';
    description.value = '';
    date.value = '';
}