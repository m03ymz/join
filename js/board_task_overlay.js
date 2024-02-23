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
        toggleButtonEdit(task.prio);
        selectedContactsAddTask = [];
        selectedContactsAddTask.push(...task.contacts);
        renderContactsAddTaskEdit('');
        renderSelectedContactsAddTaskEdit();
        subtaskValues = [];
        subtaskValues.push(...task.subtask);
        renderSubtasksEdit();
        document.getElementById('editTaskSubmit').dataset.taskId = taskId;
        document.getElementById(`task-overlay`).style.display = "none";
        document.getElementById(`edit-form`).style.display = "unset";
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
        currentUser.tasks[taskIndex].contacts = selectedContactsAddTask;
        let subtaskContainer = document.getElementById('edit_subtaskContainer');
        let subtaskElements = subtaskContainer.querySelectorAll('.input_value_style');
        let updatedSubtasks = Array.from(subtaskElements).map(element => ({
            subtask: element.innerText.trim(),
            checked: false
        }));
        currentUser.tasks[taskIndex].subtask = updatedSubtasks;

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
    selectedContactsAddTask = [];
}