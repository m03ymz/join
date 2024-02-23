/**
 * Renders contacts for adding tasks, filtered by a search term. It updates two areas:
 * one for "Me" contacts and another for all other contacts. Contacts are filtered
 * to only include those whose names start with the provided search term.
 *
 * @param {string} searchTerm - The term used to filter contacts by name.
 */
function renderContactsAddTaskEdit(searchTerm) {
    let contactAreaForAll = document.getElementById('edit_contacts_contact_list_add_task');
    let contactAreaForMe = document.getElementById('edit_me_contact_list_add_task');
    contactAreaForAll.innerHTML = '';
    contactAreaForMe.innerHTML = '';
    for (let i = 0; i < currentUser.contacts.length; i++) {
        let contact = currentUser.contacts[i];
        let initials = getInitials(contact.name);
        if (contact.name.toLowerCase().startsWith(searchTerm.toLowerCase())) {
            let isSelected = selectedContactsAddTask.some(item => {
                return item.email === contact.email
            });
            if (contact.me) {
                contactAreaForMe.innerHTML += generateContactsAddTaskHtmlEdit(i, contact, initials, isSelected);
            } else {
                contactAreaForAll.innerHTML += generateContactsAddTaskHtmlEdit(i, contact, initials, isSelected);
            }
            checkSelectedContactsAddTaskEdit(i);
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
function generateContactsAddTaskHtmlEdit(i, contact, initials, isSelected) {
    let checkboxStyle = isSelected ? 'background-color: #2a3647; color: white;' : '';
    let checkboxChecked = isSelected ? 'checked' : '';
    return /*html*/`
      <div class="contact_add_task" id="edit_contact_add_task${i}" onclick="selectContactAddTaskEdit(${i})">
          <div class="left_contact_add_task">
              <div class="initials_contact_add_task" style="background-color: ${contact.color}"><span>${initials}</span></div>
              <span>${contact.name}</span>
          </div>
          <input class="checkbox_contact_add_task" type="checkbox" id="edit_checkbox_contact_add_task${i}" onchange="selectContactAddTaskEdit(${i})" style="${checkboxStyle}" ${checkboxChecked}>
      </div>
    `;
}
  
/**
 * Opens the contact list for adding tasks. This function modifies the HTML content of
 * the contact bar to include a search bar and sets the contact list display style to flex,
 * making it visible.
 */
function openContactListAddTaskEdit() {
    let contactBar = document.getElementById('edit_contact_bar_select_contacts_add_task');
    let contactList = document.getElementById('edit_contact_list_add_task');
  
    contactBar.innerHTML = /*html*/`
      <div tabindex="0" class="search_bar_select_contacts_add_task" >
        <input type="text" id="edit_search_bar_contacts_add_task" onkeyup="searchContactsAddTaskEdit()">
        <img src="./assets/img/arrow_up_add_task.svg" alt="arrow up symbol" onclick="closeContactListAddTaskEdit()">
      </div>
    `;
    contactList.style = 'display: flex';
    hideSelectedContactsAddTaskEdit();
    renderSelectedContactsAddTaskEdit();
}
  
/**
 * Closes the contact list used for adding tasks. It resets the HTML content of the contact
 * bar to show a placeholder and sets the contact list display style to none, hiding it.
 * Also, it updates the checkboxes based on whether contacts are selected.
 */
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
}

/**
 * Toggles the selection status of a specific contact for task assignment.
 * If the contact is currently selected (checkbox checked), it deselects it by
 * resetting the background color and unchecking the checkbox, and vice versa.
 * It also updates the internal list of selected contacts accordingly.
 *
 * @param {number} i - Index of the contact in the currentUser.contacts array.
 */
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
  
/**
 * Checks if a contact is already selected for the task. If so, it updates the UI
 * to reflect the selection status by changing the background color and checking
 * the checkbox.
 *
 * @param {number} i - Index of the contact in the currentUser.contacts array.
 */
function checkSelectedContactsAddTaskEdit(i) {
    let contact = document.getElementById(`edit_contact_add_task${i}`);
    let checkbox = document.getElementById(`edit_checkbox_contact_add_task${i}`);
    let currentContact = currentUser.contacts[i];
    if (selectedContactsAddTask.some(item => item.email === currentContact.email)) {
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
function addSelectedContactsAddTaskEdit(i) {
    let contact = currentUser.contacts[i];
    selectedContactsAddTask.push(contact);
    renderSelectedContactsAddTaskEdit();
}
  
/**
 * Removes a contact from the list of selected contacts for the task. It updates
 * the internal list and triggers the rendering of the selected contacts to
 * reflect the change.
 *
 * @param {number} i - Index of the contact in the currentUser.contacts array.
 */
function removeSelectedContactsAddTaskEdit(i) {
    let index = selectedContactsAddTask.findIndex(c => c.email === currentUser.contacts[i].email);
    if (index > -1) {
        selectedContactsAddTask.splice(index, 1);
    }
    renderSelectedContactsAddTaskEdit();
}
  
/**
 * Renders the list of selected contacts for the task in the UI. It generates
 * HTML content for each selected contact showing their initials with a
 * background color.
 */
function renderSelectedContactsAddTaskEdit() {
    let selectedContactsDiv = document.getElementById('edit_selected_contacts_add_task');
    selectedContactsDiv.innerHTML = '';
    selectedContactsAddTask.forEach(contact => {
        let initials = getInitials(contact.name);
        selectedContactsDiv.innerHTML += /*html*/`
            <div class="initials_contact_add_task" style="background-color: ${contact.color}"><span>${initials}</span></div>
        `;
    });
}

/**
 * Displays the element with ID 'edit_selected_contacts_add_task'.
 */
function showSelectedContactsAddTaskEdit() {
    document.getElementById('edit_selected_contacts_add_task').style = 'display: flex';
}
  
/**
 * Hides the element with ID 'edit_selected_contacts_add_task'.
 */
function hideSelectedContactsAddTaskEdit() {
    document.getElementById('edit_selected_contacts_add_task').style = 'display: none';
}
  
/**
 * Searches for contacts based on a search term and renders the results.
 * @param {string} searchTerm - The search term for contact search.
 */
function searchContactsAddTaskEdit() {
    let searchTerm = document.getElementById('edit_search_bar_contacts_add_task').value;
    renderContactsAddTaskEdit(searchTerm);
}
  
/**
 * Resets the form for selecting contacts.
 */
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

function toggleCategoryForm(event) {
    event.stopPropagation(); // Verhindert das Auslösen des Event-Bubblings
    let element = document.getElementById('categorySubtasksForm');
    let image = document.querySelector('.arrowImage');
  
    if (element.style.display === 'none' || element.style.display === '') {
      element.style.display = 'block';
      image.style.transform = 'rotate(180deg)';
    } else {
      element.style.display = 'none';
      image.style.transform = '';
    }
  }
  
function returnSelectedCategoryForm(i){
    selectionCategory = i;
    document.getElementById('category_taskForm').innerHTML = i;
    let element = document.getElementById('categorySubtasksForm');
    element.style.display = 'none';
    let image = document.querySelector('.arrowImage');
    image.style.transform = '';
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
 * Adds a subtask to the list of subtasks based on the user's input.
 * - Retrieves the input value from the subtask input field.
 * - If the input is not empty, adds the subtask to the `subtaskValues` array and resets the input field.
 * - Renders the updated list of subtasks.
 */
function addSubtaskEdit() {
    let subtaskInput = document.getElementById('edit_subtaskInput');
    let inputValue = subtaskInput.value;
    if (inputValue) {
      subtaskValues.push({ subtask: inputValue, checked: false });
      subtaskInput.value = '';
      renderSubtasksEdit(); 
    }
  }
  
  /**
   * Renders the list of subtasks in the specified container.
   * - Clears the current content of the subtask container to avoid duplicates.
   * - Iterates over the `subtaskValues` array to create and display each subtask.
   * Each subtask is displayed with a set of icons for editing, deleting, and updating the subtask.
   */
  function renderSubtasksEdit() {
    let subtaskContainer = document.getElementById('edit_subtaskContainer');
    subtaskContainer.innerHTML = '';
    for (let i = 0; i < subtaskValues.length; i++) {
      let subtask = subtaskValues[i].subtask;
      subtaskContainer.innerHTML += /*html*/`
        <div class="container_hover_subtasks_icons">
            <li class="input_value_style hover_li" contenteditable="false" id="edit_subtaskContent-${i}">${subtask}
              <div class="container_subtasks_hover_icons"> 
                <img class="container_subtasks_icons_edit" src="assets/img/edit_icon.svg" onclick="editListItemEdit(${i})">
                <img src="assets/img/accept_subtask.svg" style="display:none; margin-right: 8px;"  onclick="updateListItemEdit('${i}')" class="container_subtasks_icons_accept">
                <img class="hide_icon" id="edit_smallLineSubtask" src="assets/img/small_line_subtask.svg" alt="" style="display: block;">
                <img class="container_subtasks_icons_delete" src="assets/img/delete.svg" onclick="deleteListItemEdit(${i})">
              </div>
          </li>
          <div>
  <!-- important div dont delete! * Placeholder between Edit Content -->
          </div>
        </div>`;
    }
  }
  
  function editListItemEdit(index) {
    let editableElement = document.getElementById(`edit_subtaskContent-${index}`);
    let editIcon = document.querySelector(`.container_subtasks_icons_edit[onclick="editListItemEdit(${index})"]`);
    let acceptIcon = document.querySelector(`.container_subtasks_icons_accept[onclick="updateListItemEdit('${index}')"]`);
  
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
  
  function updateListItemEdit(index) {
    let subtaskContentElement = document.getElementById(`edit_subtaskContent-${index}`);
    let subtaskContent = subtaskContentElement.innerText;
    subtaskContentElement.setAttribute('contenteditable', 'false');
  
    let editIcon = document.querySelector(`.container_subtasks_icons_edit[onclick="editListItemEdit(${index})"]`);
    let acceptIcon = document.querySelector(`.container_subtasks_icons_accept[onclick="updateListItemEdit('${index}')"]`);
    if (editIcon) {
      editIcon.style.display = 'block';
    }
    if (acceptIcon) {
      acceptIcon.style.display = 'none';
    }
  }
  
  function cancelSubtaskEdit() {
    let subtaskInput = document.getElementById('edit_subtaskInput');
    
    subtaskInput.value = '';
    toggleSubtasksButtonsEdit(); // Stellt die Sichtbarkeit der Buttons nach dem Löschen wieder her
  }
  
  /**
   * Sets up an event listener on the subtask input field to add a subtask when the Enter key is pressed.
   * This enhances user experience by allowing quick addition of subtasks.
   */
  function keyPressEnterEdit() { 
    document.getElementById('edit_subtaskInput').addEventListener('keypress', function(event) {
      if (event.key === 'Enter') {
          addSubtaskEdit();
      }
    });
  }
  
  /**
   * Validates the subtask input's length and toggles the visibility of various task-related icons.
   * If the input length is less than 3 characters, it alerts the user to input at least 3 characters.
   * Otherwise, it changes the display state of specific icons to reflect the acceptance of the task.
   * @returns {boolean} False if the input validation fails, to stop the function execution.
   */
  function acceptTaskEdit() {
      let subtaskInput = document.getElementById("edit_subtaskInput").value;
      let cancelIcon = document.getElementById('edit_cancelSubtask');
      let partingline = document.getElementById('edit_smallLineSubtask');  
      let acceptTask = document.getElementById('edit_acceptTask');
      let inputFieldIcon = document.getElementById('edit_addingSubtask');
  
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
function deleteListItemEdit(i) {
    // Entferne das Element aus dem subtaskValues Array basierend auf der ID
    subtaskValues.splice(i, 1);
    // Rendere die Subtasks neu, um die Liste zu aktualisieren
    renderSubtasks();
  }

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