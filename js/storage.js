/**
 * The token used for authentication with the remote storage.
 */
const STORAGE_TOKEN = '4P1XH3G5Y41OG9WBBTCP22KWPYXQ1M89PF6B0NCW';


/**
 * The URL of the remote storage.
 */
const STORAGE_URL = 'https://remote-storage.developerakademie.org/item';


/**
 * Sets an item in the remote storage.
 * @param {string} key - The key of the item.
 * @param {string} value - The value of the item.
 */
async function setItem(key, value) {
    const payload = { key, value, token: STORAGE_TOKEN };
    return fetch(STORAGE_URL, { method: 'POST', body: JSON.stringify(payload)})
    .then(res => res.json());
}


/**
 * Retrieves an item from the remote storage.
 * @param {string} key - The key of the item to retrieve.
 */
async function getItem(key) {
    const url = `${STORAGE_URL}?key=${key}&token=${STORAGE_TOKEN}`;
    return fetch(url).then(res => res.json()).then(res => res.data.value);
}