/**
 * Initializes the privacy policy module by including HTML content and highlighting the page in the desktop template asynchronously.
 */
async function initPrivacyPolicy() {
    await includeHTML();
    highlightPageDesktopTemplate();
}


/**
 * Navigates back to the previous page in the browser history.
 */
function goBackArrow() {
    window.history.back();
}