function initAddTask() {
}
function toggleButtonUrgent() {
  let button = document.getElementById('prioButtonUrgentAddTask');
  let iconWhite = document.getElementById('urgentButtonIconWhite');
  let iconRed = document.getElementById('urgentButtonIconRed');

  button.classList.toggle('toggled_color_urgent');

  // Überprüfen Sie den Hintergrund des Buttons
  if (button.classList.contains('toggled_color_urgent')) {
    // Wenn der Hintergrund rot ist, zeige das rote Icon an und das weiße Icon ausblenden
    iconWhite.style.display = 'block';
    iconRed.style.display = 'none';
  } else {
    // Wenn der Hintergrund weiß ist, zeige das weiße Icon an und das rote Icon ausblenden
    iconWhite.style.display = 'none';
    iconRed.style.display = 'block';
  }
}


function toggleButtonMedium() {
  let button = document.getElementById('mediumButtonAddTask');
  let iconWhite = document.getElementById('mediumButtonIconWhite');
  let iconYellow = document.getElementById('mediumButtonIconYellow');



  // Toggle backgroundcolor
  button.classList.toggle('toggled_color_medium');

  // Überprüfen Sie den Hintergrund des Buttons
  if (button.classList.contains('toggled_color_medium')) {
    // Wenn der Hintergrund gelb ist, zeige das gelbe Icon an und das weiße Icon ausblenden
    iconWhite.style.display = 'none';
    iconYellow.style.display = 'block';
  } else {
    // Wenn der Hintergrund weiß ist, zeige das weiße Icon an und das gelbe Icon ausblenden
    iconWhite.style.display = 'block';
    iconYellow.style.display = 'none';
  }
}


function toggleButtonLow() {
  let button = document.getElementById('lowButtonAddTask');
  let iconWhite = document.getElementById('lowButtonIconWhite');
  let iconGreen = document.getElementById('lowButtonIconGreen');

  // Toggle backgroundcolor
  button.classList.toggle('toggled_color_low');

  // Überprüfen Sie den Hintergrund des Buttons
  if (button.classList.contains('toggled_color_low')) {
    // Wenn der Hintergrund grün ist, zeige das grüne Icon an und das weiße Icon ausblenden
    iconWhite.style.display = 'block';
    iconGreen.style.display = 'none';
  } else {
    // Wenn der Hintergrund weiß ist, zeige das weiße Icon an und das grüne Icon ausblenden
    iconWhite.style.display = 'none';
    iconGreen.style.display = 'block';
  }
}


  /* Prio Buttons Toggle Colors end */


  /* Subtask hinzufügen Beginn */

function addSubtask() {
    
  let subtaskInput = document.getElementById('subtaskInput');
  let subtaskContainer = document.getElementById('subtaskContainer');

  // Den eingegebenen Wert abrufen
  let inputValue = subtaskInput.value;

  // Überprüfen, ob der eingegebene Wert nicht leer ist
  if (inputValue) {
      // Den HTML-Code für den neuen Subtask erstellen
      let newSubtaskHTML = /*html*/ `<li class="input_value_style">${inputValue}</li>`;
      
      subtaskContainer.innerHTML += newSubtaskHTML;
  
      // Eingabefeld leeren
      subtaskInput.value = '';
  }
}
