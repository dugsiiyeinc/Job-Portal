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