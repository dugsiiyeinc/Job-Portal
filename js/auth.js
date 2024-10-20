const authButton = document.querySelector("#authButton");
const username = document.querySelector("#username");
const email = document.querySelector("#email");
const password = document.querySelector("#password");
const confirPassword = document.querySelector("#confirmPassword");
const authSwitch = document.querySelector("#authSwitch");
const switchForm = document.querySelector("#authButton");
const formTitle = document.querySelector("#formTitle");

let signin = true;
document.addEventListener("click", (e) =>{
    if(e.target.id != "authButton") return;

    console.log("click");
    
})