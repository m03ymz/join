document.addEventListener("DOMContentLoaded", function () {
    
    const urgentButton = document.getElementById("prioButtonUrgent");

    urgentButton.onclick = function () {
        urgentButton.style.backgroundColor = "#ff3d00";
        urgentButton.style.color = "#ecf0f1";
    };
});