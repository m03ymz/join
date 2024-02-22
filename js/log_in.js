/**
 * Initializes the log-in module by loading users and checking for remembered data.
 */
async function initLogIn() {
    await loadUsers();
    checkRememberedDataLogIn();
}


/**
 * Checks the input data during log-in process.
 */
function checkDataLogIn() {
    let email = document.getElementById('email_log_in').value.toLowerCase();
    let password = document.getElementById("password_log_in").value;
    let foundUser = users.find(user => (user.email === email && user.password === password));
    checkDataStatementLogIn(foundUser, email, password);
}


/**
 * Checks the result of data verification during log-in and performs appropriate actions.
 * 
 * @param {Object} foundUser - The user object found based on the input data.
 * @param {string} email - The email input during log-in.
 * @param {string} password - The password input during log-in.
 */
function checkDataStatementLogIn(foundUser, email, password) {
    if (foundUser) {
        let currentUserIndex = users.findIndex(user => user.email === email && user.password === password);
        let currentUserIndexAsString = JSON.stringify(currentUserIndex);
        localStorage.setItem('currentUserIndex', currentUserIndexAsString);
        redirect('summary');
    } else {  
        document.getElementById('email_log_in').style = 'border: 1px solid #FF8190';
        document.getElementById('password_log_in').style = 'border: 1px solid #FF8190';
        document.getElementById('feedback_input_center_log_in').style = 'display: unset';
    }
}


/**
 * Stores log-in data in local storage for future use.
 */
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


/**
 * Checks for remembered log-in data and populates the corresponding fields if available.
 */
function checkRememberedDataLogIn() {
    let emailInput = document.getElementById('email_log_in');
    let passwordInput = document.getElementById("password_log_in");
    let rememberMeCheckbox = document.getElementById('remember_me_log_in');
    let rememberedDataAsString = localStorage.getItem('rememberedData');
    checkRememberedDataStatementLogIn(emailInput, passwordInput, rememberMeCheckbox, rememberedDataAsString);
}


/**
 * Checks if remembered log-in data is available and populates fields accordingly.
 * 
 * @param {HTMLInputElement} emailInput - The email input field during log-in.
 * @param {HTMLInputElement} passwordInput - The password input field during log-in.
 * @param {HTMLInputElement} rememberMeCheckbox - The remember me checkbox during log-in.
 * @param {string} rememberedDataAsString - Stringified remembered log-in data from local storage.
 */
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


/**
 * Updates remembered log-in data in local storage based on the state of the remember me checkbox.
 */
function updateRememberMe() {
    let rememberMeCheckbox = document.getElementById('remember_me_log_in');
    if (rememberMeCheckbox.checked === true) {
        rememberMeLogIn();
    } else {
        localStorage.removeItem('rememberedData');
    }
}


/**
 * Logs in as a guest user.
 */
function logInAsGuest() {
    let currentUserIndex = users.findIndex(user => user.guest === true);
    let currentUserIndexAsString = JSON.stringify(currentUserIndex);
    localStorage.setItem('currentUserIndex', currentUserIndexAsString);
    redirect('summary');
}


/**
 * Resets the feedback UI elements for log-in.
 */
function resetUserFeedbackLogIn() {
    document.getElementById('email_log_in').style = 'border: 1px solid #D1D1D1';
    document.getElementById('password_log_in').style = 'border: 1px solid #D1D1D1';
    document.getElementById('feedback_input_center_log_in').style = 'display: none';
}