async function initBoard() {
    await init();
    // delete currentUser.taskId;
    // currentUser.tasks.splice(0, 1);
    // await saveUsers();
    renderTask();
    renderContactsAddTask('');
}

let targetColumnId;
let taskIdCounter;
let currentDraggedElement;

/**
 * Opens the overlay for a specific task, displaying detailed information about the task.
 * 
 * @param {number} taskId - The ID of the task for which to open the overlay.
 * @returns {void}
 */
function openOverlay(taskId){
    let task = currentUser.tasks[taskId];
    let targetColumnId = task.column;
    if (document.getElementById(targetColumnId)) {
        let backgroundColor = (task.category === 'Technical Task') ? '#1FD7C1' : '#0038FF';
        let subtasksHTML = generateSubtasksHTML(taskId, task.subtask);
        let assignedProfilesHTML = generateAssignedProfilesHTML(task.contacts);
        let subtasksText = task.subtask.length === 1 ? 'Subtask' : 'Subtasks';
        let subtasksSpan = task.subtask.length > 0 ? `<span class="subtask_span_taskoverlay">${subtasksText}</span>` : '';
        let priorityText = task.prio ? task.prio : 'Medium';
        let priorityImage = getPriorityImage(task.prio);
        let formattedDate = formatDate(new Date(task.date));
        let taskOverlayHTML = generateTaskOverlayHTML(task, backgroundColor, formattedDate, priorityText, priorityImage, assignedProfilesHTML, subtasksSpan, subtasksHTML, taskId);

        document.getElementById('w3-include-board1').innerHTML = taskOverlayHTML;
        showOverlay();
}}

/**
 * Generates HTML markup for the task overlay based on provided task information.
 * 
 * @param {Object} task - The task object containing task details.
 * @param {string} backgroundColor - The background color for the task category.
 * @param {string} formattedDate - The formatted due date of the task.
 * @param {string} priorityText - The text representation of task priority.
 * @param {string} priorityImage - The URL of the image representing task priority.
 * @param {string} assignedProfilesHTML - The HTML markup for assigned profiles.
 * @param {string} subtasksSpan - The HTML markup for the subtasks section.
 * @param {string} subtasksHTML - The HTML markup for individual subtasks.
 * @param {string} taskId - The ID of the task.
 * @returns {string} The HTML markup for the task overlay.
 */
function generateTaskOverlayHTML(task, backgroundColor, formattedDate, priorityText, priorityImage, assignedProfilesHTML, subtasksSpan, subtasksHTML, taskId) {
    return /*html*/ `
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
}

/**
 * Displays the task overlay on the screen.
 * 
 * @returns {void}
 */
function showOverlay() {
    document.getElementById(`task-overlay`).style.display = "unset";
    document.getElementById(`overlay`).style.display = "flex";
    document.getElementById(`content-board`).classList.add('pointer_events-none');
    document.getElementById(`body`).classList.add('overflow_hidden');
}

/**
 * Generates HTML for the subtasks of a task.
 * 
 * @param {number} taskId - The ID of the task.
 * @param {Array} subtasks - An array of subtasks for the task.
 * @returns {string} - HTML representing the subtasks.
 */
function generateSubtasksHTML(taskId, subtasks) {
    return subtasks.map((subtask, index) => {
        return `<div class="subtask_taskoverlay"><input type="checkbox" onchange="updateProgress(${taskId}, ${index})" ${subtask.checked ? 'checked' : ''}><span>${subtask.subtask}</span></div>`;
    }).join('');
}

/**
 * Generates HTML for displaying assigned profiles.
 * 
 * @param {Array} contacts - An array containing contact objects.
 * @returns {string} - The HTML markup for assigned profiles.
 */
function generateAssignedProfilesHTML(contacts) {
    return contacts.map(contact => {
        let initials = getInitials(contact.name);
        return /*html*/`
            <div class="assigned_profiles">
                <span style="background-color: ${contact.color}" class="initials_card_img_board">${initials}</span>
                <span>${contact.name}</span>
            </div>
        `;
    }).join('');
}

/**
 * Gets the image URL corresponding to the priority text.
 * 
 * @param {string} priorityText - The priority text.
 * @returns {string} - The image URL for the priority.
 */
function getPriorityImage(priorityText) {
    switch (priorityText) {
        case 'Urgent':
            return './assets/img/prio_up_red.svg';
        case 'Low':
            return './assets/img/prio_low.svg';
        default:
            return './assets/img/prio_media.svg';
    }
}

/**
 * Formats the given date into a string in the format "dd/mm/yyyy".
 * 
 * @param {Date} date - The date object to format.
 * @returns {string} - The formatted date string.
 */
function formatDate(date) {
    let day = date.getDate();
    let month = date.getMonth() + 1; 
    let year = date.getFullYear();
    day = (day < 10) ? '0' + day : day;
    month = (month < 10) ? '0' + month : month;
    return `${day}/${month}/${year}`;
}

/**
 * Updates the progress of a subtask for the specified task.
 * 
 * @param {string} taskId - The ID of the task.
 * @param {number} subtaskIndex - The index of the subtask to update.
 * @returns {Promise<void>} - A Promise that resolves once the update is complete.
 */
async function updateProgress(taskId, subtaskIndex) {
    let task = currentUser.tasks.find(task => task.id === taskId);
    if (task) {
        task.subtask[subtaskIndex].checked = !task.subtask[subtaskIndex].checked;
        updateProgressBar(task);
        await saveUsers();
    }
}

/**
 * Updates the progress bar and progress text for the specified task.
 * 
 * @param {object} task - The task object containing subtasks information.
 */
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

/**
 * Calculates the progress percentage based on the number of checked subtasks and the total number of subtasks.
 * 
 * @param {number} totalSubtasks - The total number of subtasks.
 * @param {number} checkedSubtasks - The number of checked subtasks.
 * @returns {number} - The progress percentage.
 */
function calculateProgress(totalSubtasks, checkedSubtasks) {
    return totalSubtasks > 0 ? (checkedSubtasks / totalSubtasks) * 100 : 0;
}

/**
 * Closes the overlay by hiding the task overlay and overlay elements, and restoring pointer events and overflow to the content board and body.
 * 
 * @returns {void}
 */
function closeOverlay(){
    document.getElementById(`task-overlay`).style.display = "none";
    document.getElementById(`overlay`).style.display = "none";
    document.getElementById(`content-board`).classList.remove('pointer_events-none');
    document.getElementById(`body`).classList.remove('overflow_hidden');
}

/**
 * Opens the task form on the specified board column by displaying the task form and overlay elements, and preventing pointer events and overflow on the content board and body.
 * 
 * @param {string} columnId - The ID of the board column where the task form will be opened.
 * @returns {void}
 */
function openTaskFormOnBoard(columnId){
    targetColumnId = columnId;
    document.getElementById(`task-form`).style.display = "unset";
    document.getElementById(`overlay`).style.display = "flex";
    document.getElementById(`content-board`).classList.add('pointer_events-none');
    document.getElementById(`body`).classList.add('overflow_hidden');
}

/**
 * Closes the task form on the board by hiding the task form and overlay elements, and restoring pointer events and overflow on the content board and body.
 * 
 * @returns {void}
 */
function closeTaskFormOnBoard(){
    document.getElementById(`task-form`).style.display = "none";
    document.getElementById(`overlay`).style.display = "none";
    document.getElementById(`content-board`).classList.remove('pointer_events-none');
    document.getElementById(`body`).classList.remove('overflow_hidden');
}

/**
 * Adds selected contacts to the board.
 */
function addSelectedContactsToBoard() {
    currentUser.tasks.push(selectedContactsAddTask)
}

/**
 * Creates a task array based on the provided parameters and adds it to the currentUser tasks.
 * 
 * @param {string} [targetColumnId='column_board'] - The ID of the target column.
 */
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
    let task = createTaskObject(title.value, description.value, date.value, selectionCategory, subtaskValues, targetColumnId, taskIdCounter, selectedContactsAddTask, selectedPriority);
    currentUser.tasks.push(task);
    taskIdCounter++;
    currentUser.taskId = taskIdCounter;
    clearInputFields([title, description, date]);
    category.selectedIndex = 0;
    await saveUsers();
}

/**
 * Clears the input fields by setting their values to an empty string.
 * 
 * @param {HTMLInputElement[]} inputs - An array of HTML input elements to be cleared.
 */
function clearInputFields(inputs) {
    inputs.forEach(input => {
        input.value = '';
    });
}

/**
 * Creates a task object with the provided properties.
 * 
 * @param {string} title - The title of the task.
 * @param {string} description - The description of the task.
 * @param {string} date - The due date of the task.
 * @param {string} category - The category of the task.
 * @param {Object[]} subtasks - An array of subtasks for the task.
 * @param {string} column - The column where the task belongs.
 * @param {number} id - The unique identifier of the task.
 * @param {Object[]} contacts - An array of contacts associated with the task.
 * @param {string} prio - The priority of the task.
 * @returns {Object} The task object created with the provided properties.
 */
function createTaskObject(title, description, date, category, subtasks, column, id, contacts, prio) {
    return {
        "title": title,
        "description": description,
        "date": date,
        "category": category,
        "subtask": subtasks,
        "column": column,
        "id": id,
        "contacts": contacts,
        "prio": prio
    };
}

/**
 * Clears the empty alert message in each column if there are no tasks.
 */
function clearEmptyAlert() {
    let columns = ['column_board', 'column_board2', 'column_board3', 'column_board4'];
    
    columns.forEach(columnId => {
        let column = document.getElementById(columnId);
        if (column.childElementCount === 0) {
            column.innerHTML = /*html*/ `
                <div id="empty_box" class="empty_card_board">
                    <span>No tasks To do</span>
                </div>
            `;
        }
    });
}

/**
 * Deletes the task with the specified ID.
 * 
 * @param {number} taskId - The ID of the task to delete.
 */
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

/**
 * Clears the input fields for task title, description, and date.
 */
function clearTask() {
    title.value = '';
    description.value = '';
    date.value = '';
}

/**
 * Sets the currentDraggedElement variable to the provided ID.
 * 
 * @param {string} id - The ID of the element being dragged.
 */
function startDragging(id) {
    currentDraggedElement = id;
}

/**
 * Prevents the default action from occurring when an element is being dragged over it.
 * 
 * @param {Event} ev - The event object.
 */
function allowDrop(ev) {
    ev.preventDefault();
}

/**
 * Moves a task to the specified category column.
 * 
 * @param {string} category - The category to move the task to.
 * @returns {Promise<void>} - A Promise that resolves after the task is moved and users are saved.
 */
async function moveTo(category) {
    currentUser.tasks[currentDraggedElement]['column'] = category;
    await saveUsers();
    renderTask();
    let searchField = document.getElementById('search_input_task');
    searchField.value = '';
}

/**
 * Highlights a draggable area when an element is dragged over it.
 * 
 * @param {string} id - The ID of the element to highlight.
 */
function highlight(id) {
    document.getElementById(id).classList.add('drag-area-highlight');
}

/**
 * Removes the highlight from a draggable area.
 * 
 * @param {string} id - The ID of the element to remove highlight from.
 */
function removeHighlight(id) {
    document.getElementById(id).classList.remove('drag-area-highlight');
}

/**
 * Adds an event listener to the search input for tasks and triggers the search function.
 */
document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('search_input_task').addEventListener('keyup', function() {
        searchTask(this.value.trim().toLowerCase());
    });
});

/**
 * Searches for tasks based on the input search string.
 * 
 * @param {string} searchInput - The search string entered by the user.
 */
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

/**
 * Renders all tasks on the board.
 */
function renderTask() {
    const columns = ['column_board', 'column_board2', 'column_board3', 'column_board4'];
    for (let i = 0; i < columns.length; i++) {
        const columnId = columns[i];
        const columnTasks = currentUser.tasks.filter(task => task.column === columnId);
        document.getElementById(columnId).innerHTML = '';
        renderTasks(columnTasks, columnId);
    }

    clearEmptyAlert();
    closeTaskFormOnBoard();
}

/**
 * Renders tasks in the specified column.
 * 
 * @param {Array} columnTasks - The array of tasks to render.
 * @param {string} columnId - The ID of the column to render tasks in.
 */
function renderTasks(columnTasks, columnId) {
    for (let i = 0; i < columnTasks.length; i++) {
        let taskNumber = columnTasks[i];
        let taskId = taskNumber.id;
        let backgroundColor = (taskNumber.category === 'Technical Task') ? '#1FD7C1' : '#0038FF';
        
        let containerId = `card_img_box_${columnId}_${i}`; 

        let totalSubtasks = taskNumber.subtask.length;
        let checkedSubtasks = taskNumber.subtask.filter(subtask => subtask.checked).length;
        let task = currentUser.tasks.find(task => task.id === taskId);

        let priorityImage = getPriorityImage(taskNumber.prio);
        let progressBarHtml = renderProgressBar(taskId, totalSubtasks, checkedSubtasks);
        let renderTaskHtml = generateRenderTaskHtml(taskId, taskNumber, backgroundColor, containerId, priorityImage, progressBarHtml);
        
        document.getElementById(columnId).innerHTML += renderTaskHtml;
        
        renderContactImages(containerId, taskNumber.contacts);
        updateProgressBar(task);
    }
}

/**
 * Generates HTML for rendering a task.
 * 
 * @param {number} taskId - The ID of the task.
 * @param {object} taskNumber - The task object containing task details.
 * @param {string} backgroundColor - The background color for the task.
 * @param {string} containerId - The ID of the container for task images.
 * @param {string} priorityImage - The image URL for task priority.
 * @param {string} progressBarHtml - The HTML for the task progress bar.
 * @returns {string} - The HTML string for rendering the task.
 */
function generateRenderTaskHtml(taskId, taskNumber, backgroundColor, containerId, priorityImage, progressBarHtml) {
    return /*html*/ `
    <div draggable="true" ondragstart="startDragging(${taskId})" class="card_board2">
        <div onclick="openOverlay(${taskId})" class="inner_card_board2">
            <div class="task_card_top_board">
                <div class="card_title_board" style="background: ${backgroundColor};">${taskNumber.category}</div>
                <div>
                    ${taskNumber.column === 'column_board' ? `<img onclick="moveTaskUp(${taskId}); event.stopPropagation();" style="display: none;" src="./assets/img/arrow_up.png" alt="">` : `<img onclick="moveTaskUp(${taskId}); event.stopPropagation();" src="./assets/img/arrow_up.png" alt="">`}
                    ${taskNumber.column === 'column_board4' ? `<img onclick="moveTaskDown(${taskId}); event.stopPropagation();" style="display: none;" src="./assets/img/arrow_down.png" alt="">` : `<img onclick="moveTaskDown(${taskId}); event.stopPropagation();" src="./assets/img/arrow_down.png" alt="">`}
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
}

/**
 * Retrieves the image URL based on the task priority.
 * 
 * @param {string} priority - The priority of the task.
 * @returns {string} - The image URL for the task priority.
 */
function getPriorityImg(priority) {
    switch (priority) {
        case 'Urgent':
            return './assets/img/prio_up_red.svg';
        case 'Low':
            return './assets/img/prio_low.svg';
        default:
            return './assets/img/prio_media.svg';
    }
}

/**
 * Renders contact images for a task.
 * 
 * @param {string} containerId - The ID of the container for contact images.
 * @param {Array} contacts - The array of contacts associated with the task.
 */
function renderContactImages(containerId, contacts) {
    for (let contact of contacts) {
        let initials = getInitials(contact.name);
        document.getElementById(containerId).innerHTML += /*html*/`
            <div class="card_img_board"><span style="background-color: ${contact.color}" class="initials_card_img_board">${initials}</span></div>
        `;
    }
}

/**
 * Opens the edit task form for the specified task.
 * 
 * @param {number} taskId - The ID of the task to edit.
 */
function editTask(taskId) {
    let task = currentUser.tasks[taskId];
    if (task) {
        document.getElementById('edit_title').value = task.title;
        document.getElementById('edit_description').value = task.description;
        document.getElementById('edit_date').value = task.date;
        let subtaskContainer = document.getElementById('edit_subtaskContainer');
        subtaskContainer.innerHTML = '';
        renderSubtaskContainer(task, subtaskContainer);
        toggleButtonEdit(task.prio);
        renderAssignedProfiles(task);
        document.getElementById('editTaskSubmit').dataset.taskId = taskId;
        document.getElementById(`task-overlay`).style.display = "none";
        document.getElementById(`edit-form`).style.display = "unset";
    }
}

/**
 * Renders assigned profiles for a task.
 * 
 * @param {object} task - The task object containing assigned profiles.
 */
function renderAssignedProfiles(task) {
    let assignedProfilesContainer = document.getElementById('edit_selected_contacts_add_task');
    assignedProfilesContainer.innerHTML = '';

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
}

/**
 * Renders the subtask container for a task.
 * 
 * @param {object} task - The task object containing subtasks.
 * @param {HTMLElement} subtaskContainer - The container element for subtasks.
 */
function renderSubtaskContainer(task, subtaskContainer) {
    subtaskContainer.innerHTML = '';

    if (task.subtask && task.subtask.length > 0) {
        for (let i = 0; i < task.subtask.length; i++) {
            const subtaskItem = task.subtask[i];
            if (typeof subtaskItem.subtask === 'object') {
                subtaskContainer.innerHTML += `<div>${subtaskItem.subtask.subtask}</div>`;
            } else {
                subtaskContainer.innerHTML += `<div>${subtaskItem.subtask}</div>`;
            }
        }
    }
}

/**
 * Saves the edited task after modifications.
 * 
 * @returns {Promise<void>} - A Promise that resolves after the task is saved.
 */
async function saveEditedTask() {
    let taskId = document.getElementById('editTaskSubmit').dataset.taskId;
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

/**
 * Closes the task edit form.
 */
function closeTaskEditOnBoard(){
    document.getElementById(`edit-form`).style.display = "none";
    document.getElementById(`overlay`).style.display = "none";
    document.getElementById(`content-board`).classList.remove('pointer_events-none');
    document.getElementById(`body`).classList.remove('overflow_hidden');
}

/**
 * Toggles the edit button based on the priority.
 * 
 * @param {string} priority - The priority of the task.
 */
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







  /**
 * Renders a progress bar for a task.
 * 
 * @param {number} taskId - The ID of the task.
 * @param {number} totalSubtasks - The total number of subtasks.
 * @param {number} checkedSubtasks - The number of checked subtasks.
 * @returns {string} - The HTML string for the progress bar.
 */
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

/**
 * Renders contacts for adding tasks, filtered by a search term. It updates two areas:
 * one for "Me" contacts and another for all other contacts. Contacts are filtered
 * to only include those whose names start with the provided search term.
 *
 * @param {string} searchTerm - The term used to filter contacts by name.
 */
function renderContactsAddTask(searchTerm) {
    let contactAreaForAll = document.getElementById('contacts_contact_list_add_task');
    let contactAreaForMe = document.getElementById('me_contact_list_add_task');
  
    contactAreaForAll.innerHTML = '';
    contactAreaForMe.innerHTML = '';
  
    for (let i = 0; i < currentUser.contacts.length; i++) {
      let contact = currentUser.contacts[i];
      let initials = getInitials(contact.name);
  
      if (contact.name.toLowerCase().startsWith(searchTerm.toLowerCase())) {
        let isSelected = selectedContactsAddTask.includes(contact);
        if (contact.me) {
          contactAreaForMe.innerHTML += generateContactsAddTaskHtml(i, contact, initials, isSelected);
        } else {
          contactAreaForAll.innerHTML += generateContactsAddTaskHtml(i, contact, initials, isSelected);
        }
      checkSelectedContactsAddTask(i);
      }
    }
  }
  
  
  /**
   * Generates HTML content for a contact item, including a div with their initials,
   * name, and a checkbox for selection. This HTML content is used in the task addition
   * interface.
   *
   * @param {number} i - The index of the contact in the array, used to assign unique IDs.
   * @param {Object} contact - The contact object containing information like name and color.
   * @param {string} initials - The initials of the contact's name.
   * @returns {string} The HTML string representing the contact item.
   */
  function generateContactsAddTaskHtml(i, contact, initials, isSelected) {
    let checkboxStyle = isSelected ? 'background-color: #2a3647; color: white;' : '';
    let checkboxChecked = isSelected ? 'checked' : '';
    return /*html*/`
      <div class="contact_add_task" id="contact_add_task${i}" onclick="selectContactAddTask(${i})">
          <div class="left_contact_add_task">
              <div class="initials_contact_add_task" style="background-color: ${contact.color}"><span>${initials}</span></div>
              <span>${contact.name}</span>
          </div>
          <input class="checkbox_contact_add_task" type="checkbox" id="checkbox_contact_add_task${i}" onchange="selectContactAddTask(${i})" style="${checkboxStyle}" ${checkboxChecked}>
      </div>
    `;
  }
  
  
  /**
   * Opens the contact list for adding tasks. This function modifies the HTML content of
   * the contact bar to include a search bar and sets the contact list display style to flex,
   * making it visible.
   */
  function openContactListAddTask() {
    let contactBar = document.getElementById('contact_bar_select_contacts_add_task');
    let contactList = document.getElementById('contact_list_add_task');
  
    contactBar.innerHTML = /*html*/`
      <div tabindex="0" class="search_bar_select_contacts_add_task" >
        <input type="text" id="search_bar_contacts_add_task" onkeyup="searchContactsAddTask()">
        <img src="./assets/img/arrow_up_add_task.svg" alt="arrow up symbol" onclick="closeContactListAddTask()">
      </div>
    `;
    contactList.style = 'display: flex';
    hideSelectedContactsAddTask();
    renderSelectedContactsAddTask();
  }
  
  
  /**
   * Closes the contact list used for adding tasks. It resets the HTML content of the contact
   * bar to show a placeholder and sets the contact list display style to none, hiding it.
   * Also, it updates the checkboxes based on whether contacts are selected.
   */
  function closeContactListAddTask() {
    let contactBar = document.getElementById('contact_bar_select_contacts_add_task');
    let contactList = document.getElementById('contact_list_add_task');
  
    contactBar.innerHTML = /*html*/`
      <div class="placeholder_select_contacts_add_task" onclick="openContactListAddTask()">
        <span>Select contacts to assign</span>
        <img src="./assets/img/arrow_down_add_task.svg" alt="arrow down symbol">
      </div>
    `;
    contactList.style = 'display: none';
    renderContactsAddTask('');
    renderSelectedContactsAddTask();
    showSelectedContactsAddTask();
  }
  
  
  let selectedContactsAddTask = [];
  
  
  /**
   * Toggles the selection status of a specific contact for task assignment.
   * If the contact is currently selected (checkbox checked), it deselects it by
   * resetting the background color and unchecking the checkbox, and vice versa.
   * It also updates the internal list of selected contacts accordingly.
   *
   * @param {number} i - Index of the contact in the currentUser.contacts array.
   */
  function selectContactAddTask(i) {
    let contact = document.getElementById(`contact_add_task${i}`);
    let checkbox = document.getElementById(`checkbox_contact_add_task${i}`);
    if (checkbox.checked) {
      contact.style.backgroundColor = 'unset';
      contact.style.color = 'unset';
      checkbox.checked = false;
      removeSelectedContactsAddTask(i);
    } else {
      contact.style.backgroundColor = '#2a3647';
      contact.style.color = 'white';
      checkbox.checked = true;
      addSelectedContactsAddTask(i);
    }
  }
  
  
  /**
   * Checks if a contact is already selected for the task. If so, it updates the UI
   * to reflect the selection status by changing the background color and checking
   * the checkbox.
   *
   * @param {number} i - Index of the contact in the currentUser.contacts array.
   */
  function checkSelectedContactsAddTask(i) {
    let contact = document.getElementById(`contact_add_task${i}`);
    let checkbox = document.getElementById(`checkbox_contact_add_task${i}`);
    let currentContact = currentUser.contacts[i];
    if (selectedContactsAddTask.includes(currentContact)) {
      contact.style.backgroundColor = '#2a3647';
      contact.style.color = 'white';
      checkbox.checked = true;
    }
  }
  
  
  /**
   * Adds a contact to the list of selected contacts for the task. It also
   * triggers the rendering of the selected contacts to reflect the change.
   *
   * @param {number} i - Index of the contact in the currentUser.contacts array.
   */
  function addSelectedContactsAddTask(i) {
    let contact = currentUser.contacts[i];
    selectedContactsAddTask.push(contact);
    renderSelectedContactsAddTask();
  }
  
  
  /**
   * Removes a contact from the list of selected contacts for the task. It updates
   * the internal list and triggers the rendering of the selected contacts to
   * reflect the change.
   *
   * @param {number} i - Index of the contact in the currentUser.contacts array.
   */
  function removeSelectedContactsAddTask(i) {
    let index = selectedContactsAddTask.findIndex(c => c === currentUser.contacts[i]);
    if (index > -1) {
      selectedContactsAddTask.splice(index, 1);
    }
    renderSelectedContactsAddTask();
  }
  
  /**
   * Renders the list of selected contacts for the task in the UI. It generates
   * HTML content for each selected contact showing their initials with a
   * background color.
   */
  function renderSelectedContactsAddTask() {
    let selectedContactsDiv = document.getElementById('selected_contacts_add_task');
    selectedContactsDiv.innerHTML = '';
    selectedContactsAddTask.forEach(contact => {
      let initials = getInitials(contact.name);
      selectedContactsDiv.innerHTML += /*html*/`
        <div class="initials_contact_add_task" style="background-color: ${contact.color}"><span>${initials}</span></div>
      `;
    });
  }
  
  /**
   * Zeigt das Element mit der ID 'selected_contacts_add_task' an.
   */
  function showSelectedContactsAddTask() {
    document.getElementById('selected_contacts_add_task').style = 'display: flex';
  }
  
  /**
   * Versteckt das Element mit der ID 'selected_contacts_add_task'.
   */
  function hideSelectedContactsAddTask() {
    document.getElementById('selected_contacts_add_task').style = 'display: none';
  }
  
  /**
   * Sucht nach Kontakten basierend auf einem Suchbegriff und rendert die Ergebnisse.
   * @param {string} searchTerm - Der Suchbegriff für die Kontaktsuche.
   */
  function searchContactsAddTask() {
    let searchTerm = document.getElementById('search_bar_contacts_add_task').value;
    renderContactsAddTask(searchTerm);
  }
  
  /**
   * Setzt das Formular für die Auswahl von Kontakten zurück.
   */
  function resetContactAddTask() {
    let contacts = document.querySelectorAll('.contact_add_task');
    contacts.forEach(contact => {
        contact.style.backgroundColor = 'unset';
        contact.style.color = 'unset';
        selectedContactsAddTask = [];
        let checkbox = contact.querySelector('.checkbox_contact_add_task');
        if (checkbox) {
            checkbox.checked = false;
        }
    });
    closeContactListAddTask();
  }







  
  /**
 * Redirects to the add task page if the screen width is less than or equal to 900 pixels.
 */
  function changeAddTask(){
    if (window.innerWidth <= 900) {
        redirect('add_task');
    }
  }

  /**
 * Moves a task down to the next column.
 * 
 * @param {number} taskId - The ID of the task to move.
 */
  function moveTaskDown(taskId) {
    let task = currentUser.tasks[taskId];
    if (task.column === 'column_board') {
        task.column = 'column_board2';
    } else if (task.column === 'column_board2') {
        task.column = 'column_board3';
    } else if (task.column === 'column_board3') {
        task.column = 'column_board4';
    }
    renderTask();
}

/**
 * Moves a task up to the previous column.
 * 
 * @param {number} taskId - The ID of the task to move.
 */
function moveTaskUp(taskId) {
    let task = currentUser.tasks[taskId];
    if (task.column === 'column_board2') {
        task.column = 'column_board';
    } else if (task.column === 'column_board3') {
        task.column = 'column_board2';
    } else if (task.column === 'column_board4') {
        task.column = 'column_board3';
    }
    renderTask();
}


  
  

  



