const showUserInfo = document.querySelector("#user");
const onlineUserName = document.querySelector(".username");
const loginBtn1 = document.querySelectorAll(".loginBtn")[0];
const loginBtn2 = document.querySelectorAll(".loginBtn")[1];
const dashLink = document.querySelector('.dash-link');

//set log in buttons when loptop or mobile menu
loginBtn1.addEventListener("click", () => {
    localStorage.removeItem("onlineUser")
});
loginBtn2.addEventListener("click", () => {
    localStorage.removeItem("onlineUser")
});



//load data 
const loaddata = ()  =>{

    //check if onlineuser 
    const onlineUser = JSON.parse(localStorage.getItem("onlineUser")) || null;
    if (!onlineUser) return ;

    //online user  name
    onlineUserName.textContent = ` ${onlineUser.username}`;
     //showing user info 
     showUserInfo.style.display = "block";
    // loginBtn.textContent = "Log out"
    loginBtn1.textContent = "Log out";
    loginBtn2.textContent = "Log out";

    //show dashboard if user is admin
    if(onlineUser.isAdmin){
        dashLink.style.display = "block";
    }


}

//DomContent Loaded
document.addEventListener("DOMContentLoaded", loaddata);