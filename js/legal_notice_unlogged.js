/**
 * Initializes the legal notice module by including HTML content and highlighting the page in the desktop template asynchronously.
 */
async function initLegalNotice() {
    await includeHTML();
    highlightPageDesktopTemplate();
}