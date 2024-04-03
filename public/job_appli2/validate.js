
function validate(current) {


  switch (current) {
    case 1:
      table = 'basic_detail';
      break;
    case 2:
      table = 'edu_detail';
      break;
    case 3:
      table = 'work_exp';
      break;
    case 4:
      table = 'lang';
      break;
    case 5:
      table = 'tech';
      break;
    case 6:
      table = 'ref';
      break;
    case 7:
      table = 'pref';
      break;
    default:
      table = '';
      break;
  }

  var count = 0
  try {


    // string  validation

    var string_field = document.querySelectorAll(`#${table} .string`);

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

    var contact_field = document.querySelectorAll(`#${table} .contact`);

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

    //pass_year   

    var pass_year_field = document.querySelectorAll(`#${table} .pass_year`);

    for (field of pass_year_field) {
      var str = "enter value between 1960-2024"

      if (!(/^\d+$/.test(field)) && !(field.value > 1960 || field.value < 2024) && field.value != '') {
        append_error(field, str);
        field.focus();
        count++;
      }

      else {
        remove_error(field, str);
      }

    }

    //percent   

    var percent_field = document.querySelectorAll(`#${table} .percent`);

    for (field of percent_field) {
      var str = "enter value between 0-100"

      if (isNaN(parseInt(field.value)) && field.value != '' && !(field.value > 0 || field.value < 100)) {

        append_error(field, str);
        field.focus();
        count++;
      }
      else {
        remove_error(field, str);
      }

    }
    // validation for whole row
    trs = document.querySelectorAll(`#${table} .require_col`);

    for (tr of trs) {


      input_count = 0;
      inputs = tr.querySelectorAll('input');
      for (input of inputs) {

        if (input.value != '') {
          input_count = 1;
        }
        else {
          var str = "*field cannot be empty";
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
    var emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    var email_field = document.querySelectorAll(`#${table} .email`);
    for (field of email_field) {
      var str = "enter valid email"

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

    var date_field = document.querySelectorAll(`#${table} .date`)

    for (field of date_field) {
      var str = "enter valid DATE in YYYY/MM/DD formate";
      if (isNaN(new Date(field.value)) && field.value != "") {
        append_error(field, str);
        field.focus();
        count++;
      }
      else {
        remove_error(field, str);
      }
    }

    if (table == "lang") {
      // language
      var lang_str = "please check any one language";

      var lang = ['hindi[]', 'english[]', 'gujarati[]'];
      var lang_count = 0;
      lang.forEach(lang_name => {
        var str = "Please select experties";

        let checked = 0;
        let fields = document.getElementsByName(lang_name)
        if (fields[0].checked == false) {
          lang_count++;
        }
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
      var no_lang = document.getElementsByName(lang[0]);

      if (lang_count == 3) {
        append_error(no_lang[0], lang_str);

        count++;
      }
      else {
        remove_error(no_lang[0], lang_str);
      }
    }

    //     // gender

    //     var gender = document.getElementsByName(` gender`);
    //     let g_str = "please select Gender"
    //     var gender_check = 0
    //     gender.forEach(field => {

    //         if (field.checked == true) {
    //             gender_check = 1
    //         }
    //     });
    //     if (gender_check == 0) {

    //         append_error(gender[0], g_str)
    //         count++;
    //     }
    //     else {
    //         remove_error(field, g_str);
    //     }
    if (table == "tech") {
      // technology
      var tech = ['php[]', 'mysql[]', 'laravel[]', 'oracle[]'];

      tech.forEach(tech_name => {
        var str = "Please select experties";
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

    }
    //require field validartion
    var require_field = document.querySelectorAll(`#${table} .require`);

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



    if (count != 0) {
      return false;
    }
    else {
      return true;
    }
  }
  catch (err) {
    document.getElementById('try_err').innerHTML = "hello";
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
