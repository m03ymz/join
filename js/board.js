function openOverlay(){
    document.getElementById(`task-overlay`).style.right = "500px";
    document.getElementById(`overlay`).style.display = "block";
    document.getElementById(`content-board`).classList.add('pointer_events-none');
    document.getElementById(`body`).classList.add('overflow_hidden');
}

function closeOverlay(){
    document.getElementById(`task-overlay`).style.right = "-700px";
    document.getElementById(`overlay`).style.display = "none";
    document.getElementById(`content-board`).classList.remove('pointer_events-none');
    document.getElementById(`body`).classList.remove('overflow_hidden');
}