var count = 0
function pass_val() {
    var pwd_regex = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{6,}$/;
    var pass = document.getElementById('pass');
    var str = "*Must require A-Z ,a-z ,0-9,!@#$%^&  min-length : 6";
    if (!(pwd_regex.test(pass.value))) {

        append_error(pass, str)
        pass.focus();

    }
    else {

        sup = pass.parentNode.querySelector('sup');
        br = pass.parentNode.querySelector('br');

        if (sup == null) { }
        else {


            br.remove();
            sup.remove();
            count++;
        }

    }
}

function pass_check() {
    var pass1 = document.getElementById('pass');
    var pass2 = document.getElementById('pass2');
    var str = "*Not Match "
    if (pass1.value != pass2.value) {

        append_error(pass2, str)
        pass2.focus();
    }
    else {

        sup = pass2.parentNode.querySelector('sup');
        br = pass2.parentNode.querySelector('br');

        if (sup == null) { }
        else {

            br.remove();
            sup.remove();

        }

    }
}

function append_error(field, str) {

    sup_ele = field.parentNode.querySelector('sup');
    if (sup_ele != null) {
        sup_ele.innerHTML == str;

    }
    else {
        const sup = document.createElement("sup");
        const node = document.createTextNode(str);
        sup.appendChild(node);

        const br = document.createElement("br");

        sup.classList.add("error")
        field.parentNode.appendChild(br)
        field.parentNode.appendChild(sup)
    }
}