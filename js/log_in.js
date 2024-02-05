async function initLogIn() {
    await loadUsers();
    checkRememberedDataLogIn();
}


function checkDataLogIn() {
    let email = document.getElementById('email_log_in').value.toLowerCase();
    let password = document.getElementById("password_log_in").value;
    let rememberMe = document.getElementById('remember_me_log_in').checked;
    let currentUserData = users.filter(user => (user.email === email && user.password === password));
    checkDataStatementLogIn(currentUserData, rememberMe, email, password);
}


function checkDataStatementLogIn(currentUserData, rememberMe, email, password) {
    if (currentUserData.length > 0) {
        saveCurrentUserLogIn(currentUserData);
        rememberMeLogIn();
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

function saveCurrentUserLogIn(currentUserData) {
    let currentUserDataAsString = JSON.stringify(currentUserData);
    localStorage.setItem('currentUserData', currentUserDataAsString);
    loadCurrentUser();
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