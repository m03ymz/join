let contactInitials = [];


async function initContacts() {
    await init();
    extractContactsInitials();
    renderContactsContacts();
}


function openContactFormContacts() {
    resetContactFormContacts();
    document.getElementById('bg_contact_form').style = 'display: unset';
    document.getElementById('contact_form').style = 'display: flex';
}


function closeContactFormContacts() {
    document.getElementById('bg_contact_form').style = 'display: none';
    document.getElementById('contact_form').style = 'display: none';
    document.getElementById('name_contact_form').value = '';
    document.getElementById('email_contact_form').value = '';
    document.getElementById('phone_contact_form').value = '';
}


async function addNewContactContacts() {
    let name = document.getElementById('name_contact_form').value;
    let email = document.getElementById('email_contact_form').value;
    let phone = document.getElementById('phone_contact_form').value;
    let randomIndex = Math.floor(Math.random() * contactColors.length);
    let color = contactColors[randomIndex];
    let contact = { 'name': name, 'email': email, 'phone': phone, 'color': color, 'me': false };
    currentUser.contacts.push(contact);
    await saveUsers();
    extractContactsInitials();
    renderContactsContacts();
    closeContactFormContacts();
}


function renderContactsContacts() {
    let contactList = document.getElementById('contact_list_contacts');
    let meAsContact = document.getElementById('me_as_contact');
    contactList.innerHTML = '';
    for (let i = 0; i < contactInitials.length; i++) {
        let initial = contactInitials[i];
        contactList.innerHTML += generateInitialsHtml(initial);
        for (let j = 0; j < currentUser.contacts.length; j++) {
            let contact = currentUser.contacts[j];
            let initials = getInitials(contact.name);
            if (contact.me == true) {
                meAsContact.innerHTML = generateContactListHtml(j, contact, initials);
            } else if (contact.name.charAt(0).toUpperCase() === initial) {
                contactList.innerHTML += generateContactListHtml(j, contact, initials);
            }
        }
    }
}


function extractContactsInitials() {
    for (let i = 0; i < currentUser.contacts.length; i++) {
        let initial = currentUser.contacts[i].name.charAt(0).toUpperCase();
        if (!contactInitials.includes(initial) && currentUser.contacts[i].me !== true) {
            contactInitials.push(initial);
        }
    }
    contactInitials.sort();
}


function openContactDetailsContacts(j) {
    let contact = currentUser.contacts[j];
    let initials = getInitials(contact.name);
    document.getElementById('contact_details_contacts').style = 'display: flex';
    document.getElementById('initials_contact_details_contacts').innerHTML = initials;
    document.getElementById('initials_contact_details_contacts').style = `background-color: ${contact.color}`;
    document.getElementById('name_contact_details_contacts').innerHTML = contact.name;
    document.getElementById('email_contact_information_contact_details_contacts').innerHTML = contact.email;
    document.getElementById('phone_contact_information_contact_details_contacts').innerHTML = contact.phone;
}


function removeHighlightContactContacts() {
    let allContacts = document.querySelectorAll('.contact_contacts');
    allContacts.forEach(element => {
        element.classList.remove('highlighted_contact_contacts');
        if (!element.classList.contains('hover_contact_contacts')) {
            element.classList.add('hover_contact_contacts');
        }
    });
}


function addHighlightContactContacts(j) {
    let contact = document.getElementById(`contact_contacts${j}`);
    contact.classList.add('highlighted_contact_contacts');
    contact.classList.remove('hover_contact_contacts');
}


function toggleHighlightContactContacts(j) {
    let contact = document.getElementById(`contact_contacts${j}`);
    if (contact.classList.contains('highlighted_contact_contacts')) {
        contact.classList.add('hover_contact_contacts');
        contact.classList.remove('highlighted_contact_contacts');
        document.getElementById('contact_details_contacts').innerHTML = '';
    } else {
        removeHighlightContactContacts();
        addHighlightContactContacts(j);
    }
}


function renderContactDetailsContacts(j) {
    let contact = currentUser.contacts[j];
    let initials = getInitials(contact.name);
    document.getElementById('contact_details_contacts').innerHTML = generateContactDetailsHtml(j, contact, initials);
}


function editContactContacts(j) {
    let contact = currentUser.contacts[j];
    let initials = getInitials(contact.name);
    openContactFormContacts();
    document.getElementById('title_left_contact_form').innerHTML = 'Edit contact';
    document.getElementById('subheading_contact_form').style = 'display: none';
    document.getElementById('pfp_contact_form').innerHTML = /*html*/`<span class="initials_contact_details_contacts" style = "background-color: ${contact.color}">${initials}</span>`;
    document.getElementById('name_contact_form').value = contact.name;
    document.getElementById('email_contact_form').value = contact.email;
    document.getElementById('phone_contact_form').value = contact.phone;
    document.getElementById('buttons_contact_form').innerHTML = generateEditContactHtml(j);
}


function resetContactFormContacts() {
    document.getElementById('title_left_contact_form').innerHTML = 'Add contact';
    document.getElementById('subheading_contact_form').style = 'display: unset';
    document.getElementById('pfp_contact_form').innerHTML = /*html*/`<img src="./assets/img/pfp_placeholder_icon_contact_form.svg" alt="person icon">`;
    document.getElementById('name_contact_form').value = '';
    document.getElementById('email_contact_form').value = '';
    document.getElementById('phone_contact_form').value = '';
    document.getElementById('buttons_contact_form').innerHTML = /*html*/`
        <div class="add_buttons_contact_form">
            <button onclick="closeContactFormContacts()" type="button" class="cancel_button_contact_form">Cancel</button>
            <button class="create_button_contact_form">Create contact<img src="./assets/img/check_icon_contact_form.svg" alt="check icon"></button>
        </div>
    `;
}


async function deleteContactContacts(j) {
    currentUser.contacts.splice(j, 1);
    await saveUsers();
    extractContactsInitials();
    renderContactsContacts();
    document.getElementById('contact_details_contacts').innerHTML = '';
    closeContactFormContacts();
}


async function replaceContactsContacts(j) {
    let contact = currentUser.contacts[j];
    let name = document.getElementById('name_contact_form').value;
    let email = document.getElementById('email_contact_form').value;
    let phone = document.getElementById('phone_contact_form').value;
    contact.name = name;
    contact.email = email;
    contact.phone = phone;
    await saveUsers();
    extractContactsInitials();
    renderContactsContacts();
    renderContactDetailsContacts(j);
    addHighlightContactContacts(j);
    closeContactFormContacts();
}


function showContactDetailsContacts() {
    if (window.innerWidth <= 720) {
    document.getElementById('left_contacts').style = 'display: none';
    document.getElementById('right_contacts').style = 'display: flex';
    }
}


function showLeftContacts() {
    document.getElementById('left_contacts').style = 'display: unset';
    document.getElementById('right_contacts').style = 'display: none';
}


function showContactDetailsOptionsContacts() {
    if (window.innerWidth <= 720) {
    document.getElementById('mobile_options_contact_contacts').style = 'display: flex';
    }
}


function hideContactDetailsOptionsContacts() {
    if (window.innerWidth <= 720) {
        document.getElementById('mobile_options_contact_contacts').style = 'display: none';
    }
}