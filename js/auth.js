const authButton = document.querySelector("#authButton");
const username = document.querySelector("#username");
const email = document.querySelector("#email");
const password = document.querySelector("#password");
const confirPassword = document.querySelector("#confirmPassword");
const authSwitch = document.querySelector("#authSwitch");
const switchForm = document.querySelector("#switchForm");
const formTitle = document.querySelector("#formTitle");

let signin = true;

document.body.addEventListener("click", (e) =>{
  
    if(e.target.id != "switchForm") return;
     switchAuthForm();
});


const switchAuthForm = () =>{
    signin = !signin;

    if(!signin){
        formTitle.textContent = "Sign Up";
        username.style.display = "block";
        confirPassword.style.display = "block";
        authButton.textContent = "Sign Up";
        authSwitch.innerHTML = `
            <p id="authSwitch">
            Already have an account? <a href="#" id="switchForm">Signin</a>
          </p> `;
    }else{
        formTitle.textContent = "Sign In";
        username.style.display = "none";
        confirPassword.style.display = "none";
        authButton.textContent = "Sign In";
        authSwitch.innerHTML = `
           <p id="authSwitch">
            New to JobPortal? <a href="#" id="switchForm">Register now</a>
          </p>`;
    }
    
    
}