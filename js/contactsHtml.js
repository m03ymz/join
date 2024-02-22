function generateInitialsHtml(initial) {
    return /*html*/`
        <div>
            <div class="alphabet_contacts"><span>${initial}</span></div>
            <div class="parting_line_contacts"></div>
        </div>
    `;
}


function generateContactListHtml(j, contact, initials) {
    return /*html*/`
        <div class="contact_contacts hover_contact_contacts" id="contact_contacts${j}" onclick="renderContactDetailsContacts(${j}), toggleHighlightContactContacts(${j}), showContactDetailsContacts()">
            <div><span class="contact_initials_contacts" style="background-color: ${contact.color}">${initials}</span></div>
            <div>
                <span id="contact_name_contacts">${contact.name}</span>
                <span id="contact_email_contacts">${contact.email}</span>
            </div>
        </div>
    `;
}


function generateContactDetailsHtml(j, contact, initials) {
    return /*html*/`
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


function generateEditContactHtml(j) {
    return /*html*/`
        <div class="edit_buttons_contact_form">
            <button type="button" class="delete_button_contact_form" onclick="deleteContactContacts(${j})">Delete</button>
            <button type="button" class="save_button_contact_form" onclick="replaceContactsContacts(${j})">Save<img src="./assets/img/check_icon_contact_form.svg" alt="check icon"></button>
        </div>
    `;
}