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
                    <div class="subtask_box_taskoverlay">
                    ${subtasksHTML}
                    </div> 
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
 * Generiert HTML für eine Suchaufgabe.
 * @param {number} taskId - Die ID der Aufgabe.
 * @param {string} backgroundColor - Die Hintergrundfarbe des Kartenfelds.
 * @param {object} taskNumber - Informationen zur Aufgabe (z.B. Kategorie, Titel, Beschreibung).
 * @param {string} cardImgBoxId - Die ID des Bildfelds der Karte.
 */
function generateSearchTaskHtml(taskId, backgroundColor, taskNumber, cardImgBoxId) {
    return `
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
}