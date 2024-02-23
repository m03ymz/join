/**
 * Validates the subtask input's length and toggles the visibility of various task-related icons.
 * If the input length is less than 3 characters, it alerts the user to input at least 3 characters.
 * Otherwise, it changes the display state of specific icons to reflect the acceptance of the task.
 * @returns {boolean} False if the input validation fails, to stop the function execution.
 */
function acceptTaskForm() {
    let subtaskInput = document.getElementById("subtaskInputForm").value;
    let cancelIcon = document.getElementById('cancelSubtaskForm');
    let partingline = document.getElementById('smallLineSubtaskForm');  
    let acceptTask = document.getElementById('acceptTaskForm');
    let inputFieldIcon = document.getElementById('addingSubtaskForm');
  
  if (subtaskInput.length < 3) {
    alert("Bitte geben Sie mindestens 3 Zeichen ein.");
    return false; // Stops function execution if validation fails
  } else {
    // Toggle display states for task-related icons
    inputFieldIcon.style.display = 'block';
    cancelIcon.style.display = 'block';
    partingline.style.display ='block';
    acceptTask.style.display = 'none';
  }
  }
  
  
  /**
   * Hides the subtask input field and related elements.
   */
  function cancelSubtaskForm() {
    let cancelIcon = document.getElementById('cancelSubtaskForm');
    let partingline = document.getElementById('smallLineSubtaskForm');  
    let acceptTask = document.getElementById('acceptTaskForm');
    let inputFieldIcon = document.getElementById('addingSubtaskForm');
    let subtaskInput = document.getElementById('subtaskInputForm');
    inputFieldIcon.style.display = 'none';
    cancelIcon.style.display = 'none';
    partingline.style.display ='none';
    acceptTask.style.display = 'block'; 
    subtaskInput.value = '';
  }
  
  
  /**
   * Adds a subtask to the list of subtasks based on the user's input.
   * - Retrieves the input value from the subtask input field.
   * - If the input is not empty, adds the subtask to the `subtaskValues` array and resets the input field.
   * - Renders the updated list of subtasks.
   */
  function addSubtaskForm() {
    let cancelIcon = document.getElementById('cancelSubtaskForm');
    let partingline = document.getElementById('smallLineSubtaskForm');  
    let acceptTask = document.getElementById('acceptTaskForm');
    let inputFieldIcon = document.getElementById('addingSubtaskForm');
    let subtaskInput = document.getElementById('subtaskInputForm');
    let inputValue = subtaskInput.value;
    if (inputValue) {
      subtaskValues.push({ subtask: inputValue, checked: false });
      renderSubtasksForm();
      inputFieldIcon.style.display = 'none';
      cancelIcon.style.display = 'none';
      partingline.style.display ='none';
      acceptTask.style.display = 'block'; 
      subtaskInput.value = '';
    }
  }
  
  /**
   * Renders the list of subtasks in the specified container.
   * - Clears the current content of the subtask container to avoid duplicates.
   * - Iterates over the `subtaskValues` array to create and display each subtask.
   * Each subtask is displayed with a set of icons for editing, deleting, and updating the subtask.
   */
  function renderSubtasksForm() {
    let subtaskContainer = document.getElementById('subtaskContainerForm');
    subtaskContainer.innerHTML = '';
    for (let i = 0; i < subtaskValues.length; i++) {
      let subtask = subtaskValues[i].subtask;
      subtaskContainer.innerHTML += /*html*/`
        <div class="container_hover_subtasks_icons">
            <li class="input_value_style hover_li" contenteditable="false" id="subtaskContent-${i}">${subtask}
              <div class="container_subtasks_hover_icons"> 
                <img class="container_subtasks_icons_edit" src="assets/img/edit_icon.svg" onclick="editListItem(${i})">
                <img src="assets/img/accept_subtask.svg" style="display:none; margin-right: 8px;"  onclick="updateListItem('${i}')" class="container_subtasks_icons_accept">
                <img class="hide_icon" id="smallLineSubtaskForm" src="assets/img/small_line_subtask.svg" alt="" style="display: block;">
                <img class="container_subtasks_icons_delete" src="assets/img/delete.svg" onclick="deleteListItemForm(${i})">
              </div>
          </li>
          <div>
  <!-- important div dont delete! * Placeholder between Edit Content -->
          </div>
        </div>`;
    }
  }
  
  
  function deleteListItemForm(i) {
    // Entferne das Element aus dem subtaskValues Array basierend auf der ID
    subtaskValues.splice(i, 1);
    // Rendere die Subtasks neu, um die Liste zu aktualisieren
    renderSubtasksForm();
  }
  
  
  /**
   * Clears the subtask values array.
   * @function clearSubtaskValues
   */
  function clearSubtaskValues() {
    subtaskValues = [];
    renderSubtasksForm();
    renderSubtasksEdit();
  }