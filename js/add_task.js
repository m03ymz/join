async function initAddTask() {
  await init();
  keyPressEnter();


}

let names = ["Alice", "Bob", "Charlie", "David", "Emma"];

  /* Subtask hinzufügen Beginn */
function addSubtask() {
  let subtaskInput = document.getElementById('subtaskInput');
  let subtaskContainer = document.getElementById('subtaskContainer');
  // Den eingegebenen Wert abrufen
  let inputValue = subtaskInput.value;
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
function keyPressEnter() { // Funktion für die Eingabe mit der Enter Taste
  document.getElementById('subtaskInput').addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        addSubtask();
    }
  });
}
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
document.getElementById('dropdown-toggle').addEventListener('click', function() {
  document.getElementById('dropdown-container').classList.toggle('active');
});
function showCheckboxes() {
  let checkboxes = document.getElementById("checkboxes");
  checkboxes.style.display = checkboxes.style.display === "block" ? "none" : "block";

  // Array mit Namen

// Schleife, um Labels und Checkboxen dynamisch zu generieren
let checkboxesContainer = document.getElementById("checkboxes");
for (let i = 0; i < names.length; i++) {
  let label = document.createElement("label");
  label.setAttribute("for", names[i]);
  let checkbox = document.createElement("input");
  checkbox.setAttribute("type", "checkbox");
  checkbox.setAttribute("id", names[i]);
  
  label.appendChild(checkbox);
  label.appendChild(document.createTextNode(names[i]));
  
  checkboxesContainer.appendChild(label);
}

}




