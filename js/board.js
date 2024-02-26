/**
 * Initializes the board and performs various rendering and event listener instructions.
 * @returns {Promise<void>} A promise that resolves after initialization is completed.
 */
async function initBoard() {
    await init();
    renderTask();
    renderContactsAddTask('');
    renderContactsAddTaskEdit('');
    document.getElementById('acceptTaskForm').addEventListener('click', acceptTaskForm);
    document.getElementById('cancelSubtaskForm').addEventListener('click', cancelSubtaskForm);
    document.getElementById('edit_acceptTask').addEventListener('click', acceptTaskEdit);
    document.getElementById('edit_cancelSubtask').addEventListener('click', cancelSubtaskEdit); 
}

let targetColumnId;
let taskIdCounter;
let currentDraggedElement;


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
    // let category = document.getElementById('category_task');
    taskIdCounter = currentUser.taskId;
    if (taskIdCounter == undefined) {
        taskIdCounter = 0;
    }
    let task = createTaskObject(title.value, description.value, date.value, selectionCategory, subtaskValues, targetColumnId, taskIdCounter, selectedContactsAddTask, selectedPriority);
    currentUser.tasks.push(task);
    taskIdCounter++;
    currentUser.taskId = taskIdCounter;
    clearInputFields([title, description, date]);
    // category.selectedIndex = 0;
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
    removeHighlight(category);
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
 * Removes the highlight from a draggable area when an element is dropped onto it.
 * 
 * @param {Event} ev - The event object.
 */
function drop(ev) {
    let targetId = ev.target.id;
    removeHighlight(targetId);
    // Weitere Aktionen nach dem Ablegen des Elements...
}


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

            document.getElementById(columnId).innerHTML += generateSearchTaskHtml(taskId, backgroundColor, taskNumber, cardImgBoxId);

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