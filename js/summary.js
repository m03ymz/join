async function initSummary() {
    await init();
    renderNameSummary();
    setGreetSummary();
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

function setGreetSummary() {
    let hour = new Date().getHours();
    let greeting;
    if (hour >= 5 && hour < 12) {
        greeting = 'Good morning';
    } else if (hour >= 12 && hour < 17) {
        greeting = 'Good afternoon';
    } else if (hour >= 17 && hour < 20) {
        greeting = 'Good evening';
    } else if (hour >= 20 && hour < 24) {
        greeting = 'Good night';
    } else {
        greeting = 'Hello'; 
    }
    document.getElementById('greet_summary').innerHTML = greeting;
}
