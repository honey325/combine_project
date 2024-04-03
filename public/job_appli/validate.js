

function validate() {
  var count = 0
  try {
    // string  validation

    let string_field = document.getElementsByClassName('string');

    for (field of string_field) {
      let str = "*enter valid Input"

      if (/\d/.test(field.value)) {
        append_error(field, str);
        field.focus();
        count++;
      }
      else {
        remove_error(field, str);
      }
    }

    // number validation

    let number_field = document.getElementsByClassName('number');
    for (field of number_field) {
      let str = "*please enter number"

      if ((isNaN(parseInt(field.value)) || field.value.indexOf('.') != -1) && field.value != '') {

        append_error(field, str);
        field.focus();
        count++;
      }
      else {
        remove_error(field, str);
      }
    }


    //length 10

    let contact_field = document.getElementsByClassName('contact');

    for (field of contact_field) {
      let str = "*please enter 10 digits only"

      if (isNaN(parseInt(field.value)) && field.value.length != 10 && field.value.indexOf('.') != -1 && field.value != '') {
        append_error(field, str);
        field.focus();
        count++;
      }
      else {
        remove_error(field, str);
      }

    }

    //pass_year   

    let pass_year_field = document.getElementsByClassName('pass_year');

    for (field of pass_year_field) {
      let str = "enter value between 1960-2024"

      if (isNaN(parseInt(field.value)) && (field.value < 1960 || field.value > 2024) && field.value != '') {
        append_error(field, str);
        field.focus();
        count++;
      }
      else {
        remove_error(field, str);
      }

    }

    //percent   

    let percent_field = document.getElementsByClassName('percent');
    for (field of percent_field) {
      let str = "enter value between 0-100"

      if (isNaN(parseInt(field.value)) && (field.value < 0 || field.value > 100) && field.value != '') {

        append_error(field, str);
        field.focus();
        count++;
      }
      else {
        remove_error(field, str);
      }

    }
    // validation for whole row
    let trs = document.querySelectorAll('.require_col');
    let input_count;
    let inputs;
    for (tr of trs) {
      input_count = 0;
      inputs = tr.querySelectorAll('input');
      for (input of inputs) {

        if (input.value != '') {
          input_count = 1;
        }
        else {
          let str = "*field cannot be empty";
          remove_error(input, str);
        }
      }

      if (input_count == 1) {
        for (input of inputs) {
          input.classList.add('require')
        }
      }
      else if (input_count == 0) {
        for (input of inputs) {
          input.classList.remove('require')

        }
      }
    }


    // email validation
    let emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    let email = document.getElementsByClassName('email');
    for (field of email) {
      let str = "enter valid email"

      if (!emailRegex.test(field.value) && field.value != '') {

        append_error(field, str);
        field.focus();
        count++;
      }
      else {
        remove_error(field, str);
      }

    }


    // date validation

    let date_field = document.getElementsByClassName('date')

    for (field of date_field) {
      let str = "enter valid DATE in YYYY/MM/DD formate";
      if (isNaN(new Date(field.value)) && field.value != "") {
        append_error(field, str);
        field.focus();
        count++;
      }
      else {
        remove_error(field, str);
      }
    }


    // language

    let lang = ['hindi[]', 'english[]', 'gujarati[]'];

    lang.forEach(lang_name => {
      let str = "Please select experties";
      let checked = 0;
      let fields = document.getElementsByName(lang_name)
      fields.forEach(field => {
        if (field.checked == true) {
          checked++;
        }
        else { }
      });
      if (checked == 1) {
        append_error(fields[0], str);

        count++;
      }
      else {
        remove_error(fields[0], str);
      }

    });

    // gender

    let gender = document.getElementsByName('gender');
    let g_str = "please select Gender"
    let gender_check = 0
    gender.forEach(field => {
      if (field.checked == true) {
        gender_check = 1
      }
    });
    if (gender_check == 0) {

      append_error(gender[0], g_str)
      count++;
    }
    else {
      remove_error(field, g_str);
    }

    // technology

    let tech = ['php[]', 'mysql[]', 'laravel[]', 'oracle[]'];

    tech.forEach(tech_name => {
      let str = "Please select experties";
      let checked = 0;
      let fields = document.getElementsByName(tech_name)
      fields.forEach(field => {
        if (field.checked == true) {
          checked++;
        }
        else { }
      });
      if (checked == 1) {
        append_error(fields[0], str);
        count++;
      }
      else {
        remove_error(fields[0], str);
      }

    });


    //require field validartion
    let require_field = document.getElementsByClassName('require');

    for (field of require_field) {
      let str = "*field cannot be empty";
      if (field.value == '') {
        append_error(field, str)
        field.focus();
        count++;
      }
      else {

        remove_error(field, str);

      }
    }



    if (count != 0) {
      return false;
    }
  }
  catch (err) {
    document.getElementById('try_err').innerHTML = hello;
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
