function initContacts(){
 initialsContacts();
}
function showPopup() {
    document.getElementById('popupBackground').style.display = 'block';
}

function hidePopup() {
    document.getElementById('popupBackground').style.display = 'none';
}

function initContacts(){
    let name = document.getElementById('contact_name').innerHTML;
    console.log(name);
    document.getElementById('initial_contacts').innerHTML = getInitials(name);
}

