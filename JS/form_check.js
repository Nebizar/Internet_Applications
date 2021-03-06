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

function checkEmailRegEx(str) {
    var email = /[a-zA-Z_0-9\.]+@[a-zA-Z_0-9\.]+\.[a-zA-Z][a-zA-Z]+/;
    if (email.test(str))
        return true;
    else {
        alert("Podaj właściwy e-mail");
        return false;
    }
}

function checkZIPCodeRegEx(str){
    var code = /[0-9]{2}-[0-9]{3}/;
    if(code.test(str)){
        document.getElementById("kod").innerHTML = "OK";
        document.getElementById("kod").className = "green";
        return false;
    }else{
        document.getElementById("kod").innerHTML = "ZLE";
        document.getElementById("kod").className = "red";
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

var errorField = "";

function startTimer(fName) {
    errorField = fName;
    window.setTimeout("clearError(errorField)", 5000);
}

function clearError(objName) {
    document.getElementById(objName).innerHTML = "";
}

function checkStringAndFocus(obj, msg) {
    var str = obj.value;
    var errorFieldName = "e_" + obj.name.substr(2, obj.name.length);
    if (isWhiteSpace(str) || isEmpty(str)) {
        document.getElementById(errorFieldName).innerHTML = msg;
        obj.focus();
        startTimer(errorFieldName);
        return false;
    }
    else {
        return true;
    }
}

function validate(form){
    var check = true;
    var tab = new Array();
    tab = [true,true,true,true,true,true,true,true,true,true,true]
    console.log(form.length);

    if(!checkStringAndFocus(form.elements["f_imie"], "Podaj imię!")){
        tab[0] = false;
        check = false;
    }
    if(!checkString(form.elements["f_nazwisko"].value, "Podaj nazwisko!")){
        tab[1] = false;
        check = false;
    }
    if(!checkEmailRegEx(form.elements["f_email"].value)){
        tab[5] = false;
        check = false;
    }
    if(checkZIPCodeRegEx(form.elements["f_kod"].value, "Podaj kod!")){
        alert("Podaj własciwy kod!");
        tab[6] = false;
        check = false;
    }
    if(!checkString(form.elements["f_ulica"].value, "Podaj ulice!")){
        tab[7] = false;
        check = false;
    }
    if(!checkString(form.elements["f_miasto"].value, "Podaj miasto!")){
        tab[8] = false;
        check = false;
    }
    if(check===false){
        var i;
        for(i=0;i<form.length;i++){
            if(tab[i] === false) {
                form.elements.item(i).className = "wrong";
            }
        }
    }

    return check;
}

function showElement(e) {
    document.getElementById(e).style.visibility = 'visible';
}
function hideElement(e) {
    document.getElementById(e).style.visibility = 'hidden';
}

function alterRows(i, e) {
    if (e) {
        if (i % 2 == 1) {
            e.setAttribute("style", "background-color: Aqua;");
        }
        e = e.nextSibling;
        while (e && e.nodeType != 1) {
            e = e.nextSibling;
        }
        alterRows(++i, e);
    }
}

alterRows(1, document.getElementsByTagName("tr")[0]);

function nextNode(e) {
    while (e && e.nodeType != 1) {
        e = e.nextSibling;
    }
    return e;
}

function prevNode(e) {
    while (e && e.nodeType != 1) {
        e = e.previousSibling;
    }
    return e;
}

function swapRows(b) {
    var tab = prevNode(b.previousSibling);
    var tBody = nextNode(tab.firstChild);
    var lastNode = prevNode(tBody.lastChild);
    tBody.removeChild(lastNode);
    var firstNode = nextNode(tBody.firstChild);
    tBody.insertBefore(lastNode, firstNode);
}

function cnt(form, msg, maxSize) {
    if (form.value.length > maxSize)
        form.value = form.value.substring(0, maxSize);
    else
        msg.innerHTML = maxSize - form.value.length;
}
