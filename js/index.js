/**
 * Initializes the index module.
 */
function initIndex() {
}


/**
 * Sets up an event listener to execute a redirection after a delay when the window has loaded.
 */
window.onload = function() {
    setTimeout(function() {
        window.location.href = "log_in.html";
    }, 1000);
}