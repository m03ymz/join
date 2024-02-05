function initSummary() {
    renderNameSummary();
}


function renderNameSummary() {
    let name = document.getElementById('name_summary');
    name.innerHTML = currentUser.name;
}


function changeIconOnMouseOverSummary(id) {
    let icon = document.getElementById(id);
    icon.src = `./assets/img/hover_${id}.svg`;
}


function changeIconOnMouseOutSummary(id) {
    let icon = document.getElementById(id);
    icon.src = `./assets/img/${id}.svg`;
}


function changeTextSummary(id, color) {
    let text = document.getElementById(id);
    text.style = `color: ${color}`;
}