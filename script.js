const STORAGE_TOKEN = '4P1XH3G5Y41OG9WBBTCP22KWPYXQ1M89PF6B0NCW';
const STORAGE_URL = 'https://remote-storage.developerakademie.org/item';
let users;
let currentUserData;
let currentUser;


async function init() {
    loadCurrentUser();
    await includeHTML();
    renderInitialsDesktopTemplate();
    highlightPageDesktopTemplate();
}


async function includeHTML() {
    let includeElements = document.querySelectorAll('[w3-include-html]');
    for (let i = 0; i < includeElements.length; i++) {
        const element = includeElements[i];
        file = element.getAttribute("w3-include-html");
        let resp = await fetch(file);
        if (resp.ok) {
            element.innerHTML = await resp.text();
        } else {
            element.innerHTML = 'Page not found';
        }
    }
}


async function setItem(key, value) {
    const payload = { key, value, token: STORAGE_TOKEN };
    return fetch(STORAGE_URL, { method: 'POST', body: JSON.stringify(payload)})
    .then(res => res.json());
}


async function getItem(key) {
    const url = `${STORAGE_URL}?key=${key}&token=${STORAGE_TOKEN}`;
    return fetch(url).then(res => res.json());
}


async function loadUsers() {
    // await setItem('users', []); // remote storage für den key users löschen
    let res = await getItem('users');   
    let usersAsString = res.data.value;
    console.log(usersAsString) // muss am ende weg!
    users = await JSON.parse(usersAsString);
}


function loadCurrentUser() {
    let currentUserDataAsString = localStorage.getItem('currentUserData');
    currentUserData = JSON.parse(currentUserDataAsString);
    currentUser = currentUserData[0]
    console.log(currentUser);
}


function saveCurrentUser() {
    let currentUserDataAsString = JSON.stringify(currentUserData);
    localStorage.setItem('currentUserData', currentUserDataAsString);
    loadCurrentUser();
}


function redirectDesktopTemplate(site) {
    window.location.href = site + '.html';
}


function getInitials(name) {
    let nameParts = name.split(' ');
    let initials = nameParts.map(namePart => namePart.charAt(0).toUpperCase());
    return initials.join('');
}


function renderInitialsDesktopTemplate() {
    document.getElementById('initials_header_desktop_template').innerHTML = getInitials(currentUser.name)
}


function highlightPageDesktopTemplate() {
    let currentPage = window.location.pathname;
    if (currentPage === '/summary.html') {
        document.getElementById('summary_side_bar').style = 'background-color: #091931';
    } else if (currentPage === '/add_task.html') {
        document.getElementById('add_task_side_bar').style = 'background-color: #091931';
    } else if (currentPage === '/board.html') {
        document.getElementById('board_side_bar').style = 'background-color: #091931';
    } else if (currentPage === '/contacts.html') {
        document.getElementById('contacts_side_bar').style = 'background-color: #091931';
    }
}