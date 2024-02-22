let contactColors = ['#ff7a00', '#9327ff', '#ff745e', '#ffc701', '#ffe62b', '#ff5eb3', '#00bee8', '#ffa35e', '#0038ff', '#ff4646', '#6e52ff', '#1fd7c1', '#fc71ff', '#c3ff2b', '#ffbb2b'];
let users;
let currentUser;


async function init() {
    await loadUsers();
    await includeHTML();
    renderInitialsDesktopTemplate();
    highlightPageDesktopTemplate();
    console.log(currentUser);
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


async function saveUsers() {
    let usersAsString = JSON.stringify(users);
    await setItem('users', usersAsString);
    await loadUsers();
}


async function loadUsers() {
    try {
        let usersAsString = await getItem('users');  
        users = await JSON.parse(usersAsString); 
    } catch(e) {
        console.warn('Could not load users');
    }
    let currentUserIndexAsString = localStorage.getItem('currentUserIndex');
    let currentUserIndex = JSON.parse(currentUserIndexAsString);
    currentUser = users[currentUserIndex];
}


function redirect(site) {
    window.location.href = site + '.html';
}


function redirectToPreviousPage() {
    window.history.back();
}


function getInitials(name) {
    let cleanName = name.replace(/\(Me\)|[^a-zA-Z\s]/g, '').match(/[a-zA-Z]+/g);
    let initials = cleanName.map(word => word.charAt(0).toUpperCase()).join('').slice(0, 3);
    return initials;
}


function renderInitialsDesktopTemplate() {
    document.getElementById('initials_header_desktop_template').innerHTML = getInitials(currentUser.name)
}


function highlightPageDesktopTemplate() {
    let currentPage = window.location.pathname;
    if (currentPage.includes('/summary.html')) {
        document.getElementById('summary_side_bar').style = 'background-color: #091931';
    } else if (currentPage.includes('/add_task.html')) {
        document.getElementById('add_task_side_bar').style = 'background-color: #091931';
    } else if (currentPage.includes('/board.html')) {
        document.getElementById('board_side_bar').style = 'background-color: #091931';
    } else if (currentPage.includes('/contacts.html')) {
        document.getElementById('contacts_side_bar').style = 'background-color: #091931';
    } else if (currentPage.includes('/privacy_policy.html')) {
        document.getElementById('privacy_policy_side_bar').style = 'background-color: #091931';
    } else if (currentPage.includes('/legal_notice.html')) {
        document.getElementById('legal_notice_side_bar').style = 'background-color: #091931';
    } else if (currentPage.includes('/privacy_policy_unlogged.html')) {
        document.getElementById('privacy_policy_side_bar').style = 'background-color: #091931';
    } else if (currentPage.includes('/legal_notice_unlogged.html')) {
        document.getElementById('legal_notice_side_bar').style = 'background-color: #091931';
    }
}


function openDropdownMenuDesktopTemplate() {
    document.getElementById('dropdown_menu_header_desktop_template').classList.toggle('display_none');
}
