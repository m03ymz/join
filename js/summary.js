function initSummary() {
    renderNameSummary();
}


function renderNameSummary() {
    let name = document.getElementById('name_summary');
    name.innerHTML = currentUser.name;
}