/**
 * Initializes the summary module by calling necessary functions asynchronously.
 */
async function initSummary() {
    await init();
    renderNameSummary();
    setGreetSummary();
    renderAllTaskInfosSummary();
}


/**
 * Renders the name of the current user on the summary page.
 */
function renderNameSummary() {
    let name = document.getElementById('name_summary');
    name.innerHTML = currentUser.name;
}


/**
 * Changes the icon image source on mouseover.
 * 
 * @param {string} id - The ID of the icon element.
 */
function changeIconOnMouseOverSummary(id) {
    let icon = document.getElementById(id);
    icon.src = `./assets/img/hover_${id}.svg`;
}


/**
 * Changes the icon image source on mouseout.
 * 
 * @param {string} id - The ID of the icon element.
 */
function changeIconOnMouseOutSummary(id) {
    let icon = document.getElementById(id);
    icon.src = `./assets/img/${id}.svg`;
}


/**
 * Changes the color of the text element.
 * 
 * @param {string} id - The ID of the text element.
 * @param {string} color - The color to set.
 */
function changeTextSummary(id, color) {
    let text = document.getElementById(id);
    text.style = `color: ${color}`;
}


/**
 * Sets a greeting message based on the time of the day.
 */
function setGreetSummary() {
    let hour = new Date().getHours();
    let greeting;
    if (hour >= 6 && hour < 12) {
        greeting = 'Good morning';
    } else if (hour >= 12 && hour < 18) {
        greeting = 'Good afternoon';
    } else if (hour >= 18 && hour < 24) {
        greeting = 'Good evening';
    } else if (hour >= 0 && hour < 6) {
        greeting = 'Good night';
    } else {
        greeting = 'Hello'; 
    }
    document.getElementById('greet_summary').innerHTML = greeting;
}


/**
 * Renders various task information on the summary page.
 */
function renderAllTaskInfosSummary() {
    let tasksToDo = currentUser.tasks.filter(task => task.column == 'column_board');
    let tasksInProgress = currentUser.tasks.filter(task => task.column == 'column_board2');
    let tasksAwaiting = currentUser.tasks.filter(task => task.column == 'column_board3');
    let tasksDone = currentUser.tasks.filter(task => task.column == 'column_board4');
    let urgentTasks = currentUser.tasks.filter(task => task.prio === 'Urgent');
    let earliestUrgentDate = calcEarliestUrgentTaskDate(urgentTasks);
    document.getElementById('to_do_tasks_summary').innerHTML = tasksToDo.length;
    document.getElementById('done_tasks_summary').innerHTML = tasksDone.length;
    document.getElementById('urgent_tasks_summary').innerHTML = urgentTasks.length;
    document.getElementById('date_summary').innerHTML = earliestUrgentDate ? formatDate(earliestUrgentDate) : "no date set";
    document.getElementById('all_tasks_summary').innerHTML = currentUser.tasks.length;
    document.getElementById('in_progress_tasks_summary').innerHTML = tasksInProgress.length;
    document.getElementById('awaiting_tasks_summary').innerHTML = tasksAwaiting.length;
}


/**
 * Calculates the earliest urgent task date from the given list of urgent tasks.
 * 
 * @param {Object[]} urgentTasks - An array of urgent task objects.
 */
function calcEarliestUrgentTaskDate(urgentTasks) {
    let earliestUrgentDate = null;
    let urgentTasksWithDate = urgentTasks.filter(task => task.date.trim() !== ""); 
    if (urgentTasksWithDate.length > 0) {
        if (urgentTasksWithDate.length === 1) {
            earliestUrgentDate = new Date(urgentTasksWithDate[0].date);
        } else {
            urgentTasksWithDate.sort((a, b) => new Date(a.date) - new Date(b.date));
            earliestUrgentDate = new Date(urgentTasksWithDate[0].date);
        }
    }
    return earliestUrgentDate;
}


/**
 * Formats a date object to a human-readable string.
 * 
 * @param {Date} date - The date object to format.
 */
function formatDate(date) {
    let options = { month: 'long', day: 'numeric', year: 'numeric' };
    return date.toLocaleDateString('en-US', options);
}