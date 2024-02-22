/*
    ---------------------------------
    LNTauth.js
    ---------------------------------
    Luke's Intranet Authentication
    JavaScript library
    ---------------------------------
    https://lnt.app/dev/lntauth.js
    Requires application public key
    ---------------------------------
*/

// A popup is created on Luke's Intranet to authenticate your client.

class LNTauth {
    popup() {
        window.open("https://account.lukesintranet.com/popup-auth/v1/", "hello", "width=200,height=200");
    }
}
