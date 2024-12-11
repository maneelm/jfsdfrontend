// utils/cookie.js

// Function to set a cookie with a name, value, and expiry in days
export function setSession(cname, cvalue, exdays) {
    const d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));  // Set the expiry time
    const expires = "expires=" + d.toUTCString();
    document.cookie = `${cname}=${cvalue};${expires};path=/`;  // Set the cookie
    console.log(`Cookie set: ${cname}=${cvalue}`); // Debugging log
}

// Function to get a cookie value by name
export function getSession(cname) {
    const name = cname + "=";
    const decodedCookie = decodeURIComponent(document.cookie);
    const ca = decodedCookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) === ' ') {
            c = c.substring(1);  // Remove leading spaces
        }
        if (c.indexOf(name) === 0) {
            console.log(`Cookie found: ${cname}=${c.substring(name.length, c.length)}`); // Debugging log
            return c.substring(name.length, c.length);  // Return the cookie value
        }
    }
    console.log(`Cookie not found: ${cname}`); // Debugging log
    return "";  // Return an empty string if the cookie is not found
}

// Function to check if a session exists
export function isSessionActive() {
    return getSession('userId') !== "";
}
