async function initSignUp() {
  await loadUsers();
}


function checkDataSignUp() {
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
  }


async function addUserSignUp() {
    let name = document.getElementById('name_sign_up').value;
    let email = document.getElementById('email_sign_up').value;
    let password = document.getElementById('password_sign_up').value;
    let user = {
        'name': name,
        'email': email,
        'password': password
    };
    users.push(user);
    let usersAsString = JSON.stringify(users);
    await setItem('users', usersAsString);
    await loadUsers();
    redirectToLogInSignUp();
}

function redirectToLogInSignUp() {
    window.location.href = 'log_in.html';
}
