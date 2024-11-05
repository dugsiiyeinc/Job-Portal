const authButton = document.querySelector("#authButton");
const username = document.querySelector("#username");
const email = document.querySelector("#email");
const password = document.querySelector("#password");
const confirPassword = document.querySelector("#confirmPassword");
const authSwitch = document.querySelector("#authSwitch");
const switchForm = document.querySelector("#switchForm");
const formTitle = document.querySelector("#formTitle");
const authForm = document.querySelector(".authForm");
const userList = document.querySelector('.user-list');
const editContainer = document.querySelector(".edit-container");
const editUsername = document.getElementById("editUsername");
const editEmail = document.getElementById("editEmail");
const editIsAdmin = document.getElementById("editIsAdmin");

//addig event to Dom
document.addEventListener("DOMContentLoaded",() =>{
    const allUsers = getusersFromLocalstorage();
    allUsers.forEach(user =>{
        displayUsers(user);
    })
})

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
        createdDate: Date.now(),
        isAdmin : true
    },
    {
        username : "ayanle1",
        email : "ayanle1@gmail.com",
        password : 11,
        confirPassword :11,
        createdDate: Date.now(),
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

authForm && authForm.addEventListener("submit" , (e) =>{
    e.preventDefault();

    if(!signin){
        if(username.value === "" || email.value === "" || password.value === "" || confirPassword.value === ""){
            Swal.fire({
                title: "Error!",
                text: `please fill all Inputs`,
                icon: "error",
                confirmButtonText: "ok"
              });
            return;
        }
    }
    

    let user = {
        username : signin? undefined : username.value,
        email : email.value,
        password : password.value,
        confirPassword :signin? undefined:  confirPassword.value,
        createdDate: Date.now(),
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

        //calling display user when registration new user
        displayUsers(user)
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

//display users function

function displayUsers(user){
    const div = document.createElement("div");
    div.className = "user-card";

    //formating date
    const date = new Date(user.createdDate);
    const formattedDate = `${String(date.getMonth() + 1).padStart(2, "0")}/${String(date.getDate()).padStart(2, "0")}/${date.getFullYear()}`;

    div.innerHTML = `
    <span class="username">${user.username}</span>
    <span class="email">${user.email}</span>
    <span class="created-date">${formattedDate}</span>
    <input type="checkbox" class="isAdmin" ${user.isAdmin ? "checked" : ""}>
    <div class="buttons">
        <button class="edit-btn">Edit</button>
        <button class="delete-btn">Delete</button>
    </div>
`;

userList && userList.appendChild(div);

    usersAttachHandler(div,user.createdDate);

}

//usersAttachHandler

const usersAttachHandler = (div,id) =>{
    const editBtn = div.querySelector(".edit-btn");
    const deleteBtn = div.querySelector(".delete-btn");    
    //delete btn
    deleteBtn.addEventListener("click", () =>{
       deleteUser(div,id);
        
    })

    //editbtn
    editBtn.addEventListener("click", () =>{
        editHandle(div,id);
         
     })
   
}

//edit handle function
const editHandle = (div,id) =>{
  //showing edit-container
  editContainer.classList.add("show");

  //getting update data
  const user = div.querySelector(".username");
  const email = div.querySelector(".email");
  const admin = div.querySelector(".isAdmin");

  //updating data in real time
  editUsername.value = user.textContent;
  editEmail.value = email.textContent;
  editIsAdmin.checked = admin.checked;

  user.textContent = editUsername.value;
  email.textContent = editEmail.value ;
  admin.checked = editIsAdmin.checked ;
   
    // calling updateuser function
    updateUser(id,editUsername,editEmail,editIsAdmin);

}

// update user func
const updateUser = (id,newUsername,newEmail,newIsAdmin) => {
    const allUsers = getusersFromLocalstorage();
    const finduser = allUsers.find(user => user.createdDate == id);
    document.getElementById("saveEdit").addEventListener("click", () => {
        
        if(finduser !== null){
            finduser.username = newUsername.value;
            finduser.email = newEmail.value;
            finduser.isAdmin = newIsAdmin.checked;
            localStorage.setItem("users", JSON.stringify(allUsers));
           
        }
});

}


//delete users function
const deleteUser = (div,id) =>{
    let allUsers = getusersFromLocalstorage();
    allUsers = allUsers.filter(user => user.createdDate != id);
    
    localStorage.setItem("users", JSON.stringify(allUsers));

    div.remove();
    
}