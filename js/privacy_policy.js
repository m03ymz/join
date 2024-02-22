/**
 * Initializes the privacy policy module by calling necessary functions asynchronously.
 */
async function initPrivacyPolicy() {
    await init();
}


/**
 * Navigates back to the previous page in the browser history.
 */
function goBackArrow() {
    window.history.back();
}