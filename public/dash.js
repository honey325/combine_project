async function logout(){
    const response =await fetch('/logout');
    const result = await response.json();
    window.location.href = '/';
}