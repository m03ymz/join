async function initAddTask() {
  await init();
  renderContactsAddTask('');
  keyPressEnter();

}

  // Subtask hinzufügen Start //
function addSubtask() {
  let subtaskInput = document.getElementById('subtaskInput');
  let subtaskContainer = document.getElementById('subtaskContainer');
  let inputValue = subtaskInput.value;   // Den eingegebenen Wert abrufen

  if (inputValue) {
      let newSubtaskHTML = /*html*/ `
 <div class="container_hover_subtasks_icons show_on_hover">
  <div class="hover_li">
    <li class="input_value_style">${inputValue}</li> 
   <div class="container_subtasks_hover_icons"> 
   <img class="container_subtasks_icons_edit" src="assets/img/edit_icon.svg" alt="">
   <img class=".container_subtasks_icons show_on_hover" src="assets/img/small_line_subtask.svg" alt="">
   <img class="container_subtasks_icons_delete" src="assets/img/delete.svg" alt="" onclick="deleteListItem(this)">
   </div>
  </div>
</div>`;
      
  subtaskContainer.innerHTML += newSubtaskHTML;
  // Eingabefeld leeren
  subtaskInput.value = '';
  newSubtaskHTML = '';
  } 
}

// Funktion für die Eingabe mit der Enter Taste //
function keyPressEnter() { 
  document.getElementById('subtaskInput').addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        addSubtask();
    }
  });
}
// Funktion Subtask haken (akzeptieren) //
function acceptTask() {
  let cancelIcon = document.getElementById('cancelSubtask')
  let partingline = document.getElementById('smallLineSubtask')  
  let acceptTask = document.getElementById('acceptTask')
  let inputFieldIcon = document.getElementById('addingSubtask');
    inputFieldIcon.style.display = 'block';
    cancelIcon.style.display = 'block';
    partingline.style.display ='block';
    acceptTask.style.display = 'none';
  }
  
  // Funtktion Subtask wiederrufen X (löschen) //
  function cancelSubtask() {
    let subtaskInput = document.getElementById('subtaskInput');
    
    subtaskInput.value = '';
  }

  function deleteListItem(deleteButton) {
    // Das übergeordnete div-Element auswählen
    let listItemContainer = deleteButton.parentElement.parentElement.parentElement;
    
    // Das li-Element innerhalb des übergeordneten div-Elements auswählen und seinen Inhalt löschen
    let listItem = listItemContainer.querySelector('.input_value_style');
    listItem.textContent = ''; // Löscht den Inhalt des li-Elements
    subtaskContainer.classList.add = ('hide_icon');

}
// Prioritäten umschalten  start //
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
  } else if (priority === 'medium') {
      mediumButtonOrange.classList.toggle('hide_icon');
      mediumButtonWhite.classList.toggle('hide_icon');
      urgentButtonWhite.classList.remove('hide_icon');
      urgentButtonRed.classList.add('hide_icon');
      lowButtonWhite.classList.remove('hide_icon');
      lowButtonGreen.classList.add('hide_icon');
  } else if (priority === 'low') {
      lowButtonWhite.classList.toggle('hide_icon');
      lowButtonGreen.classList.toggle('hide_icon');
      urgentButtonWhite.classList.remove('hide_icon');
      urgentButtonRed.classList.add('hide_icon');
      mediumButtonOrange.classList.add('hide_icon');
      mediumButtonWhite.classList.remove('hide_icon');
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
      if (contact.me) {
          contactAreaForMe.innerHTML += generateContactsAddTaskHtml(i, contact, initials);
      } else {
          contactAreaForAll.innerHTML += generateContactsAddTaskHtml(i, contact, initials);
      }
    }
    checkSelectedContactsAddTask(i);
  }
}

function generateContactsAddTaskHtml(i, contact, initials) {
  return /*html*/`
    <div class="contact_add_task" id="contact_add_task${i}" onclick="selectContactAddTask(${i})">
        <div class="left_contact_add_task">
            <div class="initials_contact_add_task" style="background-color: ${contact.color}"><span>${initials}</span></div>
            <span>${contact.name}</span>
        </div>
        <input type="checkbox" id="checkbox_contact_add_task${i}" onchange="selectContactAddTask(${i})">
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
  console.log(selectedContactsAddTask);
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

  // document.getElementById('dueDateInput').min = formattedDate;   // Setzen des "min"-Attributs auf das aktuelle Datum

//deactivate past days end //
 