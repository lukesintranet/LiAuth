/*
Li.JS
https://developer.lukesintranet.com/lijs/
(c) Craft_Coder 2023. All rights reserved.
*/

/* Legacy Code */

let username = "", password = "";
class Login_Credentials {
    session(returnval, outputval) {
        let returnhtml = document.getElementById(returnval).innerHTML;
        if (returnhtml == "ok") {
            if (sessionStorage.getItem("accounts") == null || sessionStorage.getItem("accounts") == "" ||   sessionStorage.getItem("accounts") == "[object Undefined]" || sessionStorage.getItem("accounts") ==   "0") {
                sessionStorage.setItem("accounts", "1");
                sessionStorage.setItem("username0", username);
                sessionStorage.setItem("password0", password);
            } else {
                let alreadyStored = false;
                for (let i = 0; i < parseInt(sessionStorage.getItem("accounts")); i++) {
                    if (sessionStorage.getItem("username" + i.toString()) == username) {
                        alreadyStored = true;
                    }
                }
                if (alreadyStored == false) {
                    var accounts = (parseInt(sessionStorage.getItem("accounts")) + 1);
                    sessionStorage.setItem("accounts", accounts.toString());
                    accounts--;
                    sessionStorage.setItem("username"+accounts.toString(), username);
                    sessionStorage.setItem("password"+accounts.toString(), password);
                }
            }
        } else if (returnhtml == "username_error") {
            document.getElementById(outputval).innerHTML = "Username invalid";
        } else if (returnhtml == "password_error") {
            document.getElementById(outputval).innerHTML = "Password invalid";
        } else {
            document.getElementById(outputval).innerHTML = "Unknown error.<br>Ensure both username and password have been submitted correctly.<br>Try submitting again.";
        }
    }
    local(returnval, outputval) {
        let returnhtml = document.getElementById(returnval).innerHTML;
        if (returnhtml == "ok") {
            document.getElementById(outputval).innerHTML = 'User logged in successfully!<br><a href="account.php">Go to your account</a>';
            if (localStorage.getItem("accounts") == null || localStorage.getItem("accounts") == "" || localStorage. getItem("accounts") == "[object Undefined]" || localStorage.getItem("accounts") == "0") {
                localStorage.setItem("accounts", "1");
                localStorage.setItem("username0", username);
                localStorage.setItem("password0", password);
            } else {
                let alreadyStored = false;
                for (let i = 0; i < parseInt(localStorage.getItem("accounts")); i++) {
                    if (localStorage.getItem("username" + i.toString()) == username) {
                        alreadyStored = true;
                    }
                }
                if (alreadyStored == false) {
                    var accounts = (parseInt(localStorage.getItem("accounts"))) + 1;
                    localStorage.setItem("accounts", accounts.toString());
                    accounts--;
                    localStorage.setItem("username"+accounts.toString(), username);
                    localStorage.setItem("password"+accounts.toString(), password);
                }
            }
        } else if (returnhtml == "username_error") {
            document.getElementById(outputval).innerHTML = "Username invalid";
        } else if (returnhtml == "password_error") {
            document.getElementById(outputval).innerHTML = "Password invalid";
        } else {
            document.getElementById(outputval).innerHTML = "Unknown error.<br>Ensure both username and password have been submitted correctly.";
        }
    }
}
class Auth_Storage {
    clearLocal() {
        localStorage.clear();
    }
    clearSession() {
        sessionStorage.clear();
    }
}
class Login_Output {
    Response(elementid, content) {
        document.getElementById(elementid).innerHTML = content;
    }
}
class Login_Send {
    Send(request, elementid) {
        $.get("https://api.lukesintranet.com/account/auth.php", { username: request["username"], password: request["password"] }, function(data, status){
            document.getElementById(elementid).innerHTML = data;
        });
    }
    Session(request) {
        $.get("https://account.lukesintranet.com/session-auth.php", { username: request["username"], password:request["password"] }, function(data, status){});
    }
    Create(username, password) {
        return{ 'username': username, 'password': password };
    }
}
class Login_Auth {
    setLoginInfo(user, pass) {
        username = user;
        password = pass;
    }
    getLoginInput(userid, passid, method) {
        if (method == "innerHTML") {
            username = document.getElementById(userid).innerHTML;
            password = document.getElementById(passid).innerHTML;
        }
        if (method == "value") {
            username = document.getElementById(userid).value;
            password = document.getElementById(passid).value;
        }
    }
    checkIfStored() {
        let storedReturnVal = false;
        if (localStorage.getItem("accounts") == null || localStorage.getItem("accounts") == "") {
            storedReturnVal = false;
        }
        else if (parseInt(localStorage.getItem("accounts")) >= 0) {
            storedReturnVal = true;
        }

        if (sessionStorage.getItem("accounts") == null || sessionStorage.getItem("accounts") == "") {
            storedReturnVal = false;
        }
        else if (parseInt(sessionStorage.getItem("accounts")) >= 0) {
            storedReturnVal = true;
        }
        return(storedReturnVal);
    }
}
class Auth_Selector {
    listAccounts(method) {
        let accounts = new Array();
        if (method == "session") {
            for (let i = 0; i < parseInt(sessionStorage.getItem("accounts")); i++) {
                accounts[i] = sessionStorage.getItem("username"+i.toString());
            }
        } else {
            for (let i = 0; i < parseInt(localStorage.getItem("accounts")); i++) {
                accounts[i] = localStorage.getItem("username"+i.toString());
            }
        }
        return(accounts);
    }
}
class Action_Handler {
    Submit(functionName, value="") {
        eval(`${functionName}("${value}")`);
    }
}
const Li = {
    login: {
        requests: new Login_Send(),
        auth: new Login_Auth(),
        save: new Login_Credentials(),
        display: new Login_Output(),
    },
    auth: {
        selector: new Auth_Selector(),
        storage: new Auth_Storage(),
    },
    action: {
        handler: new Action_Handler(),
    }
};

