

var current = 1;
var fields = document.getElementsByClassName('field')
var prev = document.getElementById('prev');
var next = document.getElementById('next')
var flag = true;

if (current == 1) {
    prev.setAttribute('herf', 'javascript:void(0)')
    prev.style.color = '#000000c7';
    prev.style.backgroundColor = '#5f9ea0b2';
}


for (let i = 0; i < fields.length; i++) {
    fields[i].style.display = 'none';

}
fields[current - 1].style.display = 'block'

function change_page(page) {

    if (page == "prev" && current != 1) {
        current = current - 1;
        calculate();
    }
    flag = validate(current);
    if (flag == true) {

        if (page == "next" && current != fields.length) {

            current = current + 1;

        }
        if (page == "submit") {
            submit()
        }

        calculate();
    }
    else {

    }

}
function calculate() {

    for (let i = 0; i < fields.length; i++) {
        fields[i].style.display = 'none';

    }
    fields[current - 1].style.display = 'block';

    if (current == 1) {
        prev.setAttribute('herf', 'javascript:void(0)')
        prev.style.color = '#000000c7';
        next.innerHTML = "NEXT >"
        prev.style.backgroundColor = '#5f9ea0b2';
    }
    else {
        next.innerHTML = "NEXT >"
        prev.style.color = 'black';
        prev.style.backgroundColor = 'cadetblue';

    }
    if (current == fields.length) {
        next.setAttribute('herf', 'javascript:void(0)')
        next.innerHTML = "SUBMIT"
        next.value = "submit"
        next.setAttribute('onclick', 'change_page("submit")')

    }
    else {
        next.style.color = 'black';
        next.style.backgroundColor = 'cadetblue';
        next.innerHTML = "NEXT >"
        next.value = ""
        next.setAttribute('onclick', "change_page('next')")
    }
}

async function submit() {
    var response;
    var type = url.split('/')[4].split('?')[0]
    
    if (type == "update") {
        response = await fetch(`/job_application2/update`, {
            method: 'POST',
            body: new URLSearchParams(new FormData(document.getElementById('form'))),
        })
    }
    else {
        if (type == "insert") {
            response = await fetch(`/job_application2/insert`, {
                method: 'POST',
                body: new URLSearchParams(new FormData(document.getElementById('form'))),
            })

        }
    }
    var result2 = await response.json();
    // result2 = result2.toString();
    
    if(result2.error != undefined){
        current = 1;
        document.getElementById('try_err').innerHTML = result2.error;
    }
    else if (result2.msg != undefined){
        window.location.href = `/job_application2/?id=${result2.msg}`

    }
    else {
        window.location.href = `/job_application2/?id=${result2}`
    }
}