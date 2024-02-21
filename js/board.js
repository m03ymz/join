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
        let month = taskDate.getMonth() + 1; 
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
                        ${assignedProfilesHTML} 
                    </div>
            <div class="subtasks_taskoverlay">
                ${subtasksSpan}
                ${subtasksHTML} 
            </div>
        </div> 
        <div class="delete_edit_taskoverlay">
            <div onclick="deleteTask('${taskId}')" class="delete_box">
                <img src="./assets/img/delete.svg" alt="">
                <span>Delete</span>
            </div>
            <img src="./assets/img/vector2.svg" alt="">
            <div onclick="editTask('${taskId}')" class="edit_box">
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

function clearEmptyAlert() {
    let column1 = document.getElementById('column_board');
    let column2 = document.getElementById('column_board2');
    let column3 = document.getElementById('column_board3');
    let column4 = document.getElementById('column_board4');
   
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
        currentUser.tasks[i].id = i; 
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

document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('search_input_task').addEventListener('keyup', function() {
        searchTask(this.value.trim().toLowerCase());
    });
});

function searchTask(searchInput) {
    let allTasks = currentUser.tasks;
    let searchWords = searchInput.split(/\s+/).map(word => word.trim().toLowerCase());
    let searchRegex = searchWords.map(word => new RegExp(word, 'i'));
    document.getElementById('column_board').innerHTML = '';
    document.getElementById('column_board2').innerHTML = '';
    document.getElementById('column_board3').innerHTML = '';
    document.getElementById('column_board4').innerHTML = '';

    ['column_board', 'column_board2', 'column_board3', 'column_board4'].forEach(columnId => {
        let tasksForColumn = allTasks.filter(task => task.column === columnId && searchWords.every(word => task.title.toLowerCase().includes(word)));

        for (let i = 0; i < tasksForColumn.length; i++) {
            let taskNumber = tasksForColumn[i];
            let taskId = taskNumber.id;
            let backgroundColor = (taskNumber.category === 'Technical Task') ? '#1FD7C1' : '#0038FF';
            let cardImgBoxId = `card_img_box_${columnId}${i}`; 

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
        }
    });
}

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
        let progressBarHtml = renderProgressBar(taskId, totalSubtasks, checkedSubtasks);
        
        document.getElementById(columnId).innerHTML += /*html*/ `
            <div draggable="true" ondragstart="startDragging(${taskId})" class="card_board2">
                <div onclick="openOverlay(${taskId})" class="inner_card_board2">
                    <div class="task_card_top_board">
                        <div class="card_title_board" style="background: ${backgroundColor};">${taskNumber.category}</div>
                        <div>
                            <img src="./assets/img/arrow_up.png" alt="">
                            <img src="./assets/img/arrow_down.png" alt="">
                        </div>
                    </div>
                    <div class="card_text_board"><b>${taskNumber.title}</b></div>
                    <div class="card_text2_board">${taskNumber.description}</div>
                    ${progressBarHtml}
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

function editTask(taskId) {
    let task = currentUser.tasks[taskId];
    if (task) {
        document.getElementById('edit_title').value = task.title;
        document.getElementById('edit_description').value = task.description;
        document.getElementById('edit_date').value = task.date;
        // document.getElementById('edit_category_task').value = task.category;
        let subtaskContainer = document.getElementById('edit_subtaskContainer');
        subtaskContainer.innerHTML = '';
        if (task.subtask && task.subtask.length > 0) {
            for (let i = 0; i < task.subtask.length; i++) {
                const subtaskArray = task.subtask[i].subtask;
                if (Array.isArray(subtaskArray)) {
                    subtaskArray.forEach(subtaskItem => {
                        subtaskContainer.innerHTML += `<div>${subtaskItem.subtask}</div>`;
                    });
                } else {
                    // Handle case where subtaskArray is not an array
                    console.error("Subtask is not an array:", subtaskArray);
                }
            }
        }
        toggleButtonEdit(task.prio);

        let assignedProfilesContainer = document.getElementById('edit_selected_contacts_add_task');
        assignedProfilesContainer.innerHTML = '';
        // Iterate over selected contacts and render them
        task.contacts.forEach(contact => {
            let initials = getInitials(contact.name);
            let contactHTML = `
                <div class="assigned_profiles">
                    <span style="background-color: ${contact.color}" class="initials_card_img_board">${initials}</span>
                    <span>${contact.name}</span>
                </div>
            `;
            assignedProfilesContainer.innerHTML += contactHTML;
        });

        document.getElementById('editTaskSubmit').dataset.taskId = taskId;
        // let taskId = document.getElementById('editTaskSubmit').value;
        document.getElementById(`task-overlay`).style.display = "none";
        document.getElementById(`edit-form`).style.display = "unset";
    }
}

async function saveEditedTask() {
    let taskId = document.getElementById('editTaskSubmit').dataset.taskId;
    // let taskId = document.getElementById('editTaskSubmit').value;
    let taskIndex = -1;
    for (let i = 0; i < currentUser.tasks.length; i++) {
        if (currentUser.tasks[i].id == taskId) {
            taskIndex = i;
            break;
        }
    }
    if (taskIndex !== -1) {
        currentUser.tasks[taskIndex].title = document.getElementById('edit_title').value;
        currentUser.tasks[taskIndex].description = document.getElementById('edit_description').value;
        currentUser.tasks[taskIndex].date = document.getElementById('edit_date').value;
        currentUser.tasks[taskIndex].prio = selectedPriority;
        await saveUsers();
        renderTask();
        closeTaskEditOnBoard();
    }
}

function closeTaskEditOnBoard(){
    document.getElementById(`edit-form`).style.display = "none";
    document.getElementById(`overlay`).style.display = "none";
    document.getElementById(`content-board`).classList.remove('pointer_events-none');
    document.getElementById(`body`).classList.remove('overflow_hidden');
}

function toggleButtonEdit(priority) {
    let urgentButtonWhite = document.getElementById('edit_urgentbuttonwhite');
    let urgentButtonRed = document.getElementById('edit_urgentbuttonred');
    let mediumButtonOrange = document.getElementById('edit_mediumbuttonorange');
    let mediumButtonWhite = document.getElementById('edit_mediumbuttonwhite');
    let lowButtonWhite = document.getElementById('edit_lowbuttonwhite');
    let lowButtonGreen = document.getElementById('edit_lowbuttongreen');
  
    if (priority === 'urgent') {
        urgentButtonWhite.classList.toggle('hide_icon');
        urgentButtonRed.classList.toggle('hide_icon');
        mediumButtonOrange.classList.add('hide_icon');
        mediumButtonWhite.classList.remove('hide_icon');
        lowButtonWhite.classList.remove('hide_icon');
        lowButtonGreen.classList.add('hide_icon');
        selectedPriority = 'Urgent';
    } else if (priority === 'medium') {
        mediumButtonOrange.classList.toggle('hide_icon');
        mediumButtonWhite.classList.toggle('hide_icon');
        urgentButtonWhite.classList.remove('hide_icon');
        urgentButtonRed.classList.add('hide_icon');
        lowButtonWhite.classList.remove('hide_icon');
        lowButtonGreen.classList.add('hide_icon');
        selectedPriority = 'Medium';
    } else if (priority === 'low') {
        lowButtonWhite.classList.toggle('hide_icon');
        lowButtonGreen.classList.toggle('hide_icon');
        urgentButtonWhite.classList.remove('hide_icon');
        urgentButtonRed.classList.add('hide_icon');
        mediumButtonOrange.classList.add('hide_icon');
        mediumButtonWhite.classList.remove('hide_icon');
        selectedPriority = 'Low';
    }
  }

  function renderProgressBar(taskId, totalSubtasks, checkedSubtasks) {
    if (totalSubtasks > 0) {
        return /*html*/ `
            <div class="progressbar_box_board">
                <div id="progressbar_${taskId}" class="progressbar_board">
                    <div id="progress_${taskId}" class="progressbar_filter_board"></div>
                </div>
                <div id="progressText_${taskId}" class="progressbar_text_board">${checkedSubtasks}/${totalSubtasks} Subtasks</div>
            </div>`;
    } else {
        return '';
    }
}

function openContactListAddTaskEdit() {
    let contactBar = document.getElementById('edit_contact_bar_select_contacts_add_task');
    let contactList = document.getElementById('edit_contact_list_add_task');
    contactBar.innerHTML = /*html*/`
        <div class="search_bar_select_contacts_add_task">
            <input type="text" id="edit_search_bar_contacts_add_task" onkeyup="searchContactsAddTaskEdit()">
            <img src="./assets/img/arrow_up_add_task.svg" alt="arrow up symbol" onclick="closeContactListAddTaskEdit()">
        </div>
    `;
    contactList.style = 'display: flex';
    hideSelectedContactsAddTaskEdit();
    renderSelectedContactsAddTaskEdit();
  }

  function closeContactListAddTaskEdit() {
    let contactBar = document.getElementById('edit_contact_bar_select_contacts_add_task');
    let contactList = document.getElementById('edit_contact_list_add_task');
    contactBar.innerHTML = /*html*/`
        <div class="placeholder_select_contacts_add_task" onclick="openContactListAddTaskEdit()">
            <span>Select contacts to assign</span>
            <img src="./assets/img/arrow_down_add_task.svg" alt="arrow down symbol">
        </div>
    `;
    contactList.style = 'display: none';
    renderContactsAddTaskEdit('');
    renderSelectedContactsAddTaskEdit();
    showSelectedContactsAddTaskEdit();
    for (let i = 0; i < currentUser.contacts.length; i++) {
      let contact = currentUser.contacts[i];
      let checkbox = document.getElementById(`edit_checkbox_contact_add_task${i}`);
      if (selectedContactsAddTaskEdit.includes(contact)) {
        checkbox.checked = true;
      } else {
        checkbox.checked = false;
      }
    }
  }
  
  let selectedContactsAddTaskEdit = [];
  
  function selectContactAddTaskEdit(i) {
    let contact = document.getElementById(`edit_contact_add_task${i}`);
    let checkbox = document.getElementById(`edit_checkbox_contact_add_task${i}`);
    if (checkbox.checked) {
        contact.style.backgroundColor = 'unset';
        contact.style.color = 'unset';
        checkbox.checked = false;
        removeSelectedContactsAddTaskEdit(i);
    } else {
        contact.style.backgroundColor = '#2a3647';
        contact.style.color = 'white';
        checkbox.checked = true;
        addSelectedContactsAddTaskEdit(i);
    }
  }
  
  function checkSelectedContactsAddTaskEdit(i) {
    let contact = document.getElementById(`edit_contact_add_task${i}`);
    let checkbox = document.getElementById(`edit_checkbox_contact_add_task${i}`);
    let currentContact = currentUser.contacts[i];
    for (let j = 0; j < selectedContactsAddTaskEdit.length; j++) {
      let selectedContact = selectedContactsAddTaskEdit[j];
      if (currentContact === selectedContact) {
        contact.style.backgroundColor = '#2a3647';
        contact.style.color = 'white';
        checkbox.checked = true;
      }
    }
  }
  
  function addSelectedContactsAddTaskEdit(i) {
    let contact = currentUser.contacts[i];
    selectedContactsAddTaskEdit.push(contact);
    renderSelectedContactsAddTaskEdit();
  }
  
  function removeSelectedContactsAddTaskEdit(i) {
    let contact = currentUser.contacts[i];
    let index = selectedContactsAddTaskEdit.indexOf(contact)
    selectedContactsAddTaskEdit.splice(index, 1);
    renderSelectedContactsAddTaskEdit();
  }
  
  function renderSelectedContactsAddTaskEdit() {
    let selectedContactsDiv = document.getElementById('edit_selected_contacts_add_task');
    selectedContactsDiv.innerHTML = '';
    for (let i = 0; i < selectedContactsAddTaskEdit.length; i++) {
      let selectedContact = selectedContactsAddTaskEdit[i];
      let initials = getInitials(selectedContact.name);
      selectedContactsDiv.innerHTML += /*html*/`
        <div class="initials_contact_add_task" style="background-color: ${selectedContact.color}"><span>${initials}</span></div>
      `;
    }
  }
  
  function showSelectedContactsAddTaskEdit() {
    document.getElementById('edit_selected_contacts_add_task').style = 'display: flex';
  }
  
  function hideSelectedContactsAddTaskEdit() {
    document.getElementById('edit_selected_contacts_add_task').style = 'display: none';
  }
  
  function searchContactsAddTaskEdit() {
    let searchTerm = document.getElementById('edit_search_bar_contacts_add_task').value;
    renderContactsAddTaskEdit(searchTerm);
  }
  
  function resetContactAddTaskEdit() {
    let contacts = document.querySelectorAll('.contact_add_task');
    contacts.forEach(contact => {
        contact.style.backgroundColor = 'unset';
        contact.style.color = 'unset';
        selectedContactsAddTaskEdit = [];
        let checkbox = contact.querySelector('.checkbox_contact_add_task');
        if (checkbox) {
            checkbox.checked = false;
        }
    });
    closeContactListAddTaskEdit();
  }

  function changeAddTask(){
    if (window.innerWidth <= 900) {
        redirect('add_task');
    }
  }


  
  

  



