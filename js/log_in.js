async function initLogIn() {
    await loadUsers();
    checkRememberedDataLogIn();
    console.log(users); 
}


function checkDataLogIn() {
    let email = document.getElementById('email_log_in').value.toLowerCase();
    let password = document.getElementById("password_log_in").value;
    let foundUser = users.find(user => (user.email === email && user.password === password));
    checkDataStatementLogIn(foundUser, email, password);
}


function checkDataStatementLogIn(foundUser, email, password) {
    if (foundUser) {
        let currentUserIndex = users.findIndex(user => user.email === email && user.password === password);
        let currentUserIndexAsString = JSON.stringify(currentUserIndex);
        localStorage.setItem('currentUserIndex', currentUserIndexAsString);
        redirect('summary');
    } else {  
        alert("Ungültige Anmeldeinformationen. Bitte überprüfen Sie Ihre E-Mail und Ihr Passwort.");
    }
}


function rememberMeLogIn() {
    let email = document.getElementById('email_log_in').value.toLowerCase();
    let password = document.getElementById("password_log_in").value;
    let rememberMe = document.getElementById('remember_me_log_in').checked;
    let rememberedData = {
        'email': email,
        'password': password,
        'rememberMe': rememberMe
    };
    let rememberedDataAsString = JSON.stringify(rememberedData);
    localStorage.setItem('rememberedData', rememberedDataAsString);
}


function checkRememberedDataLogIn() {
    let emailInput = document.getElementById('email_log_in');
    let passwordInput = document.getElementById("password_log_in");
    let rememberMeCheckbox = document.getElementById('remember_me_log_in');
    let rememberedDataAsString = localStorage.getItem('rememberedData');
    checkRememberedDataStatementLogIn(emailInput, passwordInput, rememberMeCheckbox, rememberedDataAsString);
}


function checkRememberedDataStatementLogIn(emailInput, passwordInput, rememberMeCheckbox, rememberedDataAsString) {
    if (rememberedDataAsString) {
        let rememberedData = JSON.parse(rememberedDataAsString);
        emailInput.value = rememberedData.email;
        passwordInput.value = rememberedData.password;
        rememberMeCheckbox.checked = rememberedData.rememberMe;
    } else {
        emailInput.value = '';
        passwordInput.value = '';
        rememberMeCheckbox.checked = false;
    }
}

function updateRememberMe() {
    let rememberMeCheckbox = document.getElementById('remember_me_log_in');
    if (rememberMeCheckbox.checked === true) {
        rememberMeLogIn();
    } else {
        localStorage.removeItem('rememberedData');
    }
}

function logInAsGuest() {
    let currentUserIndex = users.findIndex(user => user.guest === true);
    let currentUserIndexAsString = JSON.stringify(currentUserIndex);
    localStorage.setItem('currentUserIndex', currentUserIndexAsString);
    redirect('summary');
}