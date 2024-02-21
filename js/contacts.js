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
    let contact = {
        'name': name,
        'email': email,
        'phone': phone,
        'color': color,
        'me': false
    };
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
        contactList.innerHTML += /*html*/`
            <div>
                <div class="alphabet_contacts"><span>${initial}</span></div>
                <div class="parting_line_contacts"></div>
            </div>
        `;
        for (let j = 0; j < currentUser.contacts.length; j++) {
            let contact = currentUser.contacts[j];
            let initials = getInitials(contact.name);
            if (contact.me == true) {
                meAsContact.innerHTML = /*html*/`
                    <div class="contact_contacts hover_contact_contacts" id="contact_contacts${j}" onclick="renderContactDetailsContacts(${j}), toggleHighlightContactContacts(${j}), showContactDetailsContacts()">
                        <div><span class="contact_initials_contacts" style="background-color: ${contact.color}">${initials}</span></div>
                        <div>
                            <span id="contact_name_contacts">${contact.name}</span>
                            <span id="contact_email_contacts">${contact.email}</span>
                        </div>
                    </div>
                `;
            } else if (contact.name.charAt(0).toUpperCase() === initial) {
                contactList.innerHTML += /*html*/`
                    <div class="contact_contacts hover_contact_contacts" id="contact_contacts${j}" onclick="renderContactDetailsContacts(${j}), toggleHighlightContactContacts(${j}), showContactDetailsContacts()">
                        <div><span class="contact_initials_contacts" style="background-color: ${contact.color}">${initials}</span></div>
                        <div>
                            <span id="contact_name_contacts">${contact.name}</span>
                            <span id="contact_email_contacts">${contact.email}</span>
                        </div>
                    </div>
                `;
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
    document.getElementById('contact_details_contacts').innerHTML = /*html*/`
                    <div class="blue_arrow_left_mobile_right_contacts" onclick="showLeftContacts(), toggleHighlightContactContacts(${j})"><img src="./assets/img/blue_arrow_left.svg" alt="blue arrow left icon"></div>
        <div class="top_contact_details_contacts">
            <div>
                <span id="initials_contact_details_contacts" style = "background-color: ${contact.color}">${initials}</span>
            </div>
            <div class="name_and_options_contact_details_contacts">
                <span id="name_contact_details_contacts">${contact.name}</span>
                <div class="options_contact_details_contacts">
                    <div>
                        <span class="edit_contact_details_contacts" onclick="editContactContacts(${j})">Edit</span>
                    </div>
                    <div>
                        <span class="delete_contact_details_contacts" onclick="deleteContactContacts(${j})">Delete</span>
                    </div>
                </div>
            </div>
        </div>
        <span class="contact_information_title_contact_details_contacts">Contact Information</span>
        <div class="contact_information_contact_details_contacts">
            <div>
                <span>Email</span>
                <a id="email_contact_information_contact_details_contacts" href="mailto:${contact.email}">${contact.email}</a>
            </div>
            <div>
                <span>Phone</span>
                <a id="phone_contact_information_contact_details_contacts" href="tel:${contact.phone}">${contact.phone}</a>
            </div>
        </div>
        <div id="mobile_options_contact_contacts" style = "display: none">
                <div><span class="edit_mobile_options_contact_contacts" onclick="editContactContacts(${j}), hideContactDetailsOptionsContacts()">Edit</span></div>
                <div><span class="delete_mobile_options_contact_contacts" onclick="deleteContactContacts(${j}), hideContactDetailsOptionsContacts()">Delete</span></div>
        </div>
    `;
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
    document.getElementById('buttons_contact_form').innerHTML = /*html*/`
        <div class="edit_buttons_contact_form">
            <button type="button" class="delete_button_contact_form" onclick="deleteContactContacts(${j})">Delete</button>
            <button type="button" class="save_button_contact_form" onclick="replaceContactsContacts(${j})">Save<img src="./assets/img/check_icon_contact_form.svg" alt="check icon"></button>
        </div>
    `;
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
