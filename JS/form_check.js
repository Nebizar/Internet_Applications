function isWhiteSpace(str) {
    var ws = "\t\n\r ";
    for (var i = 0; i < str.length; i++) {
        var c = str.charAt(i);
        if (ws.indexOf(c) == -1) {
            return false;
        }
    }
    return true;
}

function isEmpty(text){
    if(text.length === 0){
        return true;
    }
    return false;
}

function checkEmail(str) {
    if (isWhiteSpace(str)) {
        alert("Podaj właściwy e-mail");
        return false;
    }
    else {
        var at = str.indexOf("@");
        if (at < 1) {
            alert("Nieprawidłowy e-mail");
            return false;
        }
        else {
            var l = -1;
            for (var i = 0; i < str.length; i++) {
                var c = str.charAt(i);
                if (c == ".") {
                    l = i;
                }
            }
            if ((l < (at + 2)) || (l == str.length - 1)) {
                alert("Nieprawidłowy e-mail");
                return false;
            }
        }
        return true;
    }
}

function checkString(str, msg){
    if(isEmpty(str) || isWhiteSpace(str)) {
        alert(msg);
        return false;
    }
    return true;
}

function validate(form){
    if(!checkString(form.elements["f_imie"].value, "Podaj imię!")){
        return false;
    }
    if(!checkString(form.elements["f_nazwisko"].value, "Podaj nazwisko!")){
        return false;
    }
    if(!checkEmail(form.elements["f_email"].value)){
        return false;
    }
    if(!checkString(form.elements["f_kod"].value, "Podaj kod!")){
        return false;
    }
    if(!checkString(form.elements["f_ulica"].value, "Podaj ulice!")){
        return false;
    }
    if(!checkString(form.elements["f_miasto"].value, "Podaj miasto!")){
        return false;
    }
    return true;
}