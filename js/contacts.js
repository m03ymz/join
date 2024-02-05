function initContacts() {
}


function hidePopup() {
    document.getElementById('popupBackground').style.right = '-100%';
}

   function showPopup() {
   document.getElementById('popupBackground').style.right = '0';
}

   function togglePopup() {
   let popup = document.getElementById('popupBackground');
   if (popup.style.right === '0') {
       hidePopup();
   } else {
       showPopup();
   }
}