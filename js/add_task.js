/**
 * A global variable to store subtask values.
 * @type {Array<{subtask: string, checked: boolean}>}
 */
let subtaskValues = [];


/**
 * Initializes the task addition process by setting up necessary components
 * and event listeners.
 * - Initializes additional required components by calling `init`.
 * - Renders contacts for the task addition interface.
 * - Sets up a key press listener for the Enter key.
 * Corrects by removing recursive event listeners in `acceptTask` and `cancelSubtask`.
 */
async function initAddTask() {
  await init();
  renderContactsAddTask('');
  keyPressEnter();

  document.getElementById('acceptTask').addEventListener('click', acceptTask);
  document.getElementById('cancelSubtask').addEventListener('click', cancelSubtask);
}


/**
 * Adds a subtask to the list of subtasks based on the user's input.
 * - Retrieves the input value from the subtask input field.
 * - If the input is not empty, adds the subtask to the `subtaskValues` array and resets the input field.
 * - Renders the updated list of subtasks.
 */
function addSubtask() {
  let cancelIcon = document.getElementById('cancelSubtask');
  let partingline = document.getElementById('smallLineSubtask');  
  let acceptTask = document.getElementById('acceptTask');
  let inputFieldIcon = document.getElementById('addingSubtask');
  let subtaskInput = document.getElementById('subtaskInput');
  let inputValue = subtaskInput.value;
  if (inputValue) {
    subtaskValues.push({ subtask: inputValue, checked: false });
    renderSubtasks();
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
function renderSubtasks() {
  let subtaskContainer = document.getElementById('subtaskContainer');
  subtaskContainer.innerHTML = '';
  for (let i = 0; i < subtaskValues.length; i++) {
    let subtask = subtaskValues[i].subtask;
    subtaskContainer.innerHTML += /*html*/`
      <div class="container_hover_subtasks_icons">
          <li class="input_value_style hover_li" contenteditable="false" id="subtaskContent-${i}">${subtask}
            <div class="container_subtasks_hover_icons"> 
              <img class="container_subtasks_icons_edit" src="assets/img/edit_icon.svg" onclick="editListItem(${i})">
              <img src="assets/img/accept_subtask.svg" style="display:none; margin-right: 8px;"  onclick="updateListItem('${i}')" class="container_subtasks_icons_accept">
              <img class="hide_icon" id="smallLineSubtask" src="assets/img/small_line_subtask.svg" alt="" style="display: block;">
              <img class="container_subtasks_icons_delete" src="assets/img/delete.svg" onclick="deleteListItem(${i})">
            </div>
        </li>
        <div>
<!-- important div dont delete! * Placeholder between Edit Content -->
        </div>
      </div>`;
  }
}


/**
 * Makes a list item editable for editing.
 * @param {number} index - The index of the list item to edit.
 */
function editListItem(index) {
  let editableElement = document.getElementById(`subtaskContent-${index}`);
  let editIcon = document.querySelector(`.container_subtasks_icons_edit[onclick="editListItem(${index})"]`);
  let acceptIcon = document.querySelector(`.container_subtasks_icons_accept[onclick="updateListItem('${index}')"]`);

  if (editableElement) {
    editableElement.setAttribute('contenteditable', 'true');
    editableElement.focus();
    if (editIcon) {
      editIcon.style.display = 'none';
    }
    if (acceptIcon) {
      acceptIcon.style.display = 'block';
    }
  } else {
  }
}


/**
 * Updates the content of a list item and makes it non-editable.
 * @param {number} index - The index of the list item to update.
 */
function updateListItem(index) {
  let subtaskContentElement = document.getElementById(`subtaskContent-${index}`);
  let subtaskContent = subtaskContentElement.innerText;
  subtaskContentElement.setAttribute('contenteditable', 'false');

  let editIcon = document.querySelector(`.container_subtasks_icons_edit[onclick="editListItem(${index})"]`);
  let acceptIcon = document.querySelector(`.container_subtasks_icons_accept[onclick="updateListItem('${index}')"]`);
  if (editIcon) {
    editIcon.style.display = 'block';
  }
  if (acceptIcon) {
    acceptIcon.style.display = 'none';
  }
}


/**
 * Hides the subtask input field and related elements.
 */
function cancelSubtask() {
  let cancelIcon = document.getElementById('cancelSubtask');
  let partingline = document.getElementById('smallLineSubtask');  
  let acceptTask = document.getElementById('acceptTask');
  let inputFieldIcon = document.getElementById('addingSubtask');
  let subtaskInput = document.getElementById('subtaskInput');
  inputFieldIcon.style.display = 'none';
  cancelIcon.style.display = 'none';
  partingline.style.display ='none';
  acceptTask.style.display = 'block'; 
  subtaskInput.value = '';
}


/**
 * Sets up an event listener on the subtask input field to add a subtask when the Enter key is pressed.
 * This enhances user experience by allowing quick addition of subtasks.
 */
function keyPressEnter() { 
  document.getElementById('subtaskInput').addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        addSubtask();
    }
  });
}


/**
 * Validates the subtask input's length and toggles the visibility of various task-related icons.
 * If the input length is less than 3 characters, it alerts the user to input at least 3 characters.
 * Otherwise, it changes the display state of specific icons to reflect the acceptance of the task.
 * @returns {boolean} False if the input validation fails, to stop the function execution.
 */
function acceptTask() {
    let subtaskInput = document.getElementById("subtaskInput").value;
    let cancelIcon = document.getElementById('cancelSubtask');
    let partingline = document.getElementById('smallLineSubtask');  
    let acceptTask = document.getElementById('acceptTask');
    let inputFieldIcon = document.getElementById('addingSubtask');

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
 * Removes the closest subtask container to the element that triggered the delete action.
 * @param {HTMLElement} element The element that triggered the delete action.
 */
function deleteListItem(i) {
  // Entferne das Element aus dem subtaskValues Array basierend auf der ID
  subtaskValues.splice(i, 1);
  // Rendere die Subtasks neu, um die Liste zu aktualisieren
  renderSubtasks();
}


let selectedPriority;


/**
 * Toggles the visibility of priority buttons based on the selected priority.
 * Updates the `selectedPriority` variable to reflect the current priority.
 * @param {string} priority The selected priority, which can be 'urgent', 'medium', or 'low'.
 */
function toggleButton(priority) {
  // Button elements for each priority level
  let urgentButtonWhite = document.getElementById('urgentbuttonwhite');
  let urgentButtonRed = document.getElementById('urgentbuttonred');
  let mediumButtonOrange = document.getElementById('mediumbuttonorange');
  let mediumButtonWhite = document.getElementById('mediumbuttonwhite');
  let lowButtonWhite = document.getElementById('lowbuttonwhite');
  let lowButtonGreen = document.getElementById('lowbuttongreen');
  // Toggle visibility based on the selected priority
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


function showSelectedContactsAddTask() {
  document.getElementById('selected_contacts_add_task').style = 'display: flex';
}


function hideSelectedContactsAddTask() {
  document.getElementById('selected_contacts_add_task').style = 'display: none';
}


function searchContactsAddTask() {
  let searchTerm = document.getElementById('search_bar_contacts_add_task').value;
  renderContactsAddTask(searchTerm);
}


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
 * Clears all input and textarea fields within the document. This function
 * iterates over all input and textarea elements, setting their value to an
 * empty string. After clearing, it sets focus to the first input element
 * to improve user experience.
 */
function clearAllInputs() {
  document.querySelectorAll('input, textarea').forEach(field => field.value = '');
  const firstInput = document.querySelector('input');
  if (firstInput) {
    firstInput.focus();
  }
}


// Initialize the deactivation of past days for date inputs.
(function deactivatePastDays() {
  const currentDate = new Date();
  const formattedDate = currentDate.toISOString().split('T')[0];
  document.getElementById('date').min = formattedDate;
})();


/**
 * Submits the form for adding a task. It awaits the creation of a task array
 * and then redirects the user to the board. This function is asynchronous to
 * handle operations that may require waiting for completion.
 */
async function submitFormAddTask() {
  await createTaskArray(targetColumnId);
  redirect('board');
}


/**
 * Toggles the visibility of the subtask list and rotates an arrow image to indicate the current state.
 * 
 * This function checks the current display state of the element with the ID 'categorySubtasks'. 
 * If the element is not visible (display: none or the display property is not set), it sets the display 
 * property to 'block' to make it visible, and rotates the arrow image by 180 degrees to indicate the list is expanded.
 * If the element is visible, it hides the element by setting its display property to 'none' and resets the arrow image
 * to its original orientation, indicating the list is collapsed.
 */
function toggleCategory(event) {
  event.stopPropagation(); // Verhindert das Auslösen des Event-Bubblings
  let element = document.getElementById('categorySubtasks');
  let image = document.querySelector('.arrowImage');

  if (element.style.display === 'none' || element.style.display === '') {
    element.style.display = 'block';
    image.style.transform = 'rotate(180deg)';
  } else {
    element.style.display = 'none';
    image.style.transform = '';
  }
}


var selectionCategory; /* We use Var only for this function because of a reference Error and TDZ (temporal dead Zone)*/


function returnSelectedCategory(i){
  selectionCategory = i;
  document.getElementById('category_task').innerHTML = i;
  let element = document.getElementById('categorySubtasks');
  element.style.display = 'none';
  let image = document.querySelector('.arrowImage');
  image.style.transform = '';
}