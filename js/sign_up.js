/**
 * Initializes the sign-up module by loading users.
 */
async function initSignUp() {
  await loadUsers();
}


/**
 * Checks the input data during sign-up process and performs appropriate actions.
 */
function checkDataSignUp() {
    document.getElementById('sign_up_button_center_sign_up').disabled = true;
    let email = document.getElementById('email_sign_up').value.toLowerCase();
    let password = document.getElementById("password_sign_up").value;
    let confirmPassword = document.getElementById("confirm_password_sign_up").value;
    let foundEmail = users.filter(user => user.email === email);
    if (foundEmail.length > 0) {
      document.getElementById('email_sign_up').style = 'border: 1px solid #FF8190';
      document.getElementById('email_feedback_input_center_sign_up').style = 'display: unset';
    } else if (password !== confirmPassword) {
        document.getElementById('password_sign_up').style = 'border: 1px solid #FF8190';
        document.getElementById('confirm_password_sign_up').style = 'border: 1px solid #FF8190';
        document.getElementById('password_feedback_input_center_sign_up').style = 'display: unset';
    } else {
      addUserSignUp(); 
    }
    document.getElementById('sign_up_button_center_sign_up').disabled = false;
}


/**
 * Adds a new user during sign-up process and redirects to the log-in page.
 */
async function addUserSignUp() {
    let name = document.getElementById('name_sign_up').value;
    let email = document.getElementById('email_sign_up').value.toLowerCase();
    let password = document.getElementById('password_sign_up').value;
    let randomIndex = Math.floor(Math.random() * contactColors.length);
    let color = contactColors[randomIndex];
    let user = { 'name': name, 'email': email, 'password': password, 'contacts': [], 'tasks':[] }; 
    let contact = { 'name': name + ' (Me)', 'email': email, 'phone': '', 'color': color, 'me': true };
    user.contacts.push(contact);
    users.push(user);
    await saveUsers();
    redirect('log_in');
}


/**
 * Resets the email feedback UI elements for sign-up.
 */
function resetEmailUserFeedbackSignUp() {
  document.getElementById('email_sign_up').style = 'border: 1px solid #D1D1D1';
  document.getElementById('email_feedback_input_center_sign_up').style = 'display: none';
}


/**
 * Resets the password feedback UI elements for sign-up.
 */
function resetPasswordUserFeedbackSignUp() {
  document.getElementById('password_sign_up').style = 'border: 1px solid #D1D1D1';
  document.getElementById('confirm_password_sign_up').style = 'border: 1px solid #D1D1D1';
  document.getElementById('password_feedback_input_center_sign_up').style = 'display: none';
}