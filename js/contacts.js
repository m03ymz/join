// function hidePopup() {
//     document.getElementById('popupBackground').style.right = '-100%';
// }

//    function showPopup() {
//    document.getElementById('popupBackground').style.right = '0';
// }

//    function togglePopup() {
//    let popup = document.getElementById('popupBackground');
//    if (popup.style.right === '0') {
//        hidePopup();
//    } else {
//        showPopup();
//    }
// }

function showPopup(){
    document.getElementById(`container_form`).style.right = "100%";
    document.getElementById(`overlay`).style.display = "flex";
    // document.getElementById(`main_content`).classList.add('pointer_events-none');
    document.getElementById(`body`).classList.add('overflow_hidden');
}

function closePopup(){
    document.getElementById(`container_form`).style.right = "-100%";
    document.getElementById(`overlay`).style.display = "none";
    // document.getElementById(`content-board`).classList.remove('pointer_events-none');
    document.getElementById(`body`).classList.remove('overflow_hidden');
}
