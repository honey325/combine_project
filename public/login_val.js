function validate() {

  var count = 0;

  var require_field = document.querySelectorAll(`.require`);

  for (field of require_field) {
    var str = "*field cannot be empty";
    if (field.value == '') {

      append_error(field, str)

      field.focus();
      count++;
    }
    else {

      remove_error(field, str);

    }
  }

  // }
  //     var uname = document.getElementById('uname');
  //     var user_regex = /^[a-z0-9_\.].{5,}$/;
  //     var str = "*only char from(a-z,A-z,0-9,_,.) min-length : 5";


  //     if (!(user_regex.test(uname.value))) {
  //         append_error(uname, str)
  //         uname.focus();
  //         count++;
  //     } else {
  //         remove_error(uname, str);
  //     }



  //     var pwd_regex = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{6,}$/;
  //     var pwd = document.getElementById('pwd');
  //     var str = "*Must require A-Z ,a-z ,0-9,!@#$%^&  min-length : 6";
  //     if (!(pwd_regex.test(pwd.value))) {

  //         append_error(pwd, str)
  //         pwd.focus();
  //         count++;
  //     }
  //     else {
  //         remove_error(pwd, str);
  //     }

  if (count > 0) {
    return false;
  }
}



function remove_error(field, str) {

  sup = field.parentNode.querySelector('sup');
  br = field.parentNode.querySelector('br');
  if (sup == null) { }
  else {
    if (sup.innerHTML == str) {
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
