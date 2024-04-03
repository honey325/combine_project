
function validate() {

  // string  validation
  var count = 0;
  var string_field = document.querySelectorAll(`.string`);

  for (field of string_field) {
    var str = "*enter valid Input"

    if (/\d/.test(field.value)) {
      append_error(field, str);
      field.focus();
      count++;
    }
    else {
      remove_error(field, str);
    }
  }


  //contact

  var contact_field = document.querySelectorAll(`.contact`);

  for (field of contact_field) {
    var str = "*please enter 10 digits and numbers only"

    if ((isNaN(parseInt(field.value)) || field.value.length != 10 || field.value.indexOf('.') != -1) && field.value != '') {

      append_error(field, str);
      field.focus();
      count++;
    }
    else {
      remove_error(field, str);
    }

  }
  //email

  var emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  var email_field = document.querySelectorAll(`.email`);
  for (field of email_field) {
    var str = "*enter valid email"

    if (!emailRegex.test(field.value) && field.value != '') {

      append_error(field, str);
      field.focus();
      count++;
    }
    else {
      remove_error(field, str);
    }

  }
  //username



  var uname = document.getElementById('uname');
  var user_regex = /^[A-Za-z0-9_\.].{5,}$/;
  var str = "*only char from(a-z,A-z,0-9,_,.) min-length : 5";


  if (!(user_regex.test(uname.value))) {
    append_error(uname, str)
    uname.focus();
    count++;
  } else {
    remove_error(uname, str);
  }



  //require


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

  if (count > 0) {
    return false;
  }
  else {
    return true
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
