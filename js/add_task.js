async function initAddTask() {
  await init();
  renderContactsAddTask();
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
  newSubtaskHTM = '';
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
function renderContactsAddTask() {
  let contactAreaForAll = document.getElementById('contacts_contact_list_add_task');
  let contactAreaForMe = document.getElementById('me_contact_list_add_task');
  for (let i = 0; i < currentUser.contacts.length; i++) {
      let contact = currentUser.contacts[i];
      let initials = getInitials(contact.name)
      if (contact.me) {
          contactAreaForMe.innerHTML += /*html*/`
          <div class="contact_add_task" id="contact_add_task${i}" onclick="selectContactAddTask(${i})">
              <div class="left_contact_add_task">
                  <div class="initials_contact_add_task" style="background-color: ${contact.color}"><span>${initials}</span></div>
                  <span>${contact.name}</span>
              </div>
              <input type="checkbox" id="checkbox_contact_add_task${i}" onchange="selectContactAddTask(${i})">
          </div>
      `;
      } else {
          contactAreaForAll.innerHTML += /*html*/`
              <div class="contact_add_task" id="contact_add_task${i}" onclick="selectContactAddTask(${i})">
                  <div class="left_contact_add_task">
                      <div class="initials_contact_add_task" style="background-color: ${contact.color}"><span>${initials}</span></div>
                      <span>${contact.name}</span>
                  </div>
                  <input type="checkbox" id="checkbox_contact_add_task${i}" onchange="selectContactAddTask(${i})">
              </div>
          `;
      }
  }
}

function openContactListAddTask() {
  let contactBar = document.getElementById('contact_bar_select_contacts_add_task');
  let contactList = document.getElementById('contact_list_add_task');
  contactBar.innerHTML = /*html*/`
      <div class="search_bar_select_contacts_add_task">
          <input type="text" id="search_bar_contacts_add_task">
          <img src="./assets/img/arrow_up_add_task.svg" alt="arrow up symbol" onclick="closeContactListAddTask()">
      </div>
  `;
  contactList.style = 'display: flex';
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
}

function selectContactAddTask(i) {
  let contact = document.getElementById(`contact_add_task${i}`);
  let checkbox = document.getElementById(`checkbox_contact_add_task${i}`);
  if (checkbox.checked) {
      contact.style.backgroundColor = 'unset';
      contact.style.color = 'unset';
      checkbox.checked = false;
  } else {
      contact.style.backgroundColor = '#2a3647';
      contact.style.color = 'white';
      checkbox.checked = true;
  }
}
// Assigned to end //