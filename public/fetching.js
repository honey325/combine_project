var result;
async function fetching() {
  flag = validate();
  if (flag == true) {
    const response = await fetch('/register', {
      method: "POST",
      body: new URLSearchParams(new FormData(document.getElementById('register_form')))
    })
    var result = await response.json();

    if (typeof (result) == "string") {
      document.getElementById('error').innerHTML = result;
    }
    else {
      var link = document.getElementById('activate_link');
      link.innerHTML = `http://localhost:8080/activate?code=${result[1]}&uname=${result[0]}`;
      link.setAttribute('href', `http://localhost:8080/activate?code=${result[1]}&uname=${result[0]}`)


      link.style.display = "block";
      // link.setAttribute('onclick', `activate('${result[0]}','${result[1]}')`)
      document.getElementById('register_form').style.display = "none"
      document.getElementsByTagName('h1').innerHTML = "Thank you for registration;"


      var title = document.getElementsByClassName('title2');
      for (i = 0; i < title.length; i++) {
        title[i].style.display = 'block';
      }

    }
  }
}

// async function activate(uname, code) {
//     const response2 = await fetch(`/activate?code=${code}&uname=${uname}`)
//     const result2 = await response2.json();
//  
//     if(result2["error"]==undefined){
//         window.location.href = `/crpass?uname=${result2['msg']}`;
//     }
//     else{
//         document.getElementById('act_error').innerHTML = result2["error"]
//     }
// }