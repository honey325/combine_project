async function updatepass() {
  var pass = document.getElementById('pass');
  var pass2 = document.getElementById('pass2');
  try {
    if (document.getElementsByClassName('error').length == 1 && count > 0) {

      var url = window.location.href.split('=')[2]
      var code = window.location.href.split('=')[1].split('&')[0]

      arr = { "pwd": pass.value, "pwd2": pass2.value, "code": code, "uname": url }
      var response = await fetch('/updatepass', {
        method: "POST",
        body: new URLSearchParams(arr)
      });

      var result = await response.json();
      if (result == 0) {
        document.getElementById('error').innerHTML = "something went wrong"
      }

      if (result == 1) {
        document.getElementById('pass_tbl').style.display = "none"
        document.getElementById('error').innerHTML = "Password Created Successfully"
        document.getElementById('login_link').style.display = "block"
      }
      else {
        document.getElementById('error').innerHTML = result;
      }
    }
    else {
      document.getElementById('error').innerHTML = "Enter Valid Inputs";
    }
  }
  catch (e) {
    document.getElementById('error').innerHTML = e;
  }
}