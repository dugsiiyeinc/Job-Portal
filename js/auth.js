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
const cancelEdit = document.querySelector("#cancelEdit");
const saveEdit = document.getElementById("saveEdit");
const addUserBtn = document.getElementById("addUserBtn");
const addContainer = document.querySelector(".add-container");
const addUsername = document.getElementById("addUsername");
const addEmail = document.getElementById("addEmail");
const addPassword = document.getElementById("addPassword");
const addConfirmPassword = document.getElementById("addConfirmPassword");
const saveAdd = document.getElementById("saveAdd");
const cancelAdd = document.querySelector("#cancelAdd");
const searchInputUsers = document.querySelector('.search-input1')





//addig event to Dom
document.addEventListener("DOMContentLoaded", () => {
    const allUsers = getusersFromLocalstorage();
    allUsers.forEach(user => {
        displayUsers(user);
    })
})

const getusersFromLocalstorage = () => {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    return users;
}

let signin = true;

const adminusers = [
    {
        username: "admin",
        email: "admin@gmail.com",
        password: admin12,
        confirPassword: admin12,
        createdDate: Date.now(),
        isAdmin: true
    },
];

const users = getusersFromLocalstorage();

adminusers.forEach(user => {
    const exestingUser = users.find(currentUser => currentUser.username === user.username || currentUser.email === user.email);

    if (exestingUser) {
        return;
    } else {
        users.push(user);
    }

})

localStorage.setItem("users", JSON.stringify(users));



document.body.addEventListener("click", (e) => {

    if (e.target.id != "switchForm") return;
    switchAuthForm();
});
const switchAuthForm = () => {
    signin = !signin;

    if (!signin) {
        formTitle.textContent = "Sign Up";
        username.style.display = "block";
        confirPassword.style.display = "block";
        authButton.textContent = "Regester";
        authSwitch.innerHTML = `
            <p id="authSwitch">
            Already have an account? <a href="#" id="switchForm">Signin</a>
          </p> `;
    } else {
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

authForm && authForm.addEventListener("submit", (e) => {
    e.preventDefault();

    if (!signin) {
        if (username.value === "" || email.value === "" || password.value === "" || confirPassword.value === "") {
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
        username: signin ? undefined : username.value,
        email: email.value,
        password: password.value,
        confirPassword: signin ? undefined : confirPassword.value,
        createdDate: Date.now(),
        idAdmin: false
    }


    if (signin) {
        const users = getusersFromLocalstorage();


        const exestingUser = users.find(currentUser => currentUser.email == user.email && currentUser.password == user.password);



        if (exestingUser && exestingUser.isAdmin) {
            localStorage.setItem("onlineUser", JSON.stringify(exestingUser));
            Swal.fire({
                title: "click ok go to the dashboard!",
                icon: "success",
                ConfirmedButtonText: "ok"
            }).then((result) => {
                if (result.isConfirmed) {
                    window.location.href = "../pages/dashboard.html";
                }
            });



        }
        else if (exestingUser && !exestingUser.isAdmin) {
            localStorage.setItem("onlineUser", JSON.stringify(exestingUser));

            Swal.fire({
                title: "click ok go to the jobs!",
                icon: "success",
                ConfirmedButtonText: "ok"
            }).then((result) => {
                if (result.isConfirmed) {
                    window.location.href = "../pages/jobs.html";
                }
            });

        }
        else {

            Swal.fire({
                title: "!Error",
                text: "Invalid credentials",
                icon: "error",
                confirmButtonText: "ok"
            });
            return;
        }

    } else {

        const users = getusersFromLocalstorage();

        const exestingUser = users.find(currentUser => currentUser.username === user.username || currentUser.email === user.email);

        if (exestingUser) {
            Swal.fire({
                title: "!Error",
                text: `user ${exestingUser.username} already exists`,
                icon: "info",
                confirmButtonText: "ok"
            });
            return;
        }


        if (confirPassword.value !== password.value) {
            Swal.fire({
                title: "password",
                text: "password doeas not match",
                icon: "info",
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
            icon: "success",
            confirmButtonText: "ok"
        });
        localStorage.setItem("users", JSON.stringify(users));
        switchAuthForm();

    }
})

//display users function

function displayUsers(user) {
    const div = document.createElement("tr");

    //formating date
    const date = new Date(user.createdDate);
    const formattedDate = `${String(date.getMonth() + 1).padStart(2, "0")}/${String(date.getDate()).padStart(2, "0")}/${date.getFullYear()}`;


    div.innerHTML = `
            <td class="username">${user.username}</td>
            <td class="email">${user.email}</td>
            <td class="email">${formattedDate}</td>
            <td > <input type="checkbox" class="isAdmin" ${user.isAdmin ? "checked" : ""}></td>
            <td>
            <div class="buttons">
            <button class="edit-btn">Edit</button>
            <button class="delete-btn">Delete</button>
            </div>
            </td>
            `;

    userList && userList.appendChild(div);

    usersAttachHandler(div, user.createdDate);

}

//usersAttachHandler

const usersAttachHandler = (div, id) => {
    const editBtn = div.querySelector(".edit-btn");
    const deleteBtn = div.querySelector(".delete-btn");
    const checkbox = div.querySelector(".isAdmin");


    //delete btn
    deleteBtn.addEventListener("click", () => {
        deleteUser(div, id);

    })

    //editbtn
    editBtn.addEventListener("click", () => {
        editHandle(div, id);

    })

    //checkbox
    checkbox.addEventListener("change", () => {

        toogleAdminUser(id, checkbox.checked);

    })

}

//toogleAdminUser

const toogleAdminUser = (id, isAdmin) => {
    const allUsers = getusersFromLocalstorage();
    const finduser = allUsers.find(user => user.createdDate == id);

    if (finduser) {
        finduser.isAdmin = isAdmin;
        localStorage.setItem("users", JSON.stringify(allUsers));

    }
}

//edit handle function
const editHandle = (div, id) => {
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
    email.textContent = editEmail.value;
    admin.checked = editIsAdmin.checked;

    // calling updateuser function
    updateUser(id, editUsername, editEmail, editIsAdmin);

}

// update user func
const updateUser = (id, newUsername, newEmail, newIsAdmin) => {
    const allUsers = getusersFromLocalstorage();
    const finduser = allUsers.find(user => user.createdDate == id);
    document.getElementById("saveEdit").addEventListener("click", () => {

        if (finduser !== null) {
            finduser.username = newUsername.value;
            finduser.email = newEmail.value;
            finduser.isAdmin = newIsAdmin.checked;
            localStorage.setItem("users", JSON.stringify(allUsers));
            Swal.fire({
                title: "Updated!",
                text: "job updated successfuly!",
                icon: "success",
                ConfirmedButtonText: "ok"
            }).then((result) => {
                if (result.isConfirmed) {

                    editContainer.classList.remove("show");
                }
            });


        }
    });

}


//delete users function
const deleteUser = (div, id) => {
    let allUsers = getusersFromLocalstorage();
    allUsers = allUsers.filter(user => user.createdDate != id);

    localStorage.setItem("users", JSON.stringify(allUsers));

    Swal.fire({
        title: "Delete!",
        text: "job deleting successfuly!",
        icon: "success",
        ConfirmedButtonText: "ok"
    }).then((result) => {
        if (result.isConfirmed) {
            div.remove();
        }
    });

}

//cancelEdit
cancelEdit.addEventListener("click", () => {

    editContainer.classList.remove("show");
})


addUserBtn.addEventListener("click", () => {
    addContainer.classList.add("show");
})

cancelAdd.addEventListener("click", () => {

    addContainer.classList.remove("show");
})

saveAdd.addEventListener("click", (e) => {
    e.preventDefault();

    if (addUsername.value === "" || addEmail.value === "" || addPassword.value === "" || addConfirmPassword.value === "") {
        Swal.fire({
            title: "Error!",
            text: `please fill all Inputs`,
            icon: "error",
            confirmButtonText: "ok"
        });
        return;
    }


    let user = {
        username: addUsername.value,
        email: addEmail.value,
        password: addPassword.value,
        confirPassword: addConfirmPassword.value,
        createdDate: Date.now(),
        idAdmin: false
    }


    const users = getusersFromLocalstorage();

    const exestingUser = users.find(currentUser => currentUser.username === user.username || currentUser.email === user.email);

    if (exestingUser) {
        Swal.fire({
            title: "!Error",
            text: `user ${exestingUser.username} already exists`,
            icon: "info",
            confirmButtonText: "ok"
        });
        return;
    }


    if (addConfirmPassword.value !== addPassword.value) {
        Swal.fire({
            title: "password",
            text: "password doeas not match",
            icon: "info",
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
        icon: "success",
        confirmButtonText: "ok"
    });
    localStorage.setItem("users", JSON.stringify(users));
    addContainer.classList.remove("show");
})

// search users

searchInputUsers.addEventListener("input", function () {
    userList.innerHTML = ''
    console.log("he", searchInputUsers.value);
    const searchValue = searchInputUsers.value.toLowerCase();
    let UsersList = getusersFromLocalstorage()
    UsersList = UsersList.filter(user => user.username.toLowerCase().includes(searchValue) || user.email.toLowerCase().includes(searchValue));
    console.log('UsersList', UsersList)
    UsersList.map(user => displayUsers(user))

    if (UsersList.length === 0) {
        const noJobsMessage = document.createElement('div');
        noJobsMessage.className = 'no-jobs-message'; // Optional: Add a class for styling
        noJobsMessage.innerHTML = '<p>No users found.</p>'; // Message to display
        userList.appendChild(noJobsMessage); // Append the message to the job list

    }

})

