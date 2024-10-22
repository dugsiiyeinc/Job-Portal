const navbar = document.querySelector("nav");
const toggleBtn = document.querySelector(".toggle-button");
const navLinks = document.querySelector(".nav-links");
const jobType = document.querySelector(".jobtype");
const jobDate = document.querySelector(".jobdate")
const jobLocation = document.querySelector(".joblocation")
const hiringCompany = document.querySelector(".Job-hiring-company")
const jobTitle = document.querySelector(".Job-tilte")



toggleBtn.addEventListener("click", () => {
    navLinks.classList.toggle("active");
    navbar.classList.toggle("active");
})

//  load  job post from Local Storage

document.addEventListener('DOMContentLoaded', loadJobPosts);

function loadJobPosts(){
    const posts = getPostFromLocalStorage()

    posts.forEach(jobPost => {
        // addPostToDOm(jobPost)
        console.log(jobPost)

    });


}
// function kaan waxa o ka so aqraa post-ka local storage-ka
function getPostFromLocalStorage(){ 
    const oldJobPostDetail = JSON.parse(localStorage.getItem('jobPosts')) || [];
     
    return oldJobPostDetail
    
}
 






