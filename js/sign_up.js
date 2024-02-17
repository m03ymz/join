async function initSignUp() {
  await loadUsers();
  console.log(users); 
}



function checkDataSignUp() {
    document.getElementById('sign_up_button_center_sign_up').disabled = true;
    let email = document.getElementById('email_sign_up').value.toLowerCase();
    let password = document.getElementById("password_sign_up").value;
    let confirmPassword = document.getElementById("confirm_password_sign_up").value;
    let foundEmail = users.filter(user => user.email === email);
    if (password !== confirmPassword) {
      alert("Die Passwörter stimmen nicht überein. Bitte überprüfen Sie Ihre Eingabe.");
    } else if (foundEmail.length > 0) {
      alert("E-Mail-Adresse ist bereits vergeben. Bitte verwenden Sie eine andere E-Mail-Adresse.");
    } else {
      addUserSignUp(); 
    }
    document.getElementById('sign_up_button_center_sign_up').disabled = false;
  }


async function addUserSignUp() {
    let name = document.getElementById('name_sign_up').value;
    let email = document.getElementById('email_sign_up').value;
    let password = document.getElementById('password_sign_up').value;
    let randomIndex = Math.floor(Math.random() * contactColors.length);
    let color = contactColors[randomIndex];
    let user = {
        'name': name,
        'email': email,
        'password': password,
        'contacts': [],
        'tasks':[]
    };
    let contact = {
        'name': name + ' (Me)',
        'email': email,
        'phone': '',
        'color': color,
        'me': true
    };
    user.contacts.push(contact);
    users.push(user);
    await saveUsers();
    redirect('log_in');
}


