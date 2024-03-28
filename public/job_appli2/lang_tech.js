
dis = Array.from(document.getElementsByClassName('dis'));

dis.forEach(ele => {

    if (document.getElementsByName(`${ele.name}`)[0].checked == false) {
        ele.checked = false;
        ele.setAttribute('disabled', true);
    }
    else if(document.getElementsByName(`${ele.name}`)[0].checked == true){
        
        ele.removeAttribute('disabled');
    }
});


function lang_check(event) {
    if (event.target.checked) {
        lang = event.target.name;
        arr = document.getElementsByName(lang);
        arr.forEach(element => {
            element.removeAttribute('disabled')
        });
    }
    else if (!event.target.checked) {
        lang = event.target.name;
  
        arr = document.getElementsByName(lang);
        arr.forEach(element => {
            if (element == arr[0]) {
                return;
            }
            element.checked = false
            element.setAttribute('disabled', true)

        });
    }
}


