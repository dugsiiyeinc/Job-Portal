const authButton = document.querySelector("#authButton");
const username = document.querySelector("#username");
const email = document.querySelector("#email");
const password = document.querySelector("#password");
const confirPassword = document.querySelector("#confirmPassword");
const authSwitch = document.querySelector("#authSwitch");
const switchForm = document.querySelector("#switchForm");
const formTitle = document.querySelector("#formTitle");
const authForm = document.querySelector(".authForm");



const getusersFromLocalstorage = () =>{
    const users = JSON.parse(localStorage.getItem("users")) || [];
    return users;
}

let signin = true;

const adminusers = [
    {
        username : "shiine1",
        email : "shiine1@gmail.com",
        password : 11,
        confirPassword :11,
        isAdmin : true
    },
    {
        username : "ayanle1",
        email : "ayanle1@gmail.com",
        password : 11,
        confirPassword :11,
        isAdmin : true
    },
];

const users = getusersFromLocalstorage();

adminusers.forEach(user => {
    const exestingUser = users.find(currentUser => currentUser.username  === user.username || currentUser.email === user.email );
    
    if(exestingUser){
        return;
    }else{
        users.push(user); 
    }
    
})

localStorage.setItem("users" ,JSON.stringify(users));



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
        authButton.textContent = "Regester";
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

          username.value = "";
          password.value = "";
          email.value = "";
          confirPassword.value = "";
    }
    
    
};

authForm.addEventListener("submit" , (e) =>{
    e.preventDefault();


    let user = {
        username : signin? undefined : username.value,
        email : email.value,
        password : password.value,
        confirPassword :signin? undefined:  confirPassword.value,
        idAdmin:  false
    }
  
    
    if(signin){
        const users = getusersFromLocalstorage();
       
       
        const exestingUser = users.find(currentUser => currentUser.email  == user.email && currentUser.password == user.password );
 
       
        
        if(exestingUser && exestingUser.isAdmin){
            localStorage.setItem("onlineUser", JSON.stringify(exestingUser));
            Swal.fire({
                title: "click ok go to the dashboard!",
                icon: "success",
                ConfirmedButtonText:"ok"
              }).then((result) => {
                if (result.isConfirmed) {
                    window.location.href = "../html/dashboard.html";
                }
              });

        
      
        }
        else if(exestingUser && !exestingUser.isAdmin){
            localStorage.setItem("onlineUser", JSON.stringify(exestingUser));
            window.location.href = "../html/jobs.html";
        
        }
        else{
           
            Swal.fire({
                title: "!Error",
                text: "Invalid credentials",
                icon: "warning!",
                confirmButtonText: "ok"
              });
            return;
        }

    }else{

        const users = getusersFromLocalstorage();

        const exestingUser = users.find(currentUser => currentUser.username  === user.username || currentUser.email === user.email );
        
        if(exestingUser){
            Swal.fire({
                title: "!Error",
                text: `user ${exestingUser.username} already exists`,
                icon: "warning!",
                confirmButtonText: "ok"
              });
            return;
        }


        if(confirPassword.value !== password.value){
            Swal.fire({
                title: "password",
                text: "password doeas not match",
                icon: "info!",
                confirmButtonText: "ok"
              });
            return;
        }
        users.push(user);
        Swal.fire({
            title: "user regestration",
            text: "user regestration Successfully!",
            icon: "info!",
            confirmButtonText: "ok"
          });
        localStorage.setItem("users", JSON.stringify(users));
        switchAuthForm();

    }
})



