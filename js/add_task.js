let subtaskValues = []; // Global definierte Variable für Subtask-Werte

async function initAddTask() {
  await init();
  renderContactsAddTask('');
  keyPressEnter();

  // Korrektur: Entfernung der rekursiven Event Listener in acceptTask und cancelSubtask
  document.getElementById('acceptTask').addEventListener('click', acceptTask);
  document.getElementById('cancelSubtask').addEventListener('click', cancelSubtask);
}

// function toggleSubtaskButtons() {
//   let toggleIconAdd = document.getElementById('addingSubtask');
//   let toggleIconAccept = document.getElementById('acceptTask');
//   let toggleIconCancel = document.getElementById('cancelSubtask');

//   toggleIconAdd.style.display = 'none';
//   toggleIconCancel.style.display = 'none';
//   toggleIconAccept.style.display = 'block';
// } 

function addSubtask() {
  let subtaskInput = document.getElementById('subtaskInput');
  let inputValue = subtaskInput.value;
  if (inputValue) {
      subtaskValues.push({ subtask: inputValue, checked: false });
      subtaskInput.value = '';
      renderSubtasks(); 
  }
}

function renderSubtasks() {
  let subtaskContainer = document.getElementById('subtaskContainer');
  subtaskContainer.innerHTML = ''; // Löscht den aktuellen Inhalt, um Duplikate zu vermeiden
  for (let i = 0; i < subtaskValues.length; i++) {
    let subtask = subtaskValues[i].subtask;
    
    subtaskContainer.innerHTML += /*html*/ `
    <div class="container_hover_subtasks_icons show_on_hover">
     <div class="hover_li">
       <li class="input_value_style">${subtask}</li> <!-- Korrektur: Verwendung von subtask statt inputValue -->
      <div class="container_subtasks_hover_icons"> 
      <img class="container_subtasks_icons_edit" src="assets/img/edit_icon.svg" onclick="editListItem()">
      <img class="container_subtasks_icons" src="assets/img/small_line_subtask.svg">
      <img class="container_subtasks_icons_delete" src="assets/img/delete.svg" onclick="deleteListItem(this)">
      <img class="hide_icon" src="assets/img/accept_subtask.svg" onclick="updateListItem()">
      </div>
     </div>
    </div>`;
  }
}

function cancelSubtask() {
  let subtaskInput = document.getElementById('subtaskInput');
  
  subtaskInput.value = '';
  toggleSubtaskButtons(); // Stellt die Sichtbarkeit der Buttons nach dem Löschen wieder her
}

function keyPressEnter() { 
  document.getElementById('subtaskInput').addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        addSubtask();
    }
  });
}

// Korrigierte Funktion Subtask haken (akzeptieren)
function acceptTask() {
    let subtaskInput = document.getElementById("subtaskInput").value;
    let cancelIcon = document.getElementById('cancelSubtask')
    let partingline = document.getElementById('smallLineSubtask')  
    let acceptTask = document.getElementById('acceptTask')
    let inputFieldIcon = document.getElementById('addingSubtask');

  if (subtaskInput.length < 3) {
    alert("Bitte geben Sie mindestens 3 Zeichen ein.");
    return false; // Unterbricht die Ausführung der Funktion
  } else {
    
    inputFieldIcon.style.display = 'block';
    cancelIcon.style.display = 'block';
    partingline.style.display ='block';
    acceptTask.style.display = 'none';
  }
}

function cancelSubtask() {
  let subtaskInput = document.getElementById('subtaskInput');
    
  subtaskInput.value = '';
  toggleSubtaskButtons();
}

function deleteListItem(element) {
  element.closest('.container_hover_subtasks_icons').remove();
}

// Prioritäten umschalten  start //
let selectedPriority;


function toggleButton(priority) {
  let urgentButtonWhite = document.getElementById('urgentbuttonwhite');
  let urgentButtonRed = document.getElementById('urgentbuttonred');
  let mediumButtonOrange = document.getElementById('mediumbuttonorange');
  let mediumButtonWhite = document.getElementById('mediumbuttonwhite');
  let lowButtonWhite = document.getElementById('lowbuttonwhite');
  let lowButtonGreen = document.getElementById('lowbuttongreen');

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
//Prioritäten umschalten ende // 

// Assigned to Start //
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

function openContactListAddTask() {
  let contactBar = document.getElementById('contact_bar_select_contacts_add_task');
  let contactList = document.getElementById('contact_list_add_task');
  contactBar.innerHTML = /*html*/`
      <div class="search_bar_select_contacts_add_task">
          <input type="text" id="search_bar_contacts_add_task" onkeyup="searchContactsAddTask()">
          <img src="./assets/img/arrow_up_add_task.svg" alt="arrow up symbol" onclick="closeContactListAddTask()">
      </div>
  `;
  contactList.style = 'display: flex';
  hideSelectedContactsAddTask();
  renderSelectedContactsAddTask();
}

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
  for (let i = 0; i < currentUser.contacts.length; i++) {
    let contact = currentUser.contacts[i];
    let checkbox = document.getElementById(`checkbox_contact_add_task${i}`);
    if (selectedContactsAddTask.includes(contact)) {
      checkbox.checked = true;
    } else {
      checkbox.checked = false;
    }
  }
}

let selectedContactsAddTask = [];


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

function checkSelectedContactsAddTask(i) {
  let contact = document.getElementById(`contact_add_task${i}`);
  let checkbox = document.getElementById(`checkbox_contact_add_task${i}`);
  let currentContact = currentUser.contacts[i];
  for (let j = 0; j < selectedContactsAddTask.length; j++) {
    let selectedContact = selectedContactsAddTask[j];
    if (currentContact === selectedContact) {
      contact.style.backgroundColor = '#2a3647';
      contact.style.color = 'white';
      checkbox.checked = true;
    }
  }
}


function addSelectedContactsAddTask(i) {
  let contact = currentUser.contacts[i];
  selectedContactsAddTask.push(contact);
  renderSelectedContactsAddTask();
}

function removeSelectedContactsAddTask(i) {
  let contact = currentUser.contacts[i];
  let index = selectedContactsAddTask.indexOf(contact)
  selectedContactsAddTask.splice(index, 1);
  renderSelectedContactsAddTask();
}

function renderSelectedContactsAddTask() {
  let selectedContactsDiv = document.getElementById('selected_contacts_add_task');
  selectedContactsDiv.innerHTML = '';
  for (let i = 0; i < selectedContactsAddTask.length; i++) {
    let selectedContact = selectedContactsAddTask[i];
    let initials = getInitials(selectedContact.name);
    selectedContactsDiv.innerHTML += /*html*/`
      <div class="initials_contact_add_task" style="background-color: ${selectedContact.color}"><span>${initials}</span></div>
    `;
  }
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

// Assigned to end //

// Clear all Button start //
function clearAllInputs() {
  let inputs = document.getElementsByTagName('input');
  for (let i = 0; i < inputs.length; i++) {
      inputs[i].value = '';
  }

  let textareas = document.getElementsByTagName('textarea');
  for (let i = 0; i < textareas.length; i++) {
      textareas[i].value = '';
  }

  // Falls Weitere Eingabefelder vorhanden sind, können diese hier hinzugefügt werden, wenn nötig

  let firstInput = document.querySelector('input');   // Fokus auf das erste Eingabefeld setzen, um die Benutzererfahrung zu verbessern, also, das mann nicht wieder ein eingabefeld anklicken muss.
  if (firstInput) {
      firstInput.focus();
  }
}


//deactivate past days start //
let currentDate = new Date(); // JavaScript, um das aktuelle Datum zu erhalten

let year = currentDate.getFullYear();   // Formatierung des Datums für das HTML "date" Input-Element
let month = ('0' + (currentDate.getMonth() + 1)).slice(-2); // Monat beginnt bei 0
let day = ('0' + currentDate.getDate()).slice(-2);

let formattedDate = `${year}-${month}-${day}`;

document.getElementById('date').min = formattedDate;   // Setzen des "min"-Attributs auf das aktuelle Datum
//deactivate past days end //


async function submitFormAddTask() {
  await createTaskArray(targetColumnId);
  redirect('board');
}