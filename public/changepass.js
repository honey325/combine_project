
async function changepass() {
    var uname2 = document.getElementById('uname2');
    if (uname2.value == "") {
        document.getElementById('error').innerHTML = "Please enter User Name";
    }
    else {

        const response = await fetch(`/newpass?uname=${uname2.value}`);
        const result = await response.json();
        console.log(result.err);
        if (typeof (result) != 'object') {
            var link = document.getElementById('link');
            link.innerHTML = `http://localhost:8080/forgot?code=${result}&uname=${uname2.value}`;
            link.setAttribute('href', `http://localhost:8080/forgot?code=${result}&uname=${uname2.value}`);
        }
        else {
            document.getElementById('error').innerHTML = result.err;;
        }
    }
}

function forgot() {
    document.getElementById('login_form').style.display = 'none';
    document.getElementById('generate_link').style.display = "block";
}