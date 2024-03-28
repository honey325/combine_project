async function check_login(){

    const response = await fetch('/check_login');
    const result =  await response.json();
    if(result == 1){
        window.location.href = "/dash";
    }
   
}
check_login();